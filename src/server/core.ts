import fs from 'fs';
import path from 'path';
import os from 'os';
import { getLsConnection, invalidateLsCache, cancelCascadeInvocation, getAllTrajectoriesFromLs, getCascadeTrajectory } from '../services/ls-discovery';
import { IsGeneratingTracker } from './isGeneratingTracker';
import dotenv from 'dotenv';
import { TelegramIntegration } from '../services/telegram';

// Config defaults (aligned with root server)
const POLL_INTERVAL = 1000;

interface State {
    pollInterval: NodeJS.Timeout | null;
    lastBroadcastIsGenerating: boolean;
}

export class AntigravityCore {
    private workspaceRoot: string;
    private state: State;
    private telegramIntegration?: TelegramIntegration;
    private hasPendingUploads = false;

    private primarySendFn: ((msg: string) => Promise<boolean>) | null = null;
    private getActiveCascadeIdFn: (() => Promise<string>) | null = null;
    private switchCascadeFn: ((id: string) => Promise<boolean>) | null = null;
    private startNewConversationFn: (() => Promise<boolean>) | null = null;
    private reloadWindowFn: (() => Promise<boolean>) | null = null;
    public dismissIdeDialogFn: ((action: 'skip' | 'continue') => Promise<boolean>) | null = null;
    private isGeneratingTracker = new IsGeneratingTracker(10_000);

    private logFn?: (msg: string) => void;

    constructor(workspaceRoot?: string, telegramToken?: string, telegramChatId?: number | null, telegramAllowedUsername?: string | null, primarySendFn?: (message: string) => Promise<boolean>, getActiveCascadeIdFn?: () => Promise<string>, switchCascadeFn?: (id: string) => Promise<boolean>, logFn?: (msg: string) => void, startNewConversationFn?: () => Promise<boolean>, reloadWindowFn?: () => Promise<boolean>, dismissIdeDialogFn?: (action: 'skip' | 'continue') => Promise<boolean>) {
        this.logFn = logFn;
        this.primarySendFn = primarySendFn || null;
        this.getActiveCascadeIdFn = getActiveCascadeIdFn || null;
        this.switchCascadeFn = switchCascadeFn || null;
        this.startNewConversationFn = startNewConversationFn || null;
        this.reloadWindowFn = reloadWindowFn || null;
        this.dismissIdeDialogFn = dismissIdeDialogFn || null;

        const rootBase = workspaceRoot || process.cwd();
        this.workspaceRoot = rootBase;

        const agIdeEnv = path.join(this.workspaceRoot, '.ag-ide', '.env');
        const rootEnv = path.join(this.workspaceRoot, '.env');
        if (fs.existsSync(agIdeEnv)) dotenv.config({ path: agIdeEnv });
        else if (fs.existsSync(rootEnv)) dotenv.config({ path: rootEnv });

        // Token: ưu tiên .env trước, VS Code settings là fallback
        const finalToken = (process.env.TELEGRAM_TOKEN || telegramToken || '').trim();
        if (finalToken && finalToken !== 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
            const finalChatId = telegramChatId ?? (process.env.CHAT_ID ? parseInt(process.env.CHAT_ID, 10) : null);
            const finalUsername = telegramAllowedUsername || process.env.ALLOWED_USERNAME || null;
            this.log(`[Core] Token source: ${process.env.TELEGRAM_TOKEN ? '.env' : 'VS Code settings'}`);
            this.log(`[Core] Token (masked): ...${finalToken.slice(-6)}`);
            this.log(`[Core] ChatId: ${finalChatId} (from ${telegramChatId ? 'settings' : 'env'})`);
            this.log(`[Core] Username: ${finalUsername}`);

            if (this.checkLockConflict()) {
                this.log(`[Core] ⚠️ Telegram Bot is already running in another window/instance. Skipping initialization to avoid 409 Conflict.`);
            } else {
                this.telegramIntegration = new TelegramIntegration(finalToken, finalChatId, finalUsername, this);
            }
        }
        this.state = {
            pollInterval: null,
            lastBroadcastIsGenerating: false
        };
    }

    public get isTelegramActive() { return !!this.telegramIntegration; }

    public log(msg: string) {
        try {
            const logDir = path.join(os.homedir(), '.ag-link');
            if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });
            const logPath = path.join(logDir, 'extension-log.txt');
            fs.appendFileSync(logPath, `[${new Date().toISOString()}] ${msg}\n`);
        } catch (e) { }

        if (this.logFn) {
            this.logFn(msg);
        } else {
            console.log(msg);
        }
    }

    // ─── LS RPC trajectory status ───────────────────────────────────────────

    private async checkIsTrajectoryActive(cascadeId: string): Promise<boolean> {
        try {
            const trajectories = await getAllTrajectoriesFromLs();
            const current = trajectories.find(t => t.id === cascadeId);
            if (current) {
                const status = String(current.status || '').toUpperCase();
                // Match completion states: COMPLETED, FAILED, CANCELLED, IDLE (= done, waiting for user)
                if (status.includes('COMPLETED') || status.includes('FAILED') || status.includes('CANCELLED') ||
                    status.includes('IDLE') || status.includes('DONE') || status.includes('FINISHED') ||
                    status === '') {
                    return false;
                }
                return true;
            }
        } catch (e) {
            this.log(`[Core] Error checking trajectory status: ${e}`);
        }
        return true;
    }

    // ─── Main polling loop ──────────────────────────────────────────────────

    private loggedDialogHashes: Set<string> = new Set();
    private lastLoggedCascadeId: string = '';
    private lastLoggedSteps: string[] = [];
    private pollCount: number = 0;

    private async updateSnapshot(): Promise<boolean> {
        // ── LS RPC: only poll when Telegram is actively tracking a response ──
        let lsGenerating = false;
        let lsText = '';
        let hasActiveDialogs = false;
        let stepStatusText = '';
        let steps: any[] = [];

        const isTracking = this.telegramIntegration?.isTrackingResponse ?? false;

        if (isTracking && this.getActiveCascadeIdFn) {
            try {
                const activeCascadeId = await this.getActiveCascadeIdFn();

                // Reset logged hashes when cascade changes
                if (activeCascadeId !== this.lastLoggedCascadeId) {
                    this.loggedDialogHashes.clear();
                    this.lastLoggedSteps = [];
                    this.lastLoggedCascadeId = activeCascadeId;
                }

                if (activeCascadeId) {
                    const isLsActive = await this.checkIsTrajectoryActive(activeCascadeId);
                    lsGenerating = isLsActive;

                    const trajectoryData = await getCascadeTrajectory(activeCascadeId);
                    if (trajectoryData && trajectoryData.trajectory) {
                        steps = trajectoryData.trajectory.steps || [];

                        // Log new or updated steps for troubleshooting
                        for (let i = 0; i < steps.length; i++) {
                            const step = steps[i];
                            const sig = `${step.type || 'UNKNOWN'}:${step.status || 'UNKNOWN'}`;
                            if (i >= this.lastLoggedSteps.length || this.lastLoggedSteps[i] !== sig) {
                                const cleanType = (step.type || 'UNKNOWN').replace('CORTEX_STEP_TYPE_', '');
                                const cleanStatus = (step.status || 'UNKNOWN').replace('CORTEX_STEP_STATUS_', '');

                                if (i >= this.lastLoggedSteps.length) {
                                    this.log(`[Core] 🪜 [Step ${i}] Created: Type=${cleanType} | Status=${cleanStatus}`);
                                    this.lastLoggedSteps.push(sig);
                                } else {
                                    this.log(`[Core] 🪜 [Step ${i}] Updated: Type=${cleanType} | Status=${cleanStatus}`);
                                    this.lastLoggedSteps[i] = sig;
                                }
                            }
                        }
                        const lastAiStep = [...steps].reverse().find((s: any) =>
                            s.type === 'CORTEX_STEP_TYPE_PLANNER_RESPONSE' ||
                            s.type === 'CORTEX_STEP_TYPE_ASSISTANT_RESPONSE' ||
                            s.type === 'CORTEX_STEP_TYPE_CHAT_RESPONSE'
                        );

                        if (lastAiStep) {
                            const lastAiStepIndex = steps.indexOf(lastAiStep);

                            // ── Extract text content ──
                            let content: any = null;
                            if (lastAiStep.plannerResponse?.response) {
                                content = lastAiStep.plannerResponse.response;
                            }
                            if (!content) content = lastAiStep.chatResponse?.message || lastAiStep.chatResponse?.text;
                            if (!content) content = lastAiStep.message?.text || lastAiStep.message;
                            if (!content) content = lastAiStep.plannerResponse?.thinking;
                            if (!content) {
                                const raw = lastAiStep.chatResponse || lastAiStep.plannerResponse;
                                if (raw && typeof raw === 'object') {
                                    content = (raw as any).response || (raw as any).text || (raw as any).content || JSON.stringify(raw);
                                }
                            }
                            if (typeof content === 'string' && content.startsWith('{')) {
                                try {
                                    const parsed = JSON.parse(content);
                                    if (parsed.response) content = parsed.response;
                                } catch { /* not JSON, use as-is */ }
                            }
                            if (typeof content === 'string') {
                                lsText = content;
                            } else if (content) {
                                lsText = String(content);
                            }

                            // ── Detect interactive tool calls (ask_question, ask_permission, run_command) ──
                            const toolCalls = lastAiStep.plannerResponse?.toolCalls || [];
                            for (const tc of toolCalls) {
                                if (!tc.name || !tc.argumentsJson) continue;
                                
                                try {
                                    const args = JSON.parse(tc.argumentsJson);
                                    
                                    if (tc.name === 'ask_question' && this.telegramIntegration) {
                                        hasActiveDialogs = true;
                                        const questions = args.questions || [];
                                        if (questions.length > 0) {
                                            const q = questions[0];
                                            const hash = `ls_ask_q:${activeCascadeId.substring(0,8)}:${lastAiStepIndex}:q0`;
                                            const probe = {
                                                buttons: [
                                                    { text: 'Skip', type: 'question' }
                                                ],
                                                options: (q.options || []) as string[],
                                                context: questions.length > 1 
                                                    ? `(Câu hỏi 1/${questions.length})\n\n${q.question || ''}`
                                                    : q.question || '',
                                                hash
                                            };
                                            if (!this.loggedDialogHashes.has(hash)) {
                                                this.loggedDialogHashes.add(hash);
                                                this.log(`[Core] ❓ Detected ask_question (1/${questions.length}): "${(q.question || '').substring(0, 80)}..." with ${(q.options || []).length} options`);
                                            }
                                            this.telegramIntegration.handleDialogProbe(probe);
                                        }
                                    }
                                    
                                    if (tc.name === 'ask_permission' && this.telegramIntegration) {
                                        hasActiveDialogs = true;
                                        const hash = `ls_ask_p:${activeCascadeId.substring(0,8)}:${lastAiStepIndex}`;
                                        const probe = {
                                            buttons: [
                                                { text: 'Allow', type: 'permission' },
                                                { text: 'Deny', type: 'permission' }
                                            ],
                                            options: [] as string[],
                                            context: `${args.toolSummary || args.Action || 'Permission request'}\n\nAction: ${args.Action || 'N/A'}\nTarget: ${args.Target || 'N/A'}\nReason: ${args.Reason || 'N/A'}`,
                                            hash
                                        };
                                        if (!this.loggedDialogHashes.has(hash)) {
                                            this.loggedDialogHashes.add(hash);
                                            this.log(`[Core] 🔐 Detected ask_permission: Action=${args.Action} Target=${args.Target}`);
                                        }
                                        this.telegramIntegration.handleDialogProbe(probe);
                                    }
 
                                    if (tc.name === 'run_command' && this.telegramIntegration) {
                                        if (lastAiStep.status !== 'CORTEX_STEP_STATUS_DONE') {
                                            hasActiveDialogs = true;
                                            const cmd = args.CommandLine || '';
                                            const hash = `ls_cmd:${activeCascadeId.substring(0,8)}:${lastAiStepIndex}`;
                                            const probe = {
                                                buttons: [
                                                    { text: 'Run', type: 'command' },
                                                    { text: 'Deny', type: 'command' }
                                                ],
                                                options: [] as string[],
                                                context: `AI muốn chạy lệnh:\n\n\`${cmd}\`\n\nTrong: ${args.Cwd || 'N/A'}`,
                                                hash
                                            };
                                            if (!this.loggedDialogHashes.has(hash)) {
                                                this.loggedDialogHashes.add(hash);
                                                this.log(`[Core] 💻 Detected run_command: "${cmd.substring(0, 60)}..."`);
                                            }
                                            this.telegramIntegration.handleDialogProbe(probe);
                                        }
                                    }
                                } catch { /* skip malformed args */ }
                            }
                        }

                        // ── Formulate stepStatusText for Telegram real-time progress updates ──
                        const maxDisplaySteps = 5;
                        const lastSteps = steps.slice(-maxDisplaySteps);

                        const formatStepType = (type: string, toolName?: string, toolArgs?: any): string => {
                            const rawType = (type || 'UNKNOWN')
                                .replace('CORTEX_STEP_TYPE_', '')
                                .replace('CORTEX_STEP_STATUS_', '')
                                .toUpperCase();

                            if (toolName) {
                                try {
                                    if (toolName === 'view_file' && toolArgs?.AbsolutePath) {
                                        return `Đọc file \`${path.basename(toolArgs.AbsolutePath)}\``;
                                    }
                                    if (toolName === 'run_command' && toolArgs?.CommandLine) {
                                        return `Chạy lệnh \`${toolArgs.CommandLine.split(' ')[0]}...\``;
                                    }
                                    if (toolName === 'write_to_file' && toolArgs?.TargetFile) {
                                        return `Tạo file \`${path.basename(toolArgs.TargetFile)}\``;
                                    }
                                    if (toolName === 'replace_file_content' && toolArgs?.TargetFile) {
                                        return `Sửa file \`${path.basename(toolArgs.TargetFile)}\``;
                                    }
                                    if (toolName === 'multi_replace_file_content' && toolArgs?.TargetFile) {
                                        return `Sửa file \`${path.basename(toolArgs.TargetFile)}\``;
                                    }
                                    if (toolName === 'grep_search') {
                                        return `Tìm kiếm trong mã nguồn`;
                                    }
                                    if (toolName === 'list_dir' && toolArgs?.DirectoryPath) {
                                        return `Liệt kê thư mục \`${path.basename(toolArgs.DirectoryPath) || '/'}\``;
                                    }
                                    if (toolName === 'ask_question') {
                                        return 'Hỏi ý kiến người dùng';
                                    }
                                    if (toolName === 'ask_permission') {
                                        return 'Yêu cầu cấp quyền';
                                    }
                                } catch {}
                            }

                            switch (rawType) {
                                case 'CONVERSATIONHISTORY':
                                case 'CONVERSATION_HISTORY':
                                    return 'Đọc lịch sử hội thoại';
                                case 'KNOWLEDGEARTIFACTS':
                                case 'KNOWLEDGE_ARTIFACTS':
                                    return 'Đọc tri thức dự án';
                                case 'PLANNERRESPONSE':
                                case 'PLANNER_RESPONSE':
                                    return 'Lên kế hoạch thực thi';
                                case 'VIEWFILE':
                                case 'VIEW_FILE':
                                    return 'Đọc nội dung file';
                                case 'CHECKPOINT':
                                    return 'Lưu checkpoint trạng thái';
                                case 'RUN_COMMAND':
                                    return 'Chạy lệnh terminal';
                                case 'WRITE_TO_FILE':
                                    return 'Tạo file mới';
                                case 'REPLACE_FILE_CONTENT':
                                    return 'Cập nhật nội dung file';
                                case 'ASK_QUESTION':
                                    return 'Hỏi ý kiến người dùng';
                                case 'ASK_PERMISSION':
                                    return 'Yêu cầu cấp quyền';
                                case 'ASSISTANT_RESPONSE':
                                    return 'Assistant trả lời';
                                case 'CHAT_RESPONSE':
                                    return 'Nhận phản hồi từ Chat';
                                case 'USER_INPUT':
                                    return 'Nhận yêu cầu từ người dùng';
                                default:
                                    // Title case
                                    return rawType
                                        .split('_')
                                        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                                        .join(' ');
                            }
                        };

                        const progressLines = lastSteps.map((s: any) => {
                            const actualIndex = steps.indexOf(s);
                            const rawType = s.type || 'UNKNOWN';
                            const rawStatus = (s.status || 'UNKNOWN').replace('CORTEX_STEP_STATUS_', '');

                            let toolName: string | undefined;
                            let toolArgs: any;
                            let detail = '';

                            if (s.plannerResponse?.toolCalls?.length > 0) {
                                const tc = s.plannerResponse.toolCalls[0];
                                toolName = tc.name;
                                try {
                                    toolArgs = JSON.parse(tc.argumentsJson);
                                } catch {}
                                
                                const knownTools = ['view_file', 'run_command', 'write_to_file', 'replace_file_content', 'multi_replace_file_content', 'grep_search', 'list_dir', 'ask_question', 'ask_permission'];
                                if (tc.name && !knownTools.includes(tc.name)) {
                                    detail = ` (Tool: ${tc.name})`;
                                }
                            }

                            const friendlyType = formatStepType(rawType, toolName, toolArgs);

                            const isRunning = rawStatus.includes('RUNNING');
                            const isFailed = rawStatus.includes('FAILED') || rawStatus.includes('ERROR');
                            const isCancelled = rawStatus.includes('CANCELLED') || rawStatus.includes('ABORTED');

                            let emoji = '✅';
                            let statusText = '';
                            if (isRunning) {
                                emoji = '⏳';
                                statusText = ' (Đang chạy...)';
                            } else if (isFailed) {
                                emoji = '❌';
                                statusText = ' (Lỗi)';
                            } else if (isCancelled) {
                                emoji = '🚫';
                                statusText = ' (Đã hủy)';
                            }

                            return `${emoji} Bước ${actualIndex + 1}: ${friendlyType}${statusText}${detail}`;
                        });

                        stepStatusText = `🤖 *AI đang thực thi...*\n\n`;
                        if (steps.length > maxDisplaySteps) {
                            stepStatusText += `_... (đã ẩn ${steps.length - maxDisplaySteps} bước trước)_\n`;
                        }
                        stepStatusText += progressLines.join('\n');

                        if (lsText) {
                            const preview = lsText.length > 150
                                ? lsText.substring(0, 150) + '...'
                                : lsText;
                            // Escape reserved Telegram Markdown characters in the preview
                            const safePreview = preview.replace(/[*_`\[\]()]/g, '');
                            stepStatusText += `\n\n💬 *Nội dung phản hồi hiện tại:*\n_${safePreview}_`;
                        }

                        // Log poll status every 5th cycle to reduce noise
                        this.pollCount++;
                        if (this.pollCount % 5 === 0 || !isLsActive) {
                            this.log(`[Core] 📨 LS Poll - Cascade: ${activeCascadeId.substring(0, 8)} | Active: ${isLsActive} | Len: ${lsText.length} | Dialogs: ${hasActiveDialogs} | "${lsText.substring(0, 60).replace(/\n/g, ' ')}..."`);
                        }
                    }
                }
            } catch (e) {
                this.log(`[Core] ❌ Error resolving LS trajectory: ${e}`);
            }
        }

        if (this.telegramIntegration && isTracking) {
            this.telegramIntegration.handleLSTrajectory(lsText, lsGenerating, hasActiveDialogs, stepStatusText, steps);
        }

        return false;
    }

    // ─── Public API ─────────────────────────────────────────────────────────

    public async sendPrompt(message: string): Promise<boolean> {
        this.log(`[Core] sendPrompt called with message: "${message}" (hasPendingUploads=${this.hasPendingUploads})`);
        if (this.primarySendFn && !this.hasPendingUploads) {
            try {
                const ok = await this.primarySendFn(message);
                if (ok) return true;
            } catch (err) { }
        }
        return false;
    }

    public async getActiveCascadeId(): Promise<string> {
        if (this.getActiveCascadeIdFn) {
            try {
                return await this.getActiveCascadeIdFn();
            } catch { }
        }
        return '';
    }

    public async triggerStop(): Promise<boolean> {
        let cascadeId = '';
        let lsConn = null;
        try {
            lsConn = await getLsConnection();
            if (this.getActiveCascadeIdFn) cascadeId = await this.getActiveCascadeIdFn();
        } catch { }

        if (cascadeId && lsConn) {
            try {
                let rpcResult = await cancelCascadeInvocation(cascadeId, lsConn);
                if (!rpcResult.ok && rpcResult.status === 401) {
                    invalidateLsCache();
                    const conn2 = await getLsConnection();
                    if (conn2) return (await cancelCascadeInvocation(cascadeId, conn2)).ok;
                }
                return rpcResult.ok;
            } catch { invalidateLsCache(); }
        }
        return false;
    }

    /**
     * Cancel the active cascade to dismiss pending dialogs (ask_question, ask_permission, etc.)
     * The caller can then send a new prompt with the user's response.
     */
    public async cancelActiveCascade(): Promise<boolean> {
        this.log(`[Core] 🛑 Cancelling active cascade to dismiss dialog...`);
        const result = await this.triggerStop();
        this.log(`[Core] ${result ? '✅' : '❌'} Cancel cascade result: ${result}`);
        // Clear logged hashes so new cascade is treated fresh
        this.loggedDialogHashes.clear();
        return result;
    }

    public async switchCascade(id: string): Promise<boolean> {
        if (this.switchCascadeFn) {
            return await this.switchCascadeFn(id);
        }
        return false;
    }

    public async startNewConversation(): Promise<boolean> {
        if (this.startNewConversationFn) {
            return await this.startNewConversationFn();
        }
        return false;
    }

    public async reloadWindow(): Promise<boolean> {
        if (this.reloadWindowFn) {
            return await this.reloadWindowFn();
        }
        return false;
    }

    public findBrainFile(filename: string): string | null {
        const brainDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');
        if (!fs.existsSync(brainDir)) return null;
        try {
            const entries = fs.readdirSync(brainDir, { withFileTypes: true })
                .filter(e => e.isDirectory())
                .map(e => ({ full: path.join(brainDir, e.name), mtime: fs.statSync(path.join(brainDir, e.name)).mtimeMs }))
                .sort((a, b) => b.mtime - a.mtime);
            for (const entry of entries) {
                const filePath = path.join(entry.full, filename);
                if (fs.existsSync(filePath)) return filePath;
            }
        } catch { }
        return null;
    }

    public async getLsConnection() {
        return await getLsConnection();
    }

    public sendMockQuestion(): boolean {
        if (!this.telegramIntegration) {
            this.log('[Core] ❌ Cannot send mock question: Telegram not active');
            return false;
        }
        const probe = {
            buttons: [
                { text: 'Skip', type: 'question' }
            ],
            options: [
                '(Recommended) Use Vite with React + TypeScript',
                'Use Next.js with App Router',
                'Use plain HTML/CSS/JS',
                'Use Angular with standalone components'
            ],
            context: 'Which framework would you like to use for this project?',
            hash: `mock_question_${Date.now()}`
        };
        this.log(`[Core] 🧪 Sending mock question to Telegram...`);
        this.telegramIntegration.handleDialogProbe(probe);
        return true;
    }

    public async start(): Promise<void> {
        this.state.pollInterval = setInterval(() => this.updateSnapshot(), POLL_INTERVAL);
    }

    public stop() {
        if (this.state.pollInterval) clearInterval(this.state.pollInterval);
        this.state.pollInterval = null;
        if (this.telegramIntegration) {
            this.telegramIntegration.stop();
        }
    }

    private checkLockConflict(): boolean {
        const lockPath = path.join(os.homedir(), '.ag-link', 'bot.lock');
        if (fs.existsSync(lockPath)) {
            try {
                const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
                const pid = parseInt(lock.pid, 10);
                const time = parseInt(lock.time, 10);

                const isPidRunning = (p: number): boolean => {
                    try {
                        process.kill(p, 0);
                        return true;
                    } catch (e: any) {
                        return e.code === 'EPERM';
                    }
                };

                if (Date.now() - time < 15_000 && isPidRunning(pid) && pid !== process.pid) {
                    return true;
                }
            } catch {
                // Ignore malformed lock
            }
        }
        return false;
    }
}

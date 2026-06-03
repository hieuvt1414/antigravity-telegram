import TelegramBot from 'node-telegram-bot-api';
import { AntigravityCore } from '../server/core';
import * as cheerio from 'cheerio';
import { getAllTrajectoriesFromLs } from './ls-discovery';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';
import * as crypto from 'crypto';

export class TelegramIntegration {
    private bot: TelegramBot;
    private activeMessageId: number | null = null;
    private activeChatId: number | null = null;
    private lastSentText: string = '';
    private activeUserPrompt: string = '';
    private lastSendTime: number = 0;
    private pendingUpdate: NodeJS.Timeout | null = null;
    private defaultTimeoutTimer: NodeJS.Timeout | null = null;
    private clearActiveTimer: NodeJS.Timeout | null = null;
    private hasStartedGenerating: boolean = false;
    private responseSent: boolean = false;
    private uploadsDir: string;
    private processedDialogHashes: Set<string> = new Set();
    private pendingDialogButtons: string[] = [];
    private pendingDialogOptions: string[] = [];
    private lastPlanHash: string = '';
    private lastWalkthroughHash: string = '';
    private lastActiveSessionDir: string = '';
    private lastAutoCheckTime: number = 0;
    private autoCheckInterval: NodeJS.Timeout | null = null;
    private lockInterval: NodeJS.Timeout | null = null;
    private lastStatusText: string = '';

    /** True when we're actively waiting for an AI response to forward to Telegram */
    public get isTrackingResponse(): boolean {
        return !!(this.activeMessageId && this.activeChatId && !this.responseSent);
    }


    constructor(
        token: string,
        private allowedChatId: number | null,
        private allowedUsername: string | null,
        private server: AntigravityCore
    ) {
        this.bot = new TelegramBot(token, { polling: true });
        this.uploadsDir = path.join(os.homedir(), '.ag-link', 'uploads');
        // Clean up uploads on startup to avoid disk leaks
        if (fs.existsSync(this.uploadsDir)) {
            try {
                const files = fs.readdirSync(this.uploadsDir);
                for (const file of files) {
                    fs.unlinkSync(path.join(this.uploadsDir, file));
                }
            } catch (err) {
                this.server.log(`[Telegram] Error cleaning up old uploads: ${err}`);
            }
        } else {
            fs.mkdirSync(this.uploadsDir, { recursive: true });
        }

        this.setupListeners();
        this.server.log('[Telegram] Bot initialized and listening');

        // Lock file acquisition and heartbeat
        this.acquireLock();
        this.lockInterval = setInterval(() => this.acquireLock(), 5000);

        // Initialize session monitoring variables
        this.lastActiveSessionDir = this.getActiveSessionDir();
        const planFile = this.getLatestFile([
            'implementation_plan.md',
            'implementation_plan.md.resolved'
        ]);
        this.lastPlanHash = planFile ? this.getFileHash(planFile.filePath) : '';

        const wtFile = this.getLatestFile([
            'walkthrough.md',
            'walkthrough.md.resolved'
        ]);
        this.lastWalkthroughHash = wtFile ? this.getFileHash(wtFile.filePath) : '';

        // Periodic background check to ensure updates are sent even when IDE is idle or inactive
        this.autoCheckInterval = setInterval(() => {
            this.checkAndAutoSendBrainFiles().catch(() => {});
        }, 3000);

        if (this.allowedChatId) {
            this.bot.sendMessage(this.allowedChatId, '🚀 **Antigravity Link** đã khởi động và kết nối thành công với IDE!', { parse_mode: 'Markdown' }).catch(err => this.server.log(`[Telegram] Error sending startup message: ${err}`));
        }
    }

    private setupListeners() {
        // Log polling errors so they don't fail silently
        this.bot.on('polling_error', (err: any) => {
            this.server.log(`[Telegram] ⚠️ Polling error: ${err?.message || err}`);
        });

        // Handle normal messages and commands
        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const username = msg.chat.username;

            this.server.log(`[Telegram] 📨 Incoming message from chatId=${chatId} @${username || 'N/A'}: "${(msg.text || '[file]').substring(0, 50)}"`);

            let isAllowed = false;
            if (this.allowedChatId && chatId === this.allowedChatId) isAllowed = true;
            if (this.allowedUsername && username === this.allowedUsername) isAllowed = true;

            if (!isAllowed) {
                this.server.log(`[Telegram] ❌ Unauthorized: chatId=${chatId} (expected ${this.allowedChatId}), username=@${username} (expected @${this.allowedUsername})`);
                return;
            }

            // Check for duplicate messages (already processed)
            const state = this.getTelegramState();
            const lastProcessedId = state[chatId.toString()] || 0;
            if (msg.message_id <= lastProcessedId) {
                this.server.log(`[Telegram] ⏭️ Skipping already processed message message_id=${msg.message_id} (lastProcessedId=${lastProcessedId})`);
                return;
            }

            // Mark as processed immediately
            state[chatId.toString()] = msg.message_id;
            this.saveTelegramState(state);

            this.server.log(`[Telegram] ✅ Authorized, processing...`);

            if (msg.text) {
                await this.handleTextMessage(msg, chatId);
            }
            if (msg.document || msg.photo) {
                await this.handleFile(msg, chatId);
            }
        });

        // Handle inline button callbacks
        this.bot.on('callback_query', async (query) => {
            try {
                const chatId = query.message?.chat.id;
                const username = query.from?.username;
                const data = query.data;

                this.server.log(`[Telegram] 🔔 Callback query received: data="${data}", chatId=${chatId || 'N/A'}, username=@${username || 'N/A'}`);

                if (!chatId) {
                    this.server.log(`[Telegram] ⚠️ Callback query ignored: No chatId`);
                    return;
                }

                let isAllowed = false;
                if (this.allowedChatId && chatId === this.allowedChatId) isAllowed = true;
                if (this.allowedUsername && username === this.allowedUsername) isAllowed = true;

                if (!isAllowed) {
                    this.server.log(`[Telegram] ❌ Unauthorized callback query from chatId=${chatId}, username=@${username}`);
                    return;
                }

                if (data && data.startsWith('switch_')) {
                    const id = data.replace('switch_', '');
                    this.bot.answerCallbackQuery(query.id, { text: 'Đang chuyển đổi...' });
                    
                    // Fetch trajectories to find the title of the selected conversation
                    let title = 'Không xác định';
                    try {
                        const list = await getAllTrajectoriesFromLs();
                        const found = list.find(t => t.id === id);
                        if (found) {
                            title = found.title || 'Untitled';
                        }
                    } catch { }

                    const success = await this.server.switchCascade(id);
                    if (success) {
                        // Refresh the /list message buttons to update active indicator
                        await this.sendOrUpdateConversationList(chatId, query.message?.message_id);

                        // Send confirmation message to let the user know
                        await this.bot.sendMessage(chatId, `✅ Đã chuyển sang cuộc hội thoại: *${title}*`, {
                            parse_mode: 'Markdown'
                        });

                        const statusMsg = await this.bot.sendMessage(chatId, `⏳ Đang tải nội dung cuộc hội thoại...`);
                        this.initResponseTracking('', chatId, statusMsg.message_id);
                    } else {
                        this.bot.sendMessage(chatId, `❌ Lỗi khi chuyển sang cuộc hội thoại: *${title}*`);
                    }
                }

                // ── Plan approval buttons ───────────────────────────────────
                if (data === 'approve_plan') {
                    this.bot.answerCallbackQuery(query.id, { text: 'Đang gửi phê duyệt...' });
                    const success = await this.server.sendPrompt('Approved. Go ahead and implement the plan.');
                    if (success) {
                        const statusMsg = await this.bot.sendMessage(chatId, '✅ Đã phê duyệt. Đang chờ AI thực thi...');
                        this.initResponseTracking('Approved. Go ahead and implement the plan.', chatId, statusMsg.message_id);
                    } else {
                        this.bot.sendMessage(chatId, '❌ Lỗi gửi phê duyệt.');
                    }
                }

                if (data === 'view_plan') {
                    this.bot.answerCallbackQuery(query.id, { text: 'Đang tải kế hoạch...' });
                    await this.sendPlanToUser(chatId);
                }

                if (data === 'reject_plan') {
                    this.bot.answerCallbackQuery(query.id, { text: 'Đang gửi yêu cầu sửa...' });
                    this.bot.sendMessage(chatId, '📝 Hãy gửi feedback của bạn, tôi sẽ chuyển cho AI để sửa lại kế hoạch.\n\n_(Gõ tin nhắn bình thường, ví dụ: "Không dùng Redux, dùng Zustand thay")_', {
                        parse_mode: 'Markdown'
                    });
                }

                // ── Dialog response buttons (permissions, questions, commands) ──
                // Strategy: Cancel cascade (dismisses the dialog) → Resend user's choice as new prompt
                // LS has no RPC to submit tool call responses directly.
                if (data?.startsWith('dlg_btn_')) {
                    const idx = parseInt(data.replace('dlg_btn_', ''), 10);
                    const btnText = this.pendingDialogButtons[idx];
                    this.server.log(`[Telegram] 🔘 Button click: idx=${idx}, text="${btnText || 'undefined'}"`);
                    if (btnText) {
                        this.bot.answerCallbackQuery(query.id, { text: `Đang xử lý "${btnText}"...` });
                        
                        // Edit message immediately to give instant visual feedback
                        this.bot.editMessageText(`✅ Đã chọn: "${btnText}"`, {
                            chat_id: chatId,
                            message_id: query.message?.message_id
                        }).catch((e) => {
                            this.server.log(`[Telegram] ❌ Failed to edit message on button click: ${e?.message || e}`);
                        });
                        
                        const lower = btnText.toLowerCase();
                        const isSkip = ['skip', 'deny', 'cancel', 'reject', 'no'].some(w => lower.includes(w));
                        
                        // Cancel current cascade to dismiss the dialog
                        await this.server.cancelActiveCascade();
                        
                        // Small delay for cancel to take effect
                        await new Promise(r => setTimeout(r, 500));
                        
                        // Send context-aware prompt
                        const prompt = isSkip 
                            ? `Skip. Continue without answering.`
                            : `${btnText}. Please proceed.`;
                        const ok = await this.server.sendPrompt(prompt);
                        
                        if (ok) {
                            const statusMsg = await this.bot.sendMessage(chatId, '⏳ Đang chờ AI phản hồi...');
                            this.initResponseTracking(prompt, chatId, statusMsg.message_id);
                        } else {
                            const activeCascadeId = await this.server.getActiveCascadeId();
                            if (!activeCascadeId) {
                                this.bot.sendMessage(chatId, `🧪 [Mock Test] Đã gửi lựa chọn "${btnText}" thành công.`);
                            } else {
                                this.bot.sendMessage(chatId, `❌ Không gửi được "${btnText}" cho AI.`);
                            }
                        }
                    } else {
                        this.server.log(`[Telegram] ⚠️ No pending button at index ${idx}.`);
                    }
                }

                if (data?.startsWith('dlg_opt_')) {
                    const idx = parseInt(data.replace('dlg_opt_', ''), 10);
                    const optText = this.pendingDialogOptions[idx];
                    this.server.log(`[Telegram] 🔘 Option select: idx=${idx}, text="${optText || 'undefined'}"`);

                    if (optText) {
                        this.bot.answerCallbackQuery(query.id, { text: 'Đang xử lý lựa chọn...' });
                        
                        // Edit message immediately to give instant visual feedback
                        this.bot.editMessageText(`✅ Đã chọn: "${optText}"`, {
                            chat_id: chatId,
                            message_id: query.message?.message_id
                        }).catch((e) => {
                            this.server.log(`[Telegram] ❌ Failed to edit message on option select: ${e?.message || e}`);
                        });
                        
                        // Cancel current cascade to dismiss the dialog
                        await this.server.cancelActiveCascade();
                        
                        await new Promise(r => setTimeout(r, 500));
                        
                        // Send the selected option as context
                        const prompt = `I choose: "${optText}". Please continue with this selection.`;
                        const ok = await this.server.sendPrompt(prompt);
                        
                        if (ok) {
                            const statusMsg = await this.bot.sendMessage(chatId, '⏳ Đang chờ AI phản hồi...');
                            this.initResponseTracking(prompt, chatId, statusMsg.message_id);
                        } else {
                            const activeCascadeId = await this.server.getActiveCascadeId();
                            if (!activeCascadeId) {
                                this.bot.sendMessage(chatId, `🧪 [Mock Test] Đã chọn: "${optText}"`);
                            } else {
                                this.bot.sendMessage(chatId, `❌ Không gửi được lựa chọn cho AI.`);
                            }
                        }
                    } else {
                        this.server.log(`[Telegram] ⚠️ No pending option at index ${idx}.`);
                        this.bot.sendMessage(chatId, `❌ Không tìm thấy tùy chọn tương ứng.`);
                    }
                }

                if (data === 'dlg_writein') {
                    this.bot.answerCallbackQuery(query.id, { text: 'Hãy gõ câu trả lời...' });
                    
                    // Edit message immediately to give instant visual feedback
                    this.bot.editMessageText('✅ Đã chọn: Tự viết câu trả lời', {
                        chat_id: chatId,
                        message_id: query.message?.message_id
                    }).catch((e) => {
                        this.server.log(`[Telegram] ❌ Failed to edit message on writein select: ${e?.message || e}`);
                    });

                    this.bot.sendMessage(chatId, '✏️ Hãy gõ câu trả lời vào tin nhắn tiếp theo.\n_AI sẽ nhận được câu trả lời của bạn._', { parse_mode: 'Markdown' });
                    
                    // Cancel cascade to clear the dialog, next user message will be sent as new prompt
                    await this.server.cancelActiveCascade();
                }
            } catch (err: any) {
                this.server.log(`[Telegram] ❌ Error in callback_query listener: ${err?.stack || err}`);
            }
        });
    }

    private async handleTextMessage(msg: TelegramBot.Message, chatId: number) {
        const text = msg.text!;

        if (text === '/stop') {
            this.server.log(`[Telegram] User requested /stop`);
            await this.server.triggerStop();
            this.bot.sendMessage(chatId, '🛑 Đã yêu cầu dừng AI...');
            return;
        }

        if (text === '/start' || text === '/help') {
            this.bot.sendMessage(chatId, '👋 Antigravity Link đã kết nối.\nBạn có thể chat trực tiếp với IDE tại đây.\n\nCác lệnh hỗ trợ:\n/new - Tạo cuộc hội thoại mới\n/list - Liệt kê các cuộc hội thoại\n/plan - Xem kế hoạch (Implementation Plan)\n/approve - Phê duyệt kế hoạch\n/task - Xem Task hiện tại\n/walkthrough - Xem Walkthrough\n/stop - Dừng AI đang chạy\n/reload - Khởi động lại VS Code window\n/version - Xem phiên bản');
            return;
        }

        if (text === '/reload') {
            this.server.log(`[Telegram] User requested /reload (reload VS Code window)`);
            try {
                await this.bot.sendMessage(chatId, '🔄 Đang khởi động lại IDE window...');
            } catch (err) {
                this.server.log(`[Telegram] Failed to send reload confirmation message: ${err}`);
            }
            // Delay 1 second to ensure message is sent and state is saved
            await new Promise(resolve => setTimeout(resolve, 1000));
            const success = await this.server.reloadWindow();
            if (!success) {
                this.bot.sendMessage(chatId, '❌ Lỗi khi khởi động lại IDE.');
            }
            return;
        }

        if (text === '/new') {
            this.server.log(`[Telegram] User requested /new (start new conversation)`);
            const success = await this.server.startNewConversation();
            if (success) {
                this.bot.sendMessage(chatId, '🆕 Đã tạo cuộc hội thoại mới thành công! Bạn có thể bắt đầu chat ngay tại đây.');
                this.activeMessageId = null;
                this.activeChatId = chatId;
                this.lastSentText = '';
                this.hasStartedGenerating = false;
                this.responseSent = false;
            } else {
                this.bot.sendMessage(chatId, '❌ Lỗi khi khởi tạo cuộc hội thoại mới.');
            }
            return;
        }

        // ── /list — Liệt kê cuộc hội thoại ───────────────────────────────────────
        if (text === '/list') {
            await this.sendOrUpdateConversationList(chatId);
            return;
        }

        if (text === '/version') {
            this.bot.sendMessage(chatId, '🟢 Đang chạy phiên bản code mới nhất (v2) - Đã sửa lỗi gom tin nhắn!');
            return;
        }

        if (text === '/task' || text === '/walkthrough') {
            const isTask = text === '/task';
            const fileName = isTask ? 'task.md.resolved' : 'walkthrough.md.resolved';
            const filePath = this.server.findBrainFile(fileName);

            if (!filePath) {
                this.bot.sendMessage(chatId, `❌ Không tìm thấy file ${isTask ? 'Task' : 'Walkthrough'} nào trong session hiện tại.`);
                return;
            }

            try {
                await this.bot.sendDocument(chatId, filePath, {
                    caption: `📄 **${isTask ? 'Task' : 'Walkthrough'}** mới nhất của bạn đây!`,
                    parse_mode: 'Markdown'
                });
            } catch (e) {
                this.bot.sendMessage(chatId, `❌ Lỗi khi gửi file: ${(e as Error).message}`);
            }
            return;
        }

        // ── /plan — Xem Implementation Plan ─────────────────────────────
        if (text === '/plan') {
            await this.sendPlanToUser(chatId);
            return;
        }

        // ── /approve — Phê duyệt kế hoạch / cấp quyền ──────────────────
        if (text === '/approve' || text === '/yes' || text === '/ok') {
            const statusMsg = await this.bot.sendMessage(chatId, '⏳ Đang gửi phê duyệt...');
            const success = await this.server.sendPrompt('Approved. Go ahead and implement the plan.');
            if (success) {
                this.initResponseTracking('Approved. Go ahead and implement the plan.', chatId, statusMsg.message_id);
                this.bot.editMessageText('✅ Đã gửi phê duyệt vào IDE. Đang chờ AI thực thi...', {
                    chat_id: chatId,
                    message_id: statusMsg.message_id
                }).catch(() => { });
            } else {
                this.bot.editMessageText('❌ Không thể gửi phê duyệt (IDE có thể mất kết nối).', {
                    chat_id: chatId,
                    message_id: statusMsg.message_id
                }).catch(() => { });
            }
            return;
        }

        // Send text prompt to IDE
        this.server.log(`[Telegram] 📥 Nhận lệnh từ user: "${text}"`);

        // Cancel timers cũ nếu user gửi message mới trong khi đang xử lý
        if (this.clearActiveTimer) {
            clearTimeout(this.clearActiveTimer);
            this.clearActiveTimer = null;
        }
        if (this.pendingUpdate) {
            clearTimeout(this.pendingUpdate);
            this.pendingUpdate = null;
        }

        const initMsg = await this.bot.sendMessage(chatId, '⏳ Đang gửi vào IDE...');
        this.initResponseTracking(text, chatId, initMsg.message_id);

        const success = await this.server.sendPrompt(text);
        if (!success) {
            this.server.log(`[Telegram] ❌ Gửi lệnh thất bại`);
            this.bot.editMessageText('❌ Lỗi: Không thể gửi tin nhắn vào IDE (Có thể bị mất kết nối Webview).', {
                chat_id: chatId,
                message_id: initMsg.message_id
            }).catch(() => { });
            this.activeMessageId = null;
        }
    }

    private async handleFile(msg: TelegramBot.Message, chatId: number) {
        let fileId = '';
        let fileName = '';

        if (msg.document) {
            fileId = msg.document.file_id;
            fileName = msg.document.file_name || `file_${Date.now()}`;
        } else if (msg.photo && msg.photo.length > 0) {
            // Get highest resolution photo
            const photo = msg.photo[msg.photo.length - 1];
            fileId = photo.file_id;
            fileName = `photo_${Date.now()}.jpg`;
        }

        if (!fileId) return;

        try {
            const statusMsg = await this.bot.sendMessage(chatId, `⏳ Đang tải file xuống...`);
            const downloadedPath = await this.bot.downloadFile(fileId, this.uploadsDir);

            // Rename file to proper extension if possible
            const finalPath = path.join(this.uploadsDir, `${Date.now()}_${fileName}`);
            fs.renameSync(downloadedPath, finalPath);

            await this.bot.editMessageText(`✅ Đã tải file: ${fileName}`, {
                chat_id: chatId,
                message_id: statusMsg.message_id
            });

            // Send caption (with file path context) as a prompt to the AI
            const caption = msg.caption || '';
            const promptText = caption 
                ? `[File đính kèm: ${finalPath}]\n\n${caption}`
                : `Người dùng gửi file: ${finalPath}`;
            
            this.initResponseTracking(promptText, chatId, statusMsg.message_id);
            const promptSuccess = await this.server.sendPrompt(promptText);
            if (!promptSuccess) {
                await this.bot.editMessageText(`❌ Lỗi: Không thể gửi prompt cho AI.`, {
                    chat_id: chatId,
                    message_id: statusMsg.message_id
                }).catch(() => {});
                this.activeMessageId = null;
            }
        } catch (err) {
            this.server.log(`[Telegram] Error handling file: ${err}`);
            this.bot.sendMessage(chatId, `❌ Lỗi khi xử lý file: ${(err as Error).message}`);
        }
    }

    private waitingForInputSent: boolean = false;

    private initResponseTracking(promptText: string, chatId: number, messageId: number) {
        if (this.clearActiveTimer) {
            clearTimeout(this.clearActiveTimer);
            this.clearActiveTimer = null;
        }
        if (this.pendingUpdate) {
            clearTimeout(this.pendingUpdate);
            this.pendingUpdate = null;
        }
        if (this.defaultTimeoutTimer) {
            clearTimeout(this.defaultTimeoutTimer);
            this.defaultTimeoutTimer = null;
        }

        this.activeMessageId = messageId;
        this.activeChatId = chatId;
        this.lastSentText = '';
        this.activeUserPrompt = promptText.trim();
        this.lastSendTime = Date.now();
        this.hasStartedGenerating = false;
        this.responseSent = false;
        this.waitingForInputSent = false;

        // Default safety-net timer if no snapshots are received or AI never changes state
        this.defaultTimeoutTimer = setTimeout(() => {
            this.defaultTimeoutTimer = null;
            if (this.activeMessageId && this.activeChatId && !this.responseSent && !this.hasStartedGenerating) {
                this.server.log(`[Telegram] ⚠️ Default timeout: không có biến động sau 5s, gửi phản hồi hiện tại...`);
                this.responseSent = true;
                this.sendFinalResponse();
            }
        }, 5000);
    }

    public handleLSTrajectory(text: string, isGenerating: boolean, hasActiveDialogs: boolean = false, stepStatusText: string = '') {
        this.checkAndAutoSendBrainFiles().catch(() => {});

        if (!this.activeMessageId || !this.activeChatId) return;

        // Edit status message with real-time steps progress and response preview
        if (isGenerating && stepStatusText && stepStatusText !== this.lastStatusText) {
            this.lastStatusText = stepStatusText;
            this.bot.editMessageText(stepStatusText, {
                chat_id: this.activeChatId,
                message_id: this.activeMessageId,
                parse_mode: 'Markdown'
            }).catch(() => {});
        }

        if (text) {
            // Luôn cập nhật text mới nhất trong memory (không gửi ngay)
            const textChanged = text !== this.lastSentText;
            if (textChanged) {
                this.lastSentText = text;

                // Reset safety-net timer mỗi khi text thay đổi.
                if (this.pendingUpdate) {
                    clearTimeout(this.pendingUpdate);
                    this.pendingUpdate = null;
                }
                
                // Don't set safety-net when dialogs are active — AI is waiting for user, not generating
                if (!hasActiveDialogs) {
                    const waitTime = isGenerating ? 15_000 : 3_000;
                    
                    this.pendingUpdate = setTimeout(() => {
                        this.pendingUpdate = null;
                        if (this.activeMessageId && this.activeChatId && !this.responseSent) {
                            this.server.log(`[Telegram] ⚠️ Safety-net: text ngừng đổi ${waitTime / 1000}s, gửi phản hồi...`);
                            this.hasStartedGenerating = false;
                            this.responseSent = true;
                            this.sendFinalResponse();
                        }
                    }, waitTime);
                }
            }

            // ── Text-based dialog detection ──
            const lower = text.toLowerCase();
            const hasWaiting = lower.includes('waiting for user input') || lower.includes('waiting for user');
            if (!hasWaiting) {
                this.waitingForInputSent = false;
                // Note: don't clear processedDialogHashes here — managed by handleDialogProbe
            }
        }

        if (isGenerating) {
            // Clear default timeout once we know generation has started
            if (this.defaultTimeoutTimer) {
                clearTimeout(this.defaultTimeoutTimer);
                this.defaultTimeoutTimer = null;
            }
            this.hasStartedGenerating = true;
            this.responseSent = false;
        } else if (this.hasStartedGenerating && !this.responseSent && !hasActiveDialogs) {
            // IDE báo generation xong → gửi phản hồi cuối cùng (chỉ 1 lần)
            // But NOT when there are active dialogs — AI is waiting for user input, not done
            this.hasStartedGenerating = false;
            this.lastStatusText = ''; // Clear for next time

            if (this.pendingUpdate) {
                clearTimeout(this.pendingUpdate);
                this.pendingUpdate = null;
            }

            this.server.log(`[Telegram] ✅ AI hoàn tất, gửi phản hồi cuối cùng...`);
            this.responseSent = true;
            this.sendFinalResponse();
        }
    }

    /**
     * Gửi phản hồi cuối cùng về Telegram.
     * - Edit message gốc thành response (hoặc phần đầu nếu dài)
     * - Nếu response > 4096 chars → gửi tiếp bằng message mới
     * - Sau khi gửi xong → schedule clear tracking (có thể cancel)
     */
    private sendFinalResponse() {
        if (!this.activeMessageId || !this.activeChatId) return;
        // Update send timestamp → cooldown
        this.lastSendTime = Date.now();
        const chatId = this.activeChatId;
        const messageId = this.activeMessageId;
        const fullText = this.lastSentText;

        if (!fullText) {
            const emptyText = this.activeUserPrompt
                ? '✅ AI đã hoàn tất (không có nội dung text).'
                : '_(Cuộc hội thoại trống hoặc không có nội dung text)_';
            this.bot.editMessageText(emptyText, {
                chat_id: chatId,
                message_id: messageId
            }).catch(() => { });
            this.scheduleClearActive();
            return;
        }

        // Auto-detect: AI đang chờ phê duyệt kế hoạch?
        // Chỉ nhận diện plan nếu prompt không phải là phê duyệt plan
        const isApprovePrompt = this.activeUserPrompt === 'Approved. Go ahead and implement the plan.';
        if (!isApprovePrompt && this.looksLikePlanRequest(fullText)) {
            this.server.log(`[Telegram] 🔔 Phát hiện AI đang chờ phê duyệt kế hoạch`);
            // Chỉ gửi nút bấm, không gửi toàn bộ nội dung plan
            this.bot.editMessageText('📋 *AI đã tạo Implementation Plan và đang chờ phê duyệt.* Bạn muốn:', {
                chat_id: chatId,
                message_id: messageId,
                parse_mode: 'Markdown',
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '✅ Approve', callback_data: 'approve_plan' },
                            { text: '📄 Xem Plan', callback_data: 'view_plan' }
                        ],
                        [
                            { text: '✏️ Sửa / Reject', callback_data: 'reject_plan' }
                        ]
                    ]
                }
            }).catch(() => { });
            this.scheduleClearActive();
            return;
        }

        // Không phải plan → gửi response bình thường
        const MAX_LEN = 4000; // leave margin for safety
        const chunks = this.splitMessage(fullText, MAX_LEN);

        this.sendTelegramText(chatId, chunks[0], messageId)
            .then(async () => {
                for (let i = 1; i < chunks.length; i++) {
                    await this.sendTelegramText(chatId, chunks[i]);
                }
            })
            .catch(() => { })
            .finally(() => {
                this.scheduleClearActive();
            });
    }

    /**
     * Gửi text qua Telegram. Nếu có messageId → edit, không thì gửi mới.
     * Tự động fallback sang plain text nếu Markdown bị lỗi.
     */
    private async sendTelegramText(chatId: number, text: string, editMessageId?: number): Promise<void> {
        const safeText = text.replace(/[*_`\[\]()]/g, '');
        try {
            if (editMessageId) {
                await this.bot.editMessageText(text, {
                    chat_id: chatId,
                    message_id: editMessageId,
                    parse_mode: 'Markdown'
                });
            } else {
                await this.bot.sendMessage(chatId, text, { parse_mode: 'Markdown' });
            }
        } catch {
            try {
                if (editMessageId) {
                    await this.bot.editMessageText(safeText, {
                        chat_id: chatId,
                        message_id: editMessageId
                    });
                } else {
                    await this.bot.sendMessage(chatId, safeText);
                }
            } catch { /* swallow */ }
        }
    }

    /**
     * Split text thành chunks <= maxLen, cắt tại newline gần nhất.
     */
    private splitMessage(text: string, maxLen: number): string[] {
        if (text.length <= maxLen) return [text];
        const chunks: string[] = [];
        let remaining = text;
        while (remaining.length > 0) {
            if (remaining.length <= maxLen) {
                chunks.push(remaining);
                break;
            }
            // Tìm newline gần nhất trước maxLen để cắt đẹp
            let cutAt = remaining.lastIndexOf('\n', maxLen);
            if (cutAt < maxLen * 0.5) cutAt = maxLen; // nếu không tìm được newline hợp lý, cắt cứng
            chunks.push(remaining.substring(0, cutAt));
            remaining = remaining.substring(cutAt).trimStart();
        }
        return chunks;
    }

    /**
     * Schedule clear activeMessageId/activeChatId.
     * Tracked để cancel được khi user gửi message mới.
     */
    private scheduleClearActive() {
        if (this.clearActiveTimer) {
            clearTimeout(this.clearActiveTimer);
        }
        this.clearActiveTimer = setTimeout(() => {
            this.clearActiveTimer = null;
            this.activeMessageId = null;
            this.activeChatId = null;
        }, 3000);
    }

    /**
     * Kiểm tra xem AI response có đang yêu cầu phê duyệt kế hoạch không.
     */
    private looksLikePlanRequest(text: string): boolean {
        const lower = text.toLowerCase();
        const hasPlanKeyword =
            lower.includes('implementation plan') ||
            lower.includes('implementation_plan') ||
            lower.includes('kế hoạch') ||
            lower.includes('proposed changes');
        const hasApprovalKeyword =
            lower.includes('review') ||
            lower.includes('approve') ||
            lower.includes('approval') ||
            lower.includes('feedback') ||
            lower.includes('phê duyệt') ||
            lower.includes('xem xét') ||
            lower.includes('waiting for') ||
            lower.includes('please review');
        return hasPlanKeyword && hasApprovalKeyword;
    }

    /**
     * Handle dialog probe results from LS RPC (called by core.ts).
     * Receives structured data about permission/question/command dialogs
     * detected in the full IDE DOM (not just the chat snapshot).
     */
    private lastDialogSentTime: number = 0;

    public handleDialogProbe(probe: { buttons: Array<{text: string; type: string}>; options: string[]; context: string; hash: string } | null) {
        const chatId = this.allowedChatId;
        if (!chatId) return;

        if (!probe) return;

        // Use probe.hash for dedup
        const stableHash = probe.hash.startsWith('ls_') 
            ? probe.hash 
            : probe.buttons.map(b => `${b.type}:${b.text}`).sort().join('|');

        // Dedup: skip if we already sent this dialog
        if (this.processedDialogHashes.has(stableHash)) return;

        // Throttle: max 1 dialog per 2s
        if (Date.now() - this.lastDialogSentTime < 2_000) return;

        this.processedDialogHashes.add(stableHash);
        this.lastDialogSentTime = Date.now();

        this.server.log(`[Telegram] 🔔 Dialog detected: ${probe.hash}`);

        // Store for callback handlers
        this.pendingDialogButtons = probe.buttons.map(b => b.text);
        this.pendingDialogOptions = probe.options;

        // Determine primary dialog type
        const type = probe.buttons[0]?.type || 'unknown';
        let emoji = '🔔';
        let title = 'AI đang chờ phản hồi';
        if (type === 'permission') { emoji = '🔐'; title = 'AI đang xin quyền truy cập'; }
        if (type === 'command') { emoji = '💻'; title = 'AI muốn chạy lệnh'; }
        if (type === 'question') { emoji = '❓'; title = 'AI đang hỏi bạn'; }

        // Clean context text
        let contextText = (probe.context || '').replace(/\s+/g, ' ').trim();
        if (contextText.length > 300) contextText = contextText.substring(0, 297) + '...';

        // Build Telegram keyboard
        const keyboard: Array<Array<{ text: string; callback_data: string }>> = [];

        // Options as rows (for questions)
        probe.options.forEach((opt, i) => {
            const displayText = opt.length > 55 ? opt.substring(0, 52) + '...' : opt;
            keyboard.push([{ text: `${i + 1}. ${displayText}`, callback_data: `dlg_opt_${i}` }]);
        });

        // Write-in button for question dialogs (always available in IDE)
        if (type === 'question' && probe.options.length > 0) {
            keyboard.push([{ text: '✏️ Viết câu trả lời khác', callback_data: 'dlg_writein' }]);
        }

        // Action buttons — each as its own row for readability
        probe.buttons.forEach((b, i) => {
            let prefix = '';
            const lower = b.text.toLowerCase();
            if (['allow', 'yes', 'approve', 'run', 'execute', 'submit'].some(p => lower.includes(p))) prefix = '✅ ';
            if (['deny', 'block', 'reject', 'skip', 'cancel'].some(p => lower.includes(p))) prefix = '❌ ';
            if (lower === 'no') prefix = '❌ ';
            const displayText = b.text.length > 50 ? b.text.substring(0, 47) + '...' : b.text;
            keyboard.push([{ text: `${prefix}${displayText}`, callback_data: `dlg_btn_${i}` }]);
        });

        // Build message
        const msgParts = [`${emoji} *${title}*`];
        if (contextText) msgParts.push(`\n\n\`\`\`\n${contextText}\n\`\`\``);

        const msgText = msgParts.join('');

        this.bot.sendMessage(chatId, msgText, {
            parse_mode: 'Markdown',
            reply_markup: { inline_keyboard: keyboard }
        }).catch(async () => {
            // Fallback: send without markdown
            await this.bot.sendMessage(chatId, msgText.replace(/[*_`]/g, ''), {
                reply_markup: { inline_keyboard: keyboard }
            }).catch(() => { });
        });
    }

    /**
     * Tìm và gửi Implementation Plan qua Telegram.
     */
    private async sendPlanToUser(chatId: number) {
        const planFile = this.getLatestFile([
            'implementation_plan.md',
            'implementation_plan.md.resolved'
        ]);

        if (!planFile) {
            this.bot.sendMessage(chatId, '❌ Không tìm thấy Implementation Plan nào trong session hiện tại.');
            return;
        }

        const filePath = planFile.filePath;

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content.length > 3500) {
                // File dài → gửi dưới dạng file kèm preview
                const preview = content.substring(0, 1500) + '\n\n... _(file quá dài, xem file đính kèm)_';
                await this.bot.sendMessage(chatId, `📋 *Implementation Plan (preview):*\n\n${preview}`, {
                    parse_mode: 'Markdown'
                }).catch(async () => {
                    // Markdown failed, send plain
                    await this.bot.sendMessage(chatId, `📋 Implementation Plan (preview):\n\n${preview}`);
                });
                await this.bot.sendDocument(chatId, filePath, {
                    caption: '📄 File kế hoạch đầy đủ'
                });
            } else {
                // File ngắn → gửi trực tiếp dưới dạng text
                await this.bot.sendMessage(chatId, `📋 *Implementation Plan:*\n\n${content}`, {
                    parse_mode: 'Markdown'
                }).catch(async () => {
                    await this.bot.sendMessage(chatId, `📋 Implementation Plan:\n\n${content}`);
                });
            }

            // Thêm nút approve nếu user đang xem plan
            await this.bot.sendMessage(chatId, '👇 Bạn muốn:', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: '✅ Approve', callback_data: 'approve_plan' },
                            { text: '✏️ Sửa / Reject', callback_data: 'reject_plan' }
                        ]
                    ]
                }
            });

            const currentPlanHash = this.getFileHash(filePath);
            if (currentPlanHash) {
                this.lastPlanHash = currentPlanHash;
            }
        } catch (e) {
            this.bot.sendMessage(chatId, `❌ Lỗi đọc file kế hoạch: ${(e as Error).message}`);
        }
    }

    /**
     * Strip Antigravity IDE UI noise from extracted text.
     * Removes tool execution metadata, diff stats, button labels, etc.
     */
    private cleanUiNoise(text: string): string {
        return text
            // Tool execution time: "Worked for 19s", "Ran for 5s"
            .replace(/^.*(?:Worked|Ran|Running) for \d+m?\d*s.*$/gm, '')
            // Diff stats: "+12 -17", "+ 5 - 3"
            .replace(/^\s*\+\s*\d+\s*\n\s*-\s*\d+\s*$/gm, '')
            .replace(/^\s*\+\d+\s+-\d+\s*$/gm, '')
            // File change summaries: "1 file changed", "3 files changed"
            .replace(/^\s*\d+ files? changed\s*$/gm, '')
            // Standalone button/action labels
            .replace(/^\s*(?:Review|Approve|Reject|Skip|Cancel|Submit|Undo|Redo)\s*$/gm, '')
            // Tool action summaries: "Explored 4 files, 2 folders", "Edited 1 file"
            .replace(/^\s*(?:Explored|Edited|Created|Deleted|Viewed|Searched|Analyzed)\s+\d+\s+\w+.*$/gm, '')
            // "Thought for Xs" (already partially handled but ensure full cleanup)
            .replace(/^\s*(?:Thought for \d+s|Thought)\s*$/gm, '')
            // Timestamps like "12:30 AM"
            .replace(/^\s*\d{1,2}:\d{2}\s*(?:AM|PM)\s*$/gm, '')
            // Strip extension host / CDP / debug logs printed in chat
            .replace(/^.*\[(?:Core|Telegram|DIAG|TRACE)\].*$/gm, '')
            // Collapse resulting empty lines
            .replace(/\n{3,}/g, '\n\n')
            .trim();
    }

    private extractText(html: string): string {
        try {
            let cleanHtml = html
                .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
                .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
                .replace(/<svg[^>]*>[\s\S]*?<\/svg>/gi, '')
                .replace(/<details[^>]*>[\s\S]*?<\/details>/gi, '');

            const $ = cheerio.load(cleanHtml);

            // Only add newlines after semantic content elements — NOT layout wrappers
            // like div/article/section which are heavily nested in VS Code webviews
            // and cause word-per-line issues.
            $('p, li, h1, h2, h3, h4, h5, h6, pre, blockquote, br').each((i, el) => {
                const tag = ('tagName' in el) ? (el as any).tagName.toLowerCase() : '';
                if (tag === 'br') {
                    $(el).replaceWith('\n');
                } else {
                    $(el).append(' \n');
                }
            });
            $('.monaco-tl-twistie, [aria-label="Thought process"]').remove();

            let blocks = $('.markdown-body, .chat-message-content, .rendered-markdown, .artifact-card');
            if (blocks.length === 0) {
                blocks = $('[role="article"]');
            }

            if (blocks.length > 0) {
                let userPromptIndex = -1;

                for (let i = blocks.length - 1; i >= 0; i--) {
                    const targetEl = $(blocks[i]);
                    let text = targetEl.text().trim();
                    let clean = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
                    clean = this.cleanUiNoise(clean);

                    const cleanNoSpace = clean.replace(/\s+/g, '');
                    const promptNoSpace = this.activeUserPrompt.replace(/\s+/g, '');

                    let isUserPrompt = false;
                    if (promptNoSpace) {
                        if (cleanNoSpace === promptNoSpace) {
                            isUserPrompt = true;
                        } else if (promptNoSpace.includes(cleanNoSpace) && cleanNoSpace.length > 5) {
                            isUserPrompt = true;
                        } else if (cleanNoSpace.includes(promptNoSpace) && cleanNoSpace.length - promptNoSpace.length < 30) {
                            isUserPrompt = true;
                        }
                    }

                    if (isUserPrompt) {
                        userPromptIndex = i;
                        break;
                    }
                }

                if (userPromptIndex !== -1 && userPromptIndex < blocks.length - 1) {
                    let fullResponse = '';
                    for (let i = userPromptIndex + 1; i < blocks.length; i++) {
                        const targetEl = $(blocks[i]);
                        let text = targetEl.text().trim();
                        let clean = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
                        clean = this.cleanUiNoise(clean);
                        if (clean) {
                            fullResponse += clean + '\n\n';
                        }
                    }
                    return fullResponse.trim();
                } else if (userPromptIndex === blocks.length - 1) {
                    return '';
                } else {
                    const targetEl = $(blocks[blocks.length - 1]);
                    let text = targetEl.text().trim();
                    let clean = text.replace(/[ \t]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
                    clean = this.cleanUiNoise(clean);
                    return clean;
                }
            }
            return '';
        } catch (e) {
            return '';
        }
    }

    private getStateFilePath(): string {
        return path.join(os.homedir(), '.ag-link', 'telegram-state.json');
    }

    private getTelegramState(): Record<string, number> {
        const filePath = this.getStateFilePath();
        try {
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf8');
                return JSON.parse(content) || {};
            }
        } catch (err) {
            this.server.log(`[Telegram] Error reading state file: ${err}`);
        }
        return {};
    }

    private saveTelegramState(state: Record<string, number>) {
        const filePath = this.getStateFilePath();
        try {
            fs.writeFileSync(filePath, JSON.stringify(state, null, 2), 'utf8');
        } catch (err) {
            this.server.log(`[Telegram] Error writing state file: ${err}`);
        }
    }

    public sendReplyToUser(text: string) {
        const targetId = this.allowedChatId;
        if (targetId) {
            this.bot.sendMessage(targetId, text, { parse_mode: 'Markdown' }).catch(e => {
                this.bot.sendMessage(targetId, text).catch(err => this.server.log(`[Telegram] Error sending reply: ${err}`));
            });
        }
    }

    private getActiveSessionDir(): string {
        const brainDir = path.join(os.homedir(), '.gemini', 'antigravity-ide', 'brain');
        if (!fs.existsSync(brainDir)) return '';
        try {
            const entries = fs.readdirSync(brainDir, { withFileTypes: true })
                .filter(e => e.isDirectory())
                .map(e => ({ name: e.name, full: path.join(brainDir, e.name), mtime: fs.statSync(path.join(brainDir, e.name)).mtimeMs }))
                .sort((a, b) => b.mtime - a.mtime);
            return entries[0]?.full || '';
        } catch {
            return '';
        }
    }

    private getLatestFile(filenames: string[]): { filePath: string; mtime: number } | null {
        let latestPath: string | null = null;
        let maxMtime = 0;
        for (const name of filenames) {
            const filePath = this.server.findBrainFile(name);
            if (filePath && fs.existsSync(filePath)) {
                try {
                    const mtime = fs.statSync(filePath).mtimeMs;
                    if (mtime > maxMtime) {
                        maxMtime = mtime;
                        latestPath = filePath;
                    }
                } catch {}
            }
        }
        return latestPath ? { filePath: latestPath, mtime: maxMtime } : null;
    }

    private getFileHash(filePath: string): string {
        try {
            if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath);
                return crypto.createHash('sha256').update(content).digest('hex');
            }
        } catch {}
        return '';
    }

    private async sendWalkthroughToUser(chatId: number) {
        const wtFile = this.getLatestFile([
            'walkthrough.md',
            'walkthrough.md.resolved'
        ]);

        if (!wtFile) return;

        const filePath = wtFile.filePath;

        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            if (content.length > 3500) {
                const preview = content.substring(0, 1500) + '\n\n... _(file quá dài, xem file đính kèm)_';
                await this.bot.sendMessage(chatId, `🎉 *Walkthrough (preview):*\n\n${preview}`, {
                    parse_mode: 'Markdown'
                }).catch(async () => {
                    await this.bot.sendMessage(chatId, `🎉 Walkthrough (preview):\n\n${preview}`);
                });
                await this.bot.sendDocument(chatId, filePath, {
                    caption: '📄 File walkthrough chi tiết'
                });
            } else {
                await this.bot.sendMessage(chatId, `🎉 *Walkthrough:*\n\n${content}`, {
                    parse_mode: 'Markdown'
                }).catch(async () => {
                    await this.bot.sendMessage(chatId, `🎉 Walkthrough:\n\n${content}`);
                });
            }

            const currentWalkthroughHash = this.getFileHash(filePath);
            if (currentWalkthroughHash) {
                this.lastWalkthroughHash = currentWalkthroughHash;
            }
        } catch (e) {
            this.server.log(`[Telegram] Error sending walkthrough: ${e}`);
        }
    }

    private async checkAndAutoSendBrainFiles() {
        const chatId = this.allowedChatId;
        if (!chatId) return;

        const now = Date.now();
        if (now - this.lastAutoCheckTime < 2000) return;
        this.lastAutoCheckTime = now;

        const currentSessionDir = this.getActiveSessionDir();
        if (currentSessionDir !== this.lastActiveSessionDir) {
            this.server.log(`[Telegram] 🔄 Phát hiện chuyển session/thư mục cuộc hội thoại sang: ${path.basename(currentSessionDir)}`);
            this.lastActiveSessionDir = currentSessionDir;
            this.processedDialogHashes.clear();
            
            // Re-initialize hashes for the new session
            const planFile = this.getLatestFile([
                'implementation_plan.md',
                'implementation_plan.md.resolved'
            ]);
            this.lastPlanHash = planFile ? this.getFileHash(planFile.filePath) : '';

            const wtFile = this.getLatestFile([
                'walkthrough.md',
                'walkthrough.md.resolved'
            ]);
            this.lastWalkthroughHash = wtFile ? this.getFileHash(wtFile.filePath) : '';
            return;
        }

        const planFile = this.getLatestFile([
            'implementation_plan.md',
            'implementation_plan.md.resolved'
        ]);
        if (planFile) {
            const currentPlanHash = this.getFileHash(planFile.filePath);
            if (currentPlanHash && currentPlanHash !== this.lastPlanHash) {
                this.lastPlanHash = currentPlanHash;
                this.server.log(`[Telegram] 🔔 Tự động gửi Implementation Plan mới cập nhật (content hash changed)`);
                await this.sendPlanToUser(chatId);
            }
        }
    }

    private async sendOrUpdateConversationList(chatId: number, editMessageId?: number) {
        try {
            const trajectories = await getAllTrajectoriesFromLs();
            if (trajectories.length === 0) {
                const emptyText = '❌ Không tìm thấy cuộc hội thoại nào trong hệ thống.';
                if (editMessageId) {
                    await this.bot.editMessageText(emptyText, {
                        chat_id: chatId,
                        message_id: editMessageId
                    });
                } else {
                    await this.bot.sendMessage(chatId, emptyText);
                }
                return;
            }

            // Show only last 10 trajectories
            const list = trajectories.slice(0, 10).reverse();
            let activeId = '';
            try {
                activeId = await this.server.getActiveCascadeId();
            } catch (err) {
                this.server.log(`[Telegram] Failed to get active cascade ID for list: ${err}`);
            }

            const buttons = list.map((t) => {
                const isActive = t.id === activeId;
                const prefix = isActive ? '🟢 ' : '';
                const title = t.title || 'Untitled';
                const displayTitle = (prefix + title).length > 25 
                    ? (prefix + title).substring(0, 22) + '...' 
                    : prefix + title;
                return [{ text: displayTitle, callback_data: `switch_${t.id}` }];
            });

            const text = '📋 *Danh sách 10 cuộc hội thoại gần đây:*';

            if (editMessageId) {
                await this.bot.editMessageText(text, {
                    chat_id: chatId,
                    message_id: editMessageId,
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: buttons
                    }
                });
            } else {
                await this.bot.sendMessage(chatId, text, {
                    parse_mode: 'Markdown',
                    reply_markup: {
                        inline_keyboard: buttons
                    }
                });
            }
        } catch (err) {
            const errorMsg = `❌ Lỗi khi lấy danh sách cuộc hội thoại: ${(err as Error).message}`;
            if (editMessageId) {
                await this.bot.editMessageText(errorMsg, {
                    chat_id: chatId,
                    message_id: editMessageId
                }).catch(() => {});
            } else {
                await this.bot.sendMessage(chatId, errorMsg).catch(() => {});
            }
        }
    }

    public stop() {
        try {
            if (this.lockInterval) {
                clearInterval(this.lockInterval);
                this.lockInterval = null;
            }
            this.releaseLock();
            if (this.autoCheckInterval) {
                clearInterval(this.autoCheckInterval);
                this.autoCheckInterval = null;
            }
            if (this.pendingUpdate) {
                clearTimeout(this.pendingUpdate);
                this.pendingUpdate = null;
            }
            if (this.defaultTimeoutTimer) {
                clearTimeout(this.defaultTimeoutTimer);
                this.defaultTimeoutTimer = null;
            }
            if (this.clearActiveTimer) {
                clearTimeout(this.clearActiveTimer);
                this.clearActiveTimer = null;
            }
            this.bot.stopPolling();
            this.server.log('[Telegram] Đã ngắt kết nối bot');
        } catch (e) {
            this.server.log(`[Telegram] Error stopping polling: ${e}`);
        }
    }

    private acquireLock() {
        const lockPath = path.join(os.homedir(), '.ag-link', 'bot.lock');
        const lock = {
            pid: process.pid,
            time: Date.now()
        };
        try {
            fs.writeFileSync(lockPath, JSON.stringify(lock), 'utf8');
        } catch (err) {
            this.server.log(`[Telegram] Error acquiring lock: ${err}`);
        }
    }

    private releaseLock() {
        const lockPath = path.join(os.homedir(), '.ag-link', 'bot.lock');
        if (fs.existsSync(lockPath)) {
            try {
                const lock = JSON.parse(fs.readFileSync(lockPath, 'utf8'));
                if (lock.pid === process.pid) {
                    fs.unlinkSync(lockPath);
                }
            } catch {}
        }
    }
}

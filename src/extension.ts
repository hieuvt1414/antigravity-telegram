import * as vscode from 'vscode';
import { AntigravityCore } from './server/core';
import { getActiveCascadeIdFromLs } from './services/ls-discovery';

let server: AntigravityCore | null = null;
let outputChannel: vscode.OutputChannel;
let statusBarItem: vscode.StatusBarItem;

// Global Context
let globalContext: vscode.ExtensionContext;

export async function activate(context: vscode.ExtensionContext) {
    globalContext = context;
    outputChannel = vscode.window.createOutputChannel("Antigravity Telegram");
    outputChannel.appendLine("🚀 Antigravity Telegram: Activating...");

    // Status Bar Item
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 100);
    statusBarItem.command = "antigravity-with-telegram.start";
    context.subscriptions.push(statusBarItem);

    // Register Commands
    context.subscriptions.push(
        vscode.commands.registerCommand('antigravity-with-telegram.start', async () => {
            await startBot(context);
        }),
        vscode.commands.registerCommand('antigravity-with-telegram.stop', async () => {
            await stopBot();
        }),
        vscode.commands.registerCommand('antigravity-with-telegram.mockQuestion', () => {
            if (!server) {
                vscode.window.showWarningMessage('Telegram Bot chưa chạy. Hãy Start trước.');
                return;
            }
            const ok = server.sendMockQuestion();
            if (ok) {
                vscode.window.showInformationMessage('🧪 Đã gửi mock question tới Telegram!');
            } else {
                vscode.window.showErrorMessage('❌ Không gửi được mock question (Telegram chưa kết nối).');
            }
        })
    );

    updateStatusBar(false);

    // Auto Start
    if (vscode.workspace.getConfiguration('antigravityWithTelegram').get<boolean>('autoStart', false)) {
        setTimeout(() => {
            vscode.commands.executeCommand('antigravity-with-telegram.start');
        }, 3000); // Đợi 3s để IDE khởi động hoàn tất
    }
}

async function startBot(context: vscode.ExtensionContext) {
    if (server) {
        vscode.window.showInformationMessage("Telegram Bot is already running.");
        return;
    }

    const config = vscode.workspace.getConfiguration('antigravityWithTelegram');
    const telegramToken = config.get<string>('telegramToken', '').trim();
    const telegramChatIdStr = config.get<string>('telegramChatId', '').trim();
    const telegramChatId = telegramChatIdStr ? parseInt(telegramChatIdStr, 10) : null;
    const telegramAllowedUsername = config.get<string>('telegramAllowedUsername', '').trim();
    const workspaceRoot = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

    // Log registered antigravity/codeium/windsurf commands related to cascade or conversation
    try {
        const commands = await vscode.commands.getCommands(true);
        const matchedCommands = commands.filter(c => {
            const lower = c.toLowerCase();
            return lower.includes('cascade') || lower.includes('trajectory') || lower.includes('conversation') || lower.includes('antigravity');
        });
        const logPath = require('path').join(require('os').homedir(), '.ag-link', 'extension-log.txt');
        const fs = require('fs');
        if (!fs.existsSync(require('path').dirname(logPath))) {
            fs.mkdirSync(require('path').dirname(logPath), { recursive: true });
        }
        fs.appendFileSync(logPath, `[Commands] Matched commands: ${JSON.stringify(matchedCommands, null, 2)}\n`);
        outputChannel.appendLine(`[Commands] Matched cascade/conversation commands: ${JSON.stringify(matchedCommands, null, 2)}`);
    } catch (err) {
        outputChannel.appendLine(`[Commands] Failed to query registered commands: ${err}`);
    }

    const finalToken = (process.env.TELEGRAM_TOKEN || telegramToken || '').trim();
    if (!finalToken || finalToken === 'YOUR_TELEGRAM_BOT_TOKEN_HERE') {
        vscode.window.showErrorMessage("Vui lòng cấu hình Telegram Token thực tế trong Settings (antigravityWithTelegram.telegramToken) hoặc qua file .env.");
        return;
    }

    // Create primary send function using VS Code commands (more reliable than CDP DOM injection)
    const primarySendFn = async (message: string): Promise<boolean> => {
        try {
            // Try sendTextToChat first, then sendPromptToAgentPanel as secondary
            await vscode.commands.executeCommand('antigravity.sendTextToChat', message);
            return true;
        } catch {
            try {
                await vscode.commands.executeCommand('antigravity.sendPromptToAgentPanel', message);
                return true;
            } catch {
                return false;
            }
        }
    };

    // Resolve the active cascade ID. Try the VS Code getDiagnostics command first
    // (fastest — returns googleAgentId which maps to cascadeId), then fall back to
    // querying the LS RPC directly via GetAllCascadeTrajectories.
    const getActiveCascadeIdFn = async (): Promise<string> => {
        try {
            const raw = await vscode.commands.executeCommand<string>('antigravity.getDiagnostics');
            if (raw && typeof raw === 'string') {
                const diag = JSON.parse(raw);
                const id: string = diag?.recentTrajectories?.[0]?.googleAgentId ?? '';
                if (id) return id;
            }
        } catch { /* fall through */ }
        return getActiveCascadeIdFromLs();
    };

    const switchCascadeFn = async (id: string): Promise<boolean> => {
        try {
            outputChannel.appendLine(`[Commands] Attempting to switch cascade to "${id}" using smartFocusConversation...`);
            await vscode.commands.executeCommand('workbench.action.smartFocusConversation', id);
            outputChannel.appendLine(`[Commands] Successfully switched cascade to "${id}" using smartFocusConversation`);
            return true;
        } catch (err: any) {
            outputChannel.appendLine(`[Commands] Failed to switch cascade to "${id}" using smartFocusConversation: ${err?.message || err}`);
            try {
                outputChannel.appendLine(`[Commands] Falling back to forceFocusManager...`);
                await vscode.commands.executeCommand('workbench.action.forceFocusManager', id);
                outputChannel.appendLine(`[Commands] Successfully switched cascade to "${id}" using forceFocusManager`);
                return true;
            } catch (err2: any) {
                outputChannel.appendLine(`[Commands] forceFocusManager fallback also failed: ${err2?.message || err2}`);
                try {
                    outputChannel.appendLine(`[Commands] Falling back to openConversationWorkspaceQuickPick...`);
                    const workspaceUris = vscode.workspace.workspaceFolders?.map(f => f.uri) || [];
                    await vscode.commands.executeCommand('antigravity.openConversationWorkspaceQuickPick', {
                        workspaceUris,
                        cascadeId: id
                    });
                    outputChannel.appendLine(`[Commands] Successfully opened conversation via openConversationWorkspaceQuickPick`);
                    return true;
                } catch (err3: any) {
                    outputChannel.appendLine(`[Commands] All switch attempts failed: ${err3?.message || err3}`);
                    return false;
                }
            }
        }
    };

    const startNewConversationFn = async (): Promise<boolean> => {
        try {
            outputChannel.appendLine(`[Commands] Attempting to start a new conversation using antigravity.startNewConversation...`);
            await vscode.commands.executeCommand('antigravity.startNewConversation');
            outputChannel.appendLine(`[Commands] Successfully started new conversation`);
            return true;
        } catch (err: any) {
            outputChannel.appendLine(`[Commands] Failed to start new conversation: ${err?.message || err}`);
            return false;
        }
    };

    const reloadWindowFn = async (): Promise<boolean> => {
        try {
            outputChannel.appendLine(`[Commands] Attempting to reload window using workbench.action.reloadWindow...`);
            await vscode.commands.executeCommand('workbench.action.reloadWindow');
            return true;
        } catch (err: any) {
            outputChannel.appendLine(`[Commands] Failed to reload window: ${err?.message || err}`);
            return false;
        }
    };

    const dismissIdeDialogFn = async (action: 'skip' | 'continue'): Promise<boolean> => {
        try {
            if (action === 'skip') {
                outputChannel.appendLine(`[Commands] Dismissing IDE dialog (skip/escape)...`);
                // Try multiple approaches to dismiss the dialog
                try { await vscode.commands.executeCommand('workbench.action.closeQuickOpen'); } catch {}
                try { await vscode.commands.executeCommand('closeFindWidget'); } catch {}
                // Fallback: focus editor which dismisses most overlays
                try { await vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup'); } catch {}
            } else {
                outputChannel.appendLine(`[Commands] Accepting IDE dialog (continue/enter)...`);
                try { await vscode.commands.executeCommand('workbench.action.acceptSelectedQuickOpenItem'); } catch {}
                try { await vscode.commands.executeCommand('workbench.action.focusActiveEditorGroup'); } catch {}
            }
            return true;
        } catch (err: any) {
            outputChannel.appendLine(`[Commands] Failed to dismiss IDE dialog: ${err?.message || err}`);
            return false;
        }
    };

    // Start the bot core
    const logFn = (msg: string) => outputChannel.appendLine(msg);
    const newServer = new AntigravityCore(workspaceRoot, telegramToken, telegramChatId, telegramAllowedUsername, primarySendFn, getActiveCascadeIdFn, switchCascadeFn, logFn, startNewConversationFn, reloadWindowFn, dismissIdeDialogFn);

    try {
        await newServer.start();
        server = newServer; 

        outputChannel.appendLine(`✅ Telegram Bot started!`);
        if (newServer.isTelegramActive) {
            outputChannel.appendLine(`   Telegram: Connected ✅`);
        } else {
            outputChannel.appendLine(`   Telegram: Not Connected ❌`);
        }

        updateStatusBar(true);
    } catch (e) {
        server = null;
        outputChannel.appendLine(`❌ Failed to start bot: ${e}`);
        vscode.window.showErrorMessage(`Telegram Bot failed to start: ${e}`);
        updateStatusBar(false);
    }
}

async function stopBot() {
    if (!server) {
        vscode.window.showInformationMessage("Telegram Bot is not running.");
        return;
    }

    try {
        server.stop();
        server = null;
        outputChannel.appendLine("🛑 Telegram Bot stopped.");
        vscode.window.showInformationMessage("Telegram Bot stopped.");
        updateStatusBar(false);
    } catch (e) {
        vscode.window.showErrorMessage(`Failed to stop bot: ${e}`);
    }
}

function updateStatusBar(running: boolean) {
    if (running) {
        statusBarItem.text = `$(robot) TG Bot: On`;
        statusBarItem.tooltip = "Telegram Bot Running - Click to Stop";
        statusBarItem.command = "antigravity-with-telegram.stop";
        statusBarItem.show();
    } else {
        statusBarItem.text = `$(robot) TG Bot: Off`;
        statusBarItem.tooltip = "Telegram Bot Stopped - Click to Start";
        statusBarItem.command = "antigravity-with-telegram.start";
        statusBarItem.show();
    }
}

export function deactivate() {
    if (server) {
        server.stop();
    }
}

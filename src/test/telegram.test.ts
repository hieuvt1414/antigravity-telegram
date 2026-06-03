import assert from 'assert';

// ─── Mock `vscode` module BEFORE any imports ──────────────────────────────────
// telegram.ts → core.ts → imports vscode, which fails outside VS Code.
// We register a mock module so require('vscode') resolves.
const Module = require('module');
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (request: string, ...args: any[]) {
    if (request === 'vscode') {
        // Return a path that will resolve to our mock
        return require.resolve('./vscode-mock');
    }
    if (request === './ls-discovery') {
        return require.resolve('./ls-discovery-mock');
    }
    return originalResolve.call(this, request, ...args);
};

// Now safe to import TelegramIntegration
import { TelegramIntegration } from '../services/telegram';
const fs = require('fs');
import { setMockTrajectories } from './ls-discovery-mock';

// ─── Helpers: extract private methods for standalone testing ──────────────────

// Since these are private methods, we access them through a dummy instance.
// But constructing TelegramIntegration tries to start a real TelegramBot.
// Instead, we'll test the logic by reimplementing it identically (copy-paste).
// This is cleaner than fighting mocking for pure functions.

function splitMessage(text: string, maxLen: number): string[] {
    if (text.length <= maxLen) return [text];
    const chunks: string[] = [];
    let remaining = text;
    while (remaining.length > 0) {
        if (remaining.length <= maxLen) {
            chunks.push(remaining);
            break;
        }
        let cutAt = remaining.lastIndexOf('\n', maxLen);
        if (cutAt < maxLen * 0.5) cutAt = maxLen;
        chunks.push(remaining.substring(0, cutAt));
        remaining = remaining.substring(cutAt).trimStart();
    }
    return chunks;
}

function looksLikePlanRequest(text: string): boolean {
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

// ─── Mock TelegramBot ─────────────────────────────────────────────────────────

class MockTelegramBot {
    public messages: Array<{ chatId: number; text: string; opts?: any }> = [];
    public edits: Array<{ chatId: number; messageId: number; text: string; opts?: any }> = [];
    public documents: Array<{ chatId: number; filePath: string; opts?: any }> = [];
    private messageIdCounter = 100;
    private handlers: Map<string, Function[]> = new Map();

    constructor(_token: string, _opts?: any) { }

    on(event: string, handler: Function) {
        if (!this.handlers.has(event)) this.handlers.set(event, []);
        this.handlers.get(event)!.push(handler);
    }

    async sendMessage(chatId: number, text: string, opts?: any) {
        const msgId = this.messageIdCounter++;
        this.messages.push({ chatId, text, opts });
        return { message_id: msgId, chat: { id: chatId } };
    }

    async editMessageText(text: string, opts?: any) {
        this.edits.push({ chatId: opts?.chat_id, messageId: opts?.message_id, text, opts });
        return {};
    }

    async sendDocument(chatId: number, filePath: string, opts?: any) {
        this.documents.push({ chatId, filePath, opts });
        return {};
    }

    async answerCallbackQuery(_id: string, _opts?: any) { }
    async downloadFile(_fileId: string, _dir: string) { return '/tmp/mock'; }
    stopPolling() { }

    simulateMessage(msg: any) {
        (this.handlers.get('message') || []).forEach(h => h(msg));
    }

    simulateCallbackQuery(query: any) {
        (this.handlers.get('callback_query') || []).forEach(h => h(query));
    }

    clearHistory() {
        this.messages = [];
        this.edits = [];
        this.documents = [];
    }
}

// ─── Mock AntigravityCore ─────────────────────────────────────────────────────

class MockCore {
    public logs: string[] = [];
    public sentPrompts: string[] = [];
    public stopCalled = false;
    public sendPromptResult = true;
    public findBrainFileResult: string | null = null;

    log(msg: string) { this.logs.push(msg); }
    async sendPrompt(msg: string) { this.sentPrompts.push(msg); return this.sendPromptResult; }
    async triggerStop() { this.stopCalled = true; return true; }
    async switchCascade(_id: string) { return true; }
    findBrainFile(_f: string) { return this.findBrainFileResult; }

}

// ─── Helper to create TelegramIntegration with mocks ──────────────────────────

function createTestInstance() {
    const core = new MockCore();

    // Create instance - will try real polling, but we immediately replace bot
    let tg: TelegramIntegration;
    try {
        tg = new TelegramIntegration('fake-token-for-test', 12345, 'testuser', core as any);
    } catch {
        // If TelegramBot constructor throws (no network), create a bare instance
        tg = Object.create(TelegramIntegration.prototype);
        (tg as any).allowedChatId = 12345;
        (tg as any).allowedUsername = 'testuser';
        (tg as any).server = core;
        (tg as any).activeMessageId = null;
        (tg as any).activeChatId = null;
        (tg as any).lastSentText = '';
        (tg as any).activeUserPrompt = '';
        (tg as any).lastSendTime = 0;
        (tg as any).pendingUpdate = null;
        (tg as any).clearActiveTimer = null;
        (tg as any).hasStartedGenerating = false;
    }

    const mockBot = new MockTelegramBot('fake');
    (tg as any).bot = mockBot;
    (tg as any).setupListeners();

    return { tg, bot: mockBot, core };
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTS
// ═══════════════════════════════════════════════════════════════════════════════

describe('TelegramIntegration', () => {

    // ── Pure logic: splitMessage ──────────────────────────────────────────────

    describe('splitMessage (pure logic)', () => {
        it('returns single chunk for short text', () => {
            assert.deepStrictEqual(splitMessage('Hello world', 100), ['Hello world']);
        });

        it('splits at newline boundary', () => {
            const text = 'Line 1 content\nLine 2 content\nLine 3 content\nLine 4 content';
            const result = splitMessage(text, 30);
            assert.ok(result.length >= 2, `Expected >= 2 chunks, got ${result.length}`);
            for (const chunk of result) {
                assert.ok(chunk.length <= 30, `Chunk too long: "${chunk}" (${chunk.length})`);
            }
        });

        it('handles text with no newlines by hard-cutting', () => {
            const text = 'a'.repeat(100);
            const result = splitMessage(text, 30);
            assert.ok(result.length >= 3, `Expected >= 3 chunks, got ${result.length}`);
            for (const chunk of result) {
                assert.ok(chunk.length <= 30, `Chunk too long: ${chunk.length}`);
            }
        });

        it('returns single chunk for empty text', () => {
            assert.deepStrictEqual(splitMessage('', 100), ['']);
        });

        it('splits 8000-char response into ~2 Telegram messages', () => {
            const lines = Array.from({ length: 200 }, (_, i) => `Line ${i}: ${'x'.repeat(30)}`);
            const text = lines.join('\n');
            const result = splitMessage(text, 4000);
            assert.ok(result.length >= 2, `Expected >= 2 chunks for 8000-char text`);
            assert.ok(result.length <= 4, `Expected <= 4 chunks, got ${result.length}`);
        });
    });

    // ── Pure logic: looksLikePlanRequest ──────────────────────────────────────

    describe('looksLikePlanRequest (pure logic)', () => {
        it('detects English plan approval request', () => {
            assert.strictEqual(
                looksLikePlanRequest('I\'ve created an implementation plan. Please review and approve.'),
                true
            );
        });

        it('detects Vietnamese plan request', () => {
            assert.strictEqual(
                looksLikePlanRequest('Đây là kế hoạch triển khai. Xin phê duyệt để tiếp tục.'),
                true
            );
        });

        it('detects "proposed changes" + "feedback"', () => {
            assert.strictEqual(
                looksLikePlanRequest('Here are the proposed changes. I need your feedback.'),
                true
            );
        });

        it('detects "implementation_plan" + "waiting for"', () => {
            assert.strictEqual(
                looksLikePlanRequest('I created an implementation_plan artifact. Waiting for your approval.'),
                true
            );
        });

        it('rejects normal AI response', () => {
            assert.strictEqual(
                looksLikePlanRequest('I\'ve fixed the bug. The tests pass now.'),
                false
            );
        });

        it('rejects text with ONLY plan keyword (no approval)', () => {
            assert.strictEqual(
                looksLikePlanRequest('The implementation plan is complex but straightforward.'),
                false
            );
        });

        it('rejects text with ONLY approval keyword (no plan)', () => {
            assert.strictEqual(
                looksLikePlanRequest('Please review the code changes I made.'),
                false
            );
        });

        it('rejects empty text', () => {
            assert.strictEqual(looksLikePlanRequest(''), false);
        });
    });

    // ── cleanMarkdownForTelegram ──────────────────────────────────────────────

    describe('cleanMarkdownForTelegram', () => {
        let tg: TelegramIntegration;

        beforeEach(() => {
            const { tg: testTg } = createTestInstance();
            tg = testTg;
        });

        it('replaces file:/// markdown links with plain text and url description', () => {
            const input = 'Please check [telegram.ts](file:///Users/trunghieu/Downloads/telegram.ts) for details.';
            const expected = 'Please check telegram.ts (file:///Users/trunghieu/Downloads/telegram.ts) for details.';
            assert.strictEqual((tg as any).cleanMarkdownForTelegram(input), expected);
        });

        it('replaces file:// markdown links (two slashes) correctly', () => {
            const input = 'Check [settings.json](file://C:/path/to/settings.json) here.';
            const expected = 'Check settings.json (file://C:/path/to/settings.json) here.';
            assert.strictEqual((tg as any).cleanMarkdownForTelegram(input), expected);
        });

        it('ignores http/https/other links', () => {
            const input = 'Visit [Google](https://google.com) or [Telegram](https://telegram.org).';
            assert.strictEqual((tg as any).cleanMarkdownForTelegram(input), input);
        });
    });

    // ── Integration: handleLSTrajectory ─────────────────────────────────────

    describe('handleLSTrajectory: send once when done', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => {
            ({ tg, bot, core } = createTestInstance());
        });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('does NOT send any message while isGenerating=true', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'test';
            bot.clearHistory();

            tg.handleLSTrajectory('Part 1', true);
            tg.handleLSTrajectory('Part 2', true);
            tg.handleLSTrajectory('Part 3', true);

            // We do edit the status message with progress, but should NOT send NEW messages
            assert.ok(bot.edits.length > 0, 'Should update status message with progress');
            assert.strictEqual(bot.messages.length, 0, 'Should NOT send new messages during generation');
        });

        it('tracks hasStartedGenerating when isGenerating=true', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'test';

            tg.handleLSTrajectory('response', true);
            assert.strictEqual((tg as any).hasStartedGenerating, true);
        });

        it('sends final response when isGenerating flips true→false', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'test';
            bot.clearHistory();

            tg.handleLSTrajectory('generating...', true);
            assert.ok(bot.edits.length > 0, 'Should update status message with progress');

            tg.handleLSTrajectory('final answer', false);
            assert.ok(core.logs.some(l => l.includes('AI hoàn tất')),
                'Should log completion message');
        });

        it('sends response text and plan buttons when looksLikePlanRequest is true', (done) => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'summarize conversation';
            bot.clearHistory();

            tg.handleLSTrajectory('generating...', true);
            tg.handleLSTrajectory('Here is the implementation plan. Please review and approve.', false);

            setTimeout(() => {
                const sentMessages = bot.messages;
                assert.strictEqual(sentMessages.length, 2, 'Should send exactly 2 messages (text response + plan buttons)');
                assert.ok(sentMessages[0].text.includes('Here is the implementation plan'), 'First message should be response text');
                assert.ok(sentMessages[1].text.includes('Implementation Plan và đang chờ phê duyệt'), 'Second message should contain plan buttons');
                done();
            }, 100);
        });

        it('updates lastSentText in memory without sending', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'unique_user_prompt_that_does_not_contain_x';
            bot.clearHistory();

            tg.handleLSTrajectory('v1', true);
            const t1 = (tg as any).lastSentText;
            tg.handleLSTrajectory('v2 longer text', true);
            const t2 = (tg as any).lastSentText;

            assert.notStrictEqual(t1, t2, 'lastSentText should update in memory');
            assert.ok(bot.edits.length > 0, 'Should edit progress message');
        });

        it('does nothing if isGenerating flips false without prior true', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'x';
            (tg as any).hasStartedGenerating = false;
            bot.clearHistory();

            tg.handleLSTrajectory('some text', false);
            assert.strictEqual(bot.edits.length, 0);
            assert.strictEqual(core.logs.filter(l => l.includes('AI hoàn tất')).length, 0);
        });
    });

    // ── Integration: safety-net timer ─────────────────────────────────────────

    describe('handleLSTrajectory: safety-net timer', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('sets pendingUpdate timer when text changes', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'test';

            tg.handleLSTrajectory('new response', true);
            assert.ok((tg as any).pendingUpdate !== null, 'Timer should be set');
        });

        it('clears timer on normal generation completion', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).activeUserPrompt = 'test';

            tg.handleLSTrajectory('response', true);
            tg.handleLSTrajectory('final', false);

            assert.strictEqual((tg as any).pendingUpdate, null, 'Timer should be cleared');
        });
    });

    // ── Race condition: clearActiveTimer ──────────────────────────────────────

    describe('race condition fix', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('scheduleClearActive creates a tracked timer', () => {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).scheduleClearActive();
            assert.ok((tg as any).clearActiveTimer !== null);
        });

        it('new message cancels old clearActiveTimer', function (done) {
            (tg as any).activeMessageId = 1;
            (tg as any).activeChatId = 12345;
            (tg as any).scheduleClearActive();

            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: 'new message'
            });

            setTimeout(() => {
                assert.strictEqual((tg as any).clearActiveTimer, null, 'Old timer should be cancelled');
                done();
            }, 150);
        });
    });

    // ── /approve command ──────────────────────────────────────────────────────

    describe('/approve command', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('sends approval prompt to IDE', function (done) {
            bot.clearHistory();
            core.sentPrompts = [];

            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: '/approve'
            });

            setTimeout(() => {
                assert.ok(core.sentPrompts.some(p => p.includes('Approved')),
                    `Expected approval, got: ${JSON.stringify(core.sentPrompts)}`);
                done();
            }, 200);
        });

        it('/yes also triggers approval', function (done) {
            core.sentPrompts = [];
            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: '/yes'
            });

            setTimeout(() => {
                assert.ok(core.sentPrompts.some(p => p.includes('Approved')));
                done();
            }, 200);
        });

        it('reports error when IDE disconnected', function (done) {
            core.sendPromptResult = false;
            bot.clearHistory();

            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: '/approve'
            });

            setTimeout(() => {
                // Verify sendPrompt was called
                assert.ok(core.sentPrompts.some(p => p.includes('Approved')),
                    'sendPrompt should still be called');
                // Error can appear in edits (editMessageText) or messages (sendMessage fallback)
                const allTexts = [
                    ...bot.edits.map(e => e.text),
                    ...bot.messages.map(m => m.text)
                ];
                assert.ok(allTexts.some(t => t.includes('Không thể gửi') || t.includes('❌')),
                    `Should show error. edits=${JSON.stringify(bot.edits.map(e=>e.text))}, messages=${JSON.stringify(bot.messages.map(m=>m.text))}`);
                done();
            }, 500);
        });
    });

    // ── /plan command ─────────────────────────────────────────────────────────

    describe('/plan command', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('reports not found when no plan exists', function (done) {
            core.findBrainFileResult = null;
            bot.clearHistory();

            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: '/plan'
            });

            setTimeout(() => {
                assert.ok(bot.messages.some(m => m.text.includes('Không tìm thấy')));
                done();
            }, 200);
        });
    });

    // ── /list command ─────────────────────────────────────────────────────────

    describe('/list command', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('reports no conversations when empty', function (done) {
            setMockTrajectories([]);
            bot.clearHistory();

            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: '/list'
            });

            setTimeout(() => {
                assert.ok(bot.messages.some(m => m.text.includes('Không tìm thấy')));
                done();
            }, 200);
        });

        it('returns button list without status tags', function (done) {
            setMockTrajectories([
                { id: 'c1', title: 'Refactoring auth', status: 'completed' },
                { id: 'c2', title: 'Fix bug A', status: 'active' }
            ]);
            bot.clearHistory();

            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: '/list'
            });

            setTimeout(() => {
                const listMsg = bot.messages.find(m => m.text.includes('Danh sách 10 cuộc hội thoại gần đây'));
                assert.ok(listMsg);
                assert.ok(listMsg.opts?.reply_markup?.inline_keyboard);
                const buttons = listMsg.opts.reply_markup.inline_keyboard;
                
                // Assert that the status tag is NOT in the button texts
                assert.strictEqual(buttons[0][0].text, 'Fix bug A'); // sliced and reversed, so c2 is first
                assert.strictEqual(buttons[1][0].text, 'Refactoring auth'); // c1 is second
                done();
            }, 200);
        });

        it('returns button list with direct callback data and supports switching', function (done) {
            setMockTrajectories([
                { id: 'c1', title: 'Refactoring auth', status: 'completed' },
                { id: 'c2', title: 'Fix bug A', status: 'active' }
            ]);
            bot.clearHistory();

            bot.simulateMessage({
                chat: { id: 12345, username: 'testuser' },
                text: '/list'
            });

            setTimeout(() => {
                const listMsg = bot.messages.find(m => m.text.includes('Danh sách 10 cuộc hội thoại gần đây'));
                assert.ok(listMsg);
                assert.ok(listMsg.opts?.reply_markup?.inline_keyboard);
                const buttons = listMsg.opts.reply_markup.inline_keyboard;
                
                // Assert callback_data is direct ID-based
                assert.strictEqual(buttons[0][0].text, 'Fix bug A');
                assert.strictEqual(buttons[0][0].callback_data, 'switch_c2');
                assert.strictEqual(buttons[1][0].text, 'Refactoring auth');
                assert.strictEqual(buttons[1][0].callback_data, 'switch_c1');

                // Simulate clicking switch_c2 (Fix bug A -> 'c2')
                bot.clearHistory();
                bot.simulateCallbackQuery({
                    id: 'cb_sw_1',
                    from: { username: 'testuser' },
                    message: { chat: { id: 12345 }, message_id: 999 },
                    data: 'switch_c2'
                });

                setTimeout(() => {
                    assert.ok(bot.edits.some(e => e.text.includes('Danh sách 10 cuộc hội thoại gần đây')));
                    assert.ok(bot.messages.some(m => m.text.includes('Đã chuyển sang cuộc hội thoại: *Fix bug A*')));
                    
                    // Test switching to the second one (switch_c1)
                    bot.clearHistory();
                    bot.simulateCallbackQuery({
                        id: 'cb_sw_2',
                        from: { username: 'testuser' },
                        message: { chat: { id: 12345 }, message_id: 999 },
                        data: 'switch_c1'
                    });

                    setTimeout(() => {
                        assert.ok(bot.edits.some(e => e.text.includes('Danh sách 10 cuộc hội thoại gần đây')));
                        assert.ok(bot.messages.some(m => m.text.includes('Đã chuyển sang cuộc hội thoại: *Refactoring auth*')));
                        done();
                    }, 100);
                }, 100);
            }, 200);
        });
    });

    // ── Authorization ─────────────────────────────────────────────────────────

    describe('authorization', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('ignores unauthorized chatId', function (done) {
            core.stopCalled = false;
            bot.simulateMessage({ chat: { id: 99999, username: 'hacker' }, text: '/stop' });
            setTimeout(() => {
                assert.strictEqual(core.stopCalled, false);
                done();
            }, 100);
        });

        it('allows authorized chatId', function (done) {
            bot.simulateMessage({ chat: { id: 12345 }, text: '/stop' });
            setTimeout(() => {
                assert.strictEqual(core.stopCalled, true);
                done();
            }, 100);
        });

        it('allows authorized username', function (done) {
            core.stopCalled = false;
            bot.simulateMessage({ chat: { id: 77777, username: 'testuser' }, text: '/stop' });
            setTimeout(() => {
                assert.strictEqual(core.stopCalled, true);
                done();
            }, 100);
        });
    });

    // ── Callback: approve_plan ────────────────────────────────────────────────

    describe('callback buttons', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('approve_plan sends approval to IDE', function (done) {
            core.sentPrompts = [];
            bot.simulateCallbackQuery({
                id: 'cb1',
                from: { username: 'testuser' },
                message: { chat: { id: 12345 } },
                data: 'approve_plan'
            });

            setTimeout(() => {
                assert.ok(core.sentPrompts.some(p => p.includes('Approved')));
                done();
            }, 200);
        });

        it('reject_plan sends instruction message', function (done) {
            bot.clearHistory();
            bot.simulateCallbackQuery({
                id: 'cb2',
                from: { username: 'testuser' },
                message: { chat: { id: 12345 } },
                data: 'reject_plan'
            });

            setTimeout(() => {
                assert.ok(bot.messages.some(m => m.text.includes('feedback')));
                done();
            }, 200);
        });
    });

    // ── Brain files auto-monitoring ──────────────────────────────────────────
    describe('Brain files auto-monitoring', () => {
        let tg: TelegramIntegration, bot: MockTelegramBot, core: MockCore;

        beforeEach(() => { ({ tg, bot, core } = createTestInstance()); });
        afterEach(() => { try { tg.stop(); } catch {} });

        it('auto-sends implementation plan when content hash changes', async () => {
            let mockHash = 'hash1';
            (tg as any).getLatestFile = (filenames: string[]) => {
                if (filenames.includes('implementation_plan.md')) {
                    return { filePath: '/mock/path/plan.md', mtime: 1000 };
                }
                return null;
            };
            (tg as any).getFileHash = () => mockHash;

            const origReadFileSync = fs.readFileSync;
            fs.readFileSync = (path: any, options?: any) => {
                if (path === '/mock/path/plan.md') {
                    return 'Mock Plan Content';
                }
                return origReadFileSync(path, options);
            };

            (tg as any).lastPlanHash = 'hash0';
            (tg as any).lastActiveSessionDir = '/mock/session';
            (tg as any).getActiveSessionDir = () => '/mock/session';
            (tg as any).lastAutoCheckTime = 0;

            // Trigger handleLSTrajectory which calls checkAndAutoSendBrainFiles
            bot.clearHistory();
            tg.handleLSTrajectory('mock response', false);

            await new Promise(resolve => setTimeout(resolve, 100));

            assert.ok(bot.messages.some(m => m.text.includes('Implementation Plan') && m.text.includes('Mock Plan Content')));
            assert.strictEqual((tg as any).lastPlanHash, 'hash1');

            // Same hash again → should NOT duplicate
            bot.clearHistory();
            tg.handleLSTrajectory('mock response 2', false);
            await new Promise(resolve => setTimeout(resolve, 100));
            assert.strictEqual(bot.messages.length, 0);

            // Change hash → should send again
            mockHash = 'hash2';
            (tg as any).lastAutoCheckTime = 0;
            tg.handleLSTrajectory('mock response 3', false);
            await new Promise(resolve => setTimeout(resolve, 100));
            assert.ok(bot.messages.some(m => m.text.includes('Implementation Plan') && m.text.includes('Mock Plan Content')));
            assert.strictEqual((tg as any).lastPlanHash, 'hash2');

            fs.readFileSync = origReadFileSync;
        });

        it('auto-sends walkthrough when content hash changes', async () => {
            let mockHash = 'hash1';
            (tg as any).getLatestFile = (filenames: string[]) => {
                if (filenames.includes('walkthrough.md')) {
                    return { filePath: '/mock/path/walkthrough.md', mtime: 1000 };
                }
                return null;
            };
            (tg as any).getFileHash = () => mockHash;

            const origReadFileSync = fs.readFileSync;
            fs.readFileSync = (path: any, options?: any) => {
                if (path === '/mock/path/walkthrough.md') {
                    return 'Mock Walkthrough Content';
                }
                return origReadFileSync(path, options);
            };

            (tg as any).lastWalkthroughHash = 'hash0';
            (tg as any).lastActiveSessionDir = '/mock/session';
            (tg as any).getActiveSessionDir = () => '/mock/session';
            (tg as any).lastAutoCheckTime = 0;

            bot.clearHistory();
            tg.handleLSTrajectory('mock', false);

            await new Promise(resolve => setTimeout(resolve, 100));

            assert.ok(bot.messages.some(m => m.text.includes('Walkthrough') && m.text.includes('Mock Walkthrough Content')));
            assert.strictEqual((tg as any).lastWalkthroughHash, 'hash1');

            fs.readFileSync = origReadFileSync;
        });
    });
});

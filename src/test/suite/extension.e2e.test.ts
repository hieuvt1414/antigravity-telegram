import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Antigravity With Telegram E2E Test Suite', () => {
    vscode.window.showInformationMessage('Starting E2E tests...');

    test('Extension should be present and registered', () => {
        const extension = vscode.extensions.getExtension('TrungHieu1414.antigravity-with-telegram');
        assert.ok(extension, 'Extension should be registered in the IDE');
    });

    test('Extension should activate successfully', async () => {
        const extension = vscode.extensions.getExtension('TrungHieu1414.antigravity-with-telegram');
        if (extension) {
            if (!extension.isActive) {
                await extension.activate();
            }
            assert.strictEqual(extension.isActive, true, 'Extension should be active');
        } else {
            assert.fail('Extension is not registered');
        }
    });

    test('Commands should be registered in the IDE', async () => {
        const commands = await vscode.commands.getCommands(true);
        const registeredCommands = commands.filter(c => c.startsWith('antigravity-with-telegram.'));
        
        assert.ok(registeredCommands.includes('antigravity-with-telegram.start'), 'start command not registered');
        assert.ok(registeredCommands.includes('antigravity-with-telegram.stop'), 'stop command not registered');
        assert.ok(registeredCommands.includes('antigravity-with-telegram.mockQuestion'), 'mockQuestion command not registered');
    });

    test('Configurations should be readable with new prefix', () => {
        const config = vscode.workspace.getConfiguration('antigravityWithTelegram');
        const autoStart = config.get<boolean>('autoStart');
        
        assert.strictEqual(typeof autoStart, 'boolean', 'autoStart should be a boolean configuration');
    });
});

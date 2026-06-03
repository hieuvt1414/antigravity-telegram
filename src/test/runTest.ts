import * as path from 'path';
import * as fs from 'fs';
import { runTests } from '@vscode/test-electron';

async function main() {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath = path.resolve(__dirname, '../../');

        // The path to the extension test runner script
        // Passed to --extensionTestsPath
        const extensionTestsPath = path.resolve(__dirname, './suite/index');

        // Check if local Antigravity IDE exists on Mac to use it directly
        const antigravityPath = '/Applications/Antigravity IDE.app/Contents/MacOS/Electron';
        const options: any = {
            extensionDevelopmentPath,
            extensionTestsPath
        };

        if (fs.existsSync(antigravityPath)) {
            console.log(`🚀 Using local Antigravity IDE executable: ${antigravityPath}`);
            options.vscodeExecutablePath = antigravityPath;
        } else {
            console.log('📦 Local Antigravity IDE not found. Downloading stable VS Code for testing...');
        }

        // Download VS Code/launch executable and run the integration test
        await runTests(options);
    } catch (err) {
        console.error('Failed to run E2E tests', err);
        process.exit(1);
    }
}

main();

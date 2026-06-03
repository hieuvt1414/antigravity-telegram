import * as path from 'path';
import * as fs from 'fs';
import Mocha from 'mocha';

export function run(): Promise<void> {
    // Create the mocha test
    const mocha = new Mocha({
        ui: 'tdd',
        color: true,
        timeout: 15000
    });

    const testsRoot = __dirname;

    return new Promise((resolve, reject) => {
        try {
            const files = fs.readdirSync(testsRoot);
            const testFiles = files.filter(f => f.endsWith('.e2e.test.js'));

            if (testFiles.length === 0) {
                return reject(new Error('No E2E test files found.'));
            }

            // Add files to the test suite
            testFiles.forEach(f => mocha.addFile(path.resolve(testsRoot, f)));

            // Run the mocha test
            mocha.run(failures => {
                if (failures > 0) {
                    reject(new Error(`${failures} E2E tests failed.`));
                } else {
                    resolve();
                }
            });
        } catch (err) {
            reject(err);
        }
    });
}

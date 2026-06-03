const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

const packageJsonPath = path.resolve(__dirname, '../package.json');

// Read the original package.json
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

console.log(`Building packages for version ${version}...\n`);

try {
    // 1. Build for VS Code Marketplace (categories: Machine Learning, Chat, Other)
    console.log('--- Step 1: Packaging for VS Code Marketplace ---');
    packageJson.categories = ["Machine Learning", "Chat", "Other"];
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n', 'utf8');
    
    const vsCodeOutName = `antigravity-with-telegram-vscode-${version}.vsix`;
    console.log(`Running vsce package for VS Code Marketplace -> ${vsCodeOutName}...`);
    execSync(`npx vsce package --out ${vsCodeOutName}`, { stdio: 'inherit' });
    console.log('✅ VS Code Marketplace package completed.\n');

    // 2. Build for Open VSX (categories: Productivity, Machine Learning, Chat)
    console.log('--- Step 2: Packaging for Open VSX ---');
    packageJson.categories = ["Productivity", "Machine Learning", "Chat"];
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n', 'utf8');
    
    const openVsxOutName = `antigravity-with-telegram-openvsx-${version}.vsix`;
    console.log(`Running vsce package for Open VSX -> ${openVsxOutName}...`);
    execSync(`npx vsce package --out ${openVsxOutName}`, { stdio: 'inherit' });
    console.log('✅ Open VSX package completed.\n');

} catch (error) {
    console.error('❌ Error building packages:', error);
    process.exit(1);
} finally {
    // Restore original default package.json categories to VS Code Marketplace standard
    console.log('Restoring package.json to default categories...');
    packageJson.categories = ["Machine Learning", "Chat", "Other"];
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4) + '\n', 'utf8');
    console.log('Done!');
}

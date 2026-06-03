#!/bin/bash
set -e

# Change directory to project root
cd "$(dirname "$0")/.."

# 1. Clean up old .git
echo "Cleaning old Git directory..."
rm -rf .git

# 2. Init Git
echo "Initializing new Git repository..."
git init -b main

# 3. Configure author
git config user.name "trunghieu"
git config user.email "hieu@wisehomie.com"

# 4. Set remote
git remote add origin git@github.com:hieuvt1414/antigravity-telegram.git

# 5. Commit 1: chore: initial repository configuration
echo "Creating Commit 1..."
git add .gitignore .vscodeignore package.json package-lock.json tsconfig.json esbuild.js icon.png LICENSE
git commit -m "chore: initial repository configuration"

# 6. Commit 2: docs: update localized readmes and guidelines for Telegram Bot integration
echo "Creating Commit 2..."
git add README*.md CHANGELOG.md CONTRIBUTING.md
git commit -m "docs: update localized readmes and guidelines for Telegram Bot integration"

# 7. Commit 3: feat: add IDE configurations, type definitions, and helper utilities
echo "Creating Commit 3..."
git add .vscode/launch.json .vscode/settings.json .vscode/tasks.json src/types/index.ts src/utils/index.ts
git commit -m "feat: add IDE configurations, type definitions, and helper utilities"

# 8. Commit 4: feat: implement language server discovery client
echo "Creating Commit 4..."
git add src/services/ls-discovery.ts
git commit -m "feat: implement language server discovery client"

# 9. Commit 5: feat: implement Telegram Bot integration client
echo "Creating Commit 5..."
git add src/services/telegram.ts
git commit -m "feat: implement Telegram Bot integration client"

# 10. Commit 6: feat: implement core session integration and generation tracking
echo "Creating Commit 6..."
git add src/server/core.ts src/server/isGeneratingTracker.ts
git commit -m "feat: implement core session integration and generation tracking"

# 11. Commit 7: feat: implement VS Code extension entrypoint and registration
echo "Creating Commit 7..."
git add src/extension.ts
git commit -m "feat: implement VS Code extension entrypoint and registration"

# 12. Commit 8: test: add unit test suite and mocks
echo "Creating Commit 8..."
git add src/test/isGeneratingTracker.test.ts src/test/ls-discovery-mock.ts src/test/telegram.test.ts src/test/vscode-mock.ts src/test/runTest.ts src/test/suite/index.ts src/test/suite/extension.e2e.test.ts
git commit -m "test: add unit test suite and mocks"

# 13. Commit 9: chore: add helper scripts and development scratchpads
echo "Creating Commit 9..."
git add scratch/update_readmes.py src/scratch/dump-trajectory.ts src/scratch/mock-dialog.ts
# Also check if we want to add the rebuild_git.sh itself to Commit 9
git add scratch/rebuild_git.sh
git commit -m "chore: add helper scripts and development scratchpads"

echo "Git history rebuilt successfully!"
git log --oneline

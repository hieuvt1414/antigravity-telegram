# Changelog

## 1.0.4

### Added
- Multi-window conflict protection: Implemented a process lockfile (`bot.lock`) and heartbeat system to prevent `409 Conflict` loops when opening multiple IDE windows or debugging concurrently.
- Real-time step logging: Added detailed logging for new and updated trajectory steps in the extension Output Channel.

## 1.0.3

### Changed
- Brand new official extension icon: Merged the official Antigravity IDE app icon with the Telegram 3D logo via a data swap bridge icon in the center.

## 1.0.2

### Fixed
- Fixed packaging: Excluded `.env` and `.token` files from the bundle using `.vscodeignore` to prevent security scanner blocks on publication.

## 1.0.1

### Fixed
- Fixed token validation to check and reject the default `"YOUR_TELEGRAM_BOT_TOKEN_HERE"` placeholder in workspace settings.
- Fixed target extension path in `deploy:mac` script.

## 1.0.0

Initial release of **Antigravity Telegram** (re-written from the ground up).

### Added
- **Direct Telegram Bot Integration**: Connects directly to Telegram Bot APIs for monitoring and control (no local HTTP/WebSocket port listening required).
- **Language Server ConnectRPC Discovery**: Automatically discovers the local Antigravity Language Server port and CSRF token.
- **Remote Commands**: Send prompts, approve plans, or stop generation (`/stop`) directly from Telegram.
- **Interactive Prompts**: Receive and respond to IDE dialogs (`ask_question`, `ask_permission`, `run_command`) using Telegram inline buttons.
- **File & Media Handling**: Send files or photos via Telegram to inject into active IDE chat contexts.
- **Auto-Start Support**: Automatically launch the bot on IDE startup via VS Code Settings.

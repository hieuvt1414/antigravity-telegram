# Changelog

## 1.0.0

Initial release of **Antigravity Telegram** (re-written from the ground up).

### Added
- **Direct Telegram Bot Integration**: Connects directly to Telegram Bot APIs for monitoring and control (no local HTTP/WebSocket port listening required).
- **Language Server ConnectRPC Discovery**: Automatically discovers the local Antigravity Language Server port and CSRF token.
- **Remote Commands**: Send prompts, approve plans, or stop generation (`/stop`) directly from Telegram.
- **Interactive Prompts**: Receive and respond to IDE dialogs (`ask_question`, `ask_permission`, `run_command`) using Telegram inline buttons.
- **File & Media Handling**: Send files or photos via Telegram to inject into active IDE chat contexts.
- **Auto-Start Support**: Automatically launch the bot on IDE startup via VS Code Settings.

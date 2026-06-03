# Antigravity With Telegram (VS Code Extension) 🚀

Control, monitor, and interact with your active Antigravity AI coding assistant directly from your mobile device via Telegram.

---

## 😟 The Problem: Stuck at your computer 24/7?
As a developer, you run long-duration tasks: waiting for large refactorings, running automated tests, auditing project builds, or generating codebases. Having to stay glued to your desk just to approve commands, answer prompt questions, or check status is frustrating and limits your freedom.

## 😎 The Solution: Remote AI Control on the Go!
With **Antigravity With Telegram**, you can step away from your workspace. Get notified instantly when the AI needs your input, and interact with your development workspace right from your phone.

- **Approve/Reject Actions**: Get instant prompts for `ask_permission`, `ask_question`, or `run_command` and answer with simple inline buttons.
- **Real-Time Monitoring**: Watch compilation, linting, and testing outputs stream live to your chat.
- **Remote Operations**: Ask questions, trigger actions (like checkout, git diff, or test execution), or stop generation (`/stop`) from Telegram.

---

## 📸 Demo & Screenshots

See how easy it is to manage your IDE from Telegram:

| 1. Interactive Prompts | 2. Remote Syntax Auditing | 3. Branch & Tag Checkout |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Workspace & Files | 5. Commit History & Status |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

## ✨ Features
- **Live Mirroring**: AI responses are forwarded directly to your Telegram chat.
- **Remote Control**: Send prompts, approve plans, or stop generation (`/stop`) directly from Telegram.
- **Interactive Prompts**: Receive and respond to IDE dialogs (such as `ask_question`, `ask_permission`, `run_command`) using inline buttons.
- **File Upload**: Send files or photos via Telegram to inject them into the active IDE chat context.

## 🛠️ Installation
Search for **Antigravity With Telegram** in the Antigravity Extensions Marketplace, or install it directly from Open VSX.

## 📋 Prerequisites
- **Antigravity IDE** must be installed and running.
- **A Telegram Bot Token**: Create a bot using [@BotFather](https://t.me/BotFather) on Telegram and copy the API token.

## ⚙️ Setup & Configuration
1. Open settings in VS Code / Antigravity IDE (`Cmd+,` or `Ctrl+,`).
2. Search for `Antigravity With Telegram` and configure the settings:
   - `antigravityWithTelegram.autoStart` (Optional): Automatically start the Telegram bot when the IDE opens.
   - `antigravityWithTelegram.telegramToken`: Your Bot API Token.
   - `antigravityWithTelegram.telegramChatId` (Optional): The Chat ID allowed to interact with the bot (retrieve it using `@userinfobot` or similar).
   - `antigravityWithTelegram.telegramAllowedUsername` (Optional): The Telegram username (without `@`) allowed to interact.
3. Run the command `Antigravity With Telegram: Start Telegram Bot` from the Command Palette (`F1` or `Cmd+Shift+P`).

## 💻 Commands
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (for testing)

## 🔒 Account Safety
This extension communicates directly with Telegram servers using the official Telegram Bot API and integrates locally with your Antigravity Language Server (LS) and VS Code Extension APIs. It does not run any local HTTP/WebSocket server or open any network ports, keeping your environment secure. No third-party servers are involved.

---

## ☕ Support this Project
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

# Antigravity With Telegram (VS Code Extension)

Telegram bot bridge for Antigravity IDE. It allows you to monitor and control your active Antigravity AI sessions from your phone via Telegram.

## Features
- **Live Mirroring**: AI responses are forwarded directly to your Telegram chat.
- **Remote Control**: Send prompts, approve plans, or stop generation (`/stop`) directly from Telegram.
- **Interactive Prompts**: Receive and respond to IDE dialogs (such as `ask_question`, `ask_permission`, `run_command`) using inline buttons.
- **File Upload**: Send files or photos via Telegram to inject them into the active IDE chat context.

## Installation
Search for **Antigravity With Telegram** in the Antigravity Extensions Marketplace, or install it directly from Open VSX.

## Prerequisites
- **Antigravity IDE** must be installed and running.
- **A Telegram Bot Token**: Create a bot using [@BotFather](https://t.me/BotFather) on Telegram and copy the API token.

## Setup & Configuration
1. Open settings in VS Code / Antigravity IDE (`Cmd+,` or `Ctrl+,`).
2. Search for `Antigravity With Telegram` and configure the settings:
   - `antigravityWithTelegram.autoStart` (Optional): Automatically start the Telegram bot when the IDE opens.
   - `antigravityWithTelegram.telegramToken`: Your Bot API Token.
   - `antigravityWithTelegram.telegramChatId` (Optional): The Chat ID allowed to interact with the bot (retrieve it using `@userinfobot` or similar).
   - `antigravityWithTelegram.telegramAllowedUsername` (Optional): The Telegram username (without `@`) allowed to interact.
3. Run the command `Antigravity With Telegram: Start Telegram Bot` from the Command Palette (`F1` or `Cmd+Shift+P`).

## Commands
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (for testing)

## Account Safety
This extension communicates directly with Telegram servers using the official Telegram Bot API and integrates locally with your Antigravity Language Server (LS) and VS Code Extension APIs. It does not run any local HTTP/WebSocket server or open any network ports, keeping your environment secure. No third-party servers are involved.
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

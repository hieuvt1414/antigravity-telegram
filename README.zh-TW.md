# Antigravity With Telegram (VS Code 插件)

用於 Antigravity IDE 的 Telegram 機器人橋接器。允許您透過 Telegram 從手機監控和控制活躍的 Antigravity AI 對話。

## 功能特性
- **實時鏡像**: AI 回應將直接轉發到您的 Telegram 聊天中。
- **遠端控制**: 直接在 Telegram 中傳送提示詞、批准計劃或停止生成 (`/stop`)。
- **互動式提示**: 使用內聯按鈕接收並回應 IDE 對話框（如 `ask_question`、`ask_permission`、`run_command`）。
- **文件上傳**: 透過 Telegram 傳送文件或照片以將其注入到活躍的 IDE 聊天上下文中。

## 安裝
在 Antigravity 插件市場中搜尋 **Antigravity With Telegram**，或直接從 Open VSX 安裝。

## 前提條件
- 必須安裝並運行 **Antigravity IDE**。
- **Telegram 機器人 Token**: 在 Telegram 上使用 [@BotFather](https://t.me/BotFather) 創建機器人並複製 API token。

## 設置與配置
1. 打開 VS Code / Antigravity IDE 中的設置 (`Cmd+,` 或 `Ctrl+,`)。
2. 搜尋 `Antigravity With Telegram` 並配置以下設置：
   - `antigravityWithTelegram.autoStart` (選填): 在 IDE 啟動時自動啟動 Telegram 機器人。
   - `antigravityWithTelegram.telegramToken`: 您的機器人 API Token。
   - `antigravityWithTelegram.telegramChatId` (選填): 允許與機器人交互的聊天 ID（使用 `@userinfobot` 等獲取）。
   - `antigravityWithTelegram.telegramAllowedUsername` (選填): 允許交互的 Telegram 用戶名（不帶 `@`）。
3. 從命令面板（`F1` 或 `Cmd+Shift+P`）運行命令 `Antigravity With Telegram: Start Telegram Bot`。

## 命令
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (用於測試)

## 帳戶安全
該插件使用官方 Telegram 機器人 API 直接與 Telegram 伺服器通信，並與您本地的 Antigravity 語言伺服器 (LS) 和 VS Code 插件 API 進行整合。它不運行任何本地 HTTP/WebSocket 伺服器，也不開啟 any 網路埠，從而確保您的環境安全。不涉及第三方伺服器。
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

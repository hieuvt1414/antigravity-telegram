# Antigravity With Telegram (VS Code 插件) 🚀

透過 Telegram 直接在行動裝置上控制、監控和與您的 Antigravity AI 程式設計助手互動。

---

## 😟 问题：每天 24 小時、每周 7 天都被困在電腦前？
作為開發人員，您經常運行耗時較長的工作：等待大型重構、運行自動測試、審計專案建置或產生程式碼庫。僅僅為了批准指令、回答提示問題或檢查狀態而不得不一直坐在電腦前，這令人沮喪且限制了您的自由。

## 😎 解決方案：隨時隨地的遠端 AI 控制！
使用 **Antigravity With Telegram**，您可以離開工作區。當 AI 需要您的輸入時，您會立即收到通知，並直接透過手機與開發工作區進行互動。

- **批准/拒絕操作**：獲取 `ask_permission`、`ask_question` 或 `run_command` 的即時提示，並使用簡單的內嵌按鈕進行回答。
- **即時監控**：在聊天中即時觀看編譯、程式碼規範檢查 (linting) 和測試輸出。
- **遠端操作**：從 Telegram 提問、觸發操作（如檢出 checkout、git diff 或執行測試）或停止產生 (`/stop`)。

---

## 📸 演示與截圖

See how easy it is to manage your IDE from Telegram:

| 1. 互動式提示 | 2. 遠端語法審計 | 3. 分支與標籤檢出 |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. 工作區與檔案 | 5. 提交歷史與狀態 |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ 支持這個項目
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

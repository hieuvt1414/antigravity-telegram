# Antigravity With Telegram (VS Code 插件) 🚀

通过 Telegram 直接在移动设备上控制、监控和与您的 Antigravity AI 编程助手交互。

---

## 😟 问题：每天 24 小时、每周 7 天都被困在电脑前？
作为开发人员，您经常运行耗时较长的任务：等待大型重构、运行自动测试、审计项目构建或生成代码库。仅仅为了批准命令、回答提示问题或检查状态而不得不一直坐在电脑前，这令人沮丧且限制了您的自由。

## 😎 解决方案：随时随地的远程 AI 控制！
使用 **Antigravity With Telegram**，您可以离开工作区。当 AI 需要您的输入时，您会立即收到通知，并直接通过手机与开发工作区进行交互。

- **批准/拒绝操作**：获取 `ask_permission`、`ask_question` 或 `run_command` 的即时提示，并使用简单的内联按钮进行回答。
- **实时监控**：在聊天中实时观看编译、代码规范检查 (linting) 和测试输出。
- **远程操作**：从 Telegram 提问、触发操作（如检出 checkout、git diff 或执行测试）或停止生成 (`/stop`)。

---

## 📸 演示与截图

See how easy it is to manage your IDE from Telegram:

| 1. 交互式提示 | 2. 远程语法审计 | 3. 分支与标签检出 |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. 工作区与文件 | 5. 提交历史与状态 |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

## 功能特性
- **实时镜像**: AI 响应将直接转发到您的 Telegram 聊天中。
- **远程控制**: 直接在 Telegram 中发送提示词、批准计划或停止生成 (`/stop`)。
- **交互式提示**: 使用内联按钮接收并响应 IDE 对话框（如 `ask_question`、`ask_permission`、`run_command`）。
- **文件上传**: 通过 Telegram 发送文件或照片以将其注入到活跃 delinquent IDE 聊天上下文中。

## 安装
在 Antigravity 插件市场中搜索 **Antigravity With Telegram**，或直接从 Open VSX 安装。

## 前提条件
- 必须安装并运行 **Antigravity IDE**。
- **Telegram 机器人 Token**: 在 Telegram 上使用 [@BotFather](https://t.me/BotFather) 创建机器人并复制 API token。

## 设置与配置
1. 打开 VS Code / Antigravity IDE 中的设置 (`Cmd+,` 或 `Ctrl+,`)。
2. 搜索 `Antigravity With Telegram` 并配置以下设置：
   - `antigravityWithTelegram.autoStart` (可选): 在 IDE 启动时自动启动 Telegram 机器人。
   - `antigravityWithTelegram.telegramToken`: 您的机器人 API Token。
   - `antigravityWithTelegram.telegramChatId` (可选): 允许与机器人交互的聊天 ID（使用 `@userinfobot` 等获取）。
   - `antigravityWithTelegram.telegramAllowedUsername` (可选): 允许交互的 Telegram 用户名（不带 `@`）。
3. 从命令面板（`F1` 或 `Cmd+Shift+P`）运行命令 `Antigravity With Telegram: Start Telegram Bot`。

## 命令
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (用于测试)

## 账户安全
该插件使用官方 Telegram 机器人 API 直接与 Telegram 服务器通信，并与您本地的 Antigravity 语言服务器 (LS) 和 VS Code 插件 API 进行集成。它不运行任何本地 HTTP/WebSocket 服务器，也不打开任何网络端口，从而确保您的环境安全。不涉及第三方服务器。

---

## ☕ 支持这个项目
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

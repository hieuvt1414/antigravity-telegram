# Antigravity With Telegram (VS Code 插件)

用于 Antigravity IDE 的 Telegram 机器人桥接器。允许您通过 Telegram 从手机监控和控制活跃的 Antigravity AI 会话。

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
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

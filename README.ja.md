# Antigravity With Telegram (VS Code 拡張機能) 🚀

アクティブな Antigravity AI コーディングアシスタントを、Telegram 経由でモバイルデバイスから直接制御、監視、操作できます。

---

## 😟 課題: 24時間365日パソコンの前に縛られていませんか？
開発者として、大規模なリファクタリングの待機、自動テストの実行、プロジェクトビルドの監査、コードベースの生成など、長時間のタスクを実行することがよくあります。コマンドの承認、プロンプトへの回答、またはステータスの確認のためだけにデスクに縛り付けられるのはイライラし、自由が制限されます。

## 😎 解決策: 外出先からAIをリモートコントロール！
**Antigravity With Telegram** を使用すると、ワークスペースから離れることができます。AI が入力を必要とするときに即座に通知を受け取り、スマートフォンから直接開発ワークスペースと対話できます。

- **アクションの承認/拒否**: `ask_permission`、`ask_question`、または `run_command` の即時プロンプトを受け取り、簡単なインラインボタンで回答します。
- **リアルタイム監視**: コンパイル、リンティング、テスト出力をチャットでライブ配信します。
- **リモート操作**: 質問の送信、アクション（チェックアウト、git diff、テスト実行など）のトリガー、または生成の停止（`/stop`）を Telegram から実行できます。

---

## 📸 デモとスクリーンショット

See how easy it is to manage your IDE from Telegram:

| 1. 対話型プロンプト | 2. リモート構文監査 | 3. ブランチとタグのチェックアウト |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. ワークスペースとファイル | 5. コミット履歴とステータス |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

## 機能
- **ライブミラーリング**: AI の応答が Telegram チャットに直接転送されます。
- **リモートコントロール**: プロンプトの送信、プランの承認、または生成の停止 (`/stop`) を Telegram から直接実行できます。
- **インタラクティブプロンプト**: インラインボタンを使用して、IDE ダイアログ (`ask_question`, `ask_permission`, `run_command` など) に応答できます。
- **ファイルアップロード**: Telegram 経由でファイルや写真を送信し、アクティブな IDE チャットコンテキストに注入します。

## インストール
Antigravity 拡張機能マーケットプレイスで **Antigravity With Telegram** を検索するか、Open VSX から直接インストールします。

## 前提条件
- **Antigravity IDE** がインストールされ、実行されていること。
- **Telegram ボットトークン**: Telegram の [@BotFather](https://t.me/BotFather) を使用してボットを作成し、API トークンをコピーします。

## 設定方法
1. VS Code / Antigravity IDE の設定を開きます (`Cmd+,` または `Ctrl+,`)。
2. `Antigravity With Telegram` を検索し、以下の設定を構成します:
   - `antigravityWithTelegram.autoStart` (任意): IDE起動時にTelegramボットを自動的に起動します。
   - `antigravityWithTelegram.telegramToken`: ボットの API トークン。
   - `antigravityWithTelegram.telegramChatId` (任意): ボットとの対話が許可されたチャット ID (`@userinfobot` などを使用して取得)。
   - `antigravityWithTelegram.telegramAllowedUsername` (任意): 対話が許可された Telegram ユーザー名 (`@` なし)。
3. コマンドパレット (`F1` または `Cmd+Shift+P`) から `Antigravity With Telegram: Start Telegram Bot` コマンドを実行します。

## コマンド
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (テスト用)

## アカウントの安全性
この拡張機能は、公式の Telegram ボット API を使用して Telegram サーバーと直接通信し、ローカルの Antigravity 言語サーバー (LS) および VS Code 拡張機能 API と統合します。ローカルの HTTP/WebSocket サーバーを実行したり、ネットワークポートを開いたりしないため、開発環境の安全性が保たれます。サードパーティのサーバーは関与しません。

---

## ☕ プロジェクトを支援する
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

import os

# Define the content dictionary for all 16 README files
readmes = {
    "README.md": """# Antigravity With Telegram (VS Code Extension)

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
""",

    "README.vi.md": """# Antigravity With Telegram (VS Code Extension)

Cầu nối Bot Telegram cho Antigravity IDE. Tiện ích này giúp bạn giám sát và điều khiển các phiên làm việc của Antigravity AI ngay trên điện thoại thông qua Telegram.

## Tính năng nổi bật
- **Gương trực tiếp (Mirroring)**: Nhận phản hồi từ AI ngay trên tin nhắn Telegram theo thời gian thực.
- **Điều khiển từ xa**: Gửi prompt, duyệt kế hoạch (approve plan) hoặc dừng sinh code (`/stop`) từ Telegram.
- **Hộp thoại tương tác**: Nhận và trả lời các yêu cầu xác nhận từ IDE (như `ask_question`, `ask_permission`, `run_command`) bằng các nút bấm inline.
- **Gửi file/hình ảnh**: Gửi tài liệu hoặc ảnh trực tiếp qua Telegram để tự động đính kèm vào ngữ cảnh chat trong IDE.

## Cài đặt
Tìm kiếm **Antigravity With Telegram** trên Chợ Tiện ích mở rộng của Antigravity hoặc tải trực tiếp từ Open VSX.

## Yêu cầu chuẩn bị
- **Antigravity IDE** đang chạy.
- **Telegram Bot Token**: Tạo một bot thông qua [@BotFather](https://t.me/BotFather) trên Telegram và lấy mã API token.

## Thiết lập & Cấu hình
1. Mở Cài đặt trong VS Code / Antigravity IDE (`Cmd+,` hoặc `Ctrl+,`).
2. Tìm kiếm `Antigravity With Telegram` và cấu hình các thông số:
   - `antigravityWithTelegram.autoStart` (Tùy chọn): Tự động bật Telegram Bot khi mở IDE.
   - `antigravityWithTelegram.telegramToken`: Mã API Token của Bot.
   - `antigravityWithTelegram.telegramChatId` (Tùy chọn): Chat ID được phép tương tác (sử dụng `@userinfobot` để lấy ID của bạn).
   - `antigravityWithTelegram.telegramAllowedUsername` (Tùy chọn): Tên người dùng Telegram (không có chữ `@`) được phép tương tác.
3. Chạy lệnh `Antigravity With Telegram: Start Telegram Bot` từ Command Palette (`F1` hoặc `Cmd+Shift+P`).

## Các Lệnh Hỗ Trợ
- `Antigravity With Telegram: Start Telegram Bot` — Khởi động Bot.
- `Antigravity With Telegram: Stop Telegram Bot` — Dừng Bot.
- `Antigravity With Telegram: Send Mock Question to Telegram` — Gửi câu hỏi thử nghiệm để test tính năng tương tác.

## An toàn tài khoản
Tiện ích này giao tiếp trực tiếp với máy chủ Telegram qua API chính thức của Telegram Bot và tích hợp cục bộ với Antigravity Language Server (LS) cùng VS Code Extension API. Tiện ích hoàn toàn không chạy bất kỳ máy chủ HTTP/WebSocket nào hay mở cổng mạng cục bộ, giữ an toàn tối đa cho môi trường làm việc của bạn. Không sử dụng máy chủ trung gian của bên thứ ba.
""",

    "README.ja.md": """# Antigravity With Telegram (VS Code 拡張機能)

Antigravity IDE 用の Telegram ボットブリッジです。Telegram を通じて、スマートフォンからアクティブな Antigravity AI セッションを監視および制御できます。

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
""",

    "README.zh-CN.md": """# Antigravity With Telegram (VS Code 插件)

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
""",

    "README.zh-TW.md": """# Antigravity With Telegram (VS Code 插件)

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
""",

    "README.ko.md": """# Antigravity With Telegram (VS Code 확장 기능)

Antigravity IDE용 Telegram 봇 브릿지입니다. Telegram을 통해 스마트폰에서 활성화된 Antigravity AI 세션을 모니터링하고 제어할 수 있습니다.

## 주요 기능
- **실시간 미러링**: AI 응답이 Telegram 채팅으로 직접 전달됩니다.
- **원격 제어**: Telegram에서 직접 프롬프트 전송, 계획 승인 또는 생성 중지(`/stop`)를 수행할 수 있습니다.
- **대화형 프롬프트**: 인라인 버튼을 사용하여 IDE 대화 상자(`ask_question`, `ask_permission`, `run_command` 등)에 응답할 수 있습니다.
- **파일 업로드**: Telegram을 통해 파일이나 사진을 전송하여 활성화된 IDE 채팅 컨텍스트에 삽입합니다.

## 설치 방법
Antigravity 확장 기능 마켓플레이스에서 **Antigravity With Telegram**을 검색하거나 Open VSX에서 직접 설치합니다.

## 필수 요구 사항
- **Antigravity IDE**가 설치되어 실행 중이어야 합니다.
- **Telegram 봇 토큰**: Telegram에서 [@BotFather](https://t.me/BotFather)를 사용하여 봇을 생성하고 API 토큰을 복사합니다.

## 설정 및 구성
1. VS Code / Antigravity IDE 설정을 엽니다 (`Cmd+,` 또는 `Ctrl+,`).
2. `Antigravity With Telegram`을 검색하고 다음 설정을 구성합니다.
   - `antigravityWithTelegram.autoStart` (선택 사항): IDE가 열릴 때 Telegram 봇을 자동으로 시작합니다.
   - `antigravityWithTelegram.telegramToken`: 봇 API 토큰.
   - `antigravityWithTelegram.telegramChatId` (선택 사항): 봇과 상호 작용이 허용된 채팅 ID (`@userinfobot` 등을 사용하여 확인).
   - `antigravityWithTelegram.telegramAllowedUsername` (선택 사항): 상호 작용이 허용된 Telegram 사용자 이름 (`@` 제외).
3. 명령 팔레트 (`F1` 또는 `Cmd+Shift+P`)에서 `Antigravity With Telegram: Start Telegram Bot` 명령을 실행합니다.

## 명령 목록
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (테스트용)

## 계정 안전성
이 확장 기능은 공식 Telegram 봇 API를 사용하여 Telegram 서버와 직접 통신하며, 로컬 Antigravity 언어 서버(LS) 및 VS Code 확장 API와 로컬로 통합됩니다. 로컬 HTTP/WebSocket 서버를 실행하거나 네트워크 포트를 열지 않으므로 환경을 안전하게 유지합니다. 제3자 서버는 관여하지 않습니다.
""",

    "README.de.md": """# Antigravity With Telegram (VS Code Erweiterung)

Telegram-Bot-Bridge für die Antigravity-IDE. Sie ermöglicht es Ihnen, Ihre aktiven Antigravity-KI-Sitzungen von Ihrem Telefon aus über Telegram zu überwachen und zu steuern.

## Funktionen
- **Live-Spiegelung**: KI-Antworten werden direkt an Ihren Telegram-Chat weitergeleitet.
- **Fernsteuerung**: Senden Sie Prompts, genehmigen Sie Pläne oder stoppen Sie die Generierung (`/stop`) direkt über Telegram.
- **Interaktive Eingabeaufforderungen**: Empfangen und beantworten Sie IDE-Dialoge (wie `ask_question`, `ask_permission`, `run_command`) über Inline-Schaltflächen.
- **Datei-Upload**: Senden Sie Dateien oder Fotos über Telegram, um sie in den aktiven IDE-Chat-Kontext einzufügen.

## Installation
Suchen Sie im Antigravity Extensions Marketplace nach **Antigravity With Telegram** oder installieren Sie es direkt über Open VSX.

## Voraussetzungen
- Die **Antigravity-IDE** muss installiert sein und ausgeführt werden.
- **Ein Telegram-Bot-Token**: Erstellen Sie einen Bot über [@BotFather](https://t.me/BotFather) auf Telegram und kopieren Sie den API-Token.

## Einrichtung & Konfiguration
1. Öffnen Sie die Einstellungen in VS Code / Antigravity-IDE (`Cmd+,` oder `Ctrl+,`).
2. Suchen Sie nach `Antigravity With Telegram` und konfigurieren Sie die Einstellungen:
   - `antigravityWithTelegram.autoStart` (Optional): Startet den Telegram-Bot automatisch, wenn die IDE geöffnet wird.
   - `antigravityWithTelegram.telegramToken`: Ihr Bot-API-Token.
   - `antigravityWithTelegram.telegramChatId` (Optional): Die Chat-ID, die mit dem Bot interagieren darf (abrufbar über `@userinfobot` oder ähnliche).
   - `antigravityWithTelegram.telegramAllowedUsername` (Optional): Der Telegram-Benutzername (ohne `@`), der interagieren darf.
3. Führen Sie den Befehl `Antigravity With Telegram: Start Telegram Bot` aus der Befehlspalette (`F1` oder `Cmd+Shift+P`) aus.

## Befehle
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (zum Testen)

## Kontosicherheit
Diese Erweiterung kommuniziert über die offizielle Telegram-Bot-API direkt mit den Telegram-Servern und lässt sich lokal in Ihren Antigravity Language Server (LS) und die VS Code Extension-APIs integrieren. Sie führt keinen lokalen HTTP/WebSocket-Server aus und öffnet keine Netzwerkports, wodurch Ihre Umgebung sicher bleibt. Es sind keine Server von Drittanbietern beteiligt.
""",

    "README.fr.md": """# Antigravity With Telegram (Extension VS Code)

Pont de bot Telegram pour Antigravity IDE. Il vous permet de surveiller et de contrôler vos sessions d'IA Antigravity actives depuis votre téléphone via Telegram.

## Fonctionnalités
- **Miroir en direct**: Les réponses de l'IA sont transférées directement vers votre discussion Telegram.
- **Contrôle à distance**: Envoyez des invites, approuvez des plans ou arrêtez la génération (`/stop`) directement depuis Telegram.
- **Invites interactives**: Recevez et répondez aux fenêtres de dialogue de l'IDE (comme `ask_question`, `ask_permission`, `run_command`) à l'aide de boutons intégrés.
- **Envoi de fichiers**: Envoyez des fichiers ou des photos via Telegram pour les injecter dans le contexte de discussion de l'IDE actif.

## Installation
Recherchez **Antigravity With Telegram** dans le Marketplace d'extensions Antigravity, ou installez-le directement depuis Open VSX.

## Prérequis
- **Antigravity IDE** doit être installé et en cours d'exécution.
- **Un jeton de bot Telegram**: Créez un bot à l'aide de [@BotFather](https://t.me/BotFather) sur Telegram et copiez le jeton API.

## Configuration
1. Ouvrez les paramètres dans VS Code / Antigravity IDE (`Cmd+,` ou `Ctrl+,`).
2. Recherchez `Antigravity With Telegram` et configurez les paramètres :
   - `antigravityWithTelegram.autoStart` (Optionnel) : Lance automatiquement le bot Telegram à l'ouverture de l'IDE.
   - `antigravityWithTelegram.telegramToken` : Votre jeton API de bot.
   - `antigravityWithTelegram.telegramChatId` (Optionnel) : L'ID de discussion autorisé à interagir avec le bot (à récupérer via `@userinfobot` ou similaire).
   - `antigravityWithTelegram.telegramAllowedUsername` (Optionnel) : Le nom d'utilisateur Telegram (sans `@`) autorisé à interagir.
3. Exécutez la commande `Antigravity With Telegram: Start Telegram Bot` depuis la palette de commandes (`F1` ou `Cmd+Shift+P`).

## Commandes
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (pour les tests)

## Sécurité du compte
Cette extension communique directement avec les serveurs de Telegram à l'aide de l'API officielle des bots Telegram et s'intègre localement à votre serveur de langage Antigravity (LS) et aux API d'extension de VS Code. Elle n'exécute aucun serveur HTTP/WebSocket local et n'ouvre aucun port réseau, garantissant ainsi la sécurité de votre environnement. Aucun serveur tiers n'est impliqué.
""",

    "README.es.md": """# Antigravity With Telegram (Extensión de VS Code)

Puente de bot de Telegram para Antigravity IDE. Le permite monitorear y controlar sus sesiones activas de IA de Antigravity desde su teléfono a través de Telegram.

## Características
- **Espejo en vivo**: Las respuestas de la IA se reenvían directamente a su chat de Telegram.
- **Control remoto**: Envíe instrucciones, apruebe planes o detenga la generación (`/stop`) directamente desde Telegram.
- **Mensajes interactivos**: Reciba y responda a los diálogos del IDE (como `ask_question`, `ask_permission`, `run_command`) mediante botones integrados.
- **Carga de archivos**: Envíe archivos o fotos a través de Telegram para inyectarlos en el contexto de chat activo del IDE.

## Instalación
Busque **Antigravity With Telegram** en el Marketplace de extensiones de Antigravity, o instálelo directamente desde Open VSX.

## Requisitos previos
- **Antigravity IDE** debe estar instalado y en ejecución.
- **Un token de bot de Telegram**: Cree un bot usando [@BotFather](https://t.me/BotFather) en Telegram y copie el token de la API.

## Configuración
1. Abra la configuración en VS Code / Antigravity IDE (`Cmd+,` o `Ctrl+,`).
2. Busque `Antigravity With Telegram` y configure las opciones:
   - `antigravityWithTelegram.autoStart` (Opcional): Inicia automáticamente el bot de Telegram al abrir el IDE.
   - `antigravityWithTelegram.telegramToken`: El token de la API de su bot.
   - `antigravityWithTelegram.telegramChatId` (Opcional): El ID de chat permitido para interactuar con el bot (consígalo usando `@userinfobot` o similar).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opcional): El nombre de usuario de Telegram (sin `@`) permitido para interactuar.
3. Ejecute el comando `Antigravity With Telegram: Start Telegram Bot` desde la paleta de comandos (`F1` o `Cmd+Shift+P`).

## Comandos
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (para pruebas)

## Seguridad de la cuenta
Esta extensión se comunica directamente con los servidores de Telegram utilizando la API oficial de bots de Telegram y se integra localmente con su servidor de lenguaje Antigravity (LS) y las API de extensión de VS Code. No ejecuta ningún servidor HTTP/WebSocket local ni abre ningún puerto de red, manteniendo su entorno seguro. No intervienen servidores de terceros.
""",

    "README.pt.md": """# Antigravity With Telegram (Extensão do VS Code)

Ponte de bot do Telegram para o Antigravity IDE. Permite que você monitore e controle suas sessões ativas de IA do Antigravity a partir do seu telefone via Telegram.

## Recursos
- **Espelhamento ao vivo**: As respostas da IA são encaminhadas diretamente para o seu chat do Telegram.
- **Controle remoto**: Envie prompts, aprove planos ou pare a geração (`/stop`) diretamente do Telegram.
- **Prompts interativos**: Receba e responda aos diálogos do IDE (como `ask_question`, `ask_permission`, `run_command`) usando botões embutidos.
- **Upload de arquivos**: Envie arquivos ou fotos via Telegram para inseri-los no contexto do chat ativo do IDE.

## Instalação
Procure por **Antigravity With Telegram** no Marketplace de Extensões do Antigravity ou instale diretamente do Open VSX.

## Pré-requisitos
- O **Antigravity IDE** deve estar instalado e em execução.
- **Um token de bot do Telegram**: Crie um bot usando o [@BotFather](https://t.me/BotFather) no Telegram e copie o token da API.

## Configuração
1. Abra as configurações no VS Code / Antigravity IDE (`Cmd+,` ou `Ctrl+,`).
2. Procure por `Antigravity With Telegram` e defina as configurações:
   - `antigravityWithTelegram.autoStart` (Opcional): Inicia o bot do Telegram automaticamente quando o IDE é aberto.
   - `antigravityWithTelegram.telegramToken`: O token da API do seu bot.
   - `antigravityWithTelegram.telegramChatId` (Opcional): O ID do chat com permissão para interagir com o bot (obtenha usando o `@userinfobot` ou similar).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opcional): O nome de usuário do Telegram (sem `@`) com permissão para interagir.
3. Execute o comando `Antigravity With Telegram: Start Telegram Bot` a partir da paleta de comandos (`F1` ou `Cmd+Shift+P`).

## Comandos
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (para testes)

## Segurança da conta
Esta extensão se comunica diretamente com os servidores do Telegram usando a API oficial de bots do Telegram e se integra localmente com o seu Antigravity Language Server (LS) e as APIs de extensão do VS Code. Ela não executa nenhum servidor HTTP/WebSocket local nem abre portas de rede, mantendo seu ambiente seguro. Nenhum servidor de terceiros está envolvido.
""",

    "README.ru.md": """# Antigravity With Telegram (Расширение VS Code)

Мост Telegram-бота для Antigravity IDE. Позволяет отслеживать и управлять активными сессиями Antigravity AI с вашего телефона через Telegram.

## Возможности
- **Прямая трансляция**: Ответы ИИ пересылаются прямо в ваш чат Telegram.
- **Удаленное управление**: Отправляйте запросы, утверждайте планы или останавливайте генерацию (`/stop`) прямо из Telegram.
- **Интерактивные диалоги**: Получайте и отвечайте на запросы IDE (такие как `ask_question`, `ask_permission`, `run_command`) с помощью встроенных кнопок.
- **Загрузка файлов**: Отправляйте файлы или фотографии через Telegram для добавления их в активный контекст чата IDE.

## Установка
Найдите **Antigravity With Telegram** в магазине расширений Antigravity или установите напрямую из Open VSX.

## Требования
- Должна быть установлена и запущена **Antigravity IDE**.
- **Токен Telegram-бота**: Создайте бота с помощью [@BotFather](https://t.me/BotFather) в Telegram и скопируйте API-токен.

## Настройка
1. Откройте настройки в VS Code / Antigravity IDE (`Cmd+,` или `Ctrl+,`).
2. Найдите `Antigravity With Telegram` и настройте параметры:
   - `antigravityWithTelegram.autoStart` (Опционально): Автоматически запускавать Telegram-бота при запуске IDE.
   - `antigravityWithTelegram.telegramToken`: Токен API вашего бота.
   - `antigravityWithTelegram.telegramChatId` (Опционально): ID чата, которому разрешено общаться с ботом (можно узнать через `@userinfobot` или аналогичный бот).
   - `antigravityWithTelegram.telegramAllowedUsername` (Опционально): Имя пользователя Telegram (без `@`), которому разрешено общение.
3. Запустите команду `Antigravity With Telegram: Start Telegram Bot` из палитры команд (`F1` или `Cmd+Shift+P`).

## Команды
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (для тестирования)

## Безопасность аккаунта
Это расширение напрямую взаимодействует с серверами Telegram, используя официальный Telegram Bot API, и интегрируется локально с вашим языковым сервером Antigravity (LS) и VS Code Extension API. Оно не запускает локальный HTTP/WebSocket-сервер и не открывает сетевые порты, обеспечивая безопасность вашей среды. Сторонние серверы не используются.
""",

    "README.it.md": """# Antigravity With Telegram (Estensione VS Code)

Ponte bot di Telegram per Antigravity IDE. Ti consente di monitorare e controllare le tue sessioni attive di Antigravity AI dal tuo telefono tramite Telegram.

## Caratteristiche
- **Specchio in tempo reale**: Le risposte dell'IA vengono inoltrate direttamente alla tua chat di Telegram.
- **Controllo remoto**: Invia prompt, approva piani o interrompi la generazione (`/stop`) direttamente da Telegram.
- **Prompt interattivi**: Ricevi e rispondi ai dialoghi dell'IDE (come `ask_question`, `ask_permission`, `run_command`) utilizzando i pulsanti integrati.
- **Caricamento file**: Invia file o foto tramite Telegram per inserirli nel contesto di chat attivo dell'IDE.

## Installazione
Cerca **Antigravity With Telegram** nell'Antigravity Extensions Marketplace, oppure installalo direttamente da Open VSX.

## Prerequisiti
- **Antigravity IDE** deve essere installato e in esecuzione.
- **Un token bot di Telegram**: Crea un bot utilizzando [@BotFather](https://t.me/BotFather) su Telegram e copia il token API.

## Configurazione
1. Apri le impostazioni in VS Code / Antigravity IDE (`Cmd+,` o `Ctrl+,`).
2. Cerca `Antigravity With Telegram` e configura le impostazioni:
   - `antigravityWithTelegram.autoStart` (Opzionale): Avvia automaticamente il bot di Telegram all'apertura dell'IDE.
   - `antigravityWithTelegram.telegramToken`: Il token API del tuo bot.
   - `antigravityWithTelegram.telegramChatId` (Opzionale): L'ID chat autorizzato a interagire con il bot (recuperabile tramite `@userinfobot` o simili).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opzionale): Il nome utente Telegram (senza `@`) autorizzato a interagire.
3. Esegui il comando `Antigravity With Telegram: Start Telegram Bot` dalla tavolozza dei comandi (`F1` o `Cmd+Shift+P`).

## Comandi
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (per i test)

## Sicurezza dell'account
Questa estensione comunica direttamente con i server di Telegram utilizzando l'API ufficiale dei bot di Telegram e si integra localmente con l'Antigravity Language Server (LS) e le API di estensione di VS Code. Non esegue alcun server HTTP/WebSocket locale né apre porte di rete, mantenendo sicuro il tuo ambiente. Non sono coinvolti server di terze parti.
""",

    "README.pl.md": """# Antigravity With Telegram (Rozszerzenie VS Code)

Mostek bota Telegram dla Antigravity IDE. Umożliwia monitorowanie i kontrolowanie aktywnych sesji sztucznej inteligencji Antigravity z telefonu za pomocą aplikacji Telegram.

## Funkcje
- **Podgląd na żywo**: Odpowiedzi AI są przesyłane bezpośrednio na Twój czat w Telegramie.
- **Zdalne sterowanie**: Wysyłaj prompty, zatwierdzaj plany lub zatrzymuj generowanie (`/stop`) bezpośrednio z Telegrama.
- **Interaktywne komunikaty**: Odbieraj i odpowiadaj na okna dialogowe IDE (takie jak `ask_question`, `ask_permission`, `run_command`) za pomocą wbudowanych przycisków.
- **Przesyłanie plików**: Wysyłaj pliki lub zdjęcia przez Telegrama, aby wstrzyknąć je do aktywnego kontekstu czatu IDE.

## Instalacja
Wyszukaj rozszerzenie **Antigravity With Telegram** w sklepie z rozszerzeniami Antigravity lub zainstaluj je bezpośrednio z Open VSX.

## Wymagania wstępne
- **Antigravity IDE** musi być zainstalowane i uruchomione.
- **Token bota Telegram**: Utwórz bota za pomocą [@BotFather](https://t.me/BotFather) na Telegramie i skopiuj token API.

## Konfiguracja
1. Otwórz ustawienia w VS Code / Antigravity IDE (`Cmd+,` lub `Ctrl+,`).
2. Wyszukaj `Antigravity With Telegram` i skonfiguruj ustawienia:
   - `antigravityWithTelegram.autoStart` (Opcjonalnie): Automatycznie uruchamia bota Telegram po otworciu IDE.
   - `antigravityWithTelegram.telegramToken`: Token API Twojego bota.
   - `antigravityWithTelegram.telegramChatId` (Opcjonalnie): Identyfikator czatu uprawniony do interakcji z botem (uzyskaj go za pomocą `@userinfobot` lub podobnego bota).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opcjonalnie): Nazwa użytkownika Telegram (bez `@`) uprawniona do interakcji.
3. Uruchom polecenie `Antigravity With Telegram: Start Telegram Bot` z palety poleceń (`F1` lub `Cmd+Shift+P`).

## Polecenia
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (do testów)

## Bezpieczeństwo konta
To rozszerzenie komunikuje się bezpośrednio z serwerami Telegrama przy użyciu oficjalnego interfejsu API bota Telegram i integruje się lokalnie z Twoim serwerem językowym Antigravity (LS) oraz interfejsami API rozszerzeń VS Code. Nie uruchamia żadnego lokalnego serwera HTTP/WebSocket ani nie otwiera żadnych portów sieciowych, co zapewnia bezpieczeństwo Twojego środowiska. Nie pośredniczą w tym żadne serwery zewnętrzne.
""",

    "README.tr.md": """# Antigravity With Telegram (VS Code Eklentisi)

Antigravity IDE için Telegram bot köprüsü. Aktif Antigravity yapay zeka oturumlarınızı Telegram üzerinden telefonunuzdan izlemenizi ve kontrol etmenizi sağlar.

## Özellikler
- **Canlı Yansıtma**: Yapay zeka yanıtları doğrudan Telegram sohbetinize iletilir.
- **Uzaktan Kontrol**: Doğrudan Telegram'dan komutlar gönderin, planları onaylayın veya üretimi durdurun (`/stop`).
- **Etkileşimli İstemler**: Satır içi düğmeleri kullanarak IDE iletişim kutularını (`ask_question`, `ask_permission`, `run_command` gibi) alın ve yanıtlayın.
- **Dosya Yükleme**: Etkin IDE sohbet bağlamına eklemek için Telegram üzerinden dosya veya fotoğraf gönderin.

## Kurulum
Antigravity Eklenti Mağazası'nda **Antigravity With Telegram**'ı aratın veya doğrudan Open VSX üzerinden yükleyin.

## Gereksinimler
- **Antigravity IDE** kurulu ve çalışır durumda olmalıdır.
- **Telegram Bot Belirteci**: Telegram'da [@BotFather](https://t.me/BotFather) kullanarak bir bot oluşturun ve API belirtecini kopyalayın.

## Kurulum ve Yapılandırma
1. VS Code / Antigravity IDE'de ayarları açın (`Cmd+,` veya `Ctrl+,`).
2. `Antigravity With Telegram` araması yapın ve ayarları yapılandırın:
   - `antigravityWithTelegram.autoStart` (İsteğe bağlı): IDE açıldığında Telegram botunu otomatik olarak başlatır.
   - `antigravityWithTelegram.telegramToken`: Bot API Belirteciniz.
   - `antigravityWithTelegram.telegramChatId` (İsteğe bağlı): Botla etkileşime girmesine izin verilen Sohbet Kimliği (`@userinfobot` veya benzeri kullanılarak alınabilir).
   - `antigravityWithTelegram.telegramAllowedUsername` (İsteğe bağlı): Etkileşime girmesine izin verilen Telegram kullanıcı adı (`@` işareti olmadan).
3. Komut Paletinden (`F1` veya `Cmd+Shift+P`) `Antigravity With Telegram: Start Telegram Bot` komutunu çalıştırın.

## Komutlar
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (test için)

## Hesap Güvenliği
Bu eklenti, resmi Telegram Bot API'sini kullanarak doğrudan Telegram sunucularıyla iletişim kurar ve yerel Antigravity Dil Sunucunuz (LS) ile VS Code Eklenti API'leriyle entegre olur. Yerel bir HTTP/WebSocket sunucusu çalıştırmaz veya herhangi bir ağ bağlantı noktası açmaz, böylece ortamınızı güvenli tutar. Üçüncü taraf sunucular dahil edilmez.
""",

    "README.id.md": """# Antigravity With Telegram (Ekstensi VS Code)

Jembatan bot Telegram untuk Antigravity IDE. Ini memungkinkan Anda memantau dan mengontrol sesi AI Antigravity yang aktif dari ponsel Anda via Telegram.

## Fitur
- **Pencerminan Langsung**: Tanggapan AI diteruskan langsung ke obrolan Telegram Anda.
- **Kontrol Jarak Jauh**: Kirim petunjuk, setujui rencana, atau hentikan pembuatan (`/stop`) langsung dari Telegram.
- **Perintah Interaktif**: Terima dan tanggapi dialog IDE (seperti `ask_question`, `ask_permission`, `run_command`) menggunakan tombol inline.
- **Unggah File**: Kirim file atau foto via Telegram untuk dimasukkan ke dalam konteks obrolan IDE yang aktif.

## Instalasi
Cari **Antigravity With Telegram** di Marketplace Ekstensi Antigravity, atau instal langsung dari Open VSX.

## Prasyarat
- **Antigravity IDE** harus terinstal dan berjalan.
- **Token Bot Telegram**: Buat bot menggunakan [@BotFather](https://t.me/BotFather) di Telegram dan salin token API.

## Pengaturan & Konfigurasi
1. Buka pengaturan di VS Code / Antigravity IDE (`Cmd+,` atau `Ctrl+,`).
2. Cari `Antigravity With Telegram` dan konfigurasikan pengaturan:
   - `antigravityWithTelegram.autoStart` (Opsional): Mulai bot Telegram secara otomatis saat IDE dibuka.
   - `antigravityWithTelegram.telegramToken`: Token API Bot Anda.
   - `antigravityWithTelegram.telegramChatId` (Opsional): ID Obrolan yang diizinkan untuk berinteraksi dengan bot (dapatkan menggunakan `@userinfobot` atau sejenisnya).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opsional): Nama pengguna Telegram (tanpa `@`) yang diizinkan untuk berinteraksi.
3. Jalankan perintah `Antigravity With Telegram: Start Telegram Bot` dari Command Palette (`F1` atau `Cmd+Shift+P`).

## Perintah
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (untuk pengujian)

## Keamanan Akun
Ekstensi ini berkomunikasi langsung dengan server Telegram menggunakan API Bot Telegram resmi dan terintegrasi secara lokal dengan Antigravity Language Server (LS) serta API Ekstensi VS Code. Ekstensi ini tidak menjalankan server HTTP/WebSocket lokal atau membuka port jaringan apa pun, menjaga keamanan lingkungan Anda. Tidak ada server pihak ketiga yang terlibat.
""",

    "README.ar.md": """# Antigravity With Telegram (VS Code Extension)

جسر بوت Telegram لـ Antigravity IDE. يتيح لك مراقبة جلسات Antigravity AI النشطة والتحكم فيها من هاتفك عبر Telegram.

## الميزات
- **المرآة المباشرة**: يتم توجيه ردود الذكاء الاصطناعي مباشرة إلى دردشة Telegram الخاصة بك.
- **التحكم عن بعد**: أرسل المطالبات، واعتمد الخطط، أو أوقف التوليد (`/stop`) مباشرة من Telegram.
- **المطالبات التفاعلية**: استقبل واستجب لحوارات IDE (مثل `ask_question` و `ask_permission` و `run_command`) باستخدام أزرار مدمجة.
- **تحميل الملفات**: أرسل الملفات أو الصور عبر Telegram لإدخالها في سياق دردشة IDE النشط.

## التثبيت
ابحث عن **Antigravity With Telegram** في سوق ملحقات Antigravity، أو قم بتثبيته مباشرة من Open VSX.

## المتطلبات الأساسية
- يجب أن يكون **Antigravity IDE** مثبتًا وقيد التشغيل.
- **رمز بوت Telegram**: أنشئ بوتًا باستخدام [@BotFather](https://t.me/BotFather) على Telegram وانسخ رمز API.

## الإعداد والتكوين
1. افتح الإعدادات في VS Code / Antigravity IDE (`Cmd+,` أو `Ctrl+,`).
2. ابحث عن `Antigravity With Telegram` وقم بتكوين الإعدادات:
   - `antigravityWithTelegram.autoStart` (اختياري): تشغيل بوت Telegram تلقائيًا عند فتح IDE.
   - `antigravityWithTelegram.telegramToken`: رمز API للبوت الخاص بك.
   - `antigravityWithTelegram.telegramChatId` (اختياري): معرف الدردشة المسموح له بالتفاعل مع البوت (احصل عليه باستخدام `@userinfobot` أو ما يماثله).
   - `antigravityWithTelegram.telegramAllowedUsername` (اختياري): اسم مستخدم Telegram (بدون `@`) المسموح له بالتفاعل.
3. قم بتشغيل الأمر `Antigravity With Telegram: Start Telegram Bot` من لوحة الأوامر (`F1` أو `Cmd+Shift+P`).

## الأوامر
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (لاختبار الجسر)

## أمان الحساب
يتصل هذا الملحق مباشرة بخوادم Telegram باستخدام API الرسمي لبوت Telegram ويتكامل محليًا مع خادم لغة Antigravity (LS) وواجهات برمجة تطبيقات ملحقات VS Code. ولا يقوم بتشغيل أي خادم HTTP/WebSocket محلي أو فتح أي منافذ شبكة، مما يحافظ على أمان بيئتك. لا توجد خوادم خارجية متداخلة.
"""
}

# Update README files
for name, content in readmes.items():
    file_path = os.path.join("..", name)
    
    # Append support section
    if name == "README.vi.md":
        support_sec = """
### ☕ Hỗ trợ dự án
Nếu bạn thấy tiện ích này hữu ích, hãy ủng hộ tác giả một ly cà phê:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)
"""
    else:
        support_sec = """
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)
"""
    
    full_content = content.strip() + "\n" + support_sec.strip() + "\n"
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(full_content)
    print(f"Updated: {name}")

# Update CONTRIBUTING.md
contrib_path = os.path.join("..", "CONTRIBUTING.md")
if os.path.exists(contrib_path):
    with open(contrib_path, "r", encoding="utf-8") as f:
        contrib_content = f.read()
    contrib_content = contrib_content.replace("Antigravity Link", "Antigravity With Telegram")
    with open(contrib_path, "w", encoding="utf-8") as f:
        f.write(contrib_content)
    print("Updated: CONTRIBUTING.md")

# Update CHANGELOG.md
changelog_path = os.path.join("..", "CHANGELOG.md")
if os.path.exists(changelog_path):
    with open(changelog_path, "r", encoding="utf-8") as f:
        changelog_content = f.read()
    changelog_content = changelog_content.replace("Antigravity Link", "Antigravity With Telegram")
    with open(changelog_path, "w", encoding="utf-8") as f:
        f.write(changelog_content)
    print("Updated: CHANGELOG.md")

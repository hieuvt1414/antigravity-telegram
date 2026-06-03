# Antigravity With Telegram (VS Code 확장 기능)

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
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

# Antigravity With Telegram (VS Code 확장 기능) 🚀

Telegram을 통해 모바일 기기에서 활성화된 Antigravity AI 코딩 어시스턴트를 직접 제어, 모니터링 및 상호 작용할 수 있습니다.

---

## 😟 문제점: 24시간 내내 컴퓨터 앞에만 앉아 계신가요?
개발자로서 대규모 리팩토링 대기, 자동 테스트 실행, 프로젝트 빌드 감사 또는 코드베이스 생성 등 장시간 실행되는 작업을 실행하는 경우가 많습니다. 명령을 승인하거나 질문에 답하거나 상태를 확인하기 위해 책상 앞에 묶여 있어야 하는 것은 실망스럽고 자유를 제한합니다.

## 😎 해결책: 이동 중에도 원격 AI 제어!
**Antigravity With Telegram**을 사용하면 작업 공간에서 멀어질 수 있습니다. AI가 입력을 필요로 할 때 즉시 알림을 받고 휴대전화에서 직접 개발 작업 공간과 상호 작용할 수 있습니다.

- **작업 승인/거부**: `ask_permission`, `ask_question` 또는 `run_command`에 대한 즉각적인 요청을 받고 간편한 인라인 버튼으로 답변할 수 있습니다.
- **실시간 모니터링**: 컴파일, 린트 및 테스트 출력이 채팅으로 실시간 전송되는 것을 확인하세요.
- **원격 작업**: Telegram에서 질문을 하거나 특정 작업(체크아웃, git diff 또는 테스트 실행 등)을 실행하고 코드 생성을 중지(`/stop`)할 수 있습니다.

---

## 📸 데모 및 스크린샷

See how easy it is to manage your IDE from Telegram:

| 1. 대화형 프롬프트 | 2. 원격 구문 감사 | 3. 브랜치 및 태그 체크아웃 |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. 작업 공간 및 파일 | 5. 커밋 기록 및 상태 |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ 프로젝트 후원하기
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

# Antigravity With Telegram (Расширение VS Code) 🚀

Управляйте, контролируйте и взаимодействуйте с вашим активным ИИ-ассистентом программирования Antigravity непосредственно с мобильного устройства через Telegram.

---

## 😟 Проблема: Привязаны к компьютеру 24/7?
Как разработчик, вы часто запускаете длительные задачи: ожидания крупного рефакторинга, выполнения автоматических тестов, аудита сборки проекта или генерации кодовой базы. Необходимость быть привязанным к рабочему столу только для того, чтобы одобрять команды, отвечать на вопросы или проверять статус, раздражает и ограничивает вашу свободу.

## 😎 Решение: Удаленное управление ИИ на ходу!
С **Antigravity With Telegram** вы можете отойти от рабочего места. Получайте мгновенные уведомления, когда ИИ требуется ваш ввод, и взаимодействуйте с рабочим пространством разработки прямо со своего телефона.

- **Одобрение/отклонение действий**: получайте мгновенные запросы для `ask_permission`, `ask_question` или `run_command` и отвечайте простыми встроенными кнопками.
- **Мониторинг в реальном времени**: наблюдайте за результатами компиляции, линтинга и тестирования в реальном времени в вашем чате.
- **Удаленные операции**: задавайте вопросы, запускайте действия (такие как checkout, git diff или выполнение тестов) или останавливайте генерацию (`/stop`) прямо из Telegram.

---

## 📸 Демо и скриншоты

See how easy it is to manage your IDE from Telegram:

| 1. Интерактивные запросы | 2. Удаленный аудит синтаксиса | 3. Переключение веток и тегов |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Рабочая область и файлы | 5. История коммитов и статус |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ Поддержать проект
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

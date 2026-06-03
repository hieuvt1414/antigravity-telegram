# Antigravity With Telegram (Расширение VS Code)

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
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

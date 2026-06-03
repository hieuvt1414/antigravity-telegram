# Antigravity With Telegram (Rozszerzenie VS Code)

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
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

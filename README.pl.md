# Antigravity With Telegram (Rozszerzenie VS Code) 🚀

Kontroluj, monitoruj i wchodź w interakcję ze swoim aktywnym asystentem kodowania AI Antigravity bezpośrednio z urządzenia mobilnego za pośrednictwem Telegrama.

---

## 😟 Problem: Uwięziony przy komputerze 24/7?
Jako programista uruchamiasz długotrwałe zadania: oczekiwanie na duże refaktoryzacje, uruchamianie testów automatycznych, audytowanie kompilacji projektów lub generowanie baz kodu. Konieczność siedzenia przy biurku tylko po to, by zatwierdzać polecenia, odpowiadać na pytania czy sprawdzać status, jest frustrująca i ogranicza Twoją wolność.

## 😎 Rozwiązanie: Zdalna kontrola AI w podróży!
Dzięki **Antigravity With Telegram** możesz odejść od swojego miejsca pracy. Otrzymuj natychmiastowe powiadomienia, gdy AI potrzebuje Twoich danych, i wchodź w interakcję ze swoim środowiskiem programistycznym bezpośrednio z telefonu.

- **Zatwierdzanie/odrzucanie akcji**: Otrzymuj natychmiastowe monity o `ask_permission`, `ask_question` lub `run_command` i odpowiadaj za pomocą prostych przycisków wbudowanych.
- **Monitorowanie w czasie rzeczywistym**: Obserwuj wyniki kompilacji, lintingu i testów na żywo na swoim czacie.
- **Operacje zdalne**: Zadawaj pytania, wyzwalaj akcje (takie jak checkout, git diff lub uruchomienie testu) lub zatrzymaj generowanie kodu (`/stop`) bezpośrednio z Telegrama.

---

## 📸 Demo i zrzuty ekranu

See how easy it is to manage your IDE from Telegram:

| 1. Interaktywne monity | 2. Zdalny audyt składni | 3. Checkout gałęzi i tagów |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Obszar roboczy i pliki | 5. Historia commitów i status |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ Wesprzyj ten projekt
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

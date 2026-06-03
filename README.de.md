# Antigravity With Telegram (VS Code Erweiterung)

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
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

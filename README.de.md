# Antigravity With Telegram (VS Code Erweiterung) 🚀

Steuern, überwachen und interagieren Sie mit Ihrem aktiven Antigravity KI-Codierungsassistenten direkt von Ihrem Mobilgerät über Telegram.

---

## 😟 Das Problem: Rund um die Uhr an den Computer gefesselt?
Als Entwickler führen Sie langwierige Aufgaben aus: Warten auf große Refactorings, Ausführen automatisierter Tests, Überprüfen von Projektbuilds oder Generieren von Codebasen. Am Schreibtisch gefesselt zu sein, nur um Befehle zu genehmigen, Fragen zu beantworten oder den Status zu überprüfen, ist frustrierend und schränkt Ihre Freiheit ein.

## 😎 Die Lösung: Mobile KI-Fernsteuerung für unterwegs!
Mit **Antigravity With Telegram** können Sie sich von Ihrem Arbeitsplatz entfernen. Lassen Sie sich sofort benachrichtigen, wenn die KI Ihre Eingabe benötigt, und interagieren Sie direkt von Ihrem Telefon aus mit Ihrer Entwicklungsumgebung.

- **Aktionen genehmigen/ablehnen**: Erhalten Sie sofortige Eingabeaufforderungen für `ask_permission`, `ask_question` oder `run_command` und antworten Sie mit einfachen Inline-Schaltflächen.
- **Echtzeit-Überwachung**: Verfolgen Sie Compiler-, Linting- und Testergebnisse live in Ihrem Chat.
- **Remote-Operationen**: Stellen Sie Fragen, lösen Sie Aktionen aus (wie Checkout, Git Diff oder Testausführung) oder stoppen Sie die Generierung (`/stop`) über Telegram.

---

## 📸 Demo & Screenshots

See how easy it is to manage your IDE from Telegram:

| 1. Interaktive Prompts | 2. Remote-Syntax-Prüfung | 3. Branch- und Tag-Checkout |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Arbeitsbereich & Dateien | 5. Commit-Historie & Status |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ Unterstütze dieses Projekt
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

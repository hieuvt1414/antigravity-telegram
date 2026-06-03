# Antigravity With Telegram (Estensione VS Code)

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
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

# Antigravity With Telegram (Estensione VS Code) 🚀

Controlla, monitora e interagisci con il tuo assistente alla codifica IA Antigravity attivo direttamente dal tuo dispositivo mobile tramite Telegram.

---

## 😟 Il problema: Bloccato al computer 24 ore su 24, 7 giorni su 7?
Come sviluppatore, esegui attività a lungo termine: attendere refactoring di grandi dimensioni, eseguire test automatizzati, controllare build di progetti o generare codebase. Dover rimanere incollati alla scrivania solo per approvare comandi, rispondere a domande o verificare lo stato è frustrante e limita la tua libertà.

## 😎 La soluzione: Controllo IA remoto in movimento!
Con **Antigravity With Telegram**, puoi allontanarti dalla tua area di lavoro. Ricevi notifiche istantanee quando l'IA richiede il tuo input e interagisci con il tuo ambiente di sviluppo direttamente dal tuo telefono.

- **Approva/Rifiuta azioni**: ricevi prompt immediati per `ask_permission`, `ask_question` o `run_command` e rispondi con semplici pulsanti inline.
- **Monitoraggio in tempo reale**: visualizza l'output di compilazione, linting e test in tempo reale nella tua chat.
- **Operazioni remote**: fai domande, avvia azioni (come checkout, git diff o esecuzione di test) o interrompi la generazione (`/stop`) da Telegram.

---

## 📸 Demo e screenshot

See how easy it is to manage your IDE from Telegram:

| 1. Prompt interattivi | 2. Verifica sintassi remota | 3. Checkout branch e tag |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Area di lavoro e file | 5. Cronologia commit e stato |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ Supporta questo progetto
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

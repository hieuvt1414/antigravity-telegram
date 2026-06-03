# Antigravity With Telegram (Extension VS Code) 🚀

Contrôlez, surveillez et interagissez avec votre assistant de codage IA Antigravity actif directement depuis votre appareil mobile via Telegram.

---

## 😟 Le problème : Coincé devant votre ordinateur 24h/24 et 7j/7 ?
En tant que développeur, vous exécutez des tâches de longue durée : attendre des refactorisations importantes, exécuter des tests automatisés, auditer des builds de projet ou générer des bases de code. Devoir rester collé à votre bureau simplement pour approuver des commandes, répondre à des questions ou vérifier l'état est frustrant et limite votre liberté.

## 😎 La solution : Le contrôle de l'IA à distance en déplacement !
Avec **Antigravity With Telegram**, vous pouvez vous éloigner de votre espace de travail. Soyez notifié instantanément lorsque l'IA a besoin de votre saisie, et interagissez avec votre espace de travail de développement directement depuis votre téléphone.

- **Approuver/Rejeter les actions** : obtenez des invites instantanées pour `ask_permission`, `ask_question` ou `run_command` et répondez avec de simples boutons intégrés.
- **Suivi en temps réel** : observez les sorties de compilation, de peluchage (linting) et de test en direct dans votre chat.
- **Opérations à distance** : posez des questions, déclenchez des actions (comme checkout, git diff ou l'exécution de tests) ou arrêtez la génération (`/stop`) depuis Telegram.

---

## 📸 Démo & captures d'écran

See how easy it is to manage your IDE from Telegram:

| 1. Invites interactives | 2. Audit de syntaxe à distance | 3. Checkout de branches et tags |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Espace de travail & fichiers | 5. Historique des commits & statut |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

## Fonctionnalités
- **Miroir en direct**: Les réponses de l'IA sont transférées directement vers votre discussion Telegram.
- **Contrôle à distance**: Envoyez des invites, approuvez des plans ou arrêtez la génération (`/stop`) directement depuis Telegram.
- **Invites interactives**: Recevez et répondez aux fenêtres de dialogue de l'IDE (comme `ask_question`, `ask_permission`, `run_command`) à l'aide de boutons intégrés.
- **Envoi de fichiers**: Envoyez des fichiers ou des photos via Telegram pour les injecter dans le contexte de discussion de l'IDE actif.

## Installation
Recherchez **Antigravity With Telegram** dans le Marketplace d'extensions Antigravity, ou installez-le directement depuis Open VSX.

## Prérequis
- **Antigravity IDE** doit être installé et en cours d'exécution.
- **Un jeton de bot Telegram**: Créez un bot à l'aide de [@BotFather](https://t.me/BotFather) sur Telegram et copiez le jeton API.

## Configuration
1. Ouvrez les paramètres dans VS Code / Antigravity IDE (`Cmd+,` ou `Ctrl+,`).
2. Recherchez `Antigravity With Telegram` et configurez les paramètres :
   - `antigravityWithTelegram.autoStart` (Optionnel) : Lance automatiquement le bot Telegram à l'ouverture de l'IDE.
   - `antigravityWithTelegram.telegramToken` : Votre jeton API de bot.
   - `antigravityWithTelegram.telegramChatId` (Optionnel) : L'ID de discussion autorisé à interagir avec le bot (à récupérer via `@userinfobot` ou similaire).
   - `antigravityWithTelegram.telegramAllowedUsername` (Optionnel) : Le nom d'utilisateur Telegram (sans `@`) autorisé à interagir.
3. Exécutez la commande `Antigravity With Telegram: Start Telegram Bot` depuis la palette de commandes (`F1` ou `Cmd+Shift+P`).

## Commandes
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (pour les tests)

## Sécurité du compte
Cette extension communique directement avec les serveurs de Telegram à l'aide de l'API officielle des bots Telegram et s'intègre localement à votre serveur de langage Antigravity (LS) et aux API d'extension de VS Code. Elle n'exécute aucun serveur HTTP/WebSocket local et n'ouvre aucun port réseau, garantissant ainsi la sécurité de votre environnement. Aucun serveur tiers n'est impliqué.

---

## ☕ Soutenir ce projet
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

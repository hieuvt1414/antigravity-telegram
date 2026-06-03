# Antigravity With Telegram (Extension VS Code)

Pont de bot Telegram pour Antigravity IDE. Il vous permet de surveiller et de contrôler vos sessions d'IA Antigravity actives depuis votre téléphone via Telegram.

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
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

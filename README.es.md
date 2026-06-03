# Antigravity With Telegram (Extensión de VS Code)

Puente de bot de Telegram para Antigravity IDE. Le permite monitorear y controlar sus sesiones activas de IA de Antigravity desde su teléfono a través de Telegram.

## Características
- **Espejo en vivo**: Las respuestas de la IA se reenvían directamente a su chat de Telegram.
- **Control remoto**: Envíe instrucciones, apruebe planes o detenga la generación (`/stop`) directamente desde Telegram.
- **Mensajes interactivos**: Reciba y responda a los diálogos del IDE (como `ask_question`, `ask_permission`, `run_command`) mediante botones integrados.
- **Carga de archivos**: Envíe archivos o fotos a través de Telegram para inyectarlos en el contexto de chat activo del IDE.

## Instalación
Busque **Antigravity With Telegram** en el Marketplace de extensiones de Antigravity, o instálelo directamente desde Open VSX.

## Requisitos previos
- **Antigravity IDE** debe estar instalado y en ejecución.
- **Un token de bot de Telegram**: Cree un bot usando [@BotFather](https://t.me/BotFather) en Telegram y copie el token de la API.

## Configuración
1. Abra la configuración en VS Code / Antigravity IDE (`Cmd+,` o `Ctrl+,`).
2. Busque `Antigravity With Telegram` y configure las opciones:
   - `antigravityWithTelegram.autoStart` (Opcional): Inicia automáticamente el bot de Telegram al abrir el IDE.
   - `antigravityWithTelegram.telegramToken`: El token de la API de su bot.
   - `antigravityWithTelegram.telegramChatId` (Opcional): El ID de chat permitido para interactuar con el bot (consígalo usando `@userinfobot` o similar).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opcional): El nombre de usuario de Telegram (sin `@`) permitido para interactuar.
3. Ejecute el comando `Antigravity With Telegram: Start Telegram Bot` desde la paleta de comandos (`F1` o `Cmd+Shift+P`).

## Comandos
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (para pruebas)

## Seguridad de la cuenta
Esta extensión se comunica directamente con los servidores de Telegram utilizando la API oficial de bots de Telegram y se integra localmente con su servidor de lenguaje Antigravity (LS) y las API de extensión de VS Code. No ejecuta ningún servidor HTTP/WebSocket local ni abre ningún puerto de red, manteniendo su entorno seguro. No intervienen servidores de terceros.
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

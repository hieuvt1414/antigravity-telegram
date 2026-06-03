# Antigravity With Telegram (Extensión de VS Code) 🚀

Controle, supervise e interactúe con su asistente de codificación de IA Antigravity activo directamente desde su dispositivo móvil a través de Telegram.

---

## 😟 El problema: ¿Atado al ordenador las 24 horas, los 7 días de la semana?
Como desarrollador, ejecuta tareas de larga duración: esperar grandes refactorizaciones, ejecutar pruebas automatizadas, auditar compilaciones de proyectos o generar bases de código. Tener que estar pegado a su escritorio solo para aprobar comandos, responder preguntas o verificar el estado es frustrante y limita su libertad.

## 😎 La solución: ¡Control remoto de IA sobre la marcha!
Con **Antigravity With Telegram**, puede alejarse de su espacio de trabajo. Reciba notificaciones instantáneas cuando la IA necesite su intervención e interactúe con su espacio de trabajo de desarrollo directamente desde su teléfono.

- **Aprobar/rechazar acciones**: obtenga avisos instantáneos para `ask_permission`, `ask_question` o `run_command` y responda con sencillos botones en línea.
- **Monitoreo en tiempo real**: vea los resultados de compilación, análisis y pruebas en vivo en su chat.
- **Operaciones remotas**: haga preguntas, active acciones (como checkout, git diff o ejecución de pruebas) o detenga la generación (`/stop`) desde Telegram.

---

## 📸 Demostración y capturas de pantalla

See how easy it is to manage your IDE from Telegram:

| 1. Indicaciones interactivas | 2. Auditoría de sintaxis remota | 3. Checkout de ramas y etiquetas |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Espacio de trabajo y archivos | 5. Historial de confirmaciones y estado |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ Apoya este proyecto
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

# Antigravity With Telegram (Extensão do VS Code)

Ponte de bot do Telegram para o Antigravity IDE. Permite que você monitore e controle suas sessões ativas de IA do Antigravity a partir do seu telefone via Telegram.

## Recursos
- **Espelhamento ao vivo**: As respostas da IA são encaminhadas diretamente para o seu chat do Telegram.
- **Controle remoto**: Envie prompts, aprove planos ou pare a geração (`/stop`) diretamente do Telegram.
- **Prompts interativos**: Receba e responda aos diálogos do IDE (como `ask_question`, `ask_permission`, `run_command`) usando botões embutidos.
- **Upload de arquivos**: Envie arquivos ou fotos via Telegram para inseri-los no contexto do chat ativo do IDE.

## Instalação
Procure por **Antigravity With Telegram** no Marketplace de Extensões do Antigravity ou instale diretamente do Open VSX.

## Pré-requisitos
- O **Antigravity IDE** deve estar instalado e em execução.
- **Um token de bot do Telegram**: Crie um bot usando o [@BotFather](https://t.me/BotFather) no Telegram e copie o token da API.

## Configuração
1. Abra as configurações no VS Code / Antigravity IDE (`Cmd+,` ou `Ctrl+,`).
2. Procure por `Antigravity With Telegram` e defina as configurações:
   - `antigravityWithTelegram.autoStart` (Opcional): Inicia o bot do Telegram automaticamente quando o IDE é aberto.
   - `antigravityWithTelegram.telegramToken`: O token da API do seu bot.
   - `antigravityWithTelegram.telegramChatId` (Opcional): O ID do chat com permissão para interagir com o bot (obtenha usando o `@userinfobot` ou similar).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opcional): O nome de usuário do Telegram (sem `@`) com permissão para interagir.
3. Execute o comando `Antigravity With Telegram: Start Telegram Bot` a partir da paleta de comandos (`F1` ou `Cmd+Shift+P`).

## Comandos
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (para testes)

## Segurança da conta
Esta extensão se comunica diretamente com os servidores do Telegram usando a API oficial de bots do Telegram e se integra localmente com o seu Antigravity Language Server (LS) e as APIs de extensão do VS Code. Ela não executa nenhum servidor HTTP/WebSocket local nem abre portas de rede, mantendo seu ambiente seguro. Nenhum servidor de terceiros está envolvido.
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

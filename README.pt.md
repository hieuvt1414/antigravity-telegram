# Antigravity With Telegram (Extensão do VS Code) 🚀

Controle, monitore e interaja com o seu assistente de codificação de IA Antigravity ativo diretamente do seu dispositivo móvel via Telegram.

---

## 😟 O problema: Preso ao computador 24/7?
Como desenvolvedor, você executa tarefas de longa duração: aguardar grandes refactorações, executar testes automatizados, auditar compilações de projetos ou gerar bases de código. Ter que ficar preso à sua mesa apenas para aprovar comandos, responder a perguntas ou verificar o status é frustrante e limita sua liberdade.

## 😎 A solução: Controle remoto de IA em qualquer lugar!
Com o **Antigravity With Telegram**, você pode se afastar do seu espaço de trabalho. Seja notificado instantaneamente quando a IA precisar de sua entrada e interaja com seu espaço de trabalho de desenvolvimento diretamente de seu telefone.

- **Aprovar/Rejeitar Ações**: Obtenha solicitações instantâneas para `ask_permission`, `ask_question` ou `run_command` e responda com botões inline simples.
- **Monitoramento em tempo real**: Assista às saídas de compilação, linting e testes transmitidas ao vivo para o seu chat.
- **Operações Remotas**: Faça perguntas, acione ações (como checkout, git diff ou execução de teste) ou pare a geração (`/stop`) a partir do Telegram.

---

## 📸 Demonstração e capturas de tela

See how easy it is to manage your IDE from Telegram:

| 1. Prompts Interativos | 2. Auditoria de Sintaxe Remota | 3. Checkout de Branch e Tag |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Espaço de Trabalho e Arquivos | 5. Histórico de Commits e Status |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ Apoie este projeto
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

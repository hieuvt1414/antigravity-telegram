# Antigravity With Telegram (VS Code Eklentisi)

Antigravity IDE için Telegram bot köprüsü. Aktif Antigravity yapay zeka oturumlarınızı Telegram üzerinden telefonunuzdan izlemenizi ve kontrol etmenizi sağlar.

## Özellikler
- **Canlı Yansıtma**: Yapay zeka yanıtları doğrudan Telegram sohbetinize iletilir.
- **Uzaktan Kontrol**: Doğrudan Telegram'dan komutlar gönderin, planları onaylayın veya üretimi durdurun (`/stop`).
- **Etkileşimli İstemler**: Satır içi düğmeleri kullanarak IDE iletişim kutularını (`ask_question`, `ask_permission`, `run_command` gibi) alın ve yanıtlayın.
- **Dosya Yükleme**: Etkin IDE sohbet bağlamına eklemek için Telegram üzerinden dosya veya fotoğraf gönderin.

## Kurulum
Antigravity Eklenti Mağazası'nda **Antigravity With Telegram**'ı aratın veya doğrudan Open VSX üzerinden yükleyin.

## Gereksinimler
- **Antigravity IDE** kurulu ve çalışır durumda olmalıdır.
- **Telegram Bot Belirteci**: Telegram'da [@BotFather](https://t.me/BotFather) kullanarak bir bot oluşturun ve API belirtecini kopyalayın.

## Kurulum ve Yapılandırma
1. VS Code / Antigravity IDE'de ayarları açın (`Cmd+,` veya `Ctrl+,`).
2. `Antigravity With Telegram` araması yapın ve ayarları yapılandırın:
   - `antigravityWithTelegram.autoStart` (İsteğe bağlı): IDE açıldığında Telegram botunu otomatik olarak başlatır.
   - `antigravityWithTelegram.telegramToken`: Bot API Belirteciniz.
   - `antigravityWithTelegram.telegramChatId` (İsteğe bağlı): Botla etkileşime girmesine izin verilen Sohbet Kimliği (`@userinfobot` veya benzeri kullanılarak alınabilir).
   - `antigravityWithTelegram.telegramAllowedUsername` (İsteğe bağlı): Etkileşime girmesine izin verilen Telegram kullanıcı adı (`@` işareti olmadan).
3. Komut Paletinden (`F1` veya `Cmd+Shift+P`) `Antigravity With Telegram: Start Telegram Bot` komutunu çalıştırın.

## Komutlar
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (test için)

## Hesap Güvenliği
Bu eklenti, resmi Telegram Bot API'sini kullanarak doğrudan Telegram sunucularıyla iletişim kurar ve yerel Antigravity Dil Sunucunuz (LS) ile VS Code Eklenti API'leriyle entegre olur. Yerel bir HTTP/WebSocket sunucusu çalıştırmaz veya herhangi bir ağ bağlantı noktası açmaz, böylece ortamınızı güvenli tutar. Üçüncü taraf sunucular dahil edilmez.
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

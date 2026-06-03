# Antigravity With Telegram (Ekstensi VS Code)

Jembatan bot Telegram untuk Antigravity IDE. Ini memungkinkan Anda memantau dan mengontrol sesi AI Antigravity yang aktif dari ponsel Anda via Telegram.

## Fitur
- **Pencerminan Langsung**: Tanggapan AI diteruskan langsung ke obrolan Telegram Anda.
- **Kontrol Jarak Jauh**: Kirim petunjuk, setujui rencana, atau hentikan pembuatan (`/stop`) langsung dari Telegram.
- **Perintah Interaktif**: Terima dan tanggapi dialog IDE (seperti `ask_question`, `ask_permission`, `run_command`) menggunakan tombol inline.
- **Unggah File**: Kirim file atau foto via Telegram untuk dimasukkan ke dalam konteks obrolan IDE yang aktif.

## Instalasi
Cari **Antigravity With Telegram** di Marketplace Ekstensi Antigravity, atau instal langsung dari Open VSX.

## Prasyarat
- **Antigravity IDE** harus terinstal dan berjalan.
- **Token Bot Telegram**: Buat bot menggunakan [@BotFather](https://t.me/BotFather) di Telegram dan salin token API.

## Pengaturan & Konfigurasi
1. Buka pengaturan di VS Code / Antigravity IDE (`Cmd+,` atau `Ctrl+,`).
2. Cari `Antigravity With Telegram` dan konfigurasikan pengaturan:
   - `antigravityWithTelegram.autoStart` (Opsional): Mulai bot Telegram secara otomatis saat IDE dibuka.
   - `antigravityWithTelegram.telegramToken`: Token API Bot Anda.
   - `antigravityWithTelegram.telegramChatId` (Opsional): ID Obrolan yang diizinkan untuk berinteraksi dengan bot (dapatkan menggunakan `@userinfobot` atau sejenisnya).
   - `antigravityWithTelegram.telegramAllowedUsername` (Opsional): Nama pengguna Telegram (tanpa `@`) yang diizinkan untuk berinteraksi.
3. Jalankan perintah `Antigravity With Telegram: Start Telegram Bot` dari Command Palette (`F1` atau `Cmd+Shift+P`).

## Perintah
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (untuk pengujian)

## Keamanan Akun
Ekstensi ini berkomunikasi langsung dengan server Telegram menggunakan API Bot Telegram resmi dan terintegrasi secara lokal dengan Antigravity Language Server (LS) serta API Ekstensi VS Code. Ekstensi ini tidak menjalankan server HTTP/WebSocket lokal atau membuka port jaringan apa pun, menjaga keamanan lingkungan Anda. Tidak ada server pihak ketiga yang terlibat.
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

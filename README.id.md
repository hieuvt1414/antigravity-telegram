# Antigravity With Telegram (Ekstensi VS Code) 🚀

Kontrol, pantau, dan berinteraksi dengan asisten pengkodean AI Antigravity aktif Anda langsung dari perangkat seluler Anda melalui Telegram.

---

## 😟 Masalah: Terjebak di depan komputer 24/7?
Sebagai pengembang, Anda menjalankan tugas berdurasi panjang: menunggu pemfaktoran ulang besar, menjalankan pengujian otomatis, mengaudit build proyek, atau menghasilkan basis kode. Harus tetap terpaku pada meja Anda hanya untuk menyetujui perintah, menjawab pertanyaan, atau memeriksa status sangatlah membosankan dan membatasi kebebasan Anda.

## 😎 Solusi: Kontrol AI Jarak Jauh Kapan Saja, Di Mana Saja!
Dengan **Antigravity With Telegram**, Anda dapat melangkah pergi dari ruang kerja Anda. Dapatkan pemberitahuan instan saat AI membutuhkan masukan Anda, dan berinteraksi dengan ruang kerja pengembangan langsung dari ponsel Anda.

- **Setujui/Tolak Tindakan**: Dapatkan perintah instan untuk `ask_permission`, `ask_question`, atau `run_command` dan jawab dengan tombol inline yang mudah.
- **Pemantauan Real-Time**: Lihat hasil kompilasi, linting, dan pengujian secara langsung di obrolan Anda.
- **Operasi Jarak Jauh**: Ajukan pertanyaan, picu tindakan (seperti checkout, git diff, atau eksekusi pengujian), atau hentikan pembuatan (`/stop`) dari Telegram.

---

## 📸 Demo & Tangkapan Layar

See how easy it is to manage your IDE from Telegram:

| 1. Perintah Interaktif | 2. Audit Sintaks Jarak Jauh | 3. Checkout Branch & Tag |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Workspace & File | 5. Riwayat Commit & Status |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ Dukung Proyek Ini
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

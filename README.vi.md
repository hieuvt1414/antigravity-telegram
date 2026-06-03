# Antigravity With Telegram (VS Code Extension) 🚀

Cầu nối Bot Telegram cho Antigravity IDE. Tiện ích này giúp bạn giám sát và điều khiển các phiên làm việc của Antigravity AI ngay trên điện thoại thông qua Telegram.

---

## 😟 Vấn đề của bạn: Phải ngồi máy tính 24/7?
Là một lập trình viên, bạn thường chạy các tác vụ tốn nhiều thời gian: chờ đợi tái cấu trúc mã nguồn lớn, chạy kiểm thử tự động, audit dự án hoặc build hệ thống. Việc luôn phải túc trực trước màn hình máy tính chỉ để duyệt lệnh, trả lời câu hỏi của AI hoặc kiểm tra trạng thái rất mệt mỏi và làm giảm sự tự do của bạn.

## 😎 Giải pháp: Điều khiển AI từ xa mọi lúc mọi nơi!
Với **Antigravity With Telegram**, bạn có thể rời bàn làm việc một cách tự tin. Nhận thông báo ngay lập tức khi AI cần bạn tương tác và phản hồi trực tiếp từ điện thoại.

- **Duyệt/Từ chối hành động**: Nhận thông báo nhanh cho `ask_permission`, `ask_question` hoặc `run_command` và trả lời qua các nút bấm tương tác (inline buttons).
- **Giám sát thời gian thực**: Xem trực tiếp các thông tin biên dịch, linting, kiểm thử được gửi về chat.
- **Điều khiển từ xa**: Gửi prompt yêu cầu mới, thực hiện các thao tác (như checkout, xem git diff, chạy test) hoặc dừng sinh code (`/stop`) trực tiếp từ Telegram.

---

## 📸 Hình ảnh Minh họa & Demo

Quản lý IDE của bạn qua Telegram cực kỳ tiện lợi:

| 1. Hộp thoại Tương tác | 2. Audit Cú pháp Từ xa | 3. Checkout Nhánh & Tag |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. Xem Workspace & File đang mở | 5. Xem Lịch sử Commit & Trạng thái |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

## ✨ Tính năng nổi bật
- **Gương trực tiếp (Mirroring)**: Nhận phản hồi từ AI ngay trên tin nhắn Telegram theo thời gian thực.
- **Điều khiển từ xa**: Gửi prompt, duyệt kế hoạch (approve plan) hoặc dừng sinh code (`/stop`) từ Telegram.
- **Hộp thoại tương tác**: Nhận và trả lời các yêu cầu xác nhận từ IDE (như `ask_question`, `ask_permission`, `run_command`) bằng các nút bấm inline.
- **Gửi file/hình ảnh**: Gửi tài liệu hoặc ảnh trực tiếp qua Telegram để tự động đính kèm vào ngữ cảnh chat trong IDE.

## 🛠️ Cài đặt
Tìm kiếm **Antigravity With Telegram** trên Chợ Tiện ích mở rộng của Antigravity hoặc tải trực tiếp từ Open VSX.

## 📋 Yêu cầu chuẩn bị
- **Antigravity IDE** đang chạy.
- **Telegram Bot Token**: Tạo một bot thông qua [@BotFather](https://t.me/BotFather) trên Telegram và lấy mã API token.

## ⚙️ Thiết lập & Cấu hình
1. Mở Cài đặt trong VS Code / Antigravity IDE (`Cmd+,` hoặc `Ctrl+,`).
2. Tìm kiếm `Antigravity With Telegram` và cấu hình các thông số:
   - `antigravityWithTelegram.autoStart` (Tùy chọn): Tự động bật Telegram Bot khi mở IDE.
   - `antigravityWithTelegram.telegramToken`: Mã API Token của Bot.
   - `antigravityWithTelegram.telegramChatId` (Tùy chọn): Chat ID được phép tương tác (sử dụng `@userinfobot` để lấy ID của bạn).
   - `antigravityWithTelegram.telegramAllowedUsername` (Tùy chọn): Tên người dùng Telegram (không có chữ `@`) được phép tương tác.
3. Chạy lệnh `Antigravity With Telegram: Start Telegram Bot` từ Command Palette (`F1` hoặc `Cmd+Shift+P`).

## 💻 Các Lệnh Hỗ Trợ
- `Antigravity With Telegram: Start Telegram Bot` — Khởi động Bot.
- `Antigravity With Telegram: Stop Telegram Bot` — Dừng Bot.
- `Antigravity With Telegram: Send Mock Question to Telegram` — Gửi câu hỏi thử nghiệm để test tính năng tương tác.

## 🔒 An toàn tài khoản
Tiện ích này giao tiếp trực tiếp với máy chủ Telegram qua API chính thức của Telegram Bot và tích hợp cục bộ với Antigravity Language Server (LS) cùng VS Code Extension API. Tiện ích hoàn toàn không chạy bất kỳ máy chủ HTTP/WebSocket nào hay mở cổng mạng cục bộ, giữ an toàn tối đa cho môi trường làm việc của bạn. Không sử dụng máy chủ trung gian của bên thứ ba.

---

## ☕ Hỗ trợ dự án
Nếu bạn thấy tiện ích này hữu ích, hãy ủng hộ tác giả một ly cà phê để tiếp tục duy trì và phát triển:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

# Antigravity With Telegram (VS Code Extension)

جسر بوت Telegram لـ Antigravity IDE. يتيح لك مراقبة جلسات Antigravity AI النشطة والتحكم فيها من هاتفك عبر Telegram.

## الميزات
- **المرآة المباشرة**: يتم توجيه ردود الذكاء الاصطناعي مباشرة إلى دردشة Telegram الخاصة بك.
- **التحكم عن بعد**: أرسل المطالبات، واعتمد الخطط، أو أوقف التوليد (`/stop`) مباشرة من Telegram.
- **المطالبات التفاعلية**: استقبل واستجب لحوارات IDE (مثل `ask_question` و `ask_permission` و `run_command`) باستخدام أزرار مدمجة.
- **تحميل الملفات**: أرسل الملفات أو الصور عبر Telegram لإدخالها في سياق دردشة IDE النشط.

## التثبيت
ابحث عن **Antigravity With Telegram** في سوق ملحقات Antigravity، أو قم بتثبيته مباشرة من Open VSX.

## المتطلبات الأساسية
- يجب أن يكون **Antigravity IDE** مثبتًا وقيد التشغيل.
- **رمز بوت Telegram**: أنشئ بوتًا باستخدام [@BotFather](https://t.me/BotFather) على Telegram وانسخ رمز API.

## الإعداد والتكوين
1. افتح الإعدادات في VS Code / Antigravity IDE (`Cmd+,` أو `Ctrl+,`).
2. ابحث عن `Antigravity With Telegram` وقم بتكوين الإعدادات:
   - `antigravityWithTelegram.autoStart` (اختياري): تشغيل بوت Telegram تلقائيًا عند فتح IDE.
   - `antigravityWithTelegram.telegramToken`: رمز API للبوت الخاص بك.
   - `antigravityWithTelegram.telegramChatId` (اختياري): معرف الدردشة المسموح له بالتفاعل مع البوت (احصل عليه باستخدام `@userinfobot` أو ما يماثله).
   - `antigravityWithTelegram.telegramAllowedUsername` (اختياري): اسم مستخدم Telegram (بدون `@`) المسموح له بالتفاعل.
3. قم بتشغيل الأمر `Antigravity With Telegram: Start Telegram Bot` من لوحة الأوامر (`F1` أو `Cmd+Shift+P`).

## الأوامر
- `Antigravity With Telegram: Start Telegram Bot`
- `Antigravity With Telegram: Stop Telegram Bot`
- `Antigravity With Telegram: Send Mock Question to Telegram` (لاختبار الجسر)

## أمان الحساب
يتصل هذا الملحق مباشرة بخوادم Telegram باستخدام API الرسمي لبوت Telegram ويتكامل محليًا مع خادم لغة Antigravity (LS) وواجهات برمجة تطبيقات ملحقات VS Code. ولا يقوم بتشغيل أي خادم HTTP/WebSocket محلي أو فتح أي منافذ شبكة، مما يحافظ على أمان بيئتك. لا توجد خوادم خارجية متداخلة.
### ☕ Support this Project
If you find this extension helpful, consider buying me a coffee:

[![Donate](https://img.shields.io/badge/Donate-1%24-blue.svg)](https://paypal.me/hieuvu1414/1)

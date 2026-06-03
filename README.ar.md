# Antigravity With Telegram (VS Code Extension) 🚀

التحكم في مساعد برمجة الذkاء الاصطناعي النشط Antigravity ومراقبته والتفاعل معه مباشرة من جهازك المحمول عبر Telegram.

---

## 😟 المشكلة: هل أنت مجبر على البقاء أمام الكمبيوتر طوال الوقت؟
كمطور، تقوم بتشغيل مهام طويلة الأمد: انتظار عمليات إعادة هيكلة الأكواد الكبيرة، أو تشغيل الاختبارات الآلية، أو تدقيق بناء المشروع، أو إنشاء الأكواد البرمجية. الاضطرار إلى البقاء ملتصقًا بمكتبك لمجرد الموافقة على الأوامر، أو الإجابة على الأسئلة، أو التحقق من الحالة أمر محبط ويحد من حريتك.

## 😎 الحل: التحكم بالذكاء الاصطناعي عن بعد أثناء التنقل!
مع **Antigravity With Telegram**، يمكنك الابتعاد عن مكان عملك. احصل على إشعارات فورية عندما يحتاج الذكاء الاصطناعي إلى مدخلاتك، وتفاعل مع مساحة عمل التطوير الخاصة بك مباشرة من هاتفك.

- **الموافقة على الإجراءات أو رفضها**: احصل على مطالبات فورية لـ `ask_permission` أو `ask_question` أو `run_command` وأجب بأزرار مضمنة بسيطة.
- **المراقبة في الوقت الفعلي**: شاهد مخرجات التجميع والتنقيح والاختبار تتدفق مباشرة إلى الدردشة الخاصة بك.
- **العمليات عن بعد**: اطرح الأسئلة، أو قم بتشغيل الإجراءات (مثل checkout أو git diff أو تشغيل الاختبار)، أو أوقف الإنشاء (`/stop`) من Telegram.

---

## 📸 العرض التوضيحي ولقطات الشاشة

See how easy it is to manage your IDE from Telegram:

| 1. المطالبات التفاعلية | 2. تدقيق بناء الجملة عن بعد | 3. تحويل الفروع والوسوم |
|:---:|:---:|:---:|
| ![Interactive Prompts](images/demo_telegram_1.png) | ![Auditing Project](images/demo_telegram_2.png) | ![Branch Info](images/demo_telegram_3.png) |

| 4. مساحة العمل والملفات | 5. تاريخ الالتزامات والحالة |
|:---:|:---:|
| ![Active Workspace](images/demo_telegram_4.png) | ![Recent Commits](images/demo_telegram_5.png) |

---

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

---

## ☕ دعم المشروع
If you find this extension helpful, consider supporting the project to help maintain and add new features:

[![Donate via PayPal](https://img.shields.io/badge/PayPal-Donate-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/hieuvu1414/1)

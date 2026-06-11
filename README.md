# DCV Website Prototype

تم تحديث النسخة بناء على هوية DCV الجديدة:

- استخدام الشعار الكامل والشعار المختصر داخل `assets`.
- اعتماد ألوان الشعار: الأزرق الغامق والأزرق الحيوي.
- صفحة رئيسية.
- صفحة من نحن.
- صفحة خدمات Hub.
- صفحة مستقلة لكل خدمة.
- FAQ عام في القائمة.
- FAQ خاص لكل خدمة.
- صفحة اتصل بنا.
- صفحة مقالات.
- تجهيز طبقة التصميم لإضافة خلفية فيديو لكل الصفحات لاحقا.
- إضافة خلفية حركة مؤقتة مستمرة عبر CSS، مع عنصر فيديو جاهز لاستقبال `site-background.webm` أو `site-background.mp4`.

## المعاينة السريعة

```text
http://127.0.0.1:4173/preview.html
```

## ملفات مهمة

```text
preview.html
src/main.jsx
src/data.js
src/styles.css
assets/dcv-logo-full.png
assets/dcv-logo-mark.png
```

## خلفية الفيديو

الموقع يحتوي طبقة فيديو ثابتة خلف كل الصفحات. عند توفر الفيديو النهائي ضعه في:

```text
assets/site-background.webm
```

ثم فعّل سطر المصدر داخل `preview.html` و `src/main.jsx`. يفضل أن يكون الفيديو seamless loop حتى لا يظهر القطع عند نهاية التشغيل.

## ملاحظة

نسخة `preview.html` تعمل مباشرة بدون npm. نسخة React/Vite جاهزة في الملفات، وعند توفر npm يمكن تشغيلها عبر:

```bash
npm install
npm run dev
```

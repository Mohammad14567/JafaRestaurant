# مطعم يافا — Jafa Restaurant 🍽️

موقع مطعم شعبي فلسطيني عصري وأنيق، مبني بـ **Next.js 14 + TypeScript + Tailwind CSS + Firebase**.

## ✨ المميزات

- **تصميم عصري بهوية فلسطينية** — ألوان مستوحاة من العلم ونقشات التطريز، خط عربي أنيق، واجهة RTL.
- **تصفّح حرّ للمنيو** بدون تسجيل دخول.
- **تسجيل دخول / إنشاء حساب** عبر Firebase Auth — مطلوب فقط عند إتمام الطلب.
- **سلة طلبات** تُحفظ تلقائياً + إرسال الطلب إلى قاعدة البيانات.
- **لوحة تحكم لصاحب المطعم (Admin)**:
  - عرض الطلبات **لحظياً (real-time)**.
  - تحديد حالة الطلب (قيد التحضير) وإنهاؤه (حذفه من قاعدة البيانات عند الإتمام).
  - **إدارة المنيو**: إضافة وحذف الأصناف — لا أصناف ثابتة، الأدمن هو من يضيفها.

## 🚀 التشغيل

```bash
npm install
cp .env.local.example .env.local   # ثم املأ بيانات Firebase
npm run dev
```

ثم افتح http://localhost:3000

## 🔥 إعداد Firebase

1. أنشئ مشروعاً على [Firebase Console](https://console.firebase.google.com).
2. فعّل **Authentication → Email/Password**.
3. أنشئ قاعدة بيانات **Firestore**.
4. من إعدادات المشروع، انسخ بيانات الـ SDK إلى `.env.local`.
5. حدّد بريد صاحب المطعم في `NEXT_PUBLIC_ADMIN_EMAIL` — هذا الحساب وحده يرى لوحة التحكم. (أنشئ له حساباً من صفحة التسجيل بنفس البريد.)

### قواعد أمان Firestore المقترحة

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // المنيو: الجميع يقرأ، الأدمن فقط يكتب
    match /menu/{item} {
      allow read: if true;
      allow write: if request.auth != null
        && request.auth.token.email == "owner@jafa.com";
    }

    // الطلبات: المستخدم المسجّل ينشئ طلبه، الأدمن يقرأ/يحذف
    match /orders/{order} {
      allow create: if request.auth != null;
      allow read, update, delete: if request.auth != null
        && request.auth.token.email == "owner@jafa.com";
    }
  }
}
```

> غيّر `owner@jafa.com` إلى بريد الأدمن الفعلي (نفس قيمة `NEXT_PUBLIC_ADMIN_EMAIL`).

## 🗂️ هيكل المشروع

```
app/
  page.tsx        الصفحة الرئيسية
  menu/           المنيو (يقرأ من Firestore)
  login/          تسجيل الدخول / إنشاء حساب
  cart/           السلة وإتمام الطلب
  admin/          لوحة تحكم الأدمن (طلبات + منيو)
components/        Navbar, Footer
lib/              firebase, auth-context, cart-context
```

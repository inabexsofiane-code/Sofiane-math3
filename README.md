# موقع أستاذ سفيان — الرياضيات 📐

موقع تعليمي لمادة الرياضيات — التعليم الثانوي الجزائري  
مع لوحة تسيير **Decap CMS** لرفع الملفات وإدارتها.

---

## هيكل المشروع

```
math-sofiane/
├── index.html              ← الموقع الرئيسي (للطلاب)
├── admin/
│   └── index.html          ← لوحة Decap CMS (للأستاذ)
├── static/
│   └── config.yml          ← إعداد CMS ← عدّل اسم الـ repo هنا
├── uploads/
│   └── files/              ← الملفات المرفوعة (PDF، صور)
├── _content/
│   └── lessons/            ← بيانات الملفات (Markdown)
├── public/
│   └── lessons-manifest.json  ← يُولَّد تلقائياً عند النشر
├── generate-manifest.js    ← سكريبت البناء
├── netlify.toml            ← إعداد Netlify
└── package.json
```

---

## خطوات الإعداد

### 1. GitHub
- أنشئ Repository جديد باسم `math-sofiane` (Public)
- ارفع جميع الملفات

### 2. static/config.yml
عدّل هذين السطرين بمعلوماتك:
```yaml
repo: YOUR_USERNAME/math-sofiane   # ← اسم حسابك/اسم الـ repo
site_url: https://YOUR_SITE.netlify.app
```

### 3. Netlify
- اربط الـ repository بـ Netlify (Import from GitHub)
- Build command: `node generate-manifest.js`
- Publish directory: `.`

### 4. Netlify Identity
- Site Settings → Identity → **Enable Identity**
- Identity → Git Gateway → **Enable Git Gateway**
- Identity → **Invite users** → أضف بريدك الإلكتروني

### 5. تفعيل الدخول
- اذهب إلى `https://موقعك.netlify.app/admin`
- سجّل دخولك بالبريد الذي أضفته

---

## الاستخدام اليومي

1. اذهب إلى `/admin`
2. اضغط **"📚 الدروس والملفات"** → **"New"**
3. أدخل المعلومات وارفع الملف
4. اضغط **Publish** → يُضاف الملف للموقع تلقائياً خلال دقيقة

---

## الروابط

| الرابط | الوظيفة |
|--------|---------|
| `/` | الموقع للطلاب |
| `/admin` | لوحة تسيير الأستاذ |
| `/uploads/files/` | الملفات المرفوعة |

---

**أستاذ سفيان** · الرياضيات · الجزائر

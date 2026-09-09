# 📚 دليل التثبيت الشامل
# Complete Setup Guide

## المتطلبات الأساسية
## System Requirements

### Windows 10/11
- **رامات RAM**: 8GB أو أكثر
- **مساحة تخزين**: 10GB للمتطلبات والمشروع
- **معالج**: Intel i5 أو ما يعادله أو أفضل

### Mac
- **نظام التشغيل**: macOS 10.15 أو أحدث
- **رامات RAM**: 8GB أو أكثر
- **مساحة تخزين**: 10GB

### Linux
- **التوزيع**: Ubuntu 20.04 أو أحدث
- **رامات RAM**: 8GB أو أكثر

---

## 📦 خطوات التثبيت الكاملة

### الخطوة 1: تثبيت البرامج الأساسية

#### 1.1 تثبيت Git
- **Windows**: حمل من https://git-scm.com/download/win
- **Mac**: `brew install git`
- **Linux**: `sudo apt-get install git`

#### 1.2 تثبيت Python 3.9+
- **Windows**: حمل من https://www.python.org/downloads/
- **Mac**: `brew install python@3.9`
- **Linux**: `sudo apt-get install python3.9 python3.9-venv`

#### 1.3 تثبيت Node.js 16+
- حمل من https://nodejs.org/

#### 1.4 تثبيت PostgreSQL
- **Windows**: https://www.postgresql.org/download/windows/
- **Mac**: `brew install postgresql`
- **Linux**: `sudo apt-get install postgresql postgresql-contrib`

---

### الخطوة 2: استنساخ المستودع

```bash
git clone https://github.com/benhammou27000-wq/Broca-Aphasia-VR-Therapy.git
cd Broca-Aphasia-VR-Therapy
```

---

### الخطوة 3: إعداد Backend

```bash
# الذهاب إلى مجلد backend
cd backend

# إنشاء بيئة افتراضية
python -m venv venv

# تفعيل البيئة
# على Windows:
venv\Scripts\activate
# على Mac/Linux:
source venv/bin/activate

# تثبيت المكتبات
pip install -r requirements.txt

# إنشاء ملف .env
cp .env.example .env

# تحرير ملف .env بمعلوماتك
# nano .env  (على Mac/Linux)
# أو افتحه في محرر النصوص على Windows
```

---

### الخطوة 4: إعداد قاعدة البيانات

```bash
# إنشاء قاعدة بيانات جديدة
# على Windows (في Command Prompt):
createdb -U postgres broca_aphasia_vr

# على Mac/Linux:
createdb broca_aphasia_vr

# تطبيق الـ Migrations
python manage.py migrate

# إنشاء حساب مسؤول
python manage.py createsuperuser
```

---

### الخطوة 5: إعداد Frontend

```bash
# العودة إلى مجلد المشروع الرئيسي
cd ..
cd frontend

# تثبيت المكتبات
npm install

# إنشاء ملف .env (اختياري)
echo REACT_APP_API_URL=http://localhost:8000 > .env
```

---

### الخطوة 6: تشغيل المشروع

#### افتح 3 نوافذ من Terminal/PowerShell:

**النافذة الأولى - Backend:**
```bash
cd backend
source venv/bin/activate  # أو venv\Scripts\activate على Windows
python manage.py runserver
```
✅ سيشتغل على: http://localhost:8000

**النافذة الثانية - Frontend:**
```bash
cd frontend
npm start
```
✅ سيشتغل على: http://localhost:3000

**النافذة الثالثة - قاعدة البيانات:**
```bash
# عادة تعمل تلقائياً
# لكن تأكد أن PostgreSQL يعمل
```

---

## 🎮 تثبيت تطبيق VR

### Unity Setup

1. **حمل Unity 2022 LTS** من https://unity.com/download
2. **افتح مشروع جديد**:
   ```bash
   cd vr-app
   ```
3. **استورد الحزم المطلوبة**:
   - Meta Quest Integration
   - VRTK (VR Toolkit)
4. **اربط مع Backend**:
   - في Unity, انسخ الـ API URL
   - في Settings, أدخل: `http://localhost:8000/api/`

---

## ✅ اختبار التثبيت

### اختبر Backend:
```bash
curl http://localhost:8000/api/patients/
```

### اختبر Frontend:
- افتح http://localhost:3000 في المتصفح

### اختبر قاعدة البيانات:
```bash
psql -U postgres -d broca_aphasia_vr -c "SELECT version();"
```

---

## 🐛 حل المشاكل الشائعة

### مشكلة: "ModuleNotFoundError"
**الحل:**
```bash
pip install -r requirements.txt
```

### مشكلة: "Connection refused" لـ PostgreSQL
**الحل:**
- تأكد أن PostgreSQL يعمل
- Windows: ابحث عن PostgreSQL في Services
- Mac/Linux: `brew services start postgresql`

### مشكلة: Port 8000 مستخدم بالفعل
**الحل:**
```bash
python manage.py runserver 8001
```

### مشكلة: npm لم يتم تثبيته
**الحل:**
- حمل Node.js من https://nodejs.org/
- أعد تشغيل Terminal بعد التثبيت

---

## 📚 الموارد الإضافية

- [Django Documentation](https://docs.djangoproject.com/)
- [React Documentation](https://react.dev/)
- [Unity VR Guide](https://docs.unity3d.com/Manual/VROverview.html)
- [PostgreSQL Guide](https://www.postgresql.org/docs/)

---

## 💬 تحتاج مساعدة؟

1. اطلب في [Issues](https://github.com/benhammou27000-wq/Broca-Aphasia-VR-Therapy/issues)
2. اقرأ ملف [FAQ.md](FAQ.md)
3. تواصل معنا عبر البريد الإلكتروني

---

**مبروك! 🎉 تم إعداد المشروع بنجاح!**

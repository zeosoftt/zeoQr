# Vercel Database URL Hatası Çözümü

## 🔴 Hata Mesajı
```
Error validating datasource `db`: the URL must start with the protocol `postgresql://` or `postgres://`.
```

## ✅ Çözüm

### 1. Vercel Dashboard'da DATABASE_URL Kontrolü

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeni seç
2. **Settings** → **Environment Variables**
3. `DATABASE_URL` değişkenini kontrol et

### 2. Vercel Postgres Kullanıyorsan

1. Vercel Dashboard → Projen → **Storage** sekmesi
2. Eğer database yoksa: **Create Database** → **Postgres** seç
3. Database oluşturulduktan sonra `DATABASE_URL` otomatik eklenir
4. Format şöyle olmalı:
   ```
   postgresql://user:password@host:5432/dbname?sslmode=require
   ```

### 3. Harici PostgreSQL Kullanıyorsan (Supabase, Railway, vb.)

1. Database provider'ından connection string'i al
2. Format şöyle olmalı:
   ```
   postgresql://postgres:password@host:5432/postgres
   ```
3. Vercel → Settings → Environment Variables → `DATABASE_URL` ekle
4. **Production**, **Preview**, ve **Development** için işaretle

### 4. Environment Variable Ekleme

1. Vercel Dashboard → Project → Settings → Environment Variables
2. **Add New** butonuna tıkla
3. **Name**: `DATABASE_URL`
4. **Value**: PostgreSQL connection string'in (postgresql:// ile başlamalı)
5. **Environment**: Production, Preview, Development (hepsini seç)
6. **Save** butonuna tıkla

### 5. Redeploy

1. Environment variable ekledikten sonra **Redeploy** yap
2. Veya yeni bir commit push et (otomatik redeploy olur)

## 🔍 Kontrol Listesi

- [ ] `DATABASE_URL` Vercel'de tanımlı mı?
- [ ] `DATABASE_URL` `postgresql://` veya `postgres://` ile başlıyor mu?
- [ ] Environment variable Production, Preview ve Development için eklenmiş mi?
- [ ] Database erişilebilir durumda mı?
- [ ] SSL gerekiyorsa connection string'de `?sslmode=require` var mı?

## 📝 Örnek DATABASE_URL Formatları

### Vercel Postgres
```
postgresql://default:xxx@xxx.aws.neon.tech:5432/verceldb?sslmode=require
```

### Supabase
```
postgresql://postgres:password@db.xxxxx.supabase.co:5432/postgres
```

### Railway
```
postgresql://postgres:password@containers-us-west-xxx.railway.app:5432/railway
```

## ⚠️ Önemli Notlar

- **Asla** `file:./dev.db` formatını production'da kullanma (bu SQLite için)
- Production'da mutlaka PostgreSQL kullan
- Connection string'de şifre varsa güvenli tut
- SSL gerekiyorsa `?sslmode=require` ekle

## 🚀 Hızlı Çözüm

1. Vercel Dashboard → Storage → Create Database → Postgres
2. Database oluştur (DATABASE_URL otomatik eklenir)
3. Redeploy yap

Bu kadar! 🎉

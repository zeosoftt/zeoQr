# 🚨 Vercel Supabase Sorunu - Hızlı Çözüm

## ⚡ Hemen Yapılacaklar

### 1. Vercel Build Logs'unu Kontrol Et

1. Vercel Dashboard → Projen → **Deployments**
2. En son deployment → **Build Logs**
3. Şu mesajları ara:
   - `🔧 Preparing production schema (PostgreSQL)...`
   - `✅ Production schema (PostgreSQL) activated!`
   - `✅ Prisma Client generated successfully`

**Eğer bu mesajları görmüyorsan:** Build sırasında schema switch çalışmıyor demektir!

### 2. Debug Endpoint'ini Kullan

Vercel'de deploy ettikten sonra:

```
https://zeo-qr.vercel.app/api/debug
```

Bu endpoint şunları gösterir:
- ✅ Environment variables
- ✅ Schema provider (postgresql/sqlite)
- ✅ Database connection durumu
- ✅ Detaylı hata mesajları

### 3. Vercel'de DATABASE_URL Kontrolü

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. `DATABASE_URL` değişkenini kontrol et:
   - ✅ Var mı?
   - ✅ Format doğru mu? (`postgresql://...`)
   - ✅ Şifre doğru mu?
   - ✅ Environment seçenekleri: Production, Preview, Development

### 4. Supabase Projesi Aktif mi?

1. Supabase Dashboard → Projen
2. **Settings** → **General**
3. Proje **Paused** durumundaysa → **Restore project**
4. 1-2 dakika bekle

### 5. Build Command Kontrolü

Vercel Dashboard → **Settings** → **Build & Development Settings**

Build Command şöyle olmalı:
```
node scripts/prepare-production.js && prisma generate && next build
```

**VEYA** `vercel.json` dosyasında:
```json
{
  "buildCommand": "node scripts/prepare-production.js && prisma generate && next build"
}
```

## 🔍 Debug Endpoint Çıktısı

`/api/debug` endpoint'inden aldığın çıktıya göre:

### Schema "sqlite" ise:
- ❌ **SORUN:** Schema switch çalışmamış
- ✅ **ÇÖZÜM:** Build command'ı kontrol et, `prepare-production.js` çalışıyor mu?

### Database connection "failed" ise:
- ❌ **SORUN:** Supabase'e bağlanamıyor
- ✅ **ÇÖZÜM:** 
  1. Supabase projesi paused mı? → Restore
  2. DATABASE_URL doğru mu? → Kontrol et
  3. Connection string'deki şifre doğru mu?

### DATABASE_URL "NOT SET" ise:
- ❌ **SORUN:** Environment variable tanımlı değil
- ✅ **ÇÖZÜM:** Vercel Dashboard → Settings → Environment Variables → `DATABASE_URL` ekle

## 🎯 En Hızlı Test

1. Vercel'de yeniden deploy et
2. Deploy tamamlandıktan sonra: `https://zeo-qr.vercel.app/api/debug`
3. Çıktıyı kontrol et
4. Sorunun kaynağını gör

## 📞 Hala Çalışmıyorsa

Debug endpoint çıktısını paylaş, ona göre çözüm üretelim.

# 🔧 Vercel Environment Variables Kurulumu

## ⚠️ Önemli: .env.local Dosyasını Koruma

`npx vercel env pull` komutu `.env.local` dosyasını tamamen üzerine yazar ve mevcut değişkenleri siler!

### ✅ Güvenli Yöntem: Script Kullan

```powershell
npm run env:pull
```

Bu komut:
- ✅ Mevcut `.env.local` dosyasını backup eder
- ✅ Vercel'den environment variables'ı çeker
- ✅ Local-only değişkenleri (Supabase public keys, vb.) korur
- ✅ Her ikisini birleştirir

### ❌ Direkt Kullanma (Önerilmez)

```powershell
# Bu komut .env.local'i tamamen üzerine yazar!
npx vercel env pull
```

## 📋 Vercel'de Gerekli Environment Variables

### 1. Database (Zorunlu)

```
DATABASE_URL=postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres
```

**Not:** `ŞİFREN` kısmını kendi Supabase şifrenle değiştir!

### 2. App URL (Zorunlu)

```
NEXT_PUBLIC_APP_URL=https://zeo-qr.vercel.app
```

### 3. Supabase Public Keys (Opsiyonel - Frontend için)

Eğer Supabase client-side kullanıyorsan:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
```

**Not:** Bu değişkenler public olduğu için `.env.local`'de tutabilirsin, Vercel'de zorunlu değil.

### 4. Stripe (Opsiyonel - Ödeme için)

```
STRIPE_SECRET_KEY=sk_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_LIFETIME_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 🔍 Vercel'de Environment Variables Kontrol Et

1. Vercel Dashboard → Projen → **Settings** → **Environment Variables**
2. Şu değişkenlerin olduğundan emin ol:
   - ✅ `DATABASE_URL` (Supabase connection string)
   - ✅ `NEXT_PUBLIC_APP_URL` (Vercel URL'in)
3. Her değişken için **Environment** seçeneklerini kontrol et:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

## 🐛 Vercel'de Supabase Hata Veriyorsa

### 1. Supabase Projesi Paused mı?

1. Supabase Dashboard → Projen → **Settings** → **General**
2. Proje **Paused** durumundaysa → **Restore project**
3. 1-2 dakika bekle

### 2. DATABASE_URL Doğru mu?

1. Supabase Dashboard → **Settings** → **Database**
2. **Connection string** → **URI** seçeneğini seç
3. Connection string'i kopyala
4. Vercel Dashboard → **Settings** → **Environment Variables**
5. `DATABASE_URL` değişkenini güncelle
6. **Save** → **Redeploy**

### 3. Health Check Endpoint'ini Kontrol Et

Vercel'de deploy ettikten sonra:

```
https://zeo-qr.vercel.app/api/health
```

Bu endpoint:
- ✅ Database bağlantısını test eder
- ✅ Tabloları kontrol eder
- ✅ Detaylı hata mesajları gösterir

## 📝 Özet

### Local Development:
```powershell
# .env.local dosyasını koruyarak Vercel env'leri çek
npm run env:pull

# Supabase'e geç
npm run db:switch-supabase

# Development server başlat
npm run dev
```

### Vercel Production:
1. Vercel Dashboard → **Settings** → **Environment Variables**
2. `DATABASE_URL` ekle (Supabase connection string)
3. Deploy et
4. Health check endpoint'ini kontrol et

## ✅ Kontrol Listesi

- [ ] Vercel'de `DATABASE_URL` environment variable tanımlı mı?
- [ ] Connection string doğru mu? (hostname, port, şifre)
- [ ] Supabase projesi paused değil mi?
- [ ] Health check endpoint'i çalışıyor mu?
- [ ] `.env.local` dosyası korunuyor mu? (`npm run env:pull` kullan)

**Hazırsın!** 🚀

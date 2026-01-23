# 🚀 Hızlı Başlangıç - Supabase + Vercel

## Adım 1: Supabase Projesi Oluştur

1. [supabase.com](https://supabase.com) → **Sign Up** (GitHub ile)
2. **New Project** → Proje adı: `zeoqr`
3. **Database Password** belirle (not al!)
4. **Region** seç (örn: `Europe West`)
5. **Create new project** → 1-2 dakika bekle

## Adım 2: Connection String Al

1. Supabase Dashboard → Projen → **Settings** → **Database**
2. **Connection string** → **URI** seçeneğini seç
3. Şu formatta olacak:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. `[YOUR-PASSWORD]` kısmını kendi şifrenle değiştir
5. **Kopyala** (tam connection string)

## Adım 3: Vercel'e Deploy Et

### 3.1. GitHub'dan Vercel'e Bağla

1. [vercel.com](https://vercel.com) → **Sign Up** (GitHub ile)
2. **Add New Project**
3. GitHub repo'nu seç: `zeosoftt/zeoQr`
4. **Import**

### 3.2. Environment Variable Ekle

1. Vercel Dashboard → Projen → **Settings** → **Environment Variables**
2. **Add New**:
   - **Name**: `DATABASE_URL`
   - **Value**: Supabase'den aldığın connection string (şifreyle birlikte)
   - **Environment**: 
     - ✅ Production
     - ✅ Preview
     - ✅ Development
3. **Save**

### 3.3. Deploy

1. **Deployments** → **Redeploy** (veya otomatik deploy olacak)
2. Build tamamlanana kadar bekle (~2-3 dakika)

## Adım 4: Migration Çalıştır

### Yöntem A: Vercel CLI (Önerilen)

PowerShell'de:

```powershell
# 1. Vercel'e bağla
npx vercel link --yes

# 2. Environment variables'ı çek
npx vercel env pull

# 3. Migration'ı deploy et
npx prisma migrate deploy
```

### Yöntem B: Vercel Dashboard

1. Vercel Dashboard → Projen → **Deployments**
2. En son deployment → **Functions** sekmesi
3. Terminal aç
4. Şu komutu çalıştır:
   ```bash
   npx prisma migrate deploy
   ```

### Yöntem C: Build Command'a Ekle (Otomatik)

Vercel Dashboard → Settings → Build & Development Settings → Build Command:
```
node scripts/prepare-production.js && prisma generate && prisma migrate deploy && next build
```

Bu şekilde her deploy'da otomatik migration çalışır.

## Adım 5: Kontrol Et

1. **Supabase Dashboard** → **Table Editor**
2. Şu tablolar görünmeli:
   - ✅ `Session`
   - ✅ `QRCode`
   - ✅ `Subscription`

3. **Vercel URL**'ine git (örn: `https://zeoqr.vercel.app`)
4. QR kod oluştur → Çalışıyorsa başarılı! 🎉

## ✅ Tamamlandı!

Artık:
- ✅ Local'de SQLite ile geliştirme yapabilirsin
- ✅ Production'da Supabase PostgreSQL kullanılıyor
- ✅ Migration otomatik çalışıyor
- ✅ QR kodlar database'e kaydediliyor

## 🐛 Sorun mu Var?

### Migration Hatası
- Connection string'de şifre doğru mu?
- Supabase database aktif mi?
- Vercel logs'u kontrol et

### Build Hatası
- `DATABASE_URL` environment variable tanımlı mı?
- Connection string `postgresql://` ile başlıyor mu?

### Tablolar Görünmüyor
- Migration çalıştı mı? (`npx prisma migrate deploy`)
- Supabase → Table Editor'de kontrol et

## 📚 Daha Fazla Bilgi

- `SUPABASE_SETUP.md` - Detaylı Supabase kurulumu
- `SUPABASE_MIGRATION.md` - Migration detayları
- `VERCEL_DEPLOY.md` - Vercel deployment rehberi

**Başarılar!** 🚀

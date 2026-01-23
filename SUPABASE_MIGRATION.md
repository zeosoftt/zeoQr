# Supabase Migration Rehberi

## 🚀 Migration Çalıştırma

### Yöntem 1: Vercel CLI ile (Önerilen)

PowerShell'de komutları ayrı ayrı çalıştır:

```powershell
# 1. Environment variables'ı çek
npx vercel env pull

# 2. Migration'ı deploy et
npx prisma migrate deploy
```

### Yöntem 2: Vercel Dashboard'dan

1. Vercel Dashboard → Projen → **Deployments**
2. En son deployment'ı seç
3. **Functions** sekmesine git
4. Terminal aç
5. Şu komutları çalıştır:
   ```bash
   npx prisma migrate deploy
   ```

### Yöntem 3: Build Command'a Ekle

Vercel Dashboard → Settings → Build & Development Settings → Build Command:
```
node scripts/prepare-production.js && prisma generate && prisma migrate deploy && next build
```

## 📝 İlk Migration

Migration dosyası hazır: `prisma/migrations/init/migration.sql`

Bu migration:
- ✅ Session tablosunu oluşturur
- ✅ QRCode tablosunu oluşturur
- ✅ Subscription tablosunu oluşturur
- ✅ Tüm index'leri ekler

## 🔧 Supabase'de Migration Çalıştırma

### Adım 1: Supabase Connection String'i Al

1. Supabase Dashboard → Settings → Database
2. Connection string → URI
3. Format: `postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres`

### Adım 2: Local'de Test Et (Opsiyonel)

`.env.local` dosyası oluştur:
```
DATABASE_URL="postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres"
```

Sonra migration çalıştır:
```powershell
npx prisma migrate deploy
```

### Adım 3: Vercel'e Deploy

1. Vercel Dashboard → Settings → Environment Variables
2. `DATABASE_URL` ekle (Supabase connection string)
3. Deploy et
4. Migration otomatik çalışacak (eğer build command'a eklediysen)

## ✅ Migration Başarılı mı Kontrol Et

Supabase Dashboard → Table Editor'de şu tablolar görünmeli:
- ✅ Session
- ✅ QRCode  
- ✅ Subscription

## 🐛 Sorun Giderme

### Migration Hatası
- Connection string doğru mu?
- Supabase database aktif mi?
- Şifre doğru mu?

### Tablolar Görünmüyor
- Migration çalıştı mı?
- Supabase → Table Editor'de kontrol et
- Vercel logs'u kontrol et

## 📋 Özet

1. Supabase connection string'i Vercel'e ekle
2. Deploy et
3. Migration çalıştır: `npx prisma migrate deploy`
4. Tabloları kontrol et

**Hazırsın!** 🎉

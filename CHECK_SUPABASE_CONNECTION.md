# 🔍 Supabase Bağlantısını Kontrol Et

## Yöntem 1: Test Script ile (Önerilen)

### Adım 1: Supabase Connection String'i Al

1. Supabase Dashboard → Settings → Database
2. Connection string → URI
3. Format: `postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres`

### Adım 2: .env.local Dosyasına Ekle

`.env.local` dosyası oluştur veya düzenle:

```env
DATABASE_URL="postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres"
```

**Not:** `ŞİFREN` kısmını kendi Supabase şifrenle değiştir!

### Adım 3: Test Çalıştır

PowerShell'de:

```powershell
npm run db:test
```

Bu komut:
- ✅ DATABASE_URL'i kontrol eder
- ✅ Supabase'e bağlanır
- ✅ Tabloları kontrol eder
- ✅ Eksik tabloları gösterir

## Yöntem 2: Vercel Environment Variables

Eğer Vercel'de zaten Supabase connection string'i varsa:

```powershell
# Environment variables'ı çek
npx vercel env pull

# Test çalıştır
npm run db:test
```

## Yöntem 3: Manuel Kontrol

### Supabase Dashboard'dan:

1. Supabase Dashboard → **Table Editor**
2. Şu tablolar görünmeli:
   - ✅ `Session`
   - ✅ `QRCode`
   - ✅ `Subscription`

### Vercel Logs'dan:

1. Vercel Dashboard → Projen → **Deployments**
2. En son deployment → **Functions** → Logs
3. Database connection hatalarını kontrol et

## 🐛 Sorun Giderme

### "DATABASE_URL not found"
- `.env.local` dosyası var mı?
- Connection string doğru mu?

### "Connection failed"
- Supabase şifresi doğru mu?
- Supabase projesi aktif mi?
- Connection string formatı doğru mu?

### "No tables found"
- Migration çalıştırıldı mı?
- Supabase SQL Editor'den migration.sql çalıştır

## ✅ Başarılı Bağlantı

Test başarılıysa göreceksin:

```
✅ Successfully connected to Supabase!
✅ Database query successful!
✅ Found tables:
   - Session
   - QRCode
   - Subscription
✅ All required tables exist!
🎉 Supabase connection test completed successfully!
```

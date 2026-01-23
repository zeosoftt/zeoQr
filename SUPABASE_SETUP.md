# Supabase Kurulum Rehberi

## 🚀 Hızlı Başlangıç

### 1. Supabase Hesabı Oluştur

1. [supabase.com](https://supabase.com) → **Sign Up** (GitHub ile kolay)
2. **New Project** butonuna tıkla
3. Proje bilgilerini doldur:
   - **Name**: `zeoqr` (veya istediğin isim)
   - **Database Password**: Güçlü bir şifre belirle (not al!)
   - **Region**: En yakın bölgeyi seç (örn: `Europe West`)
4. **Create new project** butonuna tıkla
5. Database oluşturulması 1-2 dakika sürebilir

### 2. Connection String Al

1. Supabase Dashboard → Projeni seç
2. **Settings** (sol menü) → **Database**
3. **Connection string** bölümüne git
4. **URI** seçeneğini seç
5. Connection string şu formatta olacak:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
6. `[YOUR-PASSWORD]` kısmını kendi belirlediğin şifreyle değiştir
7. **Pooling mode** için **Session mode** kullan (connection string'de `?pgbouncer=true` olmamalı)

### 3. Vercel'e Environment Variable Ekle

1. [Vercel Dashboard](https://vercel.com/dashboard) → Projeni seç
2. **Settings** → **Environment Variables**
3. **Add New** butonuna tıkla
4. **Name**: `DATABASE_URL`
5. **Value**: Supabase'den aldığın connection string'i yapıştır
   ```
   postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres
   ```
6. **Environment**: 
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
7. **Save** butonuna tıkla

### 4. Database Migration

Vercel'de deploy ettikten sonra:

1. Vercel Dashboard → Projen → **Deployments** → En son deployment'ı seç
2. **Functions** sekmesine git
3. Terminal aç veya Vercel CLI kullan:
   ```bash
   npx vercel env pull .env.local
   npx prisma migrate deploy
   ```

Veya Vercel Dashboard → Settings → Build & Development Settings → Build Command:
```
node scripts/prepare-production.js && prisma generate && prisma migrate deploy && next build
```

### 5. İlk Migration Oluştur

Local'de migration oluştur (opsiyonel):
```bash
npx prisma migrate dev --name init
```

Sonra production'a push et:
```bash
git add prisma/migrations
git commit -m "Add initial migration"
git push
```

## 📋 Supabase Connection String Formatı

### Session Mode (Önerilen)
```
postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres
```

### Connection Pooling (Yüksek trafik için)
```
postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:6543/postgres?pgbouncer=true
```

**Not:** Connection pooling için port `6543`, normal connection için `5432` kullanılır.

## 🔒 Güvenlik

1. **Password**: Güçlü bir şifre kullan (en az 12 karakter, büyük/küçük harf, sayı, özel karakter)
2. **Environment Variables**: Şifreyi asla kod içine yazma, sadece environment variable olarak kullan
3. **SSL**: Supabase otomatik olarak SSL kullanır

## 🧪 Test Et

1. Vercel'de deploy et
2. Ana sayfaya git
3. QR kod oluştur
4. Çalışıyorsa database bağlantısı başarılı! ✅

## 🔧 Troubleshooting

### Connection Error
- Connection string'de şifre doğru mu kontrol et
- Supabase dashboard'da database'in aktif olduğundan emin ol
- Region'ın doğru seçildiğinden emin ol

### Migration Error
- `prisma migrate deploy` komutunu çalıştırdın mı?
- Database'de tablolar var mı kontrol et (Supabase → Table Editor)

### Build Error
- `DATABASE_URL` environment variable'ı Vercel'de tanımlı mı?
- Connection string `postgresql://` ile başlıyor mu?

## 💡 Supabase Ücretsiz Tier

- ✅ 500 MB database storage
- ✅ 2 GB bandwidth
- ✅ Unlimited API requests
- ✅ SSL included
- ✅ Automatic backups

MVP için yeterli! 🎉

## 📝 Özet

1. Supabase'de proje oluştur
2. Connection string al (şifreyle değiştir)
3. Vercel'e `DATABASE_URL` ekle
4. Deploy et
5. Migration çalıştır

**Hazırsın!** 🚀

# Migration Rehberi

## ⚠️ Önemli: Local vs Production

### Local Development (SQLite)
- ✅ **Migration çalıştırma!** Local'de migration'a gerek yok
- ✅ Schema'yı oluşturmak için: `npx prisma db push`
- ✅ Local'de SQLite kullanılıyor (`file:./dev.db`)

### Production (Supabase PostgreSQL)
- ✅ **Migration çalıştır!** Production'da migration gerekli
- ✅ Migration sadece PostgreSQL için hazırlanmış
- ✅ Supabase connection string'i ile çalıştır

## 🚀 Local Development

Local'de çalışmak için:

```powershell
# 1. Schema'yı oluştur (ilk kez)
npx prisma db push

# 2. Development server'ı başlat
npm run dev
```

**Not:** Local'de `npx prisma migrate deploy` çalıştırma! Bu sadece production için.

## 🌐 Production Migration (Supabase)

### Yöntem 1: Vercel CLI ile (Önerilen)

1. **Supabase connection string'ini Vercel'e ekle**
   - Vercel Dashboard → Settings → Environment Variables
   - `DATABASE_URL` = Supabase connection string

2. **Environment variables'ı çek:**
   ```powershell
   npx vercel env pull
   ```

3. **Migration'ı çalıştır:**
   ```powershell
   # PostgreSQL schema'ya geçici olarak geç
   Copy-Item prisma\schema.production.prisma prisma\schema.prisma
   
   # Migration çalıştır
   npx prisma migrate deploy
   
   # SQLite schema'ya geri dön
   Copy-Item prisma\schema.sqlite.backup.prisma prisma\schema.prisma
   ```

### Yöntem 2: Vercel Dashboard'dan

1. Vercel Dashboard → Projen → **Deployments**
2. En son deployment → **Functions** sekmesi
3. Terminal aç
4. Şu komutları çalıştır:
   ```bash
   npx prisma migrate deploy
   ```

### Yöntem 3: Build Command'a Ekle (Otomatik)

Vercel Dashboard → Settings → Build & Development Settings → Build Command:
```
node scripts/prepare-production.js && prisma generate && prisma migrate deploy && next build
```

Bu şekilde her deploy'da otomatik migration çalışır.

## 🔍 Hata: "The database schema is not empty"

Bu hata local'de görünürse:
- ✅ **Normal!** Local'de SQLite zaten dolu
- ✅ Local'de migration çalıştırmaya gerek yok
- ✅ Sadece production'da (Supabase) migration çalıştır

## 📋 Özet

| Ortam | Database | Migration Gerekli? | Komut |
|-------|----------|-------------------|-------|
| **Local** | SQLite | ❌ Hayır | `npx prisma db push` |
| **Production** | PostgreSQL (Supabase) | ✅ Evet | `npx prisma migrate deploy` |

## ✅ Kontrol Listesi

- [ ] Local'de `npx prisma db push` çalıştırıldı mı?
- [ ] Supabase connection string'i Vercel'e eklendi mi?
- [ ] Production'da migration çalıştırıldı mı?
- [ ] Supabase Table Editor'de tablolar görünüyor mu?

**Başarılar!** 🚀

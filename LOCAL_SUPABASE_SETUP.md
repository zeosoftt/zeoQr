# 💻 Local'de Supabase Kullanma

## 🚀 Hızlı Başlangıç

### 1. Supabase Connection String'i .env.local'e Ekle

`.env.local` dosyası oluştur veya düzenle:

```env
DATABASE_URL="postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres"
```

**Not:** `ŞİFREN` kısmını kendi Supabase şifrenle değiştir!

### 2. Schema'yı PostgreSQL'e Geçir

PowerShell'de:

```powershell
npm run db:switch-supabase
```

Bu komut:
- ✅ SQLite schema'yı backup eder
- ✅ Schema'yı PostgreSQL'e geçirir
- ✅ Prisma Client'ı yeniden generate eder

### 3. Development Server'ı Başlat

```powershell
npm run dev
```

Artık local'de Supabase kullanıyorsun! 🎉

## 🔄 SQLite'a Geri Dönmek İçin

Eğer local'de tekrar SQLite kullanmak istersen:

```powershell
npm run db:switch-sqlite
```

Bu komut:
- ✅ PostgreSQL schema'yı geri alır
- ✅ SQLite schema'yı restore eder
- ✅ Prisma Client'ı yeniden generate eder

**Not:** `.env.local` dosyasını sil veya `.env` dosyasında `DATABASE_URL="file:./dev.db"` olduğundan emin ol.

## ⚠️ Önemli Notlar

### Local'de Supabase Kullanırken:
- ✅ `.env.local` dosyasında Supabase connection string olmalı
- ✅ Schema PostgreSQL olmalı
- ✅ Prisma Client PostgreSQL için generate edilmiş olmalı

### Local'de SQLite Kullanırken:
- ✅ `.env` dosyasında `DATABASE_URL="file:./dev.db"` olmalı
- ✅ Schema SQLite olmalı
- ✅ Prisma Client SQLite için generate edilmiş olmalı

## 🐛 Sorun Giderme

### "Can't reach database server"
- Supabase projesi paused olabilir → Supabase Dashboard → Restore project
- Connection string yanlış olabilir → `.env.local`'i kontrol et
- `SUPABASE_TROUBLESHOOTING.md` dosyasına bak

### "Schema mismatch" hatası
- `npm run db:switch-supabase` komutunu çalıştır
- `npx prisma generate` komutunu çalıştır

### Prisma Client hataları
- Schema'yı doğru database'e geçirdiğinden emin ol
- `npx prisma generate` komutunu çalıştır

## 📋 Komut Özeti

| Komut | Açıklama |
|-------|----------|
| `npm run db:switch-supabase` | Local'de Supabase kullan (PostgreSQL) |
| `npm run db:switch-sqlite` | Local'de SQLite kullan (default) |
| `npm run db:test` | Supabase bağlantısını test et |
| `npm run dev` | Development server başlat |

## ✅ Kontrol Listesi

- [ ] `.env.local` dosyasında Supabase connection string var mı?
- [ ] `npm run db:switch-supabase` çalıştırıldı mı?
- [ ] Prisma Client generate edildi mi?
- [ ] Supabase projesi aktif mi? (paused değil)

**Hazırsın!** 🚀

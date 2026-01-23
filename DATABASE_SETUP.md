# Database Kurulum Rehberi

## 🎯 En Kolay Yöntem: Vercel Postgres (Önerilen)

### Adımlar:
1. Vercel Dashboard'a git
2. Projeni seç (veya yeni proje oluştur)
3. **Storage** sekmesine tıkla
4. **Create Database** butonuna tıkla
5. **Postgres** seç
6. Database oluşturulduktan sonra `DATABASE_URL` otomatik olarak environment variable olarak eklenir
7. **Kullanıcı adı/şifre gerekmez!** Her şey otomatik

---

## 🆓 Alternatif: Supabase (Ücretsiz)

### 1. Supabase Hesabı Oluştur
1. [supabase.com](https://supabase.com) → Sign Up (GitHub ile kolay)
2. **New Project** oluştur
3. Project name ve database password belirle (not al!)
4. Region seç (en yakın: `Europe West` veya `US East`)
5. **Create new project** butonuna tıkla

### 2. Connection String Al
1. Supabase Dashboard → Project Settings → Database
2. **Connection string** bölümünde **URI** seçeneğini bul
3. Şu formatta olacak:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
   ```
4. `[YOUR-PASSWORD]` kısmını kendi belirlediğin şifreyle değiştir
5. Bu string'i kopyala

### 3. Vercel'e Ekle
1. Vercel Dashboard → Project → Settings → Environment Variables
2. **Add New** butonuna tıkla
3. Name: `DATABASE_URL`
4. Value: Kopyaladığın connection string'i yapıştır
5. **Save** butonuna tıkla

---

## 💻 Local Development için SQLite

Eğer sadece local'de çalışmak istiyorsan (Vercel'e deploy etmeden):

### 1. Schema'yı SQLite'a Çevir
`prisma/schema.prisma` dosyasını aç ve şunu değiştir:

```prisma
datasource db {
  provider = "sqlite"  // postgresql yerine sqlite
  url      = env("DATABASE_URL")
}
```

### 2. .env Dosyasını Güncelle
`.env` dosyasında:
```
DATABASE_URL="file:./dev.db"
```

### 3. Database Oluştur
```bash
npx prisma db push
```

---

## 🚀 Vercel Deployment için Öneri

**En kolay yol:** Vercel Postgres kullan
- ✅ Otomatik setup
- ✅ Kullanıcı adı/şifre gerekmez
- ✅ Vercel ile entegre
- ✅ Ücretsiz tier mevcut

**Alternatif:** Supabase
- ✅ Ücretsiz
- ✅ Kolay setup
- ✅ Güvenilir
- ⚠️ Şifre belirlemen gerekir

---

## 📝 Özet

1. **Vercel Postgres** → En kolay, otomatik
2. **Supabase** → Ücretsiz, manuel setup
3. **SQLite** → Sadece local development için

**Tavsiye:** Vercel Postgres kullan, hiçbir şifre girmene gerek yok! 🎉

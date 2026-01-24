# 🔥 Supabase Connection Fix - Acil Çözüm

## ❌ Hata: "Can't reach database server"

Bu hata **%99 durumda** şu nedenlerden kaynaklanır:

### 1. ⚠️ Supabase Projesi PAUSED (En Yaygın!)

**Kesinlikle kontrol et:**

1. [Supabase Dashboard](https://supabase.com/dashboard) → Projeni seç
2. **Settings** → **General**
3. Proje durumunu kontrol et:
   - ✅ **Active** → Başka bir sorun var
   - ❌ **Paused** → **RESTORE PROJECT** butonuna tıkla!

**Paused projeler otomatik olarak 7 gün kullanılmazsa pause olur!**

### 2. Connection String Formatı

Supabase'de **2 farklı connection string** var:

#### A) Direct Connection (Port 5432) - Önerilen
```
postgresql://postgres:ŞİFREN@db.ujxamlizmcexzhcjygzu.supabase.co:5432/postgres
```

#### B) Connection Pooling (Port 6543) - Yüksek trafik için
```
postgresql://postgres:ŞİFREN@db.ujxamlizmcexzhcjygzu.supabase.co:6543/postgres?pgbouncer=true
```

**Öneri:** Port **5432** kullan (direct connection)

### 3. Connection String'deki Şifre

**Önemli:** Connection string'deki şifre **URL-encoded** olmalı!

Özel karakterler varsa encode et:
- `@` → `%40`
- `#` → `%23`
- `$` → `%24`
- `%` → `%25`
- `&` → `%26`
- `+` → `%2B`
- `=` → `%3D`

**Örnek:**
```
Şifre: MyP@ss#123
Encoded: MyP%40ss%23123
```

### 4. Vercel'de DATABASE_URL Kontrolü

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. `DATABASE_URL` değişkenini **EDIT** et
3. Connection string'i **tamamen sil ve yeniden yapıştır**
4. **Save** → **Redeploy**

**Not:** Bazen Vercel'de environment variable'lar cache'leniyor, yeniden kaydetmek sorunu çözebilir.

### 5. SSL Connection (Opsiyonel)

Bazı durumlarda SSL parametresi eklemek gerekebilir:

```
postgresql://postgres:ŞİFREN@db.ujxamlizmcexzhcjygzu.supabase.co:5432/postgres?sslmode=require
```

## 🚀 Hızlı Test Adımları

### Adım 1: Supabase Projesi Aktif mi?

1. Supabase Dashboard → Projen
2. **Settings** → **General**
3. **Paused** ise → **Restore project**
4. 1-2 dakika bekle

### Adım 2: Connection String'i Yeniden Al

1. Supabase Dashboard → **Settings** → **Database**
2. **Connection string** → **URI** seçeneğini seç
3. Connection string'i **kopyala**
4. **ÖNEMLİ:** `[YOUR-PASSWORD]` kısmını kendi şifrenle değiştir
5. Özel karakterler varsa URL-encode et

### Adım 3: Vercel'e Ekle

1. Vercel Dashboard → **Settings** → **Environment Variables**
2. `DATABASE_URL` değişkenini **SİL**
3. **YENİDEN EKLE:**
   - Name: `DATABASE_URL`
   - Value: Connection string (şifreyle birlikte, URL-encoded)
   - Environment: Production, Preview, Development
4. **Save**

### Adım 4: Redeploy

1. Vercel Dashboard → **Deployments**
2. En son deployment → **Redeploy**
3. Build tamamlanana kadar bekle

### Adım 5: Test Et

1. `https://zeo-qr.vercel.app/api/debug` → Database connection kontrolü
2. `https://zeo-qr.vercel.app/api/health` → Health check
3. Ana sayfada QR kod oluştur → Test

## 🔍 Debug

Eğer hala çalışmıyorsa:

1. **Supabase Dashboard** → **Logs** → **Postgres Logs**
   - Connection attempt'leri görünüyor mu?
   - Hata mesajları var mı?

2. **Vercel Dashboard** → **Functions** → **Logs**
   - Detaylı hata mesajlarını kontrol et

3. **Connection String Test:**
   - Local'de `npm run db:test` çalıştır
   - Local'de çalışıyorsa, Vercel'de network sorunu olabilir

## ✅ Kontrol Listesi

- [ ] Supabase projesi **Active** durumunda mı? (Paused değil)
- [ ] Connection string'deki **şifre doğru** mu?
- [ ] Özel karakterler **URL-encoded** mu?
- [ ] Port **5432** mi? (6543 değil)
- [ ] Vercel'de `DATABASE_URL` **yeniden kaydedildi** mi?
- [ ] Vercel'de **redeploy** edildi mi?

## 💡 En Yaygın Çözüm

**%90 durumda:** Supabase projesi paused olmuş.

**Çözüm:** Supabase Dashboard → Settings → General → **Restore project**

**%5 durumda:** Connection string'deki şifre yanlış veya URL-encoded değil.

**Çözüm:** Connection string'i yeniden al, şifreyi doğru yaz, özel karakterleri encode et.

**%5 durumda:** Vercel environment variable cache sorunu.

**Çözüm:** `DATABASE_URL`'i sil, yeniden ekle, redeploy et.

## 🆘 Hala Çalışmıyorsa

1. Supabase Dashboard → **Support** → Ticket aç
2. Vercel Dashboard → **Support** → Logs'u paylaş
3. `/api/debug` endpoint çıktısını paylaş

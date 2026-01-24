# 🔧 Supabase Bağlantı Sorunları - Sorun Giderme

## ❌ Hata: "Can't reach database server"

Bu hata genellikle şu nedenlerden kaynaklanır:

### 1. Supabase Projesi Paused (Duraklatılmış)

**En yaygın neden!** Supabase ücretsiz tier'da projeler 7 gün kullanılmazsa otomatik pause olur.

#### Çözüm:
1. [Supabase Dashboard](https://supabase.com/dashboard) → Projeni seç
2. **Settings** → **General**
3. Proje **Paused** durumundaysa:
   - **Restore project** butonuna tıkla
   - Proje restore edilmesi 1-2 dakika sürebilir
4. Restore edildikten sonra tekrar dene

### 2. Connection String Yanlış

#### Kontrol Et:
1. Supabase Dashboard → **Settings** → **Database**
2. **Connection string** → **URI** seçeneğini seç
3. Connection string formatı:
   ```
 postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
 ```
4. `[YOUR-PASSWORD]` kısmını kendi şifrenle değiştir
5. Özel karakterler URL-encoded olmalı (örn: `@` → `%40`)

#### Vercel'e Ekle:
1. Vercel Dashboard → Projen → **Settings** → **Environment Variables**
2. `DATABASE_URL` değişkenini kontrol et
3. Connection string'i güncelle (gerekirse)
4. **Save** → **Redeploy**

### 3. IP Allowlist (Eğer Varsa)

Supabase'de IP allowlist aktifse, Vercel'in IP'lerini eklemen gerekebilir.

#### Çözüm:
1. Supabase Dashboard → **Settings** → **Database**
2. **Connection pooling** veya **Network restrictions** bölümünü kontrol et
3. Eğer IP allowlist varsa, Vercel IP'lerini ekle veya allowlist'i kaldır

**Not:** Genellikle Supabase'de IP allowlist yok, bu yüzden bu nadiren sorun olur.

### 4. Supabase Projesi Silinmiş veya Erişilemiyor

#### Kontrol Et:
1. Supabase Dashboard'da projen görünüyor mu?
2. Proje aktif mi? (Paused değil mi?)
3. Proje sahibi hesabına erişimin var mı?

### 5. Network/Firewall Sorunu

#### Kontrol Et:
1. Supabase dashboard'dan başka bir yerde connection string'i test et
2. Local'de `npm run db:test` komutunu çalıştır
3. Eğer local'de çalışıyorsa, Vercel'de network sorunu olabilir

## ✅ Hızlı Kontrol Listesi

- [ ] Supabase projesi paused değil mi?
- [ ] Connection string doğru mu? (hostname, port, şifre)
- [ ] Vercel'de `DATABASE_URL` environment variable tanımlı mı?
- [ ] Connection string'deki şifre URL-encoded mu? (özel karakterler için)
- [ ] Supabase projesi aktif mi?

## 🔍 Test Et

### Local'de Test:
```powershell
npm run db:test
```

### Vercel'de Test:
```
https://zeo-qr.vercel.app/api/health
```

## 💡 En Yaygın Çözüm

**%90 durumda sorun:** Supabase projesi paused olmuş.

**Çözüm:** Supabase Dashboard → Settings → General → **Restore project**

## 📞 Daha Fazla Yardım

Eğer yukarıdaki çözümler işe yaramazsa:
1. Supabase Dashboard → **Support** → Ticket aç
2. Vercel Dashboard → **Support** → Logs'u paylaş
3. Health check endpoint'inden aldığın hata mesajını kontrol et

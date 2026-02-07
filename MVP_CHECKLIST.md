# ZeoQR MVP – Hazırlık Kontrol Listesi

Bu liste, uygulamayı yerelde çalıştırmanız ve canlıya (Vercel) almanız için gereken adımları özetler.

---

## 1. Yerel geliştirme (ilk kurulum)

1. **Bağımlılıkları yükleyin**
   ```bash
   npm install
   ```
   `postinstall` otomatik olarak SQLite şemasını kullanacak (PostgreSQL URL’i yoksa).

2. **Ortam değişkenlerini ayarlayın**
   - `env.example` dosyasını `.env` veya `.env.local` olarak kopyalayın.
   - En azından şunu kullanın:
     ```env
     DATABASE_URL="file:./dev.db"
     NEXT_PUBLIC_APP_URL="http://localhost:3000"
     ```
   - Reklamları kapatmak için (varsayılan): `NEXT_PUBLIC_ADS_PROVIDER="none"`

3. **Veritabanını oluşturun**
   ```bash
   npx prisma db push
   ```

4. **Geliştirme sunucusunu başlatın**
   ```bash
   npm run dev
   ```
   Tarayıcıda http://localhost:3000 açın.

**MVP’de yerelde:** QR oluşturma, indirme, fiyatlandırma sayfası çalışır. Ödeme ve reklamlar yapılandırılmamışsa uygulama yine de çalışır; ödeme için “Yakında açılacak” mesajı gösterilir.

---

## 2. Canlıya alma (Vercel)

1. **PostgreSQL veritabanı**
   - Supabase, Vercel Postgres veya başka bir PostgreSQL sağlayıcı kullanın.
   - Bağlantı dizesini alın (örn. `postgresql://user:password@host:5432/dbname`).
   - Supabase kullanıyorsanız: projenin duraklatılmamış olduğundan ve şifrenin URL içinde doğru encode edildiğinden emin olun.

2. **Vercel projesi**
   - Repoyu GitHub’a push edin, Vercel’de “Import” ile projeyi oluşturun.
   - **Environment Variables** bölümünde en az şunları ekleyin:
     - `DATABASE_URL` = PostgreSQL bağlantı dizesi (Production + Preview + Development)
     - `NEXT_PUBLIC_APP_URL` = Canlı site URL’i (örn. `https://zeoqr.vercel.app`)

3. **Build**
   - Vercel, `package.json` içindeki `build` komutunu kullanır:
     `node scripts/prepare-production.js && prisma generate && next build`
   - `VERCEL=1` ve `DATABASE_URL` (Postgres) olduğu için otomatik olarak PostgreSQL şeması kullanılır.

4. **İlk deploy sonrası (isteğe bağlı)**
   - Production veritabanında migration çalıştırmak isterseniz (Vercel’de veya lokalden production DB’ye bağlanarak):
     ```bash
     npx prisma migrate deploy
     ```
   - Şema ile DB uyumlu değilse: `npx prisma db push` (geliştirme için; production’da mümkünse migrate kullanın).

---

## 3. MVP’de isteğe bağlı eklemeler

| Özellik        | Ne yapılır |
|----------------|------------|
| **Reklamlar**  | `NEXT_PUBLIC_ADS_PROVIDER="adsense"` ve `NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxx"` ekleyin. |
| **Stripe**     | Stripe Dashboard’dan fiyatları oluşturun; `STRIPE_SECRET_KEY`, `STRIPE_MONTHLY_PRICE_ID`, `STRIPE_LIFETIME_PRICE_ID`, `NEXT_PUBLIC_APP_URL` ve (webhook için) `STRIPE_WEBHOOK_SECRET` tanımlayın. |
| **Webhook**    | Stripe webhook URL: `https://SITE_URL/api/subscription/webhook`. Stripe Dashboard’da bu URL’i ekleyin. |

---

## 4. Kısa özet

- **Yerel:** `env.example` → `.env`, `DATABASE_URL="file:./dev.db"`, `npm install` → `npx prisma db push` → `npm run dev`.
- **Vercel:** `DATABASE_URL` (Postgres) + `NEXT_PUBLIC_APP_URL` → Deploy; gerekirse `prisma migrate deploy` veya `db push`.
- Veritabanı erişilemez olsa bile ana sayfa ve QR üretimi çalışır (tracking atlanır, premium false döner).

Bu adımlarla MVP sürümü yerelde ve canlıda çalıştırılabilir.

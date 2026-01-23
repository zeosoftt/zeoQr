# Vercel Deployment Rehberi

## 🚀 Hızlı Başlangıç

### 1. Vercel'e Projeyi İmport Et

1. [Vercel Dashboard](https://vercel.com/dashboard) üzerinden **"Add New Project"** butonuna tıkla
2. GitHub repository'ni seç: `zeosoftt/zeoQr`
3. Vercel otomatik olarak Next.js projesini algılayacak

### 2. Environment Variables (Önemli!)

Vercel Dashboard → Project Settings → Environment Variables bölümünden şunları ekle:

#### Zorunlu:
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

#### Stripe (Ödeme için):
```
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_LIFETIME_PRICE_ID=price_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### AdSense (Reklam için):
```
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
NEXT_PUBLIC_ADS_PROVIDER=adsense
```

### 3. Database Kurulumu

#### Seçenek 1: Vercel Postgres (Önerilen)
1. Vercel Dashboard → Project → Storage → Create Database
2. **Postgres** seç
3. Database oluşturulduktan sonra `DATABASE_URL` otomatik olarak environment variable olarak eklenir

#### Seçenek 2: Harici PostgreSQL
- Supabase, Railway, Neon, vb. kullanabilirsin
- Connection string'i `DATABASE_URL` olarak ekle

### 4. Prisma Schema Güncellemesi

Production için `prisma/schema.prisma` dosyasını güncelle:

```prisma
datasource db {
  provider = "postgresql"  // sqlite yerine postgresql
  url      = env("DATABASE_URL")
}
```

**Not:** Bu değişikliği yaptıktan sonra GitHub'a push et:
```bash
git add prisma/schema.prisma
git commit -m "Update schema for PostgreSQL"
git push
```

### 5. Build Settings

Vercel otomatik olarak algılar, ama kontrol et:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (otomatik)
- **Output Directory:** `.next` (otomatik)
- **Install Command:** `npm install` (otomatik)

### 6. Deploy

1. **Deploy** butonuna tıkla
2. İlk deploy sırasında Vercel otomatik olarak:
   - Dependencies yükler
   - Prisma Client generate eder
   - Build yapar
   - Deploy eder

### 7. Database Migration

Deploy sonrası terminalden veya Vercel CLI ile:

```bash
npx prisma migrate deploy
```

Veya Vercel Dashboard → Project → Settings → Build & Development Settings → Build Command'a ekle:
```
npm run build && npx prisma migrate deploy
```

### 8. Stripe Webhook Ayarları

1. Stripe Dashboard → Developers → Webhooks
2. **Add endpoint** butonuna tıkla
3. Endpoint URL: `https://your-app.vercel.app/api/subscription/webhook`
4. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Webhook secret'i kopyala ve `STRIPE_WEBHOOK_SECRET` olarak ekle

## 📋 Post-Deployment Checklist

- [ ] Database bağlantısı çalışıyor mu?
- [ ] Environment variables doğru mu?
- [ ] Prisma migrations çalıştı mı?
- [ ] QR code generation test edildi mi?
- [ ] Stripe webhook çalışıyor mu?
- [ ] AdSense entegrasyonu aktif mi?
- [ ] Premium features test edildi mi?
- [ ] Analytics sayfası çalışıyor mu?
- [ ] Bulk generator çalışıyor mu?

## 🔧 Troubleshooting

### Database Connection Error
- `DATABASE_URL` formatını kontrol et
- PostgreSQL database'in public erişime açık olduğundan emin ol
- SSL gerekiyorsa connection string'e `?sslmode=require` ekle

### Build Failures
- Prisma Client generate edilmediyse: `npx prisma generate` çalıştır
- Environment variables eksikse kontrol et
- Build logs'u Vercel Dashboard'dan incele

### Webhook Not Working
- Webhook URL'in doğru olduğundan emin ol
- `STRIPE_WEBHOOK_SECRET` doğru mu kontrol et
- Stripe Dashboard → Webhooks → Events'te hata var mı bak

## 🌐 Custom Domain (Opsiyonel)

1. Vercel Dashboard → Project → Settings → Domains
2. Domain ekle
3. DNS ayarlarını yap
4. SSL otomatik olarak aktif olur

## 📊 Monitoring

- Vercel Dashboard → Analytics ile trafiği izle
- Function logs ile API hatalarını kontrol et
- Database connection pool'u izle

---

**Başarılar! 🎉**

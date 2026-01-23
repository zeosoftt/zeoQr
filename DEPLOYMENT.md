# Deployment Guide

## Quick Deploy to Vercel

1. **Prepare your repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables, add:
   ```
   DATABASE_URL=postgresql://...
   NEXT_PUBLIC_APP_URL=https://your-domain.com
   STRIPE_SECRET_KEY=sk_...
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_...
   STRIPE_MONTHLY_PRICE_ID=price_...
   STRIPE_LIFETIME_PRICE_ID=price_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-...
   NEXT_PUBLIC_ADS_PROVIDER=adsense
   ```

4. **Set up Database**
   - Use Vercel Postgres (recommended) or external PostgreSQL
   - Update `DATABASE_URL` with connection string
   - Update `prisma/schema.prisma` to use `postgresql`
   - Run `npx prisma migrate deploy` or use Vercel's build command

5. **Configure Build Command**
   In Vercel → Settings → General → Build & Development Settings:
   ```
   Build Command: npm run build
   Install Command: npm install
   ```

6. **Set up Stripe Webhook**
   - In Stripe Dashboard → Webhooks
   - Add endpoint: `https://your-domain.com/api/subscription/webhook`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET`

## Database Migration

### Development (SQLite)
```bash
npx prisma db push
```

### Production (PostgreSQL)
```bash
# Update schema.prisma datasource to postgresql
npx prisma migrate dev --name init
# Or for production:
npx prisma migrate deploy
```

## Environment Variables Checklist

### Required
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `NEXT_PUBLIC_APP_URL` - Your domain URL

### Optional (for payments)
- [ ] `STRIPE_SECRET_KEY`
- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] `STRIPE_MONTHLY_PRICE_ID`
- [ ] `STRIPE_LIFETIME_PRICE_ID`
- [ ] `STRIPE_WEBHOOK_SECRET`

### Optional (for ads)
- [ ] `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
- [ ] `NEXT_PUBLIC_ADS_PROVIDER` (default: "none")

## Post-Deployment Checklist

- [ ] Test QR code generation
- [ ] Verify database connection
- [ ] Test premium subscription flow
- [ ] Verify ad integration (if enabled)
- [ ] Check analytics page (premium)
- [ ] Test bulk generation (premium)
- [ ] Verify webhook is receiving events
- [ ] Test mobile responsiveness
- [ ] Check SEO (sitemap, robots.txt)
- [ ] Monitor error logs

## Troubleshooting

### Database Connection Issues
- Verify `DATABASE_URL` format
- Check database is accessible from Vercel
- Ensure SSL is enabled if required

### Stripe Webhook Not Working
- Verify webhook URL is correct
- Check webhook secret matches
- Review Stripe Dashboard → Webhooks → Events

### Ads Not Showing
- Verify `NEXT_PUBLIC_ADS_PROVIDER` is set
- Check AdSense client ID is correct
- Ensure you're in production mode (ads disabled in dev)

### Build Failures
- Check Prisma client is generated: `npx prisma generate`
- Verify all environment variables are set
- Review build logs in Vercel dashboard

# ZeoQR - QR Code Generator Web App

A lightweight, scalable QR code generator optimized for ad revenue and premium upgrades.

## Features

### Free Tier
- ✅ Generate QR codes for URLs, text, phone numbers, and emails
- ✅ Instant client-side generation
- ✅ Download as PNG
- ✅ No login required
- ✅ Session-based tracking

### Premium Tier
- 🚀 No ads
- 🎨 Logo upload inside QR codes
- 🎨 Custom colors (dark/light)
- 📊 Scan analytics
- 📦 Bulk QR generation (CSV upload)
- 💳 Monthly or Lifetime subscription

## Tech Stack

- **Frontend**: Next.js 14 (App Router)
- **Backend**: API Routes / Server Actions
- **Database**: SQLite (development) / PostgreSQL (production)
- **ORM**: Prisma
- **Styling**: Tailwind CSS
- **Payments**: Stripe / Lemon Squeezy
- **Hosting**: Vercel compatible

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd ZeoQr
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
DATABASE_URL="file:./dev.db"
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Stripe (optional for MVP)
STRIPE_SECRET_KEY=""
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=""
STRIPE_MONTHLY_PRICE_ID=""
STRIPE_LIFETIME_PRICE_ID=""
STRIPE_WEBHOOK_SECRET=""

# Lemon Squeezy (optional)
LEMONSQUEEZY_API_KEY=""
LEMONSQUEEZY_STORE_ID=""

# Ad Providers
NEXT_PUBLIC_ADSENSE_CLIENT_ID=""
NEXT_PUBLIC_ADS_PROVIDER="adsense" # adsense, custom, none
```

4. Initialize the database:
```bash
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── api/              # API routes
│   │   ├── qr/          # QR tracking, analytics, bulk
│   │   └── subscription/ # Payment & subscription
│   ├── analytics/        # Analytics page (premium)
│   ├── bulk/            # Bulk generator (premium)
│   ├── pricing/         # Pricing page
│   ├── layout.tsx       # Root layout
│   ├── page.tsx         # Home page
│   ├── sitemap.ts       # SEO sitemap
│   └── robots.ts        # SEO robots.txt
├── components/          # React components
│   ├── QRGenerator.tsx
│   ├── AdBanner.tsx
│   ├── PremiumFeatures.tsx
│   └── ...
├── lib/                # Utilities
│   ├── db.ts          # Prisma client
│   ├── session.ts     # Session management
│   ├── qr.ts          # QR generation
│   ├── premium.ts    # Premium checks
│   └── ads.ts        # Ad integration
└── prisma/
    └── schema.prisma  # Database schema
```

## Database Schema

### Session
- Anonymous session tracking (no user table)
- Linked to QR codes

### QRCode
- Minimal data: hash, content, type, scan count
- Premium features: logo, custom colors

### Subscription
- Links to session (not user)
- Supports Stripe and Lemon Squeezy
- Monthly or Lifetime plans

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Update `DATABASE_URL` to use PostgreSQL (Vercel Postgres or external provider)
5. Deploy

### Database Setup (Production)

For production, use PostgreSQL:

1. Create a PostgreSQL database (Vercel Postgres, Supabase, Railway, etc.)
2. Update `DATABASE_URL` in your environment variables:
```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
```

3. Update `prisma/schema.prisma`:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

4. Run migrations:
```bash
npx prisma migrate deploy
```

### Stripe Setup

1. Create a Stripe account
2. Create products and prices in Stripe Dashboard
3. Add price IDs to environment variables
4. Set up webhook endpoint: `/api/subscription/webhook`
5. Configure webhook in Stripe Dashboard to send events

### Ad Integration

1. **Google AdSense**:
   - Get your AdSense client ID
   - Add to `NEXT_PUBLIC_ADSENSE_CLIENT_ID`
   - Update ad slot ID in `components/AdBanner.tsx`

2. **Custom Provider**:
   - Implement in `lib/ads.ts` and `components/AdBanner.tsx`

## API Routes

### QR Codes
- `POST /api/qr/track` - Track QR code generation
- `POST /api/qr/scan` - Track QR code scan
- `GET /api/qr/analytics` - Get analytics (premium)
- `POST /api/qr/bulk` - Bulk generation (premium)

### Subscriptions
- `GET /api/subscription/check` - Check premium status
- `POST /api/subscription/create-checkout` - Create payment session
- `POST /api/subscription/webhook` - Payment webhook

## SEO & Performance

- ✅ Static landing page
- ✅ Dynamic meta tags
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Mobile-first design
- ✅ Fast LCP optimization

## Monetization Strategy

1. **Ad Revenue**: Banner ads below QR results, optional rewarded video before download
2. **Premium Subscriptions**: Monthly ($9.99) or Lifetime ($99)
3. **Premium Features**: No ads, customization, analytics, bulk generation

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.

# 🚀 Supabase Migration - Hızlı Rehber

## ⚡ En Hızlı Yöntem: Supabase SQL Editor

### 1. Supabase SQL Editor'ü Aç

1. [Supabase Dashboard](https://supabase.com/dashboard) → Projen
2. Sol menüden **SQL Editor** seç
3. **New query** butonuna tıkla

### 2. Migration SQL'ini Çalıştır

`prisma/migrations/init/migration.sql` dosyasındaki SQL'i kopyala ve Supabase SQL Editor'e yapıştır, sonra **Run** butonuna tıkla.

**VEYA** aşağıdaki SQL'i direkt kullan:

```sql
-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qrHash" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "scanCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT,
    "logoUrl" TEXT,
    "colorDark" TEXT,
    "colorLight" TEXT,
    CONSTRAINT "QRCode_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "sessionId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "planType" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_qrHash_key" ON "QRCode"("qrHash");
CREATE INDEX "QRCode_qrHash_idx" ON "QRCode"("qrHash");
CREATE INDEX "QRCode_createdAt_idx" ON "QRCode"("createdAt");
CREATE INDEX "QRCode_sessionId_idx" ON "QRCode"("sessionId");
CREATE INDEX "Session_createdAt_idx" ON "Session"("createdAt");
CREATE UNIQUE INDEX "Subscription_sessionId_key" ON "Subscription"("sessionId");
CREATE INDEX "Subscription_sessionId_idx" ON "Subscription"("sessionId");
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");
```

### 3. Kontrol Et

1. Supabase Dashboard → **Table Editor**
2. Şu tablolar görünmeli:
   - ✅ `Session`
   - ✅ `QRCode`
   - ✅ `Subscription`

**Tamamlandı!** 🎉

---

## 🔧 Alternatif: Prisma Migrate Deploy

Eğer Prisma migration sistemini kullanmak istersen:

### PowerShell'de:

```powershell
# 1. Supabase connection string'ini .env.local'e ekle
# DATABASE_URL="postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres"

# 2. PostgreSQL schema'ya geç
Copy-Item prisma\schema.production.prisma prisma\schema.prisma

# 3. Migration çalıştır
npx prisma migrate deploy

# 4. SQLite schema'ya geri dön (local development için)
Copy-Item prisma\schema.sqlite.backup.prisma prisma\schema.prisma
```

**Not:** `.env.local` dosyasına Supabase connection string'ini eklemeyi unutma!

---

## ✅ Hangi Yöntemi Seçmeliyim?

- **SQL Editor:** ✅ En hızlı, tek seferlik setup için ideal
- **Prisma Migrate:** ✅ Daha profesyonel, gelecekteki migration'lar için hazır

**Öneri:** İlk kurulum için SQL Editor kullan, sonra Prisma Migrate kullan.

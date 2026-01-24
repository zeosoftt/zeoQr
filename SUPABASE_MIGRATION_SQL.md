# Supabase Migration - SQL Editor ile

## 🚀 En Hızlı Yöntem: Supabase SQL Editor

### Adım 1: Supabase SQL Editor'ü Aç

1. Supabase Dashboard → Projen
2. Sol menüden **SQL Editor** seç
3. **New query** butonuna tıkla

### Adım 2: Migration SQL'ini Çalıştır

Aşağıdaki SQL'i kopyala ve Supabase SQL Editor'e yapıştır, sonra **Run** butonuna tıkla:

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

-- CreateIndex
CREATE INDEX "QRCode_qrHash_idx" ON "QRCode"("qrHash");

-- CreateIndex
CREATE INDEX "QRCode_createdAt_idx" ON "QRCode"("createdAt");

-- CreateIndex
CREATE INDEX "QRCode_sessionId_idx" ON "QRCode"("sessionId");

-- CreateIndex
CREATE INDEX "Session_createdAt_idx" ON "Session"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Subscription_sessionId_key" ON "Subscription"("sessionId");

-- CreateIndex
CREATE INDEX "Subscription_sessionId_idx" ON "Subscription"("sessionId");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");
```

### Adım 3: Kontrol Et

1. Supabase Dashboard → **Table Editor**
2. Şu tablolar görünmeli:
   - ✅ `Session`
   - ✅ `QRCode`
   - ✅ `Subscription`

**Tamamlandı!** 🎉

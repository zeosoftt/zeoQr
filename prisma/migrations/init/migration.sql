-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "qrHash" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "scanCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "expiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
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

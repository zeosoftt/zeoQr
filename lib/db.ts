import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Validate DATABASE_URL only in production
if (process.env.NODE_ENV === 'production') {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      'DATABASE_URL environment variable is missing. ' +
      'Please set it in your Vercel project settings.'
    )
  }

  if (!process.env.DATABASE_URL.startsWith('postgresql://') && 
      !process.env.DATABASE_URL.startsWith('postgres://')) {
    throw new Error(
      'DATABASE_URL must start with postgresql:// or postgres:// in production. ' +
      'Current value: ' + process.env.DATABASE_URL.substring(0, 20) + '...'
    )
  }
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Validate DATABASE_URL only at runtime, not during build
function validateDatabaseUrl() {
  // Skip validation during build time
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return
  }

  // Only validate in production runtime
  if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
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
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })

// Validate only when db is actually used (lazy validation)
const originalQuery = db.$connect.bind(db)
db.$connect = async function() {
  validateDatabaseUrl()
  return originalQuery()
}

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

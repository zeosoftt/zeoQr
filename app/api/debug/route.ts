import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    environment: {
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: process.env.VERCEL,
      NEXT_PHASE: process.env.NEXT_PHASE,
    },
    database: {
      url: process.env.DATABASE_URL 
        ? `${process.env.DATABASE_URL.substring(0, 30)}...` 
        : 'NOT SET',
      isPostgres: process.env.DATABASE_URL?.startsWith('postgresql://') || 
                  process.env.DATABASE_URL?.startsWith('postgres://'),
    },
    prisma: {
      clientPath: require.resolve('@prisma/client'),
    },
  }

  // Try to read schema file
  try {
    const fs = require('fs')
    const path = require('path')
    const schemaPath = path.join(process.cwd(), 'prisma', 'schema.prisma')
    if (fs.existsSync(schemaPath)) {
      const schemaContent = fs.readFileSync(schemaPath, 'utf8')
      debugInfo.schema = {
        exists: true,
        provider: schemaContent.includes('provider = "postgresql"') 
          ? 'postgresql' 
          : schemaContent.includes('provider = "sqlite"') 
          ? 'sqlite' 
          : 'unknown',
      }
    } else {
      debugInfo.schema = { exists: false }
    }
  } catch (error) {
    debugInfo.schema = { error: String(error) }
  }

  // Try database connection
  try {
    await db.$connect()
    debugInfo.database.connection = 'success'
    
    // Try a simple query
    await db.$queryRaw`SELECT 1`
    debugInfo.database.query = 'success'
    
    await db.$disconnect()
  } catch (error) {
    debugInfo.database.connection = 'failed'
    debugInfo.database.error = error instanceof Error ? error.message : String(error)
    debugInfo.database.errorStack = error instanceof Error ? error.stack : undefined
  }

  return NextResponse.json(debugInfo, { status: 200 })
}

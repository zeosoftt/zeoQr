import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Test database connection
    await db.$connect()
    
    // Test query
    await db.$queryRaw`SELECT 1`
    
    // Check tables
    const tables = await db.$queryRaw<Array<{ table_name: string }>>`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    const tableNames = tables.map(t => t.table_name)
    const requiredTables = ['Session', 'QRCode', 'Subscription']
    const missingTables = requiredTables.filter(t => !tableNames.includes(t))
    
    return NextResponse.json({
      status: 'ok',
      database: 'connected',
      tables: tableNames,
      missingTables: missingTables.length > 0 ? missingTables : undefined,
      schema: process.env.DATABASE_URL?.startsWith('postgresql://') ? 'postgresql' : 'unknown',
    })
  } catch (error) {
    console.error('Health check error:', error)
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        error: error instanceof Error ? error.message : String(error),
        schema: process.env.DATABASE_URL?.startsWith('postgresql://') ? 'postgresql' : 'unknown',
        databaseUrl: process.env.DATABASE_URL ? `${process.env.DATABASE_URL.substring(0, 30)}...` : 'not set',
      },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}

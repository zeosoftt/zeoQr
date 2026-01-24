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
    
    const errorMessage = error instanceof Error ? error.message : String(error)
    const dbUrl = process.env.DATABASE_URL || ''
    
    // Extract hostname from connection string for better error messages
    let hostname = 'unknown'
    try {
      if (dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://')) {
        const url = new URL(dbUrl.replace('postgresql://', 'http://').replace('postgres://', 'http://'))
        hostname = url.hostname
      }
    } catch (e) {
      // Ignore URL parsing errors
    }
    
    // Provide helpful error messages
    let troubleshooting = []
    if (errorMessage.includes("Can't reach database server")) {
      troubleshooting.push('1. Supabase projenin paused olmadığından emin ol (Supabase Dashboard → Settings → General)')
      troubleshooting.push('2. Supabase projenin aktif olduğunu kontrol et')
      troubleshooting.push('3. Connection string\'deki hostname ve port\'u kontrol et')
      troubleshooting.push('4. Supabase IP allowlist ayarlarını kontrol et (eğer varsa)')
    } else if (errorMessage.includes('password') || errorMessage.includes('authentication')) {
      troubleshooting.push('1. DATABASE_URL\'deki şifrenin doğru olduğundan emin ol')
      troubleshooting.push('2. Connection string\'de özel karakterler URL-encoded olmalı')
    } else if (errorMessage.includes('ENOTFOUND') || errorMessage.includes('ECONNREFUSED')) {
      troubleshooting.push('1. Supabase hostname\'i doğru mu kontrol et')
      troubleshooting.push('2. Supabase projenin aktif olduğunu kontrol et')
      troubleshooting.push('3. Network bağlantını kontrol et')
    }
    
    return NextResponse.json(
      {
        status: 'error',
        database: 'disconnected',
        error: errorMessage,
        schema: dbUrl.startsWith('postgresql://') || dbUrl.startsWith('postgres://') ? 'postgresql' : 'unknown',
        hostname: hostname,
        troubleshooting: troubleshooting.length > 0 ? troubleshooting : undefined,
      },
      { status: 500 }
    )
  } finally {
    await db.$disconnect()
  }
}

// Script to prepare schema for production deployment
// This copies the production schema to the main schema file

const fs = require('fs')
const path = require('path')

const productionSchemaPath = path.join(__dirname, '../prisma/schema.production.prisma')
const mainSchemaPath = path.join(__dirname, '../prisma/schema.prisma')

// Check if we're in production (Vercel) or if DATABASE_URL is PostgreSQL
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL
const isPostgres = process.env.DATABASE_URL && (
  process.env.DATABASE_URL.startsWith('postgresql://') || 
  process.env.DATABASE_URL.startsWith('postgres://')
)

if (isProduction || isPostgres) {
  console.log('🔧 Preparing production schema (PostgreSQL)...')
  console.log(`   NODE_ENV: ${process.env.NODE_ENV}`)
  console.log(`   VERCEL: ${process.env.VERCEL}`)
  console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + '...' : 'NOT SET'}`)
  
  if (!fs.existsSync(productionSchemaPath)) {
    console.error('❌ ERROR: schema.production.prisma not found!')
    console.warn('⚠️  Warning: schema.production.prisma not found, using current schema')
    process.exit(1)
  }
  
  // Backup current schema if it's SQLite
  const currentSchema = fs.existsSync(mainSchemaPath) 
    ? fs.readFileSync(mainSchemaPath, 'utf8')
    : ''
  
  if (currentSchema.includes('provider = "sqlite"')) {
    const backupPath = path.join(__dirname, '../prisma/schema.sqlite.backup.prisma')
    fs.writeFileSync(backupPath, currentSchema)
    console.log('✅ Backed up SQLite schema')
  }
  
  const productionSchema = fs.readFileSync(productionSchemaPath, 'utf8')
  fs.writeFileSync(mainSchemaPath, productionSchema)
  console.log('✅ Production schema (PostgreSQL) activated!')
  
  // Verify the switch worked
  const verifySchema = fs.readFileSync(mainSchemaPath, 'utf8')
  if (!verifySchema.includes('provider = "postgresql"')) {
    console.error('❌ ERROR: Schema switch failed! Schema still not PostgreSQL!')
    process.exit(1)
  }
  console.log('✅ Schema verification passed - PostgreSQL confirmed')
} else {
  console.log('ℹ️  Using development schema (SQLite)')
}

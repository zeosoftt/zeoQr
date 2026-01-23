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
  console.log('Preparing production schema (PostgreSQL)...')
  if (!fs.existsSync(productionSchemaPath)) {
    console.warn('Warning: schema.production.prisma not found, using current schema')
    process.exit(0)
  }
  const productionSchema = fs.readFileSync(productionSchemaPath, 'utf8')
  fs.writeFileSync(mainSchemaPath, productionSchema)
  console.log('Production schema (PostgreSQL) activated!')
} else {
  console.log('Using development schema (SQLite)')
}

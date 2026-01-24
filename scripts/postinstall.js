// Postinstall script to prepare schema and generate Prisma Client
// This runs after npm install, including on Vercel

const { execSync } = require('child_process')
const path = require('path')
const fs = require('fs')

console.log('📦 Postinstall: Preparing Prisma...')
console.log(`   NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`   VERCEL: ${process.env.VERCEL}`)
console.log(`   DATABASE_URL: ${process.env.DATABASE_URL ? process.env.DATABASE_URL.substring(0, 30) + '...' : 'NOT SET'}`)

// Run prepare-production.js first (it will switch schema if needed)
try {
  require('./prepare-production.js')
} catch (error) {
  console.error('❌ ERROR: prepare-production.js failed:', error.message)
  console.error(error.stack)
  // Don't exit, try to continue
}

// Verify schema is correct before generating
const schemaPath = path.join(__dirname, '../prisma/schema.prisma')
if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8')
  const isPostgres = schemaContent.includes('provider = "postgresql"')
  const isSQLite = schemaContent.includes('provider = "sqlite"')
  
  console.log(`   Schema provider: ${isPostgres ? 'postgresql' : isSQLite ? 'sqlite' : 'unknown'}`)
  
  // If we're in Vercel/production and schema is SQLite, that's a problem
  if ((process.env.VERCEL || process.env.NODE_ENV === 'production') && isSQLite) {
    console.error('❌ CRITICAL ERROR: In production but schema is SQLite!')
    console.error('   This will cause database connection failures!')
    process.exit(1)
  }
}

// Always generate Prisma Client (with correct schema)
try {
  console.log('🔄 Generating Prisma Client...')
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })
  console.log('✅ Prisma Client generated successfully')
} catch (error) {
  console.error('❌ Failed to generate Prisma Client:', error.message)
  console.error(error.stack)
  process.exit(1)
}

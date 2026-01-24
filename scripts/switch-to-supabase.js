// Script to switch local development to Supabase PostgreSQL
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

// Helper function to wait
function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const productionSchemaPath = path.join(__dirname, '../prisma/schema.production.prisma')
const mainSchemaPath = path.join(__dirname, '../prisma/schema.prisma')
const sqliteBackupPath = path.join(__dirname, '../prisma/schema.sqlite.backup.prisma')

console.log('🔄 Switching to Supabase PostgreSQL for local development...\n')

// Check if .env.local has PostgreSQL connection string
const envLocalPath = path.join(__dirname, '../.env.local')
if (!fs.existsSync(envLocalPath)) {
  console.error('❌ .env.local file not found!')
  console.log('\n💡 Create .env.local with:')
  console.log('   DATABASE_URL="postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres"')
  process.exit(1)
}

const envContent = fs.readFileSync(envLocalPath, 'utf8')
const dbUrlMatch = envContent.match(/DATABASE_URL=["']?([^"'\n]+)["']?/)
const dbUrl = dbUrlMatch ? dbUrlMatch[1] : process.env.DATABASE_URL

if (!dbUrl || (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://'))) {
  console.error('❌ DATABASE_URL in .env.local must be a PostgreSQL connection string!')
  console.log('\n💡 Update .env.local with Supabase connection string:')
  console.log('   DATABASE_URL="postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres"')
  process.exit(1)
}

console.log('✅ Found PostgreSQL connection string in .env.local\n')

// Backup current SQLite schema
if (fs.existsSync(mainSchemaPath)) {
  const currentSchema = fs.readFileSync(mainSchemaPath, 'utf8')
  if (currentSchema.includes('provider = "sqlite"')) {
    fs.writeFileSync(sqliteBackupPath, currentSchema)
    console.log('✅ Backed up SQLite schema\n')
  }
}

// Switch to PostgreSQL schema
if (!fs.existsSync(productionSchemaPath)) {
  console.error('❌ schema.production.prisma not found!')
  process.exit(1)
}

const productionSchema = fs.readFileSync(productionSchemaPath, 'utf8')
fs.writeFileSync(mainSchemaPath, productionSchema)
console.log('✅ Switched schema to PostgreSQL\n')

// Regenerate Prisma Client
let retries = 3
let success = false

async function regeneratePrisma() {
  try {
    console.log('🔄 Regenerating Prisma Client for PostgreSQL...')
    execSync('npx prisma generate', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    })
    console.log('\n✅ Prisma Client regenerated successfully!')
    success = true
  } catch (error) {
    retries--
    if (retries > 0) {
      console.log(`\n⚠️  Retrying... (${retries} attempts left)`)
      console.log('💡 Make sure development server is stopped!')
      // Wait 2 seconds before retry
      await wait(2000)
    } else {
      console.error('\n❌ Failed to generate Prisma Client after multiple attempts')
      console.error('Error:', error.message)
      console.log('\n💡 Try manually:')
      console.log('   1. Stop development server (Ctrl+C)')
      console.log('   2. Close any IDE/editor that might be using Prisma files')
      console.log('   3. Run: npx prisma generate')
      process.exit(1)
    }
  }
}

  if (success) {
    console.log('\n🎉 Local development is now using Supabase PostgreSQL!')
    console.log('\n💡 To switch back to SQLite, run:')
    console.log('   npm run db:switch-sqlite')
  }
}

switchToSupabase().catch(error => {
  console.error('Unexpected error:', error)
  process.exit(1)
})
}

regeneratePrisma()

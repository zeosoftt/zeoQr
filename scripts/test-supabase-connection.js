// Test Supabase connection
const { PrismaClient } = require('@prisma/client')
const fs = require('fs')
const path = require('path')

// Load .env.local if exists
const envLocalPath = path.join(__dirname, '../.env.local')
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8')
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      process.env[key] = value
    }
  })
}

// Switch to PostgreSQL schema for testing
const schemaPath = path.join(__dirname, '../prisma/schema.prisma')
const productionSchemaPath = path.join(__dirname, '../prisma/schema.production.prisma')
const sqliteBackupPath = path.join(__dirname, '../prisma/schema.sqlite.backup.prisma')

let schemaSwitched = false
let originalSchema = null

function switchToPostgreSQL() {
  if (!fs.existsSync(productionSchemaPath)) {
    console.error('❌ schema.production.prisma not found!')
    process.exit(1)
  }
  
  // Backup current schema
  if (fs.existsSync(schemaPath)) {
    originalSchema = fs.readFileSync(schemaPath, 'utf8')
    // Only backup if it's SQLite
    if (originalSchema.includes('provider = "sqlite"')) {
      fs.writeFileSync(sqliteBackupPath, originalSchema)
    }
  }
  
  // Switch to PostgreSQL schema
  const productionSchema = fs.readFileSync(productionSchemaPath, 'utf8')
  fs.writeFileSync(schemaPath, productionSchema)
  schemaSwitched = true
  console.log('✅ Switched to PostgreSQL schema for testing\n')
}

function restoreSchema() {
  if (schemaSwitched && originalSchema) {
    fs.writeFileSync(schemaPath, originalSchema)
    console.log('\n✅ Restored SQLite schema')
  } else if (fs.existsSync(sqliteBackupPath)) {
    const sqliteSchema = fs.readFileSync(sqliteBackupPath, 'utf8')
    fs.writeFileSync(schemaPath, sqliteSchema)
    console.log('\n✅ Restored SQLite schema from backup')
  }
}

async function testConnection() {
  console.log('🔍 Testing Supabase connection...\n')
  
  // Check DATABASE_URL
  const dbUrl = process.env.DATABASE_URL
  if (!dbUrl) {
    console.error('❌ DATABASE_URL environment variable is not set!')
    console.log('\n💡 Set it in .env.local:')
    console.log('   DATABASE_URL="postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres"')
    console.log('\n   Or run: npx vercel env pull')
    process.exit(1)
  }

  console.log('✅ DATABASE_URL found')
  console.log(`   ${dbUrl.substring(0, 50)}...`)

  // Check if it's PostgreSQL
  if (!dbUrl.startsWith('postgresql://') && !dbUrl.startsWith('postgres://')) {
    console.error('❌ DATABASE_URL must start with postgresql:// or postgres://')
    console.log('   Current: ' + dbUrl.substring(0, 30))
    console.log('\n💡 This looks like SQLite (local development)')
    console.log('   To test Supabase:')
    console.log('   1. Add Supabase connection string to .env.local')
    console.log('   2. OR run: npx vercel env pull')
    process.exit(1)
  }

  console.log('✅ PostgreSQL connection string format is correct\n')

  // Switch to PostgreSQL schema
  switchToPostgreSQL()

  // Regenerate Prisma Client with PostgreSQL schema
  const { execSync } = require('child_process')
  try {
    console.log('🔄 Regenerating Prisma Client for PostgreSQL...')
    // Clear Prisma Client cache
    const prismaClientPath = path.join(__dirname, '../node_modules/@prisma/client')
    if (fs.existsSync(prismaClientPath)) {
      // Delete generated client to force regeneration
      const generatedPath = path.join(prismaClientPath, 'index.js')
      if (fs.existsSync(generatedPath)) {
        // Clear require cache
        delete require.cache[require.resolve('@prisma/client')]
      }
    }
    execSync('npx prisma generate', { stdio: 'inherit', cwd: path.join(__dirname, '..') })
    console.log('✅ Prisma Client regenerated\n')
    
    // Clear require cache and reload
    delete require.cache[require.resolve('@prisma/client')]
  } catch (error) {
    console.error('❌ Failed to regenerate Prisma Client')
    restoreSchema()
    process.exit(1)
  }

  // Try to connect - reload PrismaClient after regeneration
  const { PrismaClient: NewPrismaClient } = require('@prisma/client')
  const prisma = new NewPrismaClient({
    log: ['error', 'warn'],
  })

  try {
    console.log('🔄 Connecting to Supabase...')
    await prisma.$connect()
    console.log('✅ Successfully connected to Supabase!\n')

    // Test query
    console.log('🔄 Testing database query...')
    const result = await prisma.$queryRaw`SELECT 1 as test`
    console.log('✅ Database query successful!\n')

    // Check if tables exist
    console.log('🔄 Checking tables...')
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `
    
    const tableNames = tables.map(t => t.table_name)
    
    if (tableNames.length === 0) {
      console.log('⚠️  No tables found in database')
      console.log('   Run migration to create tables:\n')
      console.log('   1. Supabase SQL Editor → Run migration.sql')
      console.log('   2. OR: npx prisma migrate deploy\n')
    } else {
      console.log('✅ Found tables:')
      tableNames.forEach(name => {
        console.log(`   - ${name}`)
      })
      
      const requiredTables = ['Session', 'QRCode', 'Subscription']
      const missingTables = requiredTables.filter(t => !tableNames.includes(t))
      
      if (missingTables.length > 0) {
        console.log('\n⚠️  Missing required tables:')
        missingTables.forEach(name => console.log(`   - ${name}`))
        console.log('\n   Run migration to create missing tables!')
      } else {
        console.log('\n✅ All required tables exist!')
      }
    }

    console.log('\n🎉 Supabase connection test completed successfully!')
  } catch (error) {
    console.error('\n❌ Connection failed!')
    console.error('Error:', error.message)
    
    if (error.message.includes('password')) {
      console.log('\n💡 Check your database password in DATABASE_URL')
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Check your Supabase connection string:')
      console.log('   - Is the hostname correct?')
      console.log('   - Is Supabase project active?')
    } else {
      console.log('\n💡 Check your DATABASE_URL format:')
      console.log('   postgresql://postgres:ŞİFREN@db.xxxxx.supabase.co:5432/postgres')
    }
    
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    restoreSchema()
  }
}

testConnection()

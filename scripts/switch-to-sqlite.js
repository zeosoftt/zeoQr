// Script to switch local development back to SQLite
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const mainSchemaPath = path.join(__dirname, '../prisma/schema.prisma')
const sqliteBackupPath = path.join(__dirname, '../prisma/schema.sqlite.backup.prisma')

console.log('🔄 Switching back to SQLite for local development...\n')

// Check if SQLite backup exists
if (!fs.existsSync(sqliteBackupPath)) {
  console.error('❌ SQLite backup schema not found!')
  console.log('\n💡 Create prisma/schema.sqlite.backup.prisma or manually restore SQLite schema')
  process.exit(1)
}

// Restore SQLite schema
const sqliteSchema = fs.readFileSync(sqliteBackupPath, 'utf8')
fs.writeFileSync(mainSchemaPath, sqliteSchema)
console.log('✅ Restored SQLite schema\n')

// Regenerate Prisma Client
try {
  console.log('🔄 Regenerating Prisma Client for SQLite...')
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })
  console.log('\n✅ Prisma Client regenerated successfully!')
  console.log('\n🎉 Local development is now using SQLite!')
  console.log('\n💡 Make sure .env has:')
  console.log('   DATABASE_URL="file:./dev.db"')
} catch (error) {
  console.error('\n❌ Failed to generate Prisma Client:', error.message)
  process.exit(1)
}

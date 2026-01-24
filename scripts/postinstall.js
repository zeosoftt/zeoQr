// Postinstall script to prepare schema and generate Prisma Client
// This runs after npm install, including on Vercel

const { execSync } = require('child_process')
const path = require('path')

// Run prepare-production.js first (it will switch schema if needed)
try {
  require('./prepare-production.js')
} catch (error) {
  console.warn('Warning: prepare-production.js failed:', error.message)
}

// Always generate Prisma Client (with correct schema)
try {
  console.log('Generating Prisma Client...')
  execSync('npx prisma generate', { 
    stdio: 'inherit',
    cwd: path.join(__dirname, '..')
  })
  console.log('✅ Prisma Client generated successfully')
} catch (error) {
  console.error('❌ Failed to generate Prisma Client:', error.message)
  process.exit(1)
}

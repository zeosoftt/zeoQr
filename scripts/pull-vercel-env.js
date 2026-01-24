// Script to pull Vercel environment variables while preserving local .env.local
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const envLocalPath = path.join(__dirname, '../.env.local')
const envLocalBackupPath = path.join(__dirname, '../.env.local.backup')

console.log('🔄 Pulling Vercel environment variables...\n')

// Backup current .env.local if exists
if (fs.existsSync(envLocalPath)) {
  const currentEnv = fs.readFileSync(envLocalPath, 'utf8')
  fs.writeFileSync(envLocalBackupPath, currentEnv)
  console.log('✅ Backed up current .env.local\n')
  
  // Extract local-only variables (Supabase public keys, etc.)
  const localVars = {}
  currentEnv.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/)
    if (match) {
      const key = match[1].trim()
      let value = match[2].trim()
      // Remove quotes
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      
      // Keep local-only variables (Supabase public keys, etc.)
      if (key.startsWith('NEXT_PUBLIC_SUPABASE_') || 
          key.startsWith('NEXT_PUBLIC_') && !key.includes('VERCEL')) {
        localVars[key] = value
      }
    }
  })
  
  console.log('📝 Preserving local variables:')
  Object.keys(localVars).forEach(key => {
    console.log(`   - ${key}`)
  })
  console.log()
  
  // Pull from Vercel (this will overwrite .env.local)
  try {
    execSync('npx vercel env pull .env.local', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    })
    console.log('\n✅ Pulled Vercel environment variables\n')
    
    // Merge: Read Vercel's .env.local and add back local variables
    const vercelEnv = fs.readFileSync(envLocalPath, 'utf8')
    const lines = vercelEnv.split('\n')
    
    // Add local variables at the end
    const localLines = Object.entries(localVars).map(([key, value]) => {
      return `${key}="${value}"`
    })
    
    const mergedEnv = [...lines, ...localLines].join('\n')
    fs.writeFileSync(envLocalPath, mergedEnv)
    
    console.log('✅ Merged Vercel and local environment variables')
    console.log('✅ Local variables preserved\n')
  } catch (error) {
    console.error('❌ Failed to pull Vercel environment variables:', error.message)
    // Restore backup
    if (fs.existsSync(envLocalBackupPath)) {
      fs.writeFileSync(envLocalPath, fs.readFileSync(envLocalBackupPath, 'utf8'))
      console.log('✅ Restored .env.local from backup')
    }
    process.exit(1)
  }
} else {
  // No .env.local exists, just pull from Vercel
  try {
    execSync('npx vercel env pull .env.local', { 
      stdio: 'inherit',
      cwd: path.join(__dirname, '..')
    })
    console.log('\n✅ Pulled Vercel environment variables\n')
  } catch (error) {
    console.error('❌ Failed to pull Vercel environment variables:', error.message)
    process.exit(1)
  }
}

console.log('🎉 Done!')

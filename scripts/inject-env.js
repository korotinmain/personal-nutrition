const fs = require('fs');
const path = require('path');

// Get environment variables (try both naming conventions)
const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

// Check if we're in a CI/build environment
const isCI = process.env.CI || process.env.VERCEL;

if (isCI && (!supabaseUrl || !supabaseAnonKey)) {
  console.error('ERROR: Missing required environment variables in CI environment');
  console.error('Required: SUPABASE_URL and SUPABASE_ANON_KEY');
  console.error('Set these in your Vercel project settings');
  process.exit(1);
}

// Only inject if environment variables are set (for Vercel/production builds)
if (supabaseUrl && supabaseAnonKey) {
  console.log('Injecting environment variables...');
  console.log('SUPABASE_URL:', supabaseUrl.substring(0, 20) + '...');

  // Read and update environment.ts
  const envPath = path.join(__dirname, '../src/environments/environment.ts');
  let envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace('__SUPABASE_URL__', supabaseUrl);
  envContent = envContent.replace('__SUPABASE_ANON_KEY__', supabaseAnonKey);
  fs.writeFileSync(envPath, envContent);

  console.log('✓ Environment variables injected successfully');
} else {
  console.log('No environment variables found, using local configuration');
}

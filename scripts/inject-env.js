const fs = require('fs');
const path = require('path');

// Get environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// Only inject if environment variables are set (for Vercel/production builds)
if (supabaseUrl && supabaseAnonKey) {
  console.log('Injecting environment variables...');

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

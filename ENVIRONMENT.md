# Environment Setup

## Local Development

For local development, your credentials are in `src/environments/environment.local.ts` (not tracked by git).

## Vercel Deployment

Set these environment variables in your Vercel project settings:

1. `SUPABASE_URL` - Your Supabase project URL
2. `SUPABASE_ANON_KEY` - Your Supabase anon/public key

The build process will automatically inject these values during deployment.

### How to add environment variables in Vercel:

1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add these two variables (for Production, Preview, and Development):
   - **Key:** `SUPABASE_URL`  
     **Value:** `https://qnesjgqdpsgklacejjpr.supabase.co`
   - **Key:** `SUPABASE_ANON_KEY`  
     **Value:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFuZXNqZ3FkcHNna2xhY2VqanByIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk4MTA2NTYsImV4cCI6MjA4NTM4NjY1Nn0.wpc6GHvXXDbspfWvCaBI3IeMasnLFrMr8xlcCRhhk3s`
4. Save
5. Go to Deployments → Click "..." on latest → Redeploy

⚠️ **Important**: Make sure to check all three boxes (Production, Preview, Development) when adding the variables.

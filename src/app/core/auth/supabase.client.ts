import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from '../config/env';

// Only initialize if we have valid credentials
const hasValidCredentials =
  env.supabaseUrl &&
  env.supabaseAnonKey &&
  !env.supabaseUrl.includes('your-project') &&
  !env.supabaseAnonKey.includes('your-anon-key');

export const supabase: SupabaseClient = hasValidCredentials
  ? createClient(env.supabaseUrl, env.supabaseAnonKey)
  : (null as any); // Will be handled gracefully in AuthService

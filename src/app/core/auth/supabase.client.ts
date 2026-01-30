import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

// Only initialize if we have valid credentials
const hasValidCredentials =
  environment.supabaseUrl &&
  environment.supabaseAnonKey &&
  !environment.supabaseUrl.includes('your-project') &&
  !environment.supabaseAnonKey.includes('your-anon-key');

export const supabase: SupabaseClient = hasValidCredentials
  ? createClient(environment.supabaseUrl, environment.supabaseAnonKey)
  : (null as any); // Will be handled gracefully in AuthService

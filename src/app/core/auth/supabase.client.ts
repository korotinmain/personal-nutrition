import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

const placeholderValues = new Set([
  '__SUPABASE_URL__',
  '__SUPABASE_ANON_KEY__',
  'YOUR_SUPABASE_URL',
  'YOUR_SUPABASE_ANON_KEY',
]);

const isPlaceholder = (value: string | undefined) =>
  !value ||
  placeholderValues.has(value) ||
  value.includes('your-project') ||
  value.includes('your-anon-key');

// Only initialize if we have valid credentials.
const hasValidCredentials =
  !isPlaceholder(environment.supabaseUrl) && !isPlaceholder(environment.supabaseAnonKey);

export const supabase: SupabaseClient = hasValidCredentials
  ? createClient(environment.supabaseUrl, environment.supabaseAnonKey)
  : (null as any); // Will be handled gracefully in AuthService

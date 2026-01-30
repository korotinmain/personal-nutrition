import { environment } from '../../../environments/environment.development';

export const env = {
  supabaseUrl: environment.supabaseUrl,
  supabaseAnonKey: environment.supabaseAnonKey,
  production: environment.production,
};

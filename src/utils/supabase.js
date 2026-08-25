import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase URL or Anon Key is missing in environment variables. Falling back to dummy client to prevent crashes.');
}

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ error: new Error('Supabase is not configured.') }),
        signUp: async () => ({ error: new Error('Supabase is not configured.') }),
        signOut: async () => ({ error: null }),
        resetPasswordForEmail: async () => ({ error: new Error('Supabase is not configured.') }),
        updateUser: async () => ({ error: new Error('Supabase is not configured.') }),
        signInWithOAuth: async () => ({ error: new Error('Supabase is not configured.') }),
      }
    };

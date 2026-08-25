import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        onAuthStateChange: () => {
          console.warn('Supabase configuration is missing. Authentication is disabled.');
          return { data: { subscription: { unsubscribe: () => {} } } };
        },
        getSession: async () => {
          return { data: { session: null }, error: new Error('Supabase configuration is missing. Please check your environment variables.') };
        },
        getUser: async () => {
          return { data: { user: null }, error: new Error('Supabase configuration is missing. Please check your environment variables.') };
        },
        signInWithPassword: async () => {
          throw new Error('Supabase configuration is missing. Please check your environment variables.');
        },
        signUp: async () => {
          throw new Error('Supabase configuration is missing. Please check your environment variables.');
        },
        signOut: async () => {
          return { error: null };
        },
        resetPasswordForEmail: async () => {
          throw new Error('Supabase configuration is missing. Please check your environment variables.');
        },
        updateUser: async () => {
          throw new Error('Supabase configuration is missing. Please check your environment variables.');
        },
        signInWithOAuth: async () => {
          throw new Error('Supabase configuration is missing. Please check your environment variables.');
        },
      }
    };

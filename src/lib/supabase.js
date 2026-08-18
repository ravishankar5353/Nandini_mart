import { createClient } from '@supabase/supabase-js';

// ─── Supabase Configuration ───────────────────────────────────────────────────
// 1. Go to https://supabase.com  →  "New project"
// 2. Copy your Project URL and anon/public key
// 3. Paste them below (or into a .env file as VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY)
//
// ⚠️  Until you add real keys, the app runs fully on localStorage (no Supabase calls).
// ─────────────────────────────────────────────────────────────────────────────

const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  || '';
const SUPABASE_KEY  = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// True only when both values are present and look like real Supabase credentials
export const SUPABASE_ENABLED =
  Boolean(SUPABASE_URL && SUPABASE_KEY && SUPABASE_URL.includes('supabase.co'));

export const supabase = SUPABASE_ENABLED
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

// ─── Helper: safe Supabase query ─────────────────────────────────────────────
// Wraps any Supabase call so that if Supabase is disabled (or the call fails)
// the caller can fall back to localStorage gracefully.
export const sbQuery = async (fn) => {
  if (!SUPABASE_ENABLED) return { data: null, error: new Error('Supabase not configured') };
  try {
    return await fn(supabase);
  } catch (err) {
    console.warn('[Supabase] Query error:', err);
    return { data: null, error: err };
  }
};

export default supabase;

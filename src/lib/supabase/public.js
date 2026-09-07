import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// ---------------------------------------------------------------------------
// Plain anon-key Supabase client for public, unauthenticated reads (the
// `site_content` table — pricing/business-info/image overrides — rendered
// for every visitor on public pages). No session/cookie handling needed
// here; it's the same "anon" role for every request, same as a browser
// that never signed in. Row Level Security on `site_content` only grants
// this role SELECT, never INSERT/UPDATE/DELETE, so this client genuinely
// cannot write anything even though the code calling it never checks auth.
// ---------------------------------------------------------------------------

function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  return createSupabaseClient(url, anonKey, {
    auth: { persistSession: false },
  });
}

const globalForSupabase = globalThis;

export const supabasePublic = globalForSupabase.__manojSupabasePublic ?? createPublicClient();

if (process.env.NODE_ENV !== "production") {
  globalForSupabase.__manojSupabasePublic = supabasePublic;
}

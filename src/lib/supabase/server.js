import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// ---------------------------------------------------------------------------
// Cookie-aware Supabase client for Server Components, Route Handlers and the
// admin login/logout endpoints — this is the client that knows "who is
// signed in" for the current request, via the standard @supabase/ssr
// cookie-adapter pattern. Uses the public anon key; the user's own session
// (once signed in) is what grants any elevated access, enforced by
// Supabase's Row Level Security — this client never bypasses RLS.
//
// Privileged admin operations (reading/writing site content, enquiries,
// storage) use the separate service-role client in src/lib/supabase/admin.js
// instead — see that file for why.
// ---------------------------------------------------------------------------

export async function createClient() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
      "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
          } catch {
            // Called from a Server Component that can't set cookies (e.g. a
            // plain page render) — the middleware refreshes the session on
            // every request anyway, so this is safe to ignore.
          }
        },
      },
    }
  );
}

/**
 * Returns the currently signed-in admin user (or null), and never throws.
 * Optionally locks the panel down to one specific account via ADMIN_EMAIL —
 * useful if more than one person could otherwise sign in to this Supabase
 * project. Leave ADMIN_EMAIL unset to allow any authenticated user.
 */
export async function getAdminUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const allowedEmail = process.env.ADMIN_EMAIL;
    if (allowedEmail && user.email !== allowedEmail) return null;

    return user;
  } catch {
    return null;
  }
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminUser());
}

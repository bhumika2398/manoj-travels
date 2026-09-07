import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

// ---------------------------------------------------------------------------
// The standard Supabase + Next.js middleware pattern: a server client bound
// to the *request's* cookies for reading and the *response's* cookies for
// writing, so a refreshed session (Supabase rotates the access token
// automatically) is written back to the browser on every request. Returns
// the response to send on and the resolved user (or null) for the caller
// (src/middleware.js) to apply its own route-gating logic.
// ---------------------------------------------------------------------------

export async function getSessionUser(request) {
  let response = NextResponse.next({ request });

  // Supabase not configured yet (e.g. a fresh checkout before env vars are
  // set) — fail soft with "no user" rather than crashing every /admin
  // request, including /admin/login itself, which needs to stay reachable
  // so the "Supabase is not configured" messaging can actually be seen.
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return { response, user: null };
  }

  try {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          },
        },
      }
    );

    // IMPORTANT: do not add logic between createServerClient and this call —
    // Supabase's own docs warn that doing so can cause hard-to-debug session
    // refresh bugs.
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const allowedEmail = process.env.ADMIN_EMAIL;
    const authorized = user && (!allowedEmail || user.email === allowedEmail);

    return { response, user: authorized ? user : null };
  } catch (err) {
    console.error("[supabase/middleware] Session check failed:", err);
    return { response, user: null };
  }
}

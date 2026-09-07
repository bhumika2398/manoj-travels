import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/supabase/middleware";

// ---------------------------------------------------------------------------
// Server-side gate for every /admin page and every /api/admin route. Runs on
// the Edge runtime before the request reaches any page/route code, so an
// unauthenticated visitor never even renders an admin page or executes an
// admin API handler — this is the real protection, not a client-side check.
// Session state itself comes entirely from Supabase Auth (see
// src/lib/supabase/middleware.js) — refreshed here on every request.
// ---------------------------------------------------------------------------

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login"]);
const PUBLIC_API_PATHS = new Set(["/api/admin/auth/login", "/api/admin/auth/logout"]);

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  const isApi = pathname.startsWith("/api/admin");
  const isPublic = isApi ? PUBLIC_API_PATHS.has(pathname) : PUBLIC_ADMIN_PATHS.has(pathname);

  // Always run this first so a refreshed Supabase session cookie is written
  // back on every request, public or not.
  const { response, user } = await getSessionUser(request);

  if (isPublic) return response;
  if (user) return response;

  if (isApi) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("from", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { email, password } = body || {};
  if (!email || !password) {
    return NextResponse.json({ ok: false, error: "Email and password are required." }, { status: 422 });
  }

  let supabase;
  try {
    supabase = await createClient();
  } catch (err) {
    console.error("[admin/auth/login] Configuration error:", err.message);
    return NextResponse.json(
      { ok: false, error: "Admin login is not configured. Set the Supabase environment variables." },
      { status: 500 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return NextResponse.json({ ok: false, error: "Incorrect email or password." }, { status: 401 });
  }

  const allowedEmail = process.env.ADMIN_EMAIL;
  if (allowedEmail && data.user?.email !== allowedEmail) {
    await supabase.auth.signOut();
    return NextResponse.json({ ok: false, error: "This account is not authorized for admin access." }, { status: 403 });
  }

  return NextResponse.json({ ok: true });
}

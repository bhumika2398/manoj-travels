import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST() {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Not configured, or nothing to sign out of — either way logout should
    // never itself fail; there's no session left in the browser regardless
    // once this returns.
  }
  return NextResponse.json({ ok: true });
}

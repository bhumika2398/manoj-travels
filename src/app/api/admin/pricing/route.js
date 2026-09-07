import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/supabase/server";
import { getEditablePricingList, savePricing } from "@/lib/siteContent";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const tiers = await getEditablePricingList();
  return NextResponse.json({ ok: true, tiers });
}

const NUMERIC_FIELDS = ["price", "perKm", "extraKm", "extraHour", "minKmPerDay", "driverBata"];

export async function PUT(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { tiers, airportMessage } = body || {};
  if (!tiers || typeof tiers !== "object") {
    return NextResponse.json({ ok: false, error: "tiers is required." }, { status: 422 });
  }

  const tierUpdates = {};
  for (const [tierId, fields] of Object.entries(tiers)) {
    const clean = {};
    for (const field of NUMERIC_FIELDS) {
      if (fields[field] === undefined || fields[field] === "") continue;
      const num = Number(fields[field]);
      if (!Number.isFinite(num) || num < 0) {
        return NextResponse.json(
          { ok: false, error: `Invalid value for ${field} on ${tierId} — must be a positive number.` },
          { status: 422 }
        );
      }
      clean[field] = num;
    }
    if (Object.keys(clean).length > 0) tierUpdates[tierId] = clean;
  }

  try {
    await savePricing(tierUpdates, airportMessage);
  } catch (err) {
    console.error("[admin/pricing] Save failed:", err);
    return NextResponse.json({ ok: false, error: err.message || "Could not save pricing." }, { status: 500 });
  }

  // Reflect the change on the public site immediately rather than waiting
  // for the next scheduled revalidation.
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}

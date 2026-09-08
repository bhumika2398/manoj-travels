import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/supabase/server";
import { getBusinessInfo, getBusinessInfoOverride, saveBusinessInfo } from "@/lib/siteContent";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const [effective, override] = await Promise.all([getBusinessInfo(), getBusinessInfoOverride()]);
  return NextResponse.json({
    ok: true,
    current: {
      phonePrimary: effective.phone.primary,
      phoneSecondary: effective.phone.secondary,
      activeNumber: override.activeNumber === "secondary" ? "secondary" : "primary",
      whatsappNumber: effective.whatsapp.number.replace(/^91/, ""),
      email: effective.email,
      addressFull: effective.address.full,
    },
    isOverridden: {
      phonePrimary: Boolean(override.phonePrimary),
      phoneSecondary: Boolean(override.phoneSecondary),
      activeNumber: Boolean(override.activeNumber),
      whatsappNumber: Boolean(override.whatsappNumber),
      email: Boolean(override.email),
      addressFull: Boolean(override.addressFull),
    },
  });
}

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

  const { phonePrimary, phoneSecondary, activeNumber, whatsappNumber, email, addressFull } = body || {};

  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 422 });
  }

  if (activeNumber && activeNumber !== "primary" && activeNumber !== "secondary") {
    return NextResponse.json({ ok: false, error: "Active Website Contact Number must be Contact Number 1 or Contact Number 2." }, { status: 422 });
  }

  const cleanPhones = {};
  for (const [key, label, value] of [
    ["phonePrimary", "Contact Number 1", phonePrimary],
    ["phoneSecondary", "Contact Number 2", phoneSecondary],
    ["whatsappNumber", "WhatsApp Enquiry Number", whatsappNumber],
  ]) {
    if (!value) continue;
    const digits = String(value).replace(/\D/g, "").slice(-10);
    if (digits.length !== 10) {
      return NextResponse.json({ ok: false, error: `${label} must be a valid 10-digit number.` }, { status: 422 });
    }
    cleanPhones[key] = digits;
  }

  try {
    await saveBusinessInfo({ ...cleanPhones, activeNumber, email, addressFull });
  } catch (err) {
    console.error("[admin/settings] Save failed:", err);
    return NextResponse.json({ ok: false, error: err.message || "Could not save." }, { status: 500 });
  }
  revalidatePath("/", "layout");

  return NextResponse.json({ ok: true });
}

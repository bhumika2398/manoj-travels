import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/validation";
import { appendEnquiry } from "@/lib/enquiryStore";

// Booking-specific endpoint (hero selector "Book / Enquire Now"). Kept as a
// thin wrapper so it can diverge from /api/enquiry later (e.g. different
// downstream routing) without touching the shared validation logic.
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { isValid, errors } = validateEnquiry(data);
  if (!isValid) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  // TODO: connect to email/CRM here.
  await appendEnquiry("booking", data);
  console.log("[booking]", JSON.stringify(data));

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { validateEnquiry } from "@/lib/validation";
import { appendEnquiry } from "@/lib/enquiryStore";

// Generic enquiry endpoint used by the hero booking selector and enquiry
// forms across the site. Persists to the local file-backed store (visible
// in /admin/enquiries) and logs server-side. Swap the TODO block for an
// email/CRM integration when one is connected — the validated payload
// shape below is ready to forward as-is.
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

  // TODO: connect to email/CRM here, e.g.:
  // await sendEnquiryEmail(data);
  await appendEnquiry("enquiry", data);
  console.log("[enquiry]", JSON.stringify(data));

  return NextResponse.json({ ok: true });
}

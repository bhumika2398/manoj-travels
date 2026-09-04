import { NextResponse } from "next/server";
import { appendEnquiry } from "@/lib/enquiryStore";

// Contact page enquiry endpoint. Fields are looser than the booking form
// (name, phone/email, message) so validation is intentionally minimal.
export async function POST(request) {
  let data;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { name, phone, message } = data || {};
  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 422 }
    );
  }

  // TODO: connect to email/CRM here.
  await appendEnquiry("contact", data);
  console.log("[contact]", JSON.stringify({ name, phone, message }));

  return NextResponse.json({ ok: true });
}

import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/supabase/server";
import { readEnquiries, updateEnquiryStatus } from "@/lib/enquiryStore";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const enquiries = await readEnquiries();
  return NextResponse.json({ ok: true, enquiries });
}

export async function PATCH(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { id, status } = body || {};
  if (!id || !status) {
    return NextResponse.json({ ok: false, error: "id and status are required." }, { status: 422 });
  }

  try {
    const updated = await updateEnquiryStatus(id, status);
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Enquiry not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true, enquiry: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 400 });
  }
}

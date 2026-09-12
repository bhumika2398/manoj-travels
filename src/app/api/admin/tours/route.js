import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/supabase/server";
import { getAllTourPackages, addTourPackage, updateTourPackage, deleteTourPackage } from "@/lib/siteContent";

function validateFields(body, { requireTitle }) {
  const fields = {};
  if (requireTitle || body.title !== undefined) {
    if (!body.title || typeof body.title !== "string") {
      return { error: "Title is required." };
    }
    fields.title = body.title.trim();
  }
  if (body.description !== undefined) fields.description = String(body.description || "").trim();
  if (body.priceUnit !== undefined) fields.priceUnit = String(body.priceUnit || "per head").trim();
  if (body.image !== undefined) fields.image = body.image || null;
  if (body.active !== undefined) fields.active = Boolean(body.active);
  if (requireTitle || body.price !== undefined) {
    const num = Number(body.price);
    if (!Number.isFinite(num) || num < 0) {
      return { error: "Price must be a positive number." };
    }
    fields.price = num;
  }
  return { fields };
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const packages = await getAllTourPackages();
  return NextResponse.json({ ok: true, packages });
}

export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { fields, error } = validateFields(body || {}, { requireTitle: true });
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 422 });
  }

  try {
    const packages = await addTourPackage(fields);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, packages });
  } catch (err) {
    console.error("[admin/tours] Create failed:", err);
    return NextResponse.json({ ok: false, error: err.message || "Could not create the package." }, { status: 500 });
  }
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

  const { id, ...rest } = body || {};
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing package id." }, { status: 422 });
  }

  const { fields, error } = validateFields(rest, { requireTitle: false });
  if (error) {
    return NextResponse.json({ ok: false, error }, { status: 422 });
  }

  try {
    const packages = await updateTourPackage(id, fields);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, packages });
  } catch (err) {
    console.error("[admin/tours] Update failed:", err);
    return NextResponse.json({ ok: false, error: err.message || "Could not update the package." }, { status: 500 });
  }
}

export async function DELETE(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const { id } = body || {};
  if (!id) {
    return NextResponse.json({ ok: false, error: "Missing package id." }, { status: 422 });
  }

  try {
    const packages = await deleteTourPackage(id);
    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, packages });
  } catch (err) {
    console.error("[admin/tours] Delete failed:", err);
    return NextResponse.json({ ok: false, error: err.message || "Could not delete the package." }, { status: 500 });
  }
}

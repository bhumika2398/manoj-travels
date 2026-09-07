import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isAdminAuthenticated } from "@/lib/supabase/server";
import { getImageOverrides, setImageOverride, removeImageOverride } from "@/lib/siteContent";
import { uploadImage, deleteImage, validateImageFile, hasStorageConfigured } from "@/lib/storage";
import { fleet } from "@/data/fleet";
import { destinations } from "@/data/destinations";

function buildCatalog(overrides) {
  const fleetItems = fleet.map((v) => ({
    key: v.image,
    group: "Fleet",
    label: v.name,
    originalUrl: v.image,
    currentUrl: overrides[v.image] || v.image,
    isOverridden: Boolean(overrides[v.image]),
  }));
  const destinationItems = destinations.map((d) => ({
    key: d.image,
    group: "Destinations",
    label: d.name,
    originalUrl: d.image,
    currentUrl: overrides[d.image] || d.image,
    isOverridden: Boolean(overrides[d.image]),
  }));
  return [...fleetItems, ...destinationItems];
}

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  const overrides = await getImageOverrides();
  return NextResponse.json({ ok: true, images: buildCatalog(overrides), storageConfigured: hasStorageConfigured() });
}

export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: "Unauthorized." }, { status: 401 });
  }
  if (!hasStorageConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Image storage is not configured. Set the Supabase environment variables." },
      { status: 500 }
    );
  }

  let formData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid upload." }, { status: 400 });
  }

  const key = formData.get("key");
  const file = formData.get("file");

  if (!key || typeof key !== "string") {
    return NextResponse.json({ ok: false, error: "Missing target image key." }, { status: 422 });
  }
  const isKnown =
    fleet.some((v) => v.image === key) || destinations.some((d) => d.image === key);
  if (!isKnown) {
    return NextResponse.json({ ok: false, error: "Unknown image reference." }, { status: 404 });
  }

  const validationError = validateImageFile(file);
  if (validationError) {
    return NextResponse.json({ ok: false, error: validationError }, { status: 422 });
  }

  const folder = key.startsWith("/images/fleet/") ? "fleet" : "destinations";

  try {
    const overrides = await getImageOverrides();
    const previousUrl = overrides[key];

    const newUrl = await uploadImage(file, folder);
    await setImageOverride(key, newUrl);

    // Clean up the previous replacement (never the original /images/* asset).
    if (previousUrl) await deleteImage(previousUrl);

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true, url: newUrl });
  } catch (err) {
    console.error("[admin/images] Upload failed:", err);
    return NextResponse.json({ ok: false, error: "Upload failed. Please try again." }, { status: 500 });
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

  const { key } = body || {};
  if (!key) {
    return NextResponse.json({ ok: false, error: "Missing image key." }, { status: 422 });
  }

  try {
    const overrides = await getImageOverrides();
    const currentUrl = overrides[key];
    await removeImageOverride(key);
    if (currentUrl) await deleteImage(currentUrl);

    revalidatePath("/", "layout");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/images] Delete failed:", err);
    return NextResponse.json({ ok: false, error: "Could not remove the image. Please try again." }, { status: 500 });
  }
}

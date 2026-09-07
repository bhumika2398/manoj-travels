import { supabaseAdmin, hasSupabase } from "@/lib/supabase/admin";

// ---------------------------------------------------------------------------
// Cloud image storage for admin uploads — Supabase Storage. Persists across
// deployments and works on serverless hosting, unlike writing into
// /public, which is read-only at runtime on Vercel and wouldn't survive a
// redeploy anyway. Everything here goes through the service-role client
// (src/lib/supabase/admin.js), since these functions are only ever called
// from already-authenticated /api/admin/* routes.
// ---------------------------------------------------------------------------

const BUCKET = "site-images";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5MB
export const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
export const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

export function validateImageFile(file) {
  if (!file) return "No file was provided.";
  if (!ALLOWED_TYPES.has(file.type)) {
    return "Unsupported file type. Please upload a JPG, PNG, WEBP or AVIF image.";
  }
  const ext = `.${file.name.split(".").pop()?.toLowerCase()}`;
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    return "Unsupported file extension.";
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return "Image is too large — please upload a file under 5MB.";
  }
  return null;
}

export function hasStorageConfigured() {
  return hasSupabase();
}

/**
 * Uploads a validated image to the `site-images` bucket under a folder
 * namespace (e.g. "fleet" or "destinations") and returns its public URL.
 * The bucket is public (read), so the URL works directly in <Image> —
 * writes only ever happen through this service-role client.
 */
export async function uploadImage(file, folder) {
  if (!hasSupabase()) {
    throw new Error("Supabase is not configured.");
  }
  const ext = file.name.split(".").pop()?.toLowerCase();
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;

  const { error } = await supabaseAdmin.storage.from(BUCKET).upload(path, file, {
    contentType: file.type,
    upsert: false,
  });
  if (error) throw error;

  const { data } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/** Deletes a previously-uploaded image by its public URL. Safe to call on a URL that isn't in our bucket. */
export async function deleteImage(url) {
  if (!hasSupabase() || !url) return;
  const marker = `/storage/v1/object/public/${BUCKET}/`;
  const index = url.indexOf(marker);
  if (index === -1) return; // not one of ours (e.g. a static /images path) — never touch it

  const path = url.slice(index + marker.length);
  try {
    const { error } = await supabaseAdmin.storage.from(BUCKET).remove([path]);
    if (error) throw error;
  } catch (err) {
    console.error("[storage] Failed to delete image:", err);
  }
}

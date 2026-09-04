import { promises as fs } from "fs";
import path from "path";

// ---------------------------------------------------------------------------
// Lightweight, file-backed enquiry log so the admin panel has something real
// to show without pulling in a database dependency.
//
// This is intentionally simple and NOT a production data layer:
//   - It writes to a JSON file on local disk (`.data/enquiries.json`).
//   - On serverless hosts (Vercel, etc.) the filesystem is ephemeral/
//     read-only outside `/tmp`, so writes will silently no-op there (every
//     call is wrapped in try/catch) rather than crashing the request.
//   - Before going to production, swap `readEnquiries`/`appendEnquiry`
//     below for calls to a real database (Postgres, Supabase, etc.) — every
//     call site (API routes + the admin Enquiries page) already goes
//     through this module, so that's the only place that needs to change.
// ---------------------------------------------------------------------------

const DATA_DIR = path.join(process.cwd(), ".data");
const FILE = path.join(DATA_DIR, "enquiries.json");

async function readAll() {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeAll(entries) {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(entries, null, 2), "utf-8");
  } catch {
    // Read-only filesystem (e.g. serverless) — fail silently, see note above.
  }
}

export async function appendEnquiry(source, data) {
  const entries = await readAll();
  entries.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    source, // "booking" | "enquiry" | "contact"
    status: "new", // "new" | "contacted" | "closed"
    receivedAt: new Date().toISOString(),
    ...data,
  });
  await writeAll(entries.slice(0, 500)); // keep the log bounded
  return entries[0];
}

export async function readEnquiries() {
  return readAll();
}

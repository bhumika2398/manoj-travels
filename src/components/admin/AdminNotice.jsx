export function AdminNotice() {
  return (
    <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
      <strong className="font-semibold">Preview mode.</strong> This admin panel is not
      behind authentication and vehicle/destination/blog edits here are UI-only
      (not persisted) until a database and login are connected — see{" "}
      <code className="rounded bg-amber-100 px-1 py-0.5 text-[13px]">src/lib/enquiryStore.js</code>{" "}
      and the comments in <code className="rounded bg-amber-100 px-1 py-0.5 text-[13px]">src/app/admin/</code>{" "}
      for where to wire in real auth and persistence. Enquiries below are real —
      they're read from the local file-backed log.
    </div>
  );
}

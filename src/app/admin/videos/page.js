import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminCard } from "@/components/admin/AdminCard";

const HERO_VIDEOS = [
  { label: "Hero — Clip 1", path: "/videos/hero/jog-falls.mp4" },
  { label: "Hero — Clip 2", path: "/videos/hero/munnarr.mp4" },
];

const SECTION_VIDEOS = [
  { label: "Closing cinematic chapter (Kerala)", path: "/videos/sections/kerala.mp4" },
];

function VideoRow({ item }) {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-100 py-4 last:border-0 sm:flex-row sm:items-center">
      <video src={item.path} muted playsInline className="h-28 w-48 shrink-0 rounded-lg bg-gray-100 object-cover" />
      <div className="min-w-0 flex-1">
        <p className="font-medium text-gray-900">{item.label}</p>
        <p className="mt-0.5 truncate text-xs text-gray-400">{item.path}</p>
      </div>
      <button
        type="button"
        disabled
        title="Connect file storage (e.g. S3/Cloudinary) to enable replacing files from here"
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-400"
      >
        Replace file
      </button>
    </div>
  );
}

export default function AdminVideosPage() {
  return (
    <>
      <AdminTopbar title="Videos" />
      <div className="p-4 md:p-8">
        <AdminCard className="mb-6">
          <p className="text-sm text-gray-500">
            Videos are served straight from{" "}
            <code className="rounded bg-gray-100 px-1 py-0.5 text-[13px]">public/videos/</code>. Uploading a
            replacement from the browser needs an object-storage integration (S3, Cloudinary, etc.) — until
            that&rsquo;s connected, replace a file by dropping the new video into the matching folder with the
            same filename and redeploying.
          </p>
        </AdminCard>

        <AdminCard className="mb-6">
          <h2 className="text-base font-semibold text-gray-900">Hero Videos</h2>
          <p className="mt-1 text-sm text-gray-500">
            Played as a seamless crossfade loop (Clip 1 → Clip 2 → Clip 1 …) on the homepage hero.
          </p>
          <div className="mt-4">
            {HERO_VIDEOS.map((v) => (
              <VideoRow key={v.path} item={v} />
            ))}
          </div>
        </AdminCard>

        <AdminCard>
          <h2 className="text-base font-semibold text-gray-900">Section Videos</h2>
          <p className="mt-1 text-sm text-gray-500">
            Played as the homepage&apos;s large cinematic closing moment, right before the final Book Now CTA.
          </p>
          <div className="mt-4">
            {SECTION_VIDEOS.map((v) => (
              <VideoRow key={v.path} item={v} />
            ))}
          </div>
        </AdminCard>
      </div>
    </>
  );
}

import { supabase, type Photo } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function PhotosPage() {
  const { data } = await supabase
    .from("photos")
    .select("*")
    .order("id", { ascending: false });

  const photos = (data as Photo[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-6">
        <h1
          className="text-3xl font-bold inline-block"
          style={{
            fontFamily: '"Times New Roman", serif',
            color: "#ff69b4",
            textShadow: "0 0 10px #ff69b4, 2px 2px 0 #000",
          }}
        >
          📷 Photo Gallery
        </h1>
        <p className="text-yellow text-sm mt-2 font-mono">
          ★ Screenshots, pictures, and random images ★
        </p>
      </div>

      <div className="retro-box mb-6">
        <div className="window-title">
          <span>🖼 My Photos</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          {photos.length === 0 ? (
            <p className="text-center text-zinc-500 py-8">
              No photos yet. Stay tuned!
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="retro-box text-center"
                  style={{ borderWidth: 2 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.url}
                    alt={photo.caption ?? ""}
                    className="w-full h-48 object-cover border border-zinc-400 mb-2"
                  />
                  {photo.caption && (
                    <p className="text-xs text-zinc-700 font-bold">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-6">
        <a href="/" className="nav-link text-sm">
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
}

import { supabase, type FriendLink } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function LinksPage() {
  const { data } = await supabase
    .from("friend_links")
    .select("*")
    .order("id", { ascending: true });

  const links = (data as FriendLink[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="text-center mb-6">
        <h1
          className="text-3xl font-bold inline-block"
          style={{
            fontFamily: '"Times New Roman", serif',
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff, 2px 2px 0 #000",
          }}
        >
          🌐 Webring / Links
        </h1>
        <p className="text-yellow text-sm mt-2 font-mono">
          ★ Cool places on the information superhighway ★
        </p>
      </div>

      <div className="retro-box mb-6">
        <div className="window-title">
          <span>🔗 My Favorite Sites</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          {links.length === 0 ? (
            <p className="text-center text-zinc-500 py-4">
              No links yet. The webring is empty!
            </p>
          ) : (
            <div className="space-y-3">
              {links.map((link) => (
                <div key={link.id} className="retro-box" style={{ borderWidth: 2 }}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-sm hover:underline"
                  >
                    {link.name}
                  </a>
                  {link.description && (
                    <p className="text-xs text-zinc-600 mt-1">— {link.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 88x31 badge section */}
      <div className="retro-box mb-6 text-center">
        <div className="window-title">
          <span>🏷 88x31 Badges</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <div className="flex flex-wrap justify-center gap-3 py-4">
            <img
              src="https://badges.orangeysky.com/badges/nextjs.png"
              alt="Next.js"
              width={88}
              height={31}
              className="border border-zinc-400"
            />
            <img
              src="https://badges.orangeysky.com/badges/supabase.png"
              alt="Supabase"
              width={88}
              height={31}
              className="border border-zinc-400"
            />
            <span className="bg-black text-lime text-xs px-2 py-1 border border-zinc-600 self-center" style={{ color: "#32cd32" }}>
              BEST VIEWED IN ANY BROWSER
            </span>
          </div>
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

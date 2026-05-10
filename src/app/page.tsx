import Link from "next/link";
import { supabase, type Update } from "@/lib/supabase";
import ReplySection from "@/components/ReplySection";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: updates } = await supabase
    .from("updates")
    .select("*")
    .order("id", { ascending: false })
    .limit(10);

  const updateList = (updates as Update[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* === Under Construction Banner === */}
      <div className="construction-banner blink mb-6">
        🚧 UNDER CONSTRUCTION 🚧
      </div>

      {/* === Welcome Box === */}
      <div className="retro-box mb-6">
        <div className="window-title">
          <span>📁 welcome.txt</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <p className="text-lg leading-relaxed">
            嗨～欢迎来到 Wayne Wang 的网上小窝 🏠
          </p>
          <p className="mt-3 leading-relaxed">
            站主是个卑微的码农，上课小手机，下课去觅食，项目就ai。这个网站什么都不是，就喜欢在这个别人找不到的网络小角落苟活着。这里有留言板，站主不吃压力，注意发言。
          </p>
        </div>
      </div>

      {/* === Visitor Counter === */}
      <div className="retro-box mb-6 text-center">
        <p className="text-sm font-bold mb-1">You are visitor #</p>
        <span className="counter">000042</span>
        <p className="text-xs mt-1 text-zinc-600">
          (since 2026.05.10)
        </p>
      </div>

      {/* === Action Buttons === */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <a
          href="https://github.com/waynewang0610-design"
          target="_blank"
          rel="noopener noreferrer"
          className="retro-btn"
        >
          📂 My GitHub
        </a>
        <Link href="/guestbook" className="retro-btn retro-btn-yellow">
          📝 Sign Guestbook
        </Link>
        <a href="mailto:wayne.wang0610@gmail.com" className="retro-btn retro-btn-pink">
          ✉ Email Me
        </a>
      </div>

      <hr className="rainbow-hr" />

      {/* === Updates Section === */}
      <div className="retro-box mt-6">
        <div className="window-title">
          <span>📋 Latest Updates</span>
          <Link href="/admin" className="text-white text-xs hover:underline">
            [Admin]
          </Link>
        </div>
        <div className="retro-inset">
          {updateList.length === 0 ? (
            <p className="text-zinc-500 text-center py-4">
              No updates yet... check back soon!
            </p>
          ) : (
            <div className="space-y-3">
              {updateList.map((item, i) => (
                <div key={item.id}>
                  <div className="retro-box" style={{ borderWidth: 2 }}>
                    <div className="flex items-start gap-3">
                      <span
                        className="shrink-0 text-xs font-bold px-2 py-1 bg-black text-lime"
                        style={{ fontFamily: '"Courier New", monospace' }}
                      >
                        {item.date}
                      </span>
                      <span className="text-sm">{item.content}</span>
                      {i === 0 && (
                        <span className="blink text-hot-pink text-xs font-bold">NEW!</span>
                      )}
                    </div>
                  </div>
                  <ReplySection parentType="update" parentId={item.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* === 90s badges === */}
      <div className="text-center mt-8 space-y-2">
        <p className="text-xs text-zinc-400 font-mono">
          This site is powered by Next.js + Supabase
        </p>
        <div className="flex justify-center gap-3 text-xs font-mono">
          <span className="bg-black text-lime px-2 py-1 border border-zinc-700">HTML 4.0</span>
          <span className="bg-black text-cyan px-2 py-1 border border-zinc-700">CSS 3.0</span>
          <span className="bg-black text-yellow px-2 py-1 border border-zinc-700">JS</span>
        </div>
      </div>
    </div>
  );
}

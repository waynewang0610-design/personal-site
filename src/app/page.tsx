import Link from "next/link";
import { supabase, type Update } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { data: updates } = await supabase
    .from("updates")
    .select("*")
    .order("id", { ascending: false })
    .limit(10);

  const updateList = (updates as Update[]) ?? [];

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <section className="mb-20">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">你好，我是 Wayne Wang 👋</h1>
        <p className="mb-6 max-w-lg text-lg leading-relaxed text-zinc-600">
          一个热爱技术和创造的人。这里是我在互联网上的小角落，记录我的学习和思考。欢迎你来逛逛。
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/waynewang0610-design"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-4 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            GitHub
          </a>
          <Link
            href="/guestbook"
            className="inline-flex h-10 items-center rounded-lg border border-zinc-300 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 transition-colors"
          >
            给我留言 →
          </Link>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">最新动态</h2>
          <Link
            href="/admin"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            管理
          </Link>
        </div>
        {updateList.length === 0 ? (
          <p className="text-zinc-400">还没有动态，去后台发布第一条吧。</p>
        ) : (
          <div className="space-y-4">
            {updateList.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border border-zinc-100 p-4 hover:border-zinc-200 transition-colors"
              >
                <time className="shrink-0 text-sm text-zinc-400">{item.date}</time>
                <p className="text-zinc-700">{item.content}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

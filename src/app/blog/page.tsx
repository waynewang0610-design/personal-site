import Link from "next/link";
import { supabase, type BlogPost } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function BlogListPage() {
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .order("id", { ascending: false });

  const posts = (data as BlogPost[]) ?? [];

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
          📝 Blog
        </h1>
        <p className="text-yellow text-sm mt-2 font-mono">
          ★ Random thoughts, tutorials, and brain dumps ★
        </p>
      </div>

      {posts.length === 0 ? (
        <div className="retro-box text-center py-8">
          <p className="text-zinc-500">No posts yet. Coming soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="block">
              <div className="retro-box hover:border-cyan transition-colors" style={{ borderWidth: 2 }}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold" style={{ fontFamily: '"Times New Roman", serif' }}>
                      {post.title}
                    </h2>
                    <p className="text-xs text-zinc-500 mt-1 font-mono">{post.date}</p>
                  </div>
                  <span className="retro-btn text-xs" style={{ padding: "2px 10px" }}>
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="text-center mt-6">
        <a href="/" className="nav-link text-sm">
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
}

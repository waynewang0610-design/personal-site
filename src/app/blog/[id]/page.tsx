import { notFound } from "next/navigation";
import { supabase, type BlogPost } from "@/lib/supabase";
import ReplySection from "@/components/ReplySection";

export const dynamic = "force-dynamic";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (!data) notFound();

  const post = data as BlogPost;

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6">
        <a href="/blog" className="nav-link text-sm">
          ← Back to Blog
        </a>
      </div>

      <div className="retro-box mb-6">
        <div className="window-title">
          <span>📝 {post.title}</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <p className="text-xs text-zinc-500 font-mono mb-4">{post.date}</p>
          <div
            className="prose prose-sm max-w-none leading-relaxed whitespace-pre-wrap"
            style={{ fontFamily: '"Comic Sans MS", "Microsoft YaHei", cursive' }}
          >
            {post.content}
          </div>
        </div>
      </div>

      <ReplySection parentType="update" parentId={post.id} />

      <div className="text-center mt-6">
        <a href="/blog" className="nav-link text-sm">
          ← Back to Blog
        </a>
      </div>
    </div>
  );
}

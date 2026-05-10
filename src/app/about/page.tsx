import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { data: configData } = await supabase
    .from("site_config")
    .select("value")
    .eq("key", "about_content")
    .single();

  const aboutContent = configData?.value ?? "暂无内容。";

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
          About Me
        </h1>
      </div>

      <div className="retro-box mb-6">
        <div className="window-title">
          <span>📁 whoami.txt</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <p className="leading-relaxed whitespace-pre-wrap">{aboutContent}</p>
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

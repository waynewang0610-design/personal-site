export default function AboutPage() {
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

      {/* Bio */}
      <div className="retro-box mb-6">
        <div className="window-title">
          <span>📁 whoami.txt</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <p className="leading-relaxed">
            Hi, I&apos;m Wayne Wang — a CS student who spends way too much time on the
            internet. I write code, play with AI, and build random stuff that
            nobody asked for. This site is my little corner of the web where I
            can be myself without algorithms telling me what to do.
          </p>
        </div>
      </div>

      {/* Skills */}
      <div className="retro-box mb-6">
        <div className="window-title">
          <span>🛠 skills.exe</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <ul className="space-y-1 text-sm">
            <li><span className="text-yellow">◆</span> Python, JavaScript, TypeScript</li>
            <li><span className="text-yellow">◆</span> React, Next.js, Node.js</li>
            <li><span className="text-yellow">◆</span> Supabase, PostgreSQL</li>
            <li><span className="text-yellow">◆</span> AI / LLM stuff (Claude is my copilot)</li>
            <li><span className="text-yellow">◆</span> Git, Linux, VSCode</li>
          </ul>
        </div>
      </div>

      {/* Interests */}
      <div className="retro-box mb-6">
        <div className="window-title">
          <span>💡 interests.dat</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold text-yellow mb-2">📚 Reading</p>
              <ul className="space-y-1">
                <li>→ 三体 (The Three-Body Problem)</li>
                <li>→ 1984 - George Orwell</li>
                <li>→ Hackers & Painters</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-cyan mb-2">🎵 Music</p>
              <ul className="space-y-1">
                <li>→ Lo-fi hip hop</li>
                <li>→ Chiptune / 8-bit</li>
                <li>→ J-rock</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-hot-pink mb-2" style={{ color: "#ff69b4" }}>
                🎮 Games
              </p>
              <ul className="space-y-1">
                <li>→ Minecraft</li>
                <li>→ Stardew Valley</li>
                <li>→ Zelda series</li>
              </ul>
            </div>
            <div>
              <p className="font-bold text-lime mb-2" style={{ color: "#32cd32" }}>
                🎬 Movies
              </p>
              <ul className="space-y-1">
                <li>→ Interstellar</li>
                <li>→ The Matrix</li>
                <li>→ Spirited Away</li>
              </ul>
            </div>
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

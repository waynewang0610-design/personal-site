"use client";

import { useEffect, useState } from "react";
import { supabase, type GuestbookMessage } from "@/lib/supabase";
import ReplySection from "@/components/ReplySection";

export default function GuestbookPage() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    supabase
      .from("guestbook_messages")
      .select("*")
      .order("id", { ascending: false })
      .limit(50)
      .then(({ data }) => {
        setMessages((data as GuestbookMessage[]) ?? []);
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;

    setSubmitting(true);
    await supabase.from("guestbook_messages").insert({
      name: name.trim(),
      content: content.trim(),
    });
    const { data } = await supabase
      .from("guestbook_messages")
      .select("*")
      .order("id", { ascending: false })
      .limit(50);
    setMessages((data as GuestbookMessage[]) ?? []);
    setName("");
    setEmail("");
    setWebsite("");
    setContent("");
    setSubmitting(false);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* === Title === */}
      <div className="text-center mb-6">
        <h1
          className="text-3xl font-bold inline-block"
          style={{
            fontFamily: '"Times New Roman", serif',
            color: "#00ffff",
            textShadow: "0 0 10px #00ffff, 2px 2px 0 #000",
          }}
        >
          📖 My Guestbook
        </h1>
        <p className="text-yellow text-sm mt-2 font-mono">
          ★ Sign my guestbook, pretty please! ★
        </p>
      </div>

      {/* === Sign Form === */}
      <div className="retro-box mb-8">
        <div className="window-title">
          <span>📝 Sign the Guestbook</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">
                ★ Your Name:
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none"
                style={{ borderStyle: "inset" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                ★ Email (optional):
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none"
                style={{ borderStyle: "inset" }}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                ★ Homepage (optional):
              </label>
              <input
                type="text"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none"
                style={{ borderStyle: "inset" }}
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">
                ★ Your Message:
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none resize-none"
                style={{ borderStyle: "inset" }}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="retro-btn retro-btn-pink"
              >
                {submitting ? "Sending..." : "✍ Sign Guestbook"}
              </button>
              {done && (
                <span className="blink text-lime font-bold text-sm">
                  ★ Thanks! Your message has been added!
                </span>
              )}
            </div>
          </form>
        </div>
      </div>

      <hr className="rainbow-hr" />

      {/* === Messages === */}
      <div className="retro-box mt-6">
        <div className="window-title">
          <span>💬 Guestbook Entries ({messages.length})</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          {loading ? (
            <p className="text-center text-zinc-500 py-4 font-mono">
              Loading guestbook...
            </p>
          ) : messages.length === 0 ? (
            <p className="text-center text-zinc-500 py-4">
              No entries yet. Be the first to sign!
            </p>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div key={msg.id}>
                  <div
                    className="retro-box"
                    style={{ borderWidth: 2 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-yellow">◆</span>
                      <span className="font-bold text-sm">{msg.name}</span>
                      <span
                        className="text-xs text-zinc-500 ml-auto"
                        style={{ fontFamily: '"Courier New", monospace' }}
                      >
                        {new Date(msg.created_at).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed pl-4">{msg.content}</p>
                    {i === 0 && (
                      <p className="text-right text-xs text-hot-pink mt-1 blink">
                        ★ Latest Entry ★
                      </p>
                    )}
                  </div>
                  <ReplySection parentType="guestbook" parentId={msg.id} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* === Back link === */}
      <div className="text-center mt-6">
        <a href="/" className="nav-link text-sm">
          ← Back to Homepage
        </a>
      </div>
    </div>
  );
}

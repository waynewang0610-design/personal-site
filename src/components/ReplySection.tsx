"use client";

import { useEffect, useState } from "react";
import { supabase, type Reply } from "@/lib/supabase";

interface Props {
  parentType: "guestbook" | "update";
  parentId: number;
}

export default function ReplySection({ parentType, parentId }: Props) {
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadReplies = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("replies")
      .select("*")
      .eq("parent_type", parentType)
      .eq("parent_id", parentId)
      .order("id", { ascending: true });
    setReplies((data as Reply[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    if (open) loadReplies();
  }, [open, parentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !content.trim()) return;
    setSubmitting(true);
    await supabase.from("replies").insert({
      parent_type: parentType,
      parent_id: parentId,
      name: name.trim(),
      content: content.trim(),
    });
    setName("");
    setContent("");
    setSubmitting(false);
    loadReplies();
  };

  return (
    <div className="mt-2 ml-2">
      <button
        onClick={() => setOpen(!open)}
        className="text-xs font-bold text-cyan hover:text-yellow transition-colors"
        style={{ fontFamily: '"Courier New", monospace' }}
      >
        {open ? "▲ Hide replies" : `▼ ${replies.length > 0 ? `${replies.length} replies` : "Reply"}`}
      </button>

      {open && (
        <div className="mt-2 ml-3 border-l-2 border-zinc-500 pl-4 space-y-3">
          {/* Existing replies */}
          {loading ? (
            <p className="text-xs text-zinc-400 font-mono">Loading...</p>
          ) : (
            replies.map((r) => (
              <div
                key={r.id}
                className="retro-inset text-xs"
                style={{ background: "#f0f0f0" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-yellow">→</span>
                  <span className="font-bold">{r.name}</span>
                  <span
                    className="text-zinc-400 ml-auto"
                    style={{ fontFamily: '"Courier New", monospace' }}
                  >
                    {new Date(r.created_at).toLocaleDateString("zh-CN")}
                  </span>
                </div>
                <p className="pl-4 leading-relaxed">{r.content}</p>
              </div>
            ))
          )}
          {!loading && replies.length === 0 && (
            <p className="text-xs text-zinc-400 font-mono">
              No replies yet. Be the first!
            </p>
          )}

          {/* Reply form */}
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full border-2 border-inset border-zinc-400 bg-white px-2 py-1 text-xs outline-none"
              style={{ borderStyle: "inset" }}
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write a reply..."
              rows={2}
              className="w-full border-2 border-inset border-zinc-400 bg-white px-2 py-1 text-xs outline-none resize-none"
              style={{ borderStyle: "inset" }}
              required
            />
            <button
              type="submit"
              disabled={submitting}
              className="retro-btn text-xs"
              style={{ padding: "2px 12px", fontSize: 11 }}
            >
              {submitting ? "..." : "Reply"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { supabase, type GuestbookMessage } from "@/lib/supabase";

export default function GuestbookPage() {
  const [messages, setMessages] = useState<GuestbookMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

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
    setContent("");
    setSubmitting(false);
    setDone(true);
    setTimeout(() => setDone(false), 2000);
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">留言板</h1>
      <p className="mb-12 text-zinc-500">留下你想说的话，我会看到的～</p>

      <form
        onSubmit={handleSubmit}
        className="mb-16 rounded-xl border border-zinc-200 bg-zinc-50 p-6"
      >
        <div className="mb-4">
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-700">
            你的名字
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="怎么称呼你？"
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="mb-1 block text-sm font-medium text-zinc-700">
            留言内容
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="想说点什么..."
            rows={4}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 transition-colors resize-none"
            required
          />
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors disabled:opacity-50"
        >
          {submitting ? "提交中..." : "发布留言"}
        </button>
        {done && <span className="ml-3 text-sm text-green-600">留言成功！</span>}
      </form>

      {loading ? (
        <p className="text-zinc-400">加载中...</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="rounded-lg border border-zinc-100 p-5">
              <div className="mb-2 flex items-center gap-3">
                <span className="font-medium text-zinc-800">{msg.name}</span>
                <time className="text-sm text-zinc-400">
                  {new Date(msg.created_at).toLocaleDateString("zh-CN")}
                </time>
              </div>
              <p className="text-zinc-600 leading-relaxed">{msg.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

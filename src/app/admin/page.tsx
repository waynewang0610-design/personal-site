"use client";

import { useEffect, useState } from "react";
import { supabase, type Update } from "@/lib/supabase";

export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [updates, setUpdates] = useState<Update[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newContent, setNewContent] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(!!session);
    });
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
    } else {
      setSession(true);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(false);
    setUpdates([]);
  };

  const loadUpdates = async () => {
    const { data } = await supabase
      .from("updates")
      .select("*")
      .order("id", { ascending: false });
    setUpdates((data as Update[]) ?? []);
  };

  useEffect(() => {
    if (session) loadUpdates();
  }, [session]);

  const handleAddUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newContent.trim()) return;
    await supabase.from("updates").insert({ date: newDate, content: newContent.trim() });
    setNewDate("");
    setNewContent("");
    setMsg("动态已发布！");
    setTimeout(() => setMsg(""), 2000);
    loadUpdates();
  };

  const handleDelete = async (id: number) => {
    await supabase.from("updates").delete().eq("id", id);
    loadUpdates();
  };

  if (session === null) {
    return <div className="mx-auto max-w-3xl px-6 py-24 text-center text-zinc-400">加载中...</div>;
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-6 py-24">
        <h1 className="mb-8 text-center text-2xl font-bold tracking-tight">管理员登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-700">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium text-zinc-700">
              密码
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
              placeholder="输入密码"
              required
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full h-10 rounded-lg bg-zinc-900 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
          >
            登录
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">管理后台</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          退出登录
        </button>
      </div>

      <section className="mb-16">
        <h2 className="mb-4 text-lg font-semibold">发布新动态</h2>
        <form onSubmit={handleAddUpdate} className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 space-y-4">
          <div>
            <label htmlFor="date" className="mb-1 block text-sm font-medium text-zinc-700">
              日期
            </label>
            <input
              id="date"
              type="date"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900"
              required
            />
          </div>
          <div>
            <label htmlFor="content" className="mb-1 block text-sm font-medium text-zinc-700">
              内容
            </label>
            <textarea
              id="content"
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="今天发生了什么..."
              rows={3}
              className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 resize-none"
              required
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white hover:bg-zinc-700 transition-colors"
            >
              发布动态
            </button>
            {msg && <span className="text-sm text-green-600">{msg}</span>}
          </div>
        </form>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold">已发布的动态</h2>
        {updates.length === 0 ? (
          <p className="text-zinc-400">还没有动态。</p>
        ) : (
          <div className="space-y-3">
            {updates.map((item) => (
              <div
                key={item.id}
                className="flex items-start gap-4 rounded-lg border border-zinc-100 p-4"
              >
                <time className="shrink-0 text-sm text-zinc-400">{item.date}</time>
                <p className="flex-1 text-zinc-700">{item.content}</p>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm text-red-400 hover:text-red-600 transition-colors"
                >
                  删除
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

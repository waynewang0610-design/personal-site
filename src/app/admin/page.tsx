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
    setMsg("Update posted!");
    setTimeout(() => setMsg(""), 2000);
    loadUpdates();
  };

  const handleDelete = async (id: number) => {
    await supabase.from("updates").delete().eq("id", id);
    loadUpdates();
  };

  if (session === null) {
    return (
      <div className="mx-auto max-w-lg px-4 py-24 text-center">
        <span className="counter blink">LOADING...</span>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16">
        <div className="retro-box">
          <div className="window-title">
            <span>🔒 Administrator Login</span>
            <span>🗙</span>
          </div>
          <div className="retro-inset">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">★ Email:</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none"
                  style={{ borderStyle: "inset" }}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">★ Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none"
                  style={{ borderStyle: "inset" }}
                  required
                />
              </div>
              {error && (
                <p className="text-red-600 text-xs font-mono blink">{error}</p>
              )}
              <button type="submit" className="retro-btn w-full">
                🔑 Log In
              </button>
            </form>
          </div>
        </div>
        <p className="text-center mt-4">
          <a href="/" className="nav-link text-xs">← Back to Homepage</a>
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      {/* === Admin Header === */}
      <div className="retro-box mb-6 flex items-center justify-between">
        <span
          className="text-xl font-bold"
          style={{ fontFamily: '"Times New Roman", serif', color: "#000080" }}
        >
          🛠 Admin Control Panel
        </span>
        <button onClick={handleLogout} className="retro-btn text-xs">
          🚪 Logout
        </button>
      </div>

      {/* === New Update Form === */}
      <div className="retro-box mb-8">
        <div className="window-title">
          <span>📝 Post New Update</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          <form onSubmit={handleAddUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">★ Date:</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none"
                style={{ borderStyle: "inset" }}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">★ Content:</label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                rows={3}
                className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none resize-none"
                style={{ borderStyle: "inset" }}
                required
              />
            </div>
            <div className="flex items-center gap-4">
              <button type="submit" className="retro-btn retro-btn-yellow">
                📋 Post Update
              </button>
              {msg && <span className="blink font-bold text-sm" style={{ color: "#32cd32" }}>{msg}</span>}
            </div>
          </form>
        </div>
      </div>

      {/* === Existing Updates === */}
      <div className="retro-box">
        <div className="window-title">
          <span>📋 Manage Updates ({updates.length})</span>
          <span>🗙</span>
        </div>
        <div className="retro-inset">
          {updates.length === 0 ? (
            <p className="text-center text-zinc-500 py-4">No updates yet.</p>
          ) : (
            <div className="space-y-3">
              {updates.map((item) => (
                <div
                  key={item.id}
                  className="retro-box flex items-start gap-3"
                  style={{ borderWidth: 2 }}
                >
                  <span
                    className="shrink-0 text-xs font-bold px-2 py-1 bg-black"
                    style={{ fontFamily: '"Courier New", monospace', color: "#32cd32" }}
                  >
                    {item.date}
                  </span>
                  <span className="flex-1 text-sm">{item.content}</span>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-600 font-bold hover:underline"
                    style={{ fontFamily: '"Courier New", monospace' }}
                  >
                    [X]
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="text-center mt-4">
        <a href="/" className="nav-link text-xs">← Back to Homepage</a>
      </p>
    </div>
  );
}

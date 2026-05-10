"use client";

import { useEffect, useState } from "react";
import { supabase, type Update, type BlogPost, type FriendLink, type Photo } from "@/lib/supabase";

type Tab = "updates" | "blog" | "links" | "photos";

export default function AdminPage() {
  const [session, setSession] = useState<boolean | null>(null);
  const [tab, setTab] = useState<Tab>("updates");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // Updates
  const [updates, setUpdates] = useState<Update[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newContent, setNewContent] = useState("");

  // Blog
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogDate, setBlogDate] = useState("");

  // Links
  const [links, setLinks] = useState<FriendLink[]>([]);
  const [linkName, setLinkName] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [linkDesc, setLinkDesc] = useState("");

  // Photos
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoCaption, setPhotoCaption] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(!!session));
  }, []);

  useEffect(() => {
    if (session) {
      if (tab === "updates") loadUpdates();
      else if (tab === "blog") loadPosts();
      else if (tab === "links") loadLinks();
      else loadPhotos();
    }
  }, [session, tab]);

  const showMsg = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 2000); };

  // Auth
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message); else setSession(true);
  };
  const handleLogout = () => supabase.auth.signOut().then(() => setSession(false));

  // Updates
  const loadUpdates = async () => {
    const { data } = await supabase.from("updates").select("*").order("id", { ascending: false });
    setUpdates((data as Update[]) ?? []);
  };
  const addUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDate || !newContent.trim()) return;
    await supabase.from("updates").insert({ date: newDate, content: newContent.trim() });
    setNewDate(""); setNewContent(""); showMsg("Update posted!"); loadUpdates();
  };
  const delUpdate = async (id: number) => { await supabase.from("updates").delete().eq("id", id); loadUpdates(); };

  // Blog
  const loadPosts = async () => {
    const { data } = await supabase.from("blog_posts").select("*").order("id", { ascending: false });
    setPosts((data as BlogPost[]) ?? []);
  };
  const addPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogTitle.trim() || !blogContent.trim()) return;
    await supabase.from("blog_posts").insert({
      title: blogTitle.trim(), content: blogContent.trim(),
      date: blogDate || new Date().toISOString().slice(0, 10),
    });
    setBlogTitle(""); setBlogContent(""); setBlogDate(""); showMsg("Post published!"); loadPosts();
  };
  const delPost = async (id: number) => { await supabase.from("blog_posts").delete().eq("id", id); loadPosts(); };

  // Links
  const loadLinks = async () => {
    const { data } = await supabase.from("friend_links").select("*").order("id", { ascending: true });
    setLinks((data as FriendLink[]) ?? []);
  };
  const addLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!linkName.trim() || !linkUrl.trim()) return;
    await supabase.from("friend_links").insert({
      name: linkName.trim(), url: linkUrl.trim(), description: linkDesc.trim() || null,
    });
    setLinkName(""); setLinkUrl(""); setLinkDesc(""); showMsg("Link added!"); loadLinks();
  };
  const delLink = async (id: number) => { await supabase.from("friend_links").delete().eq("id", id); loadLinks(); };

  // Photos
  const loadPhotos = async () => {
    const { data } = await supabase.from("photos").select("*").order("id", { ascending: false });
    setPhotos((data as Photo[]) ?? []);
  };
  const addPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoUrl.trim()) return;
    await supabase.from("photos").insert({
      url: photoUrl.trim(), caption: photoCaption.trim() || null,
    });
    setPhotoUrl(""); setPhotoCaption(""); showMsg("Photo added!"); loadPhotos();
  };
  const delPhoto = async (id: number) => { await supabase.from("photos").delete().eq("id", id); loadPhotos(); };

  const tabs: { key: Tab; label: string }[] = [
    { key: "updates", label: "Updates" },
    { key: "blog", label: "Blog" },
    { key: "links", label: "Links" },
    { key: "photos", label: "Photos" },
  ];

  if (session === null) {
    return <div className="mx-auto max-w-lg px-4 py-24 text-center"><span className="counter blink">LOADING...</span></div>;
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-sm px-4 py-16">
        <div className="retro-box">
          <div className="window-title"><span>🔒 Administrator Login</span><span>🗙</span></div>
          <div className="retro-inset">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">★ Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} required />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">★ Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} required />
              </div>
              {error && <p className="text-red-600 text-xs font-mono blink">{error}</p>}
              <button type="submit" className="retro-btn w-full">🔑 Log In</button>
            </form>
          </div>
        </div>
        <p className="text-center mt-4"><a href="/" className="nav-link text-xs">← Back to Homepage</a></p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="retro-box mb-4 flex items-center justify-between">
        <span className="text-xl font-bold" style={{ fontFamily: '"Times New Roman", serif', color: "#000080" }}>🛠 Admin Control Panel</span>
        <button onClick={handleLogout} className="retro-btn text-xs">🚪 Logout</button>
      </div>

      {/* Tab nav */}
      <div className="flex gap-2 mb-6">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setMsg(""); }}
            className={tab === t.key ? "retro-btn retro-btn-yellow text-xs" : "retro-btn text-xs"}
            style={{ padding: "4px 14px" }}
          >
            {t.label}
          </button>
        ))}
        {msg && <span className="blink font-bold text-sm self-center" style={{ color: "#32cd32" }}>{msg}</span>}
      </div>

      {/* ===== UPDATES TAB ===== */}
      {tab === "updates" && (
        <>
          <div className="retro-box mb-6">
            <div className="window-title"><span>📝 Post New Update</span><span>🗙</span></div>
            <div className="retro-inset">
              <form onSubmit={addUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">★ Date:</label>
                  <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">★ Content:</label>
                  <textarea value={newContent} onChange={(e) => setNewContent(e.target.value)} rows={3} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none resize-none" style={{ borderStyle: "inset" }} required />
                </div>
                <button type="submit" className="retro-btn retro-btn-yellow">📋 Post Update</button>
              </form>
            </div>
          </div>
          <div className="retro-box">
            <div className="window-title"><span>📋 Manage Updates ({updates.length})</span><span>🗙</span></div>
            <div className="retro-inset">
              {updates.length === 0 ? <p className="text-center text-zinc-500 py-4">No updates.</p> : (
                <div className="space-y-3">
                  {updates.map((u) => (
                    <div key={u.id} className="retro-box flex items-start gap-3" style={{ borderWidth: 2 }}>
                      <span className="shrink-0 text-xs font-bold px-2 py-1 bg-black" style={{ fontFamily: '"Courier New", monospace', color: "#32cd32" }}>{u.date}</span>
                      <span className="flex-1 text-sm">{u.content}</span>
                      <button onClick={() => delUpdate(u.id)} className="text-xs text-red-600 font-bold hover:underline" style={{ fontFamily: '"Courier New", monospace' }}>[X]</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ===== BLOG TAB ===== */}
      {tab === "blog" && (
        <>
          <div className="retro-box mb-6">
            <div className="window-title"><span>📝 New Blog Post</span><span>🗙</span></div>
            <div className="retro-inset">
              <form onSubmit={addPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">★ Title:</label>
                  <input type="text" value={blogTitle} onChange={(e) => setBlogTitle(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">★ Date:</label>
                  <input type="date" value={blogDate} onChange={(e) => setBlogDate(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">★ Content:</label>
                  <textarea value={blogContent} onChange={(e) => setBlogContent(e.target.value)} rows={8} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none resize-none" style={{ borderStyle: "inset" }} required />
                </div>
                <button type="submit" className="retro-btn retro-btn-yellow">📝 Publish Post</button>
              </form>
            </div>
          </div>
          <div className="retro-box">
            <div className="window-title"><span>📋 Blog Posts ({posts.length})</span><span>🗙</span></div>
            <div className="retro-inset">
              {posts.length === 0 ? <p className="text-center text-zinc-500 py-4">No posts.</p> : (
                <div className="space-y-3">
                  {posts.map((p) => (
                    <div key={p.id} className="retro-box flex items-start gap-3" style={{ borderWidth: 2 }}>
                      <span className="shrink-0 text-xs font-bold px-2 py-1 bg-black" style={{ fontFamily: '"Courier New", monospace', color: "#32cd32" }}>{p.date}</span>
                      <span className="flex-1 text-sm font-bold">{p.title}</span>
                      <button onClick={() => delPost(p.id)} className="text-xs text-red-600 font-bold hover:underline" style={{ fontFamily: '"Courier New", monospace' }}>[X]</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ===== LINKS TAB ===== */}
      {tab === "links" && (
        <>
          <div className="retro-box mb-6">
            <div className="window-title"><span>🔗 New Friend Link</span><span>🗙</span></div>
            <div className="retro-inset">
              <form onSubmit={addLink} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">★ Site Name:</label>
                  <input type="text" value={linkName} onChange={(e) => setLinkName(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">★ URL:</label>
                  <input type="url" value={linkUrl} onChange={(e) => setLinkUrl(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} placeholder="https://..." required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">★ Description (optional):</label>
                  <input type="text" value={linkDesc} onChange={(e) => setLinkDesc(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} />
                </div>
                <button type="submit" className="retro-btn retro-btn-yellow">🔗 Add Link</button>
              </form>
            </div>
          </div>
          <div className="retro-box">
            <div className="window-title"><span>📋 Friend Links ({links.length})</span><span>🗙</span></div>
            <div className="retro-inset">
              {links.length === 0 ? <p className="text-center text-zinc-500 py-4">No links.</p> : (
                <div className="space-y-2">
                  {links.map((l) => (
                    <div key={l.id} className="retro-box flex items-center gap-3" style={{ borderWidth: 2 }}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-sm font-bold hover:underline text-blue-600">{l.name}</a>
                      {l.description && <span className="text-xs text-zinc-500">— {l.description}</span>}
                      <button onClick={() => delLink(l.id)} className="ml-auto text-xs text-red-600 font-bold hover:underline" style={{ fontFamily: '"Courier New", monospace' }}>[X]</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* ===== PHOTOS TAB ===== */}
      {tab === "photos" && (
        <>
          <div className="retro-box mb-6">
            <div className="window-title"><span>🖼 Add Photo</span><span>🗙</span></div>
            <div className="retro-inset">
              <form onSubmit={addPhoto} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-1">★ Image URL:</label>
                  <input type="url" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} placeholder="https://..." required />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">★ Caption (optional):</label>
                  <input type="text" value={photoCaption} onChange={(e) => setPhotoCaption(e.target.value)} className="w-full border-2 border-inset border-zinc-400 bg-white px-3 py-2 text-sm outline-none" style={{ borderStyle: "inset" }} />
                </div>
                <button type="submit" className="retro-btn retro-btn-yellow">🖼 Add Photo</button>
              </form>
            </div>
          </div>
          <div className="retro-box">
            <div className="window-title"><span>📋 Photos ({photos.length})</span><span>🗙</span></div>
            <div className="retro-inset">
              {photos.length === 0 ? <p className="text-center text-zinc-500 py-4">No photos.</p> : (
                <div className="space-y-2">
                  {photos.map((p) => (
                    <div key={p.id} className="retro-box flex items-center gap-3" style={{ borderWidth: 2 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.url} alt={p.caption ?? ""} className="w-16 h-12 object-cover border border-zinc-400" />
                      <span className="text-xs flex-1">{p.caption || "(no caption)"}</span>
                      <button onClick={() => delPhoto(p.id)} className="text-xs text-red-600 font-bold hover:underline" style={{ fontFamily: '"Courier New", monospace' }}>[X]</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      <p className="text-center mt-4"><a href="/" className="nav-link text-xs">← Back to Homepage</a></p>
    </div>
  );
}

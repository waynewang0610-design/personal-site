import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "我的个人网站",
  description: "欢迎来到我的个人空间",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur">
          <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              YourName
            </Link>
            <div className="flex gap-6 text-sm font-medium text-zinc-600">
              <Link href="/" className="hover:text-zinc-900 transition-colors">
                首页
              </Link>
              <Link href="/guestbook" className="hover:text-zinc-900 transition-colors">
                留言板
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-zinc-100 py-8 text-center text-sm text-zinc-400">
          <p>© {new Date().getFullYear()} YourName. Built with Next.js.</p>
        </footer>
      </body>
    </html>
  );
}

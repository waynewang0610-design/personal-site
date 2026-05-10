import type { Metadata } from "next";
import Link from "next/link";
import OnlineStatus from "@/components/OnlineStatus";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wayne Wang's Homepage",
  description: "Welcome to my crib on the information superhighway!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="h-full">
      <body className="min-h-full flex flex-col">
        {/* ===== HEADER ===== */}
        <header>
          <div className="star-divider">
            ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★
          </div>
          <div className="text-center py-4">
            <h1
              className="text-3xl font-bold tracking-wide px-6 py-2 inline-block"
              style={{
                fontFamily: '"Times New Roman", serif',
                color: "#ff69b4",
                textShadow: "0 0 10px #ff69b4, 0 0 20px #ff69b4, 2px 2px 0 #000",
              }}
            >
              WAYNE WANG&apos;S HOMEPAGE
            </h1>
          </div>
          <div className="star-divider">✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧ ✧</div>
          <nav className="text-center py-3">
            <span className="text-lime font-bold font-mono">[ </span>
            <Link href="/" className="nav-link">
              Home
            </Link>
            <span className="text-lime font-bold font-mono"> ]</span>
            <span className="mx-2 text-white font-mono">|</span>
            <span className="text-lime font-bold font-mono">[ </span>
            <Link href="/guestbook" className="nav-link">
              Guestbook
            </Link>
            <span className="text-lime font-bold font-mono"> ]</span>
            <span className="mx-2 text-white font-mono">|</span>
            <span className="text-lime font-bold font-mono">[ </span>
            <Link href="/about" className="nav-link">
              About
            </Link>
            <span className="text-lime font-bold font-mono"> ]</span>
            <span className="mx-2 text-white font-mono">|</span>
            <span className="text-lime font-bold font-mono">[ </span>
            <Link href="/blog" className="nav-link">
              Blog
            </Link>
            <span className="text-lime font-bold font-mono"> ]</span>
            <span className="mx-2 text-white font-mono">|</span>
            <span className="text-lime font-bold font-mono">[ </span>
            <Link href="/links" className="nav-link">
              Links
            </Link>
            <span className="text-lime font-bold font-mono"> ]</span>
          </nav>
          <hr className="rainbow-hr" />
        </header>

        {/* ===== MAIN ===== */}
        <main className="flex-1">{children}</main>

        {/* ===== FOOTER ===== */}
        <footer>
          <hr className="rainbow-hr" />
          <div className="text-center py-4 text-cyan text-xs font-mono space-y-1">
            <p><OnlineStatus /></p>
            <p className="text-yellow">★ This page is best viewed in 800x600 ★</p>
            <p>Made with Notepad.exe and lots of &lt;blink&gt; tags</p>
            <p className="text-zinc-500 mt-2">
              © {new Date().getFullYear()} Wayne Wang
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

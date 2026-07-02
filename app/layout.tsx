import type { Metadata } from "next";
import localFont from "next/font/local";
import { Alex_Brush, Cinzel_Decorative } from "next/font/google";
import { ReactLenis } from "lenis/react";
import MagicCursor from "@/components/MagicCursor";
import GaiaTree from "@/components/GaiaTree";
import TomeNav from "@/components/TomeNav";
import "lenis/dist/lenis.css";
import "./globals.css";

const alice = localFont({
  src: "./fonts/alice.ttf",
  variable: "--font-alice",
});

const heading = localFont({
  src: "./fonts/heading.ttf",
  variable: "--font-heading",
});

const script = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-script",
});

const chapter = Cinzel_Decorative({
  weight: ["700", "900"],
  subsets: ["latin"],
  variable: "--font-chapter-src",
});

// TODO: swap in your real deployed domain once you have one — this powers
// the absolute URLs that link-preview cards (Discord/Slack/LinkedIn/X) need.
const siteUrl = "https://amanahmad.xyz";
const siteDescription =
  "Full-stack developer crafting performant web ecosystems — Next.js, TypeScript, Node.js, and MongoDB. Browse projects, case studies, and chronicles of past work.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aman Ahmad — Full Stack Developer",
    template: "%s — Aman Ahmad",
  },
  description: siteDescription,
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Aman Ahmad — Full Stack Developer",
    description: siteDescription,
    url: siteUrl,
    siteName: "Aman Ahmad",
    images: [{ url: "/avatar.png", width: 512, height: 512, alt: "Aman Ahmad" }],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Aman Ahmad — Full Stack Developer",
    description: siteDescription,
    images: ["/avatar.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${alice.variable} ${heading.variable} ${script.variable} ${chapter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-ink-800 focus:text-ember-300 focus:border focus:border-gilt-strong"
        >
          Skip to content
        </a>
        <GaiaTree />
        {/* Candlelit vignette — frames the tome, darkens edges */}
        <div
          aria-hidden
          className="fixed inset-0 z-0 pointer-events-none select-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_50%,rgba(2,1,4,0.5)_100%)]"
        />
        <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothWheel: true }}>
          <MagicCursor />
          <TomeNav />
          {children}
        </ReactLenis>
      </body>
    </html>
  );
}

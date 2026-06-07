"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

const links = [
  { href: "#sanctum", label: "Sanctum" },
  { href: "/experience", label: "Chronicles" },
  { href: "/projects", label: "Relics" },
  { href: "#records", label: "Records" },
];

const linkClass =
  "flex items-center gap-2 px-3 py-2 rounded-lg text-left text-zinc-300 text-base tracking-wide transition-colors hover:text-purple-200 hover:bg-purple-950/30";

export default function MagicNavButton() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const scrollToAnchor = (href: string) => {
    setOpen(false);
    lenis?.scrollTo(href, { offset: -32 });
  };

  return (
    <div ref={rootRef} className="fixed top-6 left-6 z-50">
      {/* Glowing rune toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        className="group relative w-11 h-11 rounded-full"
      >
        <span
          className="absolute inset-0 rounded-full bg-purple-600/20 blur-md scale-110"
          style={{ animation: "deepPulse 5s ease-in-out infinite" }}
        />
        <span className="relative flex items-center justify-center w-11 h-11 rounded-full p-[1.5px] bg-linear-to-b from-purple-500/60 via-zinc-800 to-purple-950/60 shadow-lg">
          <span className="flex items-center justify-center w-full h-full rounded-full bg-[#08080c] border border-purple-900/30 text-purple-300/90 transition-colors group-hover:text-purple-200 group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]">
            {open ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
          </span>
        </span>
      </button>

      {/* Flyout sigil menu */}
      <div
        className={`absolute top-14 left-0 transition-all duration-300 ease-out ${
          open ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="relative rounded-xl p-[1.5px] bg-linear-to-b from-purple-500/50 via-zinc-800 to-purple-950/50 shadow-2xl">
          <nav className="flex flex-col gap-1 min-w-[10rem] rounded-[10px] bg-[#08080c]/95 border border-purple-900/20 p-2">
            {links.map((link) => {
              const isAnchor = link.href.startsWith("#");
              const sigil = (
                <span className="text-purple-500/70 text-xs drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]">✧</span>
              );

              // On the sanctum itself, anchor links smooth-scroll in place.
              if (isAnchor && isHome) {
                return (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollToAnchor(link.href)}
                    className={linkClass}
                  >
                    {sigil}
                    {link.label}
                  </button>
                );
              }

              // Elsewhere, anchors just return to the sanctum's top —
              // no "/#hash" left behind in the address bar.
              return (
                <Link
                  key={link.href}
                  href={isAnchor ? "/" : link.href}
                  onClick={() => setOpen(false)}
                  className={linkClass}
                >
                  {sigil}
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const links = [
  { href: "#sanctum", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "#records", label: "Activity" },
  { href: "#contact", label: "Contact" },
];

export default function MagicNavButton() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node))
        setOpen(false);
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

  const close = () => setOpen(false);

  const handleAnchorClick = (href: string) => {
    close();
    if (isHome) lenis?.scrollTo(href, { offset: -32 });
  };

  return (
    <div ref={rootRef} className="fixed bottom-8 left-8 z-50">
      {/* Menu — floats above the orb */}
      <nav aria-label="Site navigation" className="absolute bottom-full left-0 pb-4 flex flex-col gap-1">
        {links.map((link, i) => {
          const isAnchor = link.href.startsWith("#");
          const isActive = !isAnchor && pathname === link.href;

          const itemStyle: React.CSSProperties = {
            transitionDelay: open ? `${i * 50}ms` : "0ms",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0) scale(1)" : "translateY(10px) scale(0.95)",
            pointerEvents: open ? "auto" : "none",
          };

          const cls = [
            "flex items-center gap-2.5 px-4 py-2.5 rounded-xl",
            "text-sm tracking-[0.18em] uppercase font-bold whitespace-nowrap",
            "backdrop-blur-md border transition-colors duration-200",
            isActive
              ? "text-zinc-100 bg-zinc-800/90 border-zinc-600/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
              : "text-zinc-400 bg-zinc-950/80 border-zinc-800/60 hover:text-zinc-100 hover:bg-zinc-800/70 hover:border-zinc-700/60",
          ].join(" ");

          return (
            <div key={link.href} className="transition-all duration-300" style={itemStyle}>
              {isAnchor && isHome ? (
                <button type="button" onClick={() => handleAnchorClick(link.href)} className={cls}>
                  <span className="text-zinc-700 text-[10px] select-none">✧</span>
                  {link.label}
                </button>
              ) : (
                <Link href={isAnchor ? `/${link.href}` : link.href} onClick={close} className={cls}>
                  <span className="text-zinc-700 text-[10px] select-none">✧</span>
                  {link.label}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* The Orb */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close navigation" : "Open navigation"}
        aria-expanded={open}
        className="relative w-14 h-14 rounded-full"
      >
        {/* Idle pulse ring — removed when open */}
        {!open && (
          <span className="absolute inset-0 rounded-full border border-zinc-600/40 animate-ping" />
        )}

        {/* Ambient halo */}
        <span
          className={`absolute -inset-3 rounded-full blur-xl transition-all duration-500 ${
            open ? "bg-white/4" : "bg-white/1"
          }`}
        />

        {/* Outer decorative ring */}
        <span
          className={`absolute -inset-1 rounded-full border transition-all duration-500 ${
            open ? "border-zinc-500/50 scale-100" : "border-zinc-800/40 scale-95"
          }`}
        />

        {/* Orb sphere */}
        <span
          className={`relative flex items-center justify-center w-14 h-14 rounded-full border overflow-hidden transition-all duration-300 ${
            open
              ? "bg-zinc-800 border-zinc-600/70 shadow-[0_0_28px_rgba(255,255,255,0.06),inset_0_0_10px_rgba(255,255,255,0.03)]"
              : "bg-[#0b0b0f] border-zinc-800 shadow-[0_4px_32px_rgba(0,0,0,0.8)]"
          }`}
        >
          {/* Top highlight shine */}
          <span className="absolute top-0 inset-x-0 h-1/2 rounded-t-full bg-linear-to-b from-white/7 to-transparent pointer-events-none" />
          {/* Bottom depth shadow */}
          <span className="absolute bottom-0 inset-x-0 h-1/3 rounded-b-full bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Sigil */}
          <span
            className={`relative text-xl leading-none select-none transition-all duration-500 ${
              open ? "text-zinc-200 rotate-135 scale-110" : "text-zinc-500 rotate-0 scale-100"
            }`}
          >
            ✦
          </span>
        </span>
      </button>
    </div>
  );
}

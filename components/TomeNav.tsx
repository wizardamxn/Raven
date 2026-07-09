"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { GiRaven } from "react-icons/gi";

const links = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/#contact", label: "Contact" },
];

/**
 * The visible top navigation — an "index of the tome" present on every page.
 * The old bottom-left orb (MagicNavButton) stays as a bonus shortcut.
 */
export default function TomeNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const lenis = useLenis();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on outside click / Escape / route change
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

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleContactClick = (e: React.MouseEvent) => {
    if (isHome) {
      e.preventDefault();
      lenis?.scrollTo("#contact", { offset: -96 });
    }
    setOpen(false);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname.startsWith(href);
  };

  const linkClass = (active: boolean) =>
    [
      "relative group px-1 py-2 text-xs sm:text-sm tracking-[0.25em] uppercase font-bold transition-colors duration-200",
      active ? "text-ember-400" : "text-parchment-300 hover:text-ember-300",
    ].join(" ");

  const underline = (active: boolean) => (
    <span
      aria-hidden
      className={`absolute left-0 -bottom-0.5 h-px bg-linear-to-r from-ember-400 to-transparent transition-all duration-300 ${
        active ? "w-full" : "w-0 group-hover:w-full"
      }`}
    />
  );

  // Tiny gem above the chapter you're reading
  const activeGem = (active: boolean) =>
    active ? (
      <span
        aria-hidden
        className="absolute left-1/2 -translate-x-1/2 -top-0.5 w-1 h-1 rotate-45 bg-ember-400 shadow-[0_0_6px_rgba(217,164,65,0.8)]"
      />
    ) : null;

  // Gilt diamond separating the desktop links
  const diamond = (
    <span aria-hidden className="block w-1 h-1 rotate-45 bg-ember-500/40 select-none" />
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink-900/85 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.55)]"
          : "bg-ink-900/40 backdrop-blur-sm"
      }`}
    >
      <nav
        ref={rootRef}
        aria-label="Primary navigation"
        className="mx-auto max-w-5xl flex items-center justify-between px-5 sm:px-8 h-16"
      >
        {/* Sigil + name */}
        <Link
          href="/"
          className="group flex items-center gap-3 text-parchment-100 hover:text-ember-200 transition-colors duration-200"
        >
          <GiRaven className="w-6 h-6 text-ember-400 transition-transform duration-300 group-hover:-rotate-12" />
          <span className="font-chapter text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Aman Ahmad
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((link, i) => (
            <Fragment key={link.href}>
              {i > 0 && diamond}
              {link.href === "/#contact" ? (
                <Link href={link.href} onClick={handleContactClick} className={linkClass(false)}>
                  {link.label}
                  {underline(false)}
                </Link>
              ) : (
                <Link href={link.href} className={linkClass(isActive(link.href))}>
                  {link.label}
                  {underline(isActive(link.href))}
                  {activeGem(isActive(link.href))}
                </Link>
              )}
            </Fragment>
          ))}
        </div>

        {/* Mobile: wax-seal toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          className="md:hidden relative flex items-center justify-center w-10 h-10 rounded-full border border-gilt-strong bg-linear-to-b from-wax-500 to-wax-600 shadow-[0_2px_12px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)]"
        >
          <GiRaven
            className={`w-5 h-5 text-ember-200 transition-transform duration-300 ${
              open ? "rotate-12 scale-110" : ""
            }`}
          />
        </button>

        {/* Mobile dropdown */}
        <div
          className={`md:hidden absolute top-full inset-x-0 border-b border-gilt bg-ink-900/95 backdrop-blur-md transition-all duration-300 origin-top ${
            open ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"
          }`}
        >
          <div className="flex flex-col px-6 py-4 gap-1">
            {links.map((link) =>
              link.href === "/#contact" ? (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleContactClick}
                  className="py-3 text-sm tracking-[0.25em] uppercase font-bold text-parchment-300 hover:text-ember-300 transition-colors border-b border-gilt-faint last:border-0"
                >
                  {link.label}
                </Link>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`py-3 text-sm tracking-[0.25em] uppercase font-bold transition-colors border-b border-gilt-faint last:border-0 ${
                    isActive(link.href)
                      ? "text-ember-400"
                      : "text-parchment-300 hover:text-ember-300"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>
        </div>
      </nav>
      {/* Gilt hairline — brightens once the reader descends */}
      <div
        aria-hidden
        className={`h-px w-full bg-linear-to-r from-transparent to-transparent transition-colors duration-300 ${
          scrolled ? "via-ember-400/70" : "via-gilt-strong"
        }`}
      />
    </header>
  );
}

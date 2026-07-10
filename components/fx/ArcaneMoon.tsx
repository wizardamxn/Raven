"use client";

import { useEffect, useRef } from "react";
import { subscribeFrame } from "@/lib/fx/frame-loop";
import { getPointer, initPointer } from "@/lib/fx/pointer";

// The desktop moon, extracted from the night scene so it can feel the visitor:
// as the cursor drifts within ~240px, the halo brightens and the rune ring
// wakes. Also counts quick successive clicks on the disc — the Phase 6 meteor
// shower easter egg reads from this.
export default function ArcaneMoon() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const clicksRef = useRef<number[]>([]);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    // Click counter — the scene sits behind the page, so we listen on the
    // document and hit-test against the disc instead of relying on z-order.
    const onDown = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      if (Math.hypot(e.clientX - cx, e.clientY - cy) < rect.width * 0.3) {
        const now = performance.now();
        const recent = [
          ...clicksRef.current.filter((t) => now - t < 4000),
          now,
        ];
        // Three clicks within 4s summons the meteor shower.
        if (recent.length >= 3) {
          clicksRef.current = [];
          window.dispatchEvent(new CustomEvent("raven:meteors"));
        } else {
          clicksRef.current = recent;
        }
      }
    };
    document.addEventListener("pointerdown", onDown);

    const reduced = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = globalThis.matchMedia("(pointer: fine)").matches;
    if (reduced || !fine) {
      return () => document.removeEventListener("pointerdown", onDown);
    }

    initPointer();
    let current = 0;
    let frame = 0;
    const unsubscribe = subscribeFrame(() => {
      // Proximity only needs ~15 checks/sec, not one per frame.
      if ((frame++ & 3) !== 0) return;
      const p = getPointer();
      if (!p.active) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const d = Math.hypot(p.x - cx, p.y - cy);
      const target = Math.max(0, 1 - d / 240);
      if (Math.abs(target - current) > 0.02) {
        current = target;
        el.style.setProperty("--moon-glow", current.toFixed(2));
      }
    });

    return () => {
      unsubscribe();
      document.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ "--moon-glow": "0" } as React.CSSProperties}>
      {/* Wide halo */}
      <div className="absolute -inset-28 rounded-full bg-[radial-gradient(circle,rgba(205,221,255,0.14)_0%,rgba(205,221,255,0.05)_45%,rgba(205,221,255,0)_70%)]" />
      {/* Awakened halo — blooms as the cursor nears */}
      <div
        className="absolute -inset-28 rounded-full bg-[radial-gradient(circle,rgba(205,221,255,0.18)_0%,rgba(205,221,255,0.06)_45%,rgba(205,221,255,0)_70%)] transition-opacity duration-500"
        style={{ opacity: "var(--moon-glow)" }}
      />
      <svg viewBox="0 0 160 160" className="relative h-36 w-36 lg:h-44 lg:w-44">
        <defs>
          <radialGradient id="moon-glow" cx="0.42" cy="0.4" r="0.75">
            <stop offset="0" stopColor="rgba(250,238,205,0.6)" />
            <stop offset="0.55" stopColor="rgba(205,221,255,0.35)" />
            <stop offset="1" stopColor="rgba(79,124,240,0.18)" />
          </radialGradient>
        </defs>
        {/* Luminous disc */}
        <circle cx="80" cy="80" r="38" fill="url(#moon-glow)" />
        {/* Arcane ring etched around it, slowly turning — wakes near the cursor */}
        <g
          className="origin-center motion-safe:animate-[sigil-spin_120s_linear_infinite]"
          stroke="rgba(79,124,240,0.4)"
          fill="none"
          style={{
            opacity: "calc(0.65 + var(--moon-glow) * 0.35)",
            transition: "opacity 0.5s ease",
          }}
        >
          <circle cx="80" cy="80" r="56" strokeWidth="0.8" strokeDasharray="3 9" />
          <path d="M80 18 L83 24 L80 28 L77 24 Z" fill="rgba(79,124,240,0.55)" stroke="none" />
          <path d="M80 142 L83 136 L80 132 L77 136 Z" fill="rgba(79,124,240,0.55)" stroke="none" />
          <path d="M18 80 L24 83 L28 80 L24 77 Z" fill="rgba(79,124,240,0.55)" stroke="none" />
          <path d="M142 80 L136 83 L132 80 L136 77 Z" fill="rgba(79,124,240,0.55)" stroke="none" />
        </g>
      </svg>

      {/* The distant flock, crossing the halo */}
      <svg viewBox="0 0 100 40" className="absolute -left-16 top-4 h-10 w-24 text-parchment-300/50" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M10 20 Q14 16 18 20 Q22 16 26 20" />
        <path d="M44 10 Q47 7 50 10 Q53 7 56 10" transform="scale(0.8)" />
        <path d="M70 30 Q73 27 76 30 Q79 27 82 30" transform="scale(0.7) translate(30 14)" />
      </svg>
    </div>
  );
}

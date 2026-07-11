"use client";

import { m, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const clamp = (v: number, min: number, max: number) =>
  Math.max(min, Math.min(max, v));

/**
 * Draws its child a few pixels toward the cursor as it approaches — a subtle
 * pull, not the exaggerated agency-site swing. Fine-pointer / hover only;
 * otherwise renders inert.
 */
export default function Magnetic({
  children,
  className = "",
  max = 6,
}: Readonly<{ children: ReactNode; className?: string; max?: number }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  useEffect(() => {
    setEnabled(
      globalThis.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const radius = Math.max(r.width, r.height) / 2 + 44;
      if (dist < radius) {
        const f = 1 - dist / radius;
        mx.set(clamp(dx * 0.4 * f, -max, max));
        my.set(clamp(dy * 0.4 * f, -max, max));
      } else {
        mx.set(0);
        my.set(0);
      }
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, max, mx, my]);

  if (!enabled) return <div className={`inline-block ${className}`}>{children}</div>;

  return (
    <m.div ref={ref} style={{ x, y }} className={`inline-block ${className}`}>
      {children}
    </m.div>
  );
}

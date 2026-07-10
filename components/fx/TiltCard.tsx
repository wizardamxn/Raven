"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Tilts its child toward the cursor like a relic under glass, with candlelight
 * sliding across the surface. Only on hover-capable fine pointers with motion
 * allowed — elsewhere it renders as a plain box so the existing hover-lift
 * behavior is untouched.
 */
export default function TiltCard({
  children,
  className = "",
}: Readonly<{ children: ReactNode; className?: string }>) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const mx = useMotionValue(0); // -0.5 … 0.5 across the card
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), {
    stiffness: 150,
    damping: 15,
  });
  const gx = useTransform(mx, [-0.5, 0.5], ["28%", "72%"]);
  const gy = useTransform(my, [-0.5, 0.5], ["22%", "78%"]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(246,249,255,0.16), rgba(246,249,255,0) 55%)`;

  useEffect(() => {
    setEnabled(
      globalThis.matchMedia("(hover: hover) and (pointer: fine)").matches &&
        !globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (!enabled) return <div className={className}>{children}</div>;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <m.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      className={`relative ${className}`}
    >
      {children}
      <m.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-xl mix-blend-screen"
        style={{ background: sheen }}
      />
    </m.div>
  );
}

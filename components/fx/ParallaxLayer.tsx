"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";

/**
 * Drifts its children vertically as the page scrolls, at `speed` × scroll
 * distance. Small positive speeds make the fixed night scene sink slowly as
 * the reader descends into the tome. Disabled on coarse pointers/mobile and
 * under prefers-reduced-motion, where it renders as a plain positioned box.
 *
 * The caller supplies the positioning via `className` (e.g. `absolute inset-0`)
 * so the layer keeps a real box and its children position exactly as before —
 * the transform only shifts it.
 */
export default function ParallaxLayer({
  speed,
  className = "",
  children,
}: Readonly<{
  speed: number;
  className?: string;
  children: ReactNode;
}>) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (v) => v * speed);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = globalThis.matchMedia("(max-width: 768px)").matches;
    setEnabled(!reduced && !mobile);
  }, []);

  return (
    <m.div className={className} style={enabled ? { y } : undefined}>
      {children}
    </m.div>
  );
}

"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Lazy-load the DOM animation feature bundle so the initial JS stays lean;
// `m` components + hooks stay in the main graph, the ~animation features load
// on demand. `strict` forbids `motion.*` (use `m.*` everywhere).
const loadFeatures = () =>
  import("motion/react").then((mod) => mod.domAnimation);

/**
 * App-wide motion context. `reducedMotion="user"` makes every `m` element
 * honor prefers-reduced-motion (transforms disabled, opacity preserved)
 * without per-component checks.
 */
export default function MotionProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

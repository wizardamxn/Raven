"use client";

import { useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";

// The abbey's lancet windows start dark and catch light one by one as the
// reader descends the page — quiet storytelling in the skyline. Once lit,
// a window keeps its candle-flicker and never goes out.
// Under reduced motion every window is lit from the start (the old behavior).

const WINDOWS = [
  { x: 54, y: 250, duration: 8, at: 0.04 },
  { x: 202, y: 230, duration: 6, at: 0.16 },
  { x: 414, y: 248, duration: 9, at: 0.3 },
  { x: 682, y: 258, duration: 7, at: 0.46 },
  { x: 884, y: 196, duration: 10, at: 0.62 },
  { x: 1372, y: 266, duration: 8, at: 0.78 },
] as const;

export default function ScrollLitWindows() {
  const { scrollYProgress } = useScroll();
  const [litCount, setLitCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = WINDOWS.filter((w) => v >= w.at).length;
    setLitCount((c) => (n > c ? n : c));
  });

  return (
    <>
      {WINDOWS.map((w, i) => {
        const lit = reduced || i < litCount;
        return (
          <g
            key={w.x}
            style={{ opacity: lit ? 1 : 0.16, transition: "opacity 1.2s ease" }}
          >
            <path
              d="M-1.6 2.6 L-1.6 -0.4 Q0 -2.8 1.6 -0.4 L1.6 2.6 Z"
              transform={`translate(${w.x} ${w.y})`}
              fill="#f59aa0"
              opacity="0.7"
              className="motion-safe:animate-[candle-flicker_var(--dur)_ease-in-out_infinite]"
              style={{ "--dur": `${w.duration}s` } as React.CSSProperties}
            />
          </g>
        );
      })}
    </>
  );
}

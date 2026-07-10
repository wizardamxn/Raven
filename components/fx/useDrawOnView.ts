"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once the element scrolls into view, so SVG ornaments can "ink"
 * themselves in. Under prefers-reduced-motion it resolves immediately and
 * flags `reduced` so callers can zero out the animation duration.
 */
export function useDrawOnView<T extends Element>() {
  const ref = useRef<T>(null);
  const [drawn, setDrawn] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduced(true);
      setDrawn(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, drawn, reduced };
}

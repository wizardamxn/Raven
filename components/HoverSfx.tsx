"use client";

import { useEffect } from "react";
import { useSound } from "@/components/providers/SoundProvider";

// Plays a faint metallic shimmer whenever the pointer lands on a fresh
// interactive element. One delegated listener for the whole page; fine-pointer
// only; no-ops while sound is muted.
export default function HoverSfx() {
  const { play } = useSound();

  useEffect(() => {
    if (!globalThis.matchMedia("(pointer: fine)").matches) return;

    let last: Element | null = null;
    let lastTime = 0;
    const SELECTOR = "a, button, [role='button'], summary";

    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element | null)?.closest(SELECTOR) ?? null;
      if (!el) {
        last = null;
        return;
      }
      if (el === last) return;
      last = el;
      const now = performance.now();
      if (now - lastTime < 55) return;
      lastTime = now;
      play("hover");
    };

    document.addEventListener("pointerover", onOver);
    return () => document.removeEventListener("pointerover", onOver);
  }, [play]);

  return null;
}

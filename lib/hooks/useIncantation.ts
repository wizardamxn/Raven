"use client";

import { useEffect } from "react";

// Listens for whispered incantations typed anywhere outside a text field:
//   "lumos" — everything flares to full brightness for 8s
//   "nox"   — the night is snuffed near-dark for 8s
// The visual response lives in globals.css (html.lumos / html.nox).
export function useIncantation(onCast?: (spell: "lumos" | "nox") => void) {
  useEffect(() => {
    let buffer = "";
    let timer: ReturnType<typeof setTimeout> | undefined;

    const clear = () => {
      document.documentElement.classList.remove("lumos", "nox");
    };

    const cast = (spell: "lumos" | "nox") => {
      const root = document.documentElement;
      root.classList.remove("lumos", "nox");
      root.classList.add(spell);
      clearTimeout(timer);
      timer = setTimeout(clear, 8000);
      onCast?.(spell);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
      if (e.key.length !== 1 || !/[a-z]/i.test(e.key)) return;
      buffer = (buffer + e.key.toLowerCase()).slice(-6);
      if (buffer.endsWith("lumos")) cast("lumos");
      else if (buffer.endsWith("nox")) cast("nox");
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, [onCast]);
}

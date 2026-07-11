"use client";

import { useEffect, useRef } from "react";
import { subscribeFrame } from "@/lib/fx/frame-loop";
import { initPointer } from "@/lib/fx/pointer";

export default function MagicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    document.documentElement.classList.add("magic-cursor-active");
    // Bring up the shared pointer singleton the other ambient effects read from.
    initPointer();

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };

    let lastSpark = 0;

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%)`;
      }
      const now = performance.now();
      if (now - lastSpark > 90) {
        lastSpark = now;
        const s = document.createElement("div");
        s.className = "cursor-spark";
        s.style.left = `${e.clientX}px`;
        s.style.top = `${e.clientY}px`;
        s.style.setProperty("--dx", `${Math.random() * 20 - 10}px`);
        document.body.appendChild(s);
        s.addEventListener("animationend", () => s.remove());
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const isInteractive = !!target?.closest("a, button, input, textarea, select, [role='button']");
      ringRef.current?.classList.toggle("magic-cursor-ring--active", isInteractive);
    };

    // Click ripple sigil — a rune-ring blooms where a spell lands on empty
    // parchment. Interactive elements keep their own feedback.
    let lastRipple = 0;
    const onDown = (e: PointerEvent) => {
      const target = e.target as Element | null;
      if (target?.closest("a, button, input, textarea, select, [role='button']")) return;
      const now = performance.now();
      if (now - lastRipple < 150) return;
      lastRipple = now;
      const r = document.createElement("div");
      r.className = "cursor-ripple";
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      document.body.appendChild(r);
      r.addEventListener("animationend", () => r.remove());
    };

    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("pointerdown", onDown);
    const unsubscribe = subscribeFrame(animate);

    return () => {
      document.documentElement.classList.remove("magic-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("pointerdown", onDown);
      unsubscribe();
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="magic-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="magic-cursor-dot" aria-hidden="true" />
    </>
  );
}

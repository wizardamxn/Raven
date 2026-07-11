"use client";

import { useEffect, useRef } from "react";
import { subscribeFrame } from "@/lib/fx/frame-loop";
import { getPointer, initPointer } from "@/lib/fx/pointer";

type Ember = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  phase: number;
  drift: number;
  life: number;
  max: number;
};

// Warm embers rising from the candle glow behind the tome. Rendered on its
// own canvas inside the night scene; embers near a fine pointer are nudged
// aside, so the air seems to part around the visitor.
export default function EmberVeil() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const fine = globalThis.matchMedia("(pointer: fine)").matches;
    const mobile = globalThis.matchMedia("(max-width: 640px)").matches;
    if (fine) initPointer();

    const COUNT = mobile ? 10 : 26;
    const DPR = Math.min(globalThis.devicePixelRatio || 1, 1.5);

    let w = 0;
    let h = 0;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.max(1, Math.floor(w * DPR));
      canvas.height = Math.max(1, Math.floor(h * DPR));
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const spawn = (e: Ember, first = false) => {
      e.x = w * 0.5 + (Math.random() - 0.5) * w * 0.65;
      e.y = first ? h - Math.random() * h * 0.5 : h + 4 + Math.random() * 24;
      e.vx = 0;
      e.vy = -(0.2 + Math.random() * 0.4);
      e.r = 0.8 + Math.random() * 1.6;
      e.phase = Math.random() * Math.PI * 2;
      e.drift = 0.4 + Math.random() * 0.8;
      e.max = 360 + Math.random() * 300;
      e.life = first ? Math.random() * e.max * 0.6 : 0;
    };

    const embers: Ember[] = Array.from({ length: COUNT }, () => {
      const e = {} as Ember;
      spawn(e, true);
      return e;
    });

    const render = (time: number) => {
      ctx.clearRect(0, 0, w, h);
      const p = getPointer();
      const t = time * 0.001;

      for (const e of embers) {
        e.life += 1;
        if (e.life > e.max || e.y < -10) {
          spawn(e);
          continue;
        }

        // Gentle shove away from the cursor — the air parting around you.
        if (fine && p.active) {
          const dx = e.x - p.x;
          const dy = e.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d > 0.5 && d < 90) {
            const f = ((1 - d / 90) * 0.5) / d;
            e.vx += dx * f;
            e.vy += dy * f;
          }
        }

        e.vx *= 0.94;
        e.x += e.vx + Math.sin(t * e.drift + e.phase) * 0.18;
        e.y += e.vy;

        const frac = e.life / e.max;
        // Ember-rise profile: quick fade-in, long fade-out, shrinking as it dies.
        const alpha =
          frac < 0.12 ? frac / 0.12 : Math.max(0, 1 - (frac - 0.12) / 0.88);
        const scale = 1 - frac * 0.55;
        const flicker = 0.85 + 0.15 * Math.sin(t * 6 + e.phase * 3);

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.r * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(238, 199, 118, ${(alpha * flicker * 0.75).toFixed(3)})`;
        ctx.fill();
      }
    };

    const unsubscribe = subscribeFrame(render);
    return () => {
      unsubscribe();
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 h-full w-full"
    />
  );
}

"use client";

// Adapted from Aceternity UI "Stars Background" (by Vijay Verma) —
// re-themed for the candlelit grimoire: parchment starlight with a share
// of warm ember-gold stars, gentler opacity, reduced-motion aware.

import React, { useState, useEffect, useRef, useCallback } from "react";
import { subscribeFrame } from "@/lib/fx/frame-loop";
import { getPointer, initPointer } from "@/lib/fx/pointer";

// Constellation whisper — stars near a fine pointer link up with faint gilt
// threads. Stars are bucketed into a coarse grid so each frame only distance-
// checks the 3×3 cells around the cursor.
const CELL = 130;

interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
  color: string;
}

interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}

// Parchment starlight with ~1 in 4 burning ember-gold
const starColor = () =>
  Math.random() < 0.25 ? "238, 199, 118" : "244, 236, 219";

export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00012,
  allStarsTwinkle = false,
  twinkleProbability = 0.6,
  minTwinkleSpeed = 0.6,
  maxTwinkleSpeed = 1.3,
  className = "",
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateStars = useCallback(
    (width: number, height: number): StarProps[] => {
      const reducedMotion = globalThis.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      const area = width * height;
      const numStars = Math.floor(area * starDensity);
      return Array.from({ length: numStars }, () => {
        const shouldTwinkle =
          !reducedMotion &&
          (allStarsTwinkle || Math.random() < twinkleProbability);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 0.6 + 0.5,
          opacity: Math.random() * 0.4 + 0.25,
          twinkleSpeed: shouldTwinkle
            ? minTwinkleSpeed +
              Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
            : null,
          color: starColor(),
        };
      });
    },
    [
      starDensity,
      allStarsTwinkle,
      twinkleProbability,
      minTwinkleSpeed,
      maxTwinkleSpeed,
    ]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateStars = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width;
      canvas.height = height;
      setStars(generateStars(width, height));
    };

    updateStars();

    const resizeObserver = new ResizeObserver(updateStars);
    resizeObserver.observe(canvas);
    return () => resizeObserver.disconnect();
  }, [generateStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Spatial grid for the constellation effect.
    const grid = new Map<string, StarProps[]>();
    for (const star of stars) {
      const key = `${Math.floor(star.x / CELL)},${Math.floor(star.y / CELL)}`;
      const bucket = grid.get(key);
      if (bucket) bucket.push(star);
      else grid.set(key, [star]);
    }
    const finePointer = globalThis.matchMedia("(pointer: fine)").matches;
    if (finePointer) initPointer();

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`;
        ctx.fill();

        if (star.twinkleSpeed !== null) {
          star.opacity =
            0.2 +
            Math.abs(Math.sin((Date.now() * 0.001) / star.twinkleSpeed) * 0.5);
        }
      }

      if (!finePointer) return;
      const p = getPointer();
      if (!p.active) return;

      // Gather stars within reach of the cursor from the neighboring cells.
      const near: StarProps[] = [];
      const pcx = Math.floor(p.x / CELL);
      const pcy = Math.floor(p.y / CELL);
      for (let gx = pcx - 1; gx <= pcx + 1; gx++) {
        for (let gy = pcy - 1; gy <= pcy + 1; gy++) {
          const bucket = grid.get(`${gx},${gy}`);
          if (!bucket) continue;
          for (const s of bucket) {
            if (Math.hypot(s.x - p.x, s.y - p.y) < CELL) near.push(s);
          }
        }
      }

      // Thread faint gilt lines between mutually close stars.
      ctx.lineWidth = 0.6;
      for (let i = 0; i < near.length; i++) {
        for (let j = i + 1; j < near.length; j++) {
          const a = near[i];
          const b = near[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > 110) continue;
          const midDist = Math.hypot(
            (a.x + b.x) / 2 - p.x,
            (a.y + b.y) / 2 - p.y
          );
          const alpha = Math.max(0, 1 - midDist / CELL) * 0.3;
          if (alpha < 0.02) continue;
          ctx.strokeStyle = `rgba(216, 58, 69, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    };

    // Static sky under reduced motion — draw once, no shared-loop subscription.
    if (stars.every((s) => s.twinkleSpeed === null)) {
      render();
      return;
    }

    return subscribeFrame(render);
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full absolute inset-0 ${className}`}
    />
  );
};

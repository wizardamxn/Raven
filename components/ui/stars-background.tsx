"use client";

// Adapted from Aceternity UI "Stars Background" (by Vijay Verma) —
// re-themed for the candlelit grimoire: parchment starlight with a share
// of warm ember-gold stars, gentler opacity, reduced-motion aware.

import React, { useState, useEffect, useRef, useCallback } from "react";

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

    let animationFrameId = 0;

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
      animationFrameId = requestAnimationFrame(render);
    };

    // Static sky under reduced motion — draw once, no loop.
    if (stars.every((s) => s.twinkleSpeed === null)) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`;
        ctx.fill();
      }
      return;
    }

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [stars]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`h-full w-full absolute inset-0 ${className}`}
    />
  );
};

"use client";

// Adapted from Aceternity UI "Shooting Stars" (by Vijay Verma) —
// re-themed for the candlelit grimoire: falling stars only (spawn high,
// streak down across the sky), ember-gold head with an arcane-violet
// trail. Skipped entirely under prefers-reduced-motion.

import React, { useEffect, useState, useRef } from "react";

interface ShootingStar {
  id: number;
  x: number;
  y: number;
  angle: number;
  scale: number;
  speed: number;
  distance: number;
}

interface ShootingStarsProps {
  minSpeed?: number;
  maxSpeed?: number;
  minDelay?: number;
  maxDelay?: number;
  starColor?: string;
  trailColor?: string;
  starWidth?: number;
  starHeight?: number;
  className?: string;
}

// Falling stars only: spawn along the top half, streak down-left or
// down-right like a meteor — never upward.
const getRandomStartPoint = () => {
  const goingRight = Math.random() < 0.5;
  const x = Math.random() * globalThis.innerWidth;
  const y = Math.random() * globalThis.innerHeight * 0.4;
  const angle = goingRight
    ? 25 + Math.random() * 25 // 25°–50° down-right
    : 130 + Math.random() * 25; // 130°–155° down-left
  return { x, y, angle };
};

export const ShootingStars: React.FC<ShootingStarsProps> = ({
  minSpeed = 8,
  maxSpeed = 22,
  minDelay = 4200,
  maxDelay = 10500,
  starColor = "#eec776",
  trailColor = "#7c5cd6",
  starWidth = 12,
  starHeight = 1,
  className = "",
}) => {
  const [star, setStar] = useState<ShootingStar | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let timeout: ReturnType<typeof setTimeout>;
    const createStar = () => {
      const { x, y, angle } = getRandomStartPoint();
      setStar({
        id: Date.now(),
        x,
        y,
        angle,
        scale: 1,
        speed: Math.random() * (maxSpeed - minSpeed) + minSpeed,
        distance: 0,
      });
      const randomDelay = Math.random() * (maxDelay - minDelay) + minDelay;
      timeout = setTimeout(createStar, randomDelay);
    };

    timeout = setTimeout(createStar, 1500);
    return () => clearTimeout(timeout);
  }, [minSpeed, maxSpeed, minDelay, maxDelay]);

  useEffect(() => {
    const moveStar = () => {
      if (star) {
        setStar((prevStar) => {
          if (!prevStar) return null;
          const newX =
            prevStar.x +
            prevStar.speed * Math.cos((prevStar.angle * Math.PI) / 180);
          const newY =
            prevStar.y +
            prevStar.speed * Math.sin((prevStar.angle * Math.PI) / 180);
          const newDistance = prevStar.distance + prevStar.speed;
          const newScale = 1 + newDistance / 100;
          if (
            newX < -20 ||
            newX > globalThis.innerWidth + 20 ||
            newY < -20 ||
            newY > globalThis.innerHeight + 20
          ) {
            return null;
          }
          return {
            ...prevStar,
            x: newX,
            y: newY,
            distance: newDistance,
            scale: newScale,
          };
        });
      }
    };

    const animationFrame = requestAnimationFrame(moveStar);
    return () => cancelAnimationFrame(animationFrame);
  }, [star]);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className={`w-full h-full absolute inset-0 ${className}`}
    >
      {star && (
        <rect
          key={star.id}
          x={star.x}
          y={star.y}
          width={starWidth * star.scale}
          height={starHeight}
          fill="url(#shooting-star-gradient)"
          transform={`rotate(${star.angle}, ${
            star.x + (starWidth * star.scale) / 2
          }, ${star.y + starHeight / 2})`}
        />
      )}
      <defs>
        <linearGradient
          id="shooting-star-gradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" style={{ stopColor: trailColor, stopOpacity: 0 }} />
          <stop offset="100%" style={{ stopColor: starColor, stopOpacity: 1 }} />
        </linearGradient>
      </defs>
    </svg>
  );
};

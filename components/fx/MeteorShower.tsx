"use client";

import { useEffect, useState } from "react";

type Meteor = { id: number; left: number; top: number; delay: number };

// The moon's secret: three quick clicks on the disc dispatch `raven:meteors`,
// and a brief shower streaks across the sky. Pure CSS motion; skipped under
// reduced motion.
export default function MeteorShower() {
  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const onShower = () => {
      if (globalThis.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const now = Date.now();
      const batch = Array.from({ length: 8 }, (_, i) => ({
        id: now + i,
        left: 8 + Math.random() * 78, // vw
        top: Math.random() * 28, // vh
        delay: Math.random() * 1.8, // s
      }));
      setMeteors((m) => [...m, ...batch]);
    };
    window.addEventListener("raven:meteors", onShower);
    return () => window.removeEventListener("raven:meteors", onShower);
  }, []);

  const remove = (id: number) =>
    setMeteors((m) => m.filter((x) => x.id !== id));

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m) => (
        <span
          key={m.id}
          onAnimationEnd={() => remove(m.id)}
          className="absolute h-px w-24 bg-linear-to-r from-transparent to-ember-300 drop-shadow-[0_0_6px_rgba(238,199,118,0.8)]"
          style={{
            left: `${m.left}vw`,
            top: `${m.top}vh`,
            opacity: 0,
            animation: `meteor-fall 1.1s ease-in ${m.delay}s forwards`,
          }}
        />
      ))}
    </div>
  );
}

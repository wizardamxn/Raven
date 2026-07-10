"use client";

import { m, useReducedMotion } from "motion/react";
import { useState, type CSSProperties } from "react";
import { GiRaven } from "react-icons/gi";
import { useSound } from "@/components/providers/SoundProvider";

const REST_SHADOW =
  "0 6px 24px rgba(0,0,0,0.7), inset 0 2px 6px rgba(255,255,255,0.12), inset 0 -4px 10px rgba(0,0,0,0.45)";
const PRESSED_SHADOW =
  "0 2px 8px rgba(0,0,0,0.7), inset 0 3px 12px rgba(0,0,0,0.6), inset 0 -2px 6px rgba(0,0,0,0.4)";

// Hairline cracks radiating from the seal's centre, drawn on press.
const CRACKS = ["M50 50 L24 32", "M50 50 L79 37", "M50 50 L46 81", "M50 50 L70 74"];

/**
 * The wax seal — pressing it stamps the wax (squish + deepened inset shadow),
 * cracks race across the surface, embers burst, and only then does the raven
 * fly (the mailto opens). Under reduced motion the link behaves normally.
 */
export default function WaxSeal({ email }: Readonly<{ email: string }>) {
  const [pressed, setPressed] = useState(false);
  const reduced = useReducedMotion();
  const { play } = useSound();

  const onActivate = (e: React.MouseEvent) => {
    play("tap");
    if (reduced || pressed) return; // let the browser follow the mailto link
    e.preventDefault();
    setPressed(true);
    setTimeout(() => {
      window.location.href = `mailto:${email}`;
    }, 430);
    setTimeout(() => setPressed(false), 900);
  };

  return (
    <div className="flex justify-center mb-10">
      <m.a
        href={`mailto:${email}`}
        aria-label="Send an email"
        onClick={onActivate}
        whileHover={reduced ? undefined : { scale: 1.05 }}
        whileFocus={reduced ? undefined : { scale: 1.05 }}
        whileTap={reduced ? undefined : { scale: 0.9 }}
        transition={{ type: "spring", stiffness: 420, damping: 16 }}
        style={{ boxShadow: pressed ? PRESSED_SHADOW : REST_SHADOW }}
        className="group relative flex items-center justify-center w-24 h-24 rounded-full
                   bg-[radial-gradient(circle_at_35%_30%,#a84040_0%,#8c2f2f_45%,#5c1d1d_100%)]
                   border border-gilt-strong transition-shadow duration-200"
      >
        {/* Seal impression ring */}
        <span aria-hidden className="absolute inset-2 rounded-full border border-ember-200/25" />
        {/* Candle glow on hover */}
        <span
          aria-hidden
          className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(79,124,240,0.25)_0%,rgba(79,124,240,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />

        {/* Cracks — race outward when the wax is stamped */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full pointer-events-none"
        >
          {CRACKS.map((d) => (
            <m.path
              key={d}
              d={d}
              stroke="rgba(38,12,12,0.7)"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              initial={false}
              animate={{ pathLength: pressed ? 1 : 0, opacity: pressed ? 1 : 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          ))}
        </svg>

        {/* Ember burst on impact */}
        {pressed &&
          Array.from({ length: 6 }).map((_, i) => {
            const ang = (Math.PI * 2 * i) / 6 + 0.35;
            const dist = 32 + (i % 2) * 10;
            return (
              <span
                key={i}
                aria-hidden
                className="seal-spark"
                style={
                  {
                    "--bx": `${Math.cos(ang) * dist}px`,
                    "--by": `${Math.sin(ang) * dist}px`,
                  } as CSSProperties
                }
              />
            );
          })}

        <GiRaven className="relative w-9 h-9 text-ember-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:-rotate-12" />
      </m.a>
    </div>
  );
}

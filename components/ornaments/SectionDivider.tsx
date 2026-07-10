"use client";

import { m } from "motion/react";
import { useDrawOnView } from "@/components/fx/useDrawOnView";

type Variant = "flourish" | "rune";

/**
 * Ornamental gold divider between grimoire chapters. The two rules draw
 * outward from the centre glyph, which blooms in, as the divider scrolls
 * into view. Pure SVG — replaces the old ❖ text separators.
 */
export default function SectionDivider({
  variant = "flourish",
  className = "my-16",
}: Readonly<{
  variant?: Variant;
  className?: string;
}>) {
  const { ref, drawn, reduced } = useDrawOnView<HTMLDivElement>();

  const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const ruleTransition = { duration: reduced ? 0 : 0.9, ease };
  const glyphTransition = {
    duration: reduced ? 0 : 0.7,
    ease,
    delay: reduced ? 0 : 0.3,
  };

  return (
    <div
      ref={ref}
      aria-hidden
      className={`w-full flex items-center justify-center gap-4 select-none pointer-events-none relative z-20 ${className}`}
    >
      <m.div
        className="h-px flex-1 origin-right bg-linear-to-r from-transparent via-gilt to-gilt-strong"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: drawn ? 1 : 0 }}
        transition={ruleTransition}
      />
      <m.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: drawn ? 1 : 0, scale: drawn ? 1 : 0.6 }}
        transition={glyphTransition}
        className="shrink-0"
      >
        {variant === "flourish" ? (
          <svg width="120" height="24" viewBox="0 0 120 24" fill="none" className="text-ember-500">
            {/* Central diamond */}
            <path
              d="M60 4 L67 12 L60 20 L53 12 Z"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="rgba(217,164,65,0.12)"
            />
            <circle cx="60" cy="12" r="1.6" fill="currentColor" />
            {/* Side curls */}
            <path
              d="M49 12 C42 12 40 6 33 8 C28 9.5 26 12 20 12"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.8"
            />
            <path
              d="M71 12 C78 12 80 6 87 8 C92 9.5 94 12 100 12"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.8"
            />
            <circle cx="16" cy="12" r="1.3" fill="currentColor" opacity="0.7" />
            <circle cx="104" cy="12" r="1.3" fill="currentColor" opacity="0.7" />
          </svg>
        ) : (
          <svg width="72" height="24" viewBox="0 0 72 24" fill="none" className="text-ember-500">
            {/* Rune-star trio */}
            <path d="M36 3 L38.4 9.6 L45 12 L38.4 14.4 L36 21 L33.6 14.4 L27 12 L33.6 9.6 Z" fill="currentColor" opacity="0.9" />
            <path d="M14 8 L15.4 11 L18.5 12 L15.4 13 L14 16 L12.6 13 L9.5 12 L12.6 11 Z" fill="currentColor" opacity="0.55" />
            <path d="M58 8 L59.4 11 L62.5 12 L59.4 13 L58 16 L56.6 13 L53.5 12 L56.6 11 Z" fill="currentColor" opacity="0.55" />
          </svg>
        )}
      </m.div>
      <m.div
        className="h-px flex-1 origin-left bg-linear-to-l from-transparent via-gilt to-gilt-strong"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: drawn ? 1 : 0 }}
        transition={ruleTransition}
      />
    </div>
  );
}

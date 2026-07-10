"use client";

import { m } from "motion/react";
import { useDrawOnView } from "@/components/fx/useDrawOnView";

/**
 * The chapter's closing flourish rule — the two gilt rules ink outward from the
 * central diamond as the heading scrolls into view.
 */
export default function ChapterFlourish() {
  const { ref, drawn, reduced } = useDrawOnView<SVGSVGElement>();

  const rule = { duration: reduced ? 0 : 1, ease: "easeInOut" as const };
  const diamond = {
    duration: reduced ? 0 : 0.9,
    ease: "easeInOut" as const,
    delay: reduced ? 0 : 0.35,
  };

  return (
    <svg
      ref={ref}
      aria-hidden
      width="180"
      height="14"
      viewBox="0 0 180 14"
      fill="none"
      className="mt-4 text-ember-500 select-none"
    >
      <m.path
        d="M90 2 L94 7 L90 12 L86 7 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="rgba(217,164,65,0.15)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: drawn ? 1 : 0, opacity: drawn ? 1 : 0 }}
        transition={diamond}
      />
      {/* Rules drawn outward from the centre diamond */}
      <m.path
        d="M78 7 H10"
        stroke="url(#chapterRuleL)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={rule}
      />
      <m.path
        d="M102 7 H170"
        stroke="url(#chapterRuleR)"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: drawn ? 1 : 0 }}
        transition={rule}
      />
      <defs>
        <linearGradient id="chapterRuleL" x1="10" y1="7" x2="78" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id="chapterRuleR" x1="102" y1="7" x2="170" y2="7" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

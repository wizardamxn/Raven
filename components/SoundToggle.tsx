"use client";

import { useSound } from "@/components/providers/SoundProvider";

// A little candle in the nav: lit flame when sound is on, a thread of smoke
// when muted.
export default function SoundToggle() {
  const { enabled, toggle } = useSound();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Mute sound" : "Enable sound"}
      title={enabled ? "Mute sound" : "Enable sound"}
      className="relative flex items-center justify-center w-9 h-9 rounded-full border border-gilt text-ember-300 hover:border-gilt-strong hover:text-ember-200 hover:bg-ink-800/60 transition-colors duration-200"
    >
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none" aria-hidden>
        {enabled ? (
          <path
            d="M9 1 C11 4 12.5 5.5 12.5 7.6 A3.5 3.5 0 0 1 5.5 7.6 C5.5 5.5 7 4 9 1 Z"
            fill="#ffd6d9"
            className="motion-safe:animate-[candle-flicker_3s_ease-in-out_infinite] origin-bottom"
          />
        ) : (
          <path
            d="M9 2 C10 4 8 5 9 7 C10 9 8 10 9 12"
            stroke="#a89d85"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            opacity="0.7"
          />
        )}
        {/* Candle body */}
        <rect
          x="6"
          y="12"
          width="6"
          height="8"
          rx="1"
          fill={enabled ? "rgba(216,58,69,0.85)" : "rgba(110,101,83,0.55)"}
          stroke="rgba(216,58,69,0.4)"
          strokeWidth="0.8"
        />
      </svg>
    </button>
  );
}

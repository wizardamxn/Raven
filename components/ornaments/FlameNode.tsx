/**
 * Candle-flame timeline node — SVG replacement for lantern.png.
 * The current role's flame glows and pulses; past roles burn low.
 */
export default function FlameNode({ current = false }: Readonly<{ current?: boolean }>) {
  return (
    <span
      aria-hidden
      className={`group relative inline-block select-none ${current ? "animate-[glow-pulse_3.5s_ease-in-out_infinite]" : ""}`}
    >
      {/* Invisible padded hitbox so the flame flares from a little way off */}
      <span className="absolute -inset-3" />
      <svg
        width="22"
        height="30"
        viewBox="0 0 22 30"
        fill="none"
        className={`relative transition duration-300 group-hover:brightness-125 group-hover:drop-shadow-[0_0_10px_rgba(217,164,65,0.7)] ${
          current ? "" : "opacity-50 group-hover:opacity-90"
        }`}
      >
        {/* Flame */}
        <path
          d="M11 2 C14 7 17 9.5 17 14 A6 6 0 0 1 5 14 C5 9.5 8 7 11 2 Z"
          fill={current ? "rgba(217,164,65,0.85)" : "rgba(168,157,133,0.5)"}
          stroke={current ? "#eec776" : "#6e6553"}
          strokeWidth="1"
        />
        {/* Inner flame */}
        <path
          d="M11 8 C12.6 10.5 14 11.8 14 14 A3 3 0 0 1 8 14 C8 11.8 9.4 10.5 11 8 Z"
          fill={current ? "#f6dfa4" : "rgba(221,210,186,0.4)"}
        />
        {/* Candle base */}
        <rect x="8" y="21" width="6" height="7" rx="1" fill={current ? "rgba(23,16,33,0.9)" : "rgba(23,16,33,0.7)"} stroke={current ? "rgba(217,164,65,0.5)" : "rgba(110,101,83,0.5)"} strokeWidth="0.8" />
      </svg>
    </span>
  );
}

import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import AuroraVeil from "@/components/ui/aurora-veil";

// The night scene — everything that lives behind the tome.
// A gothic abbey skyline under an arcane sky: aurora ribbons, a living
// starfield with falling stars, a rune-ringed moon, spires and crenellated
// walls in silhouette with a few windows still candlelit, a glowing rose
// window, ground fog, and warm candle light rising behind the tome.
// Silhouettes and light only — no drawn objects to get ugly up close.

// A tiny lancet (pointed-arch) window, lit from within.
function LitWindow({
  x,
  y,
  duration,
}: Readonly<{ x: number; y: number; duration: number }>) {
  return (
    <path
      d="M-1.6 2.6 L-1.6 -0.4 Q0 -2.8 1.6 -0.4 L1.6 2.6 Z"
      transform={`translate(${x} ${y})`}
      fill="#eec776"
      opacity="0.7"
      className="motion-safe:animate-[candle-flicker_var(--dur)_ease-in-out_infinite]"
      style={{ "--dur": `${duration}s` } as React.CSSProperties}
    />
  );
}

export default function GaiaTree() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* ── The arcane sky — aurora ribbons, twinkling starfield, falling stars ── */}
      <AuroraVeil />
      <StarsBackground />
      <ShootingStars />

      {/* ── The moon — rune-ringed anchor of the scene ── */}
      <div className="absolute right-[7vw] top-[8vh] hidden md:block">
        {/* Wide halo */}
        <div className="absolute -inset-28 rounded-full bg-[radial-gradient(circle,rgba(246,223,164,0.14)_0%,rgba(246,223,164,0.05)_45%,rgba(246,223,164,0)_70%)]" />
        <svg viewBox="0 0 160 160" className="relative h-36 w-36 lg:h-44 lg:w-44">
          <defs>
            <radialGradient id="moon-glow" cx="0.42" cy="0.4" r="0.75">
              <stop offset="0" stopColor="rgba(250,238,205,0.6)" />
              <stop offset="0.55" stopColor="rgba(246,223,164,0.35)" />
              <stop offset="1" stopColor="rgba(217,164,65,0.18)" />
            </radialGradient>
          </defs>
          {/* Luminous disc */}
          <circle cx="80" cy="80" r="38" fill="url(#moon-glow)" />
          {/* Arcane ring etched around it, slowly turning */}
          <g
            className="origin-center motion-safe:animate-[sigil-spin_120s_linear_infinite]"
            stroke="rgba(217,164,65,0.4)"
            fill="none"
          >
            <circle cx="80" cy="80" r="56" strokeWidth="0.8" strokeDasharray="3 9" />
            <path d="M80 18 L83 24 L80 28 L77 24 Z" fill="rgba(217,164,65,0.55)" stroke="none" />
            <path d="M80 142 L83 136 L80 132 L77 136 Z" fill="rgba(217,164,65,0.55)" stroke="none" />
            <path d="M18 80 L24 83 L28 80 L24 77 Z" fill="rgba(217,164,65,0.55)" stroke="none" />
            <path d="M142 80 L136 83 L132 80 L136 77 Z" fill="rgba(217,164,65,0.55)" stroke="none" />
          </g>
        </svg>

        {/* The distant flock, crossing the halo */}
        <svg viewBox="0 0 100 40" className="absolute -left-16 top-4 h-10 w-24 text-parchment-300/50" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M10 20 Q14 16 18 20 Q22 16 26 20" />
          <path d="M44 10 Q47 7 50 10 Q53 7 56 10" transform="scale(0.8)" />
          <path d="M70 30 Q73 27 76 30 Q79 27 82 30" transform="scale(0.7) translate(30 14)" />
        </svg>
      </div>

      {/* Mobile moon — smaller, same design */}
      <div className="absolute right-5 top-20 md:hidden opacity-80">
        <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(246,223,164,0.12)_0%,rgba(246,223,164,0)_70%)]" />
        <svg viewBox="0 0 120 120" className="relative h-20 w-20">
          <circle cx="60" cy="60" r="32" fill="rgba(246,223,164,0.16)" stroke="rgba(217,164,65,0.45)" strokeWidth="1" />
          <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(217,164,65,0.35)" strokeWidth="0.8" strokeDasharray="3 9" />
        </svg>
      </div>

      {/* ── Moonlight — one soft blurred shaft falling from the moon ── */}
      <div className="absolute right-[-4vw] top-[4vh] h-[80vh] w-[30vw] origin-top-right rotate-18 blur-3xl bg-linear-to-b from-[rgba(246,223,164,0.07)] via-[rgba(246,223,164,0.025)] to-transparent hidden md:block" />

      {/* Soft light bloom crowning the tome's arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[38vh] w-[60vw] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,164,65,0.07)_0%,rgba(217,164,65,0)_65%)]" />

      {/* ── The horizon — a gothic abbey skyline in silhouette ── */}
      <svg
        viewBox="0 0 1440 340"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 inset-x-0 w-full h-[34vh]"
      >
        {/* Distant abbey masses — faintest */}
        <path
          d="M0 272 L90 272 L120 250 L150 272 L260 272 L300 236 L306 226 L312 236 L340 272 L520 268 L560 240 L600 268 L760 268 L830 246 L900 268 L1080 264 L1140 236 L1146 226 L1152 236 L1200 264 L1320 264 L1440 272 L1440 340 L0 340 Z"
          fill="#171021"
          opacity="0.55"
        />

        {/* Near skyline — towers, walls, spires, the cathedral */}
        <path
          d="M0 340 L0 300 L40 300
             L40 232 L36 232 L54 200 L72 232 L68 232 L68 300
             L100 300 L100 290 L112 290 L112 300 L136 300 L136 290 L148 290 L148 300 L180 300
             L180 190 L176 190 L202 128 L228 190 L224 190 L224 300
             L260 300 L260 290 L272 290 L272 300 L296 300 L296 290 L308 290 L308 300 L352 300
             L352 240 L348 240 L362 214 L376 240 L372 240 L372 258 L404 258 L404 240 L400 240 L414 214 L428 240 L424 240 L424 300
             L520 300 L520 290 L532 290 L532 300 L556 300 L556 290 L568 290 L568 300 L640 300
             L640 226 L652 226 L652 216 L664 216 L664 226 L676 226 L676 216 L688 216 L688 226 L700 226 L700 216 L712 216 L712 226 L724 226 L724 300
             L800 300 L800 290 L812 290 L812 300 L860 300
             L860 180 L856 180 L884 100 L912 180 L908 180 L908 240
             L1034 160 L1160 240
             L1160 180 L1156 180 L1184 100 L1212 180 L1208 180 L1208 300
             L1260 300 L1260 290 L1272 290 L1272 300 L1296 300 L1296 290 L1308 290 L1308 300 L1360 300
             L1360 250 L1356 250 L1372 222 L1388 250 L1384 250 L1384 300
             L1440 300 L1440 340 Z"
          fill="#0d0914"
        />

        {/* Moon-kissed rims on the tallest silhouettes */}
        <path
          d="M202 128 L228 190 M1184 100 L1212 180 M1034 160 L1160 240"
          stroke="rgba(217,164,65,0.16)"
          strokeWidth="1"
          fill="none"
        />

        {/* The rose window — faint gilt tracery, still glowing */}
        <g className="motion-safe:animate-[candle-flicker_11s_ease-in-out_infinite]">
          <circle cx="1034" cy="212" r="17" fill="rgba(217,164,65,0.10)" stroke="rgba(217,164,65,0.35)" strokeWidth="1" />
          <circle cx="1034" cy="212" r="6" fill="none" stroke="rgba(217,164,65,0.3)" strokeWidth="0.8" />
          <path
            d="M1034 195 L1034 229 M1017 212 L1051 212 M1022 200 L1046 224 M1046 200 L1022 224"
            stroke="rgba(217,164,65,0.28)"
            strokeWidth="0.8"
          />
        </g>

        {/* Windows still candlelit across the skyline */}
        <LitWindow x={54} y={250} duration={8} />
        <LitWindow x={202} y={230} duration={6} />
        <LitWindow x={414} y={248} duration={9} />
        <LitWindow x={682} y={258} duration={7} />
        <LitWindow x={884} y={196} duration={10} />
        <LitWindow x={1372} y={266} duration={8} />
      </svg>

      {/* ── Warm candle light rising behind the tome ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[42vh] w-[95vw] bg-[radial-gradient(ellipse_at_50%_100%,rgba(217,164,65,0.12)_0%,rgba(217,164,65,0.04)_45%,rgba(217,164,65,0)_70%)] motion-safe:animate-[candle-flicker_9s_ease-in-out_infinite]" />

      {/* ── Ground fog over the skyline ── */}
      <div className="absolute bottom-0 inset-x-0 h-52 bg-linear-to-t from-ink-700/70 via-ink-800/35 to-transparent" />
      <div className="absolute -bottom-10 left-0 h-64 w-[50vw] bg-[radial-gradient(ellipse_at_15%_100%,rgba(34,26,48,0.75)_0%,rgba(34,26,48,0)_70%)] motion-safe:animate-[mist-drift_26s_ease-in-out_infinite]" />
      <div className="absolute -bottom-10 right-0 h-64 w-[50vw] bg-[radial-gradient(ellipse_at_85%_100%,rgba(34,26,48,0.75)_0%,rgba(34,26,48,0)_70%)] motion-safe:animate-[mist-drift_34s_ease-in-out_-12s_infinite]" />
    </div>
  );
}

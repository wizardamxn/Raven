import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import AuroraVeil from "@/components/ui/aurora-veil";

// The night scene — everything that lives behind the tome.
// Moonlit highlands: a living starfield with the occasional falling star
// (adapted Aceternity components, grimoire-themed), a luminous moon with
// falling light, layered mountain ridges, a distant raven flock, ground fog.
// Light and silhouettes only — no drawn objects to get ugly up close.

export default function GaiaTree() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none"
    >
      {/* ── The night sky — arcane aurora, twinkling starfield, falling stars ── */}
      <AuroraVeil />
      <StarsBackground />
      <ShootingStars />

      {/* ── The moon — anchor of the scene ── */}
      <div className="absolute right-[8vw] top-[9vh] hidden md:block">
        {/* Wide halo */}
        <div className="absolute -inset-24 rounded-full bg-[radial-gradient(circle,rgba(246,223,164,0.12)_0%,rgba(246,223,164,0.04)_45%,rgba(246,223,164,0)_70%)]" />
        <svg viewBox="0 0 120 120" className="relative h-28 w-28 lg:h-32 lg:w-32">
          <defs>
            <radialGradient id="moon-glow" cx="0.42" cy="0.4" r="0.75">
              <stop offset="0" stopColor="rgba(250,238,205,0.55)" />
              <stop offset="0.55" stopColor="rgba(246,223,164,0.32)" />
              <stop offset="1" stopColor="rgba(217,164,65,0.16)" />
            </radialGradient>
          </defs>
          {/* Clean luminous disc */}
          <circle cx="60" cy="60" r="34" fill="url(#moon-glow)" />
        </svg>

        {/* The distant flock, crossing the halo */}
        <svg viewBox="0 0 100 40" className="absolute -left-16 top-2 h-10 w-24 text-parchment-300/50" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M10 20 Q14 16 18 20 Q22 16 26 20" />
          <path d="M44 10 Q47 7 50 10 Q53 7 56 10" transform="scale(0.8)" />
          <path d="M70 30 Q73 27 76 30 Q79 27 82 30" transform="scale(0.7) translate(30 14)" />
        </svg>
      </div>

      {/* Mobile moon — smaller, same design */}
      <div className="absolute right-5 top-20 md:hidden opacity-70">
        <div className="absolute -inset-8 rounded-full bg-[radial-gradient(circle,rgba(246,223,164,0.1)_0%,rgba(246,223,164,0)_70%)]" />
        <svg viewBox="0 0 120 120" className="relative h-16 w-16">
          <circle cx="60" cy="60" r="34" fill="rgba(246,223,164,0.14)" stroke="rgba(217,164,65,0.45)" strokeWidth="1" />
          <path d="M60 26 a34 34 0 0 1 0 68 a44 46 0 0 0 0 -68z" fill="rgba(6,4,10,0.55)" />
        </svg>
      </div>

      {/* ── Moonlight — one soft blurred shaft falling from the moon ── */}
      <div className="absolute right-[-4vw] top-[4vh] h-[80vh] w-[30vw] origin-top-right rotate-18 blur-3xl bg-linear-to-b from-[rgba(246,223,164,0.06)] via-[rgba(246,223,164,0.02)] to-transparent hidden md:block" />

      {/* Soft light bloom crowning the tome's arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[38vh] w-[60vw] bg-[radial-gradient(ellipse_at_50%_0%,rgba(217,164,65,0.07)_0%,rgba(217,164,65,0)_65%)]" />

      {/* ── The horizon — layered mountain ridges ── */}
      <svg
        viewBox="0 0 1440 320"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 inset-x-0 w-full h-[32vh]"
      >
        {/* Far ridge — faintest */}
        <path
          d="M0 210 L120 168 L260 196 L420 130 L560 178 L720 118 L880 172 L1040 138 L1200 186 L1330 152 L1440 190 L1440 320 L0 320 Z"
          fill="#171021"
          opacity="0.5"
        />
        {/* Mid ridge */}
        <path
          d="M0 250 L160 205 L300 238 L480 180 L640 230 L820 172 L980 226 L1160 190 L1300 235 L1440 205 L1440 320 L0 320 Z"
          fill="#171021"
          opacity="0.75"
        />
        {/* Near ridge — darkest, moon-kissed rim */}
        <path
          d="M0 292 L200 248 L360 280 L560 226 L760 275 L960 232 L1140 278 L1320 246 L1440 270 L1440 320 L0 320 Z"
          fill="#0d0914"
        />
        <path
          d="M560 226 L760 275 M960 232 L1140 278"
          stroke="rgba(217,164,65,0.14)"
          strokeWidth="1"
          fill="none"
        />
      </svg>

      {/* ── Ground fog over the ridgeline ── */}
      <div className="absolute bottom-0 inset-x-0 h-52 bg-linear-to-t from-ink-700/70 via-ink-800/35 to-transparent" />
      <div className="absolute -bottom-10 left-0 h-64 w-[50vw] bg-[radial-gradient(ellipse_at_15%_100%,rgba(34,26,48,0.75)_0%,rgba(34,26,48,0)_70%)]" />
      <div className="absolute -bottom-10 right-0 h-64 w-[50vw] bg-[radial-gradient(ellipse_at_85%_100%,rgba(34,26,48,0.75)_0%,rgba(34,26,48,0)_70%)]" />
    </div>
  );
}

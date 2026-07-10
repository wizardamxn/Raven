import Image from "next/image";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import AuroraVeil from "@/components/ui/aurora-veil";
import ParallaxLayer from "@/components/fx/ParallaxLayer";
import ArcaneMoon from "@/components/fx/ArcaneMoon";
import EmberVeil from "@/components/fx/EmberVeil";
import ScrollLitWindows from "@/components/fx/ScrollLitWindows";
import MeteorShower from "@/components/fx/MeteorShower";

// The night scene — everything that lives behind the tome.
// A gothic abbey skyline under an arcane sky: aurora ribbons, a living
// starfield with falling stars, a rune-ringed moon, spires and crenellated
// walls in silhouette with a few windows still candlelit, a glowing rose
// window, ground fog, and warm candle light rising behind the tome.
// Silhouettes and light only — no drawn objects to get ugly up close.

export default function GaiaTree() {
  return (
    <div
      aria-hidden
      className="night-scene pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-[filter] duration-1000"
    >
      {/* ── The backdrop — the painted night panorama that sets the whole key ── */}
      <Image
        src="/Sky10Ann-Hero-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-70"
      />
      {/* Ink grade — deepen the sky's crown and floor so the hero text and the
          tome keep contrast, while the nebula stays legible through the middle.
          A touch of violet in the wash marries the cool image to the grimoire. */}
      <div className="absolute inset-0 bg-linear-to-b from-ink-950/85 via-ink-950/30 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_80%_at_50%_38%,transparent_35%,rgba(6,4,10,0.55)_100%)]" />
      <div className="absolute inset-0 bg-arcane-600/8 mix-blend-overlay" />

      {/* ── The arcane sky — aurora softened to a shimmer so it enhances the
          image's nebula instead of competing with it ── */}
      <div className="opacity-40">
        <AuroraVeil />
      </div>
      <StarsBackground />
      <ShootingStars />
      <MeteorShower />

      {/* ── The moon — rune-ringed anchor of the scene, aware of the cursor ── */}
      <ParallaxLayer speed={0.12} className="absolute right-[7vw] top-[8vh] hidden md:block">
        <ArcaneMoon />
      </ParallaxLayer>

      {/* Mobile moon — smaller, same design */}
      <div className="absolute right-5 top-20 md:hidden opacity-80">
        <div className="absolute -inset-10 rounded-full bg-[radial-gradient(circle,rgba(255,214,217,0.12)_0%,rgba(255,214,217,0)_70%)]" />
        <svg viewBox="0 0 120 120" className="relative h-20 w-20">
          <circle cx="60" cy="60" r="32" fill="rgba(255,214,217,0.16)" stroke="rgba(216,58,69,0.45)" strokeWidth="1" />
          <circle cx="60" cy="60" r="46" fill="none" stroke="rgba(216,58,69,0.35)" strokeWidth="0.8" strokeDasharray="3 9" />
        </svg>
      </div>

      {/* ── Moonlight — one soft blurred shaft falling from the moon ── */}
      <ParallaxLayer speed={0.1} className="absolute right-[-4vw] top-[4vh] h-[80vh] w-[30vw] hidden md:block">
        <div className="h-full w-full origin-top-right rotate-18 blur-3xl bg-linear-to-b from-[rgba(255,214,217,0.07)] via-[rgba(255,214,217,0.025)] to-transparent" />
      </ParallaxLayer>

      {/* Soft light bloom crowning the tome's arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[38vh] w-[60vw] bg-[radial-gradient(ellipse_at_50%_0%,rgba(216,58,69,0.07)_0%,rgba(216,58,69,0)_65%)]" />

      {/* ── The horizon — a gothic abbey skyline, sunk into the painted peaks so
          it reads as the nearest ridge rather than a cut-out over the image ── */}
      <ParallaxLayer
        speed={0.05}
        className="absolute bottom-0 inset-x-0 h-[34vh] opacity-85 mask-[linear-gradient(to_top,black_55%,transparent_100%)]"
      >
      <svg
        viewBox="0 0 1440 340"
        preserveAspectRatio="xMidYMax slice"
        className="w-full h-full"
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
          stroke="rgba(216,58,69,0.16)"
          strokeWidth="1"
          fill="none"
        />

        {/* The rose window — faint gilt tracery, still glowing */}
        <g className="motion-safe:animate-[candle-flicker_11s_ease-in-out_infinite]">
          <circle cx="1034" cy="212" r="17" fill="rgba(216,58,69,0.10)" stroke="rgba(216,58,69,0.35)" strokeWidth="1" />
          <circle cx="1034" cy="212" r="6" fill="none" stroke="rgba(216,58,69,0.3)" strokeWidth="0.8" />
          <path
            d="M1034 195 L1034 229 M1017 212 L1051 212 M1022 200 L1046 224 M1046 200 L1022 224"
            stroke="rgba(216,58,69,0.28)"
            strokeWidth="0.8"
          />
        </g>

        {/* Windows catching candlelight as the reader descends */}
        <ScrollLitWindows />
      </svg>
      </ParallaxLayer>

      {/* ── Warm candle light rising behind the tome ── */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[42vh] w-[95vw] bg-[radial-gradient(ellipse_at_50%_100%,rgba(216,58,69,0.12)_0%,rgba(216,58,69,0.04)_45%,rgba(216,58,69,0)_70%)] motion-safe:animate-[candle-flicker_9s_ease-in-out_infinite]" />

      {/* ── Ground fog over the skyline — seats the painted peaks into the tome ── */}
      <div className="absolute bottom-0 inset-x-0 h-64 bg-linear-to-t from-ink-900 via-ink-800/50 to-transparent" />
      <div className="absolute -bottom-10 left-0 h-64 w-[50vw] bg-[radial-gradient(ellipse_at_15%_100%,rgba(34,26,48,0.75)_0%,rgba(34,26,48,0)_70%)] motion-safe:animate-[mist-drift_26s_ease-in-out_infinite]" />
      <div className="absolute -bottom-10 right-0 h-64 w-[50vw] bg-[radial-gradient(ellipse_at_85%_100%,rgba(34,26,48,0.75)_0%,rgba(34,26,48,0)_70%)] motion-safe:animate-[mist-drift_34s_ease-in-out_-12s_infinite]" />

      {/* ── Embers drifting up through the fog, parting around the cursor ── */}
      <EmberVeil />
    </div>
  );
}

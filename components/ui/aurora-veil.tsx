// Adapted from Aceternity UI "Aurora Background" — recast as a fixed
// arcane aurora veil for the grimoire's night sky: ember-gold and
// arcane-violet ribbons rolling slowly across the upper heavens.
// Pure CSS (no client JS); animation pauses under prefers-reduced-motion
// via the motion-safe variant.

export default function AuroraVeil() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 overflow-hidden select-none"
      style={
        {
          "--aurora":
            "repeating-linear-gradient(100deg,#a52633 10%,#7c5cd6 15%,#f59aa0 20%,#5b3fa8 25%,#d83a45 30%)",
          "--dark-gradient":
            "repeating-linear-gradient(100deg,#06040a 0%,#06040a 7%,transparent 10%,transparent 12%,#06040a 16%)",
        } as React.CSSProperties
      }
    >
      <div
        className={`absolute -inset-2.5 opacity-65 blur-[14px] will-change-transform
                    [background-image:var(--dark-gradient),var(--aurora)]
                    [background-size:300%,200%]
                    [background-position:50%_50%,50%_50%]
                    [mask-image:radial-gradient(ellipse_95%_70%_at_50%_0%,black_25%,transparent_78%)]
                    after:absolute after:inset-0 after:content-['']
                    after:[background-image:var(--dark-gradient),var(--aurora)]
                    after:[background-size:200%,100%]
                    after:[background-attachment:fixed]
                    after:mix-blend-soft-light
                    motion-safe:after:animate-[aurora_45s_linear_infinite]`}
      />
    </div>
  );
}

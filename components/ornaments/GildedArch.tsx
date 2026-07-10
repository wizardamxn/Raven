/**
 * Gilded gothic arch crowning the monolith panel.
 * Crisp SVG replacement for the old topDoor.png raster border.
 */
export default function GildedArch() {
  return (
    <div
      aria-hidden
      className="absolute top-0 inset-x-0 w-full -translate-y-1/2 pointer-events-none select-none z-30 flex justify-center"
    >
      <svg
        viewBox="0 0 640 80"
        fill="none"
        className="w-full max-w-3xl h-14 sm:h-20 text-ember-500"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Central spire finial */}
        <path
          d="M320 6 L326 22 L320 30 L314 22 Z"
          stroke="currentColor"
          strokeWidth="1.4"
          fill="rgba(218,227,244,0.15)"
        />
        <circle cx="320" cy="38" r="2" fill="currentColor" />
        {/* Arch sweep */}
        <path
          d="M40 62 C140 60 220 44 320 44 C420 44 500 60 600 62"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M80 70 C170 68 235 52 320 52 C405 52 470 68 560 70"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          opacity="0.45"
        />
        {/* Hanging side finials */}
        <path d="M150 56 L154 64 L150 72 L146 64 Z" stroke="currentColor" strokeWidth="1" fill="rgba(218,227,244,0.1)" opacity="0.8" />
        <path d="M490 56 L494 64 L490 72 L486 64 Z" stroke="currentColor" strokeWidth="1" fill="rgba(218,227,244,0.1)" opacity="0.8" />
        {/* Vine curls near the crown */}
        <path
          d="M290 44 C280 36 268 34 258 38 M350 44 C360 36 372 34 382 38"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
        <circle cx="254" cy="39" r="1.4" fill="currentColor" opacity="0.7" />
        <circle cx="386" cy="39" r="1.4" fill="currentColor" opacity="0.7" />
        {/* End caps */}
        <circle cx="36" cy="62" r="1.6" fill="currentColor" opacity="0.7" />
        <circle cx="604" cy="62" r="1.6" fill="currentColor" opacity="0.7" />
      </svg>
    </div>
  );
}

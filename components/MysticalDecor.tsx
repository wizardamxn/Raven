// Fixed, non-interactive mystical ornaments layered behind the page content.

// Curved four-point sparkle — far more elegant than a straight star.
const Spark = ({ className }: { className: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0z" />
  </svg>
);

export default function MysticalDecor() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden text-current"
    >
      {/* Perched raven on a bare branch before a crescent moon — top left */}
      <svg viewBox="0 0 140 120" className="absolute -left-2 top-4 h-32 w-36 opacity-[0.14]">
        <path
          d="M96 10a44 44 0 100 84 36 36 0 110-84z"
          fill="none" stroke="currentColor" strokeWidth="1.5"
        />
        <path
          d="M63 22c-7-1-13 2-16 8-3 5-3 10-1 15-6 8-10 18-10 28 0 12 5 21 3 29l6-6c2 4 4 8 8 10l0-8c4 4 9 6 14 6l-6-8c6-6 10-16 10-28 0-12-6-20-12-26 2-4 3-8 2-13l14-5-12-2z"
          fill="currentColor"
        />
        <circle cx="54" cy="31" r="1.6" fill="var(--background, #0a0a0a)" />
        <path d="M8 96c20-4 44-4 70 2M30 99l-8 10M58 100l4 9" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>

      {/* Hanging crystal talismans — top right */}
      <svg viewBox="0 0 80 110" className="absolute right-10 top-0 h-28 w-20 opacity-[0.13]" stroke="currentColor" strokeWidth="1.5" fill="none">
        <path d="M20 0v34M14 44l6-10 6 10-6 16-6-16zM20 34l-4 10M20 34l4 10M20 60v-10" />
        <path d="M56 0v18M50 26l6-8 6 8-6 13-6-13z" />
        <circle cx="56" cy="48" r="2" fill="currentColor" stroke="none" />
      </svg>

      {/* Ornate crescent with companion stars — mid right */}
      <svg viewBox="0 0 80 80" className="absolute right-6 top-[38%] h-16 w-16 opacity-[0.12]" fill="currentColor">
        <path d="M52 6a34 34 0 100 68 27 27 0 110-68zM52 13a27 27 0 000 54 34 34 0 010-54z" fillRule="evenodd" />
        <path d="M16 22c.5 3.5 2.5 5.5 6 6-3.5.5-5.5 2.5-6 6-.5-3.5-2.5-5.5-6-6 3.5-.5 5.5-2.5 6-6z" />
        <circle cx="22" cy="52" r="1.5" />
      </svg>

      {/* Constellation — mid left */}
      <svg viewBox="0 0 120 70" className="absolute left-6 top-[30%] h-16 w-28 opacity-[0.13]">
        <path d="M10 52L34 22 62 34 86 10 110 30" stroke="currentColor" strokeWidth="0.75" fill="none" />
        {[[10, 52], [34, 22], [62, 34], [86, 10], [110, 30]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i === 3 ? 3 : 2} fill="currentColor" />
        ))}
      </svg>

      {/* Arcane summoning circle, half sunk below the fold — bottom left */}
      <svg viewBox="0 0 200 200" className="absolute -bottom-24 -left-16 h-56 w-56 opacity-[0.1]" stroke="currentColor" fill="none">
        <circle cx="100" cy="100" r="92" strokeWidth="1" />
        <circle cx="100" cy="100" r="78" strokeWidth="0.75" strokeDasharray="3 7" />
        <circle cx="100" cy="100" r="52" strokeWidth="1" />
        <path d="M100 52l14 38 40 2-32 25 12 39-34-23-34 23 12-39-32-25 40-2z" strokeWidth="1" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          return (
            <line
              key={i}
              x1={100 + 78 * Math.cos(a)} y1={100 + 78 * Math.sin(a)}
              x2={100 + 92 * Math.cos(a)} y2={100 + 92 * Math.sin(a)}
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* Raven in full flight, wings swept — bottom right */}
      <svg viewBox="0 0 120 60" className="absolute bottom-12 right-8 h-14 w-28 opacity-[0.14]" fill="currentColor">
        <path d="M60 38c-4-8-12-12-22-12-12 0-24-8-32-20 12 8 24 10 34 8-8-4-14-9-18-14 10 4 20 8 28 16 4 4 8 6 10 6s6-2 10-6c8-8 18-12 28-16-4 5-10 10-18 14 10 2 22 0 34-8-8 12-20 20-32 20-10 0-18 4-22 12z" />
        <path d="M60 36l-5 14 5-5 5 5z" />
      </svg>

      {/* Scattered sparkles — a couple slowly pulsing */}
      <Spark className="absolute left-[22%] top-14 h-4 w-4 opacity-[0.14] animate-pulse [animation-duration:4s]" />
      <Spark className="absolute right-[28%] top-[22%] h-3 w-3 opacity-[0.12]" />
      <Spark className="absolute left-[12%] top-[58%] h-3 w-3 opacity-[0.12] animate-pulse [animation-duration:6s]" />
      <Spark className="absolute right-[14%] top-[62%] h-5 w-5 opacity-[0.1]" />
      <Spark className="absolute left-[40%] bottom-10 h-3 w-3 opacity-[0.12] animate-pulse [animation-duration:5s]" />
    </div>
  );
}

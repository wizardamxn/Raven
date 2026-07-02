/**
 * Single source of chapter identity for the grimoire.
 * Roman numeral in Cinzel Decorative, tracked kicker, gold-gradient title,
 * finished with a short flourish rule.
 */
export default function ChapterHeading({
  numeral,
  kicker,
  title,
  id,
}: Readonly<{
  numeral?: string;
  kicker: string;
  title: string;
  id?: string;
}>) {
  return (
    <div id={id} className="w-full flex flex-col items-center text-center mb-10 scroll-mt-28">
      {numeral && (
        <span
          aria-hidden
          className="font-chapter text-ember-500 text-lg tracking-[0.3em] select-none"
        >
          {numeral}
        </span>
      )}
      <span className="mt-1 text-sm sm:text-base tracking-[0.45em] text-ember-400 uppercase font-black">
        {kicker}
      </span>
      <h2 className="font-chapter text-3xl sm:text-4xl font-bold tracking-wide mt-3 text-transparent bg-clip-text bg-linear-to-b from-parchment-100 via-ember-200 to-ember-500">
        {title}
      </h2>
      {/* Flourish rule */}
      <svg
        aria-hidden
        width="180"
        height="14"
        viewBox="0 0 180 14"
        fill="none"
        className="mt-4 text-ember-500 select-none"
      >
        <path d="M90 2 L94 7 L90 12 L86 7 Z" stroke="currentColor" strokeWidth="1" fill="rgba(217,164,65,0.15)" />
        <path d="M10 7 H78" stroke="url(#chapterRuleL)" strokeWidth="1" strokeLinecap="round" />
        <path d="M102 7 H170" stroke="url(#chapterRuleR)" strokeWidth="1" strokeLinecap="round" />
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
    </div>
  );
}

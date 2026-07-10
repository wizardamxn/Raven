/**
 * Single source of chapter identity for the grimoire.
 * Roman numeral in Cinzel Decorative, tracked kicker, gold-gradient title,
 * finished with a short flourish rule that inks in on scroll.
 */
import ChapterFlourish from "@/components/ChapterFlourish";

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
      {/* Flourish rule — inks in on scroll */}
      <ChapterFlourish />
    </div>
  );
}

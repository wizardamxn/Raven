type Corner = "tl" | "tr" | "bl" | "br";

const cornerClass: Record<Corner, string> = {
  tl: "top-0 left-0",
  tr: "top-0 right-0 -scale-x-100",
  bl: "bottom-0 left-0 -scale-y-100",
  br: "bottom-0 right-0 -scale-x-100 -scale-y-100",
};

/**
 * Gold corner flourish for display-case (relic) cards.
 * Drawn once for the top-left, mirrored into place for the rest.
 */
export default function CornerFlourish({ corner }: Readonly<{ corner: Corner }>) {
  return (
    <svg
      aria-hidden
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      className={`absolute ${cornerClass[corner]} text-ember-400 pointer-events-none select-none z-10`}
    >
      <path
        d="M2 20 L2 6 Q2 2 6 2 L20 2"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.75"
      />
      <path
        d="M6 13 Q6 6 13 6"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="2" cy="24" r="1.3" fill="currentColor" opacity="0.6" />
      <circle cx="24" cy="2" r="1.3" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

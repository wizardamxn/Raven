import Image from "next/image";

// The right-hand sibling of the gaia tree — scaled up to balance the
// mirrored giant on the left, with its own faint golden aura so the two
// frame the page as a matched pair.
export default function GothicTree() {
  return (
    <div
      className="hidden md:block fixed bottom-0 -right-6 z-0 h-[62vh] w-[26vw] max-w-sm opacity-85 pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Warm aura rising behind the canopy */}
      <div className="absolute -right-12 bottom-0 h-full w-[130%] bg-[radial-gradient(ellipse_at_70%_60%,rgba(218,227,244,0.06)_0%,rgba(218,227,244,0)_65%)]" />
      <Image
        src="/treeRightFinal.png"
        alt=""
        fill
        sizes="384px"
        className="object-contain object-bottom-right drop-shadow-[0_0_20px_rgba(218,227,244,0.14)]"
      />
      {/* Embers resting on the branches */}
      <span className="absolute right-[30%] top-[22%] h-1 w-1 rounded-full bg-ember-300 shadow-[0_0_8px_2px_rgba(238,199,118,0.5)] animate-[candle-flicker_7s_ease-in-out_infinite]" />
      <span className="absolute right-[55%] top-[35%] h-1 w-1 rounded-full bg-ember-400 shadow-[0_0_8px_2px_rgba(218,227,244,0.45)] animate-[candle-flicker_9s_ease-in-out_infinite]" />
    </div>
  );
}

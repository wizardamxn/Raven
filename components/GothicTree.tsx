import Image from "next/image";

// A lone bare silhouette standing watch in the void on the right —
// kept crisp and dim, no glow, no fuss. Only shown where there's
// actually room for it beside the monolith.
export default function GothicTree() {
  return (
    <div
      className="hidden lg:block fixed bottom-0 -right-4 xl:right-2 2xl:right-10 z-0 w-40 xl:w-52 2xl:w-60 opacity-70 pointer-events-none select-none"
      aria-hidden="true"
    >
      <Image
        src="/treeRightFinal.png"
        alt=""
        width={800}
        height={1250}
        className="w-full h-auto object-contain"
      />
    </div>
  );
}

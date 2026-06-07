import Image from "next/image";

const nameClass =
  "font-script leading-tight inline-block text-transparent bg-clip-text " +
  "bg-linear-to-b from-purple-200 via-purple-400 to-purple-700 " +
  "drop-shadow-[0_0_16px_rgba(168,85,247,0.55)]";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center mt-16 mb-4 select-none overflow-x-hidden">
      <span className="text-zinc-600 text-sm tracking-[0.4em] uppercase mb-5">
        ❖ Conjured with care by ❖
      </span>

      <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 w-full max-w-2xl px-8 sm:px-12">
        {/* Portrait */}
        <div className="relative w-20 h-20 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-purple-950/60 shrink-0 shadow-lg">
          <Image
            src="/footer.jpg"
            alt="A fallen knight at rest amid wildflowers"
            fill
            className="object-cover"
          />
        </div>

        {/* Signature */}
        <div className="flex flex-col items-start">
          <span className={`${nameClass} text-4xl sm:text-7xl`}>Aman</span>
          <span className={`${nameClass} text-lg sm:text-4xl -mt-1`}>aka Shout</span>
          <span className={`${nameClass} text-lg sm:text-4xl -mt-1`}>aka Wizardamxn</span>
        </div>
      </div>
    </footer>
  );
}

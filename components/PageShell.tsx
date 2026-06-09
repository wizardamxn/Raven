import Image from "next/image";
import Footer from "@/components/Footer";
import GothicTree from "@/components/GothicTree";

export default function PageShell({ children }: { children: React.ReactNode }) {
  return (
    // Deep dark void background — same chrome as the sanctum
    <div className="flex flex-col min-h-screen items-center justify-start bg-[#040406] font-sans text-zinc-200 pt-32 pb-24 selection:bg-zinc-700/60 selection:text-zinc-100">
      <GothicTree />

      {/* THE ANCIENT MONOLITH CONTAINER */}
      <main
        className="flex w-full max-w-2xl flex-col items-center bg-linear-to-b from-[#0a0a0f] to-black py-20 px-8 sm:px-12
                       border border-zinc-800/60 border-t-0
                       shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                       relative z-10 text-center"
      >
        {/* THE GOTHIC TOP BORDER IMAGE */}
        <div className="absolute top-0 inset-x-0 w-full h-16 sm:h-24 -translate-y-[50%] pointer-events-none select-none z-30">
          <Image
            src="/topDoor.png"
            alt="Gothic Vine Border"
            fill
            className="object-cover object-center select-none"
            priority
          />
        </div>

        {children}
      </main>

      <Footer />
    </div>
  );
}

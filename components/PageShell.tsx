import Footer from "@/components/Footer";
import GildedArch from "@/components/ornaments/GildedArch";
import ChapterTurn from "@/components/ChapterTurn";

export default function PageShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ChapterTurn>
      {/* The candlelit void — same chrome as the sanctum */}
      <div className="flex flex-col min-h-screen items-center justify-start bg-ink-950 font-sans text-parchment-300 pt-24 pb-24">
        {/* THE ANCIENT MONOLITH — the open tome */}
        <main
          id="main-content"
          className="flex w-full max-w-3xl flex-col items-center bg-linear-to-b from-ink-900 to-black py-12 px-8 sm:px-12
                       border border-gilt border-t-0
                       shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                       relative z-10 text-center"
        >
          <GildedArch />

          {children}
        </main>

        <Footer />
      </div>
    </ChapterTurn>
  );
}

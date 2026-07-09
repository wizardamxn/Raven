import MagicRaven from "@/components/MagicRaven";
import GothicButton from "@/components/GothicButton";
import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { getGithubContributions } from "@/lib/data/github";
import { getValorantStats } from "@/lib/data/valorant";
import { getNowPlaying } from "@/lib/data/lastfm";
import { FiArrowRight, FiChevronDown, FiFileText, FiMail } from "react-icons/fi";
import ArcaneWidgets from "@/components/ArcaneWidget";
import Footer from "@/components/Footer";
import RelicsSection from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import NowPlayingWidget from "@/components/NowPlayingWidget";
import ChapterHeading from "@/components/ChapterHeading";
import Reveal from "@/components/Reveal";
import SectionDivider from "@/components/ornaments/SectionDivider";
import GildedArch from "@/components/ornaments/GildedArch";
import FlameNode from "@/components/ornaments/FlameNode";
import CornerFlourish from "@/components/ornaments/CornerFlourish";

export default async function Home() {
  const [contributions, valorant, nowPlaying] = await Promise.all([
    getGithubContributions(),
    getValorantStats(),
    getNowPlaying(),
  ]);

  return (
    // The candlelit void
    <div className="flex flex-col min-h-screen items-center justify-start bg-ink-950 font-sans text-parchment-300 pb-24">
      <MagicRaven />

      {/* ================= THE TITLE SCREEN ================= */}
      {/* Full-bleed hero over the open night — trees and moon frame it */}
      <section
        id="sanctum"
        className="relative z-10 w-full min-h-[calc(100vh-4rem)] mt-16 flex flex-col items-center justify-center text-center px-6 scroll-mt-28"
      >
        <div className="relative">
          {/* Arcane sigil ring — static, etched behind the avatar */}
          <svg
            aria-hidden
            viewBox="0 0 200 200"
            className="absolute -inset-14 w-[calc(100%+7rem)] h-[calc(100%+7rem)] text-ember-500 opacity-25 pointer-events-none select-none"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="100" cy="100" r="96" strokeWidth="0.8" />
            <circle cx="100" cy="100" r="88" strokeWidth="0.6" strokeDasharray="2 8" />
            <path d="M100 2 L103 8 L100 12 L97 8 Z" fill="currentColor" stroke="none" />
            <path d="M100 188 L103 194 L100 198 L97 194 Z" fill="currentColor" stroke="none" />
            {/* Inner rune ring — turns once every minute and a half */}
            <g
              className="origin-center motion-safe:animate-[sigil-spin_90s_linear_infinite]"
              opacity="0.7"
            >
              <circle cx="100" cy="100" r="78" strokeWidth="0.5" strokeDasharray="1 14" />
              {[12, 58, 95, 141, 188, 226, 273, 322].map((angle) => (
                <line
                  key={angle}
                  x1="100"
                  y1="18"
                  x2="100"
                  y2="26"
                  strokeWidth="0.8"
                  transform={`rotate(${angle} 100 100)`}
                />
              ))}
            </g>
          </svg>

          {/* Ambient candle glow behind the avatar */}
          <div
            aria-hidden
            className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.22)_0%,rgba(217,164,65,0)_70%)] animate-[candle-flicker_5s_ease-in-out_infinite] pointer-events-none"
          />
          {/* Double gilded frame */}
          <div className="relative w-28 h-28 rounded-full p-0.75 bg-linear-to-b from-ember-300 via-ember-500 to-ember-600 shadow-[0_0_30px_rgba(217,164,65,0.25)]">
            <div className="w-full h-full rounded-full p-0.75 bg-ink-900">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <Image
                  src="/avatar.png"
                  alt="Aman Ahmad"
                  fill
                  sizes="112px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Script epigraph — the manuscript's opening line */}
        <p className="mt-8 font-script text-2xl sm:text-3xl text-arcane-300/80 select-none">
          Herein lies the work of
        </p>

        {/* The name — this is the title */}
        <h1
          className="mt-1 font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-wide leading-none
                       text-transparent bg-clip-text bg-linear-to-b from-parchment-100 via-ember-200 to-ember-500
                       drop-shadow-[0_0_35px_rgba(217,164,65,0.2)]"
        >
          Aman Ahmad
        </h1>

        {/* Flourished role line */}
        <div className="mt-5 flex items-center gap-4">
          <span aria-hidden className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-gilt-strong" />
          <p className="text-ember-400 text-sm sm:text-base tracking-[0.35em] uppercase font-bold whitespace-nowrap">
            Full Stack Developer
          </p>
          <span aria-hidden className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-gilt-strong" />
        </div>

        {/* One tight intro line */}
        <p className="max-w-xl mt-6 font-alice text-parchment-300 text-lg sm:text-xl leading-relaxed">
          I build highly performant{" "}
          <span className="text-ember-300 font-sans font-semibold">full-stack</span> web
          ecosystems — from{" "}
          <span className="text-ember-300 font-sans font-semibold">frontend</span> to{" "}
          <span className="text-ember-300 font-sans font-semibold">backend</span> to{" "}
          <span className="text-ember-300 font-sans font-semibold">cloud</span> — resilient
          infrastructure designed to scale under heavy loads.
        </p>

        {/* CTAs */}
        <div className="flex flex-col gap-4 text-lg tracking-widest sm:flex-row justify-center mt-9 relative z-20">
          <GothicButton
            label="Resume"
            icon={<FiFileText className="w-3.5 h-3.5" />}
            href="/resume.pdf"
            variant="primary"
          />
          <GothicButton
            label="Email Me"
            icon={<FiMail className="w-4 h-4" />}
            href="mailto:amank225566@gmail.com"
            variant="ghost"
          />
        </div>

        {/* Descend */}
        <FiChevronDown
          aria-hidden
          className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 text-parchment-500/70 animate-bounce [animation-duration:2.2s]"
        />
      </section>

      {/* ================= THE ANCIENT MONOLITH — the open tome ================= */}
      <main
        id="main-content"
        className="flex w-full max-w-3xl flex-col items-center bg-linear-to-b from-ink-900 to-black py-12 px-8 sm:px-12
                       border border-gilt
                       shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                       relative z-10 text-center mt-10"
      >
        <GildedArch />

        {/* Illuminated-manuscript page — double gilt rule, flourished corners, vellum grain */}
        <div aria-hidden className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute inset-2 border border-gilt">
            <CornerFlourish corner="tl" />
            <CornerFlourish corner="tr" />
            <CornerFlourish corner="bl" />
            <CornerFlourish corner="br" />
          </div>
          <div className="absolute inset-3.5 border border-gilt-faint" />
          <div
            className="absolute inset-0 mix-blend-overlay opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
        </div>

        {/* ================= EXPERIENCE ================= */}
        <Reveal className="w-full">
          <div id="chronicles" className="w-full text-left max-w-xl mx-auto scroll-mt-28 mt-6">
            <ChapterHeading numeral="Chapter I" kicker="Work History" title="Experience" />

            <div className="flex justify-center mb-10 -mt-4">
              <Link
                href="/experience"
                className="group inline-flex items-center gap-2 text-base tracking-[0.15em] uppercase font-bold text-parchment-500 transition-colors hover:text-ember-300"
              >
                View Full Work History
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col gap-10 relative ml-4 pl-6 border-l border-transparent [border-image:linear-gradient(to_bottom,rgba(217,164,65,0.5),rgba(217,164,65,0.08))_1]">
              {experiences.slice(0, 2).map((entry) => (
                <div key={entry.id} className="relative">
                  {/* Timeline Node */}
                  <div className="absolute -left-9.5 -top-0.5">
                    <FlameNode current={entry.current} />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                    <h3 className="font-heading text-2xl font-black tracking-wide text-parchment-100">
                      {entry.role}
                    </h3>
                    <span
                      className={
                        entry.current
                          ? "text-base tracking-wider uppercase font-sans text-ember-300 bg-ink-800/80 px-2 py-0.5 border border-gilt-strong rounded"
                          : "text-base tracking-wider uppercase font-sans text-parchment-500 bg-ink-900/60 px-2 py-0.5 border border-gilt rounded"
                      }
                    >
                      {entry.period}
                    </span>
                  </div>
                  <h4 className="font-heading text-lg tracking-widest text-ember-400 font-bold uppercase mt-1">
                    {entry.company}
                  </h4>
                  <p className="text-parchment-300 text-xl sm:text-2xl leading-relaxed mt-3">
                    {entry.summary}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-4">
                    {entry.technologies.map((tech) => (
                      <div key={tech.name} className="relative group/tech">
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-parchment-100 bg-ink-900 border border-gilt-strong rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/tech:opacity-100 group-hover/tech:scale-100 transition-all duration-200 shadow-lg z-20">
                          {tech.name}
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink-900" />
                        </div>
                        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-ink-800/70 border border-gilt text-parchment-300 transition-all duration-200 hover:text-ember-300 hover:border-gilt-strong cursor-default">
                          <tech.icon className="w-5 h-5" />
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <SectionDivider variant="rune" />

        {/* ================= TESTIMONIALS ================= */}
        <Reveal className="w-full flex flex-col items-center">
          <Testimonials />
        </Reveal>

        <SectionDivider />

        {/* ================= PROJECTS ================= */}
        <Reveal className="w-full">
          <RelicsSection projects={projects} />
        </Reveal>

        <SectionDivider variant="rune" />

        {/* ================= SKILLS ================= */}
        <Reveal className="w-full flex flex-col items-center">
          <Skills />
        </Reveal>

        <SectionDivider />

        {/* ================= CONTACT ================= */}
        <Reveal className="w-full flex flex-col items-center">
          <Contact />
        </Reveal>

        <SectionDivider variant="rune" />

        {/* ================= MUSIC + ACTIVITY ================= */}
        <Reveal className="w-full flex flex-col items-center">
          <NowPlayingWidget initial={nowPlaying} />

          <div id="records" className="w-full text-left max-w-xl mx-auto scroll-mt-28 mt-16">
            <ChapterHeading numeral="Chapter VI" kicker="Live Stats" title="Activity" />

            <div className="flex flex-col gap-12">
              <ArcaneWidgets contributions={contributions} valorant={valorant} />
            </div>
          </div>
        </Reveal>
      </main>

      <Footer />
    </div>
  );
}

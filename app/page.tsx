import RavenCompanion from "@/components/RavenCompanion";
import ChapterTurn from "@/components/ChapterTurn";
import Hero from "@/components/Hero";
import Link from "next/link";
import { experiences } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { getGithubContributions } from "@/lib/data/github";
import { getValorantStats } from "@/lib/data/valorant";
import { getNowPlaying } from "@/lib/data/lastfm";
import { FiArrowRight } from "react-icons/fi";
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
    <ChapterTurn>
      {/* The candlelit void */}
      <div className="flex flex-col min-h-screen items-center justify-start bg-ink-950 font-sans text-parchment-300 pb-24">
        {/* ================= THE TITLE SCREEN ================= */}
        {/* Full-bleed hero over the open night — trees and moon frame it */}
        <Hero />

      {/* ================= THE ANCIENT MONOLITH — the open tome ================= */}
      <main
        id="main-content"
        className="flex w-full max-w-3xl flex-col items-center bg-linear-to-b from-ink-900 to-black py-12 px-8 sm:px-12
                       border border-gilt
                       shadow-[0_25px_60px_rgba(0,0,0,0.9)]
                       relative z-10 text-center mt-10"
      >
        <GildedArch />
        <RavenCompanion />

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
                transitionTypes={["page-turn"]}
                className="group inline-flex items-center gap-2 text-base tracking-[0.15em] uppercase font-bold text-parchment-500 transition-colors hover:text-ember-300"
              >
                View Full Work History
                <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="flex flex-col gap-10 relative ml-4 pl-6 border-l border-transparent [border-image:linear-gradient(to_bottom,rgba(79,124,240,0.5),rgba(79,124,240,0.08))_1]">
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
                      <div key={tech.name} className="relative group/tech tech-chip">
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
    </ChapterTurn>
  );
}

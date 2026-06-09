import MagicRaven from "@/components/MagicRaven";
import GothicTree from "@/components/GothicTree";
import GothicButton from "@/components/GothicButton";
import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { getGithubContributions } from "@/lib/data/github";
import { getValorantStats } from "@/lib/data/valorant";
import { getNowPlaying } from "@/lib/data/lastfm";
import { FiArrowRight, FiFileText } from "react-icons/fi";
import { GiRaven } from "react-icons/gi";
import ArcaneWidgets from "@/components/ArcaneWidget";
import Footer from "@/components/Footer";
import RelicsSection from "@/components/Projects";
import Skills from "@/components/Skills";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import NowPlayingWidget from "@/components/NowPlayingWidget";

export default async function Home() {
  const [contributions, valorant, nowPlaying] = await Promise.all([
    getGithubContributions(),
    getValorantStats(),
    getNowPlaying(),
  ]);

  return (
    // Deep dark void background
    <div className="flex flex-col min-h-screen items-center justify-start bg-[#040406] font-sans text-zinc-200 pt-44 pb-24 selection:bg-zinc-700/60 selection:text-zinc-100">
      <MagicRaven />
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

        {/* ================= 1. THE CENTRAL EMBLEM (AVATAR) ================= */}
        <div id="sanctum" className="relative my-4 scroll-mt-28">
          {/* Detailed circular frame */}
          <div className="relative w-40 h-40 rounded-full p-1 bg-zinc-800 shadow-lg">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src="/avatar.png"
                alt="Aman Ahmad"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          {/* Level indicator */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-zinc-700 text-sm tracking-[0.2em] uppercase px-3 py-0.5 rounded-full text-zinc-300">
            LVL 21
          </div>
        </div>

        {/* ================= 2. THE SUMMONING HEADLINE ================= */}
        <div className="mt-8 flex flex-col items-center">
          <span className="text-lg tracking-[0.5em] text-zinc-500 uppercase font-black">
            Arch-Mage of Code
          </span>
          <h1
            className="font-heading text-4xl sm:text-6xl font-black tracking-wide mt-2
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Aman Ahmad
          </h1>
          <p className="mt-4 text-zinc-300 text-md sm:text-lg tracking-widest uppercase bg-zinc-900/50 border border-zinc-800 px-4 py-1 rounded">
            Full Stack Developer
          </p>
        
        </div>

        {/* ================= 3. THE MYSTICAL CHRONICLES (BIO) ================= */}
        <div className="w-full max-w-xl mt-16 text-left flex flex-col gap-10 border-t border-b border-zinc-800/60 py-10">
          {/* Log 01: The Craft */}
          <div className="flex gap-6 items-start group">
            <div className="flex flex-col items-center">
              <span className="font-mono text-base tracking-widest text-zinc-600 font-black">
                01
              </span>
              <div className="w-px h-12 bg-zinc-800 mt-2" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-black mb-2">
                Manifesto
              </h3>
              <p className="font-alice text-zinc-300 text-xl sm:text-2xl leading-relaxed">
                I craft and orchestrate highly performant web ecosystems,
                forging resilient digital infrastructure designed to scale
                seamlessly under heavy loads.
              </p>
            </div>
          </div>

          {/* Log 02: The Arcana */}
          <div className="flex gap-6 items-start group">
            <div className="flex flex-col items-center">
              <span className="font-mono text-base tracking-widest text-zinc-600 font-black">
                02
              </span>
              <div className="w-px h-12 bg-zinc-800 mt-2" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-black mb-2">
                The Elements
              </h3>
              <p className="font-alice text-zinc-300 text-xl sm:text-2xl leading-relaxed">
                My current architectural loadout is forged primarily through the
                balance of{" "}
                <span className="text-zinc-200 font-sans font-semibold">
                  TypeScript
                </span>
                ,{" "}
                <span className="text-zinc-200 font-sans font-semibold">
                  Next.js
                </span>
                ,{" "}
                <span className="text-zinc-200 font-sans font-semibold">
                  Node.js
                </span>
                , and{" "}
                <span className="text-zinc-200 font-sans font-semibold">
                  MongoDB
                </span>
                {"."}
              </p>
            </div>
          </div>

          {/* Log 03: The Anchors */}
          <div className="flex gap-6 items-start group">
            <div className="flex flex-col items-center">
              <span className="font-mono text-base tracking-widest text-zinc-600 font-black">
                03
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-black mb-2">
                Realms Beyond
              </h3>
              <p className="font-alice text-zinc-300 text-xl sm:text-2xl leading-relaxed">
                When the terminal goes dark, I anchor my focus into physical
                progression tracking at the gym, or defending tactical sectors
                within competitive battlegrounds.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 4. TALISMAN ACTIONS (CTAs) ================= */}
        <div className="flex flex-col gap-4 text-lg tracking-widest sm:flex-row w-full justify-center max-w-md mt-12 relative z-20">

          <GothicButton
            label="Resume"
            icon={<FiFileText className="w-3.5 h-3.5" />}
            href="/resume.pdf"
          />
          <GothicButton
            label="Send Raven"
            icon={<GiRaven className="w-4 h-4" />}
            href="mailto:amank225566@gmail.com"
          />
        </div>

        {/* ================= SKILLS ================= */}
        <Skills />

        {/* Music Section */}
        <NowPlayingWidget initial={nowPlaying} />

        {/* Separator */}
        <div className="w-full flex items-center justify-center gap-4 my-16 select-none pointer-events-none relative z-20">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-lg tracking-widest text-zinc-600">❖</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* ================= 5. WORK EXPERIENCE ================= */}
        <div id="chronicles" className="w-full text-left max-w-xl scroll-mt-28">
          <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
            Work Experience
          </span>
          <h2
            className="font-heading text-4xl font-black tracking-wide text-center mb-4
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Experience
          </h2>

          <div className="flex justify-center mb-10">
            <Link
              href="/experience"
              className="group inline-flex items-center gap-2 text-base tracking-[0.15em] uppercase font-bold text-zinc-400 transition-colors hover:text-white"
            >
              View Full Work History
              <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="flex flex-col gap-10 relative border-l border-zinc-800 ml-4 pl-6">
            {experiences.slice(0, 2).map((entry) => (
              <div key={entry.id} className="relative">
                {/* Timeline Node */}
                <div className="absolute -left-10 -top-0.5">
                  <Image
                    src="/lantern.png"
                    alt="Timeline lantern"
                    width={28}
                    height={40}
                    className={entry.current ? "object-contain" : "object-contain opacity-50"}
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h3 className="font-heading text-2xl font-black tracking-wide text-zinc-100">
                    {entry.role}
                  </h3>
                  <span
                    className={
                      entry.current
                        ? "text-base tracking-wider uppercase font-sans text-zinc-300 bg-zinc-800/60 px-2 py-0.5 border border-zinc-700 rounded"
                        : "text-base tracking-wider uppercase font-sans text-zinc-500 bg-zinc-900/50 px-2 py-0.5 border border-zinc-800/60 rounded"
                    }
                  >
                    {entry.period}
                  </span>
                </div>
                <h4 className="font-heading text-lg tracking-widest text-zinc-400 font-bold uppercase mt-1">
                  {entry.company}
                </h4>
                <p className="text-zinc-400 text-xl sm:text-2xl leading-relaxed mt-3">
                  {entry.summary}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      title={tech.name}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400"
                    >
                      <tech.icon className="w-5 h-5" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
        {/* Separator */}
        <div className="w-full flex items-center justify-center gap-4 my-16 select-none pointer-events-none relative z-20">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-lg tracking-widest text-zinc-600">❖</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>
        {/* ================= 6. RELICS OF CREATION (PROJECTS) ================= */}
        <RelicsSection projects={projects} />

        {/* Separator */}
        <div className="w-full flex items-center justify-center gap-4 my-16 select-none pointer-events-none relative z-20">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-lg tracking-widest text-zinc-600">❖</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* ================= TESTIMONIALS ================= */}
        <Testimonials />

        {/* Separator */}
        <div className="w-full flex items-center justify-center gap-4 my-16 select-none pointer-events-none relative z-20">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-lg tracking-widest text-zinc-600">❖</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* ================= CONTACT ================= */}
        <Contact />

        {/* Separator */}
        <div className="w-full flex items-center justify-center gap-4 my-16 select-none pointer-events-none relative z-20">
          <div className="h-px flex-1 bg-zinc-800" />
          <span className="text-lg tracking-widest text-zinc-600">❖</span>
          <div className="h-px flex-1 bg-zinc-800" />
        </div>

        {/* ================= 7. RECORDS OF THE REALM (GITHUB + VALORANT) ================= */}
        <div
          id="records"
          className="w-full text-left max-w-xl mt-16 pt-8 border-t border-zinc-800/60 scroll-mt-28"
        >
          <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
            Living Archives
          </span>
          <h2 className="font-heading text-4xl font-black tracking-wide text-center mb-10 text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500">
            Records of the Realm
          </h2>

          <div className="flex flex-col gap-12">
            {/* Widget A — GitHub contributions heatmap */}
            <ArcaneWidgets contributions={contributions} valorant={valorant} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

import MagicRaven from "@/components/MagicRaven";
import ResumeButton from "@/components/ResumeButton";
import GothicButton from "@/components/GothicButton";
import Image from "next/image";
import { experiences } from "@/lib/data/experience";
import { projects } from "@/lib/data/projects";
import { getGithubContributions } from "@/lib/data/github";
import { getValorantStats } from "@/lib/data/valorant";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export default async function Home() {
  const [contributions, valorant] = await Promise.all([
    getGithubContributions(),
    getValorantStats(),
  ]);

  return (
    // Deep dark void background
    <div className="flex flex-col min-h-screen items-center justify-start bg-[#040406] font-sans text-zinc-200 pt-44 pb-24 selection:bg-purple-900/60 selection:text-purple-200">
      <MagicRaven />

      {/* THE ANCIENT MONOLITH CONTAINER */}
      <main
        className="flex w-full max-w-2xl flex-col items-center bg-linear-to-b from-[#0a0a0f] to-black py-20 px-8 sm:px-12
                       border border-purple-950/30 border-t-0
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
        <div className="relative my-4">
          {/* Outer glowing magic circle background */}
          <div className="absolute inset-0 rounded-full bg-purple-600/10 blur-xl scale-125 animate-pulse" />

          {/* Detailed circular frame */}
          <div className="relative w-40 h-40 rounded-full p-1 bg-linear-to-b from-purple-900/50 via-zinc-800 to-purple-950/40 shadow-2xl">
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
          {/* Floating crystal decoration indicator */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-900 border border-purple-500/40 text-sm tracking-[0.2em] uppercase px-3 py-0.5 rounded-full text-purple-300 shadow-md">
            LVL 21
          </div>
        </div>

        {/* ================= 2. THE SUMMONING HEADLINE ================= */}
        <div className="mt-8 flex flex-col items-center">
          <span className="text-lg tracking-[0.5em] text-purple-500/70 uppercase font-black">
            Arch-Mage of Code
          </span>
          <h1
            className="font-heading text-4xl sm:text-6xl font-black tracking-wide mt-2
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Aman Ahmad
          </h1>
          <p className="mt-4 text-purple-400 text-xl sm:text-2xl tracking-widest uppercase bg-purple-950/20 border border-purple-900/30 px-4 py-1 rounded">
            ✦ Full Stack Developer ✦
          </p>
        </div>

        {/* ================= 3. THE MYSTICAL CHRONICLES (BIO) ================= */}
        <div className="w-full max-w-xl mt-16 text-left flex flex-col gap-10 border-t border-b border-purple-950/20 py-10">
          {/* Log 01: The Craft */}
          <div className="flex gap-6 items-start group">
            <div className="flex flex-col items-center">
              <span className="font-mono text-base tracking-widest text-purple-500/60 font-black">
                01
              </span>
              <div className="w-[1px] h-12 bg-linear-to-b from-purple-950/50 to-transparent mt-2" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-black mb-2">
                Manifesto
              </h3>
              <p className="font-alice text-zinc-300 text-2xl sm:text-3xl leading-relaxed">
                I craft and orchestrate highly performant web ecosystems,
                forging resilient digital infrastructure designed to scale
                seamlessly under heavy loads.
              </p>
            </div>
          </div>

          {/* Log 02: The Arcana */}
          <div className="flex gap-6 items-start group">
            <div className="flex flex-col items-center">
              <span className="font-mono text-base tracking-widest text-purple-500/60 font-black">
                02
              </span>
              <div className="w-[1px] h-12 bg-linear-to-b from-purple-950/50 to-transparent mt-2" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-black mb-2">
                The Elements
              </h3>
              <p className="font-alice text-zinc-300 text-2xl sm:text-3xl leading-relaxed">
                My current architectural loadout is forged primarily through the
                balance of{" "}
                <span className="text-purple-400 font-sans font-semibold">
                  TypeScript
                </span>
                ,{" "}
                <span className="text-purple-400 font-sans font-semibold">
                  Next.js
                </span>
                ,{" "}
                <span className="text-purple-400 font-sans font-semibold">
                  Node.js
                </span>
                , and{" "}
                <span className="text-purple-400 font-sans font-semibold">
                  MongoDB
                </span>
                {"."}
              </p>
            </div>
          </div>

          {/* Log 03: The Anchors */}
          <div className="flex gap-6 items-start group">
            <div className="flex flex-col items-center">
              <span className="font-mono text-base tracking-widest text-purple-500/60 font-black">
                03
              </span>
            </div>
            <div className="flex-1">
              <h3 className="text-sm uppercase tracking-[0.3em] text-zinc-500 font-black mb-2">
                Realms Beyond
              </h3>
              <p className="font-alice text-zinc-300 text-2xl sm:text-3xl leading-relaxed">
                When the terminal goes dark, I anchor my focus into physical
                progression tracking at the gym, or defending tactical sectors
                within competitive battlegrounds.
              </p>
            </div>
          </div>
        </div>

        {/* ================= 4. TALISMAN ACTIONS (CTAs) ================= */}
        <div className="flex flex-col gap-4 text-lg tracking-widest sm:flex-row w-full justify-center max-w-md mt-12 relative z-20">
          <ResumeButton />

          <GothicButton label="SEND RAVEN" href="mailto:aabaa@gmail.com" />
        </div>

        {/* Music Section */}
        <div className="w-full mt-16 pt-8 border-t border-purple-950/20 max-w-xl">
          <div className="flex flex-col items-center gap-3 bg-[#07070a] border border-zinc-900 p-4 rounded-xl relative overflow-hidden group">
            {/* Ambient inner pulsing bar indicator */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

            <div className="flex items-center gap-4 w-full">
              {/* Album Artwork Seal */}
              <div className="relative w-14 h-14 rounded-lg overflow-hidden border border-purple-950 shrink-0 shadow-lg">
                <Image
                  src="/dance-brothers.jpg"
                  alt="Album Cover"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Track Content */}
              <div className="flex flex-col text-left flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base tracking-[0.25em] uppercase text-purple-400 font-black">
                    CURRENTLY SUMMONED
                  </span>
                  <span className="flex gap-[2px] h-3 items-end">
                    <span className="w-[2px] bg-purple-500 rounded-full animate-[pulse_1s_infinite_alternate] h-2" />
                    <span className="w-[2px] bg-purple-500 rounded-full animate-[pulse_0.7s_infinite_alternate_delay-100] h-3" />
                    <span className="w-[2px] bg-purple-500 rounded-full animate-[pulse_0.9s_infinite_alternate_delay-200] h-1.5" />
                  </span>
                </div>
                <span className="text-2xl font-bold text-zinc-100 truncate mt-0.5">
                  Low Man's Lyric
                </span>
                <span className="text-lg text-zinc-500 truncate">
                  Universal Production Music
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full flex items-center justify-center gap-4 my-16 select-none pointer-events-none relative z-20">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-purple-900/50" />
          <div className="h-[1px] w-16 bg-gradient-to-r from-purple-900/50 to-purple-500" />
          <span className="text-2xl tracking-widest text-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">
            ❖ ✧ ☠ ✧ ❖
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-purple-900/50 to-purple-500" />
          <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-purple-900/50" />
        </div>

        {/* ================= 5. CHRONICLES OF MASTERY (EXPERIENCE) ================= */}
        <div className="w-full text-left max-w-xl">
          <span className="block text-center text-base tracking-[0.4em] text-purple-500/70 uppercase font-black mb-2">
            Past Campaigns
          </span>
          <h2
            className="font-heading text-4xl font-black tracking-wide text-center mb-10
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Chronicles of Mastery
          </h2>

          <div className="flex flex-col gap-10 relative border-l border-purple-950/40 ml-4 pl-6">
            {experiences.slice(0, 2).map((entry) => (
              <div key={entry.id} className="relative">
                {/* Timeline Node */}
                <div className="absolute -left-10 -top-0.5">
                  <Image
                    src="/lantern.png"
                    alt="Timeline lantern"
                    width={28}
                    height={40}
                    className={
                      entry.current
                        ? "drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] object-contain"
                        : "object-contain opacity-60"
                    }
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                  <h3 className="font-heading text-2xl font-black tracking-wide text-zinc-100">
                    {entry.role}
                  </h3>
                  <span
                    className={
                      entry.current
                        ? "text-base tracking-wider uppercase font-sans text-purple-400/80 bg-purple-950/30 px-2 py-0.5 border border-purple-900/30 rounded"
                        : "text-base tracking-wider uppercase font-sans text-zinc-500 bg-zinc-900/50 px-2 py-0.5 border border-zinc-800/60 rounded"
                    }
                  >
                    {entry.period}
                  </span>
                </div>
                <h4 className="font-heading text-lg tracking-widest text-zinc-400 font-bold uppercase mt-1">
                  {entry.company}
                </h4>
                <p className="text-zinc-400 text-2xl sm:text-3xl leading-relaxed mt-3">
                  {entry.summary}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {entry.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      title={tech.name}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-purple-950/40 text-purple-400/80"
                    >
                      <tech.icon className="w-5 h-5" />
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================= 6. RELICS OF CREATION (PROJECTS) ================= */}
        <div className="w-full text-left max-w-xl mt-16 pt-8 border-t border-purple-950/20">
          <span className="block text-center text-base tracking-[0.4em] text-purple-500/70 uppercase font-black mb-2">
            Forged Artifacts
          </span>
          <h2
            className="font-heading text-4xl font-black tracking-wide text-center mb-10
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Relics of Creation
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="flex flex-col">
                {/* Gothic-framed project image */}
                <div className="relative aspect-video">
                  <div className="absolute inset-0 rounded-xl bg-purple-600/10 blur-xl scale-105" />
                  <div className="relative w-full h-full rounded-xl p-[3px] bg-linear-to-b from-purple-900/50 via-zinc-800 to-purple-950/40 shadow-xl">
                    <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-zinc-900">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="pointer-events-none absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-purple-500/50 rounded-tl-md" />
                    <span className="pointer-events-none absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-purple-500/50 rounded-tr-md" />
                    <span className="pointer-events-none absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-purple-500/50 rounded-bl-md" />
                    <span className="pointer-events-none absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-purple-500/50 rounded-br-md" />
                  </div>
                </div>

                <h3 className="font-heading text-xl font-black tracking-wide text-zinc-100 mt-4">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-lg leading-relaxed mt-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech.name}
                      title={tech.name}
                      className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-purple-950/40 text-purple-400/80"
                    >
                      <tech.icon className="w-5 h-5" />
                    </span>
                  ))}
                </div>

                {(project.liveUrl || project.repoUrl) && (
                  <div className="flex gap-3 mt-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View live demo"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-purple-950/40 text-purple-400/80 transition-colors hover:text-purple-300 hover:border-purple-500/50 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    )}
                    {project.repoUrl && (
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View source code"
                        className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-purple-950/40 text-purple-400/80 transition-colors hover:text-purple-300 hover:border-purple-500/50 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                      >
                        <FiGithub className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ================= 7. RECORDS OF THE REALM (GITHUB + VALORANT) ================= */}
        <div className="w-full text-left max-w-xl mt-16 pt-8 border-t border-purple-950/20">
          <span className="block text-center text-base tracking-[0.4em] text-purple-500/70 uppercase font-black mb-2">
            Living Archives
          </span>
          <h2 className="font-heading text-4xl font-black tracking-wide text-center mb-10 text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500">
            Records of the Realm
          </h2>

          <div className="flex flex-col gap-12">
            {/* Widget A — GitHub contributions heatmap */}
            <div className="flex flex-col">
              <h3 className="font-heading text-xl font-black tracking-wide text-zinc-100 mb-1">
                Commit Sigils
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                A year of arcane labor, etched into the archive of{" "}
                <span className="text-purple-400/90">@{contributions?.username ?? "Valtryek"}</span>.
              </p>

              {contributions ? (
                <div className="relative rounded-xl p-[1px] bg-linear-to-b from-purple-900/50 via-zinc-800 to-purple-950/40 shadow-xl">
                  <div className="rounded-[11px] bg-zinc-950/80 p-4 overflow-x-auto">
                    <div className="flex gap-[3px] w-max">
                      {contributions.weeks.map((week, weekIndex) => (
                        <div key={weekIndex} className="flex flex-col gap-[3px]">
                          {week.map((day, dayIndex) => {
                            const levelClasses: Record<number, string> = {
                              0: "bg-zinc-900/60 border-purple-950/30",
                              1: "bg-purple-950/50 border-purple-900/40",
                              2: "bg-purple-800/60 border-purple-700/40",
                              3: "bg-purple-600/80 border-purple-500/50 drop-shadow-[0_0_4px_rgba(168,85,247,0.5)]",
                              4: "bg-purple-500 border-purple-400/60 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]",
                            };
                            return (
                              <span
                                key={dayIndex}
                                title={day.date ? `${day.count} contributions on ${day.date}` : undefined}
                                className={`w-[10px] h-[10px] rounded-[2px] border ${levelClasses[day.level]}`}
                              />
                            );
                          })}
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-end gap-2 mt-4 text-zinc-500 text-sm">
                      <span>Faint</span>
                      <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-900/60 border-purple-950/30" />
                      <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-950/50 border-purple-900/40" />
                      <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-800/60 border-purple-700/40" />
                      <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-600/80 border-purple-500/50" />
                      <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-500 border-purple-400/60" />
                      <span>Ablaze</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-purple-950/30 bg-zinc-950/60 px-6 py-10 text-center text-zinc-500 text-lg">
                  The commit-spirits are silent for now.
                </div>
              )}
            </div>

            {/* Widget B — Valorant stat card */}
            <div className="flex flex-col">
              <h3 className="font-heading text-xl font-black tracking-wide text-zinc-100 mb-1">
                Battlefield Standing
              </h3>
              <p className="text-zinc-400 text-lg leading-relaxed mb-4">
                Skirmishes fought under the banner of Valorant.
              </p>

              {valorant ? (
                <div className="relative rounded-xl p-[1px] bg-linear-to-b from-purple-900/50 via-zinc-800 to-purple-950/40 shadow-xl">
                  <div className="rounded-[11px] bg-zinc-950/80 p-6 flex items-center gap-6">
                    {valorant.rankIconUrl && (
                      <div className="relative w-16 h-16 shrink-0 drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                        <Image src={valorant.rankIconUrl} alt={valorant.currentTier} fill className="object-contain" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-heading text-xl font-black tracking-wide text-zinc-100">
                          {valorant.riotName}
                          <span className="text-purple-500/70">#{valorant.riotTag}</span>
                        </span>
                        <span className="text-xs font-black tracking-widest uppercase px-2 py-1 rounded-md bg-purple-950/50 border border-purple-800/40 text-purple-300/90">
                          LVL {valorant.accountLevel}
                        </span>
                      </div>
                      <p className="text-purple-400/90 text-lg mt-1">{valorant.currentTier}</p>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 mt-2 text-zinc-400 text-base">
                        <span>RR <span className="text-zinc-200">{valorant.rr}</span></span>
                        <span>Elo <span className="text-zinc-200">{valorant.elo}</span></span>
                        <span>
                          Last Match{" "}
                          <span className={valorant.mmrChange >= 0 ? "text-green-400" : "text-red-400"}>
                            {valorant.mmrChange >= 0 ? "+" : ""}
                            {valorant.mmrChange}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-purple-950/30 bg-zinc-950/60 px-6 py-10 text-center text-zinc-500 text-lg">
                  The sigil remains unattuned.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

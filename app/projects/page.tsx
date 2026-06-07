import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { projects } from "@/lib/data/projects";
import { FiArrowLeft, FiExternalLink, FiGithub } from "react-icons/fi";

export const metadata = {
  title: "Relics of Creation — Aman Ahmad",
  description:
    "The complete grimoire of forged artifacts — every project, every enchantment woven into it, told in full.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="w-full text-left max-w-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-purple-400/70 transition-colors hover:text-purple-300 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
        >
          <FiArrowLeft className="w-4 h-4" />
          Return to the Sanctum
        </Link>

        <div className="mt-10 mb-14">
          <span className="block text-center text-base tracking-[0.4em] text-purple-500/70 uppercase font-black mb-2">
            The Complete Grimoire
          </span>
          <h1
            className="font-heading text-4xl sm:text-5xl font-black tracking-wide text-center mb-6
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Relics of Creation
          </h1>
          <p className="font-alice text-zinc-400 text-2xl sm:text-3xl leading-relaxed text-center italic max-w-md mx-auto">
            Artifacts forged in the late hours — each one summoned from a blank page into a working enchantment, with the full account of how it came to be.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {projects.map((project, index) => (
            <article key={project.id} className="flex flex-col">
              {/* Enchanted artifact frame around the project image */}
              <div className="relative aspect-video">
                <div
                  className="absolute inset-0 rounded-xl bg-purple-600/20 blur-xl scale-105"
                  style={{ animation: "deepPulse 6s ease-in-out infinite" }}
                />
                <div
                  className="relative w-full h-full rounded-xl p-[3px] bg-linear-to-b from-purple-500/50 via-zinc-800 to-purple-950/50 shadow-xl"
                  style={{ animation: "deepPulse 6s ease-in-out infinite" }}
                >
                  <div className="relative w-full h-full rounded-[10px] overflow-hidden bg-zinc-900 border border-purple-900/20">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(5,5,8,0.55)_100%)]" />
                  </div>

                  <span
                    className="pointer-events-none absolute top-1 left-1 w-5 h-5 border-t-2 border-l-2 border-purple-400/60 rounded-tl-md"
                    style={{ animation: "runeGlow 3s ease-in-out infinite", animationDelay: "0s" }}
                  />
                  <span
                    className="pointer-events-none absolute top-1 right-1 w-5 h-5 border-t-2 border-r-2 border-purple-400/60 rounded-tr-md"
                    style={{ animation: "runeGlow 3s ease-in-out infinite", animationDelay: "0.5s" }}
                  />
                  <span
                    className="pointer-events-none absolute bottom-1 left-1 w-5 h-5 border-b-2 border-l-2 border-purple-400/60 rounded-bl-md"
                    style={{ animation: "runeGlow 3s ease-in-out infinite", animationDelay: "1s" }}
                  />
                  <span
                    className="pointer-events-none absolute bottom-1 right-1 w-5 h-5 border-b-2 border-r-2 border-purple-400/60 rounded-br-md"
                    style={{ animation: "runeGlow 3s ease-in-out infinite", animationDelay: "1.5s" }}
                  />
                </div>
              </div>

              <span className="text-purple-500/60 text-sm tracking-[0.35em] uppercase font-bold mt-6">
                Relic {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-wide text-zinc-100 mt-1">
                {project.title}
              </h2>
              <p className="font-alice text-zinc-400 text-2xl sm:text-3xl leading-relaxed mt-2 italic">
                {project.description}
              </p>

              <ul className="flex flex-col gap-3 mt-5">
                {project.highlights.map((point, i) => (
                  <li key={i} className="flex gap-3 text-zinc-400 text-2xl sm:text-3xl leading-relaxed">
                    <span className="mt-2 text-purple-500/70 text-xs shrink-0 drop-shadow-[0_0_6px_rgba(168,85,247,0.7)]">
                      ✧
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-6">
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
            </article>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-purple-950/20 flex flex-col items-center gap-4 text-center">
          <span className="text-zinc-600 text-sm tracking-[0.3em] uppercase">Wind back the clock</span>
          <Link
            href="/experience"
            className="group inline-flex items-center gap-2 font-heading text-xl sm:text-2xl font-black tracking-wide
                       text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500
                       transition-all hover:drop-shadow-[0_0_14px_rgba(168,85,247,0.5)]"
          >
            <FiArrowLeft className="w-5 h-5 text-purple-400 transition-transform group-hover:-translate-x-1" />
            Revisit the Chronicles of Mastery
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

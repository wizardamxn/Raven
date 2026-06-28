import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { projects } from "@/lib/data/projects";
import { hasCaseStudy } from "@/lib/data/caseStudies";
import ProjectLinks from "@/components/ProjectLinks";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

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
          className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <FiArrowLeft className="w-4 h-4" />
          Return to the Sanctum
        </Link>

        <div className="mt-10 mb-14">
          <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
            The Complete Grimoire
          </span>
          <h1
            className="font-heading text-4xl sm:text-5xl font-black tracking-wide text-center mb-6
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Relics of Creation
          </h1>
          <p className="font-alice text-zinc-400 text-2xl sm:text-3xl leading-relaxed text-center italic max-w-md mx-auto">
            Artifacts forged in the late hours — each one summoned from a blank
            page into a working enchantment, with the full account of how it
            came to be.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {projects.map((project, index) => (
            <article key={project.id} className="flex flex-col">
              {/* Project image frame */}
              <div className="relative aspect-video">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(5,5,8,0.55)_100%)]" />
                </div>
              </div>

              <span className="text-zinc-600 text-sm tracking-[0.35em] uppercase font-bold mt-6">
                Relic {String(index + 1).padStart(2, "0")}
              </span>


              {hasCaseStudy(project.id) ? (
                <Link
                  href={`/projects/${project.id}`}
                  className="group/title inline-flex items-center gap-2 mt-1 w-fit"
                >
                  <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-wide text-zinc-100 hover:underline animate-pulse">
                    {project.title}
                  </h2>
                  <FiArrowRight className="w-5 h-5 text-zinc-500 transition-all duration-300 group-hover/title:translate-x-1 group-hover/title:text-zinc-300" />
                </Link>
              ) : (
                <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-wide text-zinc-100 mt-1 hover:underline animate-pulse">
                  {project.title}
                </h2>
              )}

              {(project.liveUrl || project.repoUrl || project.repoUrls?.length) && (
                <div className="mt-3">
                  <ProjectLinks project={project} size="sm" />
                </div>
              )}

              <p className="font-alice text-zinc-400 text-xl sm:text-2xl leading-relaxed mt-2 italic">
                {project.description}
              </p>

              <ul className="flex flex-col gap-3 mt-5">
                {project.highlights.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-zinc-400 text-xl sm:text-xl leading-relaxed"
                  >
                    <span className="mt-2 text-zinc-600 text-xs shrink-0">
                      ✧
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-6">
                {project.technologies.map((tech) => (
                  <div key={tech.name} className="relative group/tech">
                    {/* Custom Tooltip Box */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-zinc-200 bg-zinc-950 border border-zinc-700 rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/tech:opacity-100 group-hover/tech:scale-100 group-hover/tech:pointer-events-auto transition-all duration-200 shadow-lg z-20">
                      {tech.name}
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-950" />
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.25 border-4 border-transparent border-t-zinc-700 -z-10" />
                    </div>

                    {/* Icon Container */}
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-all duration-200 hover:text-zinc-200 hover:border-zinc-700 hover:shadow-[0_0_14px_rgba(212,212,216,0.3)] cursor-default">
                      <tech.icon className="w-5 h-5" />
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-zinc-800/60 flex flex-col items-center gap-4 text-center">
          <span className="text-zinc-600 text-sm tracking-[0.3em] uppercase">
            Wind back the clock
          </span>
          <Link
            href="/experience"
            className="group inline-flex items-center gap-2 font-heading text-xl sm:text-2xl font-black tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            <FiArrowLeft className="w-5 h-5 text-zinc-400 transition-transform group-hover:-translate-x-1" />
            Revisit the Chronicles of Mastery
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

import { ViewTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import CornerFlourish from "@/components/ornaments/CornerFlourish";
import { projects } from "@/lib/data/projects";
import { hasCaseStudy } from "@/lib/data/caseStudies";
import ProjectLinks from "@/components/ProjectLinks";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const metadata = {
  title: "Projects — Aman Ahmad",
  description:
    "Every project in full — what it does, how it was built, and the technology behind it.",
};

export default function ProjectsPage() {
  return (
    <PageShell>
      <div className="w-full text-left max-w-xl">
        <Link
          href="/"
          transitionTypes={["page-turn"]}
          className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-parchment-500 transition-colors hover:text-ember-300"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mt-10 mb-14">
          <span className="block text-center text-base tracking-[0.4em] text-ember-400 uppercase font-black mb-2">
            All Work
          </span>
          <h1
            className="font-chapter text-4xl sm:text-5xl font-bold tracking-wide text-center mb-6
                         text-transparent bg-clip-text bg-linear-to-b from-parchment-100 via-ember-200 to-ember-500"
          >
            Projects
          </h1>
          <p className="font-alice text-parchment-300 text-2xl sm:text-3xl leading-relaxed text-center italic max-w-md mx-auto">
            Artifacts forged in the late hours — each one summoned from a blank
            page into a working enchantment, with the full account of how it
            came to be.
          </p>
        </div>

        <div className="flex flex-col gap-20">
          {projects.map((project, index) => (
            <article key={project.id} className="flex flex-col">
              {/* Relic display case */}
              <div className="relative aspect-video">
                <ViewTransition name={`relic-${project.id}`} share="morph">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-ink-800 border border-gilt">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 576px) 100vw, 576px"
                      className="object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(6,4,10,0.6)_100%)]" />
                    <CornerFlourish corner="tl" />
                    <CornerFlourish corner="tr" />
                    <CornerFlourish corner="bl" />
                    <CornerFlourish corner="br" />
                  </div>
                </ViewTransition>
              </div>

              <span className="font-chapter text-ember-500 text-sm tracking-[0.35em] uppercase font-bold mt-6">
                Project {String(index + 1).padStart(2, "0")}
              </span>

              {hasCaseStudy(project.id) ? (
                <Link
                  href={`/projects/${project.id}`}
                  transitionTypes={["page-turn"]}
                  className="group/title inline-flex items-center gap-2 mt-1 w-fit"
                >
                  <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-wide text-parchment-100 transition-colors duration-300 group-hover/title:text-ember-200">
                    {project.title}
                  </h2>
                  <FiArrowRight className="w-5 h-5 text-ember-500 transition-all duration-300 group-hover/title:translate-x-1 group-hover/title:text-ember-300" />
                </Link>
              ) : (
                <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-wide text-parchment-100 mt-1">
                  {project.title}
                </h2>
              )}

              {(project.liveUrl || project.repoUrl || project.repoUrls?.length) && (
                <div className="mt-3">
                  <ProjectLinks project={project} size="sm" />
                </div>
              )}

              <p className="font-alice text-parchment-300 text-xl sm:text-2xl leading-relaxed mt-2 italic">
                {project.description}
              </p>

              <ul className="flex flex-col gap-3 mt-5">
                {project.highlights.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-parchment-300 text-xl sm:text-xl leading-relaxed"
                  >
                    <span className="mt-2 text-ember-500 text-xs shrink-0">
                      ✦
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-6">
                {project.technologies.map((tech) => (
                  <div key={tech.name} className="relative group/tech">
                    {/* Custom Tooltip Box */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-parchment-100 bg-ink-900 border border-gilt-strong rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/tech:opacity-100 group-hover/tech:scale-100 group-hover/tech:pointer-events-auto transition-all duration-200 shadow-lg z-20">
                      {tech.name}
                      {/* Tooltip Arrow */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink-900" />
                    </div>

                    {/* Icon Container */}
                    <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-ink-800/70 border border-gilt text-parchment-300 transition-all duration-200 hover:text-ember-300 hover:border-gilt-strong hover:shadow-[0_0_14px_rgba(216,58,69,0.2)] cursor-default">
                      <tech.icon className="w-5 h-5" />
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 pt-10 border-t border-gilt flex flex-col items-center gap-4 text-center">
          <span className="text-parchment-500 text-sm tracking-[0.3em] uppercase">
            Also browse
          </span>
          <Link
            href="/experience"
            transitionTypes={["page-turn"]}
            className="group inline-flex items-center gap-2 font-heading text-xl sm:text-2xl font-black tracking-wide text-parchment-300 transition-colors hover:text-ember-300"
          >
            <FiArrowLeft className="w-5 h-5 text-ember-400 transition-transform group-hover:-translate-x-1" />
            View Work Experience
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

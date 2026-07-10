import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { hasCaseStudy } from "@/lib/data/caseStudies";
import ProjectLinks from "@/components/ProjectLinks";
import ChapterHeading from "@/components/ChapterHeading";
import CornerFlourish from "@/components/ornaments/CornerFlourish";
import TiltCard from "@/components/fx/TiltCard";
import type { ProjectEntry } from "@/lib/data/projects";

export default function RelicsSection({ projects }: Readonly<{ projects: ProjectEntry[] }>) {
  return (
    <div
      id="relics"
      className="w-full text-left max-w-5xl mx-auto mt-16 pt-8 border-t border-gilt scroll-mt-28"
    >
      <ChapterHeading numeral="Chapter III" kicker="Selected Work" title="Projects" />

      <div className="flex justify-center mb-12 -mt-4">
        <Link
          href="/projects"
          transitionTypes={["page-turn"]}
          className="group inline-flex items-center gap-2 text-base tracking-[0.15em] uppercase font-bold text-parchment-500 transition-colors hover:text-ember-300"
        >
          View All Projects
          <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col group/card">
            {/* Relic display case */}
            <TiltCard className="aspect-video">
              <div className="relative w-full h-full transition-transform duration-500 group-hover/card:-translate-y-1">
                <ViewTransition name={`relic-${project.id}`} share="morph">
                  <div className="relative w-full h-full rounded-xl overflow-hidden bg-ink-800 border border-gilt transition-all duration-500 group-hover/card:border-gilt-strong group-hover/card:shadow-[0_8px_32px_rgba(79,124,240,0.14)]">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(6,4,10,0.6)_100%)]" />
                    <CornerFlourish corner="tl" />
                    <CornerFlourish corner="tr" />
                    <CornerFlourish corner="bl" />
                    <CornerFlourish corner="br" />
                  </div>
                </ViewTransition>
              </div>
            </TiltCard>

            {hasCaseStudy(project.id) ? (
              <Link
                href={`/projects/${project.id}`}
                transitionTypes={["page-turn"]}
                className="group/title inline-block w-fit mt-5"
              >
                <h3 className="relative inline-block font-heading text-xl font-black tracking-wide text-parchment-100 transition-colors duration-300 group-hover/card:text-ember-200">
                  {project.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-ember-400 transition-all duration-300 group-hover/title:w-full" />
                </h3>
              </Link>
            ) : (
              <h3 className="font-heading text-xl font-black tracking-wide text-parchment-100 mt-5 transition-colors duration-300 group-hover/card:text-ember-200">
                {project.title}
              </h3>
            )}
            <p className="text-parchment-300 text-2xl sm:text-xl leading-relaxed mt-2 grow">
              {project.description}
            </p>

            {/* Interactive Tech Icons with Custom Tooltips */}
            <div className="flex flex-wrap gap-3 mt-5">
              {project.technologies.map((tech) => (
                <div key={tech.name} className="relative group/tech tech-chip">
                  {/* Custom Tooltip Box */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-parchment-100 bg-ink-900 border border-gilt-strong rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/tech:opacity-100 group-hover/tech:scale-100 group-hover/tech:pointer-events-auto transition-all duration-200 shadow-lg z-20">
                    {tech.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink-900" />
                  </div>

                  {/* Icon Container */}
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-ink-800/70 border border-gilt text-parchment-300 transition-all duration-200 hover:text-ember-300 hover:border-gilt-strong cursor-default">
                    <tech.icon className="w-5 h-5" />
                  </span>
                </div>
              ))}
            </div>

            {/* Project Links */}
            {(project.liveUrl || project.repoUrl || project.repoUrls?.length) && (
              <div className="mt-4">
                <ProjectLinks project={project} size="sm" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

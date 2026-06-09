import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";
import { hasCaseStudy } from "@/lib/data/caseStudies";

// Assuming your projects data structure looks something like this:
interface Tech {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: Tech[];
  liveUrl?: string;
  repoUrl?: string;
}

export default function RelicsSection({ projects }: { projects: Project[] }) {
  return (
    <div
      id="relics"
      className="w-full text-left max-w-5xl mx-auto mt-16 pt-8 border-t border-zinc-800/60 scroll-mt-28"
    >
      <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
        Selected Work
      </span>
      <h2
        className="font-heading text-4xl font-black tracking-wide text-center mb-4
                   text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
      >
        Projects
      </h2>

      <div className="flex justify-center mb-12">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-base tracking-[0.15em] uppercase font-bold text-zinc-400 transition-colors hover:text-white"
        >
          View All Projects
          <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col group/card">
            {/* Project image frame */}
            <div className="relative aspect-video transition-transform duration-500 group-hover/card:-translate-y-1">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(5,5,8,0.55)_100%)]" />
              </div>
            </div>

            {hasCaseStudy(project.id) ? (
              <Link href={`/projects/${project.id}`} className="group/title inline-block w-fit mt-5">
                <h3 className="relative inline-block font-heading text-xl font-black tracking-wide text-zinc-100 transition-colors duration-300 group-hover/card:text-white">
                  {project.title}
                  <span className="absolute left-0 -bottom-1 h-px w-0 bg-zinc-400 transition-all duration-300 group-hover/title:w-full" />
                </h3>
              </Link>
            ) : (
              <h3 className="font-heading text-xl font-black tracking-wide text-zinc-100 mt-5 transition-colors duration-300 group-hover/card:text-white">
                {project.title}
              </h3>
            )}
            <p className="text-zinc-400 text-2xl sm:text-xl leading-relaxed mt-2 grow">
              {project.description}
            </p>

            {/* Interactive Tech Icons with Custom Tooltips */}
            <div className="flex flex-wrap gap-3 mt-5">
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
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-colors duration-200 hover:text-zinc-200 hover:border-zinc-700 cursor-default">
                    <tech.icon className="w-5 h-5" />
                  </span>
                </div>
              ))}
            </div>

            {/* Project Links */}
            {(project.liveUrl || project.repoUrl) && (
              <div className="flex gap-3 mt-4">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-colors hover:text-zinc-200 hover:border-zinc-700"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-colors hover:text-zinc-200 hover:border-zinc-700"
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
  );
}

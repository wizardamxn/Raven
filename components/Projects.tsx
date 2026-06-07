import Image from "next/image";
import Link from "next/link";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";

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
      className="w-full text-left max-w-5xl mx-auto mt-16 pt-8 border-t border-purple-950/20 scroll-mt-28"
    >
      <span className="block text-center text-base tracking-[0.4em] text-purple-500/70 uppercase font-black mb-2">
        Forged Artifacts
      </span>
      <h2
        className="font-heading text-4xl font-black tracking-wide text-center mb-12
                   text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
      >
        Relics of Creation
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {projects.map((project) => (
          <div key={project.id} className="flex flex-col group/card">
            {/* Enchanted artifact frame around the project image */}
            <div className="relative aspect-video transition-transform duration-500 group-hover/card:-translate-y-1">
              {/* Breathing glow aura */}
              <div
                className="absolute inset-0 rounded-xl bg-purple-600/20 blur-xl scale-105 transition-opacity duration-500 group-hover/card:bg-purple-600/30"
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
                    className="object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
                  {/* Arcane vignette tying the image into the tome aesthetic */}
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_55%,rgba(5,5,8,0.55)_100%)]" />
                </div>

                
              </div>
            </div>

            <h3 className="font-heading text-xl font-black tracking-wide text-zinc-100 mt-5 transition-colors duration-300 group-hover/card:text-purple-300">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-2xl sm:text-3xl leading-relaxed mt-2 grow">
              {project.description}
            </p>

            {/* Interactive Tech Icons with Custom Tooltips */}
            <div className="flex flex-wrap gap-3 mt-5">
              {project.technologies.map((tech) => (
                <div key={tech.name} className="relative group/tech">
                  {/* Custom Tooltip Box */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-purple-200 bg-zinc-950 border border-purple-500/40 rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/tech:opacity-100 group-hover/tech:scale-100 group-hover/tech:pointer-events-auto transition-all duration-200 shadow-[0_4px_12px_rgba(0,0,0,0.6)] z-20">
                    {tech.name}
                    {/* Tooltip Arrow */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-950" />
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[5px] border-4 border-transparent border-t-purple-500/40 -z-10" />
                  </div>

                  {/* Icon Container */}
                  <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-purple-950/40 text-purple-400/80 transition-all duration-300 hover:text-purple-300 hover:border-purple-500/60 hover:bg-purple-950/20 hover:shadow-[0_0_12px_rgba(168,85,247,0.45)] cursor-default">
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
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-purple-950/40 text-purple-400/80 transition-all hover:text-purple-300 hover:border-purple-500/50 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-purple-950/40 text-purple-400/80 transition-all hover:text-purple-300 hover:border-purple-500/50 hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Link
          href="/projects"
          className="group inline-flex items-center gap-2 text-base tracking-[0.15em] uppercase font-bold text-purple-400/80 transition-colors hover:text-purple-300 hover:drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]"
        >
          Browse the Full Relic Vault
          <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

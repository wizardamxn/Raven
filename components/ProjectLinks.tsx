import type { IconType } from "react-icons";
import { FiExternalLink, FiGithub, FiLock } from "react-icons/fi";
import type { ProjectEntry } from "@/lib/data/projects";

type Size = "sm" | "md";

const boxSize: Record<Size, string> = {
  sm: "w-9 h-9",
  md: "w-10 h-10",
};

function LinkIcon({
  href,
  label,
  icon: Icon,
  isPrivate,
  size,
  primary,
}: Readonly<{
  href: string;
  label: string;
  icon: IconType;
  isPrivate?: boolean;
  size: Size;
  primary?: boolean;
}>) {
  const box = boxSize[size];

  return (
    <div className="relative group/link">
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-parchment-100 bg-ink-900 border border-gilt-strong rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/link:opacity-100 group-hover/link:scale-100 group-hover/link:pointer-events-auto transition-all duration-200 shadow-lg z-20">
        {isPrivate ? `${label} — Private` : label}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink-900" />
      </div>

      {isPrivate ? (
        <span
          className={`flex items-center justify-center ${box} rounded-lg bg-ink-900/50 border border-gilt-faint text-parchment-700 cursor-not-allowed`}
        >
          <FiLock className="w-4 h-4" />
        </span>
      ) : (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center ${box} rounded-lg transition-all duration-200 ${
            primary
              ? "bg-ink-800/80 border border-gilt-strong text-ember-300 shadow-[0_0_12px_rgba(216,58,69,0.12)] hover:text-ember-200 hover:border-ember-400"
              : "bg-ink-800/70 border border-gilt text-parchment-300 hover:text-ember-300 hover:border-gilt-strong"
          }`}
        >
          <Icon className="w-4 h-4" />
        </a>
      )}
    </div>
  );
}

export default function ProjectLinks({
  project,
  size = "sm",
}: Readonly<{
  project: ProjectEntry;
  size?: Size;
}>) {
  const repoLinks = project.repoUrls?.length
    ? project.repoUrls
    : project.repoUrl
      ? [{ label: "Source", url: project.repoUrl }]
      : [];

  if (!project.liveUrl && repoLinks.length === 0) return null;

  return (
    <div className="flex gap-3">
      {project.liveUrl && (
        <LinkIcon
          href={project.liveUrl}
          label="Live demo"
          icon={FiExternalLink}
          isPrivate={project.livePrivate}
          size={size}
          primary
        />
      )}
      {repoLinks.map((repo) => (
        <LinkIcon
          key={repo.url}
          href={repo.url}
          label={repo.label}
          icon={FiGithub}
          isPrivate={project.repoPrivate}
          size={size}
        />
      ))}
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import PageShell from "@/components/PageShell";
import { projects } from "@/lib/data/projects";
import { getCaseStudy, hasCaseStudy } from "@/lib/data/caseStudies";
import ProjectLinks from "@/components/ProjectLinks";
import { FiArrowLeft } from "react-icons/fi";

export function generateStaticParams() {
  return projects
    .filter((project) => hasCaseStudy(project.id))
    .map((project) => ({ id: project.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  return {
    title: project
      ? `${project.title} — Case File — Aman Ahmad`
      : "Case File — Aman Ahmad",
    description: project?.description,
  };
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="font-heading text-[21px] sm:text-[25px] font-bold tracking-wide text-zinc-100 mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading text-[19px] sm:text-[21px] font-bold tracking-wide text-zinc-200 mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-zinc-300 text-[17px] sm:text-[18px] leading-relaxed mb-5 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-3 mb-6 list-none pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="flex flex-col gap-3 mb-6 list-decimal list-outside pl-6 text-zinc-300 text-[17px] sm:text-[18px] leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-zinc-300 text-[17px] sm:text-[18px] leading-relaxed relative [ul_&]:pl-6 [ul_&]:list-none [ol_&]:list-item marker:text-zinc-500">
      <span className="absolute left-0 top-[2px] text-zinc-600 text-[13px] select-none hidden [ul_&]:block">
        ✧
      </span>
      <span>{children}</span>
    </li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-zinc-200 underline decoration-zinc-600 underline-offset-4 transition-colors hover:text-white hover:decoration-zinc-400 font-medium"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="text-zinc-100 font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="text-zinc-200 italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-zinc-700 pl-5 my-6 text-zinc-400 italic text-[17px] sm:text-[18px] leading-relaxed">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="border-zinc-800/80 my-12" />,
  code: ({ children }) => (
    <code className="font-mono text-[0.9em] text-zinc-200 bg-zinc-800/40 px-1.5 py-0.5 rounded-md border border-zinc-800/30">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="rounded-xl bg-zinc-950 border border-zinc-800/80 p-5 overflow-x-auto my-6 text-[14px] leading-relaxed font-mono text-zinc-300">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-zinc-800 bg-zinc-900/20">
      <table className="w-full text-left border-collapse text-[15px] sm:text-[17px]">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="font-heading text-[13px] uppercase tracking-[0.2em] text-zinc-400 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3 font-bold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-zinc-300 leading-relaxed border-b border-zinc-800/40 px-4 py-3 align-top">
      {children}
    </td>
  ),
};

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);
  const caseStudy = project ? await getCaseStudy(project.id) : null;

  if (!project || !caseStudy) notFound();

  // The write-up's own `# Title` line would duplicate the page's title block above,
  // and its `Links:` bullet duplicates the live-demo/repo icons shown there too.
  const body = caseStudy
    .replace(/^#[^\n]*\r?\n/, "")
    .replace(/^[ \t]*[-*]\s+\*\*Links?:\*\*.*\r?\n/gim, "");

  return (
    <PageShell>
      <div className="w-full text-left max-w-2xl mx-auto px-4 sm:px-6">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-[13px] tracking-[0.2em] uppercase text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <FiArrowLeft className="w-4 h-4" />
          Return to the Relics
        </Link>

        <div className="mt-12 mb-16 text-center">
          <div className="relative aspect-video mb-10">
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

          <span className="block text-[13px] tracking-[0.4em] text-zinc-500 uppercase font-black mb-3">
            Case File
          </span>
          <h1 className="font-heading text-[37px] sm:text-[49px] font-black tracking-tight mb-6 text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-100 to-zinc-400 leading-tight">
            {project.title}
          </h1>
          <p className="font-alice text-zinc-400 text-[21px] sm:text-[25px] leading-relaxed italic max-w-lg mx-auto font-light">
            {project.description}
          </p>

          {(project.liveUrl || project.repoUrl || project.repoUrls?.length) && (
            <div className="flex justify-center mt-6">
              <ProjectLinks project={project} size="md" />
            </div>
          )}
        </div>

        <article className="prose prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {body}
          </ReactMarkdown>
        </article>

        <div className="mt-20 pt-10 border-t border-zinc-800/60 flex flex-col items-center gap-4 text-center">
          <span className="text-zinc-600 text-[13px] tracking-[0.3em] uppercase font-semibold">
            Wind back the clock
          </span>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-heading text-[19px] sm:text-[21px] font-bold tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            <FiArrowLeft className="w-5 h-5 text-zinc-500 transition-transform group-hover:-translate-x-1" />
            Return to the Relics of Creation
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

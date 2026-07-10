import { ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import PageShell from "@/components/PageShell";
import CornerFlourish from "@/components/ornaments/CornerFlourish";
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
    <h2 className="font-chapter text-[21px] sm:text-[25px] font-bold tracking-wide text-ember-300 mt-12 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="font-heading text-[19px] sm:text-[21px] font-bold tracking-wide text-parchment-100 mt-8 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-parchment-300 text-[17px] sm:text-[18px] leading-relaxed mb-5 last:mb-0">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="flex flex-col gap-3 mb-6 list-none pl-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="flex flex-col gap-3 mb-6 list-decimal list-outside pl-6 text-parchment-300 text-[17px] sm:text-[18px] leading-relaxed">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-parchment-300 text-[17px] sm:text-[18px] leading-relaxed relative [ul_&]:pl-6 [ul_&]:list-none [ol_&]:list-item marker:text-ember-500">
      <span className="absolute left-0 top-[2px] text-ember-500 text-[13px] select-none hidden [ul_&]:block">
        ✦
      </span>
      <span>{children}</span>
    </li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ember-300 underline decoration-ember-600 underline-offset-4 transition-colors hover:text-ember-200 hover:decoration-ember-400 font-medium"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="text-parchment-100 font-semibold">{children}</strong>
  ),
  em: ({ children }) => <em className="text-parchment-100 italic">{children}</em>,
  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-gilt-strong bg-ink-800/40 rounded-r-lg pl-5 pr-4 py-3 my-6 text-parchment-300 italic text-[17px] sm:text-[18px] leading-relaxed">
      {children}
    </blockquote>
  ),
  hr: () => (
    <div aria-hidden className="flex items-center justify-center gap-4 my-12 select-none">
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-gilt" />
      <span className="text-ember-500 text-sm">✦</span>
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-gilt" />
    </div>
  ),
  code: ({ children }) => (
    <code className="font-mono text-[0.9em] text-arcane-300 bg-ink-800/70 px-1.5 py-0.5 rounded-md border border-gilt-faint">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="rounded-xl bg-ink-900 border border-gilt p-5 overflow-x-auto my-6 text-[14px] leading-relaxed font-mono text-parchment-300">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-gilt bg-ink-900/40">
      <table className="w-full text-left border-collapse text-[15px] sm:text-[17px]">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="font-heading text-[13px] uppercase tracking-[0.2em] text-ember-400 border-b border-gilt bg-ink-800/80 px-4 py-3 font-bold">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="text-parchment-300 leading-relaxed border-b border-gilt-faint px-4 py-3 align-top">
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
          transitionTypes={["page-turn"]}
          className="inline-flex items-center gap-2 text-[13px] tracking-[0.2em] uppercase text-parchment-500 transition-colors hover:text-ember-300"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="mt-12 mb-16 text-center">
          <div className="relative aspect-video mb-10">
            <ViewTransition name={`relic-${project.id}`} share="morph">
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-ink-800 border border-gilt">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 672px) 100vw, 672px"
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

          <span className="block text-[13px] tracking-[0.4em] text-ember-400 uppercase font-black mb-3">
            Case File
          </span>
          <h1 className="font-chapter text-[33px] sm:text-[45px] font-bold tracking-tight mb-6 text-transparent bg-clip-text bg-linear-to-b from-parchment-100 via-ember-200 to-ember-500 leading-tight">
            {project.title}
          </h1>
          <p className="font-alice text-parchment-300 text-[21px] sm:text-[25px] leading-relaxed italic max-w-lg mx-auto font-light">
            {project.description}
          </p>

          {(project.liveUrl || project.repoUrl || project.repoUrls?.length) && (
            <div className="flex justify-center mt-6">
              <ProjectLinks project={project} size="md" />
            </div>
          )}
        </div>

        {/* The illuminated reading panel */}
        <article className="manuscript rounded-xl bg-[#120d18] border border-gilt-faint px-6 sm:px-10 py-10 shadow-[inset_0_1px_0_rgba(205,221,255,0.04)]">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={markdownComponents}
          >
            {body}
          </ReactMarkdown>
        </article>

        <div className="mt-20 pt-10 border-t border-gilt flex flex-col items-center gap-4 text-center">
          <span className="text-parchment-500 text-[13px] tracking-[0.3em] uppercase font-semibold">
            More work
          </span>
          <Link
            href="/projects"
            transitionTypes={["page-turn"]}
            className="group inline-flex items-center gap-2 font-heading text-[19px] sm:text-[21px] font-bold tracking-wide text-parchment-300 transition-colors hover:text-ember-300"
          >
            <FiArrowLeft className="w-5 h-5 text-ember-400 transition-transform group-hover:-translate-x-1" />
            View All Projects
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

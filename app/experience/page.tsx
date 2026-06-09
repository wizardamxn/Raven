import Link from "next/link";
import Image from "next/image";
import PageShell from "@/components/PageShell";
import { experiences } from "@/lib/data/experience";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

export const metadata = {
  title: "Work Experience — Aman Ahmad",
  description:
    "Full work history — every role, every company, every project shipped across the stack.",
};

export default function ExperiencePage() {
  return (
    <PageShell>
      <div className="w-full text-left max-w-xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm tracking-[0.2em] uppercase text-zinc-500 transition-colors hover:text-zinc-200"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="mt-10 mb-14">
          <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
            Work History
          </span>
          <h1
            className="font-heading text-4xl sm:text-5xl font-black tracking-wide text-center mb-6
                         text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500"
          >
            Work Experience
          </h1>
          <p className="font-alice text-zinc-400 text-2xl sm:text-3xl leading-relaxed text-center italic max-w-md mx-auto">
            Every role and company — the full record of work shipped across the stack.
          </p>
        </div>

        <div className="flex flex-col gap-16 relative border-l border-zinc-800 ml-4 pl-6">
          {experiences.map((entry, index) => (
            <div key={entry.id} className="relative">
              {/* Timeline Node */}
              <div className="absolute -left-10 -top-0.5">
                <Image
                  src="/lantern.png"
                  alt="Timeline lantern"
                  width={28}
                  height={40}
                  className={entry.current ? "object-contain" : "object-contain opacity-50"}
                />
              </div>

              <span className="text-zinc-600 text-sm tracking-[0.35em] uppercase font-bold">
                Role {String(index + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mt-1">
                <h2 className="font-heading text-2xl sm:text-3xl font-black tracking-wide text-zinc-100">
                  {entry.role}
                </h2>
                <span
                  className={
                    entry.current
                      ? "text-base tracking-wider uppercase font-sans text-zinc-300 bg-zinc-800/60 px-2 py-0.5 border border-zinc-700 rounded shrink-0"
                      : "text-base tracking-wider uppercase font-sans text-zinc-500 bg-zinc-900/50 px-2 py-0.5 border border-zinc-800/60 rounded shrink-0"
                  }
                >
                  {entry.period}
                </span>
              </div>

              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mt-1">
                <h3 className="font-heading text-lg tracking-widest text-zinc-400 font-bold uppercase">
                  {entry.company}
                </h3>
                <span className="text-zinc-600 text-sm tracking-widest uppercase">
                  ✦ {entry.location}
                </span>
                {entry.current && (
                  <span className="text-[11px] tracking-[0.2em] uppercase font-bold text-zinc-300">
                    ◆ Current Role
                  </span>
                )}
              </div>

              <ul className="flex flex-col gap-3 mt-5">
                {entry.highlights.map((point, i) => (
                  <li key={i} className="flex gap-3 text-zinc-400 text-xl sm:text-2xl leading-relaxed">
                    <span className="mt-2 text-zinc-600 text-xs shrink-0">
                      ✧
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 mt-6">
                {entry.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    title={tech.name}
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400"
                  >
                    <tech.icon className="w-5 h-5" />
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 pt-10 border-t border-zinc-800/60 flex flex-col items-center gap-4 text-center">
          <span className="text-zinc-600 text-sm tracking-[0.3em] uppercase">Also browse</span>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-heading text-xl sm:text-2xl font-black tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            View Projects
            <FiArrowRight className="w-5 h-5 text-zinc-400 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </PageShell>
  );
}

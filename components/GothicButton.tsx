"use client";

import { type ReactNode } from "react";
import Link from "next/link";

const buttonClass =
  "group inline-flex items-center gap-3 px-8 py-3.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm transition-colors duration-300 hover:text-zinc-200 hover:border-zinc-700 focus:outline-none focus-visible:border-zinc-600";

export default function GothicButton({
  label,
  href,
  icon,
}: {
  label: string;
  href?: string;
  icon?: ReactNode;
}) {
  const content = (
    <>
      {icon}
      <span>{label}</span>
    </>
  );

  if (!href) {
    return (
      <button type="button" className={buttonClass}>
        {content}
      </button>
    );
  }

  const isFile = /\.[a-z0-9]+$/i.test(href);

  if (href.startsWith("mailto:") || href.startsWith("http") || isFile) {
    return (
      <a
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        download={isFile || undefined}
        className={buttonClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={buttonClass}>
      {content}
    </Link>
  );
}

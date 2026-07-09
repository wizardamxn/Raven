"use client";

import { type ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "ghost";

const base =
  "group inline-flex items-center gap-3 px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm transition-all duration-300 focus:outline-none";

const variantClass: Record<Variant, string> = {
  primary:
    "bg-ink-800/80 border border-gilt-strong text-ember-300 shadow-[0_0_18px_rgba(217,164,65,0.15)] hover:text-ember-200 hover:border-ember-400 hover:shadow-[0_0_28px_rgba(217,164,65,0.3)] motion-safe:hover:animate-[glow-pulse_2.8s_ease-in-out_infinite] focus-visible:border-ember-400",
  ghost:
    "bg-ink-900/60 border border-gilt text-parchment-300 hover:text-parchment-100 hover:border-gilt-strong focus-visible:border-gilt-strong",
};

export default function GothicButton({
  label,
  href,
  icon,
  variant = "ghost",
}: Readonly<{
  label: string;
  href?: string;
  icon?: ReactNode;
  variant?: Variant;
}>) {
  const buttonClass = `${base} ${variantClass[variant]}`;
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

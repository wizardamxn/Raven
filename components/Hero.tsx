"use client";

import { m } from "motion/react";
import type { Variants } from "motion/react";
import Image from "next/image";
import GothicButton from "@/components/GothicButton";
import Magnetic from "@/components/fx/Magnetic";
import { FiChevronDown, FiFileText, FiMail } from "react-icons/fi";

// The title screen orchestrated as a single staggered entrance: the sigil-ringed
// avatar settles in, then the epigraph, name, role, intro, and CTAs rise in turn.
// Under prefers-reduced-motion the MotionConfig strips the transforms and each
// piece simply fades in place.

// Gentle decelerating curve shared across the entrance.
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const container: Variants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.15, staggerChildren: 0.12 },
  },
};

const rise: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

const bloom: Variants = {
  hidden: { opacity: 0, scale: 0.86 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const veil: Variants = {
  hidden: { opacity: 0, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const grow: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

export default function Hero() {
  return (
    <m.section
      id="sanctum"
      initial="hidden"
      animate="visible"
      variants={container}
      className="relative z-10 w-full min-h-[calc(100vh-4rem)] mt-16 flex flex-col items-center justify-center text-center px-6 scroll-mt-28"
    >
      <m.div variants={bloom} className="relative">
        {/* Arcane sigil ring — static, etched behind the avatar */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="absolute -inset-14 w-[calc(100%+7rem)] h-[calc(100%+7rem)] text-ember-500 opacity-25 pointer-events-none select-none"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="100" cy="100" r="96" strokeWidth="0.8" />
          <circle cx="100" cy="100" r="88" strokeWidth="0.6" strokeDasharray="2 8" />
          <path d="M100 2 L103 8 L100 12 L97 8 Z" fill="currentColor" stroke="none" />
          <path d="M100 188 L103 194 L100 198 L97 194 Z" fill="currentColor" stroke="none" />
          {/* Inner rune ring — turns once every minute and a half */}
          <g
            className="origin-center motion-safe:animate-[sigil-spin_90s_linear_infinite]"
            opacity="0.7"
          >
            <circle cx="100" cy="100" r="78" strokeWidth="0.5" strokeDasharray="1 14" />
            {[12, 58, 95, 141, 188, 226, 273, 322].map((angle) => (
              <line
                key={angle}
                x1="100"
                y1="18"
                x2="100"
                y2="26"
                strokeWidth="0.8"
                transform={`rotate(${angle} 100 100)`}
              />
            ))}
          </g>
        </svg>

        {/* Ambient candle glow behind the avatar */}
        <div
          aria-hidden
          className="absolute -inset-6 rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.22)_0%,rgba(217,164,65,0)_70%)] animate-[candle-flicker_5s_ease-in-out_infinite] pointer-events-none"
        />
        {/* Double gilded frame */}
        <div className="relative w-28 h-28 rounded-full p-0.75 bg-linear-to-b from-ember-300 via-ember-500 to-ember-600 shadow-[0_0_30px_rgba(217,164,65,0.25)]">
          <div className="w-full h-full rounded-full p-0.75 bg-ink-900">
            <div className="w-full h-full rounded-full overflow-hidden relative">
              <Image
                src="/avatar.png"
                alt="Aman Ahmad"
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </m.div>

      {/* Script epigraph — the manuscript's opening line */}
      <m.p
        variants={veil}
        className="mt-8 font-script text-2xl sm:text-3xl text-arcane-300/80 select-none"
      >
        Herein lies the work of
      </m.p>

      {/* The name — this is the title */}
      <m.h1
        variants={rise}
        className="mt-1 font-heading text-6xl sm:text-7xl md:text-8xl font-black tracking-wide leading-none
                     text-transparent bg-clip-text bg-linear-to-b from-parchment-100 via-ember-200 to-ember-500
                     drop-shadow-[0_0_35px_rgba(217,164,65,0.2)]"
      >
        Aman Ahmad
      </m.h1>

      {/* Flourished role line */}
      <m.div variants={rise} className="mt-5 flex items-center gap-4">
        <m.span
          variants={grow}
          aria-hidden
          className="h-px w-12 sm:w-20 origin-right bg-linear-to-r from-transparent to-gilt-strong"
        />
        <p className="text-ember-400 text-sm sm:text-base tracking-[0.35em] uppercase font-bold whitespace-nowrap">
          Full Stack Developer
        </p>
        <m.span
          variants={grow}
          aria-hidden
          className="h-px w-12 sm:w-20 origin-left bg-linear-to-l from-transparent to-gilt-strong"
        />
      </m.div>

      {/* One tight intro line */}
      <m.p
        variants={rise}
        className="max-w-xl mt-6 font-alice text-parchment-300 text-lg sm:text-xl leading-relaxed"
      >
        I build highly performant{" "}
        <span className="text-ember-300 font-sans font-semibold">full-stack</span> web
        ecosystems — from{" "}
        <span className="text-ember-300 font-sans font-semibold">frontend</span> to{" "}
        <span className="text-ember-300 font-sans font-semibold">backend</span> to{" "}
        <span className="text-ember-300 font-sans font-semibold">cloud</span> — resilient
        infrastructure designed to scale under heavy loads.
      </m.p>

      {/* CTAs */}
      <m.div
        variants={rise}
        className="flex flex-col gap-4 text-lg tracking-widest sm:flex-row justify-center mt-9 relative z-20"
      >
        <Magnetic>
          <GothicButton
            label="Resume"
            icon={<FiFileText className="w-3.5 h-3.5" />}
            href="/resume.pdf"
            variant="primary"
          />
        </Magnetic>
        <Magnetic>
          <GothicButton
            label="Email Me"
            icon={<FiMail className="w-4 h-4" />}
            href="mailto:amank225566@gmail.com"
            variant="ghost"
          />
        </Magnetic>
      </m.div>

      {/* Descend */}
      <FiChevronDown
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-6 h-6 text-parchment-500/70 animate-bounce [animation-duration:2.2s]"
      />
    </m.section>
  );
}

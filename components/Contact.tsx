"use client";

import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck, FiFileText, FiInstagram } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { GiRaven } from "react-icons/gi";
import ChapterHeading from "@/components/ChapterHeading";

const EMAIL = "amank225566@gmail.com";
const DISCORD = "wizardamxn";

const socialClass =
  "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-800/70 border border-gilt text-parchment-300 text-sm font-bold tracking-wider uppercase hover:text-ember-300 hover:border-gilt-strong hover:bg-ink-700/70 transition-colors duration-200";

export default function Contact() {
  const [copiedItem, setCopiedItem] = useState<"email" | "discord" | null>(null);

  const copy = async (text: string, item: "email" | "discord") => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div id="contact" className="w-full max-w-xl text-left scroll-mt-28">
      <ChapterHeading kicker="Get in Touch" title="Contact" />

      <p className="text-center font-alice text-parchment-300 text-xl leading-relaxed mb-8 -mt-2">
        Open to full-time roles, freelance work, and interesting conversations.
      </p>

      {/* The wax seal — press to dispatch a raven */}
      <div className="flex justify-center mb-10">
        <a
          href={`mailto:${EMAIL}`}
          aria-label="Send an email"
          className="group relative flex items-center justify-center w-24 h-24 rounded-full
                     bg-[radial-gradient(circle_at_35%_30%,#a84040_0%,#8c2f2f_45%,#5c1d1d_100%)]
                     border border-gilt-strong
                     shadow-[0_6px_24px_rgba(0,0,0,0.7),inset_0_2px_6px_rgba(255,255,255,0.12),inset_0_-4px_10px_rgba(0,0,0,0.45)]
                     transition-transform duration-300 hover:scale-105 focus-visible:scale-105"
        >
          {/* Seal impression ring */}
          <span aria-hidden className="absolute inset-2 rounded-full border border-ember-200/25" />
          {/* Candle glow on hover */}
          <span
            aria-hidden
            className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.25)_0%,rgba(217,164,65,0)_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
          <GiRaven className="relative w-9 h-9 text-ember-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] transition-transform duration-300 group-hover:-rotate-12" />
        </a>
      </div>

      {/* Email row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-ink-800/70 border border-gilt mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <FiMail className="w-4 h-4 text-ember-400 shrink-0" />
          <span className="text-parchment-300 text-sm font-mono truncate">{EMAIL}</span>
        </div>
        <button
          type="button"
          onClick={() => copy(EMAIL, "email")}
          title="Copy email address"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-parchment-500 hover:text-ember-300 hover:bg-ink-700 transition-all duration-200 shrink-0"
        >
          {copiedItem === "email"
            ? <FiCheck className="w-4 h-4 text-ember-300" />
            : <FiCopy className="w-4 h-4" />}
        </button>
      </div>

      {/* Discord row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-ink-800/70 border border-gilt mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <SiDiscord className="w-4 h-4 text-ember-400 shrink-0" />
          <span className="text-parchment-300 text-sm font-mono truncate">{DISCORD}</span>
        </div>
        <button
          type="button"
          onClick={() => copy(DISCORD, "discord")}
          title="Copy Discord username"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-parchment-500 hover:text-ember-300 hover:bg-ink-700 transition-all duration-200 shrink-0"
        >
          {copiedItem === "discord"
            ? <FiCheck className="w-4 h-4 text-ember-300" />
            : <FiCopy className="w-4 h-4" />}
        </button>
      </div>

      {/* Social / quick links */}
      <div className="flex flex-wrap gap-3 justify-center">
        <a
          href="https://linkedin.com/in/amanahmad1"
          target="_blank"
          rel="noopener noreferrer"
          className={socialClass}
        >
          <FiLinkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href="https://github.com/Valtryek"
          target="_blank"
          rel="noopener noreferrer"
          className={socialClass}
        >
          <FiGithub className="w-4 h-4" />
          GitHub
        </a>
        <a
          href="https://instagram.com/aman_ahmad04"
          target="_blank"
          rel="noopener noreferrer"
          className={socialClass}
        >
          <FiInstagram className="w-4 h-4" />
          Instagram
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className={socialClass}
        >
          <FiFileText className="w-4 h-4" />
          Resume
        </a>
      </div>
    </div>
  );
}

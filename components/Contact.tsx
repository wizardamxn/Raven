"use client";

import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck, FiFileText, FiInstagram } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import ChapterHeading from "@/components/ChapterHeading";
import WaxSeal from "@/components/WaxSeal";
import { useSound } from "@/components/providers/SoundProvider";

const EMAIL = "amank225566@gmail.com";
const DISCORD = "wizardamxn";

const socialClass =
  "flex items-center gap-2 px-4 py-2.5 rounded-xl bg-ink-800/70 border border-gilt text-parchment-300 text-sm font-bold tracking-wider uppercase hover:text-ember-300 hover:border-gilt-strong hover:bg-ink-700/70 transition-colors duration-200";

export default function Contact() {
  const [copiedItem, setCopiedItem] = useState<"email" | "discord" | null>(null);
  const { play } = useSound();

  const copy = async (text: string, item: "email" | "discord") => {
    await navigator.clipboard.writeText(text);
    play("tap");
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div id="contact" className="w-full max-w-xl text-left scroll-mt-28">
      <ChapterHeading numeral="Chapter V" kicker="Get in Touch" title="Contact" />

      <p className="text-center font-alice text-parchment-300 text-xl leading-relaxed mb-8 -mt-2">
        Open to full-time roles, freelance work, and interesting conversations.
      </p>

      {/* The wax seal — press to dispatch a raven */}
      <WaxSeal email={EMAIL} />

      {/* Email row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-ink-800/70 border border-gilt mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <FiMail className="w-4 h-4 text-ember-400 shrink-0" />
          <span className="text-parchment-300 text-sm font-mono truncate">{EMAIL}</span>
        </div>
        <button
          type="button"
          onClick={() => copy(EMAIL, "email")}
          aria-label="Copy email address"
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
          aria-label="Copy Discord username"
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

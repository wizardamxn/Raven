"use client";

import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiCopy, FiCheck, FiFileText, FiInstagram } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";

const EMAIL = "amank225566@gmail.com";
const DISCORD = "wizardamxn";

export default function Contact() {
  const [copiedItem, setCopiedItem] = useState<"email" | "discord" | null>(null);

  const copy = async (text: string, item: "email" | "discord") => {
    await navigator.clipboard.writeText(text);
    setCopiedItem(item);
    setTimeout(() => setCopiedItem(null), 2000);
  };

  return (
    <div id="contact" className="w-full max-w-xl text-left scroll-mt-28">
      <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
        Get in Touch
      </span>
      <h2 className="font-heading text-4xl font-black tracking-wide text-center mb-4 text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500">
        Contact
      </h2>
      <p className="text-center font-alice text-zinc-400 text-xl leading-relaxed mb-10">
        Open to full-time roles, freelance work, and interesting conversations.
      </p>

      {/* Email row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <FiMail className="w-4 h-4 text-zinc-500 shrink-0" />
          <span className="text-zinc-300 text-sm font-mono truncate">{EMAIL}</span>
        </div>
        <button
          type="button"
          onClick={() => copy(EMAIL, "email")}
          title="Copy email address"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all duration-200 shrink-0"
        >
          {copiedItem === "email"
            ? <FiCheck className="w-4 h-4 text-emerald-400" />
            : <FiCopy className="w-4 h-4" />}
        </button>
      </div>

      {/* Discord row */}
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <SiDiscord className="w-4 h-4 text-zinc-500 shrink-0" />
          <span className="text-zinc-300 text-sm font-mono truncate">{DISCORD}</span>
        </div>
        <button
          type="button"
          onClick={() => copy(DISCORD, "discord")}
          title="Copy Discord username"
          className="flex items-center justify-center w-8 h-8 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-all duration-200 shrink-0"
        >
          {copiedItem === "discord"
            ? <FiCheck className="w-4 h-4 text-emerald-400" />
            : <FiCopy className="w-4 h-4" />}
        </button>
      </div>

      {/* Social / quick links */}
      <div className="flex flex-wrap gap-3">
        <a
          href="https://linkedin.com/in/amanahmad1"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm font-bold tracking-wider uppercase hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800/70 transition-colors duration-200"
        >
          <FiLinkedin className="w-4 h-4" />
          LinkedIn
        </a>
        <a
          href="https://github.com/Valtryek"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm font-bold tracking-wider uppercase hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800/70 transition-colors duration-200"
        >
          <FiGithub className="w-4 h-4" />
          GitHub
        </a>
        <a
          href="https://instagram.com/aman_ahmad04"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm font-bold tracking-wider uppercase hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800/70 transition-colors duration-200"
        >
          <FiInstagram className="w-4 h-4" />
          Instagram
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800 text-zinc-400 text-sm font-bold tracking-wider uppercase hover:text-zinc-100 hover:border-zinc-700 hover:bg-zinc-800/70 transition-colors duration-200"
        >
          <FiFileText className="w-4 h-4" />
          Resume
        </a>
      </div>
    </div>
  );
}

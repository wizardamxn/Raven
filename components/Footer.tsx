import Image from "next/image";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";
import { GiRaven } from "react-icons/gi";

const nameClass =
  "font-script leading-tight inline-block text-transparent bg-clip-text " +
  "bg-linear-to-b from-ember-200 via-ember-300 to-ember-500";

const socialLinkClass =
  "flex items-center justify-center w-10 h-10 rounded-lg bg-ink-800/70 border border-gilt text-parchment-300 transition-colors duration-200 hover:text-ember-300 hover:border-gilt-strong";

export default function Footer() {
  return (
    <footer className="relative z-10 w-full flex flex-col items-center mt-16 mb-4 select-none overflow-x-hidden">
      {/* Colophon rule — gilt hairlines meeting at a diamond */}
      <div className="flex items-center gap-4 mb-5">
        <span aria-hidden className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-gilt-strong" />
        <span className="text-parchment-500 text-sm tracking-[0.4em] uppercase whitespace-nowrap">
          Conjured with care by
        </span>
        <span aria-hidden className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-gilt-strong" />
      </div>

      <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 w-full max-w-2xl px-8 sm:px-12">
        {/* Portrait */}
        <div className="relative w-20 h-20 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-gilt shrink-0">
          <Image
            src="/footer.jpg"
            alt="A fallen knight at rest amid wildflowers"
            fill
            sizes="(max-width: 640px) 80px, 160px"
            className="object-cover"
          />
        </div>

        {/* Signature */}
        <div className="flex flex-col items-start">
          <span className={`${nameClass} text-4xl sm:text-7xl`}>Aman</span>
          <span className={`${nameClass} text-lg sm:text-4xl -mt-1`}>aka Shout</span>
          <span className={`${nameClass} text-lg sm:text-4xl -mt-1`}>aka Wizardamxn</span>
        </div>

        {/* Wax seal — the colophon's stamp */}
        <div
          aria-hidden
          className="relative flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-full shrink-0 self-end mb-1 -rotate-12 select-none
                     bg-[radial-gradient(circle_at_35%_30%,#a84040_0%,#8c2f2f_45%,#5c1d1d_100%)]
                     border border-gilt-strong
                     shadow-[0_4px_16px_rgba(0,0,0,0.6),inset_0_1px_4px_rgba(255,255,255,0.12),inset_0_-3px_8px_rgba(0,0,0,0.45)]"
        >
          <span className="absolute inset-1.5 rounded-full border border-ember-200/25" />
          <GiRaven className="w-4 h-4 sm:w-6 sm:h-6 text-ember-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
        </div>
      </div>

      {/* Socials */}
      <div className="flex items-center gap-3 mt-8">
        <a
          href="https://github.com/Valtryek"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className={socialLinkClass}
        >
          <FiGithub className="w-4 h-4" />
        </a>
        <a
          href="https://linkedin.com/in/amanahmad1"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className={socialLinkClass}
        >
          <FiLinkedin className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com/aman_ahmad04"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className={socialLinkClass}
        >
          <FiInstagram className="w-4 h-4" />
        </a>

        {/* Discord has no profile URL for plain usernames — show the handle in a tooltip instead */}
        <div className="relative group/social">
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-parchment-100 bg-ink-900 border border-gilt-strong rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/social:opacity-100 group-hover/social:scale-100 transition-all duration-200 shadow-lg z-20">
            wizardamxn
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-ink-900" />
          </div>
          <span className={`${socialLinkClass} cursor-default`} aria-label="Discord: wizardamxn">
            <SiDiscord className="w-4 h-4" />
          </span>
        </div>
      </div>
    </footer>
  );
}

import Image from "next/image";
import { FiGithub, FiLinkedin, FiInstagram } from "react-icons/fi";
import { SiDiscord } from "react-icons/si";

const nameClass =
  "font-script leading-tight inline-block text-transparent bg-clip-text " +
  "bg-linear-to-b from-zinc-300 via-zinc-400 to-zinc-600";

const socialLinkClass =
  "flex items-center justify-center w-10 h-10 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 transition-colors duration-200 hover:text-zinc-200 hover:border-zinc-700";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center mt-16 mb-4 select-none overflow-x-hidden">
      <span className="text-zinc-600 text-sm tracking-[0.4em] uppercase mb-5">
        ❖ Conjured with care by ❖
      </span>

      <div className="flex flex-row items-center justify-center gap-5 sm:gap-8 w-full max-w-2xl px-8 sm:px-12">
        {/* Portrait */}
        <div className="relative w-20 h-20 sm:w-40 sm:h-40 rounded-xl overflow-hidden border border-zinc-800 shrink-0">
          <Image
            src="/footer.jpg"
            alt="A fallen knight at rest amid wildflowers"
            fill
            className="object-cover"
          />
        </div>

        {/* Signature */}
        <div className="flex flex-col items-start">
          <span className={`${nameClass} text-4xl sm:text-7xl`}>Aman</span>
          <span className={`${nameClass} text-lg sm:text-4xl -mt-1`}>aka Shout</span>
          <span className={`${nameClass} text-lg sm:text-4xl -mt-1`}>aka Wizardamxn</span>
        </div>
      </div>

      {/* Socials */}
      <div className="flex items-center gap-3 mt-8">
        <a
          href="https://github.com/Valtryek"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          className={socialLinkClass}
        >
          <FiGithub className="w-4 h-4" />
        </a>
        <a
          href="https://linkedin.com/in/amanahmad1"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          className={socialLinkClass}
        >
          <FiLinkedin className="w-4 h-4" />
        </a>
        <a
          href="https://instagram.com/aman_ahmad04"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className={socialLinkClass}
        >
          <FiInstagram className="w-4 h-4" />
        </a>

        {/* Discord has no profile URL for plain usernames — show the handle in a tooltip instead */}
        <div className="relative group/social">
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 text-xs font-semibold tracking-wider uppercase text-zinc-200 bg-zinc-950 border border-zinc-700 rounded-md whitespace-nowrap opacity-0 pointer-events-none scale-95 group-hover/social:opacity-100 group-hover/social:scale-100 transition-all duration-200 shadow-lg z-20">
            wizardamxn
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-zinc-950" />
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1.25 border-4 border-transparent border-t-zinc-700 -z-10" />
          </div>
          <span className={`${socialLinkClass} cursor-default`} title="Discord: wizardamxn">
            <SiDiscord className="w-4 h-4" />
          </span>
        </div>
      </div>
    </footer>
  );
}

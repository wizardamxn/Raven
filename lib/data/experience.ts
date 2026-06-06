import { technologies } from "@/lib/data/technologies";
import type { Technology } from "@/lib/data/technologies";

export type ExperienceEntry = {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  /** Short blurb used by the homepage overview */
  summary: string;
  /** Full set of bullet points used by the dedicated experience page */
  highlights: string[];
  technologies: Technology[];
};

export const experiences: ExperienceEntry[] = [
  {
    id: "shadow-guild-corp",
    role: "Senior Arcane Developer",
    company: "The Shadow Guild Corp",
    location: "Remote",
    period: "2024 — PRESENT",
    current: true,
    summary:
      "Orchestrating high-load serverless architectures and weaving intricate data matrices. Spearheaded the migration of legacy monolith scrolls into modular Next.js realms, boosting render velocity by 40%.",
    highlights: [
      "Orchestrated high-load serverless architectures handling millions of daily requests across distributed regions.",
      "Spearheaded the migration of a legacy monolith into modular Next.js micro-frontends, boosting render velocity by 40%.",
      "Designed and maintained a shared component library used across six product teams, cutting UI development time in half.",
      "Mentored a guild of four junior conjurers, establishing code review rituals and architecture decision records.",
      "Introduced a Redis-backed caching layer that reduced average API latency from 480ms to 120ms.",
    ],
    technologies: [
      technologies.typescript,
      technologies.nextjs,
      technologies.nodejs,
      technologies.mongodb,
      technologies.redis,
      technologies.docker,
    ],
  },
  {
    id: "rune-digital-agency",
    role: "Full Stack Conjurer",
    company: "Rune Digital Agency",
    location: "Bengaluru, India",
    period: "2022 — 2024",
    current: false,
    summary:
      "Forged highly reactive user interfaces utilizing TypeScript elements and structured decentralized data flows with MongoDB. Collaborated across multi-functional clans to deliver resilient production deployments.",
    highlights: [
      "Forged highly reactive user interfaces using React and TypeScript for a portfolio of client-facing storefronts.",
      "Structured decentralized data flows with MongoDB and Express, powering catalogs of over 50,000 enchanted items.",
      "Collaborated across multi-functional clans of designers, marketers, and engineers to deliver resilient production deployments.",
      "Implemented a GraphQL gateway that unified five legacy REST services behind a single typed schema.",
      "Reduced deployment incidents by 60% by introducing automated end-to-end testing and staging environments.",
    ],
    technologies: [
      technologies.react,
      technologies.typescript,
      technologies.mongodb,
      technologies.express,
      technologies.graphql,
      technologies.tailwind,
    ],
  },
  {
    id: "cobalt-foundry",
    role: "Apprentice Web Conjurer",
    company: "Cobalt Foundry Studios",
    location: "Pune, India",
    period: "2021 — 2022",
    current: false,
    summary:
      "Cut my teeth building responsive marketing sites and internal tools, learning to balance pixel-perfect craft with pragmatic delivery under tight deadlines.",
    highlights: [
      "Built and shipped responsive marketing sites for a roster of 20+ small business clients.",
      "Developed internal tooling with Node.js and PostgreSQL to automate weekly reporting workflows.",
      "Paired closely with senior engineers to learn component architecture, state management, and accessible markup.",
      "Set up a design-to-code pipeline with Tailwind CSS and Prisma that shortened handoff time from days to hours.",
    ],
    technologies: [
      technologies.nodejs,
      technologies.postgresql,
      technologies.tailwind,
      technologies.prisma,
    ],
  },
];

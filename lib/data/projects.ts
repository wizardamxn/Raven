import { technologies } from "@/lib/data/technologies";
import type { Technology } from "@/lib/data/technologies";

export type ProjectEntry = {
  id: string;
  title: string;
  /** Short blurb used by the homepage overview */
  description: string;
  /** Fuller set of bullet points for a future dedicated projects page */
  highlights: string[];
  /** Local path under /public, e.g. /projects/<slug>.png (placeholder — swap in real screenshots later) */
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  technologies: Technology[];
};

export const projects: ProjectEntry[] = [
  {
    id: "necronomicon-cms",
    title: "Necronomicon CMS",
    description:
      "A headless content vault for cursed archives — lets cultists publish forbidden texts through a typed, real-time editorial pipeline with versioned grimoire entries.",
    highlights: [
      "Built a typed GraphQL schema layering over MongoDB collections of arcane manuscripts.",
      "Implemented optimistic-UI editing with conflict resolution for simultaneous scribes.",
      "Shipped a plugin system allowing covens to register custom content blocks.",
      "Containerized the stack with Docker Compose for one-command summoning in dev and prod.",
    ],
    image: "/projects/necronomicon-cms.png",
    liveUrl: "https://necronomicon-cms.example.com",
    repoUrl: "https://github.com/example/necronomicon-cms",
    technologies: [
      technologies.nextjs,
      technologies.typescript,
      technologies.graphql,
      technologies.mongodb,
      technologies.docker,
    ],
  },
  {
    id: "ravens-ledger",
    title: "Raven's Ledger",
    description:
      "A real-time expense-tracking familiar that whispers spending omens — built with a Redis-backed event stream and PostgreSQL ledgers for trustworthy bookkeeping.",
    highlights: [
      "Designed a double-entry ledger schema in PostgreSQL with Prisma migrations.",
      "Streamed live balance updates via Redis pub/sub to connected clients.",
      "Wrote an Express API gateway authenticating sessions with signed runic tokens.",
      "Reached 98% test coverage on ledger reconciliation logic.",
    ],
    image: "/projects/ravens-ledger.png",
    repoUrl: "https://github.com/example/ravens-ledger",
    technologies: [
      technologies.react,
      technologies.express,
      technologies.postgresql,
      technologies.prisma,
      technologies.redis,
    ],
  },
  {
    id: "wraith-ui",
    title: "Wraith UI",
    description:
      "A spectral component library haunting design systems with accessible, themeable primitives — ships as a typed package with motion-driven, story-documented pieces.",
    highlights: [
      "Authored 30+ accessible React primitives with full keyboard and screen-reader support.",
      "Choreographed micro-interactions and page transitions with Framer Motion.",
      "Set up automated visual regression testing across themes and breakpoints.",
      "Styled every primitive atop Tailwind CSS with dark-mode-first tokens, bundled via Vite.",
    ],
    image: "/projects/wraith-ui.png",
    liveUrl: "https://wraith-ui.example.com",
    repoUrl: "https://github.com/example/wraith-ui",
    technologies: [
      technologies.react,
      technologies.typescript,
      technologies.tailwind,
      technologies.framer,
      technologies.vite,
    ],
  },
];

import { technologies } from "@/lib/data/technologies";
import type { Technology } from "@/lib/data/technologies";

export type ProjectEntry = {
  id: string;
  title: string;
  /** Short blurb used by the homepage overview */
  description: string;
  /** Fuller set of bullet points for a future dedicated projects page */
  highlights: string[];
  /** Local path under /public */
  image: string;
  liveUrl?: string;
  repoUrl?: string;
  technologies: Technology[];
};

export const projects: ProjectEntry[] = [
  {
    id: "avmg",
    title: "AVMG",
    description:
      "An all-in-one media converter that pulls audio and video from virtually any source, converts it to the format you need, and even drafts AI-generated notes from YouTube transcripts.",
    highlights: [
      "Built a download-and-convert pipeline around FFmpeg, queued and cached through Redis for fast repeat requests.",
      "Handled large file uploads with Multer and persisted assets via Supabase storage and PostgreSQL.",
      "Shipped an AI notes generator that summarizes YouTube videos straight from their transcripts.",
      "Built on a Next.js front end backed by a MERN-stack API layer.",
    ],
    image: "/avmg.png",
    liveUrl: "https://avmg.vercel.app",
    repoUrl: "https://github.com/Valtryek/avmg",
    technologies: [
      technologies.nextjs,
      technologies.react,
      technologies.nodejs,
      technologies.express,
      technologies.mongodb,
      technologies.redis,
      technologies.ffmpeg,
      technologies.supabase,
      technologies.postgresql,
    ],
  },
  {
    id: "projectteams",
    title: "ProjectTeams",
    description:
      "A team collaboration platform where teams share documents, chat in real time, and lean on built-in AI to fix grammar and auto-generate tags for shared content.",
    highlights: [
      "Powered live chat and presence with Socket.io across a MERN stack.",
      "Integrated the Vercel AI SDK for in-app grammar correction and automatic tag generation.",
      "Designed document sharing and collaboration flows backed by MongoDB.",
      "Built a real-time notification system to keep teams in sync as work happens.",
    ],
    image: "/projectteams.png",
    liveUrl: "https://projectteams.vercel.app",
    repoUrl: "https://github.com/Valtryek/projectteams",
    technologies: [
      technologies.socketio,
      technologies.react,
      technologies.nodejs,
      technologies.express,
      technologies.mongodb,
      technologies.vercelai,
    ],
  },
  {
    id: "watchthis",
    title: "WatchThis",
    description:
      "An AI-driven movie recommendation platform that suggests films tailored to your taste, lets you save them to a personal watchlist, and surfaces rich details on every title.",
    highlights: [
      "Generated personalized movie recommendations and surfaced detailed metadata via the TMDB API.",
      "Built a persistent, user-specific watchlist backed by Firebase.",
      "Crafted a responsive React front end for browsing, searching, and saving titles.",
      "Designed detail views covering cast, ratings, synopsis, and related recommendations.",
    ],
    image: "/WatchThis.png",
    liveUrl: "https://watchthis.vercel.app",
    repoUrl: "https://github.com/Valtryek/watchthis",
    technologies: [technologies.react, technologies.firebase, technologies.tmdb],
  },
  {
    id: "solarvistar",
    title: "SolarVistar",
    description:
      "A freelance CRM build for SolarVistar, a company based in Khargone, MP — giving their team a central place to manage leads, customers, and day-to-day operations.",
    highlights: [
      "Delivered a full CRM on a MERN stack with RTK Query for efficient, cache-aware data fetching.",
      "Modeled relational customer and operations data in PostgreSQL with Prisma.",
      "Integrated Cloudinary for media uploads and asset management across the platform.",
      "Shipped the project end-to-end as a freelance engagement, from requirements to deployment.",
    ],
    image: "/SolarVistar.png",
    liveUrl: "https://solarvistar.vercel.app",
    repoUrl: "https://github.com/Valtryek/solarvistar",
    technologies: [
      technologies.rtkquery,
      technologies.react,
      technologies.nodejs,
      technologies.express,
      technologies.mongodb,
      technologies.cloudinary,
      technologies.postgresql,
      technologies.prisma,
    ],
  },
  {
    id: "kropigo",
    title: "KropiGo",
    description:
      "A freelance agri-marketplace connecting kisan (farmers) directly with buyers — farmers list produce, buyers purchase, and admins oversee the entire marketplace.",
    highlights: [
      "Built real-time order and listing updates with Socket.io across a MERN/Next.js stack.",
      "Used RTK Query to keep marketplace listings and orders fast and in sync on the client.",
      "Implemented role-based flows for kisan, buyers, and admins, including marketplace moderation.",
      "Handled produce imagery and media uploads through Cloudinary.",
    ],
    image: "/kropigo.png",
    liveUrl: "https://kropigo.vercel.app",
    repoUrl: "https://github.com/Valtryek/kropigo",
    technologies: [
      technologies.socketio,
      technologies.rtkquery,
      technologies.nextjs,
      technologies.react,
      technologies.nodejs,
      technologies.express,
      technologies.mongodb,
      technologies.cloudinary,
    ],
  },
];

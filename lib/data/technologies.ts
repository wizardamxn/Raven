import {
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiReact,
  SiTailwindcss,
  SiDocker,
  SiPostgresql,
  SiGraphql,
  SiRedis,
  SiExpress,
  SiPrisma,
  SiVite,
  SiFramer,
  SiFfmpeg,
  SiSupabase,
  SiSocketdotio,
  SiFirebase,
  SiThemoviedatabase,
  SiRedux,
  SiCloudinary,
  SiVercel,
  SiFastapi,
  SiPython,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import type { IconType } from "react-icons";

export type Technology = {
  name: string;
  icon: IconType;
};

export const technologies = {
  typescript: { name: "TypeScript", icon: SiTypescript },
  nextjs: { name: "Next.js", icon: SiNextdotjs },
  nodejs: { name: "Node.js", icon: SiNodedotjs },
  mongodb: { name: "MongoDB", icon: SiMongodb },
  react: { name: "React", icon: SiReact },
  tailwind: { name: "Tailwind CSS", icon: SiTailwindcss },
  docker: { name: "Docker", icon: SiDocker },
  postgresql: { name: "PostgreSQL", icon: SiPostgresql },
  graphql: { name: "GraphQL", icon: SiGraphql },
  redis: { name: "Redis", icon: SiRedis },
  express: { name: "Express", icon: SiExpress },
  prisma: { name: "Prisma", icon: SiPrisma },
  vite: { name: "Vite", icon: SiVite },
  framer: { name: "Framer Motion", icon: SiFramer },
  ffmpeg: { name: "FFmpeg", icon: SiFfmpeg },
  supabase: { name: "Supabase", icon: SiSupabase },
  socketio: { name: "Socket.io", icon: SiSocketdotio },
  firebase: { name: "Firebase", icon: SiFirebase },
  tmdb: { name: "TMDB API", icon: SiThemoviedatabase },
  rtkquery: { name: "RTK Query", icon: SiRedux },
  cloudinary: { name: "Cloudinary", icon: SiCloudinary },
  vercelai: { name: "Vercel AI SDK", icon: SiVercel },
  fastapi: { name: "FastAPI", icon: SiFastapi },
  python: { name: "Python", icon: SiPython },
  reactnative: { name: "React Native", icon: SiReact },
  aws: { name: "AWS EC2", icon: FaAws },
} satisfies Record<string, Technology>;

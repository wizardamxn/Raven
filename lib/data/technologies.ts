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
} from "react-icons/si";
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
} satisfies Record<string, Technology>;

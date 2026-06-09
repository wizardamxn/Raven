import { technologies } from "@/lib/data/technologies";

const categories = [
  {
    label: "Frontend",
    techs: [
      technologies.typescript,
      technologies.react,
      technologies.nextjs,
      technologies.reactnative,
      technologies.tailwind,
    ],
  },
  {
    label: "Backend",
    techs: [
      technologies.nodejs,
      technologies.express,
      technologies.python,
      technologies.fastapi,
      technologies.socketio,
    ],
  },
  {
    label: "Database & Cache",
    techs: [
      technologies.mongodb,
      technologies.postgresql,
      technologies.redis,
      technologies.firebase,
      technologies.supabase,
    ],
  },
  {
    label: "Infrastructure",
    techs: [
      technologies.docker,
      technologies.aws,
      technologies.cloudinary,
      technologies.graphql,
    ],
  },
];

export default function Skills() {
  return (
    <div className="w-full max-w-xl mt-16 pt-8 border-t border-zinc-800/60 text-left">
      <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
        Toolkit
      </span>
      <h2 className="font-heading text-4xl font-black tracking-wide text-center mb-10 text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500">
        Skills
      </h2>

      <div className="flex flex-col gap-7">
        {categories.map((cat) => (
          <div key={cat.label}>
            <span className="block text-xs tracking-[0.3em] uppercase font-black text-zinc-600 mb-3">
              {cat.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {cat.techs.map((tech) => (
                <div
                  key={tech.name}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900/60 border border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors duration-200"
                >
                  <tech.icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-xs font-bold tracking-wider">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

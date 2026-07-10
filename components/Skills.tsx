import { technologies } from "@/lib/data/technologies";
import ChapterHeading from "@/components/ChapterHeading";

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
    <div className="w-full max-w-xl mt-16 pt-8 border-t border-gilt text-left">
      <ChapterHeading numeral="Chapter IV" kicker="Toolkit" title="Skills" />

      <div className="flex flex-col gap-7">
        {categories.map((cat) => (
          <div key={cat.label}>
            <span className="block text-xs tracking-[0.3em] uppercase font-black text-ember-500 mb-3">
              {cat.label}
            </span>
            <div className="flex flex-wrap gap-2">
              {cat.techs.map((tech) => (
                <div
                  key={tech.name}
                  className="group tech-chip flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink-800/70 border border-gilt text-parchment-300 hover:text-ember-300 hover:border-gilt-strong hover:shadow-[0_0_14px_rgba(217,164,65,0.18)] transition-all duration-200"
                >
                  <tech.icon className="w-3.5 h-3.5 shrink-0 transition-colors duration-200 group-hover:text-ember-300" />
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

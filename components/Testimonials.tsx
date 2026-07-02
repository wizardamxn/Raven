import ChapterHeading from "@/components/ChapterHeading";

const testimonials = [
  {
    quote:
      "Aman's the kind of developer you don't come across often — genuinely talented, ships real work, and makes the team better. I'd put my name behind him without hesitation.",
    name: "Yash Agarwal",
    role: "CEO",
    company: "Cerope",
  },
  {
    quote:
      "He's got solid technical foundations and real potential. Point him in the right direction and he delivers — every time.",
    name: "Aman Shrivastava",
    role: "CEO",
    company: "KodeCompiler",
  },
];

export default function Testimonials() {
  return (
    <div className="w-full max-w-xl text-left">
      <ChapterHeading kicker="Social Proof" title="What They Say" />

      <div className="flex flex-col gap-5">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="relative rounded-xl bg-ink-800/50 border border-gilt p-6"
          >
            <span className="absolute top-2 left-5 font-script text-ember-600/60 text-6xl leading-none select-none">
              &ldquo;
            </span>
            <blockquote className="relative pt-5">
              <p className="font-alice text-parchment-300 text-xl leading-relaxed italic">
                {t.quote}
              </p>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="w-px h-8 bg-gilt-strong shrink-0" />
              <div>
                <p className="font-heading text-sm font-black tracking-wide text-ember-300">
                  {t.name}
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-parchment-500 mt-0.5">
                  {t.role} · {t.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

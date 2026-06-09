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
      <span className="block text-center text-base tracking-[0.4em] text-zinc-500 uppercase font-black mb-2">
        Social Proof
      </span>
      <h2 className="font-heading text-4xl font-black tracking-wide text-center mb-10 text-transparent bg-clip-text bg-linear-to-b from-white via-zinc-200 to-zinc-500">
        What They Say
      </h2>

      <div className="flex flex-col gap-5">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="relative rounded-xl bg-zinc-900/40 border border-zinc-800/60 p-6"
          >
            <span className="absolute top-3 left-5 text-zinc-800 text-5xl font-serif leading-none select-none">
              &ldquo;
            </span>
            <blockquote className="relative pt-4">
              <p className="font-alice text-zinc-300 text-xl leading-relaxed italic">
                {t.quote}
              </p>
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <div className="w-px h-8 bg-zinc-700 shrink-0" />
              <div>
                <p className="font-heading text-sm font-black tracking-wide text-zinc-200">
                  {t.name}
                </p>
                <p className="text-xs tracking-[0.2em] uppercase text-zinc-500 mt-0.5">
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

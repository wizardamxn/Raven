import Image from "next/image";

export default function ArcaneWidgets({ contributions, valorant }: any) {
  return (
    <div className="flex flex-col gap-14 w-full max-w-xl text-left mt-12">
      {/* ================= Widget A — Contribution Heatmap ================= */}
      <div className="flex flex-col relative group">
        <h3 className="font-heading text-2xl font-black tracking-widest text-zinc-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-zinc-600 text-lg">✧</span>
          The Tome of Contributions
        </h3>
        <p className="font-alice text-zinc-400 text-xl sm:text-2xl leading-relaxed mb-6 italic">
          A year of arcane labor, etched into the living parchment of{" "}
          <span className="text-zinc-200 font-sans font-semibold border-b border-zinc-700">@{contributions?.username ?? "Valtryek"}</span>.
        </p>

        {contributions ? (
          <div className="relative rounded-xl bg-[#08080b] border border-zinc-800/80 overflow-hidden">
            <div className="relative p-6 overflow-x-auto">
              <div className="flex gap-[4px] w-max">
                {contributions.weeks.map((week: any, weekIndex: number) => (
                  <div key={weekIndex} className="flex flex-col gap-[4px]">
                    {week.map((day: any, dayIndex: number) => {
                      const levelClasses: Record<number, string> = {
                        0: "bg-zinc-900/40 border-zinc-800/50",
                        1: "bg-zinc-700/50 border-zinc-700/60",
                        2: "bg-zinc-600/60 border-zinc-500/50",
                        3: "bg-zinc-400/70 border-zinc-300/50",
                        4: "bg-zinc-200 border-white/40",
                      };
                      return (
                        <span
                          key={dayIndex}
                          title={day.date ? `${day.count} incantations cast on ${day.date}` : undefined}
                          className={`w-[11px] h-[11px] rounded-[3px] border transition-colors duration-200 hover:bg-white hover:border-white cursor-default ${levelClasses[day.level]}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Heatmap Legend */}
              <div className="flex items-center justify-end gap-3 mt-6 text-zinc-500 font-mono text-[11px] tracking-[0.2em]">
                <span className="text-zinc-600">DORMANT</span>
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-900/40 border-zinc-800/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-700/50 border-zinc-700/60" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-600/60 border-zinc-500/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-400/70 border-zinc-300/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-200 border-white/40" />
                <span className="text-zinc-400">AWAKENED</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-12 text-center text-zinc-600 text-lg font-alice tracking-widest uppercase">
            The tome remains sealed.
          </div>
        )}
      </div>

      {/* ================= Widget B — Valorant Stats ================= */}
      <div className="flex flex-col relative group mt-4">
        <h3 className="font-heading text-2xl font-black tracking-widest text-zinc-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-zinc-600 text-lg">⚔</span>
          The Vanguard's Sigil
        </h3>
        <p className="font-alice text-zinc-400 text-xl sm:text-2xl leading-relaxed mb-6 italic">
          Tactical skirmishes fought and realms defended under the banner of Valorant.
        </p>

        {valorant ? (
          <div className="relative rounded-xl bg-[#08080b] border border-zinc-800/80 overflow-hidden">
            <div className="relative p-7 flex items-center gap-8">
              {/* Rank Sigil */}
              {valorant.rankIconUrl && (
                <div className="relative w-20 h-20 shrink-0">
                  <Image src={valorant.rankIconUrl} alt={valorant.currentTier} fill className="object-contain" />
                </div>
              )}

              {/* Character Sheet Stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-heading text-2xl font-black tracking-wider text-zinc-100 truncate">
                    {valorant.riotName}
                  </span>
                  <span className="text-zinc-500 font-mono font-medium text-sm">
                    &lt;#{valorant.riotTag}&gt;
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-1">
                  <p className="text-zinc-300 font-mono text-sm tracking-[0.25em] uppercase font-bold">
                    {valorant.currentTier}
                  </p>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded bg-zinc-900/80 border border-zinc-700 text-zinc-400">
                    SOUL LVL {valorant.accountLevel}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-zinc-500 font-mono text-xs border-t border-zinc-800 pt-4 bg-zinc-950/30 -mx-2 px-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 tracking-widest mb-0.5">BATTLE RATING</span>
                    <span className="text-zinc-200 font-sans font-bold text-sm">{valorant.rr} <span className="text-zinc-500 text-[10px]">RR</span></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 tracking-widest mb-0.5">HIDDEN POWER</span>
                    <span className="text-zinc-200 font-sans font-bold text-sm">{valorant.elo} <span className="text-zinc-500 text-[10px]">ELO</span></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 tracking-widest mb-0.5">LAST SKIRMISH</span>
                    <span className={`font-sans font-black text-sm flex items-center gap-1 ${valorant.mmrChange >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                      {valorant.mmrChange >= 0 ? "▲ +" : "▼ "}
                      {valorant.mmrChange}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-12 text-center text-zinc-600 text-lg font-alice tracking-widest uppercase">
            The sigil remains unattuned.
          </div>
        )}
      </div>
    </div>
  );
}
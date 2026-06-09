import Image from "next/image";
import type { ContributionsData } from "@/lib/data/github";
import type { ValorantStats } from "@/lib/data/valorant";

export default function ArcaneWidgets({
  contributions,
  valorant,
}: {
  contributions: ContributionsData | null;
  valorant: ValorantStats | null;
}) {
  return (
    <div className="flex flex-col gap-14 w-full max-w-xl text-left mt-12">

      {/* ── GitHub Contributions ── */}
      <div className="flex flex-col">
        <h3 className="font-heading text-2xl font-black tracking-widest text-zinc-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-zinc-600 text-lg">✧</span>
          GitHub Activity
        </h3>

        {contributions ? (
          <div className="rounded-xl bg-[#08080b] border border-zinc-800/80 overflow-hidden">

            {/* Summary row */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-800/60">
              <div>
                <span className="font-heading text-3xl font-black text-zinc-100">
                  {contributions.totalLastYear.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-500 ml-2 tracking-[0.2em] uppercase font-bold">
                  contributions
                </span>
              </div>
              <a
                href={`https://github.com/${contributions.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] uppercase font-bold text-zinc-600 hover:text-zinc-300 transition-colors"
              >
                @{contributions.username}
              </a>
            </div>

            {/* Heatmap */}
            <div className="p-6 overflow-x-auto">
              <div className="flex gap-[4px] w-max">
                {contributions.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-[4px]">
                    {week.map((day, dayIndex) => {
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
                          title={day.date ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}` : undefined}
                          className={`w-[11px] h-[11px] rounded-[3px] border transition-colors duration-200 hover:bg-white hover:border-white cursor-default ${levelClasses[day.level]}`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-5 text-zinc-600 font-mono text-[10px] tracking-[0.15em] uppercase">
                <span>Less</span>
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-900/40 border-zinc-800/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-700/50 border-zinc-700/60" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-600/60 border-zinc-500/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-400/70 border-zinc-300/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-zinc-200 border-white/40" />
                <span>More</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-12 text-center text-zinc-600 text-lg font-alice tracking-widest uppercase">
            GitHub data unavailable.
          </div>
        )}
      </div>

      {/* ── Valorant ── */}
      <div className="flex flex-col">
        <h3 className="font-heading text-2xl font-black tracking-widest text-zinc-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-zinc-600 text-lg">⚔</span>
          Valorant
        </h3>

        {valorant ? (
          <div className="rounded-xl bg-[#08080b] border border-zinc-800/80 overflow-hidden">
            <div className="p-6 flex gap-6 items-center">

              {/* Rank icon */}
              {valorant.rankIconUrl && (
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={valorant.rankIconUrl}
                    alt={valorant.currentTier}
                    fill
                    className="object-contain"
                  />
                </div>
              )}

              {/* Right side */}
              <div className="flex-1 min-w-0">
                {/* Name + tag */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-heading text-2xl font-black tracking-wide text-zinc-100">
                    {valorant.riotName}
                  </span>
                  <span className="text-zinc-500 font-mono text-sm">
                    #{valorant.riotTag}
                  </span>
                </div>

                {/* Rank + level */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-zinc-200 font-mono text-sm tracking-[0.2em] uppercase font-bold">
                    {valorant.currentTier}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-700 text-zinc-400">
                    Level {valorant.accountLevel}
                  </span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-zinc-800">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase font-bold">Rank RR</span>
                    <span className="text-zinc-200 font-bold text-sm">
                      {valorant.rr} <span className="text-zinc-500 text-[10px]">RR</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase font-bold">ELO</span>
                    <span className="text-zinc-200 font-bold text-sm">{valorant.elo}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase font-bold">Last Game</span>
                    <span className={`font-bold text-sm ${valorant.mmrChange >= 0 ? "text-emerald-400" : "text-rose-500"}`}>
                      {valorant.mmrChange >= 0 ? `+${valorant.mmrChange}` : valorant.mmrChange} RR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-950/50 px-6 py-12 text-center text-zinc-600 text-lg font-alice tracking-widest uppercase">
            Valorant data unavailable.
          </div>
        )}
      </div>
    </div>
  );
}

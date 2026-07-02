import Image from "next/image";
import type { ContributionsData } from "@/lib/data/github";
import type { ValorantStats } from "@/lib/data/valorant";

// Gold heat scale — 5 distinguishable illumination steps
const levelClasses: Record<number, string> = {
  0: "bg-ink-800/60 border-gilt-faint",
  1: "bg-ember-600/45 border-ember-600/50",
  2: "bg-ember-500/60 border-ember-500/50",
  3: "bg-ember-400/80 border-ember-400/60",
  4: "bg-ember-200 border-ember-200/70",
};

export default function ArcaneWidgets({
  contributions,
  valorant,
}: Readonly<{
  contributions: ContributionsData | null;
  valorant: ValorantStats | null;
}>) {
  return (
    <div className="flex flex-col gap-14 w-full max-w-xl text-left mt-2">

      {/* ── GitHub Contributions ── */}
      <div className="flex flex-col">
        <h3 className="font-heading text-2xl font-black tracking-widest text-parchment-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-ember-500 text-lg">✧</span>
          GitHub Activity
        </h3>

        {contributions ? (
          <div className="rounded-xl bg-ink-900 border border-gilt overflow-hidden">

            {/* Summary row */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gilt-faint">
              <div>
                <span className="font-heading text-3xl font-black text-ember-300">
                  {contributions.totalLastYear.toLocaleString()}
                </span>
                <span className="text-xs text-parchment-500 ml-2 tracking-[0.2em] uppercase font-bold">
                  contributions
                </span>
              </div>
              <a
                href={`https://github.com/${contributions.username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs tracking-[0.2em] uppercase font-bold text-parchment-500 hover:text-ember-300 transition-colors"
              >
                @{contributions.username}
              </a>
            </div>

            {/* Heatmap */}
            <div className="p-6 overflow-x-auto">
              <div className="flex gap-1 w-max">
                {contributions.weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <span
                        key={dayIndex}
                        title={day.date ? `${day.count} contribution${day.count !== 1 ? "s" : ""} on ${day.date}` : undefined}
                        className={`w-[11px] h-[11px] rounded-[3px] border transition-colors duration-200 hover:bg-ember-200 hover:border-ember-200 cursor-default ${levelClasses[day.level]}`}
                      />
                    ))}
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-5 text-parchment-500 font-mono text-[10px] tracking-[0.15em] uppercase">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`w-[10px] h-[10px] rounded-[2px] border ${levelClasses[level]}`}
                  />
                ))}
                <span>More</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gilt bg-ink-900/60 px-6 py-12 text-center text-parchment-500 text-lg font-alice tracking-widest uppercase">
            GitHub data unavailable.
          </div>
        )}
      </div>

      {/* ── Valorant — The Battle Ledger ── */}
      <div className="flex flex-col">
        <h3 className="font-heading text-2xl font-black tracking-widest text-parchment-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-arcane-400 text-lg">⚔</span>
          Valorant
        </h3>

        {valorant ? (
          <div className="rounded-xl bg-ink-900 border border-gilt overflow-hidden">
            <div className="p-6 flex gap-6 items-center">

              {/* Rank icon */}
              {valorant.rankIconUrl && (
                <div className="relative w-20 h-20 shrink-0">
                  <Image
                    src={valorant.rankIconUrl}
                    alt={valorant.currentTier}
                    fill
                    sizes="80px"
                    className="object-contain"
                  />
                </div>
              )}

              {/* Right side */}
              <div className="flex-1 min-w-0">
                {/* Name + tag */}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-heading text-2xl font-black tracking-wide text-parchment-100">
                    {valorant.riotName}
                  </span>
                  <span className="text-parchment-500 font-mono text-sm">
                    #{valorant.riotTag}
                  </span>
                </div>

                {/* Rank + level */}
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-arcane-300 font-mono text-sm tracking-[0.2em] uppercase font-bold">
                    {valorant.currentTier}
                  </span>
                  <span className="text-[10px] font-black tracking-[0.15em] uppercase px-2 py-0.5 rounded bg-ink-800 border border-arcane-600/50 text-arcane-300">
                    Level {valorant.accountLevel}
                  </span>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gilt-faint">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-parchment-500 tracking-[0.2em] uppercase font-bold">Rank RR</span>
                    <span className="text-parchment-100 font-bold text-sm">
                      {valorant.rr} <span className="text-parchment-500 text-[10px]">RR</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-parchment-500 tracking-[0.2em] uppercase font-bold">ELO</span>
                    <span className="text-parchment-100 font-bold text-sm">{valorant.elo}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-parchment-500 tracking-[0.2em] uppercase font-bold">Last Game</span>
                    <span className={`font-bold text-sm ${valorant.mmrChange >= 0 ? "text-ember-300" : "text-wax-500"}`}>
                      {valorant.mmrChange >= 0 ? `+${valorant.mmrChange}` : valorant.mmrChange} RR
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-gilt bg-ink-900/60 px-6 py-12 text-center text-parchment-500 text-lg font-alice tracking-widest uppercase">
            Valorant data unavailable.
          </div>
        )}
      </div>
    </div>
  );
}

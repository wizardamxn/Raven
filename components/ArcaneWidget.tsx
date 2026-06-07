import Image from "next/image";

export default function ArcaneWidgets({ contributions, valorant }: any) {
  return (
    <div className="flex flex-col gap-14 w-full max-w-xl text-left mt-12">
      {/* ================= Widget A — The Grimoire of Commits ================= */}
      <div className="flex flex-col relative group">
        <h3 className="font-heading text-2xl font-black tracking-widest text-zinc-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-purple-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] text-lg">✧</span> 
          The Tome of Contributions
        </h3>
        <p className="font-alice text-zinc-400 text-2xl sm:text-3xl leading-relaxed mb-6 italic">
          A year of arcane labor, etched into the living parchment of{" "}
          <span className="text-purple-400 font-sans font-semibold border-b border-purple-500/30">@{contributions?.username ?? "Valtryek"}</span>.
        </p>

        {contributions ? (
          <div 
            className="relative rounded-xl p-[2px] bg-gradient-to-b from-purple-500/40 via-zinc-800/60 to-zinc-950 overflow-hidden shadow-2xl"
            style={{ animation: 'deepPulse 7s ease-in-out infinite' }}
          >
            {/* ARCANE CORNER BINDINGS */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-purple-400/60 rounded-tl-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-400/60 rounded-tr-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-400/60 rounded-bl-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/60 rounded-br-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />

            <div className="relative rounded-[10px] bg-[#050508]/90 p-6 overflow-x-auto z-10 border border-purple-900/20">
              <div className="flex gap-[4px] w-max">
                {contributions.weeks.map((week: any, weekIndex: number) => (
                  <div key={weekIndex} className="flex flex-col gap-[4px]">
                    {week.map((day: any, dayIndex: number) => {
                      const levelClasses: Record<number, string> = {
                        0: "bg-zinc-900/40 border-zinc-800/50",
                        1: "bg-purple-950/60 border-purple-900/50",
                        2: "bg-purple-800/50 border-purple-600/50",
                        3: "bg-purple-600/70 border-purple-400/60 shadow-[0_0_10px_rgba(168,85,247,0.5)]",
                        4: "bg-purple-400 border-white/80 shadow-[0_0_15px_rgba(216,180,254,0.9)] z-10 animate-[runeGlow_2s_ease-in-out_infinite]",
                      };
                      return (
                        <span
                          key={dayIndex}
                          title={day.date ? `${day.count} incantations cast on ${day.date}` : undefined}
                          className={`w-[11px] h-[11px] rounded-[3px] border transition-all duration-300 hover:scale-[1.8] hover:shadow-[0_0_15px_rgba(255,255,255,0.8)] hover:bg-white hover:z-30 cursor-crosshair ${levelClasses[day.level]}`}
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
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-950/60 border-purple-900/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-800/50 border-purple-600/50" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-600/70 border-purple-400/60" />
                <span className="w-[10px] h-[10px] rounded-[2px] border bg-purple-400 border-white/80 shadow-[0_0_8px_rgba(216,180,254,0.8)]" />
                <span className="text-purple-300 drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]">AWAKENED</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-purple-950/40 bg-zinc-950/50 px-6 py-12 text-center text-zinc-600 text-lg font-alice tracking-widest uppercase">
            The tome remains sealed.
          </div>
        )}
      </div>

      {/* ================= Widget B — The Vanguard's Sigil (Valorant) ================= */}
      <div className="flex flex-col relative group mt-4">
        <h3 className="font-heading text-2xl font-black tracking-widest text-zinc-100 mb-1 flex items-center gap-3 uppercase">
          <span className="text-purple-500 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] text-lg">⚔</span> 
          The Vanguard's Sigil
        </h3>
        <p className="font-alice text-zinc-400 text-2xl sm:text-3xl leading-relaxed mb-6 italic">
          Tactical skirmishes fought and realms defended under the banner of Valorant.
        </p>

        {valorant ? (
          <div 
            className="relative rounded-xl p-[2px] bg-gradient-to-b from-purple-500/40 via-zinc-800/60 to-zinc-950 overflow-hidden shadow-2xl"
            style={{ animation: 'deepPulse 9s ease-in-out infinite alternate' }}
          >
            
            {/* ARCANE CORNER BINDINGS */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-purple-400/60 rounded-tl-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-purple-400/60 rounded-tr-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-purple-400/60 rounded-bl-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-purple-400/60 rounded-br-xl z-20 pointer-events-none drop-shadow-[0_0_5px_rgba(168,85,247,0.8)]" />

            <div className="relative rounded-[10px] bg-[#050508]/90 p-7 flex items-center gap-8 z-10 border border-purple-900/20">
              {/* Floating Rank Sigil */}
              {valorant.rankIconUrl && (
                <div 
                  className="relative w-20 h-20 shrink-0 drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]"
                  style={{ animation: 'dynamicFloat 5s ease-in-out infinite' }}
                >
                  <Image src={valorant.rankIconUrl} alt={valorant.currentTier} fill className="object-contain" />
                </div>
              )}
              
              {/* Character Sheet Stats */}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="font-heading text-2xl font-black tracking-wider text-zinc-100 truncate">
                    {valorant.riotName}
                  </span>
                  <span className="text-purple-400/80 font-mono font-medium text-sm">
                    &lt;Guild: {valorant.riotTag}&gt;
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-purple-300 font-mono text-sm tracking-[0.25em] uppercase font-bold text-shadow-sm shadow-purple-900">
                    {valorant.currentTier}
                  </p>
                  <span className="text-[10px] font-black tracking-[0.2em] uppercase px-2 py-0.5 rounded bg-zinc-900/80 border border-purple-500/30 text-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                    SOUL LVL {valorant.accountLevel}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 text-zinc-500 font-mono text-xs border-t border-purple-900/30 pt-4 bg-zinc-950/30 -mx-2 px-2 rounded-lg">
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 tracking-widest mb-0.5">BATTLE RATING</span>
                    <span className="text-zinc-200 font-sans font-bold text-sm">{valorant.rr} <span className="text-purple-500 text-[10px]">RR</span></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 tracking-widest mb-0.5">HIDDEN POWER</span>
                    <span className="text-zinc-200 font-sans font-bold text-sm">{valorant.elo} <span className="text-purple-500 text-[10px]">ELO</span></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-zinc-600 tracking-widest mb-0.5">LAST SKIRMISH</span>
                    <span className={`font-sans font-black text-sm flex items-center gap-1 ${valorant.mmrChange >= 0 ? "text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" : "text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.5)]"}`}>
                      {valorant.mmrChange >= 0 ? "▲ +" : "▼ "}
                      {valorant.mmrChange}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border-2 border-dashed border-purple-950/40 bg-zinc-950/50 px-6 py-12 text-center text-zinc-600 text-lg font-alice tracking-widest uppercase">
            The sigil remains unattuned.
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { NowPlaying } from "@/lib/data/lastfm";

/** Gold equalizer bars — animate only while a track is live. */
function BardBars({ playing }: Readonly<{ playing: boolean }>) {
  return (
    <span aria-hidden className="flex items-end gap-0.75 h-4 shrink-0">
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={`w-0.75 rounded-full bg-ember-400 ${
            playing ? "animate-[bard-bar_1.1s_ease-in-out_infinite]" : "h-1 opacity-40"
          }`}
          style={playing ? { animationDelay: `${i * 0.18}s` } : undefined}
        />
      ))}
    </span>
  );
}

export default function NowPlayingWidget({ initial }: Readonly<{ initial: NowPlaying }>) {
  const [track, setTrack] = useState<NowPlaying>(initial);

  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch("/api/now-playing");
        if (res.ok) setTrack(await res.json());
      } catch {}
    };
    const id = setInterval(poll, 20_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full mt-16 pt-8 border-t border-gilt max-w-xl">
      <span className="block text-center text-xs tracking-[0.4em] text-ember-500 uppercase font-black mb-4 select-none">
        ♪ Music ♪
      </span>
      <div className="relative rounded-xl bg-ink-900 border border-gilt overflow-hidden">

        {/* Blurred album art as subtle background wash */}
        {track.albumArt && (
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none select-none">
            <Image
              src={track.albumArt}
              alt=""
              fill
              sizes="(max-width: 576px) 100vw, 576px"
              className="object-cover blur-2xl scale-110"
              unoptimized
            />
          </div>
        )}

        <div className="relative flex gap-5 items-center p-5">
          {/* Album art */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gilt-strong shrink-0 shadow-xl">
            {track.albumArt ? (
              <Image
                src={track.albumArt}
                alt={track.album}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-ink-800 text-ember-500 text-3xl select-none">
                ♪
              </div>
            )}
          </div>

          {/* Track info */}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="flex items-center gap-2.5 text-xs tracking-[0.25em] uppercase text-ember-400 font-black">
              <BardBars playing={track.isPlaying} />
              {track.isPlaying ? "Now Playing" : "Last Played"}
            </span>

            {track.songUrl ? (
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xl sm:text-2xl font-black text-arcane-300 truncate mt-1.5 hover:text-arcane-300/80 transition-colors leading-tight"
              >
                {track.title}
              </a>
            ) : (
              <span className="font-heading text-xl sm:text-2xl font-black text-arcane-300 truncate mt-1.5 leading-tight">
                {track.title}
              </span>
            )}

            <span className="text-sm text-parchment-300 truncate mt-1">{track.artist}</span>
            {track.album && (
              <span className="text-xs text-parchment-500 truncate mt-0.5 tracking-wide">{track.album}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

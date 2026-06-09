"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { NowPlaying } from "@/lib/data/lastfm";

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
    <div className="w-full mt-16 pt-8 border-t border-zinc-800/60 max-w-xl">
      <div className="relative rounded-xl bg-[#07070a] border border-zinc-900 overflow-hidden">

        {/* Blurred album art as subtle background wash */}
        {track.albumArt && (
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none select-none">
            <Image
              src={track.albumArt}
              alt=""
              fill
              className="object-cover blur-2xl scale-110"
              unoptimized
            />
          </div>
        )}

        <div className="relative flex gap-5 items-center p-5">
          {/* Album art */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-zinc-800/80 shrink-0 shadow-xl">
            {track.albumArt ? (
              <Image
                src={track.albumArt}
                alt={track.album}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-zinc-900 text-zinc-600 text-3xl select-none">
                ♪
              </div>
            )}
          </div>

          {/* Track info */}
          <div className="flex flex-col flex-1 min-w-0">
            <span className="text-xs tracking-[0.25em] uppercase text-zinc-500 font-black">
              {track.isPlaying ? "Now Playing" : "Last Played"}
            </span>

            {track.songUrl ? (
              <a
                href={track.songUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-heading text-xl sm:text-2xl font-black text-zinc-100 truncate mt-1.5 hover:text-white transition-colors leading-tight"
              >
                {track.title}
              </a>
            ) : (
              <span className="font-heading text-xl sm:text-2xl font-black text-zinc-100 truncate mt-1.5 leading-tight">
                {track.title}
              </span>
            )}

            <span className="text-sm text-zinc-400 truncate mt-1">{track.artist}</span>
            {track.album && (
              <span className="text-xs text-zinc-600 truncate mt-0.5 tracking-wide">{track.album}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

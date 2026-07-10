"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { getPointer, initPointer } from "@/lib/fx/pointer";
import { useSound } from "@/components/providers/SoundProvider";

type Phase = "flying" | "perched" | "startled" | "away";

const FLIGHT_MS = 3200;
const STARTLE_MS = 900;
const RETURN_MS = 45_000;
const HIDDEN_LEAVE_MS = 60_000;

/**
 * The resident raven. It arrives with the old great flight across the night,
 * then lands as a small articulated bird atop the tome's gilded arch. While
 * perched it turns its head toward your cursor (three quantized steps, ticked
 * at 4 Hz — birds don't glide, they snap), blinks every few seconds, and
 * occasionally ruffles its feathers. Click it and it startles away into the
 * dark; it returns after 45 seconds, or when you come back to a long-hidden
 * tab. Zero rAF while idle — everything runs on timers and CSS.
 *
 * Reduced motion: perched from the first paint, blink only.
 */
export default function RavenCompanion() {
  const [phase, setPhase] = useState<Phase | null>(null);
  const [headDir, setHeadDir] = useState(0); // -1 left, 0 forward, 1 right
  const [blinking, setBlinking] = useState(false);
  const [ruffling, setRuffling] = useState(false);
  const reducedRef = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const returnTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { play } = useSound();

  // Arrival — skip the flight under reduced motion.
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedRef.current) {
      setPhase("perched");
      return;
    }
    setPhase("flying");
    const t = setTimeout(() => setPhase("perched"), FLIGHT_MS);
    return () => clearTimeout(t);
  }, []);

  // Blink loop — runs whenever the raven is visible.
  useEffect(() => {
    if (phase !== "perched") return;
    let blinkOff: ReturnType<typeof setTimeout>;
    let next: ReturnType<typeof setTimeout>;
    const schedule = () => {
      next = setTimeout(() => {
        setBlinking(true);
        blinkOff = setTimeout(() => {
          setBlinking(false);
          schedule();
        }, 160);
      }, 4000 + Math.random() * 5000);
    };
    schedule();
    return () => {
      clearTimeout(next);
      clearTimeout(blinkOff);
    };
  }, [phase]);

  // Feather ruffle — a rare shiver, motion-allowed only.
  useEffect(() => {
    if (phase !== "perched" || reducedRef.current) return;
    let ruffleOff: ReturnType<typeof setTimeout>;
    let next: ReturnType<typeof setTimeout>;
    const schedule = () => {
      next = setTimeout(() => {
        setRuffling(true);
        ruffleOff = setTimeout(() => {
          setRuffling(false);
          schedule();
        }, 550);
      }, 12_000 + Math.random() * 13_000);
    };
    schedule();
    return () => {
      clearTimeout(next);
      clearTimeout(ruffleOff);
    };
  }, [phase]);

  // Head tracking — 4 Hz tick, quantized to three positions. Fine pointers only.
  useEffect(() => {
    if (phase !== "perched" || reducedRef.current) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    initPointer();
    const tick = setInterval(() => {
      const p = getPointer();
      const el = buttonRef.current;
      if (!p.active || !el) return;
      const rect = el.getBoundingClientRect();
      const dx = p.x - (rect.left + rect.width / 2);
      setHeadDir(dx < -80 ? -1 : dx > 80 ? 1 : 0);
    }, 250);
    return () => clearInterval(tick);
  }, [phase]);

  // Startle on click — it flees, then returns once it trusts you again.
  const startle = useCallback(() => {
    if (phase !== "perched") return;
    void play("tap");
    setPhase(reducedRef.current ? "away" : "startled");
    if (!reducedRef.current) {
      setTimeout(() => setPhase("away"), STARTLE_MS);
    }
    returnTimer.current = setTimeout(() => setPhase("perched"), RETURN_MS);
  }, [phase, play]);

  // Long-hidden tab: the raven wanders off, but comes back when you do.
  useEffect(() => {
    let hiddenAt = 0;
    const onVisibility = () => {
      if (document.hidden) {
        hiddenAt = Date.now();
        return;
      }
      if (hiddenAt && Date.now() - hiddenAt > HIDDEN_LEAVE_MS) {
        // Returned to a long-abandoned page — cancel any pending return and
        // fly back in fresh.
        if (returnTimer.current) clearTimeout(returnTimer.current);
        setPhase("away");
        setTimeout(() => setPhase("perched"), 700);
      }
      hiddenAt = 0;
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  if (phase === null) return null;

  // The arrival flight — the familiar sweep across the whole night sky.
  if (phase === "flying") {
    return (
      <div
        aria-hidden
        className="fixed w-[220px] h-[220px] z-50 pointer-events-none -bottom-[200px] -left-[200px]
                   drop-shadow-[0_6px_18px_rgba(0,0,0,0.4)]"
        style={{
          animation: "raven-fly-across 3.2s cubic-bezier(0.25, 0.1, 0.35, 1) forwards",
          filter: "drop-shadow(0 0 22px rgba(217,164,65,0.28))",
        }}
      >
        <Image
          src="/download.png"
          alt=""
          fill
          sizes="35vw"
          priority
          style={{ animation: "raven-wing-flap 0.34s ease-in-out infinite" }}
        />
      </div>
    );
  }

  if (phase === "away") return null;

  // Static under reduced motion — no settle bounce, just present.
  let stateClass = "";
  if (phase === "startled") stateClass = "raven-startled";
  else if (!reducedRef.current) stateClass = "raven-perched";

  return (
    <button
      ref={buttonRef}
      type="button"
      aria-label="The raven"
      title="The raven"
      onClick={startle}
      className={`absolute -top-17 left-1/2 -ml-10 z-40 w-20 h-18
                  cursor-pointer bg-transparent border-0 p-0
                  focus-visible:outline-2 focus-visible:outline-ember-400 focus-visible:outline-offset-4
                  ${blinking ? "raven-blink" : ""} ${stateClass}`}
    >
      <svg
        viewBox="0 0 48 44"
        className={`w-full h-full overflow-visible
                    [filter:drop-shadow(0_2px_6px_rgba(0,0,0,0.8))_drop-shadow(0_0_12px_rgba(217,164,65,0.3))]
                    ${ruffling ? "raven-ruffling" : ""}`}
        aria-hidden
      >
        {/* Tail — swept back and down */}
        <path
          d="M30 27 L46 35 L44 38 L31 33 Z"
          fill="#171021"
          stroke="rgba(217,164,65,0.5)"
          strokeWidth="0.7"
        />
        {/* Body */}
        <path
          d="M13 29 C13 22 19 18 25 19 C32 20 35 26 33 32 C31.5 36.5 27 39 22.5 38.5 C17 38 13 34.5 13 29 Z"
          fill="#171021"
          stroke="rgba(217,164,65,0.55)"
          strokeWidth="0.8"
        />
        {/* Moonlit rim along the back */}
        <path
          d="M14 26 C17 20.5 22.5 18.2 27.5 19.4"
          fill="none"
          stroke="rgba(246,223,164,0.55)"
          strokeWidth="0.9"
          strokeLinecap="round"
        />
        {/* Folded wing — the lighter tone of the two */}
        <path
          d="M19 25 C25 22 32 24 33 29 C33.5 32 31 35.5 27 36 C29 32 26 27 19 25 Z"
          fill="#2c2140"
          stroke="rgba(217,164,65,0.35)"
          strokeWidth="0.6"
        />
        {/* Legs */}
        <path
          d="M21 38 L20 43 M26 38 L26 43"
          stroke="#3a2c52"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Head — pivots at the neck toward your cursor */}
        <g
          className="raven-head"
          style={{ transform: `rotate(${headDir * 13}deg)` }}
        >
          <circle
            cx="15"
            cy="15"
            r="7"
            fill="#171021"
            stroke="rgba(217,164,65,0.55)"
            strokeWidth="0.8"
          />
          {/* Neck fill so the head connects to the body at any angle */}
          <path d="M10 18 C12 22 18 23 21 21 L19 26 L12 25 Z" fill="#171021" />
          {/* Crown highlight */}
          <path
            d="M10.5 11 C12.5 8.6 17 8.4 19.5 10.6"
            fill="none"
            stroke="rgba(246,223,164,0.5)"
            strokeWidth="0.8"
            strokeLinecap="round"
          />
          {/* Beak */}
          <path
            d="M9 13.5 L1 16 L9 18 C8.4 16.6 8.4 14.9 9 13.5 Z"
            fill="#2c2140"
            stroke="rgba(217,164,65,0.5)"
            strokeWidth="0.6"
          />
          {/* Ember eye — halo, iris, glint */}
          <circle cx="13.5" cy="13.5" r="3.2" fill="rgba(217,164,65,0.25)" />
          <circle
            className="raven-eye"
            cx="13.5"
            cy="13.5"
            r="1.7"
            fill="#d9a441"
          />
          <circle cx="14" cy="13" r="0.5" fill="#f6dfa4" />
        </g>
      </svg>
    </button>
  );
}

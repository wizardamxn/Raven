"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { playSfx, type SfxName } from "@/lib/sound/sfx";

type SoundContextValue = {
  enabled: boolean;
  toggle: () => void;
  play: (name: SfxName) => Promise<void>;
};

const SoundContext = createContext<SoundContextValue>({
  enabled: false,
  toggle: () => {},
  play: async () => {},
});

export const useSound = () => useContext(SoundContext);

const STORAGE_KEY = "raven-sfx";

/**
 * Sound is off by default and opt-in. The AudioContext is created lazily inside
 * a user gesture (autoplay-policy safe), and `play()` is a no-op while muted —
 * so components can call it unconditionally at zero cost until enabled.
 */
export default function SoundProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [enabled, setEnabled] = useState(false);
  const enabledRef = useRef(false);
  const acRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);

  const setBoth = useCallback((v: boolean) => {
    enabledRef.current = v;
    setEnabled(v);
  }, []);

  useEffect(() => {
    setBoth(localStorage.getItem(STORAGE_KEY) === "on");
  }, [setBoth]);

  const ensureContext = useCallback(() => {
    if (acRef.current) return acRef.current;
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AC) return null;
    const ac = new AC();
    const master = ac.createGain();
    master.gain.value = 0.2;
    master.connect(ac.destination);
    acRef.current = ac;
    masterRef.current = master;
    return ac;
  }, []);

  const play = useCallback(
    async (name: SfxName) => {
      if (!enabledRef.current) return;
      const ac = ensureContext();
      if (!ac || !masterRef.current) return;
      if (ac.state === "suspended") void ac.resume();
      await playSfx(ac, masterRef.current, name);
    },
    [ensureContext]
  );

  const toggle = useCallback(() => {
    const next = !enabledRef.current;
    setBoth(next);
    localStorage.setItem(STORAGE_KEY, next ? "on" : "off");
    if (next) {
      const ac = ensureContext();
      if (ac && masterRef.current) {
        if (ac.state === "suspended") void ac.resume();
        void playSfx(ac, masterRef.current, "tap"); // confirmation
      }
    }
  }, [ensureContext, setBoth]);

  const value = useMemo(
    () => ({ enabled, toggle, play }),
    [enabled, toggle, play]
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

"use client";

import { useCallback } from "react";
import { useIncantation } from "@/lib/hooks/useIncantation";
import { useSound } from "@/components/providers/SoundProvider";

// Mount point for the keyboard incantation egg. Renders nothing.
export default function Incantations() {
  const { play } = useSound();
  const onCast = useCallback(() => void play("tap"), [play]);
  useIncantation(onCast);
  return null;
}

"use client";

import { useEffect, useState } from "react";
import styles from "./MagicRaven.module.css";
import Image from "next/image";

export default function MagicRaven() {
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(false);
    }, 3100);

    return () => clearTimeout(timer);
  }, []);

  if (!isMounted) return null;

  return (
    <div className={styles.container}>
      <Image 
        src='/download.png' 
        alt="Raven" 
        fill // This tells it to fill the dynamic container size completely
        sizes="35vw" // Optimizes performance for a 25% viewport image
        priority // Loads it instantly without lazy-loading delay
        className={styles.ravenImage}
      />
    </div>
  );
}
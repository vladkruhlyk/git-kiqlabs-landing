"use client";

import { motion } from "motion/react";

const BOTTLES = [
  { src: "/media/photo1.png", alt: "OstroVit Omega 3" },
  { src: "/media/photo2.png", alt: "OstroVit Biotin Plus" },
  { src: "/media/photo3.png", alt: "OstroVit Triple Zinc" },
];

// Плавающая анимация: у каждой банки своя амплитуда/скорость/задержка,
// чтобы они не «дышали» синхронно.
const FLOAT = [
  { y: [0, -16, 0], dur: 5.5, delay: 0 },
  { y: [0, -24, 0], dur: 6.4, delay: 0.5 },
  { y: [0, -19, 0], dur: 6, delay: 1.1 },
];

export function B2BBottles() {
  return (
    <div className="relative flex items-end justify-center px-5 pb-9 pt-12 sm:px-8 sm:pb-10 sm:pt-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(var(--color-grass) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          opacity: 0.06,
          maskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent)",
          WebkitMaskImage: "radial-gradient(70% 60% at 50% 40%, #000, transparent)",
        }}
      />
      {BOTTLES.map((b, i) => (
        <motion.img
          key={b.src}
          src={b.src}
          alt={b.alt}
          className={`object-contain object-bottom drop-shadow-[0_18px_26px_rgba(18,23,42,0.20)] ${
            i === 1 ? "z-30 w-[47%] -mx-[8%]" : "z-10 w-[36%]"
          }`}
          draggable={false}
          animate={{ y: FLOAT[i].y }}
          transition={{
            duration: FLOAT[i].dur,
            delay: FLOAT[i].delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

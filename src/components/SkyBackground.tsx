"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";
import Cloud from "./Cloud";

function DriftingCloud({
  top,
  size,
  duration,
  delay = 0,
  cloudClassName = "",
}: {
  top: string;
  size: string;
  duration: number;
  delay?: number;
  cloudClassName?: string;
}) {
  return (
    <motion.div
      className={`absolute ${size}`}
      style={{ top }}
      initial={{ left: "110%" }}
      animate={{ left: "-40%" }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    >
      <Cloud className={`h-full w-full ${cloudClassName}`} />
    </motion.div>
  );
}

function Star({
  top,
  left,
  size,
  duration,
  delay = 0,
}: {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay?: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        top,
        left,
        width: size,
        height: size,
        boxShadow: `0 0 ${size * 3}px ${size}px rgba(255,255,255,0.9)`,
      }}
      animate={{ opacity: [0.1, 1, 0.1], scale: [0.5, 1.4, 0.5] }}
      transition={{
        duration,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

function Sparkle({
  top,
  left,
  size,
  duration,
  delay = 0,
}: {
  top: string;
  left: string;
  size: number;
  duration: number;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      className="absolute"
      style={{ top, left, width: size, height: size }}
      animate={{ opacity: [0, 1, 0], scale: [0.2, 1, 0.2], rotate: [0, 90, 0] }}
      transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
    >
      <path
        d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
        fill="#FFFFFF"
        style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.9))" }}
      />
    </motion.svg>
  );
}

// Bintang kecil — jumlah banyak, tersebar dari atas sampai pertengahan langit
const STARS = [
  { top: "4%", left: "6%", size: 2, duration: 1.8, delay: 0 },
  { top: "9%", left: "16%", size: 3, duration: 2.3, delay: 0.4 },
  { top: "3%", left: "24%", size: 2, duration: 1.6, delay: 0.9 },
  { top: "14%", left: "32%", size: 2.5, duration: 2.6, delay: 0.2 },
  { top: "7%", left: "40%", size: 2, duration: 1.9, delay: 1.3 },
  { top: "18%", left: "48%", size: 3, duration: 2.4, delay: 0.6 },
  { top: "5%", left: "56%", size: 2, duration: 2, delay: 1.7 },
  { top: "12%", left: "64%", size: 2.5, duration: 2.2, delay: 0.1 },
  { top: "20%", left: "72%", size: 2, duration: 1.7, delay: 1 },
  { top: "8%", left: "90%", size: 2, duration: 2.5, delay: 0.5 },
  { top: "24%", left: "4%", size: 2.5, duration: 2.1, delay: 1.4 },
  { top: "28%", left: "18%", size: 2, duration: 1.9, delay: 0.3 },
  { top: "32%", left: "30%", size: 3, duration: 2.7, delay: 1.1 },
  { top: "26%", left: "44%", size: 2, duration: 1.8, delay: 0.7 },
  { top: "36%", left: "58%", size: 2.5, duration: 2.3, delay: 1.6 },
  { top: "30%", left: "68%", size: 2, duration: 2, delay: 0.2 },
  { top: "22%", left: "82%", size: 3, duration: 2.6, delay: 1.2 },
  { top: "38%", left: "92%", size: 2, duration: 1.7, delay: 0.8 },
  { top: "42%", left: "10%", size: 2, duration: 2.2, delay: 1.9 },
  { top: "46%", left: "22%", size: 2.5, duration: 1.9, delay: 0.4 },
  { top: "50%", left: "36%", size: 2, duration: 2.4, delay: 1.3 },
  { top: "44%", left: "50%", size: 3, duration: 2.1, delay: 0.6 },
  { top: "54%", left: "62%", size: 2, duration: 1.8, delay: 1.7 },
  { top: "48%", left: "76%", size: 2.5, duration: 2.5, delay: 0.9 },
  { top: "58%", left: "86%", size: 2, duration: 2, delay: 0.3 },
  { top: "62%", left: "14%", size: 2, duration: 2.3, delay: 1.5 },
  { top: "66%", left: "28%", size: 2.5, duration: 1.9, delay: 0.5 },
  { top: "60%", left: "46%", size: 2, duration: 2.6, delay: 1.1 },
  { top: "70%", left: "60%", size: 2, duration: 1.7, delay: 0.2 },
  { top: "64%", left: "80%", size: 2.5, duration: 2.2, delay: 1.8 },
];

// Bintang besar berbentuk sparkle — sebagai aksen dramatis
const SPARKLES = [
  { top: "10%", left: "20%", size: 14, duration: 2.8, delay: 0 },
  { top: "6%", left: "50%", size: 18, duration: 3.2, delay: 0.8 },
  { top: "16%", left: "78%", size: 12, duration: 2.6, delay: 1.4 },
  { top: "28%", left: "10%", size: 16, duration: 3, delay: 0.5 },
  { top: "34%", left: "62%", size: 14, duration: 2.7, delay: 1.9 },
  { top: "46%", left: "34%", size: 12, duration: 2.9, delay: 1.1 },
  { top: "52%", left: "88%", size: 16, duration: 3.1, delay: 0.3 },
  { top: "20%", left: "40%", size: 10, duration: 2.4, delay: 2.1 },
];

export default function SkyBackground({
  containerRef,
  isDarkMode,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
  isDarkMode: boolean;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const lightBackground = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8, 1],
    [
      "linear-gradient(180deg, #2563EB 0%, #3B82F6 40%, #60A5FA 100%)",
      "linear-gradient(180deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)",
      "linear-gradient(180deg, #60A5FA 0%, #93C5FD 60%, #BAE6FD 100%)",
      "linear-gradient(180deg, #93C5FD 0%, #BAE6FD 50%, #E0F2FE 100%)",
    ]
  );

  const darkBackground = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8, 1],
    [
      "linear-gradient(180deg, #020617 0%, #0F172A 40%, #1E1B4B 100%)",
      "linear-gradient(180deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)",
      "linear-gradient(180deg, #1E1B4B 0%, #312E81 60%, #3730A3 100%)",
      "linear-gradient(180deg, #312E81 0%, #3730A3 50%, #4338CA 100%)",
    ]
  );

  const cloudY1 = useTransform(scrollYProgress, [0, 1], ["0px", "-150px"]);
  const cloudY2 = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"]);

  // Dinaikkan supaya awan tetap solid putih di area Hero, baru pudar mendekati ground
  const cloudOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.95],
    isDarkMode ? [0.6, 0.35, 0.05] : [1, 0.85, 0.15]
  );

  return (
    <motion.div
      style={{ background: isDarkMode ? darkBackground : lightBackground }}
      className="fixed inset-0 -z-10 h-screen w-screen overflow-hidden pointer-events-none transition-colors duration-700"
    >
      {isDarkMode && (
        <>
          <div className="absolute top-10 right-12 sm:right-24 h-24 w-24 sm:h-32 sm:w-32 rounded-full bg-amber-100/20 blur-3xl" />
          <div className="absolute top-14 right-16 sm:right-28 h-14 w-14 sm:h-20 sm:w-20 rounded-full border border-amber-200/60 bg-amber-100 shadow-[0_0_50px_rgba(254,243,199,0.8)]" />

          <div className="absolute inset-0">
            {STARS.map((star, i) => (
              <Star key={`star-${i}`} {...star} />
            ))}
            {SPARKLES.map((sparkle, i) => (
              <Sparkle key={`sparkle-${i}`} {...sparkle} />
            ))}
          </div>
        </>
      )}

      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          filter: isDarkMode
            ? "brightness(0.55) saturate(0.6) hue-rotate(190deg)"
            : "none",
        }}
      >
        <motion.div style={{ opacity: cloudOpacity, y: cloudY1 }} className="absolute inset-0">
          <DriftingCloud top="5%" size="h-12 w-32 sm:h-20 sm:w-52" duration={38} delay={0} cloudClassName="drop-shadow-md" />
          <DriftingCloud top="15%" size="h-16 w-40 sm:h-24 sm:w-64" duration={45} delay={8} cloudClassName="drop-shadow-md" />
          <DriftingCloud top="32%" size="h-10 w-28 sm:h-16 sm:w-44" duration={32} delay={18} cloudClassName="drop-shadow-sm" />
          <DriftingCloud top="48%" size="h-16 w-48 sm:h-28 sm:w-80" duration={50} delay={4} cloudClassName="drop-shadow-md" />
          <DriftingCloud top="68%" size="h-14 w-36 sm:h-22 sm:w-56" duration={36} delay={14} cloudClassName="drop-shadow-sm" />
          <DriftingCloud top="82%" size="h-12 w-32 sm:h-16 sm:w-48" duration={28} delay={22} cloudClassName="drop-shadow-sm" />
        </motion.div>

        <motion.div style={{ opacity: cloudOpacity, y: cloudY2 }} className="absolute inset-0">
          <DriftingCloud top="22%" size="h-10 w-24 sm:h-14 sm:w-40" duration={30} delay={12} cloudClassName="drop-shadow-sm" />
          <DriftingCloud top="40%" size="h-12 w-32 sm:h-18 sm:w-48" duration={42} delay={25} cloudClassName="drop-shadow-sm" />
          <DriftingCloud top="58%" size="h-8 w-20 sm:h-12 sm:w-36" duration={26} delay={9} cloudClassName="drop-shadow-sm" />
          <DriftingCloud top="75%" size="h-12 w-32 sm:h-20 sm:w-52" duration={40} delay={16} cloudClassName="drop-shadow-sm" />
        </motion.div>
      </div>
    </motion.div>
  );
}
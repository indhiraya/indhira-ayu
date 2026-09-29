"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";

// Daftar 3 foto yang akan berganti secara otomatis
const PHOTOS = [
  "/Image1.png", 
  "/Image2.png",
  "/Image3.png",
];

export default function LanyardCard() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Index foto aktif
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Timed slideshow: Berganti foto setiap 3.5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % PHOTOS.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  // Motion Value posisi drag secara real-time
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Rotasi otomatis saat kartu ditarik
  const rotate = useTransform(x, [-250, 250], [-25, 25]);

  // Kalkulasi Tali Lanyard yang Pas & Proporsional
  const pathD = useTransform([x, y], ([latestX, latestY]: number[]) => {
    const startX = 140; // Titik gantung atas (tengah container 280px)
    const startY = 0;
    const endX = startX + latestX;
    const endY = 110 + latestY;

    const controlX = startX + latestX * 0.5;
    const controlY = startY + latestY * 0.35 + 15;

    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  });

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-start w-full min-h-[460px] pt-12 overflow-visible select-none"
    >
      {/* SVG Tali Lanyard — Dua Lapis Supaya Selalu Kontras */}
      <svg
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none z-10 overflow-visible"
        width="280"
        height="500"
      >
        {/* Lapisan luar: outline gelap semi-transparan untuk kontras di background terang */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(15, 23, 42, 0.35)"
          strokeWidth="7"
          strokeLinecap="round"
        />
        {/* Lapisan tengah: warna dasar tali (biru tua khas lanyard) */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="#1e3a8a"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Lapisan atas: highlight terang di tengah tali untuk efek woven/kain */}
        <motion.path
          d={pathD}
          fill="none"
          stroke="rgba(255, 255, 255, 0.9)"
          strokeWidth="1.5"
          strokeDasharray="1 5"
          strokeLinecap="round"
        />
      </svg>

      {/* Main Draggable Photo Lanyard Card */}
      <motion.div
        drag
        dragSnapToOrigin={true}
        dragElastic={0.65}
        style={{ x, y, rotate }}
        whileHover={{ scale: 1.02 }}
        whileDrag={{ scale: 1.05 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 14,
          mass: 0.7,
        }}
        className="relative z-20 w-64 sm:w-72 h-80 sm:h-96 bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/50 rounded-3xl p-3 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col items-center cursor-grab active:cursor-grabbing overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/30 rounded-full blur-2xl pointer-events-none z-20" />

        {/* Gantungan Metal (Ring + Clip Realistis) */}
        <div className="relative flex flex-col items-center mb-2.5 shrink-0 z-20">
          <div className="w-4 h-4 rounded-full border-[3px] border-white/90 shadow-sm" />
          <div className="w-7 h-2.5 bg-gradient-to-b from-white to-white/70 rounded-sm -mt-1 border border-white shadow-sm" />
        </div>

        {/* Bingkai Foto Penuh (Full Frame Photo Container) — background solid supaya tidak "tembus" saat transisi */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/40 shadow-inner bg-gradient-to-br from-slate-800 to-slate-900">
          <AnimatePresence mode="sync">
            <motion.img
              key={currentPhotoIndex}
              src={PHOTOS[currentPhotoIndex]}
              alt={`Indhira Ayu Puspita Ningrum, Informatics Engineering student at ITS (photo ${currentPhotoIndex + 1})`}
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              onError={(e) => {
                // Fallback avatar berbeda jika gambar belum diunggah
                const colors = ["3B82F6", "10B981", "8B5CF6"];
                e.currentTarget.src = `https://ui-avatars.com/api/?name=Indhira+${currentPhotoIndex + 1}&background=${colors[currentPhotoIndex]}&color=fff&size=256`;
              }}
            />
          </AnimatePresence>

          {/* Gradient overlay bawah supaya dots indicator selalu terbaca di atas foto apapun */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

          {/* Indikator Titik Galeri Foto di Bagian Bawah Kartu */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20 px-3 py-1 rounded-full bg-black/30 backdrop-blur-md border border-white/20">
            {PHOTOS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPhotoIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentPhotoIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

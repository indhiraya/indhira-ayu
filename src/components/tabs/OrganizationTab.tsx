"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import organizationsData from "@/data/organizations.json";

interface OrganizationItem {
  id: string;
  name: string;
  logo: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
}

const ORGANIZATIONS: OrganizationItem[] = organizationsData as OrganizationItem[];

export default function OrganizationTab() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedOrgIndex, setSelectedOrgIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (selectedOrgIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedOrgIndex]);

  const selectedOrg = selectedOrgIndex !== null ? ORGANIZATIONS[selectedOrgIndex] : null;

  const handleNavigate = (dir: "prev" | "next") => {
    if (selectedOrgIndex === null) return;
    if (dir === "prev" && selectedOrgIndex > 0) {
      setSelectedOrgIndex(selectedOrgIndex - 1);
    } else if (dir === "next" && selectedOrgIndex < ORGANIZATIONS.length - 1) {
      setSelectedOrgIndex(selectedOrgIndex + 1);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="w-full relative flex items-center justify-center min-h-[310px] py-2">
      {/* GRID 11 ORGANISASI (6 KOLOM RESPONSIF, RINGKAS TANPA SCROLL) */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2.5 sm:gap-3 w-full max-w-5xl mx-auto">
        {ORGANIZATIONS.map((org, index) => {
          const isSelected = selectedOrgIndex === index;

          return (
            <button
              key={org.id}
              onClick={() => setSelectedOrgIndex(index)}
              className={`flex flex-col items-center justify-between p-2.5 sm:p-3 rounded-2xl h-28 sm:h-32 transition-all duration-300 cursor-pointer backdrop-blur-xl border ${
                isSelected
                  ? "bg-white/50 border-white shadow-[0_8px_25px_0_rgba(255,255,255,0.35)] scale-105 ring-2 ring-white z-10"
                  : "bg-white/20 border-white/40 hover:bg-white/35 hover:scale-102"
              }`}
            >
              {/* LOGO BULAT ORGANISASI UKURAN COMPACT */}
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border border-white/80 shadow-sm bg-white flex items-center justify-center shrink-0 mt-1">
                {org.logo ? (
                  <Image
                    src={org.logo}
                    alt={org.name}
                    fill
                    className="object-contain p-1.5"
                    sizes="48px"
                  />
                ) : (
                  <span className="text-[10px] sm:text-xs font-black text-blue-950 text-center leading-none px-0.5">
                    {org.name.substring(0, 3)}
                  </span>
                )}
              </div>

              {/* NAMA ORGANISASI */}
              <span className="text-[10px] sm:text-xs font-extrabold text-white text-center leading-tight line-clamp-2 my-auto drop-shadow-xs">
                {org.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* MODAL DETAIL GLASSMORPHISM — FULL VIEWPORT, TERANG */}
      <AnimatePresence>
        {selectedOrg && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop tipis, tidak menggelapkan kartu */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/10 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedOrgIndex(null)}
            />

            {/* KARTU DETAIL KACA TERANG */}
            <motion.div
              key={selectedOrg.id}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative z-10 w-full max-w-2xl max-h-[88vh] bg-white/70 backdrop-blur-2xl rounded-3xl border border-white shadow-[0_20px_50px_rgba(31,38,135,0.25)] flex flex-col overflow-hidden text-left"
            >
              {/* GRADIENT SHEEN UNTUK EFEK KACA TERANG */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent" />
              <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 bg-white/50 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 bg-white/30 rounded-full blur-3xl" />

              {/* KONTEN (DI ATAS SHEEN) */}
              <div className="relative z-10 flex flex-col h-full min-h-0">
                {/* HEADER TETAP */}
                <div className="flex items-center gap-4 p-5 sm:p-6 pb-3 shrink-0">
                  {/* LOGO ORGANISASI SEBAGAI AVATAR (TANPA ROLE PHOTO) */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md shrink-0 bg-white flex items-center justify-center">
                    {selectedOrg.logo ? (
                      <Image
                        src={selectedOrg.logo}
                        alt={selectedOrg.name}
                        fill
                        className="object-contain p-2"
                        sizes="80px"
                      />
                    ) : (
                      <span className="text-sm font-bold text-blue-950 text-center px-1">
                        {selectedOrg.name.substring(0, 2)}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-950/10 text-blue-950 text-[10px] font-bold border border-blue-950/20 mb-1 shadow-xs">
                      🗓️ {selectedOrg.period}
                    </span>
                    <h4 className="text-base sm:text-lg font-black text-blue-950 leading-tight truncate">
                      {selectedOrg.role}
                    </h4>
                    <p className="text-xs sm:text-sm font-extrabold text-blue-900/80 mt-0.5 truncate">
                      {selectedOrg.name}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedOrgIndex(null)}
                    className="w-8 h-8 rounded-full bg-white/70 hover:bg-white text-blue-950 text-sm font-bold flex items-center justify-center backdrop-blur-md border border-white/90 transition-all cursor-pointer shadow-xs shrink-0"
                  >
                    ✕
                  </button>
                </div>

                {/* BODY SCROLLABLE */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-3 space-y-3 custom-scrollbar">
                  <p className="text-sm text-blue-950/90 font-medium leading-relaxed">
                    {selectedOrg.description}
                  </p>

                  {selectedOrg.achievements && selectedOrg.achievements.length > 0 && (
                    <div className="pt-3 border-t border-blue-950/15 space-y-1.5">
                      <p className="text-[11px] font-black text-blue-900/70 uppercase tracking-wider">
                        Key Contributions:
                      </p>
                      {selectedOrg.achievements.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-2 text-sm text-blue-950 font-medium leading-snug"
                        >
                          <span className="text-blue-900 font-bold">•</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* FOOTER TETAP */}
                <div className="flex justify-between items-center p-5 sm:p-6 pt-3 border-t border-blue-950/15 text-xs shrink-0">
                  <button
                    disabled={selectedOrgIndex === 0}
                    onClick={() => handleNavigate("prev")}
                    className="flex items-center gap-1 font-extrabold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/80 transition-all cursor-pointer px-3.5 py-1.5 rounded-full bg-white/60 border border-white/90 text-blue-950 shadow-xs"
                  >
                    ‹ Prev
                  </button>
                  <span className="text-[11px] font-bold text-blue-950/70">
                    {(selectedOrgIndex ?? 0) + 1} of {ORGANIZATIONS.length}
                  </span>
                  <button
                    disabled={selectedOrgIndex === ORGANIZATIONS.length - 1}
                    onClick={() => handleNavigate("next")}
                    className="flex items-center gap-1 font-extrabold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/80 transition-all cursor-pointer px-3.5 py-1.5 rounded-full bg-white/60 border border-white/90 text-blue-950 shadow-xs"
                  >
                    Next ›
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

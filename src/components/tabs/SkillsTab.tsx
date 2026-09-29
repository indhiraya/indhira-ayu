"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import skillsData from "@/data/skills.json";

interface SkillCategory {
  id: string;
  category: string;
  description: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = skillsData as SkillCategory[];
const ITEMS_PER_PAGE = 6;

export default function SkillsTab() {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(SKILL_CATEGORIES.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentSkills = SKILL_CATEGORIES.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full relative flex flex-col justify-between min-h-[340px] py-1 select-none">
      {/* TOMBOL NAVIGASI PREV SLIDE */}
      {currentPage > 0 && (
        <button
          onClick={handlePrev}
          aria-label="Slide sebelumnya"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/60"
        >
          ‹
        </button>
      )}

      {/* TOMBOL NAVIGASI NEXT SLIDE */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={handleNext}
          aria-label="Slide berikutnya"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/60"
        >
          ›
        </button>
      )}

      {/* GRID KARTU SKILLS (MAKSIMAL 6 PER SLIDE) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4"
        >
          {currentSkills.map((cat, index) => (
            <div
              key={cat.id || index}
              className="flex flex-col justify-between p-4 sm:p-4.5 rounded-2xl bg-white/40 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/70 dark:border-white/20 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] hover:bg-white/50 transition-all duration-300 text-left min-h-[140px]"
            >
              <div>
                {/* JUDUL KATEGORI */}
                <h4 className="text-sm sm:text-base font-black text-blue-950 dark:text-white leading-tight mb-1.5">
                  {cat.category}
                </h4>

                {/* DESKRIPSI KATEGORI */}
                <p className="text-[11px] sm:text-xs text-slate-700 dark:text-slate-200 font-medium leading-relaxed mb-3 line-clamp-3">
                  {cat.description}
                </p>
              </div>

              {/* BADGES SKILL / TECH STACK */}
              <div className="flex flex-wrap gap-1 pt-2 border-t border-white/40 dark:border-white/10">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-lg bg-white/60 dark:bg-white/15 border border-white/80 dark:border-white/20 text-blue-950 dark:text-white font-extrabold text-[10px] backdrop-blur-md shadow-2xs cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* INDIKATOR PAGINATION DOTS (TAMPIL JIKA PAGE > 1) */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Ke slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === idx
                  ? "w-6 bg-white dark:bg-indigo-500 shadow-sm"
                  : "w-2 bg-white/40 dark:bg-white/20 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
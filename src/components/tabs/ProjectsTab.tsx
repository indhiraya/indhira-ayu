"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projectsData from "@/data/projects.json";

interface ProjectItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDetails: string;
  features?: string[];
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
}

const PROJECTS: ProjectItem[] = projectsData as ProjectItem[];
// DIBUAT 4 PROYEK PER SLIDE AGAR TAMPILAN TIDAK TERLALU TINGGI/PANJANG
const ITEMS_PER_PAGE = 4;

export default function ProjectsTab() {
  const [selectedProjIndex, setSelectedProjIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const currentProjects = PROJECTS.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const selectedProj = selectedProjIndex !== null ? PROJECTS[selectedProjIndex] : null;

  useEffect(() => {
    if (selectedProjIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProjIndex]);

  const handleNavigateModal = (dir: "prev" | "next") => {
    if (selectedProjIndex === null) return;
    if (dir === "prev" && selectedProjIndex > 0) {
      setSelectedProjIndex(selectedProjIndex - 1);
    } else if (dir === "next" && selectedProjIndex < PROJECTS.length - 1) {
      setSelectedProjIndex(selectedProjIndex + 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="w-full relative flex flex-col justify-between min-h-[320px] py-1 select-none">
      
      {/* TOMBOL NAVIGASI SLIDE KIRI */}
      {currentPage > 0 && (
        <button
          onClick={handlePrevPage}
          aria-label="Slide sebelumnya"
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/60"
        >
          ‹
        </button>
      )}

      {/* TOMBOL NAVIGASI SLIDE KANAN */}
      {currentPage < totalPages - 1 && (
        <button
          onClick={handleNextPage}
          aria-label="Slide berikutnya"
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-blue-900 shadow-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer hover:scale-110 active:scale-95 border border-white/60"
        >
          ›
        </button>
      )}

      {/* GRID KARTU PROYEK (2 KANAN & 2 KIRI) */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
        >
          {currentProjects.map((proj, idx) => {
            const globalIndex = startIndex + idx;
            const isSelected = selectedProjIndex === globalIndex;

            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProjIndex(globalIndex)}
                className={`flex flex-col justify-between p-5 rounded-3xl min-h-[140px] transition-all duration-300 cursor-pointer backdrop-blur-2xl border text-left ${
                  isSelected
                    ? "bg-white/50 dark:bg-slate-900/70 border-white shadow-[0_8px_32px_rgba(255,255,255,0.3)] scale-[1.02] ring-2 ring-white"
                    : "bg-white/30 dark:bg-slate-900/40 border-white/60 dark:border-white/20 hover:bg-white/45 hover:scale-[1.01]"
                }`}
              >
                <div>
                  <h4 className="text-base sm:text-lg font-black text-blue-950 dark:text-white leading-tight mb-1.5 drop-shadow-xs">
                    {proj.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium leading-relaxed line-clamp-2 mb-3">
                    {proj.shortDescription}
                  </p>
                </div>

                {/* TECH STACK BADGES */}
                <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/40 dark:border-white/10">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-2.5 py-0.5 rounded-lg bg-white/60 dark:bg-white/15 border border-white/80 dark:border-white/20 text-blue-950 dark:text-white font-extrabold backdrop-blur-md shadow-2xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* INDIKATOR PAGINATION DOTS */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4 pt-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx)}
              aria-label={`Ke slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentPage === idx
                  ? "w-6 bg-white dark:bg-indigo-500 shadow-xs"
                  : "w-2 bg-white/40 dark:bg-white/20 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}

      {/* MODAL DETAIL PROYEK */}
      <AnimatePresence>
        {selectedProj && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop tipis */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/10 backdrop-blur-md cursor-pointer"
              onClick={() => setSelectedProjIndex(null)}
            />

            {/* KARTU DETAIL POP-UP */}
            <motion.div
              key={selectedProj.id}
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative z-10 w-full max-w-2xl max-h-[88vh] bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl rounded-3xl border border-white dark:border-white/20 shadow-[0_20px_50px_rgba(31,38,135,0.25)] flex flex-col overflow-hidden text-left"
            >
              {/* GRADIENT SHEEN */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/60 via-white/10 to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent" />
              <div className="pointer-events-none absolute -top-10 -left-10 w-40 h-40 bg-white/50 dark:bg-white/5 rounded-full blur-3xl" />

              {/* KONTEN */}
              <div className="relative z-10 flex flex-col h-full min-h-0">
                {/* HEADER */}
                <div className="p-5 sm:p-6 pb-3 shrink-0 pr-14 relative">
                  <span className="inline-block px-3 py-0.5 rounded-full bg-blue-950/10 dark:bg-white/10 text-blue-950 dark:text-white text-[10px] font-extrabold border border-blue-950/20 dark:border-white/20 mb-1.5 shadow-xs">
                    🚀 Featured Project
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-blue-950 dark:text-white leading-tight">
                    {selectedProj.title}
                  </h3>

                  <button
                    onClick={() => setSelectedProjIndex(null)}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-white/80 hover:bg-white dark:bg-white/10 dark:hover:bg-white/20 text-blue-950 dark:text-white text-xs font-bold flex items-center justify-center backdrop-blur-md border border-white/90 dark:border-white/20 transition-all cursor-pointer shadow-xs"
                  >
                    ✕
                  </button>
                </div>

                {/* BODY SCROLLABLE */}
                <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-3 space-y-3 custom-scrollbar">
                  <p className="text-sm text-blue-950/90 dark:text-slate-100 font-medium leading-relaxed">
                    {selectedProj.fullDetails}
                  </p>

                  {selectedProj.features && selectedProj.features.length > 0 && (
                    <div className="pt-3 border-t border-blue-950/15 dark:border-white/10 space-y-1.5">
                      <p className="text-[11px] font-black text-blue-900 dark:text-blue-200 uppercase tracking-wider">
                        Key Features:
                      </p>
                      {selectedProj.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-sm text-blue-950 dark:text-slate-200 font-medium leading-snug">
                          <span className="text-blue-700 dark:text-blue-300 font-bold">•</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* TECH STACK BADGES */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {selectedProj.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-0.5 rounded-md bg-blue-950/10 dark:bg-white/15 text-blue-950 dark:text-white font-extrabold border border-blue-950/15 dark:border-white/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex flex-wrap justify-between items-center p-5 sm:p-6 pt-3 border-t border-blue-950/15 dark:border-white/20 gap-2 shrink-0">
                  {/* Navigasi Prev/Next Modal */}
                  <div className="flex items-center gap-1.5">
                    <button
                      disabled={selectedProjIndex === 0}
                      onClick={() => handleNavigateModal("prev")}
                      className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/10 text-blue-950 dark:text-white font-extrabold text-[11px] border border-white/90 dark:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all cursor-pointer shadow-xs"
                    >
                      ‹ Prev
                    </button>
                    <span className="text-[10px] font-bold text-blue-950/70 dark:text-white/80">
                      {(selectedProjIndex ?? 0) + 1}/{PROJECTS.length}
                    </span>
                    <button
                      disabled={selectedProjIndex === PROJECTS.length - 1}
                      onClick={() => handleNavigateModal("next")}
                      className="px-2.5 py-1 rounded-full bg-white/70 dark:bg-white/10 text-blue-950 dark:text-white font-extrabold text-[11px] border border-white/90 dark:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white transition-all cursor-pointer shadow-xs"
                    >
                      Next ›
                    </button>
                  </div>

                  {/* Action Buttons (GitHub & Demo) */}
                  <div className="flex items-center gap-2">
                    {selectedProj.githubUrl && (
                      <a
                        href={selectedProj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-black transition-all shadow-xs"
                      >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}

                    {selectedProj.demoUrl && (
                      <a
                        href={selectedProj.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 transition-all shadow-xs"
                      >
                        🌐 Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

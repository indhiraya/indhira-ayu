"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

type NavLink = { name: string; href: string; tab?: string };

export default function Navbar({ isDarkMode, onToggleTheme }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset Inactivity Timer (Tutup otomatis jika idle 5 detik)
  const resetInactivityTimer = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 5000);
  };

  // Sembunyikan otomatis saat pengguna scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Timer inaktivitas saat navbar terbuka
  useEffect(() => {
    if (isOpen) {
      resetInactivityTimer();
    } else if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { name: "About", href: "#hero" },
    { name: "Experience", href: "#experience", tab: "experience" },
    { name: "Projects", href: "#experience", tab: "projects" },
    { name: "Contact", href: "#contact" },
  ];

  // Untuk link yang punya "tab": scroll ke section 2 lalu buka tab tersebut
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, tab?: string) => {
    setIsOpen(false);
    if (tab) {
      e.preventDefault();
      document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("open-tab", { detail: tab }));
    }
  };

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center select-none">
      <motion.nav
        layout
        onMouseMove={resetInactivityTimer}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        /* DIBUAT TERANG & BENING: bg-white/30 dengan border-white/60 dan shadow kaca halus */
        className="bg-white/30 dark:bg-white/20 backdrop-blur-xl border border-white/60 dark:border-white/40 shadow-[0_8px_32px_0_rgba(31,38,135,0.12)] rounded-full px-4 py-2 flex items-center gap-2 overflow-hidden"
      >
        {/* TOMBOL UTAMA: Hello, I'm Indhira */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-extrabold text-white drop-shadow-sm hover:bg-white/25 transition-all cursor-pointer shrink-0"
        >
          <span>Hello, I'm Indhira</span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-xs text-white/90"
          >
            ▼
          </motion.span>
        </button>

        {/* MENU LENGKAP (Muncul saat diklik) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center gap-4 sm:gap-6 pl-3 border-l border-white/40 whitespace-nowrap overflow-hidden"
            >
              {/* Tautan Navigasi */}
              <div className="flex items-center gap-3 sm:gap-5">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.tab)}
                    className="text-xs sm:text-sm font-bold text-white drop-shadow-sm hover:text-blue-100 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>

              {/* Tombol Toggle Dark/Light Mode */}
              <button
                onClick={onToggleTheme}
                aria-label="Toggle Theme"
                className="p-2 rounded-full bg-white/30 hover:bg-white/40 text-white transition-all backdrop-blur-md shrink-0 border border-white/40 shadow-sm"
              >
                {isDarkMode ? "🌙" : "☀️"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  );
}
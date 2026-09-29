"use client";

export default function GrassGround() {
  return (
    <div className="w-full relative z-20 overflow-hidden leading-none">
      {/* Vektor Rumput Tipis */}
      <svg
        viewBox="0 0 1200 80"
        preserveAspectRatio="none"
        className="block w-full h-8 sm:h-14 md:h-20"
      >
        <defs>
          <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="hillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>

        <path d="M0,45 Q300,20 600,40 T1200,25 L1200,80 L0,80 Z" fill="url(#hillGrad)" opacity="0.75" />
        <path d="M0,55 Q250,30 500,50 T1000,38 Q1100,48 1200,42 L1200,80 L0,80 Z" fill="url(#grassGrad)" />
      </svg>

      {/* Lapisan Cokelat Tanah dengan Teks Ditengah (Tanpa Link Sosmed) */}
      <footer className="bg-[#654321] text-amber-100/90 py-5 px-4 text-center border-t border-[#4A3018]">
        <p className="text-xs sm:text-sm font-medium tracking-wide">
          © {new Date().getFullYear()} Indhira. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
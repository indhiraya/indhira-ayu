"use client";
import { motion } from "framer-motion";

// Daftar 5 Burung Pembawa Logo Sosial Media
const SOCIAL_BIRDS = [
  // Baris Atas (3 Burung)
  {
    name: "GitHub",
    url: "https://github.com/indhiraya",
    badgeBg: "bg-slate-800 text-white",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/indhiraya/",
    badgeBg: "bg-blue-600 text-white",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/indhira.ya/",
    badgeBg: "bg-gradient-to-tr from-pink-500 via-red-500 to-amber-500 text-white",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  // Baris Bawah (2 Burung)
  {
    name: "Blogspot",
    url: "https://www.blogger.com/profile/08974373557134509298",
    badgeBg: "bg-orange-500 text-white",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19.96 8.23c-.35-.35-.83-.55-1.33-.55H16.5V5.5c0-1.38-1.12-2.5-2.5-2.5H7.5C6.12 3 5 4.12 5 5.5v13C5 19.88 6.12 21 7.5 21h9c1.38 0 2.5-1.12 2.5-2.5v-3.83c.5 0 .98-.2 1.33-.55.72-.72.72-1.89.01-2.61l-.38-.38c.36-.36.56-.84.56-1.35 0-.52-.2-1.01-.56-1.37l-.01.02zM10.5 7.5h3c.55 0 1 .45 1 1s-.45 1-1 1h-3c-.55 0-1-.45-1-1s.45-1 1-1zm4.5 9h-6c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm1-3h-7c-.55 0-1-.45-1-1s.45-1 1-1h7c.55 0 1 .45 1 1s-.45 1-1 1z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:indhira.apn@gmail.com",
    badgeBg: "bg-sky-500 text-white",
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
      </svg>
    ),
  },
];

export default function BirdSocials() {
  const topRow = SOCIAL_BIRDS.slice(0, 3);    // 3 Burung di Atas
  const bottomRow = SOCIAL_BIRDS.slice(3, 5); // 2 Burung di Bawah

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto py-4 select-none">

      {/* KALIMAT GET IN TOUCH DENGAN GLASSMORPHISM */}
      <div className="w-full text-center p-6 rounded-3xl bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/40 shadow-xl mb-8">
        <h3 className="text-xl sm:text-2xl font-extrabold text-white drop-shadow-md leading-snug">
          Get in Touch with Me, and Let's Build Something Amazing Together.
        </h3>
      </div>

      {/* CONTAINER BURUNG BERLAYANG (GRID SUSUNAN 3 ATAS & 2 BAWAH) */}
      <div className="flex flex-col items-center gap-6 w-full relative">

        {/* BARIS ATAS: 3 BURUNG BERJEJER */}
        <div className="flex items-center justify-center gap-6 sm:gap-10 w-full relative z-20">
          {topRow.map((bird, index) => (
            <SingleBird key={bird.name} bird={bird} delay={index * 0.4} />
          ))}
        </div>

        {/* BARIS BAWAH: 2 BURUNG BERJEJER */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 w-full relative z-20">
          {bottomRow.map((bird, index) => (
            <SingleBird key={bird.name} bird={bird} delay={(index + 3) * 0.4} />
          ))}
        </div>

      </div>
    </div>
  );
}

// Sub-komponen Burung Vektor Beranimasi Terbang
function SingleBird({
  bird,
  delay,
}: {
  bird: (typeof SOCIAL_BIRDS)[0];
  delay: number;
}) {
  const isEmail = bird.name === "Email";
  // Ambil alamat email dari URL 'mailto:...'
  const emailAddress = isEmail ? bird.url.replace("mailto:", "") : "";

  return (
    <motion.a
      href={bird.url}
      target={isEmail ? "_self" : "_blank"} // Email jangan buka tab baru
      rel="noreferrer"
      aria-label={bird.name}
      // Animasi Terbang Naik-Turun (Flying Motion)
      animate={{
        y: [0, -12, 4, 0],
        rotate: [0, -2, 2, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      whileHover={{ scale: 1.15 }}
      className="flex flex-col items-center cursor-pointer group relative"
    >
      {/* VEKTOR BURUNG DENGAN LOGO DI PARUH / BADAN */}
      <div className="relative flex flex-col items-center">
        {/* Vektor Burung — bentuk lebih natural: badan oval menyatu, ekor bercabang, paruh & mata proporsional */}
        <svg
          className="w-14 h-12 drop-shadow-md overflow-visible"
          viewBox="0 0 64 64"
        >
          {/* Ekor bercabang (dua bulu bertumpuk) */}
          <path d="M15 30 L2 22 L11 33 Z" fill="#F1F5F9" />
          <path d="M15 34 L4 41 L13 37 Z" fill="#E2E8F0" />

          {/* Badan — satu kurva oval memanjang menyatu ke kepala */}
          <path
            d="M14 32 C15 17 34 10 49 19 C55 23 59 28 57 32 C55 37 47 39.5 38 39.5 C25 39.5 16 38.5 14 32 Z"
            fill="#FFFFFF"
          />

          {/* Sayap dengan animasi kepakan */}
          <motion.path
            d="M27 29 C20 12 39 4 45 21 Z"
            fill="#CBD5E1"
            animate={{
              d: [
                "M27 29 C20 12 39 4 45 21 Z",
                "M27 29 C20 3 41 -5 47 19 Z",
                "M27 29 C20 12 39 4 45 21 Z",
              ],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Detail bulu dada tipis */}
          <path
            d="M20 34 Q26 37 32 34"
            stroke="#CBD5E1"
            strokeWidth="1.2"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />

          {/* Paruh */}
          <path d="M51 23 L61 26.5 L51 29 Z" fill="#F59E0B" />

          {/* Mata dengan highlight */}
          <circle cx="44" cy="21" r="2.3" fill="#1E293B" />
          <circle cx="44.7" cy="20.3" r="0.6" fill="#FFFFFF" />
        </svg>

        {/* LOGO SOSIAL MEDIA YANG DIBAWA BURUNG (Gantung di bawah burung) */}
        <div className="flex flex-col items-center -mt-1 z-10">
          {/* Tali Pengikat Bening */}
          <div className="w-[1.5px] h-3 bg-white/70" />

          {/* Lencana Logo Sosmed */}
          <div
            className={`p-2.5 rounded-2xl ${bird.badgeBg} shadow-lg border border-white/40 flex items-center justify-center transition-transform group-hover:scale-110 backdrop-blur-md`}
          >
            {bird.icon}
          </div>
        </div>
      </div>

      {/* TOOLTIP LABEL SAAT HOVER (PENYESUAIAN KHUSUS EMAIL) */}
      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-900/90 dark:bg-black/90 text-white text-[11px] font-bold px-3 py-1 rounded-full mt-2 backdrop-blur-md border border-white/20 whitespace-nowrap shadow-xl z-50 absolute -bottom-8">
        {isEmail ? `email: ${emailAddress}` : bird.name}
      </span>
    </motion.a>
  );
}
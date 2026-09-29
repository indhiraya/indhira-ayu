"use client";
import { useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import SkyBackground from "@/components/SkyBackground";
import LanyardCard from "@/components/LanyardCard";
import ExperienceCard from "@/components/ExperienceCard";
import GrassGround from "@/components/GrassGround";
import BirdSocials from "@/components/BirdSocials";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Notifikasi "Portfolio belum tersedia"
  const [showPortfolioNotice, setShowPortfolioNotice] = useState(false);
  const noticeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePortfolioClick = () => {
    setShowPortfolioNotice(true);
    if (noticeTimerRef.current) clearTimeout(noticeTimerRef.current);
    noticeTimerRef.current = setTimeout(() => setShowPortfolioNotice(false), 4000);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    const formData = new FormData(e.currentTarget);
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "";
    formData.append("access_key", accessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSubmitStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-screen">
      <Navbar isDarkMode={isDarkMode} onToggleTheme={toggleTheme} />
      <SkyBackground containerRef={containerRef} isDarkMode={isDarkMode} />

      <main className="relative z-10 text-slate-800 dark:text-slate-100">
        {/* Section 1: Hero */}
        <section id="hero" className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 pt-24 pb-12">
          <div className="max-w-6xl w-full bg-white/20 dark:bg-white/10 backdrop-blur-xl border border-white/40 rounded-3xl p-8 sm:p-12 shadow-[0_16px_40px_0_rgba(31,38,135,0.15)] my-auto overflow-visible relative transition-all">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
              
              <div className="md:col-span-7 text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/40 mb-5 backdrop-blur-md shadow-sm">
                  Bridging Business & Technology
                </span>
                
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
                  Indhira Ayu Puspita Ningrum
                </h1>
                
                <p className="mt-5 text-base sm:text-lg text-white/90 font-medium leading-relaxed drop-shadow-sm">
                  Informatics Engineering student at ITS with hands-on experience in web development and machine learning through academic and internship projects. Active in student organizations and tutoring. A curious learner who enjoys exploring new things, with strong critical thinking, creativity, and problem-solving skills. Always eager to turn ideas into digital solutions.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="https://drive.google.com/file/d/1T5RpMGpqNAlI5DPVB7HlJNCJesR0ePXP/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 sm:py-3.5 bg-white/90 hover:bg-white text-blue-900 font-bold text-sm sm:text-base rounded-full shadow-md transition-all hover:scale-105"
                  >
                    Curriculum Vitae
                  </a>
                  <button
                    type="button"
                    onClick={handlePortfolioClick}
                    className="px-7 py-3 sm:py-3.5 bg-white/20 hover:bg-white/30 text-white font-semibold text-sm sm:text-base rounded-full border border-white/40 shadow-sm transition-all hover:scale-105 backdrop-blur-md cursor-pointer"
                  >
                    My Portfolio
                  </button>
                </div>

                {showPortfolioNotice && (
                  <p
                    role="status"
                    className="mt-4 inline-block px-4 py-2 rounded-xl bg-white/25 text-white text-sm font-semibold border border-white/40 backdrop-blur-md shadow-sm"
                  >
                    My portfolio is not available yet. Please check back soon!
                  </p>
                )}
              </div>

              <div className="md:col-span-5 flex justify-center items-center overflow-visible">
                <LanyardCard />
              </div>

            </div>
          </div>
        </section>

        {/* Section 2: Experience & Projects */}
        <section id="experience" className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 py-20 z-10">
          <h2 className="sr-only">Experience, Organization, Projects, and Skills</h2>
          <ExperienceCard />
        </section>

        {/* Section 3: Contact & Ground */}
        <section id="contact" className="relative flex min-h-screen flex-col justify-between pt-20">
          <div className="max-w-6xl w-full mx-auto px-4 sm:px-8 my-auto z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
              
              {/* KIRI: Burung Pembawa Logo Sosmed */}
              <div className="lg:col-span-6 flex items-center justify-center overflow-visible">
                <BirdSocials />
              </div>

              {/* KANAN: Card Message Form High-Contrast Glassmorphism */}
              <div className="lg:col-span-6">
                <form
                  onSubmit={handleSubmit}
                  className="bg-white/40 dark:bg-slate-900/60 backdrop-blur-2xl border border-white/70 dark:border-white/20 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] text-left space-y-4"
                >
                  <h2 className="text-2xl sm:text-3xl font-black text-blue-950 dark:text-white drop-shadow-sm mb-1">
                    Send Me a Message
                  </h2>

                  {/* Notifikasi Status Pengiriman */}
                  {submitStatus === "success" && (
                    <div className="p-3 rounded-xl bg-emerald-600 text-white text-xs font-bold backdrop-blur-md border border-white/30 animate-fade-in shadow-sm">
                      ✅ Message sent successfully! Thank you for reaching out.
                    </div>
                  )}
                  {submitStatus === "error" && (
                    <div className="p-3 rounded-xl bg-rose-600 text-white text-xs font-bold backdrop-blur-md border border-white/30 animate-fade-in shadow-sm">
                      ❌ Failed to send message. Please try again later.
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-extrabold text-blue-950 dark:text-slate-100 mb-1.5 uppercase tracking-wider"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        placeholder="Your Name"
                        className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/20 border border-white/80 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500/80 dark:placeholder-white/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 backdrop-blur-md shadow-inner"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-xs font-extrabold text-blue-950 dark:text-slate-100 mb-1.5 uppercase tracking-wider"
                      >
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        placeholder="name@email.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/20 border border-white/80 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500/80 dark:placeholder-white/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 backdrop-blur-md shadow-inner"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-xs font-extrabold text-blue-950 dark:text-slate-100 mb-1.5 uppercase tracking-wider"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      placeholder="Message Subject"
                      className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/20 border border-white/80 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500/80 dark:placeholder-white/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 backdrop-blur-md shadow-inner"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-extrabold text-blue-950 dark:text-slate-100 mb-1.5 uppercase tracking-wider"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      name="message"
                      required
                      placeholder="Write your message here..."
                      className="w-full px-4 py-3 rounded-xl bg-white/60 dark:bg-black/20 border border-white/80 dark:border-white/20 text-slate-900 dark:text-white placeholder-slate-500/80 dark:placeholder-white/60 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-600 backdrop-blur-md resize-none shadow-inner"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-extrabold text-sm sm:text-base rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>

            </div>
          </div>

          <GrassGround />
        </section>
      </main>
    </div>
  );
}
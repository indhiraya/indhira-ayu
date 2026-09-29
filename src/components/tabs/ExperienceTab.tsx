"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import experiencesData from "@/data/experiences.json";

interface EventItem {
  title: string;
  period: string;
  description: string;
}

interface ExperienceItem {
  id: string;
  monthYear: string;
  events: EventItem[];
  techStack: string[];
}

const EXPERIENCES: ExperienceItem[] = experiencesData as ExperienceItem[];

const BUBBLE_SPACING = 170;
const TRACK_PADDING_X = 70;
const TRACK_HEIGHT = 300;

function getPositionedExperiences(items: ExperienceItem[]) {
  return items.map((item, i) => ({
    ...item,
    x: TRACK_PADDING_X + i * BUBBLE_SPACING,
    y: TRACK_HEIGHT / 2 + Math.sin(i * 1.3 + 0.4) * (TRACK_HEIGHT * 0.22),
    index: i,
  }));
}

type PositionedExperience = ReturnType<typeof getPositionedExperiences>[number];

function getSmoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function ExperienceTab() {
  const [isMounted, setIsMounted] = useState(false);
  const [selectedExp, setSelectedExp] = useState<PositionedExperience | null>(null);
  const [hoveredExp, setHoveredExp] = useState<PositionedExperience | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Mencegah Hydration Mismatch antara Server dan Client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const positioned = getPositionedExperiences(EXPERIENCES);
  const trackWidth = TRACK_PADDING_X * 2 + BUBBLE_SPACING * Math.max(positioned.length - 1, 0);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    updateScrollState();
    const onResize = () => updateScrollState();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [updateScrollState, selectedExp, isMounted]);

  const scrollToBubble = (item: PositionedExperience) => {
    if (!scrollRef.current) return;
    const targetScroll = item.x - scrollRef.current.clientWidth / 2;
    scrollRef.current.scrollTo({
      left: Math.max(0, targetScroll),
      behavior: "smooth",
    });
  };

  const handleNavigate = (dir: "prev" | "next") => {
    if (selectedExp) {
      const currentIndex = selectedExp.index;
      const newIndex = dir === "prev" ? currentIndex - 1 : currentIndex + 1;

      if (newIndex >= 0 && newIndex < positioned.length) {
        const nextExp = positioned[newIndex];
        setSelectedExp(nextExp);
        scrollToBubble(nextExp);
      }
    } else {
      scrollRef.current?.scrollBy({
        left: dir === "prev" ? -BUBBLE_SPACING * 2 : BUBBLE_SPACING * 2,
        behavior: "smooth",
      });
    }
  };

  const showPrevButton = selectedExp ? selectedExp.index > 0 : canScrollLeft;
  const showNextButton = selectedExp ? selectedExp.index < positioned.length - 1 : canScrollRight;

  if (!isMounted) return null; // Mencegah SSR merender versi yang tidak cocok dengan Client

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className={`w-full grid gap-6 items-center ${
        selectedExp ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"
      }`}
    >
      {/* TIMELINE CONTAINER */}
      <div className="relative w-full min-w-0 select-none">
        
        {showPrevButton && (
          <button
            onClick={() => handleNavigate("prev")}
            aria-label="Informasi sebelumnya"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white hover:bg-white text-blue-950 shadow-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer -translate-x-1/3 hover:scale-110 active:scale-95 border border-white"
          >
            ‹
          </button>
        )}

        {showNextButton && (
          <button
            onClick={() => handleNavigate("next")}
            aria-label="Informasi berikutnya"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-white hover:bg-white text-blue-950 shadow-lg flex items-center justify-center backdrop-blur-md transition-all cursor-pointer translate-x-1/3 hover:scale-110 active:scale-95 border border-white"
          >
            ›
          </button>
        )}

        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="w-full min-w-0 overflow-x-auto overflow-y-visible py-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-blue-900/40 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-white/20 [&::-webkit-scrollbar-track]:rounded-full"
          style={{ height: `${TRACK_HEIGHT}px` }}
        >
          <div
            className="relative h-full"
            style={{ width: `${trackWidth}px`, minWidth: "100%" }}
          >
            <svg
              className="absolute inset-0 pointer-events-none z-0"
              width={trackWidth}
              height={TRACK_HEIGHT}
              viewBox={`0 0 ${trackWidth} ${TRACK_HEIGHT}`}
            >
              <path
                d={getSmoothPath(positioned.map((exp) => ({ x: exp.x, y: exp.y })))}
                fill="none"
                stroke="rgba(30, 58, 138, 0.55)"
                strokeWidth="3"
                strokeDasharray="8 8"
              />
            </svg>

            {positioned.map((exp, index) => {
              const isSelected = selectedExp?.id === exp.id;
              const isHovered = hoveredExp?.id === exp.id;

              const isHighBubble = exp.y < TRACK_HEIGHT / 2;
              const isFirstBubble = index === 0;
              const isLastBubble = index === positioned.length - 1;

              let tooltipPositionClass = "bottom-full mb-3";
              let tooltipAlignClass = "left-1/2 -translate-x-1/2";

              if (isHighBubble) {
                tooltipPositionClass = "top-full mt-3";
              }

              if (isFirstBubble) {
                tooltipAlignClass = "left-0 translate-x-0";
              } else if (isLastBubble) {
                tooltipAlignClass = "right-0 translate-x-0";
              }

              return (
                <div
                  key={exp.id}
                  className="absolute flex flex-col items-center z-20"
                  style={{
                    left: `${exp.x}px`,
                    top: `${exp.y}px`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <AnimatePresence>
                    {isHovered && !selectedExp && (
                      <motion.div
                        initial={{ opacity: 0, y: isHighBubble ? -8 : 8, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: isHighBubble ? -8 : 8, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute ${tooltipPositionClass} ${tooltipAlignClass} w-56 p-3.5 rounded-2xl bg-slate-900 text-white backdrop-blur-xl border border-white/30 shadow-2xl z-50 pointer-events-none text-left`}
                      >
                        <p className="text-[10px] font-bold text-blue-300 uppercase tracking-wider mb-1.5 border-b border-white/20 pb-1">
                          📅 {exp.monthYear} Events
                        </p>
                        <ul className="space-y-1">
                          {exp.events.map((ev, i) => (
                            <li key={i} className="text-xs font-semibold text-white flex items-center gap-1.5">
                              <span className="text-blue-300 font-bold">•</span>
                              <span>{ev.title}</span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    onClick={() => {
                      if (isSelected) {
                        setSelectedExp(null);
                      } else {
                        setSelectedExp(exp);
                        scrollToBubble(exp);
                      }
                    }}
                    onMouseEnter={() => setHoveredExp(exp)}
                    onMouseLeave={() => setHoveredExp(null)}
                    className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center transition-all duration-300 cursor-pointer backdrop-blur-md shadow-lg border ${
                      isSelected
                        ? "bg-blue-900 text-white border-white scale-110 shadow-blue-900/50 ring-4 ring-white/60"
                        : "bg-white/85 text-blue-950 border-white hover:bg-white hover:scale-105"
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold opacity-80 pointer-events-none">
                      {exp.monthYear.split(" ")[0]}
                    </span>
                    <span className="text-xs font-extrabold pointer-events-none">
                      {exp.monthYear.split(" ")[1]}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CARD DETAIL EVENT */}
      <AnimatePresence>
        {selectedExp && (
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="w-full min-w-0 bg-white/85 backdrop-blur-2xl p-6 rounded-3xl border border-white shadow-[0_16px_40px_rgba(31,38,135,0.2)] flex flex-col justify-between h-[300px] relative overflow-hidden"
          >
            <button
              onClick={() => setSelectedExp(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-white hover:bg-blue-50 text-blue-950 text-xs font-bold flex items-center justify-center backdrop-blur-md border border-blue-950/20 transition-all cursor-pointer z-10 shadow-xs"
            >
              ✕
            </button>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-blue-950/10 text-blue-950 text-[11px] font-bold border border-blue-950/20 mb-2">
                🗓️ Experience starting in {selectedExp.monthYear}
              </span>
            </div>

            <div className="my-2 overflow-y-auto pr-2 space-y-3.5 max-h-[160px] custom-scrollbar">
              {selectedExp.events.map((ev, idx) => (
                <div key={idx} className="space-y-0.5 border-l-2 border-blue-950/25 pl-3 py-0.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-extrabold text-blue-950">
                      {idx + 1}. {ev.title}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950/10 text-blue-950 font-semibold border border-blue-950/15">
                      {ev.period}
                    </span>
                  </div>
                  <p className="text-xs text-blue-950/85 leading-relaxed mt-1">
                    {ev.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-blue-950/15">
              {selectedExp.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[10px] px-2.5 py-0.5 rounded-md bg-blue-950/10 text-blue-950 font-semibold border border-blue-950/15"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
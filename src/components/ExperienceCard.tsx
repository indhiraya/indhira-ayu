"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ExperienceTab from "./tabs/ExperienceTab";
import OrganizationTab from "./tabs/OrganizationTab";
import ProjectsTab from "./tabs/ProjectsTab";
import SkillsTab from "./tabs/SkillsTab";

type TabType = "experience" | "organization" | "projects" | "skills";

export default function ExperienceCard() {
  const [activeTab, setActiveTab] = useState<TabType>("experience");

  // Dengarkan permintaan dari Navbar untuk membuka tab tertentu
  useEffect(() => {
    const handleOpenTab = (e: Event) => {
      const tab = (e as CustomEvent<TabType>).detail;
      if (["experience", "organization", "projects", "skills"].includes(tab)) {
        setActiveTab(tab);
      }
    };
    window.addEventListener("open-tab", handleOpenTab);
    return () => window.removeEventListener("open-tab", handleOpenTab);
  }, []);

  const tabs: { id: TabType; label: string }[] = [
    { id: "experience", label: "Experience" },
    { id: "organization", label: "Organization" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
  ];

  return (
    <div className="max-w-6xl w-full bg-white/20 dark:bg-slate-900/40 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-[0_16px_40px_0_rgba(0,0,0,0.15)] my-auto overflow-visible relative transition-all duration-500">
      
      {/* NAVBAR BUBBLE SUB-NAVIGASI */}
      <div className="flex justify-center mb-6">
        <div className="flex items-center gap-1.5 p-1.5 bg-white/20 dark:bg-black/30 backdrop-blur-md rounded-full border border-white/30 dark:border-white/10 shadow-inner overflow-x-auto max-w-full z-20">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  isActive ? "text-blue-900 dark:text-white" : "text-white/80 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTabPill"
                    className="absolute inset-0 bg-white dark:bg-indigo-600 rounded-full shadow-md z-0"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* AREA KONTEN TAB */}
      <div className="min-h-[340px] flex items-center justify-center relative">
        <AnimatePresence mode="wait">
          {activeTab === "experience" && <ExperienceTab key="exp" />}
          {activeTab === "organization" && <OrganizationTab key="org" />}
          {activeTab === "projects" && <ProjectsTab key="proj" />}
          {activeTab === "skills" && <SkillsTab key="skill" />}
        </AnimatePresence>
      </div>
    </div>
  );
}
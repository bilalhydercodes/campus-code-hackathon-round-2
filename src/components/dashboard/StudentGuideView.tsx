"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getAssetUrl } from "@/lib/utils";
import { 
  Bookmark, 
  ChevronRight, 
  FileText, 
  Map, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  X,
  BookOpen
} from "lucide-react";

// The custom color slashes as seen in CampusCode brand identity
export const SlashesLogo = () => (
  <div className="flex items-center gap-1 select-none">
    <div className="h-5 w-1.5 -skew-x-12 bg-[#111111]" />
    <div className="h-5 w-1.5 -skew-x-12 bg-[#7665FF]" />
    <div className="h-5 w-1.5 -skew-x-12 bg-[#A8E62E]" />
  </div>
);

// Content mapped from the ELP / CAMPUSCODE GUIDE
export const guidePages = [
  {
    id: "playbook",
    title: "Your Playbook",
    chapterNum: 1,
    chapterTag: "CHAPTER 1 • YOUR PLAYBOOK",
    icon: <Map className="h-4 w-4" />,
    content: (
      <div className="space-y-4">
        <div>
          <span className="inline-block rounded-full bg-purple-100 border border-purple-200/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-purple-700 tracking-wider uppercase mb-1">
            CHAPTER 1 • YOUR PLAYBOOK
          </span>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight font-inter">Your Playbook</h2>
          <p className="text-[11px] font-mono font-bold tracking-widest text-[#7665FF] uppercase mt-0.5">
            JOIN. BUILD. SUBMIT. ADVANCE.
          </p>
          <p className="mt-2 text-xs text-gray-600 leading-relaxed">
            Follow the journey in order. Your dashboard and round pages will tell you what is currently available.
          </p>
        </div>

        {/* Step timeline (01 to 07) */}
        <div className="space-y-3.5 max-h-[330px] overflow-y-auto pr-2 custom-scrollbar">
          {[
            { step: "01", title: "GET STARTED", desc: "Use your Dashboard to see your current activity, notifications and available hackathons." },
            { step: "02", title: "JOIN A HACKATHON", desc: "Open Hackathons, review the event information and use JOIN HACKATHON when you are eligible." },
            { step: "03", title: "BUILD YOUR TEAM", desc: "After joining, open My Team to create a team or use HackMate AI to discover compatible participants." },
            { step: "04", title: "SUBMIT YOUR IDEA", desc: "When Round 1 is live, your team submits its problem statement. A Participant Agreement appears before the official submission." },
            { step: "05", title: "ROUND 1 → ROUND 3", desc: "Watch the round status in each workspace. A later round can remain locked until the organizer workflow opens it for your team." },
            { step: "06", title: "CHECK RESULTS", desc: "Use Results and Leaderboard to view published outcomes, scores and available organizer feedback." },
            { step: "07", title: "USE AI RESPONSIBLY", desc: "IdeaCheck helps you review an idea. RuleBot helps with hackathon rules. Always treat the organizer's official instructions as authoritative." },
          ].map((item) => (
            <div key={item.step} className="flex gap-3.5 items-start border-l-2 border-[#7665FF]/20 pl-3.5 hover:border-[#7665FF] transition-colors group">
              <span className="font-mono text-base font-black text-[#7665FF] shrink-0 mt-0.5">{item.step}</span>
              <div>
                <h4 className="font-inter font-bold text-gray-950 text-xs tracking-wide">{item.title}</h4>
                <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "dos-donts",
    title: "Do's & Don'ts",
    chapterNum: 2,
    chapterTag: "CHAPTER 2 • WHAT TO DO & AVOID",
    icon: <CheckCircle2 className="h-4 w-4" />,
    content: (
      <div className="space-y-4">
        <div>
          <span className="inline-block rounded-full bg-purple-100 border border-purple-200/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-purple-700 tracking-wider uppercase mb-1">
            CHAPTER 2 • WHAT TO DO & AVOID
          </span>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight font-inter">What to Do & Avoid</h2>
          <p className="text-[11px] font-mono font-bold tracking-widest text-[#7665FF] uppercase mt-0.5">
            ENSURE COMPLIANCE & EXCELLENCE
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[330px] overflow-y-auto pr-2 custom-scrollbar">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-3.5 space-y-2">
            <h4 className="font-inter font-bold text-emerald-700 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" /> What to Do
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Read hackathon details before joining.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Create or join the correct team for the hackathon.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Check your round status before preparing a submission.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Keep your project information accurate and consistent.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Read official announcements and deadlines.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Use IdeaCheck and RuleBot as supporting tools.</span>
              </li>
            </ul>
          </div>

          <div className="bg-red-50/50 border border-red-100 rounded-xl p-3.5 space-y-2">
            <h4 className="font-inter font-bold text-red-700 text-xs tracking-wider uppercase flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-red-600" /> What Not to Do
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Do not submit copied or unauthorized work.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Do not share account credentials with other people.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Do not wait until the last moment to check a round.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Do not treat AI output as an official organizer decision.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Do not ignore organizer announcements.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-red-500 font-bold">•</span>
                <span>Do not submit to the wrong hackathon or team.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "faq",
    title: "Common Questions",
    chapterNum: 3,
    chapterTag: "CHAPTER 3 • COMMON QUESTIONS",
    icon: <HelpCircle className="h-4 w-4" />,
    content: (
      <div className="space-y-4">
        <div>
          <span className="inline-block rounded-full bg-purple-100 border border-purple-200/80 px-2.5 py-0.5 text-[10px] font-mono font-bold text-purple-700 tracking-wider uppercase mb-1">
            CHAPTER 3 • COMMON QUESTIONS
          </span>
          <h2 className="text-2xl font-black text-gray-950 tracking-tight font-inter">FAQ</h2>
          <p className="text-[11px] font-mono font-bold text-[#7665FF] tracking-wider uppercase mt-0.5">
            FREQUENTLY ASKED QUESTIONS
          </p>
        </div>

        <div className="space-y-3 max-h-[330px] overflow-y-auto pr-2 custom-scrollbar">
          {[
            { q: "Can I submit Round 1 without a team?", a: "No. The current StudentPanel requires you to be part of a team before Round 1 submission." },
            { q: "Why is my round locked?", a: "A later round can remain locked until the organizer workflow opens it for your team. Watch the round status in each workspace." },
            { q: "Where should I look for official communication?", a: "Check alerts, Announcements, and your Dashboard for all official updates from organizers." },
            { q: "Can RuleBot replace organizer instructions?", a: "No. RuleBot and IdeaCheck are for support. Original organizer details always apply as authoritative." }
          ].map((item, idx) => (
            <div key={idx} className="border border-gray-200/70 bg-white p-3.5 rounded-xl shadow-2xs space-y-1.5">
              <h4 className="font-inter font-bold text-gray-950 text-xs flex items-center gap-1.5">
                <span className="text-[#7665FF] font-mono">Q:</span>
                <span>{item.q}</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed bg-[#F7F7F4] p-2.5 rounded-lg border border-gray-100">
                {item.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export function StudentGuideBook() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const handlePageChange = (index: number) => {
    if (index === currentPageIndex) return;
    setDirection(index > currentPageIndex ? 1 : -1);
    setCurrentPageIndex(index);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-2 sm:p-4 flex flex-col gap-6 select-none">
      {/* Dynamic Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#7665FF]/10 text-[#7665FF] border border-[#7665FF]/20 shadow-xs">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <h1 className="font-inter text-2xl sm:text-3xl font-bold tracking-tight text-gray-900">Student Guide</h1>
            <p className="text-xs sm:text-sm text-gray-500">Everything you need to navigate CampusCode</p>
          </div>
        </div>

        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-full text-xs font-semibold text-gray-700 shadow-xs transition-all cursor-pointer"
          >
            <X className="h-4 w-4" /> Close Playbook
          </button>
        )}
      </div>

      {/* Main Viewport */}
      <div 
        className="relative w-full flex justify-center items-center py-6 sm:py-8"
        style={{ perspective: "2200px" }}
      >
        {!isOpen ? (
          /* ============================================================ */
          /* CLOSED STATE: The Exact 3D Hardcover Book Object              */
          /* Uses exact uploaded asset with zero-G float & hover tilt     */
          /* ============================================================ */
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.025, rotate: -1.2, y: -12 }}
            onClick={() => setIsOpen(true)}
            className="group relative cursor-pointer select-none"
            title="Click to Open Playbook"
          >
            {/* Ground Ambient Drop Shadow */}
            <div className="absolute -bottom-8 left-8 right-8 h-12 rounded-[50%] bg-black/35 blur-2xl group-hover:scale-105 group-hover:opacity-75 transition-all duration-300" />

            {/* The Hardcover Book Graphic with instant inline blur backdrop */}
            <div 
              className="relative w-[300px] sm:w-[350px] md:w-[380px] aspect-[764/1024] rounded-[22px] sm:rounded-[26px] overflow-hidden drop-shadow-[0_25px_35px_rgba(0,0,0,0.35)] transition-all duration-300 bg-[#18191E]"
              style={{
                backgroundImage: 'url("data:image/jpeg;base64,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")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <img
                src={getAssetUrl('assets/student-playbook-cover.jpg')}
                alt="CampusCode Student Playbook - Click to Open"
                className="w-full h-full object-cover block select-none"
                width={380}
                height={510}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                draggable={false}
              />

              {/* Specular sheen on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>
        ) : (
          /* ============================================================ */
          /* OPENED STATE: Flat 2D Symmetrical Open Book Spread            */
          /* Matches open layout description: Left TOC & Right Content    */
          /* ============================================================ */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            {/* The 2D Open Book Container with Stacked Page Layers */}
            <div className="relative flex flex-col md:flex-row min-h-[580px] w-full rounded-2xl bg-[#FCF9F2] shadow-2xl border border-amber-950/15 overflow-hidden">
              
              {/* Stacked Page Layers Edging Effect (Bottom & Left/Right) */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-2xl border-[3px] border-[#EADCC7]/70"
                style={{
                  boxShadow: "inset 0 0 0 2px #EADCC7, inset 0 0 10px rgba(0,0,0,0.05)"
                }}
              />

              {/* Shaded Spine Crease running vertically down the exact center */}
              <div 
                className="hidden md:block absolute left-[35%] top-0 bottom-0 w-10 -ml-5 z-20 pointer-events-none"
                style={{
                  background: "linear-gradient(to right, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.02) 100%)",
                  boxShadow: "inset 0 0 4px rgba(0,0,0,0.08)"
                }}
              />

              {/* LEFT PAGE: Chapters (TOC) */}
              <div className="w-full md:w-[35%] h-full bg-[#FCF9F2] p-6 sm:p-7 md:pr-5 border-b md:border-b-0 md:border-r border-amber-950/10 flex flex-col justify-between relative z-10">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-bold text-gray-700 flex items-center gap-2 uppercase tracking-wider font-inter">
                      <Bookmark className="h-4 w-4 text-[#7665FF]" /> Chapters
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 font-bold">INDEX</span>
                  </div>
                  
                  <nav className="space-y-2">
                    {guidePages.map((page, idx) => {
                      const isCurrent = idx === currentPageIndex;
                      return (
                        <button
                          key={page.id}
                          type="button"
                          onClick={() => handlePageChange(idx)}
                          className={cn(
                            "flex items-center justify-between w-full p-3 rounded-xl text-left text-xs transition-all cursor-pointer",
                            isCurrent 
                              ? "bg-white shadow-xs border border-purple-200 text-[#7665FF] font-bold" 
                              : "hover:bg-amber-950/5 text-gray-600 hover:text-gray-900 font-medium"
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className={isCurrent ? "text-[#7665FF]" : "text-gray-400"}>
                              {page.icon}
                            </span>
                            <span>{page.title}</span>
                          </div>
                          {isCurrent && <ChevronRight className="h-3.5 w-3.5 text-[#7665FF]" />}
                        </button>
                      );
                    })}
                  </nav>
                </div>

                {/* Base Metadata Left */}
                <div className="flex items-center justify-between border-t border-amber-950/10 pt-4 text-[10px] text-gray-400 font-mono font-bold mt-6">
                  <span>CAMPUSCODE GUIDE</span>
                  <span>Page 1 of 5</span>
                </div>
              </div>

              {/* RIGHT PAGE: Content Spread & Page Flip */}
              <div className="flex-1 h-full bg-[#FCF9F2] relative flex flex-col justify-between p-6 sm:p-8 md:pl-9 z-10">
                <div className="flex-1 relative overflow-hidden min-h-[460px]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentPageIndex}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction > 0 ? -20 : 20 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="absolute inset-0 flex flex-col"
                    >
                      {guidePages[currentPageIndex].content}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Base Metadata Right */}
                <div className="flex items-center justify-between border-t border-amber-950/10 pt-4 text-[10px] text-gray-400 font-mono font-bold mt-6">
                  <span>CAMPUSCODE GUIDE</span>
                  <span>Page {currentPageIndex + 2}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default StudentGuideBook;

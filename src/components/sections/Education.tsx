import React, { useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { useInViewOnce } from "../../hooks/useInViewOnce";
import { SectionHeader } from "../common/SectionHeader";

const PANEL_ID = "education-panel";

export const Education: React.FC = () => {
  const items = portfolioData.education;
  const [folderRef, visible] = useInViewOnce<HTMLDivElement>(0.25);
  const [activeId, setActiveId] = useState(items[0].id);
  const activeIdx = Math.max(0, items.findIndex((edu) => edu.id === activeId));
  const active = items[activeIdx];

  const onKeyDown = (e: React.KeyboardEvent, idx: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const step = e.key === "ArrowRight" ? 1 : -1;
    const next = items[(idx + step + items.length) % items.length];
    setActiveId(next.id);
    document.getElementById(`education-tab-${next.id}`)?.focus();
  };

  return (
    <section id="education" className="py-20 px-4 bg-ink-900">
      <div className="max-w-3xl mx-auto">
        <SectionHeader
          title="Education"
          subtitle="Academic background and achievements"
        />

        <div
          ref={folderRef}
          className={`transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div role="tablist" aria-label="Education" className="flex gap-1 pl-5 md:pl-8">
            {items.map((edu, idx) => {
              const selected = edu.id === activeId;
              return (
                <button
                  key={edu.id}
                  id={`education-tab-${edu.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={PANEL_ID}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(edu.id)}
                  onKeyDown={(e) => onKeyDown(e, idx)}
                  className={`folder-tab relative px-8 pt-3 pb-2.5 text-sm font-bold tracking-wider focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-emerald-400 ${
                    visible ? "folder-tab-in" : "opacity-0"
                  } ${
                    selected
                      ? "folder-surface text-emerald-400"
                      : "folder-surface--dim text-zinc-500 hover:text-zinc-300 translate-y-1 hover:translate-y-0"
                  }`}
                  style={{ animationDelay: `${350 + idx * 110}ms` }}
                >
                  {edu.tab}
                </button>
              );
            })}
          </div>

          <div className="folder-surface relative rounded-2xl rounded-tl-md px-4 md:px-8 pt-6 md:pt-8 overflow-hidden">
            <div
              key={active.id}
              id={PANEL_ID}
              role="tabpanel"
              aria-labelledby={`education-tab-${active.id}`}
              className={`relative bg-ink-800 rounded-t-xl px-6 md:px-10 pt-8 pb-24 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] ${
                visible ? "folder-paper" : "opacity-0"
              }`}
            >
              <p className="text-sm font-semibold text-emerald-400 mb-3">{active.duration}</p>

              <h3 className={`text-2xl md:text-3xl font-bold text-zinc-100 mb-3 ${active.cgpa ? "pr-28" : ""}`}>
                {active.degree}
              </h3>

              <p className="text-lg text-zinc-300">{active.institution}</p>

              <p className="text-zinc-500 flex items-center gap-2 mt-2">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {active.location}
              </p>

              {active.cgpa && (
                <div
                  className={`absolute top-6 right-5 md:right-8 flex flex-col items-center justify-center w-24 h-24 rounded-full border-2 border-dashed border-emerald-400 text-emerald-400 -rotate-12 ${
                    visible ? "folder-stamp" : ""
                  }`}
                >
                  <span className="text-[10px] font-bold tracking-[0.2em]">CGPA</span>
                  <span className="text-2xl font-extrabold leading-none mt-1">{active.cgpa}</span>
                </div>
              )}
            </div>

            <div
              aria-hidden
              className="folder-surface absolute inset-x-0 bottom-0 h-16 rounded-b-2xl flex items-center justify-between px-6 md:px-10 border-t border-emerald-500/30 shadow-[0_-8px_20px_rgba(0,0,0,0.12)]"
            >
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-400/80">
                Academic Record
              </span>
              <span className="text-xs font-semibold tabular-nums text-zinc-500">
                {String(activeIdx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

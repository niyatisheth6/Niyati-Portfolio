import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { SectionHeader } from "../common/SectionHeader";

const trackSpotlight = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

export const Experience: React.FC = () => {
  const timeline = useRef<HTMLDivElement>(null);
  const dots = useRef<(HTMLSpanElement | null)[]>([]);
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const [settled, setSettled] = useState(false);
  const shown = visible || reducedMotion;

  useEffect(() => {
    if (reducedMotion) return;
    const el = timeline.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  useEffect(() => {
    if (!visible) return;
    const jobs = portfolioData.experience;
    const lastCard = 160 + Math.max(0, jobs.length - 1) * 280;
    const longestList = jobs.reduce((max, job) => Math.max(max, job.responsibilities.length), 1);
    const settleMs = lastCard + 220 + (longestList - 1) * 45 + 700;
    const id = window.setTimeout(() => setSettled(true), settleMs);
    return () => window.clearTimeout(id);
  }, [visible]);

  useEffect(() => {
    if (reducedMotion) return;
    const el = timeline.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const progress = Math.min(1, Math.max(0, (anchor - rect.top) / rect.height));
      el.style.setProperty("--progress", progress.toFixed(4));
      dots.current.forEach((dot) => {
        if (!dot) return;
        const box = dot.getBoundingClientRect();
        dot.dataset.active = String(box.top + box.height / 2 <= anchor);
      });
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);

  return (
    <section id="experience" className="py-20 px-4 bg-ink-950">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          title="Experience"
          subtitle="My professional journey and achievements"
        />

        <div ref={timeline} className={`relative ${reducedMotion ? "" : "timeline-live"}`}>
          <div
            className={`absolute left-0 md:left-1/2 top-0 bottom-0 w-1 origin-top bg-emerald-500/30 md:-translate-x-1/2 transition-transform duration-1000 ease-out motion-reduce:transition-none ${
              shown ? "scale-y-100" : "scale-y-0"
            }`}
          />

          {!reducedMotion && (
            <>
              <div
                aria-hidden
                className={`timeline-fill absolute left-0 md:left-1/2 top-0 bottom-0 w-1 rounded-full md:-translate-x-1/2 transition-opacity duration-700 ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
              />
              <div
                aria-hidden
                className={`timeline-head absolute left-[2px] md:left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                  shown ? "opacity-100" : "opacity-0"
                }`}
              />
            </>
          )}

          <div className="space-y-8 md:space-y-12">
            {portfolioData.experience.map((exp, idx) => {
              const facesLine = idx % 2 === 0;
              const cardDelay = 160 + idx * 280;
              const revealDelay = shown && !settled && !reducedMotion ? cardDelay : 0;
              const cardMotion = shown
                ? "opacity-100 translate-x-0"
                : facesLine
                  ? "opacity-0 -translate-x-8"
                  : "opacity-0 -translate-x-8 md:translate-x-8";

              return (
                <div
                  key={exp.id}
                  className={`group relative md:grid md:grid-cols-2 md:gap-8 ${
                    facesLine ? "md:text-right" : ""
                  }`}
                >
                  <div className="absolute left-[2px] md:left-1/2 top-12 z-10 h-6 w-6 -translate-x-1/2 -translate-y-1/2">
                    {shown && !reducedMotion && (
                      <span
                        className="timeline-dot-ping absolute inset-0 rounded-full bg-emerald-400/50"
                        style={{ animationDelay: `${cardDelay + 40}ms` }}
                      />
                    )}
                    <span
                      ref={(node) => {
                        dots.current[idx] = node;
                      }}
                      className={`timeline-dot relative block w-6 h-6 rounded-full bg-emerald-500 border-4 border-ink-950 shadow-[0_0_14px_rgba(16,185,129,0.7)] transition-all duration-500 motion-reduce:transition-none group-hover:shadow-[0_0_22px_rgba(16,185,129,0.95)] ${
                        shown ? "scale-100 group-hover:scale-110" : "scale-0"
                      }`}
                      style={{ transitionDelay: revealDelay ? `${revealDelay + 40}ms` : "0ms" }}
                    />
                  </div>

                  <div className={`pl-10 ${facesLine ? "md:pl-0 md:pr-8" : "md:col-start-2 md:pl-8 md:pr-0"}`}>
                    <div
                      onMouseMove={trackSpotlight}
                      className={`bg-ink-800 rounded-2xl border border-line/10 p-8 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-700 ease-out motion-reduce:transition-none group/card relative overflow-hidden ${cardMotion}`}
                      style={{ transitionDelay: revealDelay ? `${revealDelay}ms` : "0ms" }}
                    >
                      <div className="card-spotlight absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />

                      <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 mb-4">
                          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                            {exp.duration === "Present" && (
                              <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping motion-reduce:animate-none" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                              </span>
                            )}
                            {exp.duration}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold text-zinc-100 mb-2">{exp.position}</h3>

                        <p className="text-emerald-400 font-semibold text-lg mb-3">{exp.company}</p>

                        <p
                          className={`text-zinc-400 flex items-center gap-2 mb-6 ${
                            facesLine ? "md:justify-end" : ""
                          }`}
                        >
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {exp.location}
                        </p>

                        <div className="h-px bg-line/10 rounded-full mb-6" />

                        <ul className="space-y-3">
                          {exp.responsibilities.map((resp, respIdx) => (
                            <li
                              key={respIdx}
                              className={`group/item flex items-start gap-3 text-zinc-400 hover:text-zinc-200 transition-all duration-500 ease-out motion-reduce:transition-none ${
                                facesLine ? "md:flex-row-reverse md:text-right" : ""
                              } ${shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                              style={{
                                transitionDelay: revealDelay ? `${revealDelay + 220 + respIdx * 45}ms` : "0ms",
                              }}
                            >
                              <span className="flex-shrink-0 w-2 h-2 rounded-full bg-emerald-500 mt-2 transition-all duration-300 group-hover/item:scale-150 group-hover/item:shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                              <span className="text-sm leading-relaxed">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

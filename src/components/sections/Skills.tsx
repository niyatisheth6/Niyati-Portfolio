import React, { useEffect, useRef, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { SectionHeader } from "../common/SectionHeader";

type RingId = "tools" | "frontend" | "other";

interface Ring {
  id: RingId;
  title: string;
  skills: string[];
  /** Radius as a fraction of the orbit size. */
  radius: number;
  seconds: number;
  reverse: boolean;
  lineStyle: "solid" | "dashed" | "dotted";
}

// Shortest labels sit on the inner ring, longest on the outer one, so chips don't collide.
const RINGS: Ring[] = [
  { id: "tools", title: "Tools & Libraries", skills: portfolioData.skills.tools, radius: 0.23, seconds: 50, reverse: false, lineStyle: "solid" },
  { id: "frontend", title: "Frontend", skills: portfolioData.skills.frontend, radius: 0.35, seconds: 75, reverse: true, lineStyle: "dashed" },
  { id: "other", title: "Other Skills", skills: portfolioData.skills.other, radius: 0.46, seconds: 100, reverse: false, lineStyle: "dotted" },
];

const DESKTOP_SIZE = 600;
const MOBILE_BREAKPOINT = 768;

const RobotFace = () => (
  <svg viewBox="0 0 48 40" className="w-12 md:w-16" aria-hidden>
    <line x1="24" y1="3" x2="24" y2="9" stroke="#0E0E11" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="3.5" r="3" fill="#10B981" className="orbit-antenna" />
    <rect x="6" y="8" width="36" height="28" rx="10" fill="#E9E9EE" />
    <rect x="11" y="13" width="26" height="17" rx="5" fill="#0E0E11" />
    <rect x="16" y="17" width="5" height="7" rx="2.5" fill="#10B981" className="orbit-eye" />
    <rect x="27" y="17" width="5" height="7" rx="2.5" fill="#10B981" className="orbit-eye" />
    <path d="M21 26.5 q3 2.5 6 0" stroke="#10B981" strokeWidth="1.6" fill="none" strokeLinecap="round" />
  </svg>
);

const RingLine = ({ style }: { style: Ring["lineStyle"] }) => (
  <span aria-hidden className="inline-block w-6 border-t-2 border-emerald-400" style={{ borderTopStyle: style }} />
);

export const Skills: React.FC = () => {
  const stage = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(DESKTOP_SIZE);
  const [compact, setCompact] = useState(false);
  const [focus, setFocus] = useState<RingId | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const measure = () => {
      const isCompact = window.innerWidth < MOBILE_BREAKPOINT;
      setCompact(isCompact);
      setSize(isCompact ? Math.min((el.parentElement?.clientWidth ?? 320) - 8, 320) : DESKTOP_SIZE);
    };
    measure();
    window.addEventListener("resize", measure);
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => {
      window.removeEventListener("resize", measure);
      observer.disconnect();
    };
  }, []);

  const showSkill = (ring: RingId, skill: string) => {
    setFocus(ring);
    setHovered(skill);
  };
  const clearSkill = () => {
    setFocus(null);
    setHovered(null);
  };

  return (
    <section id="skills" className="py-20 px-4 bg-ink-900 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Skills & Expertise" subtitle="Everything I work with, in orbit" />

        <div className="flex justify-center">
          <div
            ref={stage}
            className={`orbit relative flex-shrink-0 ${focus ? "is-paused" : ""} ${visible ? "is-visible" : ""}`}
            style={{ width: size, height: size }}
          >
            {RINGS.map((ring, r) => {
              const radius = ring.radius * size;
              const dimmed = focus !== null && focus !== ring.id;
              return (
                <div
                  key={ring.id}
                  className={`orbit-ring-wrap absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                    !visible ? "opacity-0" : dimmed ? "opacity-25" : "opacity-100"
                  }`}
                  style={{ animationDelay: `${0.15 * r}s` }}
                >
                  <div
                    className="orbit-ring absolute left-1/2 top-1/2 rounded-full border border-emerald-500/40"
                    style={{
                      width: radius * 2,
                      height: radius * 2,
                      marginLeft: -radius,
                      marginTop: -radius,
                      borderStyle: ring.lineStyle,
                      animationDuration: `${ring.seconds}s`,
                      animationDirection: ring.reverse ? "reverse" : "normal",
                    }}
                  >
                    {ring.skills.map((skill, i) => {
                      const angle = (360 / ring.skills.length) * i;
                      const isHovered = hovered === skill;
                      return (
                        <div
                          key={skill}
                          className="absolute left-1/2 top-1/2 w-0 h-0"
                          style={{ transform: `rotate(${angle}deg) translateX(${radius}px) rotate(${-angle}deg)` }}
                        >
                          <div
                            className={`orbit-counter absolute left-0 top-0 w-0 h-0 ${isHovered ? "z-10" : ""}`}
                            style={{
                              animationDuration: `${ring.seconds}s`,
                              animationDirection: ring.reverse ? "normal" : "reverse",
                            }}
                          >
                            {compact ? (
                              <span className="absolute -translate-x-1/2 -translate-y-1/2 block w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
                            ) : (
                              <span
                                onMouseEnter={() => showSkill(ring.id, skill)}
                                onMouseLeave={clearSkill}
                                className={`pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border cursor-default transition-[background-color,color,border-color,transform,box-shadow] duration-300 ${
                                  isHovered
                                    ? "bg-emerald-500 text-onaccent border-emerald-500 scale-110 shadow-[0_0_24px_rgba(16,185,129,0.5)]"
                                    : "bg-ink-800 text-zinc-200 border-line/10 shadow-md shadow-black/10"
                                }`}
                              >
                                {skill}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {/* Core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <span className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping [animation-duration:3s]" />
              <div className="relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-ink-800 border border-emerald-500/40 shadow-[0_0_40px_rgba(16,185,129,0.25)]">
                <RobotFace />
              </div>
            </div>
          </div>
        </div>

        {compact ? (
          <div className="mt-8 space-y-6">
            {RINGS.map((ring) => (
              <div key={ring.id}>
                <h3 className="flex items-center gap-3 text-sm font-semibold uppercase tracking-wider text-zinc-300 mb-3">
                  <RingLine style={ring.lineStyle} />
                  {ring.title}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {ring.skills.map((skill) => (
                    <li
                      key={skill}
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-zinc-200 bg-ink-800 border border-line/10"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ul className="mt-6 flex flex-wrap justify-center gap-x-10 gap-y-3">
            {RINGS.map((ring) => {
              const isFocused = focus === ring.id;
              return (
                <li key={ring.id}>
                  <button
                    onMouseEnter={() => setFocus(ring.id)}
                    onMouseLeave={() => setFocus(null)}
                    onFocus={() => setFocus(ring.id)}
                    onBlur={() => setFocus(null)}
                    aria-pressed={isFocused}
                    className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                      isFocused ? "text-emerald-400" : "text-zinc-400 hover:text-zinc-100"
                    }`}
                  >
                    <RingLine style={ring.lineStyle} />
                    {ring.title}
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
};

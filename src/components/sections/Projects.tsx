import React, { useCallback, useEffect, useRef, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { SectionHeader } from "../common/SectionHeader";

type Project = (typeof portfolioData.projects)[number];

const AUTOPLAY_MS = 3000;
const DRAG_DEG_PER_PX = 0.3;
const DRAG_THRESHOLD_PX = 6;
const MAX_TECH = 4;

const pad = (n: number) => String(n).padStart(2, "0");
const mod = (n: number, m: number) => ((n % m) + m) % m;

const useCompact = () => {
  const [compact, setCompact] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const onResize = () => setCompact(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return compact;
};

interface AutoplayBarProps {
  running: boolean;
  onDone?: () => void;
  className?: string;
}

/** Fills over AUTOPLAY_MS; the carousel advances when the fill animation ends, so pausing the animation pauses autoplay. */
const AutoplayBar: React.FC<AutoplayBarProps> = ({ running, onDone, className = "" }) => (
  <span
    aria-hidden
    className={`autoplay-bar block h-full ${className}`}
    style={{ animationDuration: `${AUTOPLAY_MS}ms`, animationPlayState: running ? "running" : "paused" }}
    onAnimationEnd={onDone}
  />
);

interface PanelProps {
  project: Project;
  index: number;
  total: number;
  isActive: boolean;
  autoplay: { running: boolean; onDone: () => void } | null;
}

const ProjectPanel: React.FC<PanelProps> = ({ project, index, total, isActive, autoplay }) => {
  const extraTech = project.tech.length - MAX_TECH;
  return (
    <article
      className={`relative overflow-hidden h-full flex flex-col rounded-2xl p-6 md:p-7 bg-ink-800 border transition-[border-color,box-shadow] duration-500 ${
        isActive
          ? "border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.18)]"
          : "border-line/10"
      }`}
    >
      <div className="flex items-center justify-between mb-4 font-mono text-sm">
        <span className="text-emerald-400">
          {pad(index + 1)} <span className="text-zinc-500">/ {pad(total)}</span>
        </span>
        <span className="text-zinc-500">{"</>"}</span>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-zinc-50 leading-tight mb-3 line-clamp-2">{project.name}</h3>
      <p className="text-sm text-zinc-400 leading-relaxed mb-4 line-clamp-3">{project.description}</p>

      <ul className="flex flex-wrap gap-1.5 mb-4">
        {project.tech.slice(0, MAX_TECH).map((t) => (
          <li
            key={t}
            className="px-2 py-0.5 rounded-md font-mono text-[11px] md:text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20"
          >
            {t}
          </li>
        ))}
        {extraTech > 0 && (
          <li className="px-2 py-0.5 rounded-md font-mono text-[11px] md:text-xs text-zinc-400 border border-line/10">
            +{extraTech}
          </li>
        )}
      </ul>

      <ul className="space-y-1.5 mb-4">
        {project.highlights.slice(0, 3).map((h) => (
          <li key={h} className="flex items-start gap-2 text-xs md:text-sm text-zinc-400">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
            <span className="line-clamp-1">{h}</span>
          </li>
        ))}
      </ul>

      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isActive ? 0 : -1}
        className="group mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        View Project
        <svg
          className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
        </svg>
      </a>

      {isActive && autoplay && (
        <div className="absolute inset-x-0 bottom-0 h-1 bg-line/5">
          <AutoplayBar
            running={autoplay.running}
            onDone={autoplay.onDone}
            className="bg-gradient-to-r from-emerald-500 to-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
          />
        </div>
      )}
    </article>
  );
};

export const Projects: React.FC = () => {
  const projects = portfolioData.projects;
  const total = projects.length;
  const step = 360 / total;

  const compact = useCompact();
  const reducedMotion = usePrefersReducedMotion();
  const panelWidth = compact ? 270 : 400;
  const radius = Math.round(panelWidth / 2 / Math.tan(Math.PI / total)) + (compact ? 24 : 50);

  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const [rotation, setRotation] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [hoverPaused, setHoverPaused] = useState(false);
  const [focusPaused, setFocusPaused] = useState(false);
  const [inView, setInView] = useState(false);

  const active = mod(Math.round(-rotation / step), total);

  const next = useCallback(() => setRotation((r) => Math.round(r / step) * step - step), [step]);
  const prev = useCallback(() => setRotation((r) => Math.round(r / step) * step + step), [step]);
  const goTo = useCallback(
    (index: number) =>
      setRotation((r) => {
        const current = Math.round(-r / step);
        let diff = index - mod(current, total);
        if (diff > total / 2) diff -= total;
        if (diff < -total / 2) diff += total;
        return -(current + diff) * step;
      }),
    [step, total]
  );

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => setHoverPaused(false), [active]);

  const autoplayEnabled = !reducedMotion;
  const autoplayRunning = autoplayEnabled && inView && !hoverPaused && !focusPaused && !dragging;
  const autoplay = autoplayEnabled ? { running: autoplayRunning, onDone: next } : null;

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    drag.current = { x: e.clientX, start: rotation, moved: false };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (!d.moved) {
      if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
      d.moved = true;
      setDragging(true);
      e.currentTarget.setPointerCapture(e.pointerId);
    }
    setRotation(d.start + dx * DRAG_DEG_PER_PX);
  };

  const endDrag = () => {
    if (drag.current?.moved) setRotation((r) => Math.round(r / step) * step);
    drag.current = null;
    setDragging(false);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  const arrowClass =
    "inline-flex items-center justify-center w-11 h-11 rounded-full border border-line/15 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/60 hover:bg-emerald-500/10 active:scale-95";

  return (
    <section id="projects" className="py-20 px-4 bg-ink-950 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <SectionHeader title="Featured Projects" subtitle="Drag, swipe or use the arrows to explore what I've built" />

        <div
          ref={stage}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured projects"
          className="relative h-[440px] md:h-[480px] select-none outline-none cursor-grab active:cursor-grabbing [touch-action:pan-y] focus-visible:ring-2 focus-visible:ring-emerald-500/40 rounded-3xl"
          style={{ perspective: compact ? "1000px" : "1600px" }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
          onFocus={(e) => setFocusPaused(e.target.matches(":focus-visible"))}
          onBlur={() => setFocusPaused(false)}
        >
          <div
            aria-hidden
            className="absolute left-1/2 bottom-2 -translate-x-1/2 w-[70%] h-24 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
          />

          <div
            className="absolute inset-0 [transform-style:preserve-3d]"
            style={{
              transform: `translateZ(${-radius}px) rotateY(${rotation}deg)`,
              transition: dragging ? "none" : "transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)",
            }}
          >
            {projects.map((project, i) => {
              const relative = mod(i * step + rotation + 180, 360) - 180;
              const distance = Math.abs(relative);
              const isActive = i === active;
              return (
                <div
                  key={project.id}
                  aria-hidden={!isActive}
                  onClick={() => !isActive && goTo(i)}
                  onMouseEnter={() => setHoverPaused(isActive)}
                  onMouseLeave={() => setHoverPaused(false)}
                  className={`absolute left-1/2 top-1/2 h-[400px] md:h-[420px] [backface-visibility:hidden] ${
                    isActive ? "" : "cursor-pointer"
                  }`}
                  style={{
                    width: panelWidth,
                    transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                    opacity: Math.max(0.12, 1 - distance / 100),
                    filter: distance > 20 ? "blur(1.5px)" : "none",
                    transition: dragging ? "none" : "opacity 0.6s, filter 0.6s",
                  }}
                >
                  <ProjectPanel project={project} index={i} total={total} isActive={isActive} autoplay={autoplay} />
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <button onClick={prev} className={arrowClass} aria-label="Previous project">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex items-center gap-2" role="tablist" aria-label="Choose project">
            {projects.map((project, i) => (
              <button
                key={project.id}
                role="tab"
                aria-selected={i === active}
                aria-label={project.name}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full overflow-hidden transition-all duration-500 ${
                  i !== active
                    ? "w-2 bg-line/20 hover:bg-line/40"
                    : autoplay
                      ? "w-8 bg-emerald-400/25"
                      : "w-8 bg-emerald-400"
                }`}
              >
                {i === active && autoplay && <AutoplayBar running={autoplay.running} className="bg-emerald-400" />}
              </button>
            ))}
          </div>

          <button onClick={next} className={arrowClass} aria-label="Next project">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <p className="sr-only" aria-live={autoplayRunning ? "off" : "polite"}>
          {pad(active + 1)} / {pad(total)} — {projects[active].name}
        </p>
      </div>
    </section>
  );
};

import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from "react";
import { portfolioData } from "../../data/portfolio";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { hasWebGL } from "../../lib/webgl";
import { FlipWords, SplitName, Typewriter } from "../hero/HeroAnimations";
import type { RobotMood } from "../three/RobotScene";

const RobotScene = lazy(() => import("../three/RobotScene"));

const HEADLINE_WORDS = ["responsive.", "high-performance.", "pixel-perfect.", "scalable.", "user-friendly."];
const HERO_SUMMARY =
  "3+ years turning ideas and Figma designs into fast, production-ready apps with React.js, Next.js & TypeScript.";

const FUN_FACTS = [
  "She turns Figma designs into pixel-perfect React ⚛️",
  "3+ years of shipping production-ready UIs 🚀",
  "TypeScript is her love language 💚",
  "She makes dashboards that people actually enjoy 📊",
  "Psst… click “View My Work” 👀",
];

interface HeroProps {
  ready?: boolean;
  /** False while an intro robot is still flying into the hero's place. */
  robotVisible?: boolean;
  /** The intro already said hi, so the hero robot skips its own greeting. */
  greeted?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ ready = true, robotVisible = true, greeted = false }) => {
  const { personal } = portfolioData;
  const reducedMotion = usePrefersReducedMotion();
  const [webgl] = useState(hasWebGL);

  const sectionRef = useRef<HTMLElement>(null);
  const [mood, setMood] = useState<RobotMood>("idle");
  const [bubble, setBubble] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const bubbleTimer = useRef<number>();
  const lastFact = useRef(-1);
  const saidBye = useRef(false);

  const say = useCallback((text: string, ms: number) => {
    window.clearTimeout(bubbleTimer.current);
    setBubble(text);
    bubbleTimer.current = window.setTimeout(() => setBubble(null), ms);
  }, []);

  useEffect(() => () => window.clearTimeout(bubbleTimer.current), []);

  useEffect(() => {
    if (!ready || !robotVisible) return;
    if (greeted) {
      say("Want to see her work?", 3500);
      return;
    }
    setMood("hello");
    say("Hi! I'm Niyati's assistant 👋", 2600);
    const timer = window.setTimeout(() => {
      setMood((m) => (m === "hello" ? "idle" : m));
      say("Want to see her work?", 3500);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [ready, robotVisible, greeted, say]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = sectionRef.current;
      if (!el) return;
      setScrollProgress(Math.min(1, Math.max(0, window.scrollY / (el.offsetHeight * 0.6))));
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (scrollProgress > 0.25 && !saidBye.current) {
      saidBye.current = true;
      setMood("bye");
      say("See you! 👋", 1800);
    } else if (scrollProgress < 0.1 && saidBye.current) {
      saidBye.current = false;
      setMood("idle");
    }
  }, [scrollProgress, say]);

  const handleRobotClick = useCallback(() => {
    let next = Math.floor(Math.random() * FUN_FACTS.length);
    if (next === lastFact.current) next = (next + 1) % FUN_FACTS.length;
    lastFact.current = next;
    say(FUN_FACTS[next], 3200);
  }, [say]);

  const handleWorkHover = (hovering: boolean) => {
    if (saidBye.current) return;
    setMood(hovering ? "excited" : "idle");
    if (hovering) say("Go on, click it! ✨", 2000);
  };

  const robotOpacity = 1 - Math.min(1, Math.max(0, (scrollProgress - 0.3) / 0.5));
  const reveal = (delay: number, className = "") =>
    ready
      ? { className: `${className} hero-reveal`, style: { animationDelay: `${delay}s` } }
      : { className: `${className} opacity-0` };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-ink-950 flex items-center px-4 pt-24 pb-16 overflow-hidden"
      id="home"
    >
      <div aria-hidden className="hero-grid absolute inset-0 pointer-events-none" />

      <div className="relative max-w-6xl w-full mx-auto grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
        {/* Text */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <p className="h-7 font-mono text-emerald-400 text-base md:text-lg">
            <Typewriter text="// Hello, I'm" start={ready} delay={0.15} />
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-zinc-50 mt-2 mb-5 !leading-tight tracking-tight">
            <SplitName text={personal.name} start={ready} delay={0.5} />
            <span
              aria-hidden
              className={`name-dot ${ready ? "is-in" : ""}`}
              style={{ animationDelay: `${0.5 + personal.name.length * 0.045}s` }}
            >
              .
            </span>
          </h1>

          <h2 {...reveal(0.95, "mb-5")}>
            <span className="block text-xl md:text-2xl font-medium text-zinc-300">I build web apps that are</span>
            <span className="block mt-1 text-3xl md:text-4xl font-bold h-[1.3em]">
              <FlipWords words={HEADLINE_WORDS} start={ready} />
            </span>
          </h2>

          <p {...reveal(1.1, "text-base md:text-lg text-zinc-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed")}>
            {HERO_SUMMARY}
          </p>

          <div
            {...reveal(
              1.25,
              "flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center relative z-10"
            )}
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              onMouseEnter={() => handleWorkHover(true)}
              onMouseLeave={() => handleWorkHover(false)}
              className="btn-shine px-8 py-4 text-lg font-semibold rounded-xl bg-emerald-500 text-onaccent hover:bg-emerald-400 hover:shadow-[0_0_40px_rgba(16,185,129,0.45)] transition-all duration-300 ease-out active:scale-95 flex items-center gap-2 group hover:-translate-y-1 cursor-pointer"
            >
              View My Work
              <svg
                className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
            <a
              href={personal.links.email}
              className="group px-8 py-4 text-lg font-semibold rounded-xl border border-line/15 text-zinc-200 hover:border-emerald-500/60 hover:text-emerald-400 transition-all duration-300 hover:-translate-y-1 flex items-center gap-2"
            >
              Let&apos;s Talk
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        </div>

        {/* Robot */}
        <div id="hero-robot" className="order-1 lg:order-2 relative h-[300px] sm:h-[380px] lg:h-[560px]">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-96 lg:h-96 rounded-full bg-emerald-500/15 blur-3xl pointer-events-none transition-opacity duration-700"
            style={{ opacity: ready ? robotOpacity : 0 }}
          />
          {bubble && robotVisible && (
            <div
              key={bubble}
              role="status"
              className="speech-bubble absolute top-0 lg:top-4 z-10 max-w-[260px] w-max px-4 py-2.5 rounded-2xl text-sm font-medium text-zinc-100 bg-ink-800 border border-emerald-500/35 shadow-lg shadow-emerald-500/10"
            >
              {bubble}
            </div>
          )}
          {webgl && (
            <div className="absolute inset-0" style={{ opacity: robotVisible ? robotOpacity : 0 }}>
              <Suspense fallback={null}>
                <RobotScene
                  active={robotVisible ? robotOpacity > 0 : ready}
                  holdStill={!robotVisible}
                  mood={mood}
                  reducedMotion={reducedMotion}
                  onClick={handleRobotClick}
                />
              </Suspense>
            </div>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hidden md:block absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce pointer-events-none">
        <svg className="w-6 h-6 text-emerald-400/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

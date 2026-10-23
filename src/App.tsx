import { Suspense, lazy, useCallback, useState } from "react";
import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import { Footer } from "./components/sections/Footer";
import { prefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { hasWebGL } from "./lib/webgl";
import "./App.css";

type IntroStyle = "robot" | "macbook" | "none";

// 👇 Change this one line to switch the page-load intro: "robot" | "macbook" | "none"
const INTRO_STYLE = "robot" as IntroStyle;

const INTROS = {
  robot: lazy(() => import("./components/intro/RobotIntro")),
  macbook: lazy(() => import("./components/intro/MacIntro")),
};

const shouldPlayIntro = () => INTRO_STYLE !== "none" && !prefersReducedMotion() && hasWebGL();

function App() {
  const [introPlayed] = useState(shouldPlayIntro);
  const [showIntro, setShowIntro] = useState(introPlayed);
  const [ready, setReady] = useState(!introPlayed);

  const handleIntroReveal = useCallback(() => setReady(true), []);

  const handleIntroFinish = useCallback(() => setShowIntro(false), []);

  const robotIntro = introPlayed && INTRO_STYLE === "robot";
  const Intro = INTRO_STYLE === "none" ? null : INTROS[INTRO_STYLE];

  return (
    <div className="bg-ink-950 text-zinc-100 min-h-screen">
      {showIntro && Intro && (
        <Suspense fallback={<div className="force-dark fixed inset-0 z-[100] bg-ink-950" />}>
          <Intro onReveal={handleIntroReveal} onFinish={handleIntroFinish} />
        </Suspense>
      )}
      <Header ready={ready} />
      <div id="home">
        <Hero ready={ready} robotVisible={!(robotIntro && showIntro)} greeted={robotIntro} />
      </div>
      <div id="projects">
        <Projects />
      </div>
      <div id="skills">
        <Skills />
      </div>
      <div id="experience">
        <Experience />
      </div>
      <div id="education">
        <Education />
      </div>
      <Footer />
    </div>
  );
}

export default App;

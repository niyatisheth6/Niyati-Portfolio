import { Header } from "./components/sections/Header";
import { Hero } from "./components/sections/Hero";
import { Projects } from "./components/sections/Projects";
import { Skills } from "./components/sections/Skills";
import { Experience } from "./components/sections/Experience";
import { Education } from "./components/sections/Education";
import { Footer } from "./components/sections/Footer";
import "./App.css";

function App() {
  return (
    <div className="bg-white">
      <Header />
      <div id="home">
        <Hero />
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

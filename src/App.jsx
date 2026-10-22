import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function App() {
  const [motionEnabled, setMotionEnabled] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? "on" : "off";
  }, [motionEnabled]);
  return (
    <>
      <a href="#work" className="skip-link">
        Skip to projects
      </a>
      <Navbar />
      <main>
        <Hero motionEnabled={motionEnabled} />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <footer className="site-footer page-width">
        <a className="wordmark" href="#home">
          ms<span>✳</span>
        </a>
        <p>Made with curiosity. Shipped by Mayank.</p>
        <button
          className="motion-toggle"
          onClick={() => setMotionEnabled(!motionEnabled)}
          aria-pressed={motionEnabled}
        >
          <span
            className={motionEnabled ? "status-dot" : "status-dot paused"}
          />
          Motion {motionEnabled ? "on" : "off"}
        </button>
        <a href="#home" aria-label="Back to top">
          Back to orbit ↑
        </a>
      </footer>
    </>
  );
}

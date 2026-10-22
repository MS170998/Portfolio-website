import { Suspense, lazy } from "react";
const SpacemanCanvas = lazy(() => import("./Spaceman"));
export default function Hero({ motionEnabled }) {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-stars" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true" />
      <img className="hero-terrain" src="/parallax/3Mountain.svg" alt="" />
      <div className="page-width hero-layout">
        <div className="hero-copy">
          <div className="eyebrow hero-intro">
            <span className="status-dot" /> SOFTWARE ENGINEER & INDEPENDENT
            MAKER
          </div>
          <h1 id="hero-title">
            Mayank
            <br />
            Singh<span className="name-period">.</span>
          </h1>
          <p className="hero-statement">
            A little curiosity.
            <br />A lot of <em>building.</em>
          </p>
          <p className="hero-description">
            I build thoughtful tools for the web and beyond. From a blank canvas
            to a cleaner Mac, I turn everyday friction into things you can use.
          </p>
          <div className="hero-actions">
            <a className="button button-lime" href="#work">
              Explore my projects <span>↘</span>
            </a>
            <a
              className="text-link"
              href="https://github.com/MS170998"
              target="_blank"
              rel="noreferrer"
            >
              GitHub ↗
            </a>
          </div>
          <p className="hero-credentials">
            Currently engineering at <strong>IBM</strong>
            <span>·</span> Previously <strong>Deloitte</strong>
          </p>
        </div>
        <div
          className="hero-scene"
          role="img"
          aria-label="An illustrated astronaut floating above an alien landscape"
        >
          <span className="scene-coordinate">EXPLORING THE POSSIBLE / 001</span>
          <Suspense
            fallback={<div className="scene-loading">Entering orbit…</div>}
          >
            <SpacemanCanvas motionEnabled={motionEnabled} />
          </Suspense>
          <span className="scene-caption">
            <span className="crosshair">＋</span> Stay curious. Keep exploring.
          </span>
        </div>
      </div>
      <div className="hero-bottom page-width">
        <a href="#work">
          SCROLL TO DISCOVER <span>↓</span>
        </a>
        <span>
          BASED IN INDIA <span className="tiny-star">✳</span> BUILDING FOR
          EVERYWHERE
        </span>
      </div>
    </section>
  );
}

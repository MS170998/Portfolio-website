import { useState } from "react";
const email = "smayankanand3@gmail.com";
export default function Contact() {
  const [copyState, setCopyState] = useState("Copy email");
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyState("Copied ✓");
    } catch {
      setCopyState("Use the email link to get in touch");
    }
  };
  return (
    <section
      className="contact-section page-width"
      id="contact"
      aria-labelledby="contact-title"
    >
      <div className="contact-orbit" aria-hidden="true">
        ✳
      </div>
      <p className="eyebrow">
        <span className="status-dot" /> OPEN TO GOOD CONVERSATIONS
      </p>
      <h2 id="contact-title">
        Something in mind?
        <br />
        <span className="muted">Let’s make it real.</span>
      </h2>
      <p>
        A project, an opportunity, or a small idea that won’t leave you alone.
        <br />
        I’d love to hear about it.
      </p>
      <div className="contact-actions">
        <a className="button button-lime" href={`mailto:${email}`}>
          Say hello <span>↗</span>
        </a>
        <button className="text-link copy-button" onClick={copyEmail}>
          {copyState}
        </button>
        <span className="sr-only" role="status">
          {copyState === "Copied ✓" ? "Email address copied" : ""}
        </span>
      </div>
      <div className="contact-bottom">
        <a href={`mailto:${email}`}>{email} ↗</a>
        <div>
          <a
            href="https://github.com/MS170998"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
          <a
            href="https://linkedin.com/in/mayanksingh17"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://twitter.com/MS17092"
            target="_blank"
            rel="noreferrer"
          >
            X ↗
          </a>
        </div>
      </div>
    </section>
  );
}

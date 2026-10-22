import { useEffect, useState } from "react";
const links = [
  ["work", "Projects"],
  ["about", "About"],
  ["experience", "Experience"],
];
export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main section[id]")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <header className="site-header">
      <nav className="page-width nav-inner" aria-label="Main navigation">
        <a
          className="wordmark"
          href="#home"
          aria-label="Mayank Singh home"
          onClick={() => setMenuOpen(false)}
        >
          ms<span>✳</span>
        </a>
        <div
          className={`nav-links ${menuOpen ? "is-open" : ""}`}
          id="navigation-links"
        >
          {links.map(([id, label]) => (
            <a
              href={`#${id}`}
              key={id}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="mobile-contact"
            href="#contact"
            onClick={() => setMenuOpen(false)}
          >
            Let’s talk ↗
          </a>
        </div>
        <a href="#contact" className="nav-contact">
          Let’s talk <span>↗</span>
        </a>
        <button
          className="menu-toggle"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="navigation-links"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "Close −" : "Menu +"}
        </button>
      </nav>
    </header>
  );
}

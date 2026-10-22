import { useState } from "react";

export function ProductIcon({ type }) {
  return (
    <span className={`product-icon icon-${type}`} aria-hidden="true">
      <svg
        viewBox="0 0 32 32"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {type === "drawing" ? (
          <>
            <path d="m8 6 18 18-6 3L5 12Z" />
            <path d="m23 5 4 4L10 26l-6 2 2-6Z" />
          </>
        ) : type === "notes" ? (
          <>
            <rect x="6" y="5" width="20" height="22" rx="5" />
            <path d="M12 11v10m8-10v10" />
          </>
        ) : (
          <>
            <path d="m18 3 2 9 9 3-9 3-3 11-3-10-11-3 11-3Z" />
            <path d="m25 2 1 4 4 1" />
          </>
        )}
      </svg>
    </span>
  );
}
function WindowBar({ children, right }) {
  return (
    <div className="window-bar">
      <span className="window-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>{children}</span>
      <span className="window-bar-right">{right}</span>
    </div>
  );
}
function DrawingPreview() {
  const [color, setColor] = useState("#a4dfb7");
  return (
    <div className="drawing-preview product-preview">
      <WindowBar right="↗">hellodrawing.com</WindowBar>
      <div className="drawing-board">
        <div className="drawing-toolbar" aria-label="Preview color">
          <span aria-hidden="true">↖</span>
          <span aria-hidden="true">▢</span>
          <span aria-hidden="true">○</span>
          <span aria-hidden="true">↗</span>
          <span aria-hidden="true">T</span>
          <span className="tool-selected" aria-hidden="true">
            ✎
          </span>
        </div>
        <svg
          className="drawing-art"
          viewBox="0 0 600 320"
          role="img"
          aria-label="A hand-drawn idea map connecting curiosity, a sketch, and a launch"
        >
          <defs>
            <marker
              id="arrow"
              markerWidth="10"
              markerHeight="10"
              refX="6"
              refY="3"
              orient="auto"
            >
              <path
                d="m0 0 6 3-6 3"
                fill="none"
                stroke="#656b61"
                strokeWidth="1.5"
              />
            </marker>
          </defs>
          <g
            fill="none"
            stroke="#656b61"
            strokeWidth="1.5"
            markerEnd="url(#arrow)"
          >
            <path d="M196 160c35-12 42-10 70-2" />
            <path d="M389 160c30-12 39-8 63 3" />
          </g>
          <g stroke="#494f47" strokeWidth="1.6">
            <rect
              x="52"
              y="117"
              width="139"
              height="89"
              rx="14"
              fill="#f9edc3"
              transform="rotate(-6 120 160)"
            />
            <rect
              x="263"
              y="111"
              width="124"
              height="100"
              rx="45"
              fill={color}
            />
            <rect
              x="454"
              y="121"
              width="108"
              height="82"
              rx="12"
              fill="#d9d2f2"
              transform="rotate(5 508 160)"
            />
          </g>
          <g
            fill="#38453a"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="23"
            fontStyle="italic"
          >
            <text x="121" y="156">
              what if…
            </text>
            <text x="325" y="169">
              make it.
            </text>
            <text x="508" y="171">
              ship it ↗
            </text>
          </g>
          <g
            fill="#77786a"
            textAnchor="middle"
            fontFamily="Georgia, serif"
            fontSize="14"
            fontStyle="italic"
          >
            <text x="124" y="235">
              a little curiosity
            </text>
            <text x="329" y="246">
              a rough first sketch
            </text>
            <text x="504" y="234">
              something real
            </text>
            <text x="310" y="63" fontSize="23" fill="#515447">
              Big ideas start here.
            </text>
          </g>
          <path
            d="M237 73q83 11 161-4"
            stroke="#afbe9c"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="m78 83 3-12m-12 7 12 1m442 175 3 12m-9-6 13-2"
            stroke="#98aa86"
            strokeWidth="2"
          />
        </svg>
        <div className="preview-bottom">
          <div className="color-picker">
            {["#a4dfb7", "#f6c69d", "#b9b0e9"].map((c) => (
              <button
                key={c}
                aria-label={`Use ${c === "#a4dfb7" ? "green" : c === "#f6c69d" ? "peach" : "purple"} in sketch`}
                aria-pressed={color === c}
                style={{ background: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
          <span>ONE CANVAS. ENDLESS POSSIBILITIES.</span>
          <span>100% ⊕</span>
        </div>
      </div>
    </div>
  );
}
function NotesPreview() {
  const [text, setText] = useState(
    "A small idea can go a long way.\nLet’s build something together.",
  );
  return (
    <div className="notes-preview product-preview">
      <WindowBar
        right={
          <>
            <span className="status-dot" /> 2 here
          </>
        }
      >
        realtimenote.com / room / hello
      </WindowBar>
      <div className="notes-workspace">
        <div className="note-mini-label">
          <span className="note-avatar">M</span> YOUR SIDE{" "}
          <span className="live-label">INTERACTIVE DEMO</span>
        </div>
        <textarea
          aria-label="Try the local text sharing demo"
          value={text}
          maxLength={150}
          onChange={(event) => setText(event.target.value)}
          spellCheck={false}
        />
        <div className="note-sync">
          <span />
          LIVE IN THE OTHER TAB
          <span />
        </div>
        <div className="note-mini-label">
          <span className="note-avatar friend">Y</span> THEIR SIDE{" "}
          <span className="synced">✓ In sync</span>
        </div>
        <div className="mirrored-note" aria-live="polite">
          {text || "Your words will appear here…"}
          <span className="note-cursor" />
        </div>
        <p className="note-demo-hint">
          Try typing above. This preview mirrors text locally.
        </p>
      </div>
    </div>
  );
}
function SweepPreview() {
  const [scanned, setScanned] = useState(false);
  return (
    <div className="sweep-preview product-preview">
      <WindowBar right="⌘">AgentSweep</WindowBar>
      <div className="sweep-workspace">
        <div className="sweep-preview-heading">
          <span className="eyebrow">A LITTLE ROOM TO CREATE</span>
          <ProductIcon type="sweep" />
        </div>
        <h4>A clearer picture.</h4>
        <p className="sweep-demo-label">ILLUSTRATIVE SCAN · EXAMPLE DATA</p>
        <div className="storage-number">
          32.8 <span>GB</span>
          <small>across 4 AI tools</small>
        </div>
        <div className="storage-bar">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="storage-tools">
          {[
            ["O", "Ollama", "18.2", "ollama"],
            ["C", "Cursor", "6.4", "cursor"],
            ["✳", "Claude Code", "4.8", "claude"],
            ["⌘", "Codex", "3.4", "codex"],
          ].map(([icon, name, size, type]) => (
            <div key={name}>
              <span className={`tool-symbol ${type}`}>{icon}</span>
              <span>{name}</span>
              <span>{size} GB</span>
            </div>
          ))}
        </div>
        <div className="sweep-bottom">
          <span>⌁ Everything stays on your Mac.</span>
          <button onClick={() => setScanned(true)}>
            {scanned ? "✓ Example scan complete" : "↻ Preview a scan"}
          </button>
        </div>
        <span className="sr-only" role="status">
          {scanned
            ? "Example scan complete. This is illustrative data, not a scan of your device."
            : ""}
        </span>
      </div>
    </div>
  );
}
const products = [
  {
    id: "hello-drawing",
    type: "drawing",
    name: "Hello Drawing",
    category: "THE CREATIVE ONE",
    platform: "WEB APP",
    headline: (
      <>
        Less setup.
        <br />
        More <em>scribbling.</em>
      </>
    ),
    description:
      "A blank canvas for your next big idea. Sketch, draw, and think visually in a free online whiteboard that gets out of your way.",
    features: ["No sign-up", "Saved in your browser", "Infinite possibilities"],
    url: "https://hellodrawing.com/",
    cta: "Make your first mark",
    domain: "hellodrawing.com",
    Preview: DrawingPreview,
  },
  {
    id: "realtime-note",
    type: "notes",
    name: "RealTimeNote",
    category: "THE CONNECTED ONE",
    platform: "WEB APP",
    headline: (
      <>
        Your words.
        <br />
        <em>Same page.</em>
      </>
    ),
    description:
      "Paste text, share a link, and see it together instantly. A simple live room for notes and snippets, across devices and across the world.",
    features: ["Live text sharing", "No accounts", "Timed rooms"],
    url: "https://realtimenote.com/",
    cta: "Open a live room",
    domain: "realtimenote.com",
    Preview: NotesPreview,
  },
  {
    id: "agent-sweep",
    type: "sweep",
    name: "AgentSweep",
    category: "THE TIDY ONE",
    platform: "MAC APP",
    headline: (
      <>
        Big ideas.
        <br />
        <em>Less baggage.</em>
      </>
    ),
    description:
      "Your AI tools create. Their clutter accumulates. See what’s taking up space on your Mac, understand what’s inside, and choose what stays.",
    features: ["26 AI tools", "Local to your Mac", "Review before cleanup"],
    url: "https://8080-agqu4klin73vwwocajlburtfcm.instabox.tech/",
    cta: "Meet AgentSweep",
    domain: "Explore the Mac app",
    Preview: SweepPreview,
  },
];
export default function Projects() {
  return (
    <section
      className="work-section page-width"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">
            <span className="section-index">01 /</span> IDEAS INTO REALITY
          </p>
          <h2 id="work-title">
            Small tools.
            <br />
            <span className="muted">Real possibilities.</span>
          </h2>
        </div>
        <p>
          Made out of curiosity.
          <br />
          Built to be used.
          <br />
          <span className="project-count">03 PRODUCTS IN THE WILD ↙</span>
        </p>
      </div>
      <nav className="product-dock" aria-label="Jump to a product">
        <span className="eyebrow">EXPLORE THE LINEUP</span>
        <div>
          {products.map((product) => (
            <a key={product.id} href={`#${product.id}`}>
              <ProductIcon type={product.type} />
              <span>{product.name}</span>
              <span className="dock-arrow">↘</span>
            </a>
          ))}
        </div>
      </nav>
      <div className="project-list">
        {products.map(({ Preview, ...product }, index) => (
          <article
            className={`project project-${product.type}`}
            key={product.id}
            id={product.id}
          >
            <div className="project-information">
              <div className="project-meta">
                <span>
                  0{index + 1} / {product.category}
                </span>
                <span>{product.platform}</span>
              </div>
              <div className="product-name">
                <ProductIcon type={product.type} />
                <h3>{product.name}</h3>
              </div>
              <p className="project-headline">{product.headline}</p>
              <p className="project-description">{product.description}</p>
              <ul className="feature-tags">
                {product.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <a
                className="project-cta"
                href={product.url}
                target="_blank"
                rel="noreferrer"
              >
                {product.cta}
                <span>↗</span>
              </a>
              <span className="project-domain">{product.domain}</span>
            </div>
            <div className="project-visual">
              <Preview />
            </div>
          </article>
        ))}
      </div>
      <a
        href="https://github.com/MS170998"
        target="_blank"
        rel="noreferrer"
        className="github-more"
      >
        <span>Always tinkering. Always learning.</span>
        <span>More on GitHub ↗</span>
      </a>
    </section>
  );
}

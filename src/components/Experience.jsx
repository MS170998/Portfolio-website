import { useState } from "react";
import { experiences } from "../data";
const summaries = [
  "Building interfaces and integrations for IBM App Connect, from React experiences to hybrid cloud deployments on Kubernetes and OpenShift.",
  "Built React applications for a Fortune 500 healthcare client, with a focus on state management, role-based access, and fast, responsive interfaces.",
  "A foundation in computer science, a first React hackathon project, and a third-place finish at the Gujarat Hackathon.",
];
export default function Experience() {
  const [expanded, setExpanded] = useState(null);
  return (
    <>
      <section
        className="about-section page-width"
        id="about"
        aria-labelledby="about-title"
      >
        <div className="about-heading">
          <p className="eyebrow">
            <span className="section-index">02 /</span> THE PERSON BEHIND THE
            PIXELS
          </p>
          <h2 id="about-title">
            Engineer by trade.
            <br />
            <span className="muted">Maker by instinct.</span>
          </h2>
        </div>
        <div className="about-copy">
          <p>
            I’m Mayank, a software engineer who likes turning “what if” into
            something you can open, use, and come back to.
          </p>
          <p>
            My work spans enterprise software at IBM and Deloitte, and
            independent products built around everyday problems. I care about
            how things work, how they feel, and the small details that make them
            better.
          </p>
          <a
            className="text-link"
            href="https://linkedin.com/in/mayanksingh17"
            target="_blank"
            rel="noreferrer"
          >
            A little more about me ↗
          </a>
        </div>
        <div className="stack-strip">
          <span className="eyebrow">MY EVERYDAY TOOLKIT</span>
          <ul>
            {[
              "React",
              "TypeScript",
              "JavaScript",
              "Node.js",
              "Docker",
              "Kubernetes",
              "AWS",
            ].map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
      </section>
      <section
        className="experience-section page-width"
        id="experience"
        aria-labelledby="experience-title"
      >
        <div className="section-heading">
          <div>
            <p className="eyebrow">
              <span className="section-index">03 /</span> ALONG THE WAY
            </p>
            <h2 id="experience-title">
              Where I’ve <span className="muted">built.</span>
            </h2>
          </div>
          <p>
            Different scales.
            <br />
            The same care for the craft.
          </p>
        </div>
        <div className="experience-list">
          {experiences.map((experience, index) => (
            <article className="experience-row" key={experience.company_name}>
              <span className="experience-date">
                {experience.date}
                {index === 0 && <span className="current-badge">CURRENT</span>}
              </span>
              <div className="experience-body">
                <button
                  className="experience-trigger"
                  aria-expanded={expanded === index}
                  aria-controls={`experience-detail-${index}`}
                  onClick={() => setExpanded(expanded === index ? null : index)}
                >
                  <span>
                    <strong>
                      {index === 0 ? "IBM" : experience.company_name}
                    </strong>
                    <span>{experience.title}</span>
                  </span>
                  <span className="expand-symbol" aria-hidden="true">
                    {expanded === index ? "−" : "+"}
                  </span>
                </button>
                <p>{summaries[index]}</p>
                <div
                  id={`experience-detail-${index}`}
                  hidden={expanded !== index}
                >
                  <ul className="experience-details">
                    {experience.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

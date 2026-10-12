import { CATEGORIES, CERTIFICATIONS, EXPERIENCE, LEARNING, PROFILE, PROJECTS, SKILLS } from "./data";
import type { Project } from "./types";

/** Shows text normally, but turns [bracketed text] into a yellow to-do. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[[^\]]+\])/).map((part, i) =>
        /^\[/.test(part) ? <span key={i} className="todo">{part}</span> : part
      )}
    </>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="chips">
      {items.map((t) => <span className="chip" key={t}>{t}</span>)}
    </div>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="pc">
      {p.shots && p.shots.length > 0 && (
        <div className="shots">
          {p.shots.map((src, i) => (
            <img key={src} src={src} alt={`${p.title} screenshot ${i + 1}`} loading="lazy"
              onError={(e) => e.currentTarget.remove()} />
          ))}
        </div>
      )}
      <h4>{p.title}</h4>
      <p><Rich text={p.desc} /></p>
      <Chips items={p.tech} />
      <div className="links">
        {p.github && <a href={p.github}>GitHub</a>}
        {p.demo && <a href={p.demo}>Live demo</a>}
      </div>
    </article>
  );
}

export default function App() {
  const P = PROFILE;
  return (
    <>
      <header>
        <div className="wrap">
          <nav>
            <a className="brand" href="#top">{P.name}</a>
            <ul>
              {["about", "skills", "projects", "experience", "education", "certifications", "contact"].map((id) => (
                <li key={id}><a href={`#${id}`}>{id[0].toUpperCase() + id.slice(1)}</a></li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="wrap hero-inner">
            <div className="hero-text">
              <span className="status"><span className="dot" />Open to entry-level AI/ML roles</span>
              <p className="kicker">{P.kicker}</p>
              <h1>{P.headline}</h1>
              <p className="lead">{P.intro}</p>
              <div className="cta">
                <a className="btn primary" href="#projects">View Projects</a>
                <a className="btn ghost" href={P.cv} download>Download CV</a>
                <a className="btn ghost" href={P.github}>GitHub</a>
                <a className="btn ghost" href={P.linkedin}>LinkedIn</a>
              </div>
              <ul className="stats">
                <li><b>{P.cgpa}/4.00</b><span>CGPA</span></li>
                <li><b>{PROJECTS.length}</b><span>Projects</span></li>
                <li><b>RAG · NLP</b><span>Focus areas</span></li>
              </ul>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orb" />
              <div className="ring" />
              <div className="mono">SB</div>
            </div>
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <h2>About me</h2>
            <div className="about">
              <div>{P.about.map((t) => <p key={t}>{t}</p>)}</div>
              <ul className="facts">
                <li><b>{P.degree}</b><span>{P.university}, {P.graduated}, CGPA {P.cgpa}</span></li>
                <li><b>Looking for</b><span>{P.looking}</span></li>
                <li><b>Based in</b><span>{P.location}</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <h2>Skills</h2>
            <div className="skills">
              {Object.entries(SKILLS).map(([group, items]) => (
                <div key={group}><h3>{group}</h3><Chips items={items} /></div>
              ))}
            </div>
            <h3 style={{ margin: "36px 0 12px", fontSize: "1.05rem" }}>Interests &amp; currently exploring</h3>
            <Chips items={LEARNING} />
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <h2>Projects</h2>
            <div className="catnav">
              {CATEGORIES.map((c) => <a key={c.id} href={`#cat-${c.id}`}>{c.name}</a>)}
            </div>
            {CATEGORIES.map((c) => {
              const list = PROJECTS.filter((p) => p.cat === c.id);
              return (
                <div className="cat" id={`cat-${c.id}`} key={c.id}>
                  <h3>{c.name}</h3>
                  <p>{c.blurb}</p>
                  {list.length === 0
                    ? <div className="empty">New projects will be added here as I build them.</div>
                    : <div className="grid">{list.map((p) => <ProjectCard key={p.title} p={p} />)}</div>}
                </div>
              );
            })}
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <h2>Experience</h2>
            <div className="tl">
              {EXPERIENCE.map((j) => (
                <div key={j.role} style={{ marginBottom: 28 }}>
                  <h3>{j.role}</h3>
                  <p className="when"><Rich text={j.when} /></p>
                  <ul>{j.points.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>
                  {j.link && <p className="links"><a href={j.link}>View projects</a></p>}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="education">
          <div className="wrap">
            <h2>Education</h2>
            <div className="tl">
              <h3>{P.university}</h3>
              <p className="when">{P.degree} | Graduated {P.graduated} | CGPA {P.cgpa}</p>
              <p><b>Relevant coursework:</b> {P.coursework}</p>
              <p><b>Final-year project:</b> HakimAI, an AI-powered medicinal plant information and recommendation app for Gilgit-Baltistan.</p>
            </div>
          </div>
        </section>

        <section id="certifications">
          <div className="wrap">
            <h2>Certifications</h2>
            <ul className="certs">
              {CERTIFICATIONS.map((c) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        </section>

        <section id="contact">
          <div className="wrap contact">
            <h2>Contact</h2>
            <p>I'm currently looking for entry-level opportunities in AI/ML, Data Science, Python, and AI Engineering, as well as practical freelance projects.</p>
            {P.email
              ? <a className="btn primary" href={`mailto:${P.email}`}>Email me</a>
              : <a className="btn primary" href="#contact">Email <span className="todo">[add email]</span></a>}
            <a className="btn ghost" href={`tel:${P.phone.replace(/[^+\d]/g, "")}`}>Call</a>
            <a className="btn ghost" href={P.linkedin}>LinkedIn</a>
            <a className="btn ghost" href={P.github}>GitHub</a>
            <a className="btn ghost" href={P.cv} download>Download CV</a>
          </div>
        </section>
      </main>
      <footer><div className="wrap">{P.name} | {P.location}</div></footer>
    </>
  );
}

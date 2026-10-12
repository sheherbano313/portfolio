import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import { CATEGORIES, CERTIFICATIONS, EXPERIENCE, LEARNING, PROFILE, PROJECTS, SEO, SKILLS, SOCIALS } from "./data";
import type { Project, Seo } from "./types";

const SECTIONS = ["about", "skills", "projects", "experience", "education", "certifications", "contact"];

/** Theme: defaults to dark, remembers a manual choice. */
function getInitialTheme(): "light" | "dark" {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return "dark";
}

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  const toggle = () =>
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("theme", next);
      return next;
    });
  return { theme, toggle };
}

/** Highlights the nav link for whichever section is at the viewport centre. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-50% 0px -50% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, [ids]);
  return active;
}

/** Hides a link while its target file (e.g. cv.pdf) does not exist. */
function useFileExists(url: string) {
  const [exists, setExists] = useState(false);
  useEffect(() => {
    let live = true;
    fetch(url, { method: "HEAD" })
      .then((r) => {
        const type = r.headers.get("content-type") ?? "";
        if (live) setExists(r.ok && !type.includes("text/html"));
      })
      .catch(() => live && setExists(false));
    return () => {
      live = false;
    };
  }, [url]);
  return exists;
}

/** Keeps canonical + social meta tags in sync with the values in data.ts. */
function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function useSeo(seo: Seo) {
  useEffect(() => {
    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = seo.url;
    setMeta("property", "og:url", seo.url);
    setMeta("property", "og:image", seo.ogImage);
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:image", seo.ogImage);
  }, [seo]);
}

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
      {p.problem && <p className="pm"><b>Problem:</b> <Rich text={p.problem} /></p>}
      {p.approach && <p className="pm"><b>Approach:</b> <Rich text={p.approach} /></p>}
      {p.result && <p className="pm"><b>Result:</b> <Rich text={p.result} /></p>}
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
  const { theme, toggle } = useTheme();
  const active = useActiveSection(SECTIONS);
  const hasCv = useFileExists(P.cv);
  useSeo(SEO);
  return (
    <>
      <header>
        <div className="wrap">
          <nav>
            <a className="brand" href="#top">{P.name}</a>
            <div className="nav-right">
              <ul>
                {SECTIONS.map((id) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={active === id ? "active" : undefined}
                      aria-current={active === id ? "true" : undefined}
                    >
                      {id[0].toUpperCase() + id.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
              <button
                className="theme-toggle"
                type="button"
                onClick={toggle}
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
                  </svg>
                )}
              </button>
            </div>
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
                <a className="btn ghost" href="#contact">Contact</a>
                {hasCv && <a className="btn ghost" href={P.cv} download>Download CV</a>}
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
            {hasCv && <a className="btn ghost" href={P.cv} download>Download CV</a>}
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap footer-inner">
          <p>{P.name} | {P.location}</p>
          <ul className="socials">
            {SOCIALS.map((s) => (
              <li key={s.label}><a href={s.url}>{s.label}</a></li>
            ))}
          </ul>
        </div>
      </footer>
      <Analytics />
    </>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeProvider';

const experience = [
  { role: 'Software Engineer', company: 'Talendy · Tech Japan', period: 'Jun 2026 — Present', detail: 'Building stateful AI services with FastAPI, PostgreSQL checkpoints, deterministic safety paths, PII redaction, Redis, Celery, and Docker.' },
  { role: 'Software Engineering Intern', company: 'Akatsuki AI Technologies', period: 'Jan — May 2026', detail: 'Built provider-agnostic streaming integrations and retrieval infrastructure, cutting query cost by 80% while serving about 8,200 users across 23,500 sessions.' },
  { role: 'ML Engineering Intern', company: 'AI Talent Force · acquired by Akatsuki', period: 'Oct — Dec 2025', detail: 'Built a real-time backend that turns streamed PCM audio into 30 FPS lip-synced video with GPU inference, WebSocket control, and WebRTC delivery.' },
  { role: 'AEH Intern', company: 'Accenture', period: 'May — Jul 2025', detail: 'Built a computer-vision workflow for industrial gauge readings, reaching 91.6% OCR accuracy across 500+ daily documents.' },
];

const capabilities = [
  ['Languages', 'Python · C++ · JavaScript · SQL'],
  ['Backend', 'FastAPI · Django REST · WebSocket · WebRTC'],
  ['Systems', 'Linux · Docker · CI/CD · Async I/O'],
  ['Data', 'MongoDB · PostgreSQL · GCP'],
];

export default function Home() {
  const { theme } = useTheme();
  const atlas = theme === 'system';
  const studio = theme === 'studio';

  return (
    <div className="portfolio-home">
      <section className="portfolio-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <h1 id="hero-title">I build systems that stay fast when the problem gets real.</h1>
          <p className="hero-intro">I’m Anand Jaiswal, a software engineer and IIIT Jabalpur computer science graduate. I build backend systems and applied AI products across agent workflows, real-time media, and developer tooling.</p>
          <div className="hero-actions">
            <Link className="primary-action" href="/projects">Explore selected work</Link>
            <Link className="text-action" href="/blog">Read blogs <span aria-hidden="true">→</span></Link>
          </div>
        </div>

        <aside className="studio-stage" aria-label="A kinetic reel of Anand's work">
          <div className="studio-stage-meta"><span>ANAND / WORKING REEL</span><span>2026</span></div>
          <div className="studio-window">
            <div className="studio-playhead" aria-hidden="true" />
            <div className="studio-reel">
              <span>BUILD</span><span>FAST</span><span>THINK</span><span>DEEP</span><span>SHIP</span>
              <span aria-hidden="true">BUILD</span><span aria-hidden="true">FAST</span><span aria-hidden="true">THINK</span><span aria-hidden="true">DEEP</span><span aria-hidden="true">SHIP</span>
            </div>
          </div>
          <nav className="studio-cuts" aria-label="Jump into Anand's portfolio">
            <Link href="/projects"><span>Selected work</span><strong>AI review and finance tools</strong></Link>
            <Link href="/blog"><span>Blogs</span><strong>Browse by date or topic</strong></Link>
            <Link href="/about"><span>About Anand</span><strong>Focus and direction</strong></Link>
          </nav>
        </aside>

        <aside className="evidence-rail" aria-label="Profile evidence">
          <div className="portrait-frame"><Image src="/images/self2_local.jpg" alt="Anand Jaiswal" fill priority sizes="(max-width: 800px) 100vw, 320px" /></div>
          <dl>
            <div><dt>Focus</dt><dd>Backend · AI · Systems</dd></div>
            <div><dt>Education</dt><dd>B.Tech CSE · Graduated 2026</dd></div>
            <div><dt>Proof</dt><dd>1,000+ algorithmic problems</dd></div>
            <div><dt>Recognition</dt><dd>IIT Roorkee ML winner</dd></div>
          </dl>
          <div className="profile-links">
            <a href="https://github.com/Dev-an01" target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/abstractanand/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
          </div>
        </aside>
      </section>

      <section className="work-strip" aria-labelledby="selected-work">
        <div className="section-heading"><h2 id="selected-work">Selected work</h2><p>Specific systems, the constraints behind them, and what changed.</p></div>
        <Link className="featured-project" href="/projects/ai-pr-review-agent">
          <span className="project-kind">Developer tooling · Applied AI</span>
          <strong>AI PR Review Agent</strong>
          <p>Four specialist reviewers inspect security, quality, tests, and documentation in parallel, then merge traceable findings behind a confidence-based human approval gate.</p>
          <span className="project-link">Open case study <span aria-hidden="true">↗</span></span>
        </Link>
      </section>

      <section className="experience-layout" aria-labelledby="experience-title">
        <div className="section-heading sticky-heading"><h2 id="experience-title">Experience</h2><p>Recent work where latency, accuracy, and operating constraints mattered.</p></div>
        <div className="experience-list">
          {experience.map(item => <article key={item.company}><p className="experience-period">{item.period}</p><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p>{item.detail}</p></article>)}
        </div>
      </section>

      <section className="capability-field" aria-labelledby="capability-title">
        <div><h2 id="capability-title">Working range</h2><p>I’m strongest where backend systems, applied intelligence, and performance-sensitive delivery meet.</p></div>
        <dl>{capabilities.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
      </section>

      <section className="closing-note">
        <h2>{studio ? 'Make the difficult work visible.' : atlas ? 'Follow the evidence.' : 'Let’s build the difficult part.'}</h2>
        <p>For opportunities, technical collaboration, or a conversation about systems engineering.</p>
        <a className="primary-action" href="mailto:abstractanand@gmail.com">Start a conversation</a>
      </section>
    </div>
  );
}

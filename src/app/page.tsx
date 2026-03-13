'use client';

import Image from "next/image";
import { useState, useEffect, Fragment } from "react";
import { useTheme } from "@/components/ThemeProvider";

// ─── Icons ────────────────────────────────────────────────────────────────────

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const CodeforcesIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M4.5 7.5C5.328 7.5 6 8.172 6 9v10.5c0 .828-.672 1.5-1.5 1.5h-3C.672 21 0 20.328 0 19.5V9c0-.828.672-1.5 1.5-1.5h3zm9-4.5c.828 0 1.5.672 1.5 1.5V19.5c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5V4.5C9 3.672 9.672 3 10.5 3h3zm9 7.5c.828 0 1.5.672 1.5 1.5v9c0 .828-.672 1.5-1.5 1.5h-3c-.828 0-1.5-.672-1.5-1.5v-9c0-.828.672-1.5 1.5-1.5h3z" />
  </svg>
);

const LeetcodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
  </svg>
);

// ─── Data ─────────────────────────────────────────────────────────────────────

const TECH_STACK = [
  { category: 'Languages',  items: ['Python', 'C++', 'JavaScript', 'SQL'] },
  { category: 'Frameworks', items: ['FastAPI', 'Django REST', 'React'] },
  { category: 'DevOps',     items: ['Git', 'Docker', 'Linux', 'CI/CD'] },
  { category: 'Backend',    items: ['REST APIs', 'WebSocket', 'WebRTC', 'Async I/O'] },
  { category: 'Cloud & DB', items: ['GCP', 'MongoDB', 'PostgreSQL'] },
];

const BASE_SOCIALS = [
  { name: 'GitHub',     url: 'https://github.com/Sterben230703',           Icon: GithubIcon,     sub: 'Sterben230703'  },
  { name: 'LinkedIn',   url: 'https://www.linkedin.com/in/abstractanand/', Icon: LinkedinIcon,   sub: 'abstractanand'  },
  { name: 'Codeforces', url: 'https://codeforces.com/profile/-Sterben-',  Icon: CodeforcesIcon, sub: 'Expert · …'     },
  { name: 'LeetCode',   url: 'https://leetcode.com/u/_Sterben',           Icon: LeetcodeIcon,   sub: 'Knight · …'     },
];

const EXPERIENCE = [
  {
    role: 'Software Engineering Intern',
    company: 'AI Talent Force',
    type: 'Remote',
    period: 'Oct 2025 – Present',
    accent: '#00f2ff',
    bullets: [
      'Built a real-time backend system converting streamed PCM audio into 30 FPS lip-synced video using GPU-accelerated inference.',
      'Designed a dual-protocol communication layer — WebSocket for audio/control and WebRTC for video — handling signaling, session lifecycle, and low-latency delivery.',
      'Engineered a custom audio–video sync pipeline with independent clocks, timestamp alignment, and bounded in-memory buffering for frame-accurate playback.',
      'Implemented interruption handling and fault recovery by coordinating threads and clearing in-memory queues to safely reset sessions without service restarts.',
    ],
    tags: ['Python', 'WebSocket', 'WebRTC', 'GPU', 'Async I/O'],
  },
  {
    role: 'AEH Intern',
    company: 'Accenture',
    type: 'Onsite',
    period: 'May 2025 – Jul 2025',
    accent: '#ff8c00',
    bullets: [
      'Built an Android-based automation system for industrial gauge readings using computer vision, reducing manual processing effort by 60–70%.',
      'Curated datasets and fine-tuned models to raise OCR accuracy to 91.6% across 500+ daily documents.',
      'Designed backend workflows to validate, aggregate, and serve extracted data, cutting document turnaround time by over 50%.',
    ],
    tags: ['Computer Vision', 'Android', 'OCR', 'Python', 'Backend'],
  },
];

const ACHIEVEMENTS = [
  {
    title: 'IIT Roorkee ML Competition – ThermaOracle',
    desc: 'Winner among 120 teams. Achieved 3.9 RMSE, outperforming the second-best model by 10%.',
    icon: '🏆',
  },
  {
    title: 'Patent Co-Inventor – Wearable Asthma Diagnostic System',
    desc: 'Published by Indian Patent Office (App. No. 202521069749 A, Aug 2025).',
    icon: '📄',
  },
];

const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_LABELS = ['Mon', '', 'Wed', '', 'Fri', '', 'Sun'];

const CELL      = 14;
const GAP       = 3;
const COL       = CELL + GAP;
const MONTH_GAP = 12;

// ─── Heatmap helpers ──────────────────────────────────────────────────────────

type HeatCell = { level: number; date: Date; count: number };

function buildEmptyHeatmap(): HeatCell[][] {
  const today = new Date();
  const start = new Date(today);
  start.setDate(start.getDate() - 364);
  const day = start.getDay();
  start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));

  const weeks: HeatCell[][] = [];
  for (let w = 0; w < 53; w++) {
    const week: HeatCell[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(start);
      date.setDate(start.getDate() + w * 7 + d);
      const isFuture = date.getTime() > today.getTime();
      week.push({ level: isFuture ? -1 : 0, date, count: 0 });
    }
    weeks.push(week);
  }
  return weeks;
}

function mergeIntoHeatmap(
  skeleton: HeatCell[][],
  counts: Record<string, number>,
): HeatCell[][] {
  // Collect all non-zero values to compute quantile thresholds
  const nonZero = Object.values(counts).filter(c => c > 0).sort((a, b) => a - b);
  const q = (p: number) => nonZero[Math.floor(nonZero.length * p)] ?? 1;
  const t1 = q(0.25), t2 = q(0.50), t3 = q(0.75);

  return skeleton.map(week =>
    week.map(cell => {
      if (cell.level < 0) return cell; // future
      const key = cell.date.toISOString().slice(0, 10);
      const count = counts[key] ?? 0;
      const level = count === 0 ? 0 : count <= t1 ? 1 : count <= t2 ? 2 : count <= t3 ? 3 : 4;
      return { ...cell, count, level };
    })
  );
}

function heatColor(isSystem: boolean, level: number): string {
  if (level < 0) return 'transparent';
  if (isSystem) return ['#e5e5e0', '#fed7aa', '#fb923c', '#ea580c', '#9a3412'][level] ?? '#e5e5e0';
  return ['#2d3138', '#1e3a2e', '#2d6a4f', '#52b788', '#95d5b2'][level] ?? '#2d3138';
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ label, style }: { label: string; style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '0.6rem', ...style }}>
      <span style={{
        fontSize: '0.7rem', fontWeight: 700, fontFamily: 'JetBrains Mono, monospace',
        color: 'var(--text-color)', opacity: 0.55, whiteSpace: 'nowrap', letterSpacing: '0.04em',
      }}>
        {label}
      </span>
      <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--text-color)', opacity: 0.15 }} />
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function Home() {
  const { theme } = useTheme();
  const isSystem = theme === 'system';

  const [heatmap, setHeatmap]         = useState<HeatCell[][]>([]);
  const [monthLabels, setMonthLabels] = useState<{ label: string; col: number; startDay: number }[]>([]);
  const [heatLoading, setHeatLoading] = useState(true);
  const [socials, setSocials]         = useState(BASE_SOCIALS);
  const [showScrollHint, setShowScrollHint] = useState(false);

  function computeMonthLabels(data: HeatCell[][]) {
    const labels: { label: string; col: number; startDay: number }[] = [];
    let lastMonth = -1;
    data.forEach((week, wi) => {
      if (wi === 0) {
        const m = week[0].date.getMonth();
        labels.push({ label: MONTHS[m], col: 0, startDay: 0 });
        lastMonth = m;
        return;
      }
      for (let di = 0; di < 7; di++) {
        const m = week[di].date.getMonth();
        if (m !== lastMonth) {
          labels.push({ label: MONTHS[m], col: wi, startDay: di });
          lastMonth = m;
          break;
        }
      }
    });
    return labels;
  }

  useEffect(() => {
    const skeleton = buildEmptyHeatmap();
    setHeatmap(skeleton);
    setMonthLabels(computeMonthLabels(skeleton));

    Promise.all([
      fetch('/api/heatmap/github').then(r => r.ok ? r.json() : {}),
      fetch('/api/heatmap/codeforces').then(r => r.ok ? r.json() : {}),
      fetch('/api/heatmap/leetcode').then(r => r.ok ? r.json() : {}),
      fetch('/api/heatmap/site').then(r => r.ok ? r.json() : {}),
    ]).then(([gh, cf, lc, site]) => {
      // OR: a day is active if ANY platform has activity.
      // Count = max across platforms so a heavy CF day doesn't drown a light GH day.
      const merged: Record<string, number> = {};
      for (const map of [gh, cf, lc, site] as Record<string, number>[]) {
        for (const [date, count] of Object.entries(map)) {
          merged[date] = Math.max(merged[date] ?? 0, count);
        }
      }
      const filled = mergeIntoHeatmap(skeleton, merged);
      setHeatmap(filled);
      setHeatLoading(false);
    }).catch(() => setHeatLoading(false));

    fetch('/api/ratings').then(r => r.ok ? r.json() : null).then(data => {
      if (!data) return;
      setSocials(prev => prev.map(s => {
        if (s.name === 'Codeforces' && data.codeforces)
          return { ...s, sub: `${data.codeforces.title} · ${data.codeforces.rating}` };
        if (s.name === 'LeetCode' && data.leetcode)
          return { ...s, sub: `${data.leetcode.title} · ${data.leetcode.rating}` };
        return s;
      }));
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setShowScrollHint(true);
    const scroller = document.querySelector('main') as HTMLElement | null;
    const target = scroller ?? window;
    const hide = () => {
      const pos = scroller ? scroller.scrollTop : window.scrollY;
      if (pos > 80) {
        setShowScrollHint(false);
        target.removeEventListener('scroll', hide);
      }
    };
    target.addEventListener('scroll', hide, { passive: true });
    return () => target.removeEventListener('scroll', hide);
  }, []);

  const mono = 'JetBrains Mono, monospace';

  // Classic dark-card palette (matches project-card-classic / classic-blog-card)
  const cl = {
    card:    '#25282c',
    cardAlt: '#1a1d23',
    border:  'rgba(255,255,255,0.07)',
    text:    '#d1d5db',
    muted:   '#9ca3af',
    heading: '#ffffff',
    // primary accent (cyan — AI / real-time systems)
    ai:      '#00f2ff',
    // secondary accent (orange — firmware / CV)
    fw:      '#ff8c00',
  };

  // Returns tinted badge style for classic theme, matching reference HTML
  const clBadge = (accent: string): React.CSSProperties => ({
    padding: '1px 8px',
    fontSize: '0.62rem',
    fontWeight: 700,
    fontFamily: mono,
    backgroundColor: `${accent}18`,
    color: accent,
    border: `1px solid ${accent}44`,
    borderRadius: 4,
  });


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      {/* ════════════════════════════════════════════════════════════════════════
          ABOVE THE FOLD — fills exactly one viewport height
      ════════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          height: 'calc(100vh - 4rem)',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          overflow: 'hidden',
          paddingBottom: '7rem',
        }}
      >
        {/* ── Profile ───────────────────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, gap: '0.5rem' }}>
          <div
            style={{
              width: 110,
              height: 110,
              overflow: 'hidden',
              border: isSystem ? '3px solid #000' : '3px solid var(--card-border)',
              borderRadius: isSystem ? 0 : '50%',
              boxShadow: isSystem ? '5px 5px 0 #000' : '0 4px 16px var(--card-shadow)',
              flexShrink: 0,
            }}
          >
            <Image src="/images/self2.jpg" alt="Anand Jaiswal" width={110} height={110}
              style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </div>

          <h1 style={{
            fontSize: '1.75rem', fontWeight: 800, margin: 0, fontFamily: mono, textAlign: 'center',
            color: 'var(--text-heading)', letterSpacing: '-0.01em',
          }}>
            Anand Jaiswal
          </h1>

          <p style={{ margin: 0, fontSize: '0.78rem', fontFamily: mono, textAlign: 'center',
            color: 'var(--text-color)', opacity: 0.6 }}>
            B.Tech CSE · IIIT Jabalpur (2022–2026) · CPI: 8.1
          </p>

          <p style={{ margin: 0, fontSize: '0.85rem', textAlign: 'center', fontFamily: mono,
            color: 'var(--text-color)', opacity: 0.85 }}>
            Competitive Programmer · Backend Engineer · AI Enthusiast
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', justifyContent: 'center', marginTop: '0.15rem' }}>
            {socials.map(({ name, url, Icon, sub }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                  padding: '0.22rem 0.65rem', fontSize: '0.7rem', fontWeight: 700,
                  textDecoration: 'none',
                  border: isSystem ? '2px solid #000' : `1px solid ${cl.border}`,
                  borderRadius: isSystem ? 0 : '0.3rem',
                  color: isSystem ? 'var(--text-heading)' : cl.text,
                  backgroundColor: isSystem ? 'var(--card-bg)' : cl.card,
                  boxShadow: isSystem ? '2px 2px 0 #000' : '0 2px 8px rgba(0,0,0,0.3)',
                  fontFamily: mono,
                }}>
                <Icon />
                <span>{name}</span>
                <span style={{ opacity: 0.4, fontWeight: 400, fontSize: '0.62rem' }}>· {sub}</span>
              </a>
            ))}
          </div>
        </div>

        {/* ── About Me ──────────────────────────────────────────────────────── */}
        <div style={{ marginTop: '1rem', flexShrink: 0, width: '100%', maxWidth: 740 }}>
          <SectionLabel label="About Me" />
          <p style={{
            margin: 0, fontSize: '0.78rem', lineHeight: 1.75, fontFamily: mono, textAlign: 'center',
            color: isSystem ? 'var(--text-color)' : cl.text,
            opacity: isSystem ? 0.82 : 1,
            borderTop: isSystem ? '1px dashed #000' : `1px solid ${cl.border}`,
            borderBottom: isSystem ? '1px dashed #000' : `1px solid ${cl.border}`,
            backgroundColor: isSystem ? 'transparent' : cl.cardAlt,
            padding: '0.6rem 0.75rem',
            borderRadius: isSystem ? 0 : '0.375rem',
          }}>
            Final-year CS undergrad at IIIT Jabalpur building fast backend systems and solving hard algorithmic problems.
            Competitive programmer with 1000+ problems solved across Codeforces and LeetCode.
            IIT Roorkee ML competition winner · Patent co-inventor (IPO, Aug 2025).
          </p>
        </div>

        {/* ── Tech Stack ────────────────────────────────────────────────────── */}
        <div style={{ marginTop: '1rem', flexShrink: 0, width: '100%', maxWidth: 740 }}>
          <SectionLabel label="Tech Stack" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', alignItems: 'center' }}>
            {TECH_STACK.map(({ category, items }) => (
              <div key={category} style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.62rem', minWidth: '5.5rem', textAlign: 'right', opacity: 0.38, flexShrink: 0, fontWeight: 600, fontFamily: mono }}>
                  {category}
                </span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.22rem' }}>
                  {items.map(item => (
                    <span key={item}
                      style={isSystem ? {
                        padding: '2px 9px', fontSize: '0.65rem', fontWeight: 700, fontFamily: mono,
                        backgroundColor: '#000', color: '#00ff41',
                        border: '1px solid #000', borderRadius: 0,
                      } : clBadge(cl.ai)}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Activity Heatmap ──────────────────────────────────────────────── */}
        <div style={{ marginTop: 'auto', paddingTop: '0.25rem', flexShrink: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SectionLabel label={heatLoading ? 'Activity Heatmap — loading…' : 'Activity Heatmap (GitHub · Codeforces · LeetCode · Site)'} style={{ marginBottom: '0.25rem' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.58rem', opacity: 0.35, fontFamily: mono, marginBottom: '0.4rem' }}>
            <span>less</span>
            {[0,1,2,3,4].map(l => (
              <div key={l} style={{ width: CELL, height: CELL, backgroundColor: heatColor(isSystem, l),
                border: isSystem ? '1px solid #000' : '1px solid rgba(255,255,255,0.06)',
                borderRadius: isSystem ? 0 : 3 }} />
            ))}
            <span>more</span>
          </div>

          <div style={{ overflowX: 'auto', overflowY: 'hidden', maxWidth: '100%' }}>
            <div style={{ position: 'relative', height: 15, marginLeft: 30 + GAP, marginBottom: 3 }}>
              {monthLabels.map(({ label, col, startDay }, idx) => {
                // Each month boundary (col > 0) adds MONTH_GAP.
                // Each boundary with startDay > 0 also adds an extra tail column (COL).
                const gapsUpToThis  = monthLabels.slice(0, idx + 1).filter(m => m.col > 0).length;
                const tailsUpToThis = monthLabels.slice(0, idx + 1).filter(m => m.col > 0 && m.startDay > 0).length;
                const left = col * COL + gapsUpToThis * MONTH_GAP + tailsUpToThis * COL;
                return (
                  <span key={`${label}-${col}`}
                    style={{ position: 'absolute', left, fontSize: '0.6rem', opacity: 0.38,
                      whiteSpace: 'nowrap', fontFamily: mono, lineHeight: '15px' }}>
                    {label}
                  </span>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: GAP, alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, flexShrink: 0, width: 30 }}>
                {DAY_LABELS.map((d, i) => (
                  <div key={i} style={{ height: CELL, fontSize: '0.55rem', opacity: 0.3,
                    lineHeight: `${CELL}px`, textAlign: 'right', paddingRight: 4, fontFamily: mono }}>
                    {d}
                  </div>
                ))}
              </div>
              {heatmap.map((week, wi) => {
                const monthInfo = monthLabels.find(m => m.col === wi);
                const isMonthStart = wi > 0 && !!monthInfo;
                const startDay = isMonthStart ? (monthInfo?.startDay ?? 0) : 0;

                const mkCell = (cell: HeatCell, visible: boolean, key: number) => (
                  <div key={key}
                    title={visible && cell.level >= 0 ? `${cell.count} contributions · ${cell.date.toDateString()}` : undefined}
                    style={{
                      width: CELL, height: CELL,
                      backgroundColor: visible ? heatColor(isSystem, cell.level) : 'transparent',
                      border: (!visible || cell.level < 0) ? 'none'
                        : isSystem ? '1px solid rgba(0,0,0,0.25)' : '1px solid rgba(255,255,255,0.05)',
                      borderRadius: isSystem ? 0 : 3,
                    }} />
                );

                // Month starts mid-week: render tail (old month end) + head (new month start)
                if (isMonthStart && startDay > 0) {
                  return (
                    <Fragment key={wi}>
                      {/* Tail: last days of the old month (before the 1st) */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, flexShrink: 0 }}>
                        {week.map((cell, di) => mkCell(cell, di < startDay, di))}
                      </div>
                      {/* Head: first days of the new month, gap before */}
                      <div style={{ display: 'flex', flexDirection: 'column', gap: GAP, flexShrink: 0, marginLeft: MONTH_GAP }}>
                        {week.map((cell, di) => mkCell(cell, di >= startDay, di))}
                      </div>
                    </Fragment>
                  );
                }

                // Month starts exactly on Monday (startDay=0) or regular week
                return (
                  <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: GAP, flexShrink: 0, marginLeft: isMonthStart ? MONTH_GAP : 0 }}>
                    {week.map((cell, di) => mkCell(cell, cell.level >= 0, di))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* floating scroll hint — rendered at root level below */}
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          BELOW THE FOLD — experience, revealed on scroll
      ════════════════════════════════════════════════════════════════════════ */}
      <div id="experience" style={{ width: '100%', maxWidth: 740, paddingTop: '3rem', paddingBottom: '3rem' }}>

        {/* ── Experience ────────────────────────────────────────────────────── */}
        <SectionLabel label="Experience" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {EXPERIENCE.map((exp, i) => (
            <div key={i}
              style={{
                border: isSystem ? '2px solid #000' : `1px solid ${cl.border}`,
                borderRadius: isSystem ? 0 : '0.5rem',
                backgroundColor: isSystem ? 'var(--card-bg)' : cl.card,
                boxShadow: isSystem ? '4px 4px 0 #000' : '0 10px 25px rgba(0,0,0,0.25)',
                overflow: 'hidden',
              }}>

              {/* Top accent bar (classic only) */}
              {!isSystem && (
                <div style={{ height: 5, width: '100%', backgroundColor: exp.accent }} />
              )}

              {/* Card header */}
              <div style={{
                padding: '0.75rem 1.25rem',
                borderBottom: isSystem ? '2px solid #000' : `1px solid ${cl.border}`,
                backgroundColor: isSystem ? '#f5f5f0' : cl.cardAlt,
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.25rem',
              }}>
                <div>
                  <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 800, fontFamily: mono,
                    color: isSystem ? 'var(--text-heading)' : cl.heading }}>
                    {exp.role}
                  </p>
                  <p style={{ margin: '0.1rem 0 0 0', fontSize: '0.75rem', fontWeight: 700, fontFamily: mono,
                    color: isSystem ? 'var(--accent-primary)' : exp.accent }}>
                    {exp.company}
                    <span style={{ fontWeight: 400, marginLeft: '0.4rem',
                      color: isSystem ? 'var(--text-color)' : cl.muted }}>
                      · {exp.type}
                    </span>
                  </p>
                </div>
                {/* Period badge — tinted to match card accent */}
                <span style={isSystem ? {
                  fontSize: '0.65rem', fontFamily: mono, fontWeight: 600, padding: '2px 8px',
                  border: '1px solid #000', borderRadius: 0, whiteSpace: 'nowrap',
                  color: 'var(--text-color)', backgroundColor: 'transparent',
                } : { ...clBadge(exp.accent), whiteSpace: 'nowrap' }}>
                  {exp.period}
                </span>
              </div>

              {/* Bullets */}
              <div style={{ padding: '0.9rem 1.25rem' }}>
                <ul style={{ margin: 0, paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                  {exp.bullets.map((b, bi) => (
                    <li key={bi} style={{ fontSize: '0.75rem', lineHeight: 1.65, fontFamily: mono,
                      color: isSystem ? 'var(--text-color)' : cl.text }}>
                      {b}
                    </li>
                  ))}
                </ul>

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem', marginTop: '0.85rem' }}>
                  {exp.tags.map(tag => (
                    <span key={tag}
                      style={isSystem ? {
                        padding: '1px 8px', fontSize: '0.62rem', fontWeight: 700, fontFamily: mono,
                        backgroundColor: '#000', color: '#00ff41',
                        border: '1px solid #000', borderRadius: 0,
                      } : clBadge(exp.accent)}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Achievements ──────────────────────────────────────────────────── */}
        <SectionLabel label="Achievements" style={{ marginTop: '2rem' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ACHIEVEMENTS.map((a, i) => {
            const achAccent = i === 0 ? cl.fw : cl.ai;
            return (
              <div key={i}
                style={{
                  border: isSystem ? '2px solid #000' : `1px solid ${cl.border}`,
                  borderRadius: isSystem ? 0 : '0.5rem',
                  backgroundColor: isSystem ? 'var(--card-bg)' : cl.card,
                  boxShadow: isSystem ? '3px 3px 0 #000' : '0 4px 12px rgba(0,0,0,0.2)',
                  overflow: 'hidden',
                }}>
                {!isSystem && <div style={{ height: 4, width: '100%', backgroundColor: achAccent }} />}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '0.85rem 1.1rem' }}>
                  <span style={{ fontSize: '1.2rem', flexShrink: 0, lineHeight: 1 }}>{a.icon}</span>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.8rem', fontWeight: 800, fontFamily: mono,
                      color: isSystem ? 'var(--text-heading)' : cl.heading }}>
                      {a.title}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.73rem', fontFamily: mono, lineHeight: 1.6,
                      color: isSystem ? 'var(--text-color)' : cl.muted }}>
                      {a.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ── Floating scroll hint ──────────────────────────────────────────── */}
      {showScrollHint && (
        <div
          onClick={() => {
            setShowScrollHint(false);
            document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
          }}
          style={{
            position: 'fixed',
            bottom: '1rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 50,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.3rem',
            cursor: 'pointer',
            animation: 'fadeInUp 0.4s ease',
          }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1rem',
            borderRadius: isSystem ? 0 : '2rem',
            border: isSystem ? '2px solid #000' : '1px solid rgba(255,255,255,0.12)',
            backgroundColor: isSystem ? 'var(--card-bg)' : 'rgba(30,33,40,0.85)',
            backdropFilter: 'blur(8px)',
            boxShadow: isSystem ? '3px 3px 0 #000' : '0 4px 20px rgba(0,0,0,0.4)',
            fontSize: '0.7rem',
            fontFamily: mono,
            color: 'var(--text-color)',
            opacity: 0.9,
            letterSpacing: '0.04em',
          }}>
            <span>scroll for experience</span>
          </div>
          <div style={{
            fontSize: '1rem',
            animation: 'bounce 1.2s ease infinite',
            color: 'var(--text-color)',
            opacity: 0.6,
          }}>↓</div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(5px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

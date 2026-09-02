'use client';

import { useTheme } from '@/components/ThemeProvider';

export default function AboutPage() {
  const { theme } = useTheme();
  return (
    <article className={`about-page${theme === 'studio' ? ' studio-detail studio-about' : ''}`}>
      <h1>About Anand</h1>
      <p>I&apos;m a software engineer and computer science graduate from IIIT Jabalpur, working at the point where dependable backend systems, applied AI, and developer tooling meet.</p>
      <p>I like problems with real constraints: latency budgets, imperfect input, concurrent sessions, difficult failure modes, or algorithms that need to hold up under pressure.</p>

      <h2>What I&apos;m working toward</h2>
      <ul>
        <li>Software engineering for performance-sensitive systems</li>
        <li>Competitive programming and algorithmic problem solving</li>
        <li>Applied artificial intelligence and machine learning</li>
        <li>Firmware, Linux, and lower-level systems work</li>
      </ul>

      <h2>What I&apos;m building now</h2>
      <p>AI PR Review Agent coordinates specialist reviewers for security, quality, tests, and documentation, with traceable findings and human approval for uncertain reviews. MoneyPlant is a Telegram-first personal finance and investment tracker with privacy-aware categorization, a correction window, analytics, and portfolio valuation.</p>

      <h2>Why I write</h2>
      <p>Private Learning Logs help me capture ideas while they are fresh. Public posts turn selected notes into clearer explanations that other technical readers can inspect, challenge, and reuse.</p>

      <h2>Beyond the screen</h2>
      <p>I&apos;m interested in solo travel, open-source work, personal projects, and communities that take craft and collaboration seriously.</p>
    </article>
  );
}

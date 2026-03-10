'use client';

import Link from 'next/link';
import { useTheme } from './ThemeProvider';

interface ProjectCardProps {
  slug: string;
  name: string;
  description: string;
  techStack: string[];
  image: string;
  featured: boolean;
  category?: string;
  github?: string;
  live?: string;
  index?: number;
}

/* ---- Color mappings ---- */

const SYSTEM_COLORS: Record<string, { bg: string; text: string; dot: string }> = {
  'AI':       { bg: '#00ff41', text: '#000', dot: '#00ff41' },
  'Firmware': { bg: '#ff6b00', text: '#000', dot: '#ff6b00' },
  'Systems':  { bg: '#0066ff', text: '#fff', dot: '#0066ff' },
  'Web':      { bg: '#0066ff', text: '#fff', dot: '#0066ff' },
};

const CLASSIC_COLORS: Record<string, { bar: string; tag: string }> = {
  'AI':       { bar: '#00f2ff', tag: '#00f2ff' },
  'Firmware': { bar: '#ff8c00', tag: '#ff8c00' },
  'Systems':  { bar: 'linear-gradient(to right, #00f2ff, #ff8c00)', tag: '#9ca3af' },
  'Web':      { bar: '#3b82f6', tag: '#3b82f6' },
};

/* ---- System theme card ---- */

function SystemCard({ slug, name, description, techStack, category, github, live, index }: ProjectCardProps) {
  const catStyle = SYSTEM_COLORS[category || ''] || { bg: '#e5e5e0', text: '#000', dot: '#000' };
  const moduleNum = String((index || 0) + 1).padStart(3, '0');

  return (
    <Link href={`/projects/${slug}`} className="project-card-system">
      <div className="project-card-terminal-header">
        <div style={{ display: 'flex', gap: '6px' }}>
          <span className="project-dot" style={{ backgroundColor: catStyle.dot }} />
          <span className="project-dot" />
          <span className="project-dot" />
        </div>
        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>MODULE_{moduleNum}</span>
      </div>

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {category && (
          <div style={{ marginBottom: '1rem' }}>
            <span className="project-tag-system" style={{ backgroundColor: catStyle.bg, color: catStyle.text }}>
              {category.toUpperCase()}
            </span>
          </div>
        )}

        <h3 className="project-title-system">{name.toUpperCase()}</h3>

        <p style={{ fontSize: '12px', lineHeight: 1.6, opacity: 0.8, marginBottom: '1.5rem', flexGrow: 1 }}>
          {description}
        </p>

        <div className="project-stats-system">
          {techStack.map((tech, i) => (
            <div key={tech}>+ {['STACK', 'LANG', 'TOOL', 'FW', 'DB', 'RT'][i] || 'MOD'}: {tech.toUpperCase()}</div>
          ))}
        </div>

        <div className="project-links-system">
          {github && <a href={github} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">::  GITHUB</a>}
          {live && <a href={live} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">::  DEMO</a>}
          {!github && !live && <span style={{ opacity: 0.4 }}>::  SOURCE_PENDING</span>}
        </div>
      </div>
    </Link>
  );
}

/* ---- Classic theme card ---- */

function ClassicCard({ slug, name, description, category, github, live }: ProjectCardProps) {
  const catStyle = CLASSIC_COLORS[category || ''] || { bar: '#6b7280', tag: '#6b7280' };
  const isGradient = catStyle.bar.includes('gradient');

  return (
    <Link href={`/projects/${slug}`} className="project-card-classic">
      {/* Top accent bar */}
      <div
        className="project-card-accent-bar"
        style={isGradient ? { backgroundImage: catStyle.bar } : { backgroundColor: catStyle.bar }}
      />

      <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Category tag */}
        {category && (
          <div style={{ marginBottom: '1rem' }}>
            <span className="project-tag-classic" style={{ color: catStyle.tag, borderColor: `${catStyle.tag}33` }}>
              {category.toUpperCase()}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="project-title-classic">{name}</h3>

        {/* Description */}
        <p className="project-desc-classic">
          {description}
        </p>

        {/* Links footer */}
        <div className="project-links-classic">
          {github && (
            <a href={github} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
              &lt;&gt; GITHUB
            </a>
          )}
          {live && (
            <a href={live} onClick={e => e.stopPropagation()} target="_blank" rel="noopener noreferrer">
              DEMO
            </a>
          )}
          {!github && !live && <span style={{ opacity: 0.4 }}>&lt;&gt; SOURCE</span>}
        </div>
      </div>
    </Link>
  );
}

/* ---- Exported component ---- */

export default function ProjectCard(props: ProjectCardProps) {
  const { theme } = useTheme();
  if (theme === 'system') return <SystemCard {...props} />;
  return <ClassicCard {...props} />;
}

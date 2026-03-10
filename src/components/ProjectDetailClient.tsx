'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { marked } from 'marked';
import { useAuth } from './AuthProvider';
import ProjectEditor from './ProjectEditor';

interface ProjectData {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  techStack: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const { isDevMode } = useAuth();
  const router = useRouter();
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProject = async () => {
      const res = await fetch('/api/projects');
      const data: ProjectData[] = await res.json();
      const found = data.find(p => p.slug === slug);
      setProject(found || null);
      setLoading(false);
    };
    fetchProject();
  }, [slug]);

  const handleUpdate = async (data: Record<string, unknown>) => {
    await fetch('/api/projects', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setEditing(false);
    const res = await fetch('/api/projects');
    const projects: ProjectData[] = await res.json();
    setProject(projects.find(p => p.slug === slug) || null);
  };

  if (loading) return <p>Loading...</p>;
  if (!project) return <p>Project not found.</p>;

  if (editing && isDevMode) {
    return (
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Edit Project</h1>
        <ProjectEditor initial={project} onSave={handleUpdate} onCancel={() => setEditing(false)} />
      </div>
    );
  }

  const html = project.longDescription ? marked.parse(project.longDescription) as string : '';

  return (
    <div>
      {isDevMode && (
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <button onClick={() => setEditing(true)} className="btn-primary" style={{ fontSize: '0.75rem' }}>Edit</button>
          <button onClick={() => router.push('/projects')} className="btn-primary" style={{ fontSize: '0.75rem', opacity: 0.7 }}>Back</button>
        </div>
      )}

      {project.image && (
        <img src={project.image} alt={project.name} style={{ width: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '0.5rem', marginBottom: '1rem' }} />
      )}

      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{project.name}</h1>
      <p style={{ marginBottom: '1rem', opacity: 0.8 }}>{project.description}</p>

      <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {project.techStack.map(tech => (
          <span key={tech} className="badge">{tech}</span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.75rem' }}>
            GitHub
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '0.75rem' }}>
            Live Demo
          </a>
        )}
      </div>

      {html && <article dangerouslySetInnerHTML={{ __html: html }} />}
    </div>
  );
}

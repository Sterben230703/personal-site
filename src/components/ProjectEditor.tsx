'use client';

import { useState } from 'react';

interface ProjectEditorProps {
  initial?: {
    slug: string;
    name: string;
    category?: string;
    description: string;
    longDescription: string;
    techStack: string[];
    image: string;
    github: string;
    live: string;
    featured: boolean;
  };
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export default function ProjectEditor({ initial, onSave, onCancel }: ProjectEditorProps) {
  const [name, setName] = useState(initial?.name || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [category, setCategory] = useState(initial?.category || 'Web');
  const [description, setDescription] = useState(initial?.description || '');
  const [longDescription, setLongDescription] = useState(initial?.longDescription || '');
  const [techStack, setTechStack] = useState(initial?.techStack?.join(', ') || '');
  const [image, setImage] = useState(initial?.image || '');
  const [github, setGithub] = useState(initial?.github || '');
  const [live, setLive] = useState(initial?.live || '');
  const [featured, setFeatured] = useState(initial?.featured || false);
  const [saving, setSaving] = useState(false);

  const handleNameChange = (value: string) => {
    setName(value);
    if (!initial) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      name,
      slug,
      category,
      description,
      longDescription,
      techStack: techStack.split(',').map(t => t.trim()).filter(Boolean),
      image,
      github,
      live,
      featured,
    });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Project Name</label>
          <input type="text" value={name} onChange={e => handleNameChange(e.target.value)} className="form-input" required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Slug</label>
          <input type="text" value={slug} onChange={e => setSlug(e.target.value)} className="form-input" required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="form-input">
            <option value="AI">AI</option>
            <option value="Firmware">Firmware</option>
            <option value="Systems">Systems</option>
            <option value="Web">Web</option>
          </select>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Short Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="form-input" rows={2} required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Full Description (Markdown)</label>
          <textarea value={longDescription} onChange={e => setLongDescription(e.target.value)} className="form-input" rows={8} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Tech Stack (comma-separated)</label>
          <input type="text" value={techStack} onChange={e => setTechStack(e.target.value)} className="form-input" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Image URL</label>
            <input type="text" value={image} onChange={e => setImage(e.target.value)} className="form-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>GitHub URL</label>
            <input type="text" value={github} onChange={e => setGithub(e.target.value)} className="form-input" />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Live URL</label>
            <input type="text" value={live} onChange={e => setLive(e.target.value)} className="form-input" />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" id="featured" checked={featured} onChange={e => setFeatured(e.target.checked)} />
          <label htmlFor="featured">Featured</label>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : (initial ? 'Update' : 'Add Project')}
          </button>
          <button type="button" onClick={onCancel} className="btn-primary" style={{ opacity: 0.7 }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

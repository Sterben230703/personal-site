'use client';

import { useState } from 'react';
import { marked } from 'marked';

interface BlogEditorProps {
  initial?: {
    title: string;
    slug: string;
    category: string;
    tags: string[];
    summary: string;
    content: string;
    published: boolean;
  };
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

const CATEGORIES = ['AI', 'System-Design', 'Backend', 'Algorithms'];

export default function BlogEditor({ initial, onSave, onCancel }: BlogEditorProps) {
  const [title, setTitle] = useState(initial?.title || '');
  const [slug, setSlug] = useState(initial?.slug || '');
  const [category, setCategory] = useState(initial?.category || CATEGORIES[0]);
  const [tags, setTags] = useState(initial?.tags?.join(', ') || '');
  const [summary, setSummary] = useState(initial?.summary || '');
  const [content, setContent] = useState(initial?.content || '');
  const [published, setPublished] = useState(initial?.published || false);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!initial) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      title,
      slug,
      category,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      summary,
      content,
      published,
    });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Title</label>
          <input
            type="text"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Slug</label>
          <input
            type="text"
            value={slug}
            onChange={e => setSlug(e.target.value)}
            className="form-input"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Category</label>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="form-input"
            >
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Tags (comma-separated)</label>
            <input
              type="text"
              value={tags}
              onChange={e => setTags(e.target.value)}
              className="form-input"
              placeholder="tag1, tag2, tag3"
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Summary</label>
          <textarea
            value={summary}
            onChange={e => setSummary(e.target.value)}
            className="form-input"
            rows={2}
            required
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
            <label style={{ fontWeight: 'bold' }}>Content (Markdown)</label>
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="btn-primary"
              style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            >
              {showPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
          {showPreview ? (
            <article
              className="card"
              style={{ minHeight: '200px', padding: '1rem' }}
              dangerouslySetInnerHTML={{ __html: marked.parse(content) as string }}
            />
          ) : (
            <textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              className="form-input"
              rows={15}
              required
            />
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={e => setPublished(e.target.checked)}
          />
          <label htmlFor="published">Published</label>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : (initial ? 'Update' : 'Create')}
          </button>
          <button type="button" onClick={onCancel} className="btn-primary" style={{ opacity: 0.7 }}>
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}

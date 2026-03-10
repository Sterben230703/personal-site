'use client';

import { useState } from 'react';

interface LogEditorProps {
  initial?: {
    _id?: string;
    date: string;
    content: string;
    tags: string[];
  };
  onSave: (data: Record<string, unknown>) => Promise<void>;
  onCancel: () => void;
}

export default function LogEditor({ initial, onSave, onCancel }: LogEditorProps) {
  const [date, setDate] = useState(
    initial?.date ? new Date(initial.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  );
  const [content, setContent] = useState(initial?.content || '');
  const [tags, setTags] = useState(initial?.tags?.join(', ') || '');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      date: new Date(date),
      content,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });
    setSaving(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} className="form-input" required />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Tags (comma-separated)</label>
          <input type="text" value={tags} onChange={e => setTags(e.target.value)} className="form-input" placeholder="learning, notes, etc." />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Content (Markdown)</label>
          <textarea value={content} onChange={e => setContent(e.target.value)} className="form-input" rows={12} required />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : (initial?._id ? 'Update' : 'Create')}
          </button>
          <button type="button" onClick={onCancel} className="btn-primary" style={{ opacity: 0.7 }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

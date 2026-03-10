'use client';

import { useState, useEffect } from 'react';
import { marked } from 'marked';
import { useAuth } from '@/components/AuthProvider';
import LogEditor from '@/components/LogEditor';

interface LogData {
  _id: string;
  date: string;
  content: string;
  tags: string[];
}

export default function LogsPage() {
  const { isDevMode, loading: authLoading } = useAuth();
  const [logs, setLogs] = useState<LogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingLog, setEditingLog] = useState<LogData | null>(null);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/logs');
      if (res.ok) {
        setLogs(await res.json());
      }
    } catch {
      // unauthorized or error
    }
    setLoading(false);
  };

  useEffect(() => {
    if (isDevMode) fetchLogs();
    else setLoading(false);
  }, [isDevMode]);

  if (authLoading) return <p>Loading...</p>;

  if (!isDevMode) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1rem' }}>Learning Logs</h1>
        <p>This section is private. Please log in as dev to access.</p>
      </div>
    );
  }

  const handleCreate = async (data: Record<string, unknown>) => {
    await fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setShowEditor(false);
    fetchLogs();
  };

  const handleUpdate = async (data: Record<string, unknown>) => {
    if (!editingLog) return;
    await fetch(`/api/logs/${editingLog._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setEditingLog(null);
    fetchLogs();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this log?')) return;
    await fetch(`/api/logs/${id}`, { method: 'DELETE' });
    fetchLogs();
  };

  if (showEditor) {
    return (
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>New Log</h1>
        <LogEditor onSave={handleCreate} onCancel={() => setShowEditor(false)} />
      </div>
    );
  }

  if (editingLog) {
    return (
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Edit Log</h1>
        <LogEditor initial={editingLog} onSave={handleUpdate} onCancel={() => setEditingLog(null)} />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', margin: 0 }}>Learning Logs</h1>
        <button onClick={() => setShowEditor(true)} className="btn-primary">+ New Log</button>
      </div>

      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p>No logs yet. Start recording your learning!</p>
      ) : (
        logs.map(log => {
          const formattedDate = new Date(log.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div key={log._id} className="card" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>{formattedDate}</span>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => setEditingLog(log)} className="btn-primary" style={{ padding: '0.125rem 0.5rem', fontSize: '0.625rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(log._id)} className="btn-danger" style={{ padding: '0.125rem 0.5rem', fontSize: '0.625rem' }}>
                    Delete
                  </button>
                </div>
              </div>
              {log.tags.length > 0 && (
                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  {log.tags.map(tag => (
                    <span key={tag} className="badge" style={{ fontSize: '0.625rem' }}>{tag}</span>
                  ))}
                </div>
              )}
              <article dangerouslySetInnerHTML={{ __html: marked.parse(log.content) as string }} />
            </div>
          );
        })
      )}
    </div>
  );
}

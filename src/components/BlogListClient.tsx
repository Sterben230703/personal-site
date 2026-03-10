'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import { useTheme } from './ThemeProvider';
import BlogEditor from './BlogEditor';

interface BlogData {
  _id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  summary: string;
  content: string;
  published: boolean;
}

const CATEGORIES = ['AI', 'System-Design', 'Backend', 'Algorithms'];
const VISIBLE_FLAGS = 5;

export default function BlogListClient() {
  const { isDevMode } = useAuth();
  const { theme } = useTheme();
  const [blogs, setBlogs] = useState<BlogData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTag, setSelectedTag] = useState('');
  const [sortOrder] = useState<'desc' | 'asc'>('desc');
  const [showEditor, setShowEditor] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [flagsExpanded, setFlagsExpanded] = useState(false);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('order', sortOrder);

      const res = await fetch(`/api/blogs?${params}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to fetch blogs:', err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const allTags = [...new Set(blogs.flatMap(b => b.tags))];

  // Client-side filtering: OR on categories, search on title/summary/tags
  const filteredBlogs = blogs.filter(blog => {
    // Category filter (OR operation)
    if (selectedCategories.length > 0 && !selectedCategories.includes(blog.category)) {
      return false;
    }
    // Tag filter
    if (selectedTag && !blog.tags.includes(selectedTag)) {
      return false;
    }
    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        blog.title.toLowerCase().includes(q) ||
        blog.summary.toLowerCase().includes(q) ||
        blog.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearCategories = () => setSelectedCategories([]);

  const handleCreate = async (data: Record<string, unknown>) => {
    await fetch('/api/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setShowEditor(false);
    fetchBlogs();
  };

  if (showEditor && isDevMode) {
    return (
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>New Blog Post</h1>
        <BlogEditor onSave={handleCreate} onCancel={() => setShowEditor(false)} />
      </div>
    );
  }

  const isSystem = theme === 'system';

  // Build flags list: categories + tags combined for system theme
  const allFlags = [
    ...CATEGORIES.map(c => ({ type: 'cat' as const, value: c, label: c === 'All' ? 'ALL' : c.toUpperCase().replace('-', '_') })),
    ...allTags.map(t => ({ type: 'tag' as const, value: t, label: t.toUpperCase().replace(/\s+/g, '_') })),
  ];
  const visibleFlags = flagsExpanded ? allFlags : allFlags.slice(0, VISIBLE_FLAGS);
  const hasMore = allFlags.length > VISIBLE_FLAGS;

  return (
    <div style={{ maxWidth: '56rem', margin: '0 auto' }}>
      {/* Header */}
      {isSystem ? (
        <header style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <h1 className="blog-header-system" style={{ margin: 0 }}>System Log</h1>
          {isDevMode && (
            <button onClick={() => setShowEditor(true)} className="btn-primary">
              + NEW_ENTRY
            </button>
          )}
        </header>
      ) : (
        <header className="classic-blog-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h1 className="classic-blog-header-title">System Log</h1>
          {isDevMode && (
            <button onClick={() => setShowEditor(true)} className="btn-primary">
              + New Post
            </button>
          )}
        </header>
      )}

      {/* Filters */}
      {isSystem ? (
        <section style={{ marginBottom: '2.5rem' }}>
          {/* Search bar */}
          <div className="blog-search-system">
            <span className="blog-search-prefix">&gt;_</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH_LOGS..."
              className="blog-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="blog-search-clear"
              >
                [X]
              </button>
            )}
          </div>

          {/* Quick flags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>&gt; QUICK_FLAGS:</span>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearCategories}
                className="blog-flag-btn"
                style={{ backgroundColor: '#000', color: '#fff' }}
              >
                <span style={{ color: '#ef4444', marginRight: '4px' }}>x</span>
                CLEAR
              </button>
            )}
            {visibleFlags.map(flag => {
              const isActive = flag.type === 'cat'
                ? selectedCategories.includes(flag.value)
                : selectedTag === flag.value;

              return (
                <button
                  key={`${flag.type}-${flag.value}`}
                  onClick={() => {
                    if (flag.type === 'cat') {
                      toggleCategory(flag.value);
                    } else {
                      setSelectedTag(prev => prev === flag.value ? '' : flag.value);
                    }
                  }}
                  className="blog-flag-btn"
                  style={{
                    backgroundColor: isActive ? '#000' : '#fff',
                    color: isActive ? '#fff' : '#000',
                  }}
                >
                  <span style={{ color: isActive ? '#4ade80' : '#3b82f6', marginRight: '4px' }}>#</span>
                  {flag.label}
                </button>
              );
            })}
            {hasMore && (
              <button
                onClick={() => setFlagsExpanded(prev => !prev)}
                className="blog-flag-btn"
                style={{ backgroundColor: '#fff', color: '#000' }}
              >
                {flagsExpanded ? '[ LESS ]' : '...'}
              </button>
            )}
          </div>
        </section>
      ) : (
        <section style={{ marginBottom: '2.5rem' }}>
          {/* Classic search */}
          <div className="classic-blog-search">
            <span className="classic-blog-search-icon">&#x1F50D;</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search logs..."
              className="classic-blog-search-input"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="classic-blog-search-clear">&times;</button>
            )}
          </div>

          {/* Category flags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem' }}>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearCategories}
                className="classic-blog-flag"
                style={{ opacity: 1 }}
              >
                All
              </button>
            )}
            {visibleFlags.map(flag => {
              const isActive = flag.type === 'cat'
                ? selectedCategories.includes(flag.value)
                : selectedTag === flag.value;

              return (
                <button
                  key={`${flag.type}-${flag.value}`}
                  onClick={() => {
                    if (flag.type === 'cat') {
                      toggleCategory(flag.value);
                    } else {
                      setSelectedTag(prev => prev === flag.value ? '' : flag.value);
                    }
                  }}
                  className="classic-blog-flag"
                  style={{ opacity: isActive ? 1 : 0.5 }}
                >
                  [{isActive ? '+' : ' '}] {flag.label}
                </button>
              );
            })}
            {hasMore && (
              <button
                onClick={() => setFlagsExpanded(prev => !prev)}
                className="classic-blog-flag"
              >
                {flagsExpanded ? '[ Less ]' : '...'}
              </button>
            )}
          </div>
        </section>
      )}

      {/* Blog list grouped by year — timeline style */}
      {loading ? (
        <p style={{ fontFamily: 'JetBrains Mono, monospace', opacity: 0.5 }}>
          {isSystem ? 'LOADING_ENTRIES...' : 'Loading...'}
        </p>
      ) : filteredBlogs.length === 0 ? (
        <p style={{ fontFamily: 'JetBrains Mono, monospace', opacity: 0.5 }}>
          {isSystem ? 'NO_ENTRIES_FOUND.' : 'No posts found.'}
        </p>
      ) : (
        (() => {
          const byMonth: Record<string, typeof filteredBlogs> = {};
          for (const blog of filteredBlogs) {
            if (!isDevMode && !blog.published) continue;
            const d = new Date(blog.date);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
            if (!byMonth[key]) byMonth[key] = [];
            byMonth[key].push(blog);
          }

          const mono = 'JetBrains Mono, monospace';
          // theme-adaptive values
          const badgeBg      = isSystem ? '#000'                      : '#fff';
          const badgeColor   = isSystem ? '#fff'                      : '#000';
          const lineColor    = isSystem ? '#000'                      : 'rgba(255,255,255,0.3)';
          const entryBorder  = isSystem ? '1px solid #e2e8f0'         : '1px solid rgba(255,255,255,0.07)';
          const dateColor    = isSystem ? '#94a3b8'                   : '#6b7280';
          const titleColor   = isSystem ? '#000'                      : '#fff';
          const tagBorder    = isSystem ? '1px solid #000'            : '1px solid rgba(255,255,255,0.25)';
          const tagColor     = isSystem ? '#000'                      : 'var(--text-color)';
          const hoverBg      = isSystem ? '#f8fafc'                   : 'rgba(255,255,255,0.03)';

          return Object.keys(byMonth)
            .sort((a, b) => b.localeCompare(a))
            .map(key => {
              const [year, month] = key.split('-');
              const monthName = new Date(Number(year), Number(month) - 1).toLocaleString('en-GB', { month: 'long' });
              return (
              <section key={key} style={{ marginBottom: '3rem' }}>

                {/* Month + Year badge — solid filled box */}
                <div style={{
                  display: 'inline-flex', alignItems: 'baseline', gap: '0.5rem',
                  backgroundColor: badgeBg, color: badgeColor,
                  padding: '4px 16px', marginBottom: '1.5rem', marginLeft: '1rem',
                  border: `1px solid ${badgeBg}`,
                }}>
                  <h3 style={{ fontFamily: mono, fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.08em', margin: 0, color: badgeColor }}>
                    {monthName}
                  </h3>
                  <span style={{ fontFamily: mono, fontSize: '0.75rem', fontWeight: 400, opacity: 0.6, color: badgeColor }}>
                    {year}
                  </span>
                </div>

                {/* Timeline entries */}
                <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `2px solid ${lineColor}`, marginLeft: '1rem' }}>
                  {byMonth[key].map(blog => {
                    const dateStr = new Date(blog.date).toISOString().split('T')[0];
                    return (
                      <div key={blog._id}
                        style={{
                          display: 'flex', alignItems: 'center',
                          padding: '0.85rem 1.5rem', position: 'relative',
                          borderBottom: entryBorder, transition: 'background 0.15s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.backgroundColor = hoverBg)}
                        onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
                      >
                        {/* Horizontal connector — matches reference exactly */}
                        <div style={{
                          position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)',
                          width: '1rem', height: '2px', backgroundColor: lineColor,
                        }} />

                        {/* Date */}
                        <span style={{
                          fontFamily: mono, fontSize: '0.72rem', flexShrink: 0,
                          width: '7rem', color: dateColor,
                        }}>
                          {dateStr}
                        </span>

                        {/* Title */}
                        <Link href={`/blog/${blog.slug}`} style={{
                          fontFamily: mono, fontSize: '0.95rem', fontWeight: 700,
                          flex: 1, textDecoration: 'none',
                          color: titleColor, textTransform: 'uppercase', letterSpacing: '0.02em',
                        }}>
                          {blog.title}
                          {!blog.published && (
                            <span style={{
                              marginLeft: '0.5rem', fontSize: '0.6rem', fontWeight: 700,
                              backgroundColor: '#fbbf24', color: '#000', padding: '1px 5px',
                            }}>
                              DRAFT
                            </span>
                          )}
                        </Link>

                        {/* Tags — right aligned */}
                        <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
                          <span style={{ fontFamily: mono, fontSize: '0.65rem', fontWeight: 700, border: tagBorder, padding: '1px 8px', color: tagColor }}>
                            {blog.category.toUpperCase()}
                          </span>
                          {blog.tags.slice(0, 1).map(tag => (
                            <span key={tag} style={{ fontFamily: mono, fontSize: '0.65rem', border: tagBorder, padding: '1px 8px', color: tagColor, opacity: 0.75 }}>
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            );
            });
        })()
      )}
    </div>
  );
}

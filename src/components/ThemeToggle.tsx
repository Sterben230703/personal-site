'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={`Switch to ${theme === 'classic' ? 'system' : 'classic'} theme`}
    >
      {theme === 'classic' ? '[ SYS ]' : '[ CLS ]'}
    </button>
  );
}

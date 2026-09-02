'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Theme = 'classic' | 'system' | 'studio';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'classic',
  toggleTheme: () => {},
  setTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>('classic');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored === 'classic' || stored === 'system' || stored === 'studio') {
      setTheme(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    }
  }, [theme, mounted]);

  const transitionTo = (nextTheme: Theme) => {
    if (nextTheme === theme) return;
    const changeTheme = () => setTheme(nextTheme);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const viewTransition = document as Document & { startViewTransition?: (update: () => void) => void };
    if (!reduceMotion && viewTransition.startViewTransition) viewTransition.startViewTransition(changeTheme);
    else changeTheme();
  };

  const toggleTheme = () => transitionTo(theme === 'classic' ? 'system' : theme === 'system' ? 'studio' : 'classic');

  // Prevent flash of wrong theme
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme: transitionTo }}>
      {children}
    </ThemeContext.Provider>
  );
}

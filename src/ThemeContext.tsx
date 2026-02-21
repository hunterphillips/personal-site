import { createContext, useContext, useEffect, useState } from 'react';

const THEMES = ['default', 'warm', 'sage'] as const;
type Theme = (typeof THEMES)[number];

const ThemeContext = createContext<{ theme: Theme; toggleTheme: () => void }>({
  theme: 'default',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored && THEMES.includes(stored) ? stored : 'default';
  });

  useEffect(() => {
    const root = document.documentElement;
    // Remove all theme classes, then add the active one (default has no class)
    THEMES.forEach((t) => root.classList.remove(t));
    if (theme !== 'default') {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((current) => {
      const idx = THEMES.indexOf(current);
      return THEMES[(idx + 1) % THEMES.length];
    });

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

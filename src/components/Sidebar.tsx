import { useTheme } from '../ThemeContext';

interface SidebarProps {
  activeSection: string;
}

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

export default function Sidebar({ activeSection }: SidebarProps) {
  const { toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        backgroundColor: 'var(--c-sidebar)',
        borderRight: '1px solid var(--c-divider)',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 32px',
        zIndex: 10,
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      {/* Initials logo — click to toggle theme */}
      <div style={{ marginBottom: '48px' }}>
        <div className="hp-logo-wrap" onClick={toggleTheme}>
          <img
            src="/assets/initials.png"
            alt="HP"
            className="hp-logo-img"
            style={{ height: '48px', width: 'auto' }}
          />
        </div>
      </div>

      {/* Nav */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '8px 0',
                fontSize: '11px',
                fontWeight: isActive ? 600 : 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: isActive ? 'var(--c-accent)' : 'var(--c-muted)',
                fontFamily: 'inherit',
                transition: 'color 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.target as HTMLButtonElement).style.color = 'var(--c-text)';
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.target as HTMLButtonElement).style.color = 'var(--c-muted)';
              }}
            >
              {isActive && (
                <span
                  style={{
                    position: 'absolute',
                    left: '-16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    width: '3px',
                    height: '16px',
                    backgroundColor: 'var(--c-accent)',
                    borderRadius: '2px',
                  }}
                />
              )}
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Footer links */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <a
          href="mailto:hkphillips42@gmail.com"
          title="Email"
          style={{ color: 'var(--c-muted)', transition: 'color 0.2s' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-accent)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-muted)')
          }
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="20" height="16" x="2" y="4" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </a>
        <a
          href="https://www.linkedin.com/in/hunter-phillips/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn"
          style={{ color: 'var(--c-muted)', transition: 'color 0.2s' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-accent)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-muted)')
          }
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
            <rect width="4" height="12" x="2" y="9" />
            <circle cx="4" cy="4" r="2" />
          </svg>
        </a>
        <a
          href="https://github.com/hunterphillips"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub"
          style={{ color: 'var(--c-muted)', transition: 'color 0.2s' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-accent)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-muted)')
          }
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
        </a>
      </div>
    </aside>
  );
}

import { useState } from 'react';

const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
];

interface MobileNavProps {
  activeSection: string;
}

export default function MobileNav({ activeSection }: MobileNavProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backgroundColor: '#F2F1EE',
        borderBottom: '1px solid #E0DED9',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '56px',
      }}
    >
      <div>
        <img
          src="/assets/initials.png"
          alt="HP"
          style={{ height: '42px', width: 'auto', display: 'block' }}
        />
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          color: '#1C1C1C',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {menuOpen ? (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        )}
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '56px',
            left: 0,
            right: 0,
            backgroundColor: '#F2F1EE',
            borderBottom: '1px solid #E0DED9',
            padding: '8px 0',
            zIndex: 20,
          }}
        >
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '12px 20px',
                fontSize: '13px',
                fontWeight: activeSection === item.id ? 600 : 500,
                color: activeSection === item.id ? '#3D5A80' : '#1C1C1C',
                fontFamily: 'inherit',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}

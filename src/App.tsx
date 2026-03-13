import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Education from './components/Education';

const SECTIONS = ['about', 'projects', 'experience', 'education'];

export default function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scrollspy via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      style={{
        backgroundColor: 'var(--c-bg)',
        minHeight: '100vh',
        transition: 'background-color 0.3s ease',
      }}
    >
      {isMobile ? (
        <div style={{ overflowX: 'hidden' }}>
          <MobileNav activeSection={activeSection} />
          <main
            style={{
              padding: '36px 24px 0',
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            <About />
            <div
              style={{ height: '1px', backgroundColor: 'var(--c-divider)' }}
            />
            <Projects isMobile={true} />
            <div
              style={{ height: '1px', backgroundColor: 'var(--c-divider)' }}
            />
            <Experience isMobile={isMobile} />
            <div
              style={{ height: '1px', backgroundColor: 'var(--c-divider)' }}
            />
            <Education />
          </main>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            maxWidth: '1100px',
            margin: '0 auto',
            minHeight: '100vh',
          }}
        >
          <Sidebar activeSection={activeSection} />

          <main
            style={{
              marginLeft: '240px',
              flex: 1,
              padding: '0 56px',
              maxWidth: '780px',
            }}
          >
            <About />
            <div
              style={{ height: '1px', backgroundColor: 'var(--c-divider)' }}
            />
            <Projects isMobile={false} />
            <div
              style={{ height: '1px', backgroundColor: 'var(--c-divider)' }}
            />
            <Experience isMobile={isMobile} />
            <div
              style={{ height: '1px', backgroundColor: 'var(--c-divider)' }}
            />
            <Education />

            <footer
              style={{
                borderTop: '1px solid var(--c-divider)',
                padding: '32px 0 48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '12px', color: 'var(--c-muted)' }}>
                Hunter Phillips · {new Date().getFullYear()}
              </span>
              <div
                style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
              >
                <FooterLink
                  href="https://www.linkedin.com/in/hunter-phillips/"
                  external
                >
                  LinkedIn
                </FooterLink>
                <FooterLink href="https://github.com/hunterphillips" external>
                  GitHub
                </FooterLink>
              </div>
            </footer>
          </main>
        </div>
      )}
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{
        fontSize: '12px',
        color: 'var(--c-muted)',
        textDecoration: 'none',
        fontWeight: 500,
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-text)')
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = 'var(--c-muted)')
      }
    >
      {children}
    </a>
  );
}

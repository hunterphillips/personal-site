import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import {
  appPolicyPages,
  policyTitles,
  type AppPolicyPage as AppPolicyPageData,
} from '../data/apps';
import { navigateTo } from '../navigation';

function formatDate(iso: string) {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(Date.UTC(year, month - 1, day)).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

export default function AppPolicyPage({ page }: { page: AppPolicyPageData }) {
  const { toggleTheme } = useTheme();
  const { app, kind } = page;
  const paragraphs = kind === 'privacy' ? app.privacy : app.terms;
  const otherKind = kind === 'privacy' ? 'terms' : 'privacy';
  const otherPage = appPolicyPages.find(
    (candidate) => candidate.app.slug === app.slug && candidate.kind === otherKind,
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${page.title} — Hunter Phillips`;
    return () => {
      document.title = previousTitle;
    };
  }, [page.title]);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: 'var(--c-bg)',
        color: 'var(--c-text)',
        transition: 'background-color 0.3s ease, color 0.3s ease',
      }}
    >
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          backdropFilter: 'blur(14px)',
          backgroundColor: 'color-mix(in srgb, var(--c-bg) 88%, transparent)',
          borderBottom: '1px solid var(--c-divider)',
        }}
      >
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          <button
            onClick={() => navigateTo('/')}
            style={{
              border: 'none',
              background: 'none',
              padding: 0,
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--c-muted)',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Back to portfolio
          </button>

          <div className="hp-logo-wrap" onClick={toggleTheme}>
            <img
              src="/assets/initials.png"
              alt="HP"
              className="hp-logo-img"
              style={{ height: '40px', width: 'auto', display: 'block' }}
            />
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '48px 24px 88px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--c-accent)',
            marginBottom: '16px',
          }}
        >
          {app.name}
        </div>

        <h1
          style={{
            fontSize: 'clamp(30px, 5vw, 44px)',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '10px',
          }}
        >
          {page.heading}
        </h1>

        <p
          style={{
            fontSize: '14px',
            color: 'var(--c-muted)',
            marginBottom: '36px',
          }}
        >
          Last updated {formatDate(app.updated)}
        </p>

        {paragraphs.map((paragraph) => (
          <p key={paragraph} style={paragraphStyle}>
            {paragraph}
          </p>
        ))}

        <h2 style={headingStyle}>Contact</h2>
        <p style={paragraphStyle}>
          Questions about {app.name} go to the project's{' '}
          <a href={`${app.repo}/issues`} style={linkStyle}>
            GitHub issues
          </a>
          .
        </p>

        <div
          style={{
            marginTop: '48px',
            paddingTop: '20px',
            borderTop: '1px solid var(--c-divider)',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '20px',
            fontSize: '14px',
          }}
        >
          {otherPage && (
            <a
              href={otherPage.path}
              style={linkStyle}
              onClick={(event) => {
                event.preventDefault();
                navigateTo(otherPage.path);
              }}
            >
              {policyTitles[otherKind]}
            </a>
          )}
          <a href={app.license.url} style={linkStyle}>
            {app.license.name}
          </a>
          <a href={app.repo} style={linkStyle}>
            Source on GitHub
          </a>
        </div>
      </main>
    </div>
  );
}

const paragraphStyle = {
  fontSize: '17px',
  lineHeight: 1.75,
  color: 'var(--c-text-secondary)',
  marginBottom: '20px',
} as const;

const headingStyle = {
  fontSize: '13px',
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--c-muted)',
  marginTop: '36px',
  marginBottom: '12px',
} as const;

const linkStyle = {
  color: 'var(--c-accent)',
  textDecoration: 'underline',
  textUnderlineOffset: '3px',
} as const;

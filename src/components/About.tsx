import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import {
  BarbellIcon,
  TennisBallIcon,
  BasketballIcon,
  PersonSimpleRunIcon,
  PersonSimpleHikeIcon,
  PersonSimpleTaiChiIcon,
} from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react';

const ICON_SIZE = 18;

const CONTACT_LINKS: {
  href: string;
  label: string;
  external?: boolean;
  icon: ReactNode;
}[] = [
  // {
  //   href: 'mailto:hkphillips42@gmail.com',
  //   label: 'Email',
  //   icon: (
  //     <svg
  //       width="14"
  //       height="14"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //     >
  //       <rect width="20" height="16" x="2" y="4" rx="2" />
  //       <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  //     </svg>
  //   ),
  // },
  {
    href: 'https://www.linkedin.com/in/hunter-phillips/',
    label: 'LinkedIn',
    external: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    href: 'https://github.com/hunterphillips',
    label: 'GitHub',
    external: true,
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
];

const ICONS: { Icon: Icon; color: string }[] = [
  { Icon: BarbellIcon, color: '#6B7B8D' },
  { Icon: TennisBallIcon, color: '#B8C63E' },
  { Icon: BasketballIcon, color: '#e99e73' },
  { Icon: PersonSimpleRunIcon, color: '#4A90D9' },
  { Icon: PersonSimpleHikeIcon, color: '#5B9A6F' },
  { Icon: PersonSimpleTaiChiIcon, color: '#B07BAC' },
];

const TITLES = ['collaborator', 'orchestrator', 'whisperer', 'explorer'];
const FADE_IN_DONE = 2000; // ms — wait after ai-replacement finishes
const CYCLE_INTERVAL = 1300; // ms per word during cycling

function CycleTitle() {
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Wait for the initial fade-in to finish, then start cycling
    const startTimer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current++;
        if (current >= TITLES.length) {
          clearInterval(interval);
          // After last word settles, collapse the fixed width
          setTimeout(() => setDone(true), 10);
          return;
        }
        // Fade out, swap text, fade in
        setFading(true);
        setTimeout(() => {
          setIndex(current);
          setFading(false);
        }, 300);
      }, CYCLE_INTERVAL);
    }, FADE_IN_DONE);

    return () => clearTimeout(startTimer);
  }, []);

  return (
    <span className="ai-replacement" style={{ fontWeight: 500 }}>
      AI{' '}
      <span
        style={{
          display: 'inline-block',
          minWidth: done ? '0' : '8ch',
          transition:
            'opacity 0.3s ease, transform 0.3s ease, min-width 1.4s ease',
          opacity: fading ? 0 : 1,
          transform: fading ? 'translateY(2px)' : 'translateY(0)',
        }}
      >
        {TITLES[index]}
      </span>
    </span>
  );
}

export default function About() {
  return (
    <section id="about" style={{ padding: '72px 0 64px' }}>
      <p
        style={{
          fontSize: '18px',
          fontWeight: 500,
          lineHeight: 1.55,
          color: 'var(--c-text)',
          letterSpacing: '-0.02em',
          maxWidth: '580px',
          marginBottom: '16px',
        }}
      >
        Hi 👋{' '}
      </p>
      <p
        style={{
          fontSize: '20px',
          fontWeight: 500,
          lineHeight: 1.55,
          color: 'var(--c-text)',
          letterSpacing: '-0.02em',
          maxWidth: '580px',
          marginBottom: '16px',
        }}
      >
        I'm a<span className="n-fade">n</span>{' '}
        <span className="strike-wrap">software engineer</span> <CycleTitle />{' '}
        building apps to make work easier and provide beautiful, intuitive user
        experiences.
      </p>

      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.75,
          color: 'var(--c-text-secondary)',
          maxWidth: '560px',
          marginBottom: '8px',
        }}
      >
        When I'm not working, I'm usually exercising or finding an excuse to get
        outside.
        <span
          style={{
            display: 'inline-flex',
            gap: '10px',
            alignItems: 'center',
            verticalAlign: 'middle',
            position: 'relative',
            top: '-1px',
            marginLeft: '6px',
          }}
        >
          {ICONS.map(({ Icon, color }, i) => (
            <span
              key={i}
              className="icon-colorize"
              style={
                {
                  display: 'inline-flex',
                  '--target-color': color,
                  animationDelay: `${8.25 + i * 0.12}s`,
                } as React.CSSProperties
              }
            >
              <Icon size={ICON_SIZE} weight="duotone" />
            </span>
          ))}
        </span>
      </p>

      <p
        style={{
          fontSize: '16px',
          lineHeight: 1.75,
          color: 'var(--c-text-secondary)',
          maxWidth: '560px',
          marginBottom: '48px',
        }}
      >
        I also enjoy listening to conversations and mindfulness practices on a
        meditation app called{' '}
        <a
          href="https://www.wakingup.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: 'var(--c-accent)',
            textDecoration: 'none',
            borderBottom: '1px solid var(--c-accent-border)',
          }}
        >
          Waking Up
        </a>
        .
      </p>

      {/* Contact row */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
        }}
      >
        {CONTACT_LINKS.map(({ href, label, external, icon }) => (
          <a
            key={label}
            href={href}
            {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--c-accent)',
              textDecoration: 'none',
              padding: '8px 14px',
              border: '1px solid var(--c-accent-border)',
              borderRadius: '6px',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = 'var(--c-accent)';
              el.style.color = '#fff';
              el.style.borderColor = 'var(--c-accent)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = 'var(--c-btn-hover-bg)';
              el.style.color = 'var(--c-accent)';
              el.style.borderColor = 'var(--c-accent-border)';
            }}
          >
            {icon}
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}

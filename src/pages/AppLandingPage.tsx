import {
  useEffect,
  type ComponentType,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from 'react';
import {
  appPolicyPages,
  policyTitles,
  type AppLandingPage as AppLandingPageData,
} from '../data/apps';
import { navigateTo } from '../navigation';
import { Cable, Keyboard, MonitorSmartphone } from 'lucide-react';
import RealignDemo from '../components/RealignDemo';
import './AppLandingPage.css';

// The looping hero demo for each app, by slug.
const demos: Record<string, ComponentType> = { realign: RealignDemo };

const featureIcons = {
  keyboard: Keyboard,
  displays: MonitorSmartphone,
  cable: Cable,
};

const KEY_NAMES: Record<string, string> = {
  '⌃': 'Control',
  '⌥': 'Option',
  '⌘': 'Command',
};
function keyNames(shortcut: string) {
  return [...shortcut].map((key) => KEY_NAMES[key] ?? key).join('-');
}

// In-page navigation for plain clicks; modified clicks keep the browser's
// behaviour (new tab, new window).
function followInPage(event: MouseEvent<HTMLAnchorElement>, path: string) {
  if (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  ) {
    return;
  }
  event.preventDefault();
  navigateTo(path);
}

const INLINE = /(`[^`]+`|\[[^\]]+\]\([^)]+\))/;

// Renders the inline markup used by landing strings in apps.ts: `keys` become
// keycaps and [text](url) becomes a link.
function renderInline(text: string): ReactNode[] {
  return text.split(INLINE).map((part, index) => {
    if (part.startsWith('`')) {
      const keys = [...part.slice(1, -1)];
      return (
        <span key={index} className="al-combo">
          <span aria-hidden="true">
            {keys.map((key) => (
              <kbd key={key}>{key}</kbd>
            ))}
          </span>
          <span className="al-sr">{keyNames(keys.join(''))}</span>
        </span>
      );
    }
    const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
    if (link) {
      return (
        <a key={index} href={link[2]}>
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

export default function AppLandingPage({ page }: { page: AppLandingPageData }) {
  const { app } = page;
  const { landing } = app;
  const Demo = demos[app.slug];
  const policies = appPolicyPages.filter(
    (candidate) => candidate.app.slug === app.slug,
  );

  useEffect(() => {
    const previousTitle = document.title;
    document.title = landing.title;
    return () => {
      document.title = previousTitle;
    };
  }, [landing.title]);

  const button = (
    <a
      className="al-btn al-btn-primary"
      href={landing.purchaseUrl ?? landing.download}
    >
      Download now
    </a>
  );

  return (
    <div className="al">
      <main>
        <header className="al-hero">
          <div className="al-hero-text">
            <div className="al-brand">
              <img src={landing.icon} alt="" width={44} height={44} />
              {app.name}
            </div>
            <h1>{landing.headline}</h1>
            <p className="al-lede">{landing.lede}</p>
            {button}
            <p className="al-req">{landing.requirements}</p>
          </div>
          {Demo && (
            <div className="al-stage">
              <Demo />
            </div>
          )}
        </header>

        <section className="al-features al-wrap">
          {landing.features.map((feature) => {
            const Icon = featureIcons[feature.icon];
            return (
              <div key={feature.title} className="al-feature">
                <h3>
                  <Icon aria-hidden="true" strokeWidth={1.75} />
                  {feature.title}
                </h3>
                <p>{renderInline(feature.text)}</p>
              </div>
            );
          })}
        </section>

        <section className="al-section al-wrap">
          <div className="al-menu-stage">
            <ul className="al-menu">
              {landing.menu.map((row, index) =>
                row.separator ? (
                  <li key={index} className="al-sep" aria-hidden="true" />
                ) : (
                  <li key={index}>
                    <div className={`al-mi${row.info ? ' al-off' : ''}`}>
                      {row.checked && (
                        <span className="al-check" aria-hidden="true">
                          ✓
                        </span>
                      )}
                      <span>
                        {row.label}
                        {row.checked && <span className="al-sr"> (on)</span>}
                      </span>
                      {row.submenu && (
                        <span className="al-sc" aria-hidden="true">
                          ›
                        </span>
                      )}
                      {row.shortcut && (
                        <span className="al-sc">
                          <span aria-hidden="true">{row.shortcut}</span>
                          <span className="al-sr">
                            {keyNames(row.shortcut)}
                          </span>
                        </span>
                      )}
                    </div>
                    {row.note && (
                      <p
                        className={`al-note ${row.note.side === 'left' ? 'al-l' : 'al-r'}`}
                        style={
                          { '--dy': `${row.note.dy ?? 0}px` } as CSSProperties
                        }
                      >
                        <svg className="al-leader" aria-hidden="true">
                          <path
                            d={leaderPath(row.note.side, row.note.dy ?? 0)}
                          />
                        </svg>
                        <span>{row.note.text}</span>
                      </p>
                    )}
                  </li>
                ),
              )}
            </ul>
          </div>
        </section>

        <section className="al-section al-wrap">
          <h2>Details</h2>
          <dl className="al-facts">
            {landing.details.map((detail) => (
              <div key={detail.term}>
                <dt>{detail.term}</dt>
                <dd>{renderInline(detail.text)}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="al-get-sec al-wrap">
          {button}
          <a className="al-btn al-btn-secondary" href={`${app.repo}#readme`}>
            Documentation
          </a>
        </section>
      </main>

      <footer className="al-wrap">
        <p>
          © 2026{' '}
          <a href="/" onClick={(event) => followInPage(event, '/')}>
            Hunter Phillips
          </a>
        </p>
        <ul>
          {policies.map((policy) => (
            <li key={policy.path}>
              <a
                href={policy.path}
                onClick={(event) => followInPage(event, policy.path)}
              >
                {policyTitles[policy.kind]}
              </a>
            </li>
          ))}
          <li>
            <a href={app.license.url}>{app.license.name}</a>
          </li>
          <li>
            <a href={app.repo}>GitHub</a>
          </li>
        </ul>
      </footer>
    </div>
  );
}

// Dotted S-curve from the menu edge (x toward the menu, y 0) out to the note
// text, which sits dy pixels above or below the row.
function leaderPath(side: 'left' | 'right', dy: number) {
  return side === 'right'
    ? `M 2 0 C 36 0, 28 ${dy}, 62 ${dy}`
    : `M 62 0 C 28 0, 36 ${dy}, 2 ${dy}`;
}

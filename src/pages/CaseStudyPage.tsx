import { useEffect } from 'react';
import { useTheme } from '../ThemeContext';
import type {
  CaseStudy,
  CaseStudyLink,
  CaseStudyStep,
} from '../data/caseStudies';
import { navigateTo } from '../navigation';

export default function CaseStudyPage({ caseStudy }: { caseStudy: CaseStudy }) {
  const { toggleTheme } = useTheme();

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = document.querySelector(
      'meta[name="description"]',
    ) as HTMLMetaElement | null;
    const previousDescription = descriptionTag?.content;

    document.title = `${caseStudy.title} — Hunter Phillips`;
    if (descriptionTag) {
      descriptionTag.content = caseStudy.summary;
    }

    return () => {
      document.title = previousTitle;
      if (descriptionTag && previousDescription) {
        descriptionTag.content = previousDescription;
      }
    };
  }, [caseStudy.summary, caseStudy.title]);

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
            maxWidth: '1040px',
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
          maxWidth: '1040px',
          margin: '0 auto',
          padding: '48px 24px 88px',
        }}
      >
        <section style={{ marginBottom: '32px' }}>
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
            {caseStudy.eyebrow}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '28px',
              alignItems: 'start',
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 'clamp(34px, 6vw, 64px)',
                  lineHeight: 1.02,
                  letterSpacing: '-0.04em',
                  marginBottom: '20px',
                  maxWidth: '700px',
                }}
              >
                {caseStudy.title}
              </h1>

              <p
                style={{
                  fontSize: '18px',
                  lineHeight: 1.7,
                  color: 'var(--c-text-secondary)',
                  maxWidth: '720px',
                  marginBottom: '24px',
                }}
              >
                {caseStudy.summary}
              </p>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                {caseStudy.links.map((link) => (
                  <ActionLink key={link.href} link={link} />
                ))}
              </div>
            </div>

            <div
              style={{
                background:
                  'linear-gradient(180deg, var(--c-card-bg), var(--c-sidebar))',
                border: '1px solid var(--c-divider)',
                borderRadius: '18px',
                padding: '24px',
                boxShadow: '0 22px 50px rgba(20, 26, 37, 0.08)',
              }}
            >
              <div
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--c-muted)',
                  marginBottom: '14px',
                }}
              >
                Snapshot
              </div>
              <p
                style={{
                  fontSize: '15px',
                  lineHeight: 1.7,
                  color: 'var(--c-text-secondary)',
                  marginBottom: '18px',
                }}
              >
                {caseStudy.role}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {caseStudy.stack.map((item) => (
                  <span key={item} style={tagStyle}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section style={{ marginBottom: '44px' }}>
          <div
            style={{
              borderRadius: '24px',
              overflow: 'hidden',
              border: '1px solid var(--c-divider)',
              backgroundColor: 'var(--c-card-bg)',
              boxShadow: '0 26px 80px rgba(20, 26, 37, 0.12)',
            }}
          >
            <img
              src={caseStudy.heroImage}
              alt={caseStudy.heroAlt}
              style={{
                width: '100%',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </div>
        </section>

        <section style={{ marginBottom: '52px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '14px',
            }}
          >
            {caseStudy.metrics.map((metric) => (
              <article
                key={metric.label}
                style={{
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid var(--c-divider)',
                  backgroundColor: 'var(--c-card-bg)',
                }}
              >
                <div
                  style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    letterSpacing: '-0.04em',
                    marginBottom: '4px',
                  }}
                >
                  {metric.value}
                </div>
                <div
                  style={{
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--c-accent)',
                    fontWeight: 700,
                    marginBottom: '10px',
                  }}
                >
                  {metric.label}
                </div>
                <p
                  style={{
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'var(--c-text-secondary)',
                  }}
                >
                  {metric.detail}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ marginBottom: '45px' }}>
          <SectionEyebrow label="Architecture" />
          {caseStudy.architectureLayout === 'steps' ? (
            <ArchitectureSteps steps={caseStudy.architecture} />
          ) : (
            <ArchitecturePipeline steps={caseStudy.architecture} />
          )}
        </section>

        {caseStudy.gallery && (
          <section
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '45px',
            }}
          >
            {caseStudy.gallery.map((image) => (
              <figure key={image.src} style={{ margin: 0 }}>
                <a
                  href={image.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'block',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '1px solid var(--c-divider)',
                    backgroundColor: 'var(--c-card-bg)',
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    style={{ width: '100%', display: 'block' }}
                  />
                </a>
                <figcaption
                  style={{
                    fontSize: '13px',
                    lineHeight: 1.6,
                    color: 'var(--c-muted)',
                    marginTop: '10px',
                  }}
                >
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </section>
        )}

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr)',
            gap: '44px',
          }}
        >
          {caseStudy.sections.map((section) => (
            <article
              key={section.heading}
              style={{
                borderTop: '1px solid var(--c-divider)',
                paddingTop: '24px',
              }}
            >
              <SectionEyebrow label={section.heading} />

              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{
                    fontSize: '16px',
                    lineHeight: 1.8,
                    color: 'var(--c-text-secondary)',
                    maxWidth: '760px',
                    marginBottom: '16px',
                  }}
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gap: '14px',
                    maxWidth: '820px',
                  }}
                >
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        alignItems: 'flex-start',
                        padding: '16px 18px',
                        borderRadius: '14px',
                        border: '1px solid var(--c-divider)',
                        backgroundColor: 'var(--c-card-bg)',
                      }}
                    >
                      <span
                        style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          backgroundColor: 'var(--c-accent)',
                          marginTop: '10px',
                          flexShrink: 0,
                        }}
                      />
                      <span
                        style={{
                          fontSize: '15px',
                          lineHeight: 1.7,
                          color: 'var(--c-text-secondary)',
                        }}
                      >
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

function ArchitectureSteps({ steps }: { steps: CaseStudyStep[] }) {
  return (
    <ol
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'grid',
        gap: '12px',
        maxWidth: '820px',
      }}
    >
      {steps.map((step, index) => (
        <li
          key={step.title}
          style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            padding: '16px 18px',
            borderRadius: '14px',
            border: '1px solid var(--c-divider)',
            backgroundColor: 'var(--c-card-bg)',
          }}
        >
          <span
            style={{
              fontSize: '12px',
              fontWeight: 700,
              color: 'var(--c-accent)',
              backgroundColor: 'var(--c-accent-light)',
              borderRadius: '999px',
              minWidth: '26px',
              height: '26px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {index + 1}
          </span>
          <div>
            <div
              style={{ fontSize: '15px', fontWeight: 700, marginBottom: '4px' }}
            >
              {step.title}
            </div>
            <p
              style={{
                fontSize: '15px',
                lineHeight: 1.7,
                color: 'var(--c-text-secondary)',
              }}
            >
              {step.detail}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function ArchitecturePipeline({ steps }: { steps: CaseStudyStep[] }) {
  const [ingest, index, serve] = steps;
  const font = 'system-ui,-apple-system,sans-serif';

  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}
    >
      <svg
        viewBox="0 0 500 472"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          maxWidth: '550px',
          minWidth: '320px',
          overflow: 'visible',
        }}
        role="img"
        aria-label="Architecture flow diagram"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="7"
            markerHeight="7"
            refX="3"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 7 3.5, 0 7" fill="var(--c-divider)" />
          </marker>
        </defs>

        {/* ── Source ─────────────────────────────────────────── */}
        <rect
          x="150"
          y="4"
          width="200"
          height="46"
          rx="10"
          fill="var(--c-bg)"
          stroke="var(--c-divider)"
          strokeWidth="1"
        />
        <text
          x="250"
          y="22"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--c-text)"
          fontFamily={font}
        >
          ServiceNow Docs
        </text>
        <text
          x="250"
          y="38"
          textAnchor="middle"
          fontSize="10"
          fill="var(--c-muted)"
          fontFamily={font}
        >
          HuggingFace dataset
        </text>

        {/* Arrow 1 */}
        <line
          x1="250"
          y1="50"
          x2="250"
          y2="84"
          stroke="var(--c-divider)"
          strokeWidth="1"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="261"
          y="71"
          fontSize="10"
          fill="var(--c-muted)"
          fontFamily={font}
        >
          raw docs
        </text>

        {/* ── Step 1: Ingest ─────────────────────────────────── */}
        <rect
          x="70"
          y="88"
          width="360"
          height="66"
          rx="12"
          fill="var(--c-accent-light)"
          stroke="var(--c-accent-border)"
          strokeWidth="1.5"
        />
        <circle cx="100" cy="121" r="13" fill="var(--c-accent)" />
        <text
          x="100"
          y="125"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="white"
          fontFamily={font}
        >
          1
        </text>
        <text
          x="254"
          y="115"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="var(--c-text)"
          fontFamily={font}
        >
          {ingest.title}
        </text>
        <text
          x="254"
          y="133"
          textAnchor="middle"
          fontSize="11"
          fill="var(--c-text-secondary)"
          fontFamily={font}
        >
          embed corpus · generate vectors · load ChromaDB
        </text>

        {/* Arrow 2 */}
        <line
          x1="250"
          y1="154"
          x2="250"
          y2="190"
          stroke="var(--c-divider)"
          strokeWidth="1"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="261"
          y="176"
          fontSize="10"
          fill="var(--c-muted)"
          fontFamily={font}
        >
          vectors + metadata
        </text>

        {/* ── Fly.io wrapper ─────────────────────────────────── */}
        <rect
          x="50"
          y="198"
          width="400"
          height="190"
          rx="14"
          fill="none"
          stroke="var(--c-divider)"
          strokeWidth="1"
          strokeDasharray="6 4"
        />
        <rect x="72" y="190" width="56" height="16" rx="3" fill="var(--c-bg)" />
        <text
          x="100"
          y="202"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          letterSpacing="0.12em"
          fill="var(--c-muted)"
          fontFamily={font}
        >
          FLY.IO
        </text>

        {/* ── Step 2: Index ──────────────────────────────────── */}
        <rect
          x="90"
          y="210"
          width="320"
          height="66"
          rx="10"
          fill="var(--c-card-bg)"
          stroke="var(--c-divider)"
          strokeWidth="1"
        />
        <circle cx="118" cy="243" r="13" fill="var(--c-accent)" />
        <text
          x="118"
          y="247"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="white"
          fontFamily={font}
        >
          2
        </text>
        <text
          x="262"
          y="237"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="var(--c-text)"
          fontFamily={font}
        >
          {index.title}
        </text>
        <text
          x="262"
          y="255"
          textAnchor="middle"
          fontSize="11"
          fill="var(--c-text-secondary)"
          fontFamily={font}
        >
          product area · title · URL · position
        </text>

        {/* Arrow 3 */}
        <line
          x1="250"
          y1="276"
          x2="250"
          y2="308"
          stroke="var(--c-divider)"
          strokeWidth="1"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="261"
          y="296"
          fontSize="10"
          fill="var(--c-muted)"
          fontFamily={font}
        >
          vector queries
        </text>

        {/* ── Step 3: Serve ──────────────────────────────────── */}
        <rect
          x="90"
          y="312"
          width="320"
          height="66"
          rx="10"
          fill="var(--c-accent-light)"
          stroke="var(--c-accent-border)"
          strokeWidth="1.5"
        />
        <circle cx="118" cy="345" r="13" fill="var(--c-accent)" />
        <text
          x="118"
          y="349"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="white"
          fontFamily={font}
        >
          3
        </text>
        <text
          x="262"
          y="339"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="var(--c-text)"
          fontFamily={font}
        >
          {serve.title}
        </text>
        <text
          x="262"
          y="357"
          textAnchor="middle"
          fontSize="11"
          fill="var(--c-text-secondary)"
          fontFamily={font}
        >
          FastMCP · search · bundles · get_page · health
        </text>

        {/* Arrow 4 */}
        <line
          x1="250"
          y1="388"
          x2="250"
          y2="422"
          stroke="var(--c-divider)"
          strokeWidth="1"
          markerEnd="url(#arrowhead)"
        />
        <text
          x="261"
          y="409"
          fontSize="10"
          fill="var(--c-muted)"
          fontFamily={font}
        >
          tool responses
        </text>

        {/* ── Destination ────────────────────────────────────── */}
        <rect
          x="150"
          y="426"
          width="200"
          height="46"
          rx="10"
          fill="var(--c-bg)"
          stroke="var(--c-divider)"
          strokeWidth="1"
        />
        <text
          x="250"
          y="444"
          textAnchor="middle"
          fontSize="13"
          fontWeight="700"
          fill="var(--c-text)"
          fontFamily={font}
        >
          Agent
        </text>
        <text
          x="250"
          y="460"
          textAnchor="middle"
          fontSize="10"
          fill="var(--c-muted)"
          fontFamily={font}
        >
          Claude · Now Assist · MCP clients
        </text>
      </svg>
    </div>
  );
}

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: '11px',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--c-muted)',
        marginBottom: '18px',
      }}
    >
      {label}
    </div>
  );
}

function ActionLink({ link }: { link: CaseStudyLink }) {
  return (
    <a
      href={link.href}
      target={link.external ? '_blank' : undefined}
      rel={link.external ? 'noopener noreferrer' : undefined}
      style={primaryButtonStyle(false)}
    >
      {link.label}
    </a>
  );
}

function primaryButtonStyle(isLink: boolean): React.CSSProperties {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    minHeight: '44px',
    padding: '0 18px',
    borderRadius: '999px',
    border: '1px solid var(--c-accent-border)',
    background: isLink ? 'var(--c-card-bg)' : 'var(--c-accent)',
    color: isLink ? 'var(--c-text)' : '#fff',
    textDecoration: 'none',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
  };
}

const tagStyle: React.CSSProperties = {
  fontSize: '11px',
  fontWeight: 700,
  letterSpacing: '0.05em',
  color: 'var(--c-accent)',
  backgroundColor: 'var(--c-accent-light)',
  padding: '6px 10px',
  borderRadius: '999px',
};

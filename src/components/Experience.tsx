import { BriefcaseIcon } from '@phosphor-icons/react';
import { experience } from '../data/experience';
import SectionHeader from './SectionHeader';

interface ExperienceProps {
  isMobile: boolean;
}

export default function Experience({ isMobile }: ExperienceProps) {
  return (
    <section id="experience" style={{ padding: '64px 0' }}>
      {/* Section header + expand all */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '40px',
        }}
      >
        <SectionHeader icon={BriefcaseIcon} label="Experience" marginBottom="0" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {experience.map((role, i) => {
          const hasBullets = role.bullets.length > 0;

          return (
            <div key={i} style={{ position: 'relative' }}>
              {/* Decorative art — desktop: positioned in the margin */}
              {role.art && !isMobile && (
                <img
                  src={role.art.src}
                  alt={role.art.alt}
                  style={{
                    position: 'absolute',
                    top: '-20px',
                    [role.art.side]: '-250px',
                    width: '195px',
                    opacity: 0.29,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  }}
                />
              )}
              {/* Header row */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: '4px',
                  marginBottom: '4px',
                }}
              >
                {role.companyUrl ? (
                  <a
                    href={role.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--c-text)',
                      textDecoration: 'none',
                      borderBottom: '1px solid transparent',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.borderBottomColor = 'var(--c-text)')
                    }
                    onMouseLeave={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.borderBottomColor = 'transparent')
                    }
                  >
                    {role.company}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: '16px',
                      fontWeight: 700,
                      color: 'var(--c-text)',
                    }}
                  >
                    {role.company}
                  </span>
                )}
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--c-muted)',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {role.dates}
                </span>
              </div>

              {/* Title */}
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: 'var(--c-accent)',
                  marginBottom: '6px',
                }}
              >
                {role.title}
              </div>

              {/* Tagline + toggle */}
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
              >
                <div
                  style={{
                    fontSize: '14px',
                    color: 'var(--c-muted)',
                  }}
                >
                  {role.tagline}
                </div>
              </div>

              {/* Bullets — animated expand */}
              {hasBullets && (
                <div
                  style={{
                    overflow: 'hidden',
                    maxHeight: '600px',
                    opacity: 1,
                    transition: 'max-height 0.3s ease, opacity 0.25s ease',
                    marginTop: '14px',
                  }}
                >
                  <ul
                    style={{
                      paddingLeft: 0,
                      margin: 0,
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {role.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        style={{
                          fontSize: '14px',
                          lineHeight: 1.65,
                          color: 'var(--c-bullet)',
                          paddingLeft: '16px',
                          position: 'relative',
                        }}
                      >
                        <span
                          style={{
                            position: 'absolute',
                            left: 0,
                            top: '9px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--c-accent-border)',
                            flexShrink: 0,
                          }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Decorative art — mobile: inline below content */}
              {role.art && isMobile && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '-140px',
                  }}
                >
                  <img
                    src={role.art.src}
                    alt={role.art.alt}
                    style={{
                      width: '150px',
                      opacity: 0.14,
                      pointerEvents: 'none',
                      userSelect: 'none',
                      marginRight: '-80px',
                    }}
                  />
                </div>
              )}

              {/* Divider */}
              {i < experience.length - 1 && (
                <div
                  style={{
                    height: '1px',
                    backgroundColor: 'var(--c-divider)',
                    marginTop: '12px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

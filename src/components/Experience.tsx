import { experience } from '../data/experience';

export default function Experience() {
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
        <h2
          style={{
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#6B6B6B',
            margin: 0,
          }}
        >
          Experience
        </h2>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
        {experience.map((role, i) => {
          const hasBullets = role.bullets.length > 0;

          return (
            <div key={i} style={{ position: 'relative' }}>
              {/* Decorative art — positioned in the margin white space */}
              {role.art && (
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
                      color: '#1C1C1C',
                      textDecoration: 'none',
                      borderBottom: '1px solid transparent',
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={(e) =>
                      ((
                        e.currentTarget as HTMLAnchorElement
                      ).style.borderBottomColor = '#1C1C1C')
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
                      color: '#1C1C1C',
                    }}
                  >
                    {role.company}
                  </span>
                )}
                <span
                  style={{
                    fontSize: '12px',
                    color: '#6B6B6B',
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
                  color: '#3D5A80',
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
                    color: '#6B6B6B',
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
                          color: '#3A3A3A',
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
                            backgroundColor: '#C5D3E0',
                            flexShrink: 0,
                          }}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Divider */}
              {i < experience.length - 1 && (
                <div
                  style={{
                    height: '1px',
                    backgroundColor: '#E0DED9',
                    marginTop: '48px',
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

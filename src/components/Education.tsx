import { GraduationCapIcon } from '@phosphor-icons/react';
import SectionHeader from './SectionHeader';

const education = [
  {
    degree: 'M.S. Applied Artificial Intelligence',
    school: 'Lipscomb University',
    url: 'https://lipscomb.edu/academics/programs/applied-artificial-intelligence-ms-graduate-certificate',
    detail: '',
  },
  {
    degree: 'Web Development',
    school: 'Nashville Software School',
    url: 'https://nashvillesoftwareschool.com/',
    detail:
      'Full-stack development with JavaScript, AngularJS, NodeJS, PostgreSQL',
  },
  {
    degree: 'B.Sc. Business Administration',
    school: 'Tennessee Tech University',
    url: 'https://www.tntech.edu/',
    detail: 'Honors Scholarship, Raines Foundation Scholarship',
  },
];

export default function Education() {
  return (
    <section id="education" style={{ padding: '64px 0 80px' }}>
      <SectionHeader icon={GraduationCapIcon} label="Education" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {education.map((item, i) => (
          <div
            key={i}
            style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}
          >
            <div
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: 'var(--c-text)',
                letterSpacing: '-0.01em',
              }}
            >
              {item.degree}
            </div>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '14px',
                fontWeight: 500,
                color: 'var(--c-accent)',
                textDecoration: 'none',
                width: 'fit-content',
                borderBottom: '1px solid transparent',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) =>
                ((
                  e.currentTarget as HTMLAnchorElement
                ).style.borderBottomColor = 'var(--c-accent)')
              }
              onMouseLeave={(e) =>
                ((
                  e.currentTarget as HTMLAnchorElement
                ).style.borderBottomColor = 'transparent')
              }
            >
              {item.school}
            </a>
            {item.detail && (
              <div
                style={{ fontSize: '13px', color: 'var(--c-muted)', lineHeight: 1.5 }}
              >
                {item.detail}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

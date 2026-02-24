import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { CompassToolIcon } from '@phosphor-icons/react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import ProjectModal from './ProjectModal';
import SectionHeader from './SectionHeader';

export default function Projects({ isMobile }: { isMobile?: boolean }) {
  const [selected, setSelected] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    containScroll: false,
  });

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section id="projects" style={{ padding: '64px 0' }}>
      <SectionHeader icon={CompassToolIcon} label="Projects" marginBottom="28px" />

      {/* Breakout wrapper — lets the carousel extend beyond the content column */}
      <div
        style={
          isMobile
            ? {}
            : {
                marginLeft: '-136px',
                marginRight: '-136px',
              }
        }
      >
      {/* Carousel container */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-1px',
            width: '48px',
            height: '100%',
            background: 'linear-gradient(to right, var(--c-bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: '-1px',
            width: '48px',
            height: '100%',
            background: 'linear-gradient(to left, var(--c-bg), transparent)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Embla viewport */}
        <div ref={emblaRef} style={{ overflow: 'hidden' }}>
          <div style={{ display: 'flex' }}>
            {projects.map((project, i) => (
              <div
                key={project.id}
                style={{
                  flex: isMobile ? '0 0 78%' : '0 0 360px',
                  minWidth: 'min(280px, 100%)',
                  paddingLeft: '8px',
                  paddingRight: '8px',
                }}
              >
                <ProjectCard
                  project={project}
                  isActive={i === activeIndex}
                  isMobile={isMobile}
                  onClick={() => {
                    if (i === activeIndex) {
                      setSelected(project);
                    } else {
                      emblaApi?.scrollTo(i);
                    }
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dot nav + arrows */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginTop: '20px',
        }}
      >
        <NavArrow direction="left" onClick={scrollPrev} />

        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                width: i === activeIndex ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                backgroundColor:
                  i === activeIndex ? 'var(--c-accent)' : 'var(--c-accent-border)',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </div>

        <NavArrow direction="right" onClick={scrollNext} />
      </div>
      </div> {/* end breakout wrapper */}

      {selected && (
        <ProjectModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}

/* ─── Project Card ─── */

function ProjectCard({
  project,
  isActive,
  isMobile,
  onClick,
}: {
  project: Project;
  isActive: boolean;
  isMobile?: boolean;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: 'var(--c-card-bg)',
        border: '1px solid var(--c-divider)',
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: isActive ? 'pointer' : 'default',
        transform: isActive ? 'scale(1)' : 'scale(0.92)',
        opacity: isActive ? 1 : 0.55,
        transition: 'transform 0.35s ease, opacity 0.35s ease, box-shadow 0.25s ease',
        boxShadow:
          isActive && hovered
            ? '0 16px 48px rgba(61, 90, 128, 0.22)'
            : isActive
              ? '0 8px 32px rgba(61, 90, 128, 0.16)'
              : 'none',
      }}
    >
      {/* Screenshot */}
      <div
        style={{
          height: isMobile ? '180px' : '220px',
          overflow: 'hidden',
          backgroundColor: 'var(--c-img-bg)',
        }}
      >
        <img
          src={project.images[0]}
          alt={project.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.3s ease',
            transform: isActive && hovered ? 'scale(1.03)' : 'scale(1)',
          }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '18px 20px' }}>
        <div
          style={{
            fontSize: '15px',
            fontWeight: 700,
            color: 'var(--c-text)',
            marginBottom: '4px',
            letterSpacing: '-0.01em',
          }}
        >
          {project.name}
        </div>
        <div
          style={{
            fontSize: '13px',
            color: 'var(--c-muted)',
            lineHeight: 1.5,
            marginBottom: '14px',
          }}
        >
          {project.shortDescription}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.04em',
                color: 'var(--c-accent)',
                backgroundColor: 'var(--c-accent-light)',
                padding: '3px 8px',
                borderRadius: '3px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Arrow Button ─── */

function NavArrow({
  direction,
  onClick,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: '1px solid',
        borderColor: hovered ? 'var(--c-accent)' : 'var(--c-divider)',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: hovered ? 'var(--c-accent)' : 'var(--c-strike)',
        transition: 'all 0.2s',
        flexShrink: 0,
      }}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {direction === 'left' ? (
          <polyline points="15 18 9 12 15 6" />
        ) : (
          <polyline points="9 18 15 12 9 6" />
        )}
      </svg>
    </button>
  );
}

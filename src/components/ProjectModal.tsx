import { useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import type { Project } from '../data/projects'

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const hasMultipleImages = project.images.length > 1
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.55)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backdropFilter: 'blur(2px)',
        animation: 'fadeIn 0.15s ease',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: 'var(--c-surface)',
          borderRadius: '12px',
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.18)',
          animation: 'scaleIn 0.18s ease',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            zIndex: 10,
            background: 'var(--c-surface)',
            border: '1px solid var(--c-divider)',
            borderRadius: '6px',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--c-muted)',
            transition: 'all 0.15s',
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = 'var(--c-sidebar)'
            el.style.color = 'var(--c-text)'
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget
            el.style.backgroundColor = 'var(--c-surface)'
            el.style.color = 'var(--c-muted)'
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Image / Carousel */}
        <div style={{ position: 'relative', backgroundColor: 'var(--c-img-bg)', borderRadius: '12px 12px 0 0', overflow: 'hidden' }}>
          {hasMultipleImages ? (
            <>
              <div ref={emblaRef} style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex' }}>
                  {project.images.map((src, i) => (
                    <div key={i} style={{ flex: '0 0 100%', minWidth: 0 }}>
                      <img
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              {/* Arrows */}
              <button onClick={scrollPrev} style={arrowStyle('left')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button onClick={scrollNext} style={arrowStyle('right')}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </>
          ) : (
            <img
              src={project.images[0]}
              alt={`${project.name} screenshot`}
              style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>
          <h3
            style={{
              fontSize: '22px',
              fontWeight: 700,
              color: 'var(--c-text)',
              letterSpacing: '-0.02em',
              marginBottom: '12px',
            }}
          >
            {project.name}
          </h3>

          <p
            style={{
              fontSize: '15px',
              lineHeight: 1.7,
              color: 'var(--c-bullet)',
              marginBottom: '20px',
            }}
          >
            {project.fullDescription}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  color: 'var(--c-accent)',
                  backgroundColor: 'var(--c-accent-light)',
                  padding: '4px 10px',
                  borderRadius: '4px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* GitHub link */}
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#fff',
              textDecoration: 'none',
              padding: '10px 18px',
              backgroundColor: 'var(--c-accent)',
              borderRadius: '6px',
              transition: 'background-color 0.2s',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--c-accent-hover)')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'var(--c-accent)')}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
            </svg>
            View on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute',
    top: '50%',
    [side]: '12px',
    transform: 'translateY(-50%)',
    background: 'var(--c-surface)',
    border: '1px solid var(--c-divider)',
    borderRadius: '6px',
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    color: 'var(--c-text)',
    zIndex: 5,
  }
}

import type { Icon } from '@phosphor-icons/react';

export default function SectionHeader({
  icon: IconComponent,
  label,
  marginBottom = '40px',
}: {
  icon: Icon;
  label: string;
  marginBottom?: string;
}) {
  return (
    <h2
      style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--c-muted)',
        margin: 0,
        marginBottom,
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
        <IconComponent size={24} />
        {label}
      </span>
    </h2>
  );
}

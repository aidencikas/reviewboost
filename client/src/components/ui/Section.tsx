import { type ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  withContainer?: boolean;
  bg?: 'primary' | 'secondary' | 'tertiary' | 'none';
}

export function Section({
  children,
  className = '',
  id,
  withContainer = true,
  bg = 'none',
}: SectionProps) {
  const bgStyles: Record<string, string> = {
    primary: 'bg-[var(--bg-primary)]',
    secondary: 'bg-[var(--bg-secondary)]',
    tertiary: 'bg-[var(--bg-tertiary)]',
    none: '',
  };

  const content = withContainer ? (
    <Container>{children}</Container>
  ) : (
    children
  );

  return (
    <section
      id={id}
      className={`
        py-[var(--spacing-20)] 
        md:py-[var(--spacing-32)]
        ${bgStyles[bg]}
        ${className}
      `}
    >
      {content}
    </section>
  );
}

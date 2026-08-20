import { type ReactNode } from 'react';

type HeadingLevel = 'display' | 'h1' | 'h2' | 'h3';

interface HeadingProps {
  level: HeadingLevel;
  children: ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const levelStyles: Record<HeadingLevel, string> = {
  display: 'text-display',
  h1: 'text-h1',
  h2: 'text-h2',
  h3: 'text-h3',
};

const defaultTags: Record<HeadingLevel, 'h1' | 'h2' | 'h3'> = {
  display: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
};

export function Heading({
  level,
  children,
  className = '',
  as,
}: HeadingProps) {
  const Tag = as ?? defaultTags[level];

  return (
    <Tag
      className={`
        ${levelStyles[level]}
        text-[var(--text-primary)]
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}

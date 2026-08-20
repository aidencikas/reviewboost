import { type ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'main';
}

export function Container({
  children,
  className = '',
  as: Component = 'div',
}: ContainerProps) {
  return (
    <Component
      className={`
        w-full 
        max-w-[var(--container-max)] 
        mx-auto 
        px-[var(--container-padding)]
        ${className}
      `}
    >
      {children}
    </Component>
  );
}

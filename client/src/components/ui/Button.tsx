import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useLanguage } from '../../i18n';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
  className?: string;
}

interface ButtonAsButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

interface ButtonAsLinkProps extends BaseProps {
  /** When provided, renders a semantic <a> instead of <button> */
  href: string;
  'aria-label'?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-blue-600)]
    text-white
    hover:bg-[var(--color-blue-500)]
    active:bg-[var(--color-blue-500)]
    shadow-[var(--shadow-sm)]
    hover:shadow-[var(--shadow-glow-blue)]
  `,
  secondary: `
    bg-transparent
    border-2 border-[var(--color-gold-500)]/70
    text-[var(--text-primary)]
    hover:border-[var(--color-gold-500)]
    hover:shadow-[var(--shadow-glow-gold)]
    active:bg-[var(--bg-secondary)]
  `,
  ghost: `
    bg-transparent
    text-[var(--text-secondary)]
    hover:bg-[var(--bg-secondary)]
    hover:text-[var(--text-primary)]
    active:bg-[var(--bg-tertiary)]
  `,
  accent: `
    bg-[var(--color-gold-500)]
    text-[var(--color-navy-950)]
    hover:bg-[var(--color-gold-400)]
    active:bg-[var(--color-gold-400)]
    shadow-[var(--shadow-sm)]
    hover:shadow-[var(--shadow-glow-gold)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[36px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-7 py-3.5 text-base md:text-lg min-h-[48px]',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    children,
    isLoading = false,
    className = '',
  } = props;
  const { t } = useLanguage();

  const classes = `
    inline-flex items-center justify-center gap-2
    font-semibold
    rounded-[var(--radius-md)]
    transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]
    focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
    hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
    ${variant === 'primary' || variant === 'accent' ? 'btn-shimmer' : ''}
    ${variantStyles[variant]}
    ${sizeStyles[size]}
    ${className}
  `.replace(/\s+/g, ' ').trim();

  const content = isLoading ? (
    <>
      <svg
        className="animate-spin h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
      </svg>
      <span>{t.accessibility.loading}</span>
    </>
  ) : (
    children
  );

  // Render as semantic link when href is provided — never nest <a> in <button>
  if ('href' in props && props.href) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  const { variant: _v, size: _s, isLoading: _l, ...buttonProps } = props as ButtonAsButtonProps;

  return (
    <button
      className={classes}
      disabled={isLoading || buttonProps.disabled}
      aria-busy={isLoading || undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
}

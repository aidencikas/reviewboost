import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { useLanguage } from '../../i18n';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  isLoading?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: `
    bg-[var(--color-blue-500)] 
    text-white 
    hover:bg-[var(--color-blue-600)] 
    active:bg-[var(--color-blue-600)]
    shadow-[var(--shadow-sm)]
    hover:shadow-[var(--shadow-glow-blue)]
  `,
  secondary: `
    bg-transparent 
    border-2 border-[var(--border-primary)] 
    text-[var(--text-primary)]
    hover:border-[var(--color-blue-500)] 
    hover:text-[var(--color-blue-500)]
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
    text-[var(--color-navy-900)] 
    hover:bg-[var(--color-gold-600)] 
    active:bg-[var(--color-gold-600)]
    shadow-[var(--shadow-sm)]
    hover:shadow-[var(--shadow-glow-gold)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  isLoading = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const { t } = useLanguage();

  return (
    <button
      className={`
        inline-flex items-center justify-center gap-2
        font-semibold
        rounded-[var(--radius-md)]
        transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]
        focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
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
      )}
    </button>
  );
}

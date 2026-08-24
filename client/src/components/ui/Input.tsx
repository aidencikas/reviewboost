import { type InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  isRequired?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, isRequired, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
          {isRequired && (
            <span className="text-[var(--color-error)] ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full
            px-4 py-3
            text-base
            bg-[var(--bg-primary)]
            border ${error ? 'border-[var(--color-error)]' : 'border-[var(--border-primary)]'}
            rounded-[var(--radius-md)]
            text-[var(--text-primary)]
            placeholder:text-[var(--text-muted)]
            transition-all duration-[var(--duration-fast)] ease-[var(--ease-default)]
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent input-glow
            disabled:opacity-50 disabled:cursor-not-allowed
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          aria-required={isRequired}
          {...props}
        />
        {error && (
          <p
            id={`${inputId}-error`}
            className="text-sm text-[var(--color-error)]"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

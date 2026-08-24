import { type TextareaHTMLAttributes, forwardRef } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  isRequired?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, isRequired, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={textareaId}
          className="text-sm font-medium text-[var(--text-primary)]"
        >
          {label}
          {isRequired && (
            <span className="text-[var(--color-error)] ml-1" aria-hidden="true">
              *
            </span>
          )}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
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
            min-h-[120px]
            resize-y
            ${className}
          `}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${textareaId}-error` : undefined}
          aria-required={isRequired}
          {...props}
        />
        {error && (
          <p
            id={`${textareaId}-error`}
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

Textarea.displayName = 'Textarea';

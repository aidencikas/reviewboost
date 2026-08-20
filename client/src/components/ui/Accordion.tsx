import { useState, useRef, useEffect, useId } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen?: boolean;
  onToggle?: () => void;
}

function AccordionItem({ question, answer, isOpen = false, onToggle }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const baseId = useId();
  const buttonId = `accordion-button-${baseId}`;
  const panelId = `accordion-panel-${baseId}`;

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-[var(--border-subtle)]">
      <h3>
        <button
          id={buttonId}
          onClick={onToggle}
          className="
            w-full
            flex items-center justify-between
            py-5
            text-left
            text-[var(--text-primary)]
            font-medium
            transition-colors duration-[var(--duration-fast)]
            hover:text-[var(--color-primary)]
            focus-visible:outline-2 focus-visible:outline-[var(--color-primary)] focus-visible:outline-offset-[-2px]
          "
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          <span className="pr-4">{question}</span>
          <svg
            className={`
              w-5 h-5
              flex-shrink-0
              text-[var(--text-muted)]
              transition-transform duration-[var(--duration-normal)] ease-[var(--ease-default)]
              ${isOpen ? 'rotate-180' : ''}
            `}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </h3>
      <div
        id={panelId}
        ref={contentRef}
        className="overflow-hidden transition-all duration-[var(--duration-normal)] ease-[var(--ease-default)]"
        style={{ height: `${height}px` }}
        role="region"
        aria-labelledby={buttonId}
      >
        <p className="pb-5 text-[var(--text-secondary)] leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

interface AccordionProps {
  items: readonly { question: string; answer: string }[];
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="divide-y divide-[var(--border-subtle)]">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          question={item.question}
          answer={item.answer}
          isOpen={openIndex === index}
          onToggle={() => handleToggle(index)}
        />
      ))}
    </div>
  );
}

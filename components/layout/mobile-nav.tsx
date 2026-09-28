'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

const iconClass =
  'absolute h-5 w-5 transition duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none';

export function MobileNav({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const desktop = window.matchMedia('(min-width: 768px)');
    const closeOnDesktop = () => {
      if (desktop.matches) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    desktop.addEventListener('change', closeOnDesktop);
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.removeProperty('overflow');
      desktop.removeEventListener('change', closeOnDesktop);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div
      className="md:hidden"
      onBlur={(event) => {
        const next = event.relatedTarget;

        if (next instanceof Node && !event.currentTarget.contains(next)) {
          setOpen(false);
        }
      }}
    >
      <button
        ref={toggleRef}
        type="button"
        className="group relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[#070707] text-[var(--ink)]"
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(!open)}
      >
        <svg
          className={`${iconClass} group-aria-expanded:rotate-90 group-aria-expanded:scale-75 group-aria-expanded:opacity-0`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M5 7h14M5 12h14M5 17h14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
        <svg
          className={`${iconClass} -rotate-90 scale-75 opacity-0 group-aria-expanded:rotate-0 group-aria-expanded:scale-100 group-aria-expanded:opacity-100`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 6l12 12M18 6 6 18"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </button>
      <div
        id={panelId}
        data-open={open ? '' : undefined}
        className="mobile-nav fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-[60] overflow-y-auto border-t border-[var(--line)] bg-[#070707]"
        onClick={(event) => {
          if ((event.target as Element).closest('a')) {
            setOpen(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}

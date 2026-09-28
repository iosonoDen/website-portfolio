'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/ui/button';
import { cv, navigation } from '@/content/site';
import { withBasePath } from '@/lib/base-path';

const ease = [0.22, 1, 0.36, 1] as const;

type MobileNavProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function lockBodyScroll() {
  document.body.style.overflow = 'hidden';
}

function unlockBodyScroll() {
  document.body.style.removeProperty('overflow');
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const [mounted, setMounted] = useState(false);
  const panelId = useId();
  const reduceMotion = useReducedMotion();
  const openRef = useRef(open);

  openRef.current = open;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const collapse = () => {
      if (desktop.matches) {
        onOpenChange(false);
      }
    };

    desktop.addEventListener('change', collapse);

    return () => {
      desktop.removeEventListener('change', collapse);
    };
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) {
      return;
    }

    lockBodyScroll();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onOpenChange]);

  useEffect(() => {
    return () => {
      unlockBodyScroll();
    };
  }, []);

  const unlockBody = () => {
    if (!openRef.current) {
      unlockBodyScroll();
    }
  };

  const panel = mounted
    ? createPortal(
        <AnimatePresence onExitComplete={unlockBody}>
          {open ? (
            <motion.div
              key="mobile-nav"
              id={panelId}
              className="fixed inset-x-0 bottom-0 top-[calc(4rem+env(safe-area-inset-top))] z-[60] origin-top overflow-y-auto border-t border-[var(--line)] bg-[#070707] md:hidden"
              initial={reduceMotion ? false : { opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -14 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.38, ease }}
              onClick={(event) => {
                if ((event.target as HTMLElement).closest('a')) {
                  onOpenChange(false);
                }
              }}
            >
              <nav aria-label="Mobile navigation">
                <ul className="flex flex-col px-5 py-2">
                  {navigation.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: reduceMotion ? 0.01 : 0.32,
                        delay: reduceMotion ? 0 : 0.08 + index * 0.045,
                        ease,
                      }}
                    >
                      <a
                        className="flex min-h-14 items-center border-b border-[var(--line)] text-lg font-bold text-[var(--ink)]"
                        href={item.href}
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div
                className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0.01 : 0.32,
                  delay: reduceMotion ? 0 : 0.28,
                  ease,
                }}
              >
                <Button
                  href={withBasePath(cv.href)}
                  download={cv.filename}
                  variant="ghost"
                  className="w-full"
                >
                  {cv.label}
                </Button>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>,
        document.body,
      )
    : null;

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="relative z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--line)] bg-[#070707] text-[var(--ink)]"
        aria-controls={panelId}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => onOpenChange(!open)}
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              className="flex"
              initial={
                reduceMotion ? false : { opacity: 0, rotate: -90, scale: 0.75 }
              }
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, rotate: 90, scale: 0.75 }
              }
              transition={{ duration: reduceMotion ? 0.01 : 0.2, ease }}
            >
              <svg
                className="h-5 w-5"
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
            </motion.span>
          ) : (
            <motion.span
              key="open"
              className="flex"
              initial={
                reduceMotion ? false : { opacity: 0, rotate: 90, scale: 0.75 }
              }
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, rotate: -90, scale: 0.75 }
              }
              transition={{ duration: reduceMotion ? 0.01 : 0.2, ease }}
            >
              <svg
                className="h-5 w-5"
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
            </motion.span>
          )}
        </AnimatePresence>
      </button>
      {panel}
    </div>
  );
}

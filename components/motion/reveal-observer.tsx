'use client';

import { useEffect } from 'react';

export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // Only hide what is still below the fold, so server-rendered content
    // that is already on screen never flashes out after hydration.
    const pending = Array.from(
      document.querySelectorAll<HTMLElement>('[data-reveal]'),
    ).filter((node) => node.getBoundingClientRect().top > window.innerHeight);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-reveal', 'shown');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -15% 0px' },
    );

    for (const node of pending) {
      node.setAttribute('data-reveal', 'hidden');
      observer.observe(node);
    }

    return () => {
      observer.disconnect();

      for (const node of pending) {
        if (node.getAttribute('data-reveal') === 'hidden') {
          node.setAttribute('data-reveal', '');
        }
      }
    };
  }, []);

  return null;
}

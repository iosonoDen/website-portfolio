'use client';

import { useEffect, useRef } from 'react';

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = glowRef.current;
    const enabled = window.matchMedia(
      '(pointer: fine) and (prefers-reduced-motion: no-preference)',
    ).matches;

    if (!node || !enabled) {
      return;
    }

    const onMove = (event: PointerEvent) => {
      node.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
      node.style.opacity = '1';
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-10 -ml-20 -mt-20 hidden h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,90,31,0.16),transparent_68%)] opacity-0 will-change-transform md:block"
    />
  );
}

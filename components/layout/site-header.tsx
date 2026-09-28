'use client';

import Image from 'next/image';
import { useState } from 'react';

import { MobileNav } from '@/components/layout/mobile-nav';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { profile } from '@/content/profile';
import { cv, navigation } from '@/content/site';
import { withBasePath } from '@/lib/base-path';
import { cn } from '@/lib/cn';

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      id="site-header"
      className="bg-[color:var(--canvas)]/85 sticky top-0 z-50 overflow-visible border-b border-[var(--line)] pt-[env(safe-area-inset-top)] backdrop-blur-xl"
    >
      <Container className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
        <button
          type="button"
          className={cn(
            'inline-flex overflow-visible rounded-md border-0 bg-transparent p-1',
            menuOpen ? 'cursor-default opacity-40' : 'interactive-hit',
          )}
          aria-label={`${profile.name}, home`}
          disabled={menuOpen}
          onClick={() => {
            const reduced = window.matchMedia(
              '(prefers-reduced-motion: reduce)',
            ).matches;

            history.pushState(null, '', '#top');
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
          }}
        >
          <Image
            src={withBasePath('/brand/logo-do.png')}
            alt=""
            width={90}
            height={60}
            className="h-8 w-[4.5rem] object-contain invert"
            priority
          />
        </button>
        <nav
          className="hidden justify-self-center md:block"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center gap-1 text-sm text-[var(--muted)] lg:gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="interactive-hit inline-flex rounded-full px-3 py-2 font-bold transition-colors hover:text-[var(--ink)]"
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3 justify-self-end">
          <Button
            href={withBasePath(cv.href)}
            download={cv.filename}
            variant="ghost"
            className="hidden md:inline-flex"
          >
            {cv.label}
          </Button>
          <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
        </div>
      </Container>
    </header>
  );
}

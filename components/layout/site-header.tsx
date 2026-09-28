import Image from 'next/image';

import { MobileNav } from '@/components/layout/mobile-nav';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';
import { profile } from '@/content/profile';
import { cv, navigation } from '@/content/site';
import { withBasePath } from '@/lib/base-path';

export function SiteHeader() {
  return (
    // Blur lives on ::before: backdrop-filter on the header itself would trap
    // the fixed mobile panel inside the header box.
    <header
      id="site-header"
      className="group/header sticky top-0 z-50 border-b border-[var(--line)] pt-[env(safe-area-inset-top)] before:absolute before:inset-0 before:-z-10 before:bg-canvas/85 before:backdrop-blur-xl"
    >
      <Container className="grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-4">
        <a
          href="#top"
          aria-label={`${profile.name}, home`}
          className="interactive-hit inline-flex rounded-md p-1 group-has-[[aria-expanded=true]]/header:pointer-events-none group-has-[[aria-expanded=true]]/header:opacity-40"
        >
          <Image
            src={withBasePath('/brand/logo-do.png')}
            alt=""
            width={90}
            height={60}
            className="h-8 w-[4.5rem] object-contain invert"
            priority
          />
        </a>
        <nav
          className="hidden justify-self-center md:block"
          aria-label="Primary navigation"
        >
          <ul className="flex items-center gap-1 text-sm text-[var(--muted)] lg:gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="interactive-hit inline-flex whitespace-nowrap rounded-full px-2 py-2 font-bold transition-colors hover:text-[var(--ink)] lg:px-3"
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
          <MobileNav>
            <nav aria-label="Mobile navigation">
              <ul className="flex flex-col px-5 py-2">
                {navigation.map((item, index) => (
                  <li
                    key={item.href}
                    data-nav-item=""
                    style={{ animationDelay: `${80 + index * 45}ms` }}
                  >
                    <a
                      className="flex min-h-14 items-center border-b border-[var(--line)] text-lg font-bold text-[var(--ink)]"
                      href={item.href}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div
              data-nav-item=""
              className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 [--nav-item-from:translateY(8px)]"
              style={{ animationDelay: '280ms' }}
            >
              <Button
                href={withBasePath(cv.href)}
                download={cv.filename}
                variant="ghost"
                className="w-full"
              >
                {cv.label}
              </Button>
            </div>
          </MobileNav>
        </div>
      </Container>
    </header>
  );
}

import type { ComponentType } from 'react';

import {
  EmailIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
} from '@/components/ui/social-icons';
import { profile } from '@/content/profile';
import type { SocialLink } from '@/types/content';

const icons: Record<
  SocialLink['label'],
  ComponentType<{ className?: string }>
> = {
  Email: EmailIcon,
  LinkedIn: LinkedInIcon,
  GitHub: GitHubIcon,
  Instagram: InstagramIcon,
};

export function SocialLinks() {
  return (
    <ul className="flex flex-wrap items-center gap-2 sm:gap-3">
      {profile.social.map((item) => {
        const Icon = icons[item.label];
        const external = item.href.startsWith('http');

        return (
          <li key={item.label} className="group relative">
            <a
              className="interactive-hit inline-flex h-11 w-11 items-center justify-center rounded-full text-[var(--muted)]"
              href={item.href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              aria-label={item.label}
            >
              <Icon className="h-5 w-5" />
            </a>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-full z-20 mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[var(--line)] bg-[var(--surface-elevated)] px-3 py-1 text-xs font-semibold text-[var(--ink)] opacity-0 transition-opacity duration-200 group-focus-within:opacity-100 group-hover:opacity-100"
            >
              {item.label}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

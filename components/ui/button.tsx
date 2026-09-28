import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/cn';

const styles = {
  primary: 'bg-[var(--accent-strong)] text-[#140804]',
  secondary:
    'border border-[var(--accent-strong)] bg-transparent text-[var(--accent-strong)]',
  ghost: 'border border-[var(--line)] bg-white/[0.03] text-[var(--ink)]',
  text: 'px-0 text-[var(--ink)] underline-offset-8',
};

type ButtonProps = ComponentPropsWithoutRef<'a'> & {
  href: string;
  variant?: keyof typeof styles;
};

export function Button({
  href,
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  const external = href.startsWith('http');

  return (
    <a
      className={cn(
        'interactive-hit inline-flex min-h-11 touch-manipulation items-center justify-center gap-2 overflow-visible rounded-full px-5 text-sm font-semibold tracking-[-0.01em]',
        styles[variant],
        className,
      )}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
      {...props}
    />
  );
}

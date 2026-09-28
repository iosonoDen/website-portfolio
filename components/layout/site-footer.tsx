import { Container } from '@/components/ui/container';
import { siteVersion } from '@/content/version';

export function SiteFooter() {
  const versionLabel = `v${siteVersion}`;

  return (
    <footer className="border-t border-[var(--line)] py-8 pb-[max(2rem,env(safe-area-inset-bottom))] sm:py-10">
      <Container className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <p className="text-xs tracking-wide text-[var(--muted)]">
          {versionLabel}
        </p>
        <p className="text-center text-xs text-[var(--muted)] sm:text-sm">
          © {new Date().getFullYear()} Copyright - Oteri Dennis, Milan
        </p>
        <p className="invisible text-xs tracking-wide" aria-hidden="true">
          {versionLabel}
        </p>
      </Container>
    </footer>
  );
}

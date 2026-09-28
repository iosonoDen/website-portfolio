import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadWithBasePath(basePath: string) {
  vi.stubEnv('NEXT_PUBLIC_BASE_PATH', basePath);
  vi.resetModules();

  return (await import('../lib/base-path')).withBasePath;
}

describe('withBasePath', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('keeps root-relative paths when the site is served from /', async () => {
    const withBasePath = await loadWithBasePath('');

    expect(withBasePath('/images/og-image.jpg')).toBe('/images/og-image.jpg');
  });

  it('prefixes the GitHub Pages project path', async () => {
    const withBasePath = await loadWithBasePath('/website-portfolio');

    expect(withBasePath('/dennis-oteri-cv.pdf')).toBe(
      '/website-portfolio/dennis-oteri-cv.pdf',
    );
  });
});

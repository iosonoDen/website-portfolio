import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { profile } from '../content/profile';
import { aboutPhoto, cv, shareImage } from '../content/site';
import { caseStudies } from '../content/work';

const referencedFiles = [
  profile.photo.src,
  aboutPhoto.src,
  shareImage.src,
  cv.href,
  ...caseStudies.map((study) => study.image.src),
];

describe('content assets', () => {
  it.each(referencedFiles)('%s exists in public/', (path) => {
    expect(existsSync(join(process.cwd(), 'public', path))).toBe(true);
  });

  it('uses a JPEG or PNG share image, which LinkedIn can render', () => {
    expect(shareImage.src).toMatch(/\.(jpe?g|png)$/);
  });
});

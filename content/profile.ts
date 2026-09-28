import type { Profile } from '@/types/content';

const email = 'dennis.oteri@gmail.com';

export const profile: Profile = {
  name: 'Dennis Oteri',
  role: 'Front End Developer',
  location: 'Milan, Italy | Varese, Italy\nCanton Ticino, Switzerland - Available to move',
  email,
  headline: 'Dennis Oteri',
  lede: 'I create interfaces designed to have a tangible impact on the feasibility of the project. I design and develop eye-catching interfaces for products destined to take the market by storm.',
  photo: {
    src: '/images/dennis-oteri.webp',
    alt: 'Portrait of Dennis Oteri against a red backdrop, wearing a black polo shirt.',
    width: 1534,
    height: 1790,
  },
  social: [
    { label: 'Email', href: `mailto:${email}` },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dennisoteri/' },
    { label: 'GitHub', href: 'https://github.com/iosonoDen' },
    { label: 'Instagram', href: 'https://www.instagram.com/dennis.oteri/' },
  ],
  stats: [
    { value: 1, suffix: '+', label: 'Years of experience' },
    { value: 9, suffix: '+', label: 'Technologies in production' },
  ],
};

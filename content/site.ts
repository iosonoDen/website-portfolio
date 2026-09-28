import type { ImageAsset, PublicPath } from '@/types/content';

export const aboutStory = [
  'My bond with technology began with a PlayStation 1: officially a maternity gift, but practically the perfect excuse for my father to play with it on weekends. I grew up playing iconic titles until late at night. By age of five, I was already capable of booting up the console myself on our old CRT TV.',
  'Realizing this early fascination, my parents soon bought me my first desktop PC. I learned to type on a keyboard before I could even hold a pen, funnily enough. As I grew older, playing videogames became somewhat of a background passion, but that initial spark never faded.',
  'The real turning point came in 2020. Surfing the web was no longer enough to me, so I began self-teaching and diving into the mechanics behind every click. Today, I am no longer just a spectator but a digital architect, building web experiences with the same intensity that started it all.',
];

export const aboutPhoto: ImageAsset = {
  src: '/images/about.jpg',
  alt: 'A child sitting on the carpet playing Crash Bandicoot on a PlayStation 1 connected to a CRT television.',
  width: 1024,
  height: 558,
};

export const navigation = [
  { href: '#work', label: 'Projects' },
  { href: '#about', label: 'About Me' },
  { href: '#experience', label: 'Jobs Journey' },
  { href: '#skills', label: 'Stacks' },
  { href: '#contact', label: 'Contacts' },
];

export const cv: { href: PublicPath; label: string; filename: string } = {
  href: '/dennis-oteri-cv.pdf',
  label: 'Download CV',
  filename: 'Dennis-Oteri-CV.pdf',
};

export const siteName = 'Dennis Oteri - Portfolio';

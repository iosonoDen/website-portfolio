import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';

import { profile } from '@/content/profile';
import { siteName } from '@/content/site';

import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const description = profile.lede;

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#070707',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ),
  applicationName: siteName,
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    siteName,
    description,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: profile.photo.src,
        width: profile.photo.width,
        height: profile.photo.height,
        alt: profile.photo.alt,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteName,
    description,
    images: [
      {
        url: profile.photo.src,
        width: profile.photo.width,
        height: profile.photo.height,
        alt: profile.photo.alt,
      },
    ],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Milan',
    addressCountry: 'IT',
  },
  sameAs: profile.social
    .filter((item) => item.href.startsWith('http'))
    .map((item) => item.href),
  knowsAbout: [
    'React',
    'TypeScript',
    'Next.js',
    'Payment software',
    'Web accessibility',
    'Node.js',
    'MySQL',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <script id="person-jsonld" type="application/ld+json">
          {JSON.stringify(jsonLd).replace(/</g, '\\u003c')}
        </script>
        {children}
      </body>
    </html>
  );
}

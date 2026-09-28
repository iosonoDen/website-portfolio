import Image from 'next/image';

import { Container } from '@/components/ui/container';
import { CountUp } from '@/components/ui/count-up';
import { profile } from '@/content/profile';
import { withBasePath } from '@/lib/base-path';

export function Hero() {
  return (
    <section
      className="relative overflow-visible py-8 sm:py-14 md:flex md:min-h-[calc(100svh-4rem)] md:items-center lg:py-10"
      aria-labelledby="hero-title"
    >
      <Container className="grid items-stretch gap-8 overflow-visible md:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)] md:gap-x-8 md:gap-y-0 lg:grid-cols-[minmax(0,1.1fr)_minmax(22rem,34rem)] lg:gap-x-14 xl:gap-x-20">
        <div>
          <p className="whitespace-pre-line text-[0.62rem] font-semibold uppercase leading-5 tracking-[0.1em] text-[var(--accent-strong)] sm:text-[0.72rem] sm:leading-6 sm:tracking-[0.18em]">
            {profile.location}
          </p>
          <p className="mt-5 text-base text-[var(--muted)] sm:mt-6 sm:text-lg">
            Hello, I&apos;m
          </p>
          <h1
            id="hero-title"
            className="mt-1 text-[clamp(2.7rem,13.5vw,3.75rem)] font-semibold leading-[0.9] tracking-[-0.06em] text-[var(--ink)] sm:text-7xl sm:leading-[0.86] sm:tracking-[-0.07em] lg:text-[clamp(4.5rem,7.6vw,7.25rem)]"
          >
            {profile.headline}
          </h1>
          <p className="mt-5 max-w-[34rem] text-base leading-7 text-[var(--muted)] sm:mt-6 sm:text-lg sm:leading-8">
            {profile.lede}
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[28rem] md:col-start-2 md:row-span-3 md:mx-0 md:h-full md:max-w-none">
          <div className="relative aspect-[767/895] overflow-hidden rounded-[1.25rem] bg-[#c2410c] md:absolute md:inset-x-0 md:-bottom-8 md:-top-8 md:aspect-auto">
            <Image
              src={withBasePath(profile.photo.src)}
              alt={profile.photo.alt}
              fill
              priority
              unoptimized
              sizes="(min-width: 1024px) 544px, 90vw"
              className="object-cover object-center [image-rendering:-webkit-optimize-contrast]"
            />
          </div>
        </div>

        <div className="hidden md:col-start-1 md:mt-8 md:block md:min-h-11" aria-hidden="true" />

        <dl className="flex flex-wrap gap-x-10 gap-y-5 border-t border-[var(--line)] pt-6 md:col-start-1 md:mt-10 md:gap-x-12 md:gap-y-6 md:pt-8">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-[0.72rem] font-bold uppercase leading-5 tracking-[0.08em] text-[var(--muted)] sm:whitespace-nowrap sm:text-[0.8rem] sm:tracking-[0.12em]">
                {stat.label}
              </dt>
              <dd className="mt-2 text-[2.35rem] font-semibold leading-none tracking-[-0.06em] text-[var(--ink)] sm:text-5xl">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

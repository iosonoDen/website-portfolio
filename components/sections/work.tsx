import Image from 'next/image';

import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { caseStudies } from '@/content/work';
import { withBasePath } from '@/lib/base-path';

export function Work() {
  return (
    <section id="work" className="border-y border-[var(--line)] bg-[var(--surface)] py-16 sm:py-32" aria-labelledby="work-title">
      <Container>
        <Reveal>
          <SectionHeading
            id="work-title"
            eyebrow="Projects"
            title="Current projects."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 sm:mt-16 sm:gap-6 lg:grid-cols-2">
          {caseStudies.map((study, index) => (
            <Reveal key={study.id} delay={index * 0.08}>
              <article className="relative flex min-h-[20rem] flex-col justify-end overflow-hidden border border-[var(--line)] bg-[var(--surface-elevated)] p-5 transition-transform duration-300 sm:min-h-[24rem] sm:p-8 md:hover:-translate-y-1">
                <Image
                  src={withBasePath(study.image.src)}
                  alt={study.image.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/15" />
                <div className="relative">
                  <h3 className="text-2xl font-semibold tracking-[-0.05em] sm:text-3xl">{study.title}</h3>
                  <p className="mt-3 max-w-xl text-[0.95rem] leading-7 text-[var(--muted)] sm:mt-4 sm:text-base">
                    {study.description}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

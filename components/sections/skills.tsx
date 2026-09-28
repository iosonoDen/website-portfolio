import { Reveal } from '@/components/motion/reveal';
import { Container } from '@/components/ui/container';
import { SectionHeading } from '@/components/ui/section-heading';
import { skillIcons } from '@/components/ui/skill-icons';
import { skillGroups } from '@/content/skills';
import type { SkillItem } from '@/types/content';

function SkillTile({ id, label }: SkillItem) {
  const Icon = skillIcons[id];

  return (
    <li>
      <div className="interactive-hit flex h-full min-h-[5.25rem] flex-col items-center justify-center gap-2 rounded-lg bg-[var(--surface-elevated)] px-2 py-3 text-center sm:min-h-[6.25rem] sm:gap-2.5">
        <Icon className="h-8 w-8 text-white sm:h-9 sm:w-9" />
        <span className="text-[0.65rem] font-semibold leading-tight text-[var(--ink)] sm:text-xs">
          {label}
        </span>
      </div>
    </li>
  );
}

export function Skills() {
  return (
    <section
      id="skills"
      className="py-16 sm:py-32"
      aria-labelledby="skills-title"
    >
      <Container>
        <Reveal>
          <SectionHeading
            id="skills-title"
            eyebrow="Stacks"
            title="Tools I ship with."
            description="Sorted by usage."
          />
        </Reveal>
        <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)] sm:mt-12">
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.06}>
              <article className="grid gap-4 py-6 sm:gap-5 sm:py-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--accent-strong)] sm:text-lg">
                  {group.title}
                </h3>
                <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
                  {group.items.map((item) => (
                    <SkillTile key={item.id} id={item.id} label={item.label} />
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

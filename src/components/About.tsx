'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

export function About() {
  const t = useTranslations('about');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    <section id="about" className="u-shell scroll-mt-24 py-24 sm:py-32 lg:py-40">
      <Reveal>
        <SectionLabel index="01">{t('label')}</SectionLabel>
      </Reveal>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal delay={0.05}>
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
              {t('title')}
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-8 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
              {t('paragraph1')}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-[52ch] leading-relaxed text-ink-soft">
              {t('paragraph2')}
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 font-display text-xl italic text-sage-deep">
              {t('signature')}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="mt-12 grid grid-cols-3 divide-x divide-line border-y border-line">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-6 first:pl-0">
                  <dt className="font-display text-2xl text-ink sm:text-3xl">{s.value}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.14em] text-ink-soft">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={36}>
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
            <Image
              src="/images/interior.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

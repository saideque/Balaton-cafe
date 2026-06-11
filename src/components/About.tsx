'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { photos } from '@/content/photos';
import { Reveal } from './Reveal';

export function About() {
  const t = useTranslations('about');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
  ];

  return (
    <section id="about" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="u-shell grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <Reveal>
            <h2 className="max-w-[16ch] text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] text-forest">
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
            <p className="mt-8 font-semibold text-forest">{t('signature')}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <dl className="mt-12 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="rounded-2xl bg-white p-5">
                  <dt className="font-display text-xl font-extrabold text-forest sm:text-2xl">
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-ink-soft">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        <Reveal delay={0.1} y={36}>
          {/* Real interior photo is landscape — 4/3 avoids a harsh crop. */}
          <figure className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-cream-2 lg:aspect-[4/3.4]">
            <Image
              src={photos.interior}
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

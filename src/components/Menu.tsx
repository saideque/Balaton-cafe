'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { menu, type MenuTag } from '@/content/menu';
import { pick } from '@/content/localize';
import type { Locale } from '@/../i18n/routing';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

export function Menu() {
  const t = useTranslations('menu');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(menu[0].id);

  const category = menu.find((c) => c.id === active) ?? menu[0];

  const tagLabel: Record<MenuTag, string> = {
    signature: t('tagSignature'),
    new: t('tagNew'),
    seasonal: t('tagSeasonal'),
  };

  return (
    <section id="menu" className="scroll-mt-24 border-t border-line bg-paper-2/40 py-24 sm:py-32 lg:py-40">
      <div className="u-shell">
        <Reveal>
          <SectionLabel index="02">{t('label')}</SectionLabel>
        </Reveal>

        <div className="mt-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Reveal delay={0.05}>
            <h2 className="text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">{t('title')}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[34ch] text-sm text-ink-soft">{t('intro')}</p>
          </Reveal>
        </div>

        {/* Category tabs */}
        <Reveal delay={0.1}>
          <div className="no-scrollbar mt-12 flex gap-8 overflow-x-auto border-b border-line">
            {menu.map((c) => {
              const isActive = c.id === active;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(c.id)}
                  className={`relative whitespace-nowrap pb-4 text-sm transition-colors ${
                    isActive ? 'text-ink' : 'text-ink-soft/60 hover:text-ink'
                  }`}
                >
                  {pick(c.title, locale)}
                  {isActive && (
                    <motion.span
                      layoutId="menu-underline"
                      className="absolute inset-x-0 -bottom-px h-0.5 bg-terracotta"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          {/* Items */}
          <AnimatePresence mode="wait">
            <motion.ul
              key={category.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="divide-y divide-line"
            >
              {category.items.map((item) => (
                <li key={pick(item.name, 'pl')} className="flex items-baseline gap-4 py-5">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-xl text-ink">
                        {pick(item.name, locale)}
                      </h3>
                      {item.tag && (
                        <span className="rounded-full border border-sage/40 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.14em] text-sage-deep">
                          {tagLabel[item.tag]}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 max-w-[44ch] text-sm leading-relaxed text-ink-soft">
                      {pick(item.description, locale)}
                    </p>
                  </div>
                  <div
                    aria-hidden
                    className="mx-1 hidden flex-1 translate-y-[-3px] border-b border-dotted border-line sm:block"
                  />
                  <span className="font-display text-lg text-ink">{item.price} zł</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>

          {/* Category image */}
          <div className="relative hidden lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={category.image}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] overflow-hidden rounded-[2px]"
                >
                  <Image
                    src={category.image}
                    alt={pick(category.title, locale)}
                    fill
                    sizes="40vw"
                    className="object-cover"
                  />
                </motion.figure>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-12 text-xs uppercase tracking-[0.14em] text-ink-soft/70">
            {t('note')}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

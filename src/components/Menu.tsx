'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { menu, allCategories, formatPrice, type MenuTag } from '@/content/menu';
import { pick } from '@/content/localize';
import type { Locale } from '@/../i18n/routing';
import { Reveal } from './Reveal';

export function Menu() {
  const t = useTranslations('menu');
  const locale = useLocale() as Locale;
  const [active, setActive] = useState(allCategories[0].id);
  const panelRef = useRef<HTMLDivElement>(null);

  const category =
    allCategories.find((c) => c.id === active) ?? allCategories[0];

  const tagLabel: Record<MenuTag, string> = {
    signature: t('tagSignature'),
    new: t('tagNew'),
    seasonal: t('tagSeasonal'),
  };

  function select(id: string) {
    setActive(id);
    // Keep the item panel in view when picking a category further down.
    panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  return (
    <section id="menu" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="u-shell">
        <Reveal>
          <h2 className="text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] text-forest">
            {t('title')}
          </h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-4 max-w-[50ch] text-ink-soft">{t('intro')}</p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          {/* Circular category grid, grouped Starbucks-style */}
          <div className="flex flex-col gap-10">
            {menu.map((group) => (
              <Reveal key={group.id}>
                <div>
                  <h3 className="border-b border-line pb-3 text-lg font-bold text-ink">
                    {pick(group.title, locale)}
                  </h3>
                  <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3">
                    {group.categories.map((c) => {
                      const isActive = c.id === active;
                      return (
                        <li key={c.id}>
                          <button
                            type="button"
                            onClick={() => select(c.id)}
                            className="group flex w-full flex-col items-center gap-3 text-center"
                            aria-pressed={isActive}
                          >
                            <span
                              className={`relative block h-24 w-24 overflow-hidden rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)] ring-offset-2 transition-all duration-300 sm:h-28 sm:w-28 ${
                                isActive
                                  ? 'ring-[3px] ring-forest'
                                  : 'ring-1 ring-line group-hover:ring-2 group-hover:ring-forest/50'
                              }`}
                            >
                              <Image
                                src={c.image}
                                alt=""
                                fill
                                sizes="112px"
                                className="object-contain p-2"
                              />
                            </span>
                            <span
                              className={`text-sm font-semibold leading-snug transition-colors ${
                                isActive ? 'text-forest' : 'text-ink-soft group-hover:text-ink'
                              }`}
                            >
                              {pick(c.title, locale)}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Item panel */}
          <div ref={panelRef} className="scroll-mt-24">
            <div className="lg:sticky lg:top-24">
              <AnimatePresence mode="wait">
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-3xl bg-cream p-7 sm:p-10"
                >
                  <div className="flex items-center gap-5">
                    <span className="relative block h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
                      <Image
                        src={category.image}
                        alt=""
                        fill
                        sizes="64px"
                        className="object-contain p-1.5"
                      />
                    </span>
                    <h3 className="text-2xl font-extrabold text-forest">
                      {pick(category.title, locale)}
                    </h3>
                  </div>

                  <ul className="mt-6 divide-y divide-line">
                    {category.items.map((item) => (
                      <li key={pick(item.name, 'pl')} className="py-4">
                        <div className="flex items-baseline justify-between gap-4">
                          <div className="flex flex-wrap items-center gap-2.5">
                            <span className="font-semibold text-ink">
                              {pick(item.name, locale)}
                            </span>
                            {item.tag && (
                              <span className="rounded-full bg-forest px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.1em] text-cream">
                                {tagLabel[item.tag]}
                              </span>
                            )}
                          </div>
                          <span className="shrink-0 rounded-full bg-white px-3 py-1 text-sm font-bold text-forest">
                            {formatPrice(item.price, locale)}
                          </span>
                        </div>
                        {item.description && (
                          <p className="mt-1 max-w-[48ch] text-sm leading-relaxed text-ink-soft">
                            {pick(item.description, locale)}
                          </p>
                        )}
                        {item.priceNote && (
                          <p className="mt-1 text-xs text-ink-soft/80">
                            {pick(item.priceNote, locale)}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>

              <p className="mt-6 text-xs uppercase tracking-[0.14em] text-ink-soft/70">
                {t('note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { photos } from '@/content/photos';
import { getOpenState, type OpenState } from '@/lib/hours';

export function Hero() {
  const t = useTranslations('hero');
  const tv = useTranslations('visit');
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<OpenState | null>(null);

  // Open/closed is time-dependent — client-only to avoid a hydration mismatch.
  useEffect(() => {
    const update = () => setOpen(getOpenState());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // The hidden state must be identical on server and client (no reduced-motion
  // branch — that causes a hydration mismatch). Reduced motion gets an
  // instant transition instead.
  const container: Variants = {
    hidden: {},
    show: {
      transition: reduce
        ? { staggerChildren: 0, delayChildren: 0 }
        : { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    // Collage hero: one dark canvas, photo cards layered over it.
    // pt-20 = the fixed header's height, so nothing hides under it.
    <section
      id="top"
      className="relative grid min-h-[100svh] overflow-hidden bg-forest-deep pt-20 lg:grid-cols-[1.05fr_0.95fr]"
    >
      {/* Decorative gold rings */}
      <div
        aria-hidden
        className="absolute -top-44 right-[-120px] h-[520px] w-[520px] rounded-full border border-gold/35"
      />
      <div
        aria-hidden
        className="absolute -bottom-24 right-[330px] hidden h-60 w-60 rounded-full border border-gold/20 lg:block"
      />

      {/* Text panel */}
      <div className="flex items-center text-cream">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full px-6 py-14 sm:px-12 lg:py-24 xl:pl-[max(3rem,calc((100vw-1320px)/2+4.5rem))] xl:pr-10"
        >
          <motion.p
            variants={item}
            className="mb-6 text-xs font-bold uppercase tracking-[0.22em] text-gold"
          >
            {t('kicker')}
          </motion.p>

          <motion.h1
            variants={item}
            className="max-w-[12ch] text-[clamp(2.6rem,5.5vw,4.8rem)] leading-[1.02] text-cream"
          >
            {t('title')} <span className="text-gold">{t('titleAccent')}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-[46ch] text-base leading-relaxed text-cream/85 sm:text-lg"
          >
            {t('lede')}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
            <a href="#menu" className="u-pill bg-cream text-forest hover:bg-white">
              {t('ctaMenu')}
            </a>
            <a
              href="#visit"
              className="u-pill border border-cream/40 text-cream hover:border-cream hover:bg-cream/10"
            >
              {t('ctaVisit')}
            </a>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-12 text-xs uppercase tracking-[0.2em] text-cream/50"
          >
            {t('since')} · Warszawa
          </motion.p>
        </motion.div>
      </div>

      {/* Photo collage */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-6 mb-12 h-[420px] sm:mx-12 sm:h-[480px] lg:m-0 lg:h-auto"
      >
        {/* Main card — the café by the pond */}
        <motion.figure
          variants={item}
          className="absolute right-0 top-6 h-[62%] w-[82%] overflow-hidden rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.45)] lg:right-14 lg:top-16 lg:w-[78%]"
        >
          <Image
            src={photos.hero}
            alt="Balaton Cafe nad Jeziorkiem Balaton"
            fill
            priority
            sizes="(max-width: 1024px) 82vw, 38vw"
            className="object-cover"
          />
        </motion.figure>

        {/* Overlapping food card */}
        <motion.figure
          variants={item}
          className="absolute bottom-6 left-0 h-[48%] w-[46%] overflow-hidden rounded-2xl border-[3px] border-gold shadow-[0_24px_60px_rgba(0,0,0,0.5)] lg:bottom-14 lg:left-2 lg:w-[42%]"
        >
          <Image
            src={photos.food}
            alt=""
            fill
            sizes="(max-width: 1024px) 46vw, 20vw"
            className="object-cover"
          />
        </motion.figure>

        {/* Live open/closed chip */}
        <motion.div
          variants={item}
          className={`absolute bottom-16 right-4 flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-semibold text-forest shadow-[0_14px_34px_rgba(0,0,0,0.4)] transition-opacity duration-300 lg:bottom-28 lg:right-20 ${
            open ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${open?.isOpen ? 'bg-[#1e7a3c]' : 'bg-terracotta'}`}
          />
          {open?.isOpen
            ? `${tv('openNow')} · ${tv('closesAt', { time: open.closesAt })}`
            : open
              ? `${tv('closedNow')} · ${tv('opensAt', { time: open.opensAt })}`
              : '…'}
        </motion.div>
      </motion.div>
    </section>
  );
}

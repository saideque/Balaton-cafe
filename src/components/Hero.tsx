'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
  };
  const item: Variants = {
    hidden: reduce ? {} : { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
      {/* Background photograph */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-lakeside.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-ink/10 to-transparent" />
      </div>

      {/* Vertical marker */}
      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="block rotate-90 text-xs uppercase tracking-[0.3em] text-paper/70">
          {t('since')} · Warszawa
        </span>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="u-shell relative z-10 pb-20 pt-40 text-paper"
      >
        <motion.p variants={item} className="mb-6 text-xs uppercase tracking-[0.24em] text-paper/90">
          {t('kicker')}
        </motion.p>

        <motion.h1
          variants={item}
          className="max-w-[14ch] text-[clamp(3rem,9vw,7.5rem)] leading-[0.95] text-paper"
        >
          {t('title')}{' '}
          <span className="italic text-terracotta">{t('titleAccent')}</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-8 max-w-[46ch] text-base leading-relaxed text-paper/90 sm:text-lg [text-shadow:0_1px_20px_rgba(33,28,22,0.35)]"
        >
          {t('lede')}
        </motion.p>

        <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#menu"
            className="rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
          >
            {t('ctaMenu')}
          </a>
          <a
            href="#visit"
            className="rounded-full border border-paper/50 px-7 py-3.5 text-sm text-paper transition-colors duration-300 hover:bg-paper/10"
          >
            {t('ctaVisit')}
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        aria-label={t('scroll')}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="u-shell relative z-10 mb-8 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-paper/70"
      >
        <motion.span
          animate={reduce ? {} : { y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown size={15} strokeWidth={1.5} />
        </motion.span>
        {t('scroll')}
      </motion.a>
    </section>
  );
}

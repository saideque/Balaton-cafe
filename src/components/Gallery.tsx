'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { gallery } from '@/content/gallery';
import { pick } from '@/content/localize';
import type { Locale } from '@/../i18n/routing';
import { Reveal } from './Reveal';

const spanClass: Record<string, string> = {
  wide: 'md:col-span-2',
  tall: 'md:row-span-2',
  square: '',
};

export function Gallery() {
  const t = useTranslations('gallery');
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="scroll-mt-20 bg-forest py-24 text-cream sm:py-32">
      <div className="u-shell">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <h2 className="text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] text-cream">
              {t('title')}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[34ch] text-sm text-cream/70">{t('intro')}</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-12 grid auto-rows-[44vw] grid-cols-1 gap-3 sm:auto-rows-[230px] sm:grid-cols-2 md:auto-rows-[210px] md:grid-cols-4">
            {gallery.map((img, i) => (
              <button
                key={img.src}
                type="button"
                onClick={() => setOpen(i)}
                className={`group relative overflow-hidden rounded-2xl bg-forest-deep ${spanClass[img.span]}`}
                aria-label={pick(img.alt, locale)}
              >
                <Image
                  src={img.src}
                  alt={pick(img.alt, locale)}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-lake group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/15" />
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 sm:p-10"
            onClick={close}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={close}
              // Move keyboard focus into the dialog when it opens.
              autoFocus
              className="absolute right-5 top-5 text-cream/80 transition-colors hover:text-cream"
              aria-label="Close"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              className="absolute left-3 text-cream/70 transition-colors hover:text-cream sm:left-8"
              aria-label="Previous"
            >
              <ChevronLeft size={36} strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              className="absolute right-3 text-cream/70 transition-colors hover:text-cream sm:right-8"
              aria-label="Next"
            >
              <ChevronRight size={36} strokeWidth={1.25} />
            </button>

            <motion.figure
              key={gallery[open].src}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-full max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[70vh] w-[88vw] max-w-5xl">
                <Image
                  src={gallery[open].src}
                  alt={pick(gallery[open].alt, locale)}
                  fill
                  sizes="90vw"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 text-center text-sm text-cream/70">
                {pick(gallery[open].alt, locale)}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

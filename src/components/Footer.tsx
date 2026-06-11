'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUp, Instagram, Facebook } from 'lucide-react';
import { site } from '@/content/site';
import { pick } from '@/content/localize';
import type { Locale } from '@/../i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

const SECTIONS = ['about', 'menu', 'gallery', 'visit'] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const tv = useTranslations('visit');
  const locale = useLocale() as Locale;

  return (
    // Gold hairline ties the dark footer to the light Visit section above it.
    <footer className="border-t-2 border-gold/70 bg-forest-deep text-cream">
      <div className="u-shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-5xl font-extrabold leading-none sm:text-6xl">
              Balaton<span className="text-gold">.</span>
            </p>
            <p className="mt-6 max-w-[34ch] text-cream/70">{t('tagline')}</p>
          </div>

          {/* Explore */}
          <nav>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cream/50">
              {t('explore')}
            </p>
            <ul className="mt-5 flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <a href={`#${s}`} className="u-link text-cream/80 hover:text-cream">
                    {tn(s)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cream/50">
              {t('visitUs')}
            </p>
            <address className="mt-5 not-italic text-cream/80">
              {site.address.street}
              <br />
              {site.address.postcode} {site.address.city}
              <br />
              {pick(site.address.country, locale)}
            </address>
            <p className="mt-4 text-cream/80">
              {tv('everyday')}
              <br />
              {site.hours.open} – {site.hours.close}
            </p>
          </div>

          {/* Contact + social */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-cream/50">
              {tv('contactTitle')}
            </p>
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="u-link mt-5 inline-block text-cream/80 hover:text-cream"
            >
              {site.phone}
            </a>
            <div className="mt-6 flex items-center gap-4">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-cream hover:text-cream"
              >
                <Instagram size={17} strokeWidth={1.5} />
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cream/25 text-cream/80 transition-colors hover:border-cream hover:text-cream"
              >
                <Facebook size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-cream/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-cream/50">
            © {new Date().getFullYear()} {site.name}. {t('rights')}
          </p>
          <div className="flex items-center gap-8">
            <LanguageSwitcher className="text-cream/70" />
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-cream/70 transition-colors hover:text-cream"
            >
              {t('backToTop')}
              <ArrowUp size={14} strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

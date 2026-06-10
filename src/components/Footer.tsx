'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowUp, Instagram, Facebook } from 'lucide-react';
import { site } from '@/content/site';
import { pick } from '@/content/localize';
import type { Locale } from '@/../i18n/routing';
import { LanguageSwitcher } from './LanguageSwitcher';

const SECTIONS = ['about', 'menu', 'gallery', 'visit', 'contact'] as const;

export function Footer() {
  const t = useTranslations('footer');
  const tn = useTranslations('nav');
  const locale = useLocale() as Locale;

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="u-shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <p className="font-display text-5xl leading-none sm:text-6xl">
              Balaton<span className="text-terracotta">.</span>
            </p>
            <p className="mt-6 max-w-[34ch] text-paper/70">{t('tagline')}</p>
            <div className="mt-8 flex items-center gap-4">
              <a
                href={site.socials.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                <Instagram size={17} strokeWidth={1.5} />
              </a>
              <a
                href={site.socials.facebook}
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-paper/25 text-paper/80 transition-colors hover:border-paper hover:text-paper"
              >
                <Facebook size={17} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <nav>
            <p className="u-label text-paper/50">{t('explore')}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {SECTIONS.map((s) => (
                <li key={s}>
                  <a href={`#${s}`} className="u-link text-paper/80 hover:text-paper">
                    {tn(s)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Visit */}
          <div>
            <p className="u-label text-paper/50">{t('visitUs')}</p>
            <address className="mt-5 not-italic text-paper/80">
              {site.address.street}
              <br />
              {site.address.postcode} {site.address.city}
              <br />
              {pick(site.address.country, locale)}
            </address>
            <p className="mt-4 text-paper/80">
              {site.hours.open} – {site.hours.close}
            </p>
            <a
              href={`tel:${site.phone.replace(/\s/g, '')}`}
              className="mt-1 inline-block u-link text-paper/80 hover:text-paper"
            >
              {site.phone}
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-paper/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-paper/50">
            © {new Date().getFullYear()} {site.name}. {t('rights')}
          </p>
          <div className="flex items-center gap-8">
            <LanguageSwitcher className="text-paper/70" />
            <a
              href="#top"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-paper"
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

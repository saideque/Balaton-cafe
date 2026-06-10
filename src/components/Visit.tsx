'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { site } from '@/content/site';
import { getOpenState, type OpenState } from '@/lib/hours';
import { Reveal } from './Reveal';
import { SectionLabel } from './SectionLabel';

export function Visit() {
  const t = useTranslations('visit');
  const [state, setState] = useState<OpenState | null>(null);

  useEffect(() => {
    const update = () => setState(getOpenState());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="visit" className="scroll-mt-24 border-t border-line bg-paper-2/40 py-24 sm:py-32 lg:py-40">
      <div className="u-shell">
        <Reveal>
          <SectionLabel index="04">{t('label')}</SectionLabel>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-12 max-w-[18ch] text-[clamp(2rem,4.5vw,3.4rem)] leading-[1.05]">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Info column */}
          <div className="flex flex-col gap-10">
            {/* Hours */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-ink-soft">
                <Clock size={16} strokeWidth={1.5} />
                <span className="u-label">{t('hoursTitle')}</span>
              </div>
              <p className="font-display text-2xl text-ink">{t('everyday')}</p>
              <p className="mt-1 text-lg text-ink-soft">
                {site.hours.open} – {site.hours.close}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm">
                <span
                  className={`h-2 w-2 rounded-full ${
                    state?.isOpen ? 'bg-sage' : 'bg-terracotta'
                  } ${state ? '' : 'opacity-0'}`}
                />
                {state && (
                  <span className={state.isOpen ? 'text-sage-deep' : 'text-terracotta'}>
                    {state.isOpen
                      ? `${t('openNow')} · ${t('closesAt', { time: state.closesAt })}`
                      : `${t('closedNow')} · ${t('opensAt', { time: state.opensAt })}`}
                  </span>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-ink-soft">
                <MapPin size={16} strokeWidth={1.5} />
                <span className="u-label">{t('addressTitle')}</span>
              </div>
              <p className="text-lg leading-relaxed text-ink">
                {site.address.street}
                <br />
                {site.address.postcode} {site.address.city}
              </p>
              <a
                href={site.mapsLink}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-sage-deep u-link"
              >
                {t('directions')}
                <ArrowUpRight size={15} strokeWidth={1.5} />
              </a>
            </div>

            {/* Contact */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-ink-soft">
                <Phone size={16} strokeWidth={1.5} />
                <span className="u-label">{t('contactTitle')}</span>
              </div>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="text-lg text-ink u-link"
              >
                {site.phone}
              </a>
              <div className="mt-5 flex items-center gap-4">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  <Instagram size={17} strokeWidth={1.5} />
                </a>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  <Facebook size={17} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <Reveal delay={0.1} y={30}>
            <div className="relative h-[340px] overflow-hidden rounded-[2px] border border-line sm:h-[460px] lg:h-full lg:min-h-[460px]">
              <iframe
                src={site.mapEmbedUrl}
                title={`${site.name} — ${site.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.2]"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

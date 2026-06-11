'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MapPin, Phone, Clock, ArrowUpRight, Instagram, Facebook } from 'lucide-react';
import { site } from '@/content/site';
import { getOpenState, type OpenState } from '@/lib/hours';
import { Reveal } from './Reveal';

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
    // Light closing section — the dark footer right after it is the page's
    // single dark ending (gallery is forest, so cream here keeps the rhythm).
    <section id="visit" className="scroll-mt-20 bg-cream py-24 sm:py-32">
      <div className="u-shell">
        <Reveal>
          <h2 className="max-w-[18ch] text-[clamp(2.2rem,4.5vw,3.6rem)] leading-[1.05] text-forest">
            {t('title')}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Info column */}
          <div className="flex flex-col gap-10">
            {/* Hours */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-forest">
                <Clock size={16} strokeWidth={1.75} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  {t('hoursTitle')}
                </span>
              </div>
              <p className="text-2xl font-bold text-ink">{t('everyday')}</p>
              <p className="mt-1 text-lg text-ink-soft">
                {site.hours.open} – {site.hours.close}
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold">
                <span
                  className={`h-2 w-2 rounded-full ${
                    state?.isOpen ? 'bg-forest' : 'bg-terracotta'
                  } ${state ? '' : 'opacity-0'}`}
                />
                {state && (
                  <span className={state.isOpen ? 'text-forest' : 'text-terracotta'}>
                    {state.isOpen
                      ? `${t('openNow')} · ${t('closesAt', { time: state.closesAt })}`
                      : `${t('closedNow')} · ${t('opensAt', { time: state.opensAt })}`}
                  </span>
                )}
              </div>
            </div>

            {/* Address */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-forest">
                <MapPin size={16} strokeWidth={1.75} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  {t('addressTitle')}
                </span>
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
                className="u-pill mt-5 bg-forest text-cream hover:bg-forest-deep"
              >
                {t('directions')}
                <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            </div>

            {/* Contact */}
            <div>
              <div className="mb-4 flex items-center gap-2 text-forest">
                <Phone size={16} strokeWidth={1.75} />
                <span className="text-xs font-bold uppercase tracking-[0.18em]">
                  {t('contactTitle')}
                </span>
              </div>
              <a
                href={`tel:${site.phone.replace(/\s/g, '')}`}
                className="u-link text-lg text-ink"
              >
                {site.phone}
              </a>
              <div className="mt-5 flex items-center gap-4">
                <a
                  href={site.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-forest hover:text-forest"
                >
                  <Instagram size={17} strokeWidth={1.5} />
                </a>
                <a
                  href={site.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-forest hover:text-forest"
                >
                  <Facebook size={17} strokeWidth={1.5} />
                </a>
              </div>
            </div>
          </div>

          {/* Map */}
          <Reveal delay={0.1} y={30}>
            <div className="relative h-[340px] overflow-hidden rounded-3xl bg-white p-2 shadow-[0_12px_40px_rgba(27,27,27,0.08)] sm:h-[460px] lg:h-full lg:min-h-[460px]">
              <iframe
                src={site.mapEmbedUrl}
                title={`${site.name} — ${site.address.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full rounded-2xl"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

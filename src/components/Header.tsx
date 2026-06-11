'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu as MenuIcon, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

const SECTIONS = ['about', 'menu', 'gallery', 'visit'] as const;

export function Header() {
  const t = useTranslations('nav');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-forest text-cream transition-shadow duration-500 ease-lake ${
        scrolled ? 'shadow-[0_2px_24px_rgba(0,0,0,0.25)]' : ''
      }`}
    >
      <nav className="u-shell flex items-center justify-between py-4">
        <a
          href="#top"
          className="font-display text-xl font-extrabold tracking-tight text-cream"
          aria-label="Balaton Cafe"
        >
          Balaton<span className="text-gold">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                className="u-link text-sm font-semibold text-cream/85 hover:text-cream"
              >
                {t(s)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher className="text-cream/80" />
          <a
            href="#visit"
            className="u-pill bg-cream text-forest hover:bg-white"
          >
            {t('reserve')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-cream md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon size={24} strokeWidth={1.75} />
        </button>
      </nav>

      {/* Mobile drawer — inert while closed so its links can't take focus */}
      <div
        inert={!open}
        className={`fixed inset-0 z-50 bg-forest transition-transform duration-500 ease-lake md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="u-shell flex items-center justify-between py-4">
          <span className="font-display text-xl font-extrabold text-cream">
            Balaton<span className="text-gold">.</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-cream"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.75} />
          </button>
        </div>
        <ul className="u-shell mt-10 flex flex-col gap-7">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="font-display text-4xl font-extrabold text-cream"
              >
                {t(s)}
              </a>
            </li>
          ))}
        </ul>
        <div className="u-shell mt-12">
          <LanguageSwitcher className="text-sm text-cream/80" />
        </div>
      </div>
    </header>
  );
}

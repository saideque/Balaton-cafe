'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu as MenuIcon, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

const SECTIONS = ['about', 'menu', 'gallery', 'visit', 'contact'] as const;

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
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-lake ${
        scrolled
          ? 'border-b border-line bg-paper/85 backdrop-blur-md'
          : 'border-b border-transparent'
      }`}
    >
      <nav className="u-shell flex items-center justify-between py-4">
        <a
          href="#top"
          className="font-display text-xl tracking-tight text-ink"
          aria-label="Balaton Cafe"
        >
          Balaton<span className="text-terracotta">.</span>
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a href={`#${s}`} className="u-link text-sm text-ink-soft hover:text-ink">
                {t(s)}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 md:flex">
          <LanguageSwitcher />
          <a
            href="#visit"
            className="rounded-full border border-ink px-5 py-2 text-sm text-ink transition-colors duration-300 hover:bg-ink hover:text-paper"
          >
            {t('reserve')}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="text-ink md:hidden"
          aria-label="Open menu"
        >
          <MenuIcon size={24} strokeWidth={1.5} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 bg-paper transition-transform duration-500 ease-lake md:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="u-shell flex items-center justify-between py-4">
          <span className="font-display text-xl text-ink">
            Balaton<span className="text-terracotta">.</span>
          </span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-ink"
            aria-label="Close menu"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <ul className="u-shell mt-10 flex flex-col gap-7">
          {SECTIONS.map((s) => (
            <li key={s}>
              <a
                href={`#${s}`}
                onClick={() => setOpen(false)}
                className="font-display text-4xl text-ink"
              >
                {t(s)}
              </a>
            </li>
          ))}
        </ul>
        <div className="u-shell mt-12">
          <LanguageSwitcher className="text-sm" />
        </div>
      </div>
    </header>
  );
}

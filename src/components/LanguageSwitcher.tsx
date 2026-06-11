'use client';

import { Fragment } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/../i18n/navigation';
import { routing } from '@/../i18n/routing';

/** Colors inherit from the parent (`className`) so it works on any background. */
export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1.5 text-xs tracking-[0.18em] ${className}`}>
      {routing.locales.map((loc, i) => (
        <Fragment key={loc}>
          {i > 0 && <span className="opacity-40">·</span>}
          <Link
            href={pathname}
            locale={loc}
            aria-current={loc === locale ? 'true' : undefined}
            className={
              loc === locale
                ? 'font-bold'
                : 'opacity-60 transition-opacity hover:opacity-100'
            }
          >
            {loc.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

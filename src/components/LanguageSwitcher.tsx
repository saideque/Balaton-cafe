'use client';

import { Fragment } from 'react';
import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/../i18n/navigation';
import { routing } from '@/../i18n/routing';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-1.5 text-xs tracking-[0.18em] ${className}`}>
      {routing.locales.map((loc, i) => (
        <Fragment key={loc}>
          {i > 0 && <span className="text-line">·</span>}
          <Link
            href={pathname}
            locale={loc}
            aria-current={loc === locale ? 'true' : undefined}
            className={
              loc === locale
                ? 'text-ink'
                : 'text-ink-soft/60 transition-colors hover:text-ink'
            }
          >
            {loc.toUpperCase()}
          </Link>
        </Fragment>
      ))}
    </div>
  );
}

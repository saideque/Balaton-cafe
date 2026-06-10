import type { Locale } from '@/../i18n/routing';

/** A string that exists in both supported locales. */
export type Localized = Record<Locale, string>;

/** Pick the value for the active locale, falling back to Polish. */
export function pick(value: Localized, locale: Locale): string {
  return value[locale] ?? value.pl;
}

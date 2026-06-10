import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import { routing, type Locale } from '@/../i18n/routing';
import { site } from '@/content/site';
import './globals.css';

// Both are variable fonts — omitting `weight` loads the full weight range.
const display = Fraunces({
  subsets: ['latin', 'latin-ext'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Hanken_Grotesk({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: Locale };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'hero' });
  const title = `${site.name} — ${
    locale === 'pl' ? 'Kawiarnia nad wodą w Warszawie' : 'Lakeside café in Warsaw'
  }`;

  return {
    metadataBase: new URL('https://balatoncafe.pl'),
    title: {
      default: title,
      template: `%s · ${site.name}`,
    },
    description: t('lede'),
    alternates: {
      canonical: `/${locale}`,
      languages: { pl: '/pl', en: '/en' },
    },
    openGraph: {
      title,
      description: t('lede'),
      type: 'website',
      locale: locale === 'pl' ? 'pl_PL' : 'en_GB',
      siteName: site.name,
      images: [{ url: '/images/hero-lakeside.png', width: 1376, height: 768 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: t('lede'),
      images: ['/images/hero-lakeside.png'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    name: site.name,
    image: 'https://balatoncafe.pl/images/hero-lakeside.png',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postcode,
      addressLocality: site.address.city,
      addressCountry: 'PL',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    telephone: site.phone,
    url: 'https://balatoncafe.pl',
    servesCuisine: ['Coffee', 'Café', 'Desserts'],
    priceRange: '$$',
    openingHours: 'Mo-Su 11:00-21:00',
    sameAs: [site.socials.instagram, site.socials.facebook],
  };

  return (
    <html lang={locale} className={`${display.variable} ${sans.variable}`}>
      <body>
        <div className="grain" aria-hidden="true" />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

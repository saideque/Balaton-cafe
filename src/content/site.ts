import type { Localized } from './localize';

export interface OpeningHours {
  /** 0 = Sunday … 6 = Saturday */
  open: string; // "HH:MM"
  close: string; // "HH:MM"
}

export interface SiteSettings {
  name: string;
  tagline: Localized;
  address: {
    street: string;
    city: string;
    postcode: string;
    country: Localized;
  };
  geo: { lat: number; lng: number };
  phone: string;
  email: string;
  /** Shared hours for every day of the week (Mon–Sun 11:00–21:00). */
  hours: OpeningHours;
  timeZone: string;
  mapEmbedUrl: string;
  mapsLink: string;
  socials: { instagram: string; facebook: string };
}

export const site: SiteSettings = {
  name: 'Balaton Cafe',
  tagline: {
    pl: 'Kawa, gofry i cisza nad wodą.',
    en: 'Coffee, waffles & calm by the water.',
  },
  address: {
    street: 'ul. Jana Nowaka-Jeziorańskiego',
    city: 'Warszawa',
    postcode: '03-982',
    country: { pl: 'Polska', en: 'Poland' },
  },
  geo: { lat: 52.2298418, lng: 21.0881288 },
  phone: '+48 663 566 220',
  email: 'kontakt@balatoncafe.pl',
  hours: { open: '11:00', close: '21:00' },
  timeZone: 'Europe/Warsaw',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Balaton+Cafe,ul.+Jana+Nowaka-Jezioranskiego,Warszawa&output=embed',
  mapsLink:
    'https://www.google.com/maps/place/Balaton+Cafe/@52.2298418,21.0881288,17z',
  socials: {
    instagram: 'https://www.instagram.com/balaton.cafe/',
    facebook: 'https://www.facebook.com/balaton.caffe/',
  },
};

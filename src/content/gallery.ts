import type { Localized } from './localize';

export interface GalleryImage {
  src: string;
  alt: Localized;
  /** Layout hint for the asymmetric grid. */
  span: 'tall' | 'wide' | 'square';
}

export const gallery: GalleryImage[] = [
  {
    src: '/images/hero-lakeside.png',
    alt: {
      pl: 'Taras kawiarni nad Jeziorkiem Balaton o zachodzie słońca',
      en: 'Café deck by the Balaton pond at sunset',
    },
    span: 'wide',
  },
  {
    src: '/images/latte-art.png',
    alt: {
      pl: 'Flat white z latte art w kamionkowym kubku',
      en: 'Flat white with latte art in a stoneware cup',
    },
    span: 'tall',
  },
  {
    src: '/images/waffle.png',
    alt: {
      pl: 'Gofr z owocami i bitą śmietaną',
      en: 'Waffle with fresh fruit and whipped cream',
    },
    span: 'square',
  },
  {
    src: '/images/interior.png',
    alt: {
      pl: 'Minimalistyczne wnętrze kawiarni z widokiem na wodę',
      en: 'Minimal café interior with a view of the water',
    },
    span: 'wide',
  },
  {
    src: '/images/apple-cake.png',
    alt: {
      pl: 'Kawałek ciepłej szarlotki na talerzu',
      en: 'A slice of warm apple cake on a plate',
    },
    span: 'square',
  },
  {
    src: '/images/lifestyle.png',
    alt: {
      pl: 'Cappuccino i sernik na drewnianym stole przy oknie',
      en: 'Cappuccino and cheesecake on a wooden table by the window',
    },
    span: 'tall',
  },
];

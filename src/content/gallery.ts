import type { Localized } from './localize';
import { photos } from './photos';

export interface GalleryImage {
  src: string;
  alt: Localized;
  /** Layout hint for the asymmetric grid. */
  span: 'tall' | 'wide' | 'square';
}

/**
 * Five tiles pack the 4-column mosaic exactly:
 * row 1 — wide (2) + tall (1, spans 2 rows) + square (1)
 * row 2 — wide (2) + square (1) + tall continuation (1)
 */
export const gallery: GalleryImage[] = [
  {
    src: photos.hero,
    alt: {
      pl: 'Balaton Cafe nad Jeziorkiem Balaton o złotej godzinie',
      en: 'Balaton Cafe on the Balaton pond at golden hour',
    },
    span: 'wide',
  },
  {
    src: photos.food,
    alt: {
      pl: 'Kawałek tortu pistacjowego i frappe z bitą śmietaną',
      en: 'A slice of pistachio cake and a frappe with whipped cream',
    },
    span: 'tall',
  },
  {
    src: photos.momentWaffle,
    alt: {
      pl: 'Mrożona kawa i gofr z kremem czekoladowym nad wodą',
      en: 'Iced coffee and a chocolate-spread waffle by the water',
    },
    span: 'square',
  },
  {
    src: photos.interior2,
    alt: {
      pl: 'Neonowy rożek lodowy i lada kawiarni',
      en: 'Neon ice-cream cone sign and the café counter',
    },
    span: 'wide',
  },
  {
    src: photos.momentBeer,
    alt: {
      pl: 'Piwo i nachos z dipami na tarasie nad jeziorkiem',
      en: 'Beer and nachos with dips on the lakeside deck',
    },
    span: 'square',
  },
];

import type { Locale } from '@/../i18n/routing';
import type { Localized } from './localize';
import { categoryPhotos } from './photos';

export type MenuTag = 'signature' | 'new' | 'seasonal';

export interface MenuItem {
  name: Localized;
  description?: Localized;
  /** Price in PLN. */
  price: number;
  /** Extra pricing detail shown after the price (e.g. second size). */
  priceNote?: Localized;
  tag?: MenuTag;
}

export interface MenuCategory {
  id: string;
  title: Localized;
  /** Category cut-out photo (see ./photos.ts) for the circular grid. */
  image: string;
  items: MenuItem[];
}

export interface MenuGroup {
  id: string;
  title: Localized;
  categories: MenuCategory[];
}

/** "13.5" → "13,50 zł" (pl) / "13.50 zł" (en); whole numbers stay short. */
export function formatPrice(price: number, locale: Locale): string {
  const sep = locale === 'pl' ? ',' : '.';
  const text = Number.isInteger(price)
    ? String(price)
    : price.toFixed(2).replace('.', sep);
  return `${text} zł`;
}

/**
 * The real Balaton Cafe menu, transcribed from the in-café menu board
 * (Google Maps photo, April 2024). Prices in PLN.
 */
export const menu: MenuGroup[] = [
  {
    id: 'coffee-tea',
    title: { pl: 'Kawa i herbata', en: 'Coffee & tea' },
    categories: [
      {
        id: 'coffee',
        title: { pl: 'Kawa', en: 'Coffee' },
        image: categoryPhotos.coffee,
        items: [
          { name: { pl: 'Espresso', en: 'Espresso' }, price: 7 },
          {
            name: { pl: 'Doppio', en: 'Doppio' },
            description: { pl: 'Podwójne espresso.', en: 'Double espresso.' },
            price: 9,
          },
          {
            name: { pl: 'Americano', en: 'Americano' },
            description: {
              pl: 'Espresso przedłużone gorącą wodą.',
              en: 'Espresso topped up with hot water.',
            },
            price: 10,
          },
          {
            name: { pl: 'Flat White', en: 'Flat White' },
            description: {
              pl: 'Espresso z gorącym mlekiem.',
              en: 'Espresso with hot milk.',
            },
            price: 14,
            tag: 'signature',
          },
          {
            name: { pl: 'Espresso Macchiato', en: 'Espresso Macchiato' },
            description: {
              pl: 'Espresso z odrobiną piany mlecznej.',
              en: 'Espresso with a dab of milk foam.',
            },
            price: 9,
          },
          {
            name: { pl: 'Espresso Affogato', en: 'Espresso Affogato' },
            description: {
              pl: 'Espresso z lodami waniliowymi.',
              en: 'Espresso over vanilla ice cream.',
            },
            price: 12,
          },
          {
            name: { pl: 'Espresso con Panna', en: 'Espresso con Panna' },
            description: {
              pl: 'Espresso z bitą śmietaną.',
              en: 'Espresso with whipped cream.',
            },
            price: 10,
          },
          { name: { pl: 'Cappuccino', en: 'Cappuccino' }, price: 13.5 },
          {
            name: { pl: 'Cappuccino con Panna', en: 'Cappuccino con Panna' },
            description: {
              pl: 'Cappuccino z bitą śmietaną.',
              en: 'Cappuccino with whipped cream.',
            },
            price: 14.5,
          },
          { name: { pl: 'Latte', en: 'Latte' }, price: 13.5 },
          {
            name: { pl: 'Mocha', en: 'Mocha' },
            description: {
              pl: 'Espresso, gorąca czekolada i gorące mleko.',
              en: 'Espresso, hot chocolate and hot milk.',
            },
            price: 16,
          },
        ],
      },
      {
        id: 'iced-coffee',
        title: { pl: 'Kawa na zimno i z alkoholem', en: 'Iced & spirited coffee' },
        image: categoryPhotos.icedCoffee,
        items: [
          {
            name: { pl: 'Ice Americano', en: 'Ice Americano' },
            description: { pl: 'Z kostkami lodu.', en: 'Over ice.' },
            price: 11,
          },
          {
            name: { pl: 'Frappe', en: 'Frappe' },
            description: {
              pl: 'Espresso z mlekiem i kostkami lodu.',
              en: 'Espresso with milk and ice.',
            },
            price: 14,
          },
          {
            name: { pl: 'Frappe Vanilla', en: 'Vanilla Frappe' },
            description: {
              pl: 'Z lodami waniliowymi i bitą śmietaną.',
              en: 'With vanilla ice cream and whipped cream.',
            },
            price: 16,
          },
          {
            name: { pl: 'Ice Mocha', en: 'Ice Mocha' },
            description: {
              pl: 'Espresso z mlekiem, czekoladą, bitą śmietaną i lodami czekoladowymi.',
              en: 'Espresso with milk, chocolate, whipped cream and chocolate ice cream.',
            },
            price: 20,
          },
          {
            name: { pl: 'Italian Coffee', en: 'Italian Coffee' },
            description: {
              pl: 'Espresso z amaretto i bitą śmietaną.',
              en: 'Espresso with amaretto and whipped cream.',
            },
            price: 19,
          },
          {
            name: { pl: 'Irish Coffee', en: 'Irish Coffee' },
            description: {
              pl: 'Z irlandzką whisky i bitą śmietaną.',
              en: 'With Irish whiskey and whipped cream.',
            },
            price: 19,
          },
          {
            name: { pl: 'Kawa Barraquito', en: 'Barraquito' },
            description: {
              pl: 'Espresso, Licor 43, mleko skondensowane, cynamon i piana mleczna.',
              en: 'Espresso, Licor 43, condensed milk, cinnamon and milk foam.',
            },
            price: 20,
            tag: 'signature',
          },
        ],
      },
      {
        id: 'tea',
        title: { pl: 'Herbata i czekolada', en: 'Tea & hot chocolate' },
        image: categoryPhotos.tea,
        items: [
          {
            name: { pl: 'Herbata', en: 'Tea' },
            description: { pl: 'Do wyboru.', en: 'Your choice of blend.' },
            price: 12,
          },
          {
            name: { pl: 'Gorąca czekolada tradycyjna', en: 'Traditional hot chocolate' },
            description: {
              pl: 'Produkt sezonowy (zimowy). Dodatki od 2 zł, dodatki alkoholowe 5 zł.',
              en: 'Seasonal (winter). Toppings from 2 zł, spirited add-ons 5 zł.',
            },
            price: 13,
            tag: 'seasonal',
          },
        ],
      },
    ],
  },
  {
    id: 'sweet',
    title: { pl: 'Na słodko', en: 'Sweet treats' },
    categories: [
      {
        id: 'waffles',
        title: { pl: 'Gofry', en: 'Waffles' },
        image: categoryPhotos.waffles,
        items: [
          {
            name: { pl: 'Gofr na słodko i słono', en: 'Sweet or savoury waffle' },
            description: {
              pl: 'Dodatki słodkie: cukier puder, bita śmietana, owoce, polewy, Nutella. Na słono: serek topiony, szynka, salami, feta, warzywa i sosy.',
              en: 'Sweet toppings: icing sugar, whipped cream, fruit, sauces, Nutella. Savoury: cream cheese, ham, salami, feta, vegetables and dips.',
            },
            price: 7,
            priceNote: { pl: '+ dodatki od 0,50 zł', en: '+ toppings from 0.50 zł' },
            tag: 'signature',
          },
        ],
      },
      {
        id: 'ice-cream',
        title: { pl: 'Lody', en: 'Ice cream' },
        image: categoryPhotos.iceCream,
        items: [
          {
            name: { pl: 'Lody — gałka', en: 'Ice cream — scoop' },
            price: 6,
          },
        ],
      },
      {
        id: 'rurka',
        title: { pl: 'Rurka', en: 'Cream roll' },
        image: categoryPhotos.rurka,
        items: [
          {
            name: { pl: 'Rurka z bitą śmietaną', en: 'Wafer roll with whipped cream' },
            price: 5,
          },
          {
            name: { pl: 'Rurka pusta', en: 'Plain wafer roll' },
            price: 3.5,
          },
        ],
      },
    ],
  },
  {
    id: 'cold-drinks',
    title: { pl: 'Napoje zimne', en: 'Cold drinks' },
    categories: [
      {
        id: 'smoothies',
        title: { pl: 'Smoothies i shakes', en: 'Smoothies & shakes' },
        image: categoryPhotos.smoothies,
        items: [
          {
            name: { pl: 'Fantazja', en: 'Fantazja' },
            description: {
              pl: 'Banan, jabłko, maliny i świeżo wyciskany sok pomarańczowy.',
              en: 'Banana, apple, raspberries and fresh orange juice.',
            },
            price: 17,
          },
          {
            name: { pl: 'Leśna Poezja', en: 'Forest Poetry' },
            description: {
              pl: 'Mix owoców leśnych z jogurtem naturalnym i miodem.',
              en: 'Forest fruit mix with natural yoghurt and honey.',
            },
            price: 17,
          },
          {
            name: { pl: 'Ananas-Brzoskwinia', en: 'Pineapple-Peach' },
            description: {
              pl: 'Z jogurtem naturalnym.',
              en: 'With natural yoghurt.',
            },
            price: 17,
          },
          {
            name: { pl: 'Burak Inaczej', en: 'Beetroot Twist' },
            description: { pl: 'Burak, jabłko i owoce.', en: 'Beetroot, apple and fruit.' },
            price: 17,
          },
          {
            name: { pl: 'Moc Zieleni', en: 'Green Power' },
            description: {
              pl: 'Jabłko, gruszka, kiwi, mięta i awokado.',
              en: 'Apple, pear, kiwi, mint and avocado.',
            },
            price: 17,
          },
          {
            name: { pl: 'Detox', en: 'Detox' },
            description: {
              pl: 'Burak, szpinak, seler, banan i ananas.',
              en: 'Beetroot, spinach, celery, banana and pineapple.',
            },
            price: 17,
          },
          {
            name: { pl: 'Zdrowy Wycisk', en: 'Healthy Squeeze' },
            description: {
              pl: 'Burak, jabłko, szpinak, marchew i skórka cytrynowa.',
              en: 'Beetroot, apple, spinach, carrot and lemon zest.',
            },
            price: 17,
          },
          {
            name: { pl: 'Witaminowy Poranek', en: 'Vitamin Morning' },
            description: {
              pl: 'Banan, ananas, mango i szpinak.',
              en: 'Banana, pineapple, mango and spinach.',
            },
            price: 17,
          },
          {
            name: { pl: 'Shake', en: 'Shake' },
            description: {
              pl: 'Bananowy, waniliowy, malinowy, czekoladowy lub malinowo-bananowy.',
              en: 'Banana, vanilla, raspberry, chocolate or raspberry-banana.',
            },
            price: 17,
          },
        ],
      },
      {
        id: 'lemonade',
        title: { pl: 'Lemoniada i soki', en: 'Lemonade & juices' },
        image: categoryPhotos.lemonade,
        items: [
          {
            name: { pl: 'Lemoniada cytrynowa', en: 'Lemon lemonade' },
            price: 12,
          },
          {
            name: { pl: 'Sok świeżo wyciskany', en: 'Freshly squeezed juice' },
            description: {
              pl: 'Pomarańczowy, grejpfrutowy lub mix.',
              en: 'Orange, grapefruit or mixed.',
            },
            price: 17,
          },
        ],
      },
      {
        id: 'softy',
        title: { pl: 'Softy', en: 'Soft drinks' },
        image: categoryPhotos.softy,
        items: [
          {
            name: { pl: 'Napoje gazowane i soki', en: 'Sodas & bottled juices' },
            description: {
              pl: 'Pepsi, Mirinda, 7up, tonik, Lipton, Tymbark — 0,2 l.',
              en: 'Pepsi, Mirinda, 7up, tonic, Lipton, Tymbark — 0.2 l.',
            },
            price: 9.5,
          },
          {
            name: { pl: 'Woda Krakowianka Źródło', en: 'Krakowianka spring water' },
            price: 7,
          },
        ],
      },
    ],
  },
  {
    id: 'snacks-bar',
    title: { pl: 'Przekąski i bar', en: 'Snacks & bar' },
    categories: [
      {
        id: 'snacks',
        title: { pl: 'Przekąski', en: 'Snacks' },
        image: categoryPhotos.snacks,
        items: [
          {
            name: { pl: 'Orzeszki / paluszki', en: 'Peanuts / pretzel sticks' },
            price: 6,
          },
          {
            name: { pl: 'Nachos z dipami', en: 'Nachos with dips' },
            price: 11,
          },
        ],
      },
      {
        id: 'beer',
        title: { pl: 'Piwo', en: 'Beer' },
        image: categoryPhotos.beer,
        items: [
          {
            name: { pl: 'Kozel (lane)', en: 'Kozel (draft)' },
            price: 15,
            priceNote: { pl: '0,5 l · 0,3 l — 12,50 zł', en: '0.5 l · 0.3 l — 12.50 zł' },
          },
          {
            name: { pl: 'Książęce (lane)', en: 'Książęce (draft)' },
            price: 15.5,
            priceNote: { pl: '0,5 l · 0,3 l — 13,50 zł', en: '0.5 l · 0.3 l — 13.50 zł' },
          },
          {
            name: { pl: 'Tyskie Gronie (lane)', en: 'Tyskie Gronie (draft)' },
            price: 14.5,
            priceNote: { pl: '0,5 l · 0,3 l — 11,50 zł', en: '0.5 l · 0.3 l — 11.50 zł' },
          },
          {
            name: { pl: 'Pilsner Urquell', en: 'Pilsner Urquell' },
            price: 14.5,
            priceNote: { pl: '0,5 l', en: '0.5 l' },
          },
          {
            name: { pl: 'Książęce', en: 'Książęce' },
            price: 16.5,
            priceNote: { pl: '0,5 l', en: '0.5 l' },
          },
          {
            name: { pl: 'Grolsch', en: 'Grolsch' },
            price: 19.5,
            priceNote: { pl: '0,45 l', en: '0.45 l' },
          },
          {
            name: { pl: 'Redds', en: 'Redds' },
            price: 11.5,
            priceNote: { pl: '0,4 l', en: '0.4 l' },
          },
          {
            name: { pl: 'Lech Shandy', en: 'Lech Shandy' },
            price: 12.5,
            priceNote: { pl: '0,5 l', en: '0.5 l' },
          },
          {
            name: { pl: 'Captain Jack', en: 'Captain Jack' },
            price: 12.5,
            priceNote: { pl: '0,4 l', en: '0.4 l' },
          },
          {
            name: { pl: 'Hardmade', en: 'Hardmade' },
            price: 12.5,
            priceNote: { pl: '0,4 l', en: '0.4 l' },
          },
          {
            name: { pl: 'Lech Free (bezalkoholowe)', en: 'Lech Free (alcohol-free)' },
            price: 11,
            priceNote: { pl: '0,33 l', en: '0.33 l' },
          },
        ],
      },
      {
        id: 'drinks',
        title: { pl: 'Drinki', en: 'Cocktails' },
        image: categoryPhotos.drinks,
        items: [
          {
            name: { pl: 'Aperol Spritz', en: 'Aperol Spritz' },
            price: 23,
            tag: 'signature',
          },
          {
            name: { pl: 'Martini Bianco', en: 'Martini Bianco' },
            description: {
              pl: 'Również rosso, fiero, rosato lub extra dry.',
              en: 'Also rosso, fiero, rosato or extra dry.',
            },
            price: 21,
          },
        ],
      },
    ],
  },
];

/** Flat list of all categories, in display order. */
export const allCategories: MenuCategory[] = menu.flatMap((g) => g.categories);

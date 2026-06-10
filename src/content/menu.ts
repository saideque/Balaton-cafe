import type { Localized } from './localize';

export type MenuTag = 'signature' | 'new' | 'seasonal';

export interface MenuItem {
  name: Localized;
  description: Localized;
  /** Price in PLN. */
  price: number;
  tag?: MenuTag;
}

export interface MenuCategory {
  id: string;
  title: Localized;
  /** Image from /public/images used as the category visual. */
  image: string;
  items: MenuItem[];
}

export const menu: MenuCategory[] = [
  {
    id: 'coffee',
    title: { pl: 'Kawa', en: 'Coffee' },
    image: '/images/latte-art.png',
    items: [
      {
        name: { pl: 'Espresso', en: 'Espresso' },
        description: {
          pl: 'Lokalnie palone ziarna, gęsta crema.',
          en: 'Locally roasted beans, thick crema.',
        },
        price: 9,
      },
      {
        name: { pl: 'Flat White', en: 'Flat White' },
        description: {
          pl: 'Podwójne ristretto i aksamitne mleko.',
          en: 'Double ristretto and velvet milk.',
        },
        price: 15,
        tag: 'signature',
      },
      {
        name: { pl: 'Cappuccino', en: 'Cappuccino' },
        description: {
          pl: 'Klasyka z czapą gęstej pianki.',
          en: 'A classic under a dense cap of foam.',
        },
        price: 14,
      },
      {
        name: { pl: 'Kawa po wiedeńsku', en: 'Viennese coffee' },
        description: {
          pl: 'Czarna kawa z bitą śmietaną.',
          en: 'Black coffee crowned with whipped cream.',
        },
        price: 17,
      },
      {
        name: { pl: 'Matcha Latte', en: 'Matcha Latte' },
        description: {
          pl: 'Ceremonialna matcha i mleko owsiane.',
          en: 'Ceremonial matcha with oat milk.',
        },
        price: 18,
      },
    ],
  },
  {
    id: 'waffles',
    title: { pl: 'Gofry', en: 'Waffles' },
    image: '/images/waffle.png',
    items: [
      {
        name: { pl: 'Gofr z owocami sezonowymi', en: 'Seasonal fruit waffle' },
        description: {
          pl: 'Bita śmietana, świeże owoce, syrop klonowy.',
          en: 'Whipped cream, fresh fruit, maple syrup.',
        },
        price: 24,
        tag: 'signature',
      },
      {
        name: { pl: 'Gofr z Nutellą i bananem', en: 'Nutella & banana waffle' },
        description: {
          pl: 'Ciepły gofr, Nutella, plastry banana.',
          en: 'Warm waffle, Nutella, sliced banana.',
        },
        price: 22,
      },
      {
        name: { pl: 'Gofr wytrawny', en: 'Savoury waffle' },
        description: {
          pl: 'Ser, szynka i zioła. Coś innego.',
          en: 'Cheese, ham and herbs. Something different.',
        },
        price: 26,
        tag: 'new',
      },
      {
        name: { pl: 'Gofr z bitą śmietaną', en: 'Cream & sauce waffle' },
        description: {
          pl: 'Najprostszy, do wyboru sos.',
          en: 'The simplest one, with a sauce of choice.',
        },
        price: 19,
      },
    ],
  },
  {
    id: 'cakes',
    title: { pl: 'Ciasta i wypieki', en: 'Cakes & pastries' },
    image: '/images/apple-cake.png',
    items: [
      {
        name: { pl: 'Szarlotka na ciepło', en: 'Warm apple cake' },
        description: {
          pl: 'Karmelizowane jabłka, cynamon, gałka lodów.',
          en: 'Caramelised apples, cinnamon, a scoop of ice cream.',
        },
        price: 16,
        tag: 'signature',
      },
      {
        name: { pl: 'Sernik', en: 'Cheesecake' },
        description: {
          pl: 'Kremowy, pieczony, na kruchym spodzie.',
          en: 'Creamy, baked, on a shortcrust base.',
        },
        price: 15,
      },
      {
        name: { pl: 'Tarta cytrynowa', en: 'Lemon tart' },
        description: {
          pl: 'Kwaśny lemon curd i lekka beza.',
          en: 'Tart lemon curd and a light meringue.',
        },
        price: 16,
        tag: 'seasonal',
      },
      {
        name: { pl: 'Brownie', en: 'Brownie' },
        description: {
          pl: 'Gęste, czekoladowe, z orzechami.',
          en: 'Dense, chocolatey, with walnuts.',
        },
        price: 14,
      },
    ],
  },
  {
    id: 'cold',
    title: { pl: 'Zimne napoje', en: 'Cold drinks' },
    image: '/images/lifestyle.png',
    items: [
      {
        name: { pl: 'Lemoniada domowa', en: 'Homemade lemonade' },
        description: {
          pl: 'Mięta, cytryna, dużo lodu.',
          en: 'Mint, lemon, plenty of ice.',
        },
        price: 14,
      },
      {
        name: { pl: 'Mrożona kawa', en: 'Iced coffee' },
        description: {
          pl: 'Espresso, mleko, lód.',
          en: 'Espresso, milk, ice.',
        },
        price: 16,
      },
      {
        name: { pl: 'Koktajl owocowy', en: 'Fruit smoothie' },
        description: {
          pl: 'Sezonowe owoce i jogurt.',
          en: 'Seasonal fruit and yoghurt.',
        },
        price: 17,
        tag: 'seasonal',
      },
    ],
  },
];

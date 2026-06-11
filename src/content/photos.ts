/**
 * Site photography — all local, served from /public/photos.
 * Real photos of the café plus two generated lakeside food stills
 * (Higgsfield soul_2), and the menu category cut-outs used in the
 * Starbucks-style circular menu grid. No stock imagery remains.
 */

/** Menu category cut-outs (white background product shots). */
export const categoryPhotos = {
  coffee: '/photos/coffee.png',
  icedCoffee: '/photos/iced-coffee.png',
  tea: '/photos/tea.png',
  waffles: '/photos/waffles.png',
  iceCream: '/photos/ice-cream.png',
  rurka: '/photos/rurka.png',
  smoothies: '/photos/smoothies.png',
  lemonade: '/photos/lemonade.png',
  snacks: '/photos/snacks.png',
  beer: '/photos/beer.png',
  softy: '/photos/softy.png',
  drinks: '/photos/drinks.png',
} as const;

export const photos = {
  /** Real lakeside café photo — hero + OpenGraph + gallery. */
  hero: '/photos/cafe-view.jpg',
  /** Real interior — chairs, menu board, fairy lights (About section). */
  interior: '/photos/inside.jpg',
  /** Real interior — neon ice-cream sign and counter (gallery). */
  interior2: '/photos/inside-2.jpg',
  /** Real food still — pistachio cake and frappe (gallery). */
  food: '/photos/food.jpg',
  /** Generated: iced coffee + chocolate waffle on the lakeside deck. */
  momentWaffle: '/photos/moment-waffle.jpg',
  /** Generated: draft beer + nachos with dips by the pond. */
  momentBeer: '/photos/moment-beer.jpg',
} as const;

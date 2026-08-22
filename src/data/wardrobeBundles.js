import products from './products';

export const WARDROBE_BUNDLES = [
  {
    slug: 'date-night',
    title: 'DATE NIGHT DUO',
    tagline: 'TWO SCENTS. ONE NIGHT OUT.',
    badge: '2 × 60ML',
    subtitle: 'A curated combination designed for evenings, dates and nights when you want to leave an unforgettable impression.',
    focusText: 'Seductive, warm, evening, date, and night-out expression.',
    productSlugs: ['noir', 'velvet'],
    mainImage: '/images/products/row-1-column-1.png',
    originalPrice: 2598,
    bundlePrice: 2199,
    savings: 399,
    whyCombination: 'ÉLAVA NOIR brings rich amber spice and deep vanilla warmth for evening confidence, while ÉLAVA VELVET infuses soft cashmere rose and intoxicating wood for intimate charm.',
    whenToWear: 'Apply NOIR before leaving for evening dinners or drinks; layer VELVET on pulse points for date nights and late celebrations.',
    features: [
      '2 × 60 ML Eau de Parfum Signatures',
      'Long-lasting evening projection & trail',
      'Curated for high-heat tropical nights',
      'Complimentary express shipping across India'
    ]
  },
  {
    slug: 'everyday-office',
    title: 'EVERYDAY + OFFICE',
    tagline: 'FRESH. CLEAN. EFFORTLESS.',
    badge: '2 × 60ML',
    subtitle: 'A versatile dual-scent wardrobe formulated for morning commutes, corporate meetings, and crisp daily wear.',
    focusText: 'Fresh, clean, versatile, daily, and professional expression.',
    productSlugs: ['sable', 'aura'],
    mainImage: '/images/products/row-3-column-1.png',
    originalPrice: 2598,
    bundlePrice: 2099,
    savings: 499,
    whyCombination: 'ÉLAVA AURA delivers an effortless clean shower-fresh aura for morning routines, while ÉLAVA SABLE brings sharp bergamot and white cedar for executive presence.',
    whenToWear: 'Wear AURA post-shower for effortless daily freshness; wear SABLE for board meetings, client presentations, and office work.',
    features: [
      '2 × 60 ML Eau de Parfum Signatures',
      'Non-overpowering clean daily projection',
      'Formulated for crisp office comfort',
      'Complimentary express shipping across India'
    ]
  },
  {
    slug: 'gift-duo',
    title: 'GIFT DUO',
    tagline: 'THE ULTIMATE FRAGRANCE GIFT.',
    badge: '2 × 60ML',
    subtitle: 'Two iconic 60ml Eau de Parfum signatures presented together to create a memorable gifting experience.',
    focusText: 'Memorable, easy gifting, two fragrances, special occasions.',
    productSlugs: ['oud-x', 'blanc'],
    mainImage: '/images/products/row-2-column-1.png',
    originalPrice: 2598,
    bundlePrice: 2199,
    savings: 399,
    whyCombination: 'Combines OUD X’s royal smoked leather richness with BLANC’s airy neroli freshness, offering complete day-to-night scent versatility for someone special.',
    whenToWear: 'The ultimate gift for birthdays, anniversaries, weddings, or milestone celebrations.',
    features: [
      '2 × 60 ML Eau de Parfum Signatures',
      'Covers both fresh day & luxurious night',
      'Includes optional gift packaging & card message',
      'Complimentary express shipping across India'
    ]
  }
];

export function getWardrobeBundle(slug) {
  return WARDROBE_BUNDLES.find((b) => b.slug === slug) || WARDROBE_BUNDLES[0];
}

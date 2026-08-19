/**
 * ÉLAVA Products Data
 * 
 * Schema:
 * - id: string
 * - slug: string
 * - name: string
 * - category: 'men' | 'women' | 'unisex' | 'bestsellers'
 * - price: number
 * - description: string
 * - scentIdentity: string
 * - rating: number
 * - reviewCount: number
 * - image: string
 * - isBestseller: boolean
 * - gender: 'men' | 'women' | 'unisex'
 * - occasion: string[]
 */

export const products = [
  {
    id: "noir",
    slug: "noir",
    name: "NOIR",
    category: "men",
    price: 1299,
    description: "An intoxicating blend of smoky amber, dark woods, and magnetic spices.",
    scentIdentity: "Dark · Warm · Magnetic",
    rating: 4.8,
    reviewCount: 124,
    image: "/images/products/row-1-column-1.png",
    isBestseller: true,
    gender: "men",
    occasion: ["date-night", "party"]
  },
  {
    id: "oud-x",
    slug: "oud-x",
    name: "OUD X",
    category: "men",
    price: 1599,
    description: "Opulent agarwood infused with rich leather and warm golden resin.",
    scentIdentity: "Smoky · Bold · Rich",
    rating: 4.9,
    reviewCount: 98,
    image: "/images/products/row-1-column-2.png",
    isBestseller: true,
    gender: "men",
    occasion: ["date-night", "party"]
  },
  {
    id: "velvet",
    slug: "velvet",
    name: "VELVET",
    category: "women",
    price: 1299,
    description: "Sensual Turkish rose and Bourbon vanilla enveloped in soft cashmere.",
    scentIdentity: "Soft · Floral · Warm",
    rating: 4.9,
    reviewCount: 201,
    image: "/images/products/row-2-column-1.png",
    isBestseller: true,
    gender: "women",
    occasion: ["date-night", "everyday"]
  },
  {
    id: "aura",
    slug: "aura",
    name: "AURA",
    category: "women",
    price: 1199,
    description: "A luminous symphony of blooming jasmine, sparkling bergamot, and sheer musk.",
    scentIdentity: "Luminous · Sheer · Ethereal",
    rating: 4.8,
    reviewCount: 156,
    image: "/images/products/row-2-column-3.png",
    isBestseller: true,
    gender: "women",
    occasion: ["everyday", "office"]
  }
];

export default products;

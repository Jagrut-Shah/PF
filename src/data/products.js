/**
 * ÉLAVA Products Data
 *
 * Schema:
 * - id: string
 * - slug: string
 * - name: string
 * - image: string
 * - category: 'men' | 'women' | 'unisex'
 * - gender: 'men' | 'women' | 'unisex'
 * - occasion: 'date-night' | 'everyday' | 'office' | 'party'
 * - isBestseller: boolean
 * - price: number
 * - size: string
 * - rating: number
 * - reviewCount: number
 * - scentIdentity: string
 * - description: string
 * - notes: { top, heart, base }
 */

export const products = [
  {
    id: "noir",
    slug: "noir",
    name: "NOIR",
    image: "/images/products/row-1-column-1.png",
    category: "men",
    gender: "men",
    occasion: "office",
    isBestseller: true,
    price: 1299,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 124,
    scentIdentity: "Dark · Warm · Magnetic",
    description:
      "A dark, composed fragrance built around warm woods and subtle spice. NOIR is designed to leave a confident presence without becoming overpowering.",
    notes: {
      top: "Bergamot · Black Pepper",
      heart: "Lavender · Geranium · Violet Leaf",
      base: "Vetiver · Amber · Musk"
    },
    review: {
      text: "Exceptional longevity and depth. Truly feels niche and bespoke.",
      customer: "Aarav S.",
      city: "Mumbai"
    }
  },
  {
    id: "oud-x",
    slug: "oud-x",
    name: "OUD X",
    image: "/images/products/row-1-column-2.png",
    category: "men",
    gender: "men",
    occasion: "date-night",
    isBestseller: true,
    price: 1599,
    size: "60 ML",
    rating: 4.9,
    reviewCount: 98,
    scentIdentity: "Smoky · Bold · Rich",
    description:
      "Deep and unmistakably bold, OUD X combines smoky oud with warm amber and polished leather for an intense evening signature.",
    notes: {
      top: "Saffron · Bergamot",
      heart: "Oud · Rose · Leather",
      base: "Amber · Sandalwood · Musk"
    },
    review: {
      text: "Rich, confident and incredibly smooth. OUD X has become my go-to evening fragrance.",
      customer: "Karan M.",
      city: "Bangalore"
    }
  },
  {
    id: "ember",
    slug: "ember",
    name: "EMBER",
    image: "/images/products/row-1-column-3.png",
    category: "men",
    gender: "men",
    occasion: "party",
    isBestseller: false,
    price: 1399,
    size: "60 ML",
    rating: 4.7,
    reviewCount: 87,
    scentIdentity: "Spiced · Intense · Charismatic",
    description:
      "EMBER opens with bright spice before settling into a warm, glowing blend of woods and amber. Designed for nights that demand presence.",
    notes: {
      top: "Blood Orange · Black Pepper",
      heart: "Cinnamon · Clove · Cedar",
      base: "Tonka · Amberwood · Patchouli"
    },
    review: {
      text: "Warm, bold and surprisingly refined. It has exactly the presence I wanted for evenings.",
      customer: "Rohan P.",
      city: "Delhi"
    }
  },
  {
    id: "eclipse",
    slug: "eclipse",
    name: "ECLIPSE",
    image: "/images/products/row-1-column-4.png",
    category: "men",
    gender: "men",
    occasion: "everyday",
    isBestseller: false,
    price: 1199,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 76,
    scentIdentity: "Clean · Woody · Refined",
    description:
      "Clean, understated and effortlessly refined. ECLIPSE pairs fresh citrus with dry woods for an everyday scent with quiet character.",
    notes: {
      top: "Bergamot · Mandarin · Green Tea",
      heart: "Cedar · Violet Leaf · Sage",
      base: "Vetiver · Musk · Soft Woods"
    },
    review: {
      text: "Clean, subtle, and sophisticated for daily office wear. The dry-down is fantastic.",
      customer: "Vikram N.",
      city: "Pune"
    }
  },
  {
    id: "velvet",
    slug: "velvet",
    name: "VELVET",
    image: "/images/products/row-2-column-1.png",
    category: "women",
    gender: "women",
    occasion: "date-night",
    isBestseller: true,
    price: 1299,
    size: "60 ML",
    rating: 4.9,
    reviewCount: 201,
    scentIdentity: "Soft · Floral · Warm",
    description:
      "VELVET wraps delicate florals in a warm, creamy base. Soft at first impression, yet unmistakably sensual as it settles.",
    notes: {
      top: "Raspberry · Pink Pepper",
      heart: "Rose · Peony · Jasmine",
      base: "Vanilla · Amber · Sandalwood"
    },
    review: {
      text: "Soft, elegant and long-lasting. I receive compliments every time I wear it.",
      customer: "Priya R.",
      city: "Delhi"
    }
  },
  {
    id: "muse",
    slug: "muse",
    name: "MUSE",
    image: "/images/products/row-2-column-2.png",
    category: "women",
    gender: "women",
    occasion: "everyday",
    isBestseller: false,
    price: 1199,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 93,
    scentIdentity: "Floral · Fresh · Graceful",
    description:
      "Fresh and graceful, MUSE blends luminous florals with soft woods for a fragrance that feels effortlessly polished.",
    notes: {
      top: "Pear · Bergamot",
      heart: "Jasmine · Orange Blossom · Freesia",
      base: "White Musk · Cedar · Cashmere Wood"
    },
    review: {
      text: "A fresh and luminous floral that feels effortless. Ideal for daytime elegance.",
      customer: "Ananya K.",
      city: "Hyderabad"
    }
  },
  {
    id: "aura",
    slug: "aura",
    name: "AURA",
    image: "/images/products/row-2-column-3.png",
    category: "women",
    gender: "women",
    occasion: "party",
    isBestseller: true,
    price: 1199,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 156,
    scentIdentity: "Luminous · Sheer · Ethereal",
    description:
      "AURA is bright, airy and radiant, balancing delicate florals with a soft musky finish.",
    notes: {
      top: "Mandarin · Pear · Neroli",
      heart: "White Rose · Jasmine · Lily",
      base: "Musk · Vanilla · Blonde Woods"
    },
    review: {
      text: "Bright, airy, and delicately sweet. A captivating signature scent for special occasions.",
      customer: "Meera D.",
      city: "Kolkata"
    }
  },
  {
    id: "afterglow",
    slug: "afterglow",
    name: "AFTERGLOW",
    image: "/images/products/row-2-column-4.png",
    category: "women",
    gender: "women",
    occasion: "everyday",
    isBestseller: false,
    price: 1249,
    size: "60 ML",
    rating: 4.7,
    reviewCount: 81,
    scentIdentity: "Sweet · Warm · Radiant",
    description:
      "Warm sweetness meets soft florals in a fragrance designed to linger beautifully long after sunset.",
    notes: {
      top: "Peach · Bergamot",
      heart: "Vanilla Orchid · Rose · Heliotrope",
      base: "Amber · Vanilla · Sandalwood"
    },
    review: {
      text: "Beautifully warm and lingering. It settles into the skin like soft sunset warmth.",
      customer: "Sneha T.",
      city: "Chandigarh"
    }
  },
  {
    id: "sable",
    slug: "sable",
    name: "SABLE",
    image: "/images/products/row-3-column-1.png",
    category: "unisex",
    gender: "unisex",
    occasion: "everyday",
    isBestseller: false,
    price: 1299,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 72,
    scentIdentity: "Earthy · Green · Effortless",
    description:
      "SABLE captures the feeling of walking through a quiet green landscape after rain—fresh, earthy and effortlessly modern.",
    notes: {
      top: "Fig Leaf · Bergamot · Green Pepper",
      heart: "Violet Leaf · Cypress · Tea",
      base: "Vetiver · Cedar · Moss"
    },
    review: {
      text: "Crisp green freshness paired with subtle earthiness. Remarkably refreshing and unique.",
      customer: "Dev R.",
      city: "Jaipur"
    }
  },
  {
    id: "elan",
    slug: "elan",
    name: "ELAN",
    image: "/images/products/row-3-column-2.png",
    category: "unisex",
    gender: "unisex",
    occasion: "office",
    isBestseller: false,
    price: 1249,
    size: "60 ML",
    rating: 4.7,
    reviewCount: 68,
    scentIdentity: "Crisp · Mineral · Modern",
    description: "Crisp and precise, ELAN combines bright citrus with cool mineral notes and clean woods.",
    notes: {
      top: "Lemon · Juniper · Bergamot",
      heart: "Mineral Accord · Lavender · Neroli",
      base: "Cedar · White Musk · Vetiver"
    },
    review: {
      text: "Clean mineral crispness that feels ultra-modern and sharp. Perfect for work settings.",
      customer: "Aditya B.",
      city: "Gurugram"
    }
  },
  {
    id: "amber-01",
    slug: "amber-01",
    name: "AMBER 01",
    image: "/images/products/row-3-column-3.png",
    category: "unisex",
    gender: "unisex",
    occasion: "party",
    isBestseller: false,
    price: 1499,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 64,
    scentIdentity: "Amber · Spiced · Sensual",
    description:
      "Warm amber and aromatic spice create a rich, glowing fragrance with a distinctly magnetic character.",
    notes: {
      top: "Cardamom · Mandarin",
      heart: "Cinnamon · Amber · Orange Blossom",
      base: "Benzoin · Vanilla · Cedar"
    },
    review: {
      text: "Spiced amber perfection with incredible sillage. Warm, magnetic, and opulent.",
      customer: "Zain H.",
      city: "Lucknow"
    }
  },
  {
    id: "vert",
    slug: "vert",
    name: "VERT",
    image: "/images/products/row-3-column-4.png",
    category: "unisex",
    gender: "unisex",
    occasion: "office",
    isBestseller: false,
    price: 1299,
    size: "60 ML",
    rating: 4.7,
    reviewCount: 59,
    scentIdentity: "Green · Woody · Sophisticated",
    description:
      "Fresh green notes meet dry woods in VERT, creating a sophisticated fragrance that feels clean without becoming predictable.",
    notes: {
      top: "Lime · Basil · Green Apple",
      heart: "Green Tea · Fig · Geranium",
      base: "Cedar · Vetiver · Moss"
    },
    review: {
      text: "Green citrus meeting dry cedarwood—sophisticated, uplifting, and distinctive.",
      customer: "Kabir V.",
      city: "Ahmedabad"
    }
  },
  {
    id: "monarch",
    slug: "monarch",
    name: "MONARCH",
    image: "/images/products/row-4-column-1.png",
    category: "unisex",
    gender: "unisex",
    occasion: "date-night",
    isBestseller: false,
    price: 1499,
    size: "60 ML",
    rating: 4.9,
    reviewCount: 74,
    scentIdentity: "Rich · Suede · Elegant",
    description:
      "MONARCH is rich, smooth and quietly commanding, pairing soft suede with warm woods and amber.",
    notes: {
      top: "Bergamot · Black Pepper",
      heart: "Suede · Iris · Saffron",
      base: "Sandalwood · Amber · Musk"
    },
    review: {
      text: "Commanding suede and iris. Smooth, luxurious, and commands attention quietly.",
      customer: "Siddharth C.",
      city: "Mumbai"
    }
  },
  {
    id: "seren",
    slug: "seren",
    name: "SEREN",
    image: "/images/products/row-4-column-2.png",
    category: "unisex",
    gender: "unisex",
    occasion: "everyday",
    isBestseller: false,
    price: 1199,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 63,
    scentIdentity: "Soft · Musky · Calm",
    description:
      "Calm and understated, SEREN combines airy florals, white tea and soft woods into an effortlessly comfortable signature.",
    notes: {
      top: "Pear · Mandarin · Lavender",
      heart: "Iris · White Tea · Jasmine",
      base: "Soft Musk · Sandalwood · Cashmere Wood"
    },
    review: {
      text: "Soothing white tea and soft musk. It creates a serene, comforting aura all day.",
      customer: "Riya M.",
      city: "Chennai"
    }
  },
  {
    id: "vera",
    slug: "vera",
    name: "VERA",
    image: "/images/products/row-4-column-3.png",
    category: "unisex",
    gender: "unisex",
    occasion: "date-night",
    isBestseller: false,
    price: 1299,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 71,
    scentIdentity: "Floral · Creamy · Intimate",
    description:
      "Creamy white florals and delicate rose create an intimate fragrance with a soft, elegant trail.",
    notes: {
      top: "Bergamot · Lychee",
      heart: "Rose · Tuberose · Jasmine",
      base: "Vanilla · Sandalwood · Musk"
    },
    review: {
      text: "Intimate creamy rose and tuberose. Sensual, modern, and gorgeously composed.",
      customer: "Tanya S.",
      city: "Goa"
    }
  },
  {
    id: "lumiere",
    slug: "lumiere",
    name: "LUMIÈRE",
    image: "/images/products/row-4-column-4.png",
    category: "unisex",
    gender: "unisex",
    occasion: "party",
    isBestseller: false,
    price: 1399,
    size: "60 ML",
    rating: 4.8,
    reviewCount: 66,
    scentIdentity: "Citrus · White Floral · Radiant",
    description:
      "Bright citrus opens into luminous white florals before settling into a clean, warm base. LUMIÈRE is made to feel radiant and alive.",
    notes: {
      top: "Lemon · Grapefruit · Mandarin",
      heart: "Orange Blossom · Jasmine · Neroli",
      base: "Amber · White Musk · Cedar"
    },
    review: {
      text: "Radiant citrus and white florals that instantly brighten your mood. Pure elegance.",
      customer: "Nikhil K.",
      city: "Kochi"
    }
  }
];

export default products;

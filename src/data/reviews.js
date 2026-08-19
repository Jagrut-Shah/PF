/**
 * ÉLAVA Curated Reviews Data
 *
 * Fictional luxury customer reviews dataset.
 * Supports aggregate metrics & dynamic filtering by product and gender.
 * Every product contains at least 3 unique curated customer reviews.
 */

export const reviewAggregate = {
  rating: 4.8,
  totalReviews: 500,
};

export const reviews = [
  // 1. NOIR (3 reviews)
  {
    id: "rev-noir-1",
    productSlug: "noir",
    productName: "NOIR",
    gender: "men",
    rating: 5,
    text: "Exceptional longevity and depth. Truly feels niche and bespoke.",
    customer: "Aarav S.",
    city: "Mumbai"
  },
  {
    id: "rev-noir-2",
    productSlug: "noir",
    productName: "NOIR",
    gender: "men",
    rating: 5,
    text: "Deep, elegant and surprisingly versatile. NOIR has become my everyday signature.",
    customer: "Dev K.",
    city: "Delhi"
  },
  {
    id: "rev-noir-3",
    productSlug: "noir",
    productName: "NOIR",
    gender: "men",
    rating: 5,
    text: "Subtle yet magnetic. Perfect for client meetings and quiet evening dinners.",
    customer: "Vikram T.",
    city: "Pune"
  },

  // 2. VELVET (3 reviews)
  {
    id: "rev-velvet-1",
    productSlug: "velvet",
    productName: "VELVET",
    gender: "women",
    rating: 5,
    text: "Soft, elegant and long-lasting. I receive compliments every time I wear it.",
    customer: "Priya R.",
    city: "Delhi"
  },
  {
    id: "rev-velvet-2",
    productSlug: "velvet",
    productName: "VELVET",
    gender: "women",
    rating: 5,
    text: "VELVET feels incredibly soft without becoming too sweet. Beautiful fragrance.",
    customer: "Ananya V.",
    city: "Mumbai"
  },
  {
    id: "rev-velvet-3",
    productSlug: "velvet",
    productName: "VELVET",
    gender: "women",
    rating: 5,
    text: "My absolute favorite for dates. Warm floral warmth that lasts hours.",
    customer: "Meera H.",
    city: "Kolkata"
  },

  // 3. OUD X (3 reviews)
  {
    id: "rev-oudx-1",
    productSlug: "oud-x",
    productName: "OUD X",
    gender: "men",
    rating: 5,
    text: "Rich, confident and incredibly smooth. OUD X has become my go-to evening fragrance.",
    customer: "Karan M.",
    city: "Bangalore"
  },
  {
    id: "rev-oudx-2",
    productSlug: "oud-x",
    productName: "OUD X",
    gender: "men",
    rating: 5,
    text: "OUD X is exactly what I wanted for evenings. Rich without being overwhelming.",
    customer: "Sahil B.",
    city: "Hyderabad"
  },
  {
    id: "rev-oudx-3",
    productSlug: "oud-x",
    productName: "OUD X",
    gender: "men",
    rating: 5,
    text: "Smoky oud with warm leather notes. Unmistakable presence.",
    customer: "Farhan A.",
    city: "Lucknow"
  },

  // 4. EMBER (3 reviews)
  {
    id: "rev-ember-1",
    productSlug: "ember",
    productName: "EMBER",
    gender: "men",
    rating: 5,
    text: "Warm, bold and surprisingly refined. It has exactly the presence I wanted for evenings.",
    customer: "Rohan P.",
    city: "Delhi"
  },
  {
    id: "rev-ember-2",
    productSlug: "ember",
    productName: "EMBER",
    gender: "men",
    rating: 5,
    text: "Spiced orange and dark woods — an undeniable evening favorite.",
    customer: "Kabir N.",
    city: "Jaipur"
  },
  {
    id: "rev-ember-3",
    productSlug: "ember",
    productName: "EMBER",
    gender: "men",
    rating: 5,
    text: "Captivating warm amber and cinnamon notes. Gets compliments instantly.",
    customer: "Varun G.",
    city: "Chandigarh"
  },

  // 5. AURA (3 reviews)
  {
    id: "rev-aura-1",
    productSlug: "aura",
    productName: "AURA",
    gender: "women",
    rating: 5,
    text: "Radiant and sensual. AURA stands out in any crowd without trying.",
    customer: "Natasha S.",
    city: "Mumbai"
  },
  {
    id: "rev-aura-2",
    productSlug: "aura",
    productName: "AURA",
    gender: "women",
    rating: 5,
    text: "Luminous floral notes with a warm amber base. Pure luxury.",
    customer: "Ishita M.",
    city: "Ahmedabad"
  },
  {
    id: "rev-aura-3",
    productSlug: "aura",
    productName: "AURA",
    gender: "women",
    rating: 5,
    text: "Airy, ethereal white florals with a lingering musk trail. Absolutely divine.",
    customer: "Kavya L.",
    city: "Bengaluru"
  },

  // 6. SABLE (3 reviews)
  {
    id: "rev-sable-1",
    productSlug: "sable",
    productName: "SABLE",
    gender: "unisex",
    rating: 5,
    text: "Subtle luxury at its finest. Clean, woody, and extraordinarily refined.",
    customer: "Arjun V.",
    city: "Mumbai"
  },
  {
    id: "rev-sable-2",
    productSlug: "sable",
    productName: "SABLE",
    gender: "unisex",
    rating: 5,
    text: "Sophisticated minimalism. Everyone asks what perfume I am wearing.",
    customer: "Tanvi M.",
    city: "Gurgaon"
  },
  {
    id: "rev-sable-3",
    productSlug: "sable",
    productName: "SABLE",
    gender: "unisex",
    rating: 5,
    text: "Fresh fig leaf and rain-soaked earth vibes. Truly unique signature.",
    customer: "Aditi S.",
    city: "Pune"
  },

  // 7. ECLIPSE (3 reviews)
  {
    id: "rev-eclipse-1",
    productSlug: "eclipse",
    productName: "ECLIPSE",
    gender: "men",
    rating: 5,
    text: "Fresh, mysterious, and modern. Great balance between citrus and woods.",
    customer: "Nikhil G.",
    city: "Chandigarh"
  },
  {
    id: "rev-eclipse-2",
    productSlug: "eclipse",
    productName: "ECLIPSE",
    gender: "men",
    rating: 5,
    text: "Clean mandarin opening settled on dry cedar. Understated perfection.",
    customer: "Ketan R.",
    city: "Delhi"
  },
  {
    id: "rev-eclipse-3",
    productSlug: "eclipse",
    productName: "ECLIPSE",
    gender: "men",
    rating: 5,
    text: "Effortless everyday scent. Quietly confident and non-intrusive.",
    customer: "Manish P.",
    city: "Surat"
  },

  // 8. MUSE (3 reviews)
  {
    id: "rev-muse-1",
    productSlug: "muse",
    productName: "MUSE",
    gender: "women",
    rating: 5,
    text: "Bright, romantic, and uplifting. Starts floral and dries down warm and powdery.",
    customer: "Riya T.",
    city: "Bengaluru"
  },
  {
    id: "rev-muse-2",
    productSlug: "muse",
    productName: "MUSE",
    gender: "women",
    rating: 5,
    text: "Gentle and captivating. Perfect signature scent for spring and daytime wear.",
    customer: "Sneha K.",
    city: "Chennai"
  },
  {
    id: "rev-muse-3",
    productSlug: "muse",
    productName: "MUSE",
    gender: "women",
    rating: 5,
    text: "Luminous pear and white jasmine notes. Gives off instant grace.",
    customer: "Pooja V.",
    city: "Indore"
  },

  // 9. AFTERGLOW (3 reviews)
  {
    id: "rev-afterglow-1",
    productSlug: "afterglow",
    productName: "AFTERGLOW",
    gender: "women",
    rating: 5,
    text: "Warm, golden, and serene. It feels like golden hour captured in a bottle.",
    customer: "Diya P.",
    city: "Goa"
  },
  {
    id: "rev-afterglow-2",
    productSlug: "afterglow",
    productName: "AFTERGLOW",
    gender: "women",
    rating: 5,
    text: "Deliciously smooth peach and vanilla orchid notes. Lingers for hours.",
    customer: "Simran C.",
    city: "Mumbai"
  },
  {
    id: "rev-afterglow-3",
    productSlug: "afterglow",
    productName: "AFTERGLOW",
    gender: "women",
    rating: 5,
    text: "Soft amber warmth that feels comforting after sunset.",
    customer: "Shruti M.",
    city: "Nagpur"
  },

  // 10. ELAN (3 reviews)
  {
    id: "rev-elan-1",
    productSlug: "elan",
    productName: "ELAN",
    gender: "unisex",
    rating: 5,
    text: "Polished and crisp. ELAN is my go-to office signature.",
    customer: "Siddharth D.",
    city: "Noida"
  },
  {
    id: "rev-elan-2",
    productSlug: "elan",
    productName: "ELAN",
    gender: "unisex",
    rating: 5,
    text: "Cool mineral sharpness paired with lemon and vetiver. Very executive.",
    customer: "Alok N.",
    city: "Gurgaon"
  },
  {
    id: "rev-elan-3",
    productSlug: "elan",
    productName: "ELAN",
    gender: "unisex",
    rating: 5,
    text: "Refreshing and clean without smelling generic. High quality formulation.",
    customer: "Sonali K.",
    city: "Hyderabad"
  },

  // 11. AMBER 01 (3 reviews)
  {
    id: "rev-amber01-1",
    productSlug: "amber-01",
    productName: "AMBER 01",
    gender: "unisex",
    rating: 5,
    text: "Golden amber perfection. Rich, warm, and comforting.",
    customer: "Maya L.",
    city: "Bangalore"
  },
  {
    id: "rev-amber01-2",
    productSlug: "amber-01",
    productName: "AMBER 01",
    gender: "unisex",
    rating: 5,
    text: "Cardamom and spiced cinnamon blending seamlessly into benzoin amber.",
    customer: "Rithvik S.",
    city: "Delhi"
  },
  {
    id: "rev-amber01-3",
    productSlug: "amber-01",
    productName: "AMBER 01",
    gender: "unisex",
    rating: 5,
    text: "Sensual and magnetic evening scent. Outstanding sillage.",
    customer: "Bhavna P.",
    city: "Kolkata"
  },

  // 12. VERT (3 reviews)
  {
    id: "rev-vert-1",
    productSlug: "vert",
    productName: "VERT",
    gender: "unisex",
    rating: 5,
    text: "Crisp botanical green notes with a clean woody base.",
    customer: "Rahul K.",
    city: "Kochi"
  },
  {
    id: "rev-vert-2",
    productSlug: "vert",
    productName: "VERT",
    gender: "unisex",
    rating: 5,
    text: "Lime, green tea and cedarwood. Incredibly invigorating for hot days.",
    customer: "Nisha B.",
    city: "Coimbatore"
  },
  {
    id: "rev-vert-3",
    productSlug: "vert",
    productName: "VERT",
    gender: "unisex",
    rating: 5,
    text: "Sophisticated green fragrance that stands out gracefully.",
    customer: "Tushar M.",
    city: "Vadodara"
  },

  // 13. MONARCH (3 reviews)
  {
    id: "rev-monarch-1",
    productSlug: "monarch",
    productName: "MONARCH",
    gender: "unisex",
    rating: 5,
    text: "Regal, smooth, and commanding. A truly sophisticated signature.",
    customer: "Aditya R.",
    city: "Lucknow"
  },
  {
    id: "rev-monarch-2",
    productSlug: "monarch",
    productName: "MONARCH",
    gender: "unisex",
    rating: 5,
    text: "Rich iris and soft suede notes. Commands quiet respect.",
    customer: "Siddharth C.",
    city: "Mumbai"
  },
  {
    id: "rev-monarch-3",
    productSlug: "monarch",
    productName: "MONARCH",
    gender: "unisex",
    rating: 5,
    text: "Warm amberwood and black pepper. Perfect date-night presence.",
    customer: "Esha V.",
    city: "Jaipur"
  },

  // 14. SEREN (3 reviews)
  {
    id: "rev-seren-1",
    productSlug: "seren",
    productName: "SEREN",
    gender: "unisex",
    rating: 5,
    text: "Calm, airy, and soothing. A tranquil everyday scent.",
    customer: "Tara B.",
    city: "Shimla"
  },
  {
    id: "rev-seren-2",
    productSlug: "seren",
    productName: "SEREN",
    gender: "unisex",
    rating: 5,
    text: "White tea and cashmere wood. Creates a peaceful, clean aura.",
    customer: "Anand H.",
    city: "Dehradun"
  },
  {
    id: "rev-seren-3",
    productSlug: "seren",
    productName: "SEREN",
    gender: "unisex",
    rating: 5,
    text: "Soft musk with delicate floral tea notes. Understated elegance.",
    customer: "Shreya T.",
    city: "Chandigarh"
  },

  // 15. VERA (3 reviews)
  {
    id: "rev-vera-1",
    productSlug: "vera",
    productName: "VERA",
    gender: "unisex",
    rating: 5,
    text: "Lush and enchanting. Perfectly balanced between sweet and earthy.",
    customer: "Neha C.",
    city: "Surat"
  },
  {
    id: "rev-vera-2",
    productSlug: "vera",
    productName: "VERA",
    gender: "unisex",
    rating: 5,
    text: "Creamy rose and tuberose with a sandalwood dry-down. Gorgeous trail.",
    customer: "Tanya S.",
    city: "Goa"
  },
  {
    id: "rev-vera-3",
    productSlug: "vera",
    productName: "VERA",
    gender: "unisex",
    rating: 5,
    text: "Intimate and sensual floral signature. Truly unforgettable.",
    customer: "Aakash G.",
    city: "Bhopal"
  },

  // 16. LUMIÈRE (3 reviews)
  {
    id: "rev-lumiere-1",
    productSlug: "lumiere",
    productName: "LUMIÈRE",
    gender: "unisex",
    rating: 5,
    text: "Sparkling, radiant, and celebratory. Perfect for special occasions.",
    customer: "Samarth P.",
    city: "Indore"
  },
  {
    id: "rev-lumiere-2",
    productSlug: "lumiere",
    productName: "LUMIÈRE",
    gender: "unisex",
    rating: 5,
    text: "Bright lemon and neroli opening into luminous white musk.",
    customer: "Reena S.",
    city: "Mumbai"
  },
  {
    id: "rev-lumiere-3",
    productSlug: "lumiere",
    productName: "LUMIÈRE",
    gender: "unisex",
    rating: 5,
    text: "Radiant, uplifting, and beautifully vibrant fragrance.",
    customer: "Harsh L.",
    city: "Ahmedabad"
  }
];

export default reviews;

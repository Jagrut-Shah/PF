/**
 * ÉLAVA Reviews Data
 *
 * Supports: id, productId, customerName, location, rating, quote
 *
 * aggregateRating – overall star average displayed in the "What People Say" summary
 * totalReviews    – canonical total review count displayed site-wide
 */

export const reviewAggregate = {
  rating: 4.8,
  totalReviews: 500,
};

export const reviews = [
  {
    id: "rev-1",
    productId: "noir",
    customerName: "Aarav S.",
    location: "Mumbai",
    rating: 5,
    quote: "Exceptional longevity and depth. Truly feels niche and bespoke.",
  },
  {
    id: "rev-2",
    productId: "velvet",
    customerName: "Priya R.",
    location: "Delhi",
    rating: 5,
    quote:
      "Velvet is everything I wanted in a signature scent — warm, feminine, and utterly unforgettable. I receive compliments every single time I wear it.",
  },
  {
    id: "rev-3",
    productId: "oud-x",
    customerName: "Karan M.",
    location: "Bangalore",
    rating: 5,
    quote:
      "Oud X commands presence without being overpowering. A masterclass in modern oud — rich, confident, and beautifully balanced.",
  },
];

export default reviews;

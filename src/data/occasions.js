/**
 * ÉLAVA Occasions Data
 * Final refined occasion metadata, specific color dots, and hero campaign imagery
 */

export const occasions = [
  {
    id: "date-night",
    slug: "date-night",
    title: "DATE NIGHT",
    name: "Date Night",
    description: "Unforgettable nights.",
    route: "/category/date-night",
    dotColor: "#8B1E1E",
    isHero: true,
    image: "/images/occasions/date-night-hero.jpg",
    alt: "Cinematic hero campaign photograph for Date Night"
  },
  {
    id: "everyday",
    slug: "everyday",
    title: "EVERYDAY",
    name: "Everyday",
    description: "Your signature.",
    route: "/category/everyday",
    dotColor: "#16A34A",
    isHero: false,
    image: "/images/occasions/everyday-color.jpg",
    alt: "Cinematic color campaign photograph for Everyday"
  },
  {
    id: "office",
    slug: "office",
    title: "OFFICE",
    name: "Office",
    description: "Clean. Sharp.",
    route: "/category/office",
    dotColor: "#2563EB",
    isHero: false,
    image: "/images/occasions/office-color.jpg",
    alt: "Cinematic color campaign photograph for Office"
  },
  {
    id: "party",
    slug: "party",
    title: "PARTY",
    name: "Party",
    description: "Walk in. Stand out.",
    route: "/category/party",
    dotColor: "#7C2D5E",
    isHero: false,
    image: "/images/occasions/party-color.jpg",
    alt: "Cinematic color campaign photograph for Party"
  }
];

export default occasions;

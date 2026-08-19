import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainContainer from '../components/ui/MainContainer';
import ProductCard from '../components/home/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import products from '../data/products';

const GENDER_CATEGORIES = ['men', 'women', 'unisex'];
const OCCASION_CATEGORIES = ['date-night', 'everyday', 'office', 'party'];
const VALID_SLUGS = [...GENDER_CATEGORIES, ...OCCASION_CATEGORIES, 'bestsellers'];

const CATEGORY_CONFIG = {
  men: { title: 'MEN', subtitle: 'Fragrances crafted for him.' },
  women: { title: 'WOMEN', subtitle: 'Fragrances crafted for her.' },
  unisex: { title: 'UNISEX', subtitle: 'Fragrances for every expression.' },
  bestsellers: { title: 'BESTSELLERS', subtitle: 'Our most loved fragrances.' },
  'date-night': { title: 'DATE NIGHT', subtitle: 'Fragrances for nights worth remembering.' },
  everyday: { title: 'EVERYDAY', subtitle: 'Your signature scent, every day.' },
  office: { title: 'OFFICE', subtitle: 'Clean. Sharp. Effortless.' },
  party: { title: 'PARTY', subtitle: 'Walk in. Get noticed.' },
};

export default function CategoryPage() {
  const { categorySlug } = useParams();

  const isSupportedSlug = VALID_SLUGS.includes(categorySlug);

  // Filter logic matching exact schemas
  const filteredProducts = products.filter((p) => {
    if (!categorySlug || !isSupportedSlug) return false;

    if (GENDER_CATEGORIES.includes(categorySlug)) {
      return p.gender === categorySlug;
    }
    if (categorySlug === 'bestsellers') {
      return p.isBestseller === true;
    }
    if (OCCASION_CATEGORIES.includes(categorySlug)) {
      return p.occasion === categorySlug || (Array.isArray(p.occasion) && p.occasion.includes(categorySlug));
    }
    return false;
  });

  // Invalid Category Slug State
  if (!isSupportedSlug) {
    return (
      <MainContainer className="py-16 text-center">
        <h1 className="font-serif text-3xl font-normal uppercase tracking-wider text-elava-charcoal mb-3">
          Collection Not Found
        </h1>
        <p className="font-sans text-sm text-elava-stone mb-6">
          The requested fragrance collection does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-elava-charcoal text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
        >
          Return to Homepage
        </Link>
      </MainContainer>
    );
  }

  const config = CATEGORY_CONFIG[categorySlug] || {
    title: categorySlug.toUpperCase(),
    subtitle: '',
  };

  return (
    <MainContainer className="py-8 md:py-12">
      {/* Dynamic Section Header */}
      <SectionHeading title={config.title} subtitle={config.subtitle} />

      {/* Empty State */}
      {filteredProducts.length === 0 ? (
        <div className="mt-8 text-center py-12 bg-[#FAF7F2] border border-[#ECE7DE] rounded-xl">
          <p className="font-sans text-sm text-elava-stone mb-4">No fragrances found in this collection.</p>
          <Link
            to="/"
            className="font-sans text-xs uppercase tracking-wider font-semibold text-elava-gold hover:underline"
          >
            Return to Homepage →
          </Link>
        </div>
      ) : (
        /* Responsive Product Grid */
        <div className="mt-6 md:mt-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </MainContainer>
  );
}


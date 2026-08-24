import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MainContainer from '../components/ui/MainContainer';
import ProductCard from '../components/home/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import SEO from '../components/common/SEO';
import products from '../data/products';

const GENDER_CATEGORIES = ['men', 'women', 'unisex'];
const OCCASION_CATEGORIES = ['date-night', 'everyday', 'office', 'party'];
const VALID_SLUGS = [...GENDER_CATEGORIES, ...OCCASION_CATEGORIES, 'bestsellers', 'all'];

const CATEGORY_CONFIG = {
  all: {
    title: 'ALL FRAGRANCES',
    subtitle: 'Explore our complete artisanal Eau de Parfum collection.',
    seoTitle: 'All Fragrances | ÉLAVA',
    seoDescription: 'Explore the full ÉLAVA artisanal fragrance collection.',
  },
  men: {
    title: 'MEN',
    subtitle: 'Fragrances crafted for him.',
    seoTitle: "Men's Fragrances | ÉLAVA",
    seoDescription: "Explore ÉLAVA's premium artisanal fragrances crafted for him.",
  },
  women: {
    title: 'WOMEN',
    subtitle: 'Fragrances crafted for her.',
    seoTitle: "Women's Fragrances | ÉLAVA",
    seoDescription: "Explore ÉLAVA's elegant artisanal fragrances crafted for her.",
  },
  unisex: {
    title: 'UNISEX',
    subtitle: 'Fragrances for every expression.',
    seoTitle: 'Unisex Fragrances | ÉLAVA',
    seoDescription: "Explore ÉLAVA's distinctive unisex fragrances for every expression.",
  },
  bestsellers: {
    title: 'BESTSELLERS',
    subtitle: 'Our most loved fragrances.',
    seoTitle: 'Bestseller Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's most coveted and bestselling signature perfumes.",
  },
  'date-night': {
    title: 'DATE NIGHT',
    subtitle: 'Fragrances for nights worth remembering.',
    seoTitle: 'Date Night Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's seductive date night fragrances for evenings worth remembering.",
  },
  everyday: {
    title: 'EVERYDAY',
    subtitle: 'Your signature scent, every day.',
    seoTitle: 'Everyday Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's refined everyday signature scents for effortless wear.",
  },
  office: {
    title: 'OFFICE',
    subtitle: 'Clean. Sharp. Effortless.',
    seoTitle: 'Office Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's clean, sharp, and polished fragrances for work.",
  },
  party: {
    title: 'PARTY',
    subtitle: 'Walk in. Get noticed.',
    seoTitle: 'Party Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's bold and magnetic party fragrances made to get noticed.",
  },
};

export default function CategoryPage() {
  const { categorySlug = 'all' } = useParams();
  const isSupportedSlug = VALID_SLUGS.includes(categorySlug);

  // Base Category Products (Excludes sample_set from standard grids)
  const categoryProducts = products.filter((p) => {
    if (p.type === 'sample_set') return false;
    if (!isSupportedSlug || categorySlug === 'all') return true;

    if (GENDER_CATEGORIES.includes(categorySlug)) {
      return p.gender === categorySlug;
    }
    if (categorySlug === 'bestsellers') {
      return p.isBestseller === true;
    }
    if (OCCASION_CATEGORIES.includes(categorySlug)) {
      return p.occasion === categorySlug || (Array.isArray(p.occasion) && p.occasion.includes(categorySlug));
    }
    return true;
  });

  if (!isSupportedSlug) {
    return (
      <MainContainer className="py-16 text-center">
        <SEO
          title="Collection Not Found | ÉLAVA"
          description="The requested fragrance collection does not exist."
          canonicalPath={`/category/${categorySlug || ''}`}
        />
        <h1 className="font-serif text-3xl font-normal uppercase tracking-wider text-[#F5F1EA] mb-3">
          Collection Not Found
        </h1>
        <p className="font-sans text-sm text-[#B8C4C2] mb-6">
          The requested fragrance collection does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#7A2929] text-[#F5F1EA] px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold hover:bg-[#8C3232] transition-colors"
        >
          Return to Homepage
        </Link>
      </MainContainer>
    );
  }

  const config = CATEGORY_CONFIG[categorySlug] || {
    title: categorySlug.toUpperCase(),
    subtitle: '',
    seoTitle: `${categorySlug.toUpperCase()} | ÉLAVA`,
    seoDescription: `Explore ÉLAVA ${categorySlug} luxury fragrance collection.`,
  };

  return (
    <MainContainer className="py-8 md:py-12">
      <SEO
        title={config.seoTitle}
        description={config.seoDescription}
        canonicalPath={`/category/${categorySlug}`}
        ogType="website"
      />

      <SectionHeading as="h1" title={config.title} subtitle={config.subtitle} />

      {/* Results Count */}
      <div className="mt-6 mb-2 text-xs text-[#B8C4C2]">
        <span>Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'fragrance' : 'fragrances'}</span>
      </div>

      {/* Product Grid */}
      {categoryProducts.length === 0 ? (
        <div className="mt-6 text-center py-12 bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl">
          <p className="font-sans text-sm text-[#B8C4C2]">No fragrances in this collection yet.</p>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </MainContainer>
  );
}

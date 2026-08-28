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
    title: 'All Fragrances',
    subtitle: 'Explore our complete artisanal Eau de Parfum collection.',
    seoTitle: 'All Fragrances | ÉLAVA',
    seoDescription: 'Explore the full ÉLAVA artisanal fragrance collection.',
  },
  men: {
    title: 'For Him',
    subtitle: 'Fragrances crafted for him.',
    seoTitle: "Men's Fragrances | ÉLAVA",
    seoDescription: "Explore ÉLAVA's premium artisanal fragrances crafted for him.",
  },
  women: {
    title: 'For Her',
    subtitle: 'Fragrances crafted for her.',
    seoTitle: "Women's Fragrances | ÉLAVA",
    seoDescription: "Explore ÉLAVA's elegant artisanal fragrances crafted for her.",
  },
  unisex: {
    title: 'Unisex',
    subtitle: 'Fragrances for every expression.',
    seoTitle: 'Unisex Fragrances | ÉLAVA',
    seoDescription: "Explore ÉLAVA's distinctive unisex fragrances for every expression.",
  },
  bestsellers: {
    title: 'Bestsellers',
    subtitle: 'Our most loved signature fragrances.',
    seoTitle: 'Bestseller Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's most coveted and bestselling signature perfumes.",
  },
  'date-night': {
    title: 'Date Night',
    subtitle: 'Fragrances for nights worth remembering.',
    seoTitle: 'Date Night Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's seductive date night fragrances for evenings worth remembering.",
  },
  everyday: {
    title: 'Everyday',
    subtitle: 'Your signature scent, every day.',
    seoTitle: 'Everyday Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's refined everyday signature scents for effortless wear.",
  },
  office: {
    title: 'Office',
    subtitle: 'Clean. Sharp. Effortless.',
    seoTitle: 'Office Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's clean, sharp, and polished fragrances for work.",
  },
  party: {
    title: 'Party',
    subtitle: 'Walk in. Get noticed.',
    seoTitle: 'Party Fragrances | ÉLAVA',
    seoDescription: "Discover ÉLAVA's bold and magnetic party fragrances made to get noticed.",
  },
};

export default function CategoryPage() {
  const { categorySlug = 'all' } = useParams();
  const isSupportedSlug = VALID_SLUGS.includes(categorySlug);

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
        <h1 className="font-sora text-3xl font-semibold text-[#F5F2EE] mb-3">
          Collection Not Found
        </h1>
        <p className="font-manrope text-sm text-[#B8B3AF] mb-6 font-normal">
          The requested fragrance collection does not exist.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#B4171E] hover:bg-[#C72A35] text-[#F5F2EE] px-6 py-2.5 rounded-xl font-manrope text-[14px] font-semibold transition-colors btn-interactive"
        >
          Return to Homepage
        </Link>
      </MainContainer>
    );
  }

  const config = CATEGORY_CONFIG[categorySlug] || {
    title: categorySlug,
    subtitle: '',
    seoTitle: `${categorySlug} | ÉLAVA`,
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
      <div className="mt-6 mb-2 font-manrope text-[14px] text-[#B8B3AF] font-medium">
        <span>Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'fragrance' : 'fragrances'}</span>
      </div>

      {/* Product Grid */}
      {categoryProducts.length === 0 ? (
        <div className="mt-6 text-center py-12 bg-[#121212] border border-white/10 rounded-xl">
          <p className="font-manrope text-[14px] text-[#B8B3AF] font-normal">No fragrances in this collection yet.</p>
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

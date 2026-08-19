import React from 'react';
import { useParams } from 'react-router-dom';
import MainContainer from '../components/ui/MainContainer';
import ProductCard from '../components/home/ProductCard';
import SectionHeading from '../components/ui/SectionHeading';
import products from '../data/products';

const TITLE_MAP = {
  men: ['MEN', 'Fragrances crafted for him.'],
  women: ['WOMEN', 'Fragrances crafted for her.'],
  unisex: ['UNISEX', 'Fragrances for every expression.'],
  bestsellers: ['BESTSELLERS', 'Our most loved signatures.'],
  'date-night': ['DATE NIGHT', 'Evenings worth remembering.'],
  everyday: ['EVERYDAY', 'Signature scents for everyday wear.'],
  office: ['OFFICE', 'Subtle and polished for work.'],
  party: ['PARTY', 'Make an entrance.']
};

export default function CategoryPage() {
  const { categorySlug } = useParams();

  // Determine filter type
  const genders = ['men', 'women', 'unisex'];

  const filtered = products.filter((p) => {
    if (!categorySlug) return false;
    if (genders.includes(categorySlug)) return p.gender === categorySlug;
    if (categorySlug === 'bestsellers') return p.isBestseller === true;
    // fallback: treat as occasion slug
    return Array.isArray(p.occasion) && p.occasion.includes(categorySlug);
  });

  const titleEntry = TITLE_MAP[categorySlug] || [categorySlug?.toUpperCase() || 'Category', ''];

  return (
    <MainContainer className="py-8">
      <SectionHeading title={titleEntry[0]} subtitle={titleEntry[1]} />

      {filtered.length === 0 ? (
        <p className="font-sans text-[13px] text-elava-stone">No fragrances found in this collection.</p>
      ) : (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </MainContainer>
  );
}

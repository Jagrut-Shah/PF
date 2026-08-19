import React from 'react';
import { useParams } from 'react-router-dom';
import MainContainer from '../components/ui/MainContainer';

/**
 * CategoryPage (Stage 0 Placeholder)
 */
export default function CategoryPage() {
  const { categorySlug } = useParams();

  return (
    <MainContainer className="py-12">
      <h1 className="text-xl font-medium">Category: {categorySlug}</h1>
    </MainContainer>
  );
}

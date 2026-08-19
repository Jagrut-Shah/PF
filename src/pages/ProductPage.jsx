import React from 'react';
import { useParams } from 'react-router-dom';
import MainContainer from '../components/ui/MainContainer';

/**
 * ProductPage (Stage 0 Placeholder)
 */
export default function ProductPage() {
  const { productSlug } = useParams();

  return (
    <MainContainer className="py-12">
      <h1 className="text-xl font-medium">Product: {productSlug}</h1>
    </MainContainer>
  );
}

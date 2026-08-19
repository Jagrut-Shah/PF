import React from 'react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';

/**
 * ReviewsPage
 */
export default function ReviewsPage() {
  return (
    <MainContainer className="py-12">
      <SEO
        title="Customer Reviews | ÉLAVA"
        description="Read verified customer experiences and reviews of ÉLAVA luxury fragrances."
        canonicalPath="/reviews"
      />
      <h1 className="text-xl font-medium">Reviews</h1>
    </MainContainer>
  );
}


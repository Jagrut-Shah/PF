import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShieldCheck, Truck, Plus, Minus } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import StarRating from '../components/ui/StarRating';
import products from '../data/products';
import createWhatsAppOrderUrl from '../utils/whatsapp';

/**
 * Official WhatsApp Icon matching brand style
 */
function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}

/**
 * Solid Blue Padlock Icon (No Keyhole)
 */
function SecureLockIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="10" width="14" height="11" rx="2" fill="#2563EB" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/**
 * Unfilled Green Outline Shield Icon with Green Checkmark Tick
 */
function AuthTickIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3L4 6v5.5c0 5.25 3.4 10.15 8 11.35 4.6-1.2 8-6.1 8-11.35V6l-8-3z"
        stroke="#16A34A"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 11.5l2 2 4-4"
        stroke="#16A34A"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Breadcrumb component for ProductDetails
 */
function Breadcrumb({ product }) {
  if (!product) return null;

  const genderPath = `/category/${product.gender}`;
  const genderLabel = product.gender ? product.gender.toUpperCase() : 'ALL';

  return (
    <nav aria-label="Breadcrumb" className="mb-4 sm:mb-6">
      <ol className="flex items-center space-x-2 font-sans text-xs text-[#B8C4C2]">
        <li>
          <Link to="/" className="hover:text-[#F5F1EA] transition-colors">
            HOME
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to={genderPath} className="hover:text-[#F5F1EA] transition-colors font-medium">
            {genderLabel}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-[#F5F1EA] font-semibold uppercase tracking-wider" aria-current="page">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Format notes helper
 */
function formatNotes(notesArray) {
  if (!notesArray) return '';
  if (Array.isArray(notesArray)) return notesArray.join(' · ');
  return notesArray;
}

export default function ProductDetails() {
  const { productSlug } = useParams();
  const mainCtaRef = useRef(null);
  const [isStickyVisible, setIsStickyVisible] = useState(false);

  // Accordion state for mobile view
  const [openAccordions, setOpenAccordions] = useState({
    about: true,
    notes: false,
    reviews: false,
    delivery: false,
  });

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Find product by slug
  const product = products.find((p) => p.slug === productSlug);

  // Sticky Add to Cart IntersectionObserver
  useEffect(() => {
    if (!mainCtaRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isScrolledPast = entry.boundingClientRect.top < 0;
        setIsStickyVisible(!entry.isIntersecting && isScrolledPast);
      },
      {
        threshold: 0,
        rootMargin: '0px',
      }
    );

    observer.observe(mainCtaRef.current);

    return () => observer.disconnect();
  }, [product]);

  // If product not found
  if (!product) {
    return (
      <MainContainer className="py-16 text-center">
        <SEO
          title="Product Not Found | ÉLAVA"
          description="The requested fragrance signature could not be found."
          canonicalPath="/product"
        />
        <h1 className="font-sans text-3xl font-bold text-[#F5F1EA] mb-4">Product Not Found</h1>
        <p className="font-sans text-sm text-[#B8C4C2] mb-6">
          The fragrance signature you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#000000] text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold hover:bg-black/80 transition-colors"
        >
          Return to Homepage
        </Link>
      </MainContainer>
    );
  }

  // Gender display label
  const genderTarget = product.gender === 'men' ? 'For Him' : product.gender === 'women' ? 'For Her' : 'Unisex';

  // Dynamic WhatsApp pre-filled message
  const waCustomMessage = `Hi, I'd like to order ÉLAVA ${product.name} (${product.size || '60 ML'}) for ₹${product.price?.toLocaleString()}.`;
  const whatsappUrl = createWhatsAppOrderUrl({ customMessage: waCustomMessage });

  // Product specific review
  const productReview = product.review || {
    text: 'Exceptional longevity and depth. Truly feels niche and bespoke.',
    customer: 'Aarav S.',
    city: 'Mumbai',
  };

  // Dynamic Product Page SEO Title
  const pageTitle = `${product.name} — ${product.scentIdentity} | ÉLAVA`;
  const pageCanonical = `/product/${product.slug}`;

  // JSON-LD Product Schema
  const productJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: `ÉLAVA ${product.name}`,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'ÉLAVA',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'INR',
      price: product.price,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <MainContainer className="py-6 sm:py-8">
      {/* Dynamic SEO & JSON-LD Structured Data */}
      <SEO
        title={pageTitle}
        description={product.description}
        canonicalPath={pageCanonical}
        ogType="product"
        ogImage={product.image}
        jsonLd={productJsonLd}
      />

      {/* 1. Breadcrumb */}
      <Breadcrumb product={product} />

      {/* 2. Main Product Area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-start">
        
        {/* LEFT COLUMN: Product Image + Featured Review Card (Desktop) */}
        <div className="md:col-span-6 lg:col-span-7">
          {/* Main Product Image Container */}
          <div className="bg-[#1C4A55] p-2 sm:p-3 md:p-4 rounded-2xl border border-[rgba(243,235,221,0.15)] flex justify-center items-center">
            <img
              src={product.image}
              alt={`ÉLAVA ${product.name} Eau de Parfum bottle`}
              className="w-full max-w-[560px] max-h-[480px] h-auto object-contain drop-shadow-xs select-none"
            />
          </div>

          {/* Desktop Featured Review Card */}
          <div className="hidden md:block mt-4 bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-4 md:p-5 text-[#F5F1EA] shadow-sm">
            <div className="flex items-center gap-1.5 mb-2">
              <StarRating rating={product.rating} size={14} starColor="#C5A15A" />
            </div>
            <blockquote className="font-sans text-sm lg:text-base italic text-[#E5E9E8] leading-snug mb-2.5">
              "{productReview.text}"
            </blockquote>
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[rgba(243,235,221,0.12)]">
              <span className="font-sans text-xs text-[#B8C4C2]">
                {productReview.customer} · {productReview.city}
              </span>
              <Link
                to={`/reviews?product=${product.slug}`}
                className="font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#F5F1EA] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1.5"
              >
                VIEW MORE REVIEWS <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col">
          {/* Bestseller Badge */}
          {product.isBestseller && (
            <div className="self-start">
              <span className="bg-[#C5A15A] text-[#102F38] px-2.5 py-0.5 text-[10px] tracking-[0.2em] font-extrabold uppercase rounded-sm inline-block mb-2 shadow-xs">
                BESTSELLER
              </span>
            </div>
          )}

          {/* Product Title */}
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-[44px] uppercase font-bold tracking-[0.04em] text-[#F5F1EA] leading-tight">
            {product.name}
          </h1>

          {/* Product Type + Gender */}
          <div className="font-sans text-xs sm:text-sm text-[#B8C4C2] tracking-wide font-medium mt-1">
            Eau de Parfum · {genderTarget}
          </div>

          {/* Rating + Review Count */}
          <div className="mt-3 flex items-center gap-2.5">
            <StarRating rating={product.rating} size={14} starColor="#C5A15A" />
            <span className="font-sans text-xs font-semibold text-[#F5F1EA]">{product.rating}</span>
            <span className="font-sans text-xs text-[#B8C4C2]">({product.reviewCount} reviews)</span>
          </div>

          {/* Price & Size */}
          <div className="mt-4">
            <div className="font-sans text-2xl sm:text-3xl font-bold text-[#F5F1EA] tracking-tight">
              ₹{product.price?.toLocaleString()}
            </div>
            <div className="font-sans text-xs text-[#B8C4C2] font-medium tracking-wider uppercase mt-0.5">
              {product.size || '60 ML'}
            </div>
          </div>

          {/* Large WhatsApp CTA Container */}
          <div ref={mainCtaRef} className="mt-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#000000] hover:bg-[#151515] text-white rounded-md py-3 px-5 font-bold uppercase text-xs sm:text-sm tracking-[0.16em] flex items-center justify-center gap-3 transition-colors duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#25D366] fill-[#25D366]" />
              ORDER ON WHATSAPP
            </a>

            {/* Reassurance text */}
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-[#B8C4C2] font-sans">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#2563EB]" />
              <span>We'll confirm your order and delivery details on WhatsApp.</span>
            </div>
          </div>

          {/* Desktop Content Blocks */}
          <div className="hidden md:block">
            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[rgba(243,235,221,0.15)]" />

            {/* WHAT DOES IT SMELL LIKE? */}
            <section className="space-y-3">
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F1EA]">
                WHAT DOES IT SMELL LIKE?
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] leading-relaxed">
                {product.whatItSmellsLike || product.description}
              </p>

              {product.smellsLikeProfile && product.smellsLikeProfile.length > 0 && (
                <div className="pt-1">
                  <div className="font-sans text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5F1EA] mb-2">
                    SMELLS LIKE
                  </div>
                  <div className="font-sans text-xs sm:text-sm font-medium text-[#F5F1EA] flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {product.smellsLikeProfile.map((trait, idx) => (
                      <React.Fragment key={idx}>
                        {idx > 0 && (
                          <span className="text-[#B8C4C2]/60 font-normal select-none" aria-hidden="true">
                            →
                          </span>
                        )}
                        <span className="bg-[#102F38] text-[#F5F1EA] px-2.5 py-1 rounded border border-[rgba(243,235,221,0.15)] text-xs">
                          {trait}
                        </span>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[rgba(243,235,221,0.15)]" />

            {/* FRAGRANCE NOTES */}
            <section>
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2.5">
                FRAGRANCE NOTES
              </h2>
              <div className="grid grid-cols-3 gap-3 lg:gap-4 py-0.5">
                {/* TOP NOTES */}
                <div className="flex items-start gap-2.5">
                  <img
                    src="/images/notes/top-notes.jpg"
                    alt="Top notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA] mb-0.5">
                      TOP NOTES
                    </div>
                    <div className="font-sans text-xs text-[#B8C4C2] leading-snug">
                      {formatNotes(product.notes?.top)}
                    </div>
                  </div>
                </div>

                {/* HEART NOTES */}
                <div className="flex items-start gap-2.5 border-l border-[rgba(243,235,221,0.15)] pl-3 lg:pl-4">
                  <img
                    src="/images/notes/heart-notes.jpg"
                    alt="Heart notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA] mb-0.5">
                      HEART NOTES
                    </div>
                    <div className="font-sans text-xs text-[#B8C4C2] leading-snug">
                      {formatNotes(product.notes?.heart)}
                    </div>
                  </div>
                </div>

                {/* BASE NOTES */}
                <div className="flex items-start gap-2.5 border-l border-[rgba(243,235,221,0.15)] pl-3 lg:pl-4">
                  <img
                    src="/images/notes/base-notes.jpg"
                    alt="Base notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA] mb-0.5">
                      BASE NOTES
                    </div>
                    <div className="font-sans text-xs text-[#B8C4C2] leading-snug">
                      {formatNotes(product.notes?.base)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[rgba(243,235,221,0.15)]" />

            {/* DELIVERY & ORDERING */}
            <section>
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-1.5">
                DELIVERY & ORDERING
              </h2>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
                <Truck className="w-4 h-4 text-[#F5F1EA] shrink-0 mt-0.5" />
                <p>
                  We take orders directly on WhatsApp. Our team will confirm your delivery details and shipping information.
                </p>
              </div>
            </section>
          </div>

          {/* MOBILE ACCORDIONS */}
          <div className="md:hidden mt-6 space-y-3">
            {/* Accordion 1: WHAT DOES IT SMELL LIKE? */}
            <div className="border border-[rgba(243,235,221,0.15)] rounded-lg bg-[#1C4A55] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('about')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#F5F1EA]"
                aria-expanded={openAccordions.about}
              >
                <span>WHAT DOES IT SMELL LIKE?</span>
                {openAccordions.about ? (
                  <Minus className="w-4 h-4 text-[#B8C4C2]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#B8C4C2]" />
                )}
              </button>
              {openAccordions.about && (
                <div className="px-4 pb-4 font-sans text-xs text-[#B8C4C2] leading-relaxed border-t border-[rgba(243,235,221,0.12)] pt-3 space-y-3">
                  <p>{product.whatItSmellsLike || product.description}</p>
                  {product.smellsLikeProfile && product.smellsLikeProfile.length > 0 && (
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#F5F1EA] mb-2">
                        SMELLS LIKE
                      </div>
                      <div className="text-xs font-medium text-[#F5F1EA] flex flex-wrap items-center gap-1.5">
                        {product.smellsLikeProfile.map((trait, idx) => (
                          <React.Fragment key={idx}>
                            {idx > 0 && (
                              <span className="text-[#B8C4C2]/60 font-normal select-none" aria-hidden="true">
                                →
                              </span>
                            )}
                            <span className="bg-[#102F38] text-[#F5F1EA] px-2 py-0.5 rounded border border-[rgba(243,235,221,0.15)] text-[11px]">
                              {trait}
                            </span>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: FRAGRANCE NOTES */}
            <div className="border border-[rgba(243,235,221,0.15)] rounded-lg bg-[#1C4A55] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('notes')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#F5F1EA]"
                aria-expanded={openAccordions.notes}
              >
                <span>FRAGRANCE NOTES</span>
                {openAccordions.notes ? (
                  <Minus className="w-4 h-4 text-[#B8C4C2]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#B8C4C2]" />
                )}
              </button>
              {openAccordions.notes && (
                <div className="px-4 pb-4 space-y-3.5 border-t border-[rgba(243,235,221,0.12)] pt-3">
                  {/* Top */}
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/notes/top-notes.jpg"
                      alt="Top notes"
                      className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                    />
                    <div>
                      <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA]">
                        TOP NOTES
                      </div>
                      <div className="font-sans text-xs text-[#B8C4C2]">{formatNotes(product.notes?.top)}</div>
                    </div>
                  </div>
                  {/* Heart */}
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/notes/heart-notes.jpg"
                      alt="Heart notes"
                      className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                    />
                    <div>
                      <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA]">
                        HEART NOTES
                      </div>
                      <div className="font-sans text-xs text-[#B8C4C2]">{formatNotes(product.notes?.heart)}</div>
                    </div>
                  </div>
                  {/* Base */}
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/notes/base-notes.jpg"
                      alt="Base notes"
                      className="w-8 h-8 object-contain rounded-full bg-[#102F38] shrink-0 border border-[rgba(243,235,221,0.15)] p-0.5"
                    />
                    <div>
                      <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#F5F1EA]">
                        BASE NOTES
                      </div>
                      <div className="font-sans text-xs text-[#B8C4C2]">{formatNotes(product.notes?.base)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: WHAT PEOPLE SAY */}
            <div className="border border-[rgba(243,235,221,0.15)] rounded-lg bg-[#1C4A55] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('reviews')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#F5F1EA]"
                aria-expanded={openAccordions.reviews}
              >
                <span>WHAT PEOPLE SAY</span>
                {openAccordions.reviews ? (
                  <Minus className="w-4 h-4 text-[#B8C4C2]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#B8C4C2]" />
                )}
              </button>
              {openAccordions.reviews && (
                <div className="px-4 pb-4 border-t border-[rgba(243,235,221,0.12)] pt-3 bg-[#1C4A55] text-[#F5F1EA] rounded-b-lg">
                  <div className="flex items-center gap-1.5 mb-2">
                    <StarRating rating={product.rating} size={14} starColor="#C5A15A" />
                  </div>
                  <blockquote className="font-sans text-base italic text-[#E5E9E8] leading-relaxed mb-2">
                    "{productReview.text}"
                  </blockquote>
                  <div className="font-sans text-xs text-[#B8C4C2]">
                    {productReview.customer} · {productReview.city}
                  </div>
                  <div className="mt-3">
                    <Link
                      to={`/reviews?product=${product.slug}`}
                      className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5F1EA] hover:text-[#FFFFFF] transition-colors inline-flex items-center gap-1.5"
                    >
                      VIEW MORE REVIEWS <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: DELIVERY & ORDERING */}
            <div className="border border-[rgba(243,235,221,0.15)] rounded-lg bg-[#1C4A55] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('delivery')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#F5F1EA]"
                aria-expanded={openAccordions.delivery}
              >
                <span>DELIVERY & ORDERING</span>
                {openAccordions.delivery ? (
                  <Minus className="w-4 h-4 text-[#B8C4C2]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#B8C4C2]" />
                )}
              </button>
              {openAccordions.delivery && (
                <div className="px-4 pb-4 font-sans text-xs text-[#E5E9E8] leading-relaxed border-t border-[rgba(243,235,221,0.12)] pt-3 flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#F5F1EA] shrink-0 mt-0.5" />
                  <span>
                    We take orders directly on WhatsApp. Our team will confirm your delivery details and shipping information.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* SINGLE COMBINED TRUST / ORDER BOX — PURE BLACK #000000 */}
          <div className="mt-8 grid grid-cols-3 gap-2 text-center bg-[#000000] p-4 sm:p-4.5 rounded-xl border border-white/10 shadow-lg">
            {/* 1. WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center group hover:opacity-90 transition-opacity"
            >
              <WhatsAppIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-[#25D366] fill-[#25D366] mb-1.5" />
              <span className="font-sans text-[10px] sm:text-[11.5px] font-bold text-[#F5F1EA] leading-tight">
                Order on WhatsApp
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-[#B8C4C2] mt-0.5">
                Instant Response
              </span>
            </a>

            {/* 2. Secure & Trusted */}
            <div className="flex flex-col items-center justify-center">
              <SecureLockIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 mb-1.5 shrink-0" />
              <span className="font-sans text-[10px] sm:text-[11.5px] font-bold text-[#F5F1EA] leading-tight">
                Secure & Trusted
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-[#B8C4C2] mt-0.5">
                Verified Checkout
              </span>
            </div>

            {/* 3. Authentic Products */}
            <div className="flex flex-col items-center justify-center">
              <AuthTickIcon className="w-5 h-5 sm:w-5.5 sm:h-5.5 mb-1.5 shrink-0" />
              <span className="font-sans text-[10px] sm:text-[11.5px] font-bold text-[#F5F1EA] leading-tight">
                Authentic Products
              </span>
              <span className="font-sans text-[9px] sm:text-[10px] text-[#B8C4C2] mt-0.5">
                100% Guaranteed
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* STICKY ADD TO CART PURCHASE BAR */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 bg-[#000000] border-t border-[rgba(243,235,221,0.15)] shadow-2xl transition-all duration-300 transform pb-[env(safe-area-inset-bottom)] ${
          isStickyVisible
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : 'translate-y-full opacity-0 pointer-events-none'
        }`}
        role="region"
        aria-label="Sticky Add to Cart purchase bar"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 flex items-center justify-between gap-3">
          {/* Left: Product Name & Price */}
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={product.image}
              alt={`ÉLAVA ${product.name}`}
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain rounded bg-[#102F38] border border-[rgba(243,235,221,0.15)] shrink-0 select-none"
            />
            <div className="min-w-0 flex flex-col sm:flex-row sm:items-center sm:gap-2">
              <span className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#F5F1EA] truncate">
                ÉLAVA {product.name}
              </span>
              <span className="hidden sm:inline text-[#B8C4C2]/50 text-xs">|</span>
              <span className="font-sans text-xs sm:text-sm font-bold text-[#F5F1EA]">
                ₹{product.price?.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Right: Sticky Add to Cart CTA */}
          <div className="shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#000000] hover:bg-[#151515] text-[#F5F1EA] border border-[rgba(243,235,221,0.3)] rounded-md py-2 px-3.5 sm:py-2.5 sm:px-6 font-bold uppercase text-[11px] sm:text-xs tracking-[0.14em] flex items-center justify-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.98]"
              aria-label={`Add ÉLAVA ${product.name} to cart for ₹${product.price}`}
            >
              <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#25D366] fill-[#25D366]" />
              <span>ADD TO CART</span>
            </a>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}


import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShieldCheck, Truck, Plus, Minus, Lock } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import products from '../data/products';
import createWhatsAppOrderUrl from '../utils/whatsapp';

/**
 * Official WhatsApp Icon matching brand style
 */
function WhatsAppIcon({ className = "w-5 h-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
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
      <ol className="flex items-center space-x-2 font-sans text-xs text-[#77736B]">
        <li>
          <Link to="/" className="hover:text-[#171717] transition-colors">
            HOME
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link to={genderPath} className="hover:text-[#171717] transition-colors font-medium">
            {genderLabel}
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-[#171717] font-semibold uppercase tracking-wider" aria-current="page">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}

/**
 * Star Rating component
 */
function Stars({ rating = 5 }) {
  const fullStars = Math.floor(rating);
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={`text-xs ${i < fullStars ? 'text-[#CFA838]' : 'text-gray-300'}`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
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

  // If product not found
  if (!product) {
    return (
      <MainContainer className="py-16 text-center">
        <SEO
          title="Product Not Found | ÉLAVA"
          description="The requested fragrance signature could not be found."
          canonicalPath="/product"
        />
        <h1 className="font-serif text-3xl font-normal text-[#171717] mb-4">Product Not Found</h1>
        <p className="font-sans text-sm text-[#77736B] mb-6">
          The fragrance signature you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block bg-[#171717] text-white px-6 py-2.5 rounded text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors"
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

  // Dynamic Product Page SEO Title: NAME — Scent Identity | ÉLAVA
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
          {/* Main Product Image Container (Reduced internal padding for larger image presence) */}
          <div className="bg-[#FAF7F2] p-2 sm:p-3 md:p-4 rounded-2xl border border-[#EFEAE2] flex justify-center items-center">
            <img
              src={product.image}
              alt={`ÉLAVA ${product.name} Eau de Parfum bottle`}
              className="w-full max-w-[560px] max-h-[480px] h-auto object-contain drop-shadow-xs select-none"
            />
          </div>

          {/* Desktop Featured Review Card (Compact & Proportionate) */}
          <div className="hidden md:block mt-4 bg-[#FAF7F2]/80 border border-[#ECE7DE] rounded-xl p-4 md:p-5">
            <div className="flex items-center gap-1.5 mb-2">
              <Stars rating={product.rating} />
            </div>
            <blockquote className="font-serif text-sm lg:text-base italic text-[#171717] leading-snug mb-2.5">
              "{productReview.text}"
            </blockquote>
            <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-[#EAE5DC]">
              <span className="font-sans text-xs text-[#77736B]">
                {productReview.customer} · {productReview.city}
              </span>
              <Link
                to="/reviews"
                className="font-sans text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#171717] hover:text-[#CFA838] transition-colors inline-flex items-center gap-1.5"
              >
                VIEW ALL REVIEWS <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Details */}
        <div className="md:col-span-6 lg:col-span-5 flex flex-col">
          {/* Bestseller Badge */}
          {product.isBestseller && (
            <div className="self-start">
              <span className="bg-[#F5EFE0] text-[#9E6E24] px-2.5 py-0.5 text-[10px] tracking-[0.2em] font-bold uppercase rounded-sm inline-block mb-2">
                BESTSELLER
              </span>
            </div>
          )}

          {/* Product Title */}
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-[44px] uppercase font-normal tracking-[0.06em] text-[#171717] leading-tight">
            {product.name}
          </h1>

          {/* Product Type + Gender */}
          <div className="font-sans text-xs sm:text-sm text-[#77736B] tracking-wide font-medium mt-1">
            Eau de Parfum · {genderTarget}
          </div>

          {/* Rating + Review Count */}
          <div className="mt-3 flex items-center gap-2.5">
            <Stars rating={product.rating} />
            <span className="font-sans text-xs font-semibold text-[#171717]">{product.rating}</span>
            <span className="font-sans text-xs text-[#77736B]">({product.reviewCount} reviews)</span>
          </div>

          {/* Price & Size */}
          <div className="mt-4">
            <div className="font-sans text-2xl sm:text-3xl font-bold text-[#171717] tracking-tight">
              ₹{product.price?.toLocaleString()}
            </div>
            <div className="font-sans text-xs text-[#77736B] font-medium tracking-wider uppercase mt-0.5">
              {product.size || '60 ML'}
            </div>
          </div>

          {/* Large WhatsApp CTA */}
          <div className="mt-5">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#181818] hover:bg-[#2A2A2A] text-white rounded-md py-3 px-5 font-bold uppercase text-xs sm:text-sm tracking-[0.16em] flex items-center justify-center gap-3 transition-colors duration-200 cursor-pointer shadow-sm active:scale-[0.99]"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ORDER ON WHATSAPP
            </a>

            {/* Reassurance text */}
            <div className="mt-2 flex items-center justify-center sm:justify-start gap-1.5 text-[11px] text-[#77736B] font-sans">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#77736B]" />
              <span>We'll confirm your order and delivery details on WhatsApp.</span>
            </div>
          </div>

          {/* Desktop Content Blocks (Tightened Vertical Rhythm) */}
          <div className="hidden md:block">
            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[#E6E2DA]" />

            {/* ABOUT THE SCENT */}
            <section>
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#171717] mb-1.5">
                ABOUT THE SCENT
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#444] leading-relaxed">
                {product.description}
              </p>
            </section>

            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[#E6E2DA]" />

            {/* FRAGRANCE NOTES */}
            <section>
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#171717] mb-2.5">
                FRAGRANCE NOTES
              </h2>
              <div className="grid grid-cols-3 gap-3 lg:gap-4 py-0.5">
                {/* TOP NOTES */}
                <div className="flex items-start gap-2.5">
                  <img
                    src="/images/notes/top-notes.jpg"
                    alt="Top notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#FAF7F2] shrink-0 border border-[#ECE7DE] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#171717] mb-0.5">
                      TOP NOTES
                    </div>
                    <div className="font-sans text-xs text-[#555] leading-snug">
                      {formatNotes(product.notes?.top)}
                    </div>
                  </div>
                </div>

                {/* HEART NOTES */}
                <div className="flex items-start gap-2.5 border-l border-[#E6E2DA] pl-3 lg:pl-4">
                  <img
                    src="/images/notes/heart-notes.jpg"
                    alt="Heart notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#FAF7F2] shrink-0 border border-[#ECE7DE] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#171717] mb-0.5">
                      HEART NOTES
                    </div>
                    <div className="font-sans text-xs text-[#555] leading-snug">
                      {formatNotes(product.notes?.heart)}
                    </div>
                  </div>
                </div>

                {/* BASE NOTES */}
                <div className="flex items-start gap-2.5 border-l border-[#E6E2DA] pl-3 lg:pl-4">
                  <img
                    src="/images/notes/base-notes.jpg"
                    alt="Base notes illustration"
                    className="w-8 h-8 object-contain rounded-full bg-[#FAF7F2] shrink-0 border border-[#ECE7DE] p-0.5"
                  />
                  <div>
                    <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#171717] mb-0.5">
                      BASE NOTES
                    </div>
                    <div className="font-sans text-xs text-[#555] leading-snug">
                      {formatNotes(product.notes?.base)}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Divider */}
            <hr className="my-4 md:my-4.5 border-t border-[#E6E2DA]" />

            {/* DELIVERY & ORDERING */}
            <section>
              <h2 className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#171717] mb-1.5">
                DELIVERY & ORDERING
              </h2>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#555] leading-relaxed">
                <Truck className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                <p>
                  We take orders directly on WhatsApp. Our team will confirm your delivery details and shipping information.
                </p>
              </div>
            </section>
          </div>

          {/* MOBILE ACCORDIONS */}
          <div className="md:hidden mt-6 space-y-3">
            {/* Accordion 1: ABOUT THE SCENT */}
            <div className="border border-[#E6E2DA] rounded-lg bg-[#FAF7F2] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('about')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#171717]"
                aria-expanded={openAccordions.about}
              >
                <span>ABOUT THE SCENT</span>
                {openAccordions.about ? (
                  <Minus className="w-4 h-4 text-[#77736B]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#77736B]" />
                )}
              </button>
              {openAccordions.about && (
                <div className="px-4 pb-4 font-sans text-xs text-[#444] leading-relaxed border-t border-[#ECE7DE] pt-3">
                  {product.description}
                </div>
              )}
            </div>

            {/* Accordion 2: FRAGRANCE NOTES */}
            <div className="border border-[#E6E2DA] rounded-lg bg-[#FAF7F2] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('notes')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#171717]"
                aria-expanded={openAccordions.notes}
              >
                <span>FRAGRANCE NOTES</span>
                {openAccordions.notes ? (
                  <Minus className="w-4 h-4 text-[#77736B]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#77736B]" />
                )}
              </button>
              {openAccordions.notes && (
                <div className="px-4 pb-4 space-y-3.5 border-t border-[#ECE7DE] pt-3">
                  {/* Top */}
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/notes/top-notes.jpg"
                      alt="Top notes"
                      className="w-8 h-8 object-contain rounded-full bg-white shrink-0 border border-[#ECE7DE] p-0.5"
                    />
                    <div>
                      <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#171717]">
                        TOP NOTES
                      </div>
                      <div className="font-sans text-xs text-[#555]">{formatNotes(product.notes?.top)}</div>
                    </div>
                  </div>
                  {/* Heart */}
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/notes/heart-notes.jpg"
                      alt="Heart notes"
                      className="w-8 h-8 object-contain rounded-full bg-white shrink-0 border border-[#ECE7DE] p-0.5"
                    />
                    <div>
                      <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#171717]">
                        HEART NOTES
                      </div>
                      <div className="font-sans text-xs text-[#555]">{formatNotes(product.notes?.heart)}</div>
                    </div>
                  </div>
                  {/* Base */}
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/notes/base-notes.jpg"
                      alt="Base notes"
                      className="w-8 h-8 object-contain rounded-full bg-white shrink-0 border border-[#ECE7DE] p-0.5"
                    />
                    <div>
                      <div className="font-sans text-[10px] font-bold tracking-[0.14em] uppercase text-[#171717]">
                        BASE NOTES
                      </div>
                      <div className="font-sans text-xs text-[#555]">{formatNotes(product.notes?.base)}</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 3: WHAT PEOPLE SAY */}
            <div className="border border-[#E6E2DA] rounded-lg bg-[#FAF7F2] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('reviews')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#171717]"
                aria-expanded={openAccordions.reviews}
              >
                <span>WHAT PEOPLE SAY</span>
                {openAccordions.reviews ? (
                  <Minus className="w-4 h-4 text-[#77736B]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#77736B]" />
                )}
              </button>
              {openAccordions.reviews && (
                <div className="px-4 pb-4 border-t border-[#ECE7DE] pt-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <Stars rating={product.rating} />
                  </div>
                  <blockquote className="font-serif text-base italic text-[#171717] leading-relaxed mb-2">
                    "{productReview.text}"
                  </blockquote>
                  <div className="font-sans text-xs text-[#77736B]">
                    {productReview.customer} · {productReview.city}
                  </div>
                  <div className="mt-3">
                    <Link
                      to="/reviews"
                      className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#171717] hover:text-[#CFA838] transition-colors"
                    >
                      VIEW ALL REVIEWS →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Accordion 4: DELIVERY & ORDERING */}
            <div className="border border-[#E6E2DA] rounded-lg bg-[#FAF7F2] overflow-hidden">
              <button
                type="button"
                onClick={() => toggleAccordion('delivery')}
                className="w-full flex items-center justify-between p-4 text-left font-sans text-xs font-bold uppercase tracking-[0.16em] text-[#171717]"
                aria-expanded={openAccordions.delivery}
              >
                <span>DELIVERY & ORDERING</span>
                {openAccordions.delivery ? (
                  <Minus className="w-4 h-4 text-[#77736B]" />
                ) : (
                  <Plus className="w-4 h-4 text-[#77736B]" />
                )}
              </button>
              {openAccordions.delivery && (
                <div className="px-4 pb-4 font-sans text-xs text-[#555] leading-relaxed border-t border-[#ECE7DE] pt-3 flex items-start gap-2.5">
                  <Truck className="w-4 h-4 text-[#171717] shrink-0 mt-0.5" />
                  <span>
                    We take orders directly on WhatsApp. Our team will confirm your delivery details and shipping information.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* MOBILE TRUST FOOTER BAR */}
          <div className="md:hidden mt-8 pt-5 border-t border-[#E6E2DA] grid grid-cols-3 gap-2 text-center bg-[#FAF7F2] p-4 rounded-xl">
            <div className="flex flex-col items-center justify-center">
              <WhatsAppIcon className="w-4 h-4 text-[#171717] mb-1.5" />
              <span className="font-sans text-[10px] font-semibold text-[#171717] leading-tight">
                Order on WhatsApp
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-[#ECE7DE]">
              <ShieldCheck className="w-4 h-4 text-[#171717] mb-1.5" />
              <span className="font-sans text-[10px] font-semibold text-[#171717] leading-tight">
                Authentic Products
              </span>
            </div>
            <div className="flex flex-col items-center justify-center border-l border-[#ECE7DE]">
              <Lock className="w-4 h-4 text-[#171717] mb-1.5" />
              <span className="font-sans text-[10px] font-semibold text-[#171717] leading-tight">
                Secure & Trusted
              </span>
            </div>
          </div>

        </div>
      </div>
    </MainContainer>
  );
}

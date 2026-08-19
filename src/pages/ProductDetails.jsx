import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import products from '../data/products';
import createWhatsAppOrderUrl from '../utils/whatsapp';

function Stars({ rating = 5 }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-2">
      <div className="text-elava-gold" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={`inline-block text-sm ${i < full ? 'text-elava-gold' : 'text-elava-stone'}`}>★</span>
        ))}
      </div>
      <div className="text-sm font-medium text-elava-charcoal">{rating}</div>
    </div>
  );
}

function Breadcrumbs({ product }) {
  const categoryLabel = product.gender === 'men' ? 'Men' : product.gender === 'women' ? 'Women' : 'Unisex';
  const categoryPath = `/category/${product.gender}`;
  return (
    <nav className="text-[13px] text-elava-stone mb-4" aria-label="Breadcrumb">
      <Link to="/" className="hover:underline">Home</Link>
      <span className="mx-2">/</span>
      <Link to={categoryPath} className="hover:underline">{categoryLabel}</Link>
      <span className="mx-2">/</span>
      <span className="text-elava-charcoal">{product.name}</span>
    </nav>
  );
}

export default function ProductDetails() {
  const { productSlug } = useParams();
  const product = products.find((p) => p.slug === productSlug);
  const [openAbout, setOpenAbout] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const [openDelivery, setOpenDelivery] = useState(false);

  if (!product) {
    return (
      <MainContainer className="py-12">
        <h2 className="text-2xl font-semibold">Fragrance not found.</h2>
        <p className="mt-4">
          <Link to="/" className="text-elava-gold underline">Return to homepage</Link>
        </p>
      </MainContainer>
    );
  }

  const whatsappUrl = createWhatsAppOrderUrl({
    productName: `${product.name} (${product.size || '60 ML'})`,
    price: product.price
  });

  return (
    <MainContainer className="py-8">
      {/* Breadcrumb */}
      <Breadcrumbs product={product} />

      {/* Main product area */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Image (span 7 on md) */}
        <div className="md:col-span-7">
          <div className="bg-[#FBF8F3] p-8 rounded-xl flex justify-center">
            <img src={product.image} alt={product.name} className="w-full max-w-[640px] h-auto object-contain rounded-lg" />
          </div>
        </div>

        {/* Right: Details (span 5 on md) */}
        <div className="md:col-span-5">
          {product.isBestseller && (
            <div className="inline-block px-3 py-1 text-[11px] font-semibold bg-amber-100 text-amber-800 rounded-sm mb-3">BESTSELLER</div>
          )}

          <h1 className="font-serif text-3xl md:text-4xl font-medium tracking-[0.04em] uppercase text-elava-charcoal">{product.name}</h1>
          <div className="mt-2 text-sm text-elava-stone">EAU DE PARFUM · {product.gender === 'men' ? 'FOR HIM' : product.gender === 'women' ? 'FOR HER' : 'UNISEX'}</div>

          <div className="mt-4 flex items-center gap-4">
            <Stars rating={product.rating} />
            <div className="text-sm text-elava-stone">· {product.reviewCount} reviews</div>
          </div>

          <div className="mt-6">
            <div className="text-2xl font-semibold">₹{product.price.toLocaleString()}</div>
            <div className="text-sm text-elava-stone">{product.size || '60 ML'}</div>
          </div>

          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 w-full mt-6 bg-elava-gold text-[#111] font-semibold px-4 py-3 rounded-md shadow-sm">
            <MessageSquare className="w-5 h-5" />
            ORDER ON WHATSAPP
          </a>
          <div className="mt-2 text-xs text-elava-stone">We'll confirm your order and delivery details on WhatsApp.</div>

          <hr className="my-6 border-t border-[#E9E4DB]" />

          {/* Desktop: expanded sections; Mobile: accordions */}
          <div className="hidden md:block">
            <section>
              <h3 className="text-lg font-semibold">ABOUT THE SCENT</h3>
              <p className="mt-3 text-elava-charcoal text-sm">{product.description}</p>
            </section>

            <hr className="my-6 border-t border-[#E9E4DB]" />

            <section>
              <h4 className="text-sm font-semibold">FRAGRANCE NOTES</h4>
              <div className="mt-3 grid grid-cols-3 gap-4">
                <div>
                  <div className="text-xs text-elava-stone font-medium">TOP NOTES</div>
                  <div className="mt-1 text-sm">{product.notes?.top}</div>
                </div>
                <div>
                  <div className="text-xs text-elava-stone font-medium">HEART NOTES</div>
                  <div className="mt-1 text-sm">{product.notes?.heart}</div>
                </div>
                <div>
                  <div className="text-xs text-elava-stone font-medium">BASE NOTES</div>
                  <div className="mt-1 text-sm">{product.notes?.base}</div>
                </div>
              </div>
            </section>

            <hr className="my-6 border-t border-[#E9E4DB]" />

            <section>
              <h4 className="text-sm font-semibold">DELIVERY & ORDERING</h4>
              <p className="mt-2 text-sm text-elava-stone">We take orders directly on WhatsApp. Our team will confirm your delivery details and shipping information.</p>
            </section>
          </div>

          {/* Mobile accordions */}
          <div className="md:hidden mt-4 space-y-2">
            <details className="bg-[#FBF8F3] p-3 rounded-md" open={openAbout} onToggle={(e)=>setOpenAbout(e.target.open)}>
              <summary className="font-semibold">ABOUT THE SCENT</summary>
              <p className="mt-2 text-sm text-elava-charcoal">{product.description}</p>
            </details>

            <details className="bg-[#FBF8F3] p-3 rounded-md" open={openNotes} onToggle={(e)=>setOpenNotes(e.target.open)}>
              <summary className="font-semibold">FRAGRANCE NOTES</summary>
              <div className="mt-2 text-sm">
                <div className="text-xs text-elava-stone font-medium">TOP</div>
                <div className="mt-1">{product.notes?.top}</div>
                <div className="mt-2 text-xs text-elava-stone font-medium">HEART</div>
                <div className="mt-1">{product.notes?.heart}</div>
                <div className="mt-2 text-xs text-elava-stone font-medium">BASE</div>
                <div className="mt-1">{product.notes?.base}</div>
              </div>
            </details>

            <details className="bg-[#FBF8F3] p-3 rounded-md" open={openReview} onToggle={(e)=>setOpenReview(e.target.open)}>
              <summary className="font-semibold">WHAT PEOPLE SAY</summary>
              <div className="mt-2 text-sm">"A beautifully balanced signature—long lasting and refined."<div className="mt-2 text-xs text-elava-stone">Customer · City</div></div>
            </details>

            <details className="bg-[#FBF8F3] p-3 rounded-md" open={openDelivery} onToggle={(e)=>setOpenDelivery(e.target.open)}>
              <summary className="font-semibold">DELIVERY & ORDERING</summary>
              <div className="mt-2 text-sm text-elava-stone">We take orders directly on WhatsApp. Our team will confirm your delivery details and shipping information.</div>
            </details>
          </div>
        </div>
      </div>

      {/* Featured review card below main product area */}
      <div className="mt-8">
        <div className="bg-[#F3EFE7] border border-[#E5E0D9] rounded-[6px] p-5 text-elava-charcoal">
          <div className="flex items-center gap-3">
            <div className="text-elava-gold">★★★★★</div>
            <div className="text-base font-serif">"Exceptional longevity and depth. Truly feels niche and bespoke."</div>
          </div>
          <div className="mt-2 text-sm text-elava-stone">Aarav S. · Mumbai</div>
          <div className="mt-3">
            <Link to="/reviews" className="text-elava-gold underline">VIEW ALL REVIEWS →</Link>
          </div>
        </div>
      </div>
    </MainContainer>
  );
}

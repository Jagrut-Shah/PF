import React from 'react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import ContactHelpBlock from '../components/common/ContactHelpBlock';

export default function ShippingPage() {
  return (
    <div className="w-full bg-[#0F4C5C] text-[#F5F1EA] min-h-screen">
      <SEO
        title="Shipping & Delivery | ÉLAVA Perfumes"
        description="Learn how shipping and delivery works for ÉLAVA artisanal fragrances across India."
        canonicalPath="/shipping"
      />

      <MainContainer className="py-8 sm:py-10 md:py-14">
        {/* HERO */}
        <section className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal uppercase tracking-[0.06em] text-[#F5F1EA] leading-tight mb-3">
            SHIPPING & DELIVERY
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] tracking-wide font-normal leading-relaxed">
            "We keep ordering simple. ÉLAVA orders are currently handled directly through WhatsApp so our team can confirm the details with you before dispatch."
          </p>
        </section>

        {/* CONTENT CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-6">

          {/* 1. HOW ORDERING WORKS */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-4">
              HOW ORDERING WORKS
            </h2>
            <ol className="space-y-3 font-sans text-xs sm:text-sm text-[#E5E9E8] list-decimal list-inside leading-relaxed">
              <li className="pl-1"><strong className="text-[#F5F1EA]">Choose your fragrance:</strong> Browse our collection and pick your preferred Eau de Parfum.</li>
              <li className="pl-1"><strong className="text-[#F5F1EA]">Select ORDER ON WHATSAPP:</strong> Tap the order button to launch WhatsApp with product details.</li>
              <li className="pl-1"><strong className="text-[#F5F1EA]">Confirm details:</strong> Confirm your fragrance selection and desired quantity with our team.</li>
              <li className="pl-1"><strong className="text-[#F5F1EA]">Provide delivery information:</strong> Share your complete delivery address and contact details.</li>
              <li className="pl-1"><strong className="text-[#F5F1EA]">Order & shipping confirmation:</strong> Our team confirms final order details and shipping arrangements.</li>
              <li className="pl-1"><strong className="text-[#F5F1EA]">Preparation & dispatch:</strong> Your fragrance is carefully packaged and dispatched.</li>
            </ol>
          </div>

          {/* 2. DELIVERY AREAS & TIMELINES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
                DELIVERY AREAS
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
                For the initial launch, ÉLAVA is preparing to serve customers across India. Delivery availability may vary by location.
              </p>
            </div>

            <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
                DELIVERY TIMELINES
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
                Estimated delivery timelines will be confirmed at the time of ordering based on the destination and shipping method.
              </p>
            </div>
          </div>

          {/* 3. CHARGES & DISPATCH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
                SHIPPING CHARGES
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
                Applicable shipping charges will be communicated before the order is confirmed.
              </p>
            </div>

            <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
                ORDER DISPATCH
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
                Once your order is confirmed and prepared, our team will provide the relevant dispatch or tracking information where available.
              </p>
            </div>
          </div>

          {/* 4. DELIVERY ISSUES */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              DELIVERY ISSUES
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              If your package arrives visibly damaged, please contact ÉLAVA promptly and provide photographs of the package and product.
            </p>
          </div>

          {/* DEMO NOTICE */}
          <div className="p-4 bg-[#0D3B48]/80 border border-[rgba(245,241,234,0.15)] rounded-lg text-center font-sans text-xs text-[#B8C4C2]">
            <p className="italic">
              Demo policy — shipping coverage, delivery timelines, charges and tracking procedures will be finalized before launch.
            </p>
          </div>

        </div>

        {/* NEED HELP? */}
        <ContactHelpBlock />
      </MainContainer>
    </div>
  );
}

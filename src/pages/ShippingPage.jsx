import React from 'react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import ContactHelpBlock from '../components/common/ContactHelpBlock';

export default function ShippingPage() {
  return (
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-screen">
      <SEO
        title="Shipping & Delivery | ÉLAVA Perfumes"
        description="Learn how shipping and delivery works for ÉLAVA artisanal fragrances across India."
        canonicalPath="/shipping"
      />

      <MainContainer className="py-8 sm:py-10 md:py-14">
        {/* HERO */}
        <section className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h1 className="font-bodoni text-[32px] sm:text-[40px] md:text-[44px] font-medium text-[#F5F2EE] leading-[1.02] tracking-[-0.02em] mb-3">
            SHIPPING & DELIVERY
          </h1>
          <p className="font-manrope text-[16px] text-[#B8B3AF] font-normal leading-relaxed">
            We keep ordering simple. Choose your fragrances, add them to your cart, and proceed to our secure multi-step online checkout.
          </p>
        </section>

        {/* CONTENT CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-6">

          {/* 1. HOW ORDERING WORKS */}
          <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
            <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-4">
              HOW ORDERING WORKS
            </h2>
            <ol className="space-y-3 font-manrope text-[14px] text-[#B8B3AF] list-decimal list-inside leading-[1.6]">
              <li className="pl-1"><strong className="text-[#F5F2EE]">Choose your fragrance:</strong> Browse our collection and pick your preferred Eau de Parfum.</li>
              <li className="pl-1"><strong className="text-[#F5F2EE]">Click CHECKOUT →:</strong> Tap the checkout button to enter your delivery address and options.</li>
              <li className="pl-1"><strong className="text-[#F5F2EE]">Confirm details:</strong> Customize your order with optional gift boxing and a complimentary 10ml sample.</li>
              <li className="pl-1"><strong className="text-[#F5F2EE]">Complete payment:</strong> Complete your order with 256-bit encrypted online checkout.</li>
              <li className="pl-1"><strong className="text-[#F5F2EE]">Order confirmation:</strong> Receive instant order confirmation and digital tracking information.</li>
              <li className="pl-1"><strong className="text-[#F5F2EE]">Preparation & dispatch:</strong> Your fragrance is carefully packaged and dispatched.</li>
            </ol>
          </div>

          {/* 2. DELIVERY AREAS & TIMELINES GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                DELIVERY AREAS
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                For the initial launch, ÉLAVA is preparing to serve customers across India. Delivery availability may vary by location.
              </p>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                DELIVERY TIMELINES
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                Delivery timelines will be confirmed at the time of order processing based on your location.
              </p>
            </div>
          </div>

          {/* 3. CHARGES & DISPATCH */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                SHIPPING CHARGES
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                Applicable shipping charges will be communicated before the order is confirmed.
              </p>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                ORDER DISPATCH
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                Once your order is confirmed and prepared, our team will provide the relevant dispatch or tracking information where available.
              </p>
            </div>
          </div>

          {/* 4. DELIVERY ISSUES */}
          <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
            <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
              DELIVERY ISSUES
            </h2>
            <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
              If your package arrives visibly damaged, please contact ÉLAVA promptly and provide photographs of the package and product.
            </p>
          </div>

          {/* DEMO NOTICE */}
          <div className="p-4 bg-[#121212] border border-white/10 rounded-lg text-center font-manrope text-[13px] text-[#B8B3AF]">
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

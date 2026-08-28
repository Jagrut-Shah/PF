import React from 'react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import ContactHelpBlock from '../components/common/ContactHelpBlock';

export default function ReturnsPage() {
  return (
    <div className="w-full bg-[#0B0B0B] text-[#F5F2EE] min-h-screen">
      <SEO
        title="Returns & Refunds | ÉLAVA Perfumes"
        description="Review ÉLAVA policies on damaged items, return requests, order cancellations and refunds."
        canonicalPath="/returns"
      />

      <MainContainer className="py-8 sm:py-10 md:py-14">
        {/* HERO */}
        <section className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h1 className="font-bodoni text-[32px] sm:text-[40px] md:text-[44px] font-medium text-[#F5F2EE] leading-[1.02] tracking-[-0.02em] mb-3">
            RETURNS & REFUNDS
          </h1>
          <p className="font-manrope text-[16px] text-[#B8B3AF] font-normal leading-relaxed">
            We want every ÉLAVA order to arrive safely and as expected. If something isn't right with your order, please contact our team and we'll help review the situation.
          </p>
        </section>

        {/* CONTENT CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-6">

          {/* 1. DAMAGED OR INCORRECT PRODUCTS */}
          <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
            <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
              DAMAGED OR INCORRECT PRODUCTS
            </h2>
            <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
              If you receive a damaged, defective or incorrect product, contact us promptly through WhatsApp with your order details and clear photographs of the product and packaging.
            </p>
          </div>

          {/* 2. ELIGIBILITY & CANCELLATIONS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                ELIGIBILITY
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                For hygiene and product-safety reasons, opened or used fragrances may not be eligible for return.
              </p>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                CANCELLATIONS
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                If you need to cancel an order, contact us as soon as possible. Orders that have already been processed or dispatched may not be cancellable.
              </p>
            </div>
          </div>

          {/* 3. RETURN REQUESTS */}
          <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
            <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-3">
              RETURN REQUESTS
            </h2>
            <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6] mb-3">
              Contact our team through WhatsApp with:
            </p>
            <ul className="list-disc list-inside space-y-1.5 font-manrope text-[14px] text-[#B8B3AF]">
              <li>Order details</li>
              <li>Reason for the request</li>
              <li>Photographs where relevant</li>
            </ul>
            <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6] mt-3">
              We'll review the request and explain the next steps.
            </p>
          </div>

          {/* 4. REFUNDS & RETURN SHIPPING GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                REFUNDS
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                Where a refund is approved, the refund method and expected timeline will be communicated during the resolution process.
              </p>
            </div>

            <div className="bg-[#121212] border border-white/10 rounded-xl p-6 shadow-sm">
              <h2 className="font-bodoni text-[18px] font-medium text-[#F5F2EE] mb-2">
                RETURN SHIPPING
              </h2>
              <p className="font-manrope text-[15px] text-[#B8B3AF] leading-[1.6]">
                Where a return is approved, responsibility for return shipping will depend on the reason for the return and the final ÉLAVA policy.
              </p>
            </div>
          </div>

          {/* DEMO NOTICE */}
          <div className="p-4 bg-[#121212] border border-white/10 rounded-lg text-center font-manrope text-[13px] text-[#B8B3AF]">
            <p className="italic">
              Demo policy — return eligibility, timelines, shipping responsibility and refund procedures will be finalized before launch.
            </p>
          </div>

        </div>

        {/* NEED HELP? */}
        <ContactHelpBlock />
      </MainContainer>
    </div>
  );
}

import React from 'react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import ContactHelpBlock from '../components/common/ContactHelpBlock';
import DEMO_COMPANY_INFO from '../data/companyInfo';

export default function TermsPage() {
  return (
    <div className="w-full bg-[#163E49] text-[#F3EBDD] min-h-screen">
      <SEO
        title="Terms & Conditions | ÉLAVA Perfumes"
        description="Read the website terms and conditions for ÉLAVA Perfumes."
        canonicalPath="/terms"
      />

      <MainContainer className="py-8 sm:py-10 md:py-14">
        {/* HERO */}
        <section className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal uppercase tracking-[0.06em] text-[#F3EBDD] leading-tight mb-3">
            TERMS & CONDITIONS
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] tracking-wide font-normal leading-relaxed">
            Terms governing the use of the ÉLAVA website and WhatsApp ordering.
          </p>
        </section>

        {/* PROMINENT DEMO BANNER */}
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl text-center shadow-sm">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#F3EBDD]">
            DEMO TERMS — DETAILS WILL BE REVIEWED AND FINALIZED BEFORE PRODUCTION LAUNCH.
          </p>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-6">

          {/* 1. About ÉLAVA */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              1. ABOUT ÉLAVA
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              ÉLAVA Perfumes ("ÉLAVA", "we", "our") is an independent luxury fragrance brand based in Ahmedabad, Gujarat, India. This website serves as a digital brand showcase where customers can view our fragrance collection and initiate orders via WhatsApp.
            </p>
          </div>

          {/* 2. Use of the Website */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              2. USE OF THE WEBSITE
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              By accessing or browsing this website, you agree to use it only for lawful purposes and in accordance with these Terms. You must not misuse the website, attempt unauthorized access, or disrupt website operation.
            </p>
          </div>

          {/* 3. Product Information */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              3. PRODUCT INFORMATION
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              We make reasonable efforts to describe our products accurately. Product imagery, colours and presentation may vary slightly depending on display devices and photography.
            </p>
          </div>

          {/* 4. Pricing */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              4. PRICING
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              Prices displayed on the website are subject to confirmation at the time of order. Any applicable delivery charges or other compulsory charges will be communicated before order confirmation.
            </p>
          </div>

          {/* 5. Product Availability */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              5. PRODUCT AVAILABILITY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              All fragrance products are subject to stock availability. We reserve the right to discontinue or limit quantities of any fragrance at any time.
            </p>
          </div>

          {/* 6. Orders Through WhatsApp */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              6. ORDERS THROUGH WHATSAPP
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              Orders are initiated through WhatsApp. An order is not considered confirmed until ÉLAVA communicates confirmation of the order and its applicable details.
            </p>
          </div>

          {/* 7. Order Acceptance */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              7. ORDER ACCEPTANCE
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              We reserve the right to accept or decline any order for any reason, including stock limitations, address serviceability, or pricing verification.
            </p>
          </div>

          {/* 8. Payment */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              8. PAYMENT
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              Available payment methods and payment instructions will be confirmed with the customer before the order is finalized.
            </p>
          </div>

          {/* 9. Delivery */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              9. DELIVERY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              Delivery timelines and logistics details will be confirmed upon order placement. ÉLAVA is not liable for delay caused by unforeseen courier disruptions or inaccurate address details provided by the customer.
            </p>
          </div>

          {/* 10. Returns & Refunds */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              10. RETURNS & REFUNDS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              Return eligibility and refund procedures are governed by our Returns & Refunds Policy. Opened or used perfumes may not be returned due to hygiene standards.
            </p>
          </div>

          {/* 11. Cancellations */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              11. CANCELLATIONS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              Cancellation requests must be communicated immediately via WhatsApp. Orders dispatched prior to cancellation notification cannot be cancelled.
            </p>
          </div>

          {/* 12. Intellectual Property */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              12. INTELLECTUAL PROPERTY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              All branding, logos, graphics, imagery, design tokens, and text content on this website are the intellectual property of ÉLAVA Perfumes. Unauthorized reproduction or commercial use is prohibited.
            </p>
          </div>

          {/* 13. Website Accuracy */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              13. WEBSITE ACCURACY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              While we strive to ensure all website information is accurate, occasional typographical errors or omissions may occur. We reserve the right to correct errors without prior notice.
            </p>
          </div>

          {/* 14. Limitation of Liability */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              14. LIMITATION OF LIABILITY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              To the maximum extent permitted by applicable law, ÉLAVA Perfumes shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or products.
            </p>
          </div>

          {/* 15. Changes to These Terms */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              15. CHANGES TO THESE TERMS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              We reserve the right to modify these Terms & Conditions at any time. Continued use of the website following changes constitutes acceptance of the updated terms.
            </p>
          </div>

          {/* 16. Governing Law */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              16. GOVERNING LAW
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed">
              These terms are intended for a business operating in India and will be subject to applicable laws of India. The final governing-law and jurisdiction wording will be reviewed before launch.
            </p>
          </div>

          {/* 17. Contact */}
          <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F3EBDD] mb-2">
              17. CONTACT
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed mb-2">
              For questions regarding these Terms & Conditions, please reach out to:
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#F3EBDD] font-semibold">
              Customer Support: <a href={`mailto:${DEMO_COMPANY_INFO.supportEmail}`} className="underline hover:text-[#C5A15A]">{DEMO_COMPANY_INFO.supportEmail}</a> <span className="text-xs text-[#C8C1B5] font-normal">(DEMO)</span>
            </p>
          </div>

        </div>

        {/* NEED HELP? */}
        <ContactHelpBlock />
      </MainContainer>
    </div>
  );
}

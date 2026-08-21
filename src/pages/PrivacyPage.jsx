import React from 'react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import ContactHelpBlock from '../components/common/ContactHelpBlock';
import DEMO_COMPANY_INFO from '../data/companyInfo';

export default function PrivacyPage() {
  return (
    <div className="w-full bg-[#0F4C5C] text-[#F5F1EA] min-h-screen">
      <SEO
        title="Privacy Policy | ÉLAVA Perfumes"
        description="Read the privacy policy for ÉLAVA Perfumes detailing how order information is handled."
        canonicalPath="/privacy"
      />

      <MainContainer className="py-8 sm:py-10 md:py-14">
        {/* HERO */}
        <section className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal uppercase tracking-[0.06em] text-[#F5F1EA] leading-tight mb-3">
            PRIVACY POLICY
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#B8C4C2] tracking-wide font-normal leading-relaxed">
            How ÉLAVA handles customer information during ordering and customer support.
          </p>
        </section>

        {/* PROMINENT DEMO BANNER */}
        <div className="max-w-3xl mx-auto mb-8 p-4 bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl text-center shadow-sm">
          <p className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-[#F5F1EA]">
            DEMO POLICY — PRIVACY DETAILS WILL BE REVIEWED AND FINALIZED BEFORE PRODUCTION LAUNCH.
          </p>
        </div>

        {/* CONTENT CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Intro Overview */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              ÉLAVA Perfumes ("ÉLAVA", "we", "our") respects your privacy. This Privacy Policy outlines how we collect, use, and protect your information when you browse our website or place an order with us. Our current website operates on a direct WhatsApp ordering model: you select a fragrance on our website, which opens a conversation in WhatsApp where order and delivery details are confirmed.
            </p>
          </div>

          {/* Section 1: Information We Collect */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-3">
              1. INFORMATION WE COLLECT
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed mb-3">
              When you initiate an order or contact us through WhatsApp, we may collect the information you voluntarily provide, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 font-sans text-xs sm:text-sm text-[#E5E9E8]">
              <li>Name and contact details</li>
              <li>Phone number (associated with WhatsApp)</li>
              <li>Delivery address and pincode</li>
              <li>Fragrance selection and order quantity</li>
              <li>Communication history and customer support messages with ÉLAVA</li>
            </ul>
          </div>

          {/* Section 2: How We Use Information */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-3">
              2. HOW WE USE INFORMATION
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed mb-3">
              We use the collected information for specific operational purposes, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 font-sans text-xs sm:text-sm text-[#E5E9E8]">
              <li>Processing and confirming your order</li>
              <li>Communicating about order status, dispatch, and delivery</li>
              <li>Arranging shipping and logistics</li>
              <li>Responding to customer care inquiries</li>
              <li>Maintaining business and record-keeping obligations</li>
              <li>Improving our products and service experience</li>
            </ul>
          </div>

          {/* Section 3: WhatsApp Communications */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              3. WHATSAPP COMMUNICATIONS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              Orders and customer support conversations occur directly via WhatsApp (operated by Meta Platforms, Inc.). Messages and data shared in WhatsApp are subject to WhatsApp's own Terms of Service and Privacy Policy in addition to our handling practices.
            </p>
          </div>

          {/* Section 4: Sharing Information */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              4. SHARING INFORMATION
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed mb-2">
              ÉLAVA does not sell, rent, or trade your personal information to third parties.
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              Information may be shared only with relevant service providers where strictly necessary to fulfill your order, such as delivery courier partners or communication infrastructure providers.
            </p>
          </div>

          {/* Section 5: Data Retention */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              5. DATA RETENTION
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              ÉLAVA retains personal information only for as long as reasonably necessary for the purposes for which it was collected, including order fulfilment, customer support and applicable record-keeping requirements.
            </p>
          </div>

          {/* Section 6: Data Security */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              6. DATA SECURITY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              We employ reasonable technical and operational measures to protect your personal information against unauthorized access, loss, or misuse.
            </p>
          </div>

          {/* Section 7: Your Choices and Rights */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              7. YOUR CHOICES AND RIGHTS
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              You may contact us at any time to request updates, corrections, or inquiries regarding personal information provided during your order.
            </p>
          </div>

          {/* Section 8: Third-Party Services */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              8. THIRD-PARTY SERVICES
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              Our website contains links to external platforms like WhatsApp and Instagram. We are not responsible for the privacy practices of external third-party sites or applications.
            </p>
          </div>

          {/* Section 9: Children's Privacy */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              9. CHILDREN'S PRIVACY
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              Our website and luxury fragrances are intended for an adult audience and are not directed towards children.
            </p>
          </div>

          {/* Section 10: Policy Updates */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              10. POLICY UPDATES
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed">
              We may update this Privacy Policy periodically. Any revisions will be posted on this page with an updated policy version date prior to commercial launch.
            </p>
          </div>

          {/* Section 11: Contact Us */}
          <div className="bg-[#0D3B48] border border-[rgba(245,241,234,0.15)] rounded-xl p-6 shadow-sm">
            <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA] mb-2">
              11. CONTACT US
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#E5E9E8] leading-relaxed mb-2">
              For privacy-related questions or requests, contact:
            </p>
            <p className="font-sans text-xs sm:text-sm text-[#F5F1EA] font-semibold">
              Privacy Email: <a href={`mailto:${DEMO_COMPANY_INFO.privacyEmail}`} className="underline hover:text-white">{DEMO_COMPANY_INFO.privacyEmail}</a> <span className="text-xs text-[#B8C4C2] font-normal">(DEMO)</span>
            </p>
          </div>

        </div>

        {/* NEED HELP? */}
        <ContactHelpBlock />
      </MainContainer>
    </div>
  );
}

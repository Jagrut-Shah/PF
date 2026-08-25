import React from 'react';
import { WHATSAPP_CONFIG } from '../../utils/whatsapp';
import DEMO_COMPANY_INFO from '../../data/companyInfo';

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="#25D366" className="w-4 h-4 shrink-0 fill-[#25D366] text-[#25D366]" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
  </svg>
);

export default function ContactHelpBlock() {
  const waUrl = `https://wa.me/${WHATSAPP_CONFIG.phoneNumber}?text=${encodeURIComponent('Hi ÉLAVA, I have a question regarding my order / product.')}`;

  return (
    <section className="mt-12 pt-10 border-t border-[rgba(243,235,221,0.15)] text-center max-w-xl mx-auto">
      <h2 className="font-serif text-2xl sm:text-3xl font-normal uppercase tracking-[0.06em] text-[#F3EBDD] mb-2">
        NEED HELP?
      </h2>
      <p className="font-sans text-xs sm:text-sm text-[#C8C1B5] leading-relaxed mb-6">
        Questions about an order, delivery or product? Contact our team through WhatsApp.
      </p>

      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#151515] text-white px-6 py-3 rounded text-xs font-bold uppercase tracking-[0.16em] transition-colors shadow-sm"
      >
        <WhatsAppIcon />
        <span>CONTACT ON WHATSAPP</span>
      </a>

      {/* Demo Contact Details */}
      <div className="mt-8 p-4 bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-xl text-left font-sans text-xs text-[#F3EBDD] space-y-1 shadow-sm">
        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-[#F3EBDD] tracking-wider mb-1">
          <span>{DEMO_COMPANY_INFO.brandName}</span>
          <span className="bg-[#163E49] text-[#C8C1B5] px-1.5 py-0.5 rounded border border-[rgba(243,235,221,0.15)]">DEMO CONTACT</span>
        </div>
        <p>Customer Care: <a href={`mailto:${DEMO_COMPANY_INFO.supportEmail}`} className="underline text-[#F3EBDD] hover:text-white">{DEMO_COMPANY_INFO.supportEmail}</a> <span className="text-[10px] text-[#C8C1B5]">(DEMO)</span></p>
        <p className="text-[#C8C1B5]">Support Hours: {DEMO_COMPANY_INFO.customerCareHours}</p>
      </div>
    </section>
  );
}

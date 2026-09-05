import React from 'react';
import { ShieldCheck, Truck, CreditCard } from 'lucide-react';
import MainContainer from '../ui/MainContainer';
import { useScrollReveal } from '../../hooks/useScrollReveal';

function WhatsAppIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23-1.48 0-2.93-.39-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm-3.53 3.63c-.19 0-.42.07-.64.31-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.57 4.07 3.6 2 .86 2.41.69 2.84.65.43-.04 1.4-.57 1.6-1.13.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28s-1.4-.69-1.62-.77c-.22-.08-.38-.12-.54.12s-.62.77-.76.93c-.14.16-.28.18-.52.06s-1.01-.37-1.92-1.19c-.71-.63-1.19-1.41-1.33-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.19-.48-.39-.41-.54-.42-.14-.01-.3-.01-.46-.01z" />
    </svg>
  );
}

/**
 * TrustStrip Component:
 * Section: Blue #2563EB, Inner Panel: Black #1A1412, Text: Cream #F4EBDD.
 */
export default function TrustStrip() {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section className="py-5 bg-[#0000FF] text-[#F4EBDD]">
      <MainContainer>
        <div
          ref={ref}
          className={`bg-[#1A1412] border border-[#3D2E2A] rounded-xl p-3.5 sm:p-4 md:p-5 shadow-xl text-[#F4EBDD] reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 divide-y md:divide-y-0 md:divide-x divide-[#3D2E2A]">

            {/* 1. Secure Payments */}
            <div className="flex items-center gap-2.5 pt-2 md:pt-0 md:pl-2 first:pt-0 first:pl-0">
              <div className="w-8 h-8 rounded-lg bg-[#0000FF] border border-[#0000CD] flex items-center justify-center shrink-0 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#F4EBDD]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-manrope text-[13px] font-semibold tracking-wide text-[#F4EBDD]">
                  Secure Payments
                </h4>
                <p className="font-manrope text-[11px] sm:text-[12px] text-[#D9C9B8]/80 truncate font-normal">
                  UPI, Cards & Net Banking
                </p>
              </div>
            </div>

            {/* 2. COD Available */}
            <div className="flex items-center gap-2.5 pt-2 md:pt-0 md:pl-4 first:pt-0">
              <div className="w-8 h-8 rounded-lg bg-[#0000FF] border border-[#0000CD] flex items-center justify-center shrink-0 shadow-xs">
                <CreditCard className="w-4 h-4 text-[#F4EBDD]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-manrope text-[13px] font-semibold tracking-wide text-[#F4EBDD]">
                  COD Available
                </h4>
                <p className="font-manrope text-[11px] sm:text-[12px] text-[#D9C9B8]/80 truncate font-normal">
                  Pay cash on delivery
                </p>
              </div>
            </div>

            {/* 3. Tracked Delivery */}
            <div className="flex items-center gap-2.5 pt-2 md:pt-0 md:pl-4">
              <div className="w-8 h-8 rounded-lg bg-[#0000FF] border border-[#0000CD] flex items-center justify-center shrink-0 shadow-xs">
                <Truck className="w-4 h-4 text-[#F4EBDD]" />
              </div>
              <div className="min-w-0">
                <h4 className="font-manrope text-[13px] font-semibold tracking-wide text-[#F4EBDD]">
                  Tracked Delivery
                </h4>
                <p className="font-manrope text-[11px] sm:text-[12px] text-[#D9C9B8]/80 truncate font-normal">
                  Dispatched across India
                </p>
              </div>
            </div>

            {/* 4. Customer Support */}
            <div className="flex items-center gap-2.5 pt-2 md:pt-0 md:pl-4">
              <div className="w-8 h-8 rounded-lg bg-[#0000FF] border border-[#0000CD] flex items-center justify-center shrink-0 shadow-xs">
                <WhatsAppIcon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="font-manrope text-[13px] font-semibold tracking-wide text-[#F4EBDD]">
                  Customer Support
                </h4>
                <p className="font-manrope text-[11px] sm:text-[12px] text-[#D9C9B8]/80 truncate font-normal">
                  Direct help via WhatsApp
                </p>
              </div>
            </div>

          </div>
        </div>
      </MainContainer>
    </section>
  );
}

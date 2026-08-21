import React from 'react';
import { ShieldCheck, Truck, MessageCircle, CreditCard } from 'lucide-react';
import MainContainer from '../ui/MainContainer';

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: 'Secure Payments',
    subtitle: 'UPI, Cards & Net Banking'
  },
  {
    icon: CreditCard,
    title: 'COD Available',
    subtitle: 'Pay cash on delivery'
  },
  {
    icon: Truck,
    title: 'Tracked Delivery',
    subtitle: 'Dispatched across India'
  },
  {
    icon: MessageCircle,
    title: 'Customer Support',
    subtitle: 'Direct help via WhatsApp'
  }
];

export default function TrustStrip() {
  return (
    <section className="bg-[#102F38] border-b border-[rgba(243,235,221,0.12)] py-5 text-[#F3EBDD]">
      <MainContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {TRUST_ITEMS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 p-2">
                <div className="w-9 h-9 rounded-lg bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] flex items-center justify-center shrink-0">
                  <IconComponent className="w-4 h-4 text-[#C5A15A]" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-sans text-xs font-semibold tracking-wide text-[#F3EBDD] uppercase">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[11px] text-[#C8C1B5] truncate">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </MainContainer>
    </section>
  );
}

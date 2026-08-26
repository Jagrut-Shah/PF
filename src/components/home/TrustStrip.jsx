import React from 'react';
import MainContainer from '../ui/MainContainer';
import { ShieldCheck, Truck, Clock, Sparkles } from 'lucide-react';

const TRUST_ITEMS = [
  {
    icon: Clock,
    title: 'LONG LASTING 12H+',
    description: 'High Eau de Parfum concentration formulated to endure tropical humidity.',
  },
  {
    icon: ShieldCheck,
    title: 'IFRA CERTIFIED',
    description: 'Compliant with international fragrance safety and skin-dermatology standards.',
  },
  {
    icon: Truck,
    title: 'FREE EXPRESS SHIPPING',
    description: 'Dispatched within 24 hours across India with real-time tracking.',
  },
  {
    icon: Sparkles,
    title: 'ARTISANAL FORMULATION',
    description: 'Handcrafted signature blends combining rare woods, florals, and warm amber.',
  },
];

export default function TrustStrip() {
  return (
    <section className="py-8 sm:py-12 bg-[#FBF8F3] text-[#08111F] border-b border-[#08111F]/10">
      <MainContainer>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-2 p-2">
                <div className="w-10 h-10 rounded-full bg-[#285BE6]/10 border border-[#285BE6]/20 flex items-center justify-center text-[#285BE6]">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-xs sm:text-sm font-bold uppercase tracking-wider text-[#08111F]">
                  {item.title}
                </h3>
                <p className="font-sans text-[11px] text-[#111A27]/75 leading-relaxed max-w-xs">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </MainContainer>
    </section>
  );
}

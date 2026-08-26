import React from 'react';
import { X, Check, Sparkles } from 'lucide-react';

const AVAILABLE_SAMPLES = [
  {
    id: 'sample-noir',
    name: 'ÉLAVA NOIR',
    family: 'Woody Amber & Spiced Vanilla',
    description: 'Deep, sensual notes of smoked vanilla, rich amber, and velvet cedarwood.',
    image: '/images/products/noir.jpg',
  },
  {
    id: 'sample-lumina',
    name: 'ÉLAVA LUMINA',
    family: 'Sparkling Citrus & White Floral',
    description: 'Bright bergamot layered with jasmine sambac and radiant white musk.',
    image: '/images/products/lumina.jpg',
  },
  {
    id: 'sample-aura',
    name: 'ÉLAVA AURA',
    family: 'Velvet Rose & Smoked Oud',
    description: 'Opulent Damask rose infused with rare Cambodian oud and warm saffron.',
    image: '/images/products/aura.jpg',
  },
  {
    id: 'sample-soleil',
    name: 'ÉLAVA SOLEIL',
    family: 'Golden Bergamot & Sea Salt',
    description: 'Sun-drenched Mediterranean citrus paired with crisp oceanic sea breeze.',
    image: '/images/products/soleil.jpg',
  },
  {
    id: 'sample-elan',
    name: 'ÉLAVA ÉLAN',
    family: 'Fresh Vetiver & Cedarwood',
    description: 'Refined Haitian vetiver wrapped in dry cedarwood and green cardamom.',
    image: '/images/products/elan.jpg',
  },
  {
    id: 'sample-vesper',
    name: 'ÉLAVA VESPER',
    family: 'Midnight Patchouli & Wild Fig',
    description: 'Mysterious dark patchouli balanced with luscious black fig and sandalwood.',
    image: '/images/products/vesper.jpg',
  },
];

export default function FreeSampleModal({ isOpen, onClose, selectedSample, onSelectSample }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#163E49] border border-[rgba(243,235,221,0.2)] rounded-3xl p-6 shadow-2xl w-full max-w-xl text-[#F5F1EA] max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[rgba(243,235,221,0.12)] pb-4 shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C5A15A]" />
              <h3 className="font-serif text-xl font-bold uppercase text-[#F5F1EA]">
                CHOOSE YOUR FREE 10ML SAMPLE
              </h3>
            </div>
            <p className="text-xs text-[#B8C4C2]">
              Complimentary 10ML Eau de Parfum spray included with your order.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#B8C4C2] hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sample List */}
        <div className="py-4 space-y-3 overflow-y-auto flex-1 pr-1">
          {AVAILABLE_SAMPLES.map((sample) => {
            const isSelected = selectedSample?.id === sample.id;
            return (
              <div
                key={sample.id}
                onClick={() => onSelectSample(sample)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  isSelected
                    ? 'bg-[#1C4A55] border-[#C5A15A] shadow-md'
                    : 'bg-[#102F38] border-[rgba(243,235,221,0.12)] hover:border-[rgba(243,235,221,0.25)]'
                }`}
              >
                <img
                  src={sample.image}
                  alt={sample.name}
                  className="w-14 h-14 object-cover rounded-xl border border-[rgba(243,235,221,0.15)] shrink-0"
                  onError={(e) => {
                    e.currentTarget.src = '/images/products/noir.jpg';
                  }}
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-serif text-sm font-bold text-[#F5F1EA] uppercase">{sample.name}</h4>
                    <span className="text-[10px] font-bold text-[#C5A15A] uppercase tracking-wider">FREE 10ML · ₹0</span>
                  </div>
                  <p className="text-[10px] text-[#C5A15A] font-medium tracking-wide uppercase">{sample.family}</p>
                  <p className="text-[11px] text-[#B8C4C2] leading-snug line-clamp-2">{sample.description}</p>
                </div>
                <div className="shrink-0 pl-2">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-[#C5A15A] border-[#C5A15A] text-[#102F38]' : 'border-[rgba(243,235,221,0.25)] text-transparent'
                  }`}>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-[rgba(243,235,221,0.12)] shrink-0">
          <button
            onClick={onClose}
            disabled={!selectedSample}
            className="w-full bg-[#C5A15A] hover:bg-[#D4B26B] text-[#102F38] py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {selectedSample ? `ADD ${selectedSample.name} SAMPLE →` : 'SELECT A FREE SAMPLE'}
          </button>
        </div>

      </div>
    </div>
  );
}

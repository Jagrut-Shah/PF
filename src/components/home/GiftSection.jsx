import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import { Gift, ArrowRight, Sparkles } from 'lucide-react';

export default function GiftSection() {
  const navigate = useNavigate();
  const [selectedRecipient, setSelectedRecipient] = useState('For Him');
  const [selectedOccasion, setSelectedOccasion] = useState('Birthday');

  const recipients = [
    { label: 'For Him', path: '/category/men?gift=true' },
    { label: 'For Her', path: '/category/women?gift=true' },
    { label: 'For Couples', path: '/category/unisex?gift=true' },
  ];

  const occasions = [
    { label: 'Birthday', tag: 'birthday' },
    { label: 'Anniversary', tag: 'anniversary' },
    { label: 'Wedding', tag: 'wedding' },
  ];

  const handleExploreGifts = () => {
    let category = 'all';
    if (selectedRecipient === 'For Him') category = 'men';
    if (selectedRecipient === 'For Her') category = 'women';
    if (selectedRecipient === 'For Couples') category = 'unisex';
    
    navigate(`/category/${category}?gift=true&occasion=${selectedOccasion.toLowerCase()}`);
  };

  return (
    <section className="py-10 sm:py-14 bg-[#102F38] text-[#F5F1EA] border-t border-b border-[rgba(243,235,221,0.12)]">
      <MainContainer>
        <div className="bg-[#1C4A55] border border-[rgba(243,235,221,0.15)] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xl relative overflow-hidden">
          
          {/* Subtle Background Glow */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#7A2929]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content (Text & Controls) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#102F38] border border-[rgba(243,235,221,0.15)] text-[#B8C4C2] text-xs font-bold uppercase tracking-wider">
                <Gift className="w-3.5 h-3.5 text-[#B8C4C2]" />
                <span>CURATED GIFTING</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-sans text-2xl sm:text-3xl lg:text-4xl font-bold uppercase tracking-tight text-[#F5F1EA] leading-tight">
                  FIND THE PERFECT GIFT
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#B8C4C2] mt-2">
                  Give them a scent they'll remember.
                </p>
              </div>

              {/* Discovery Group 1: WHO ARE YOU GIFTING? */}
              <div className="space-y-2">
                <div className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5F1EA]/90 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B8C4C2]" />
                  <span>WHO ARE YOU GIFTING?</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {recipients.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSelectedRecipient(item.label)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedRecipient === item.label
                          ? 'bg-[#102F38] text-[#F5F1EA] border-[#F5F1EA] shadow-sm'
                          : 'bg-[#102F38]/40 text-[#B8C4C2] border-[rgba(243,235,221,0.15)] hover:border-[#F5F1EA]/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discovery Group 2: WHAT'S THE OCCASION? */}
              <div className="space-y-2">
                <div className="font-sans text-[11px] font-bold uppercase tracking-[0.16em] text-[#F5F1EA]/90 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#B8C4C2]" />
                  <span>WHAT'S THE OCCASION?</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {occasions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSelectedOccasion(item.label)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                        selectedOccasion === item.label
                          ? 'bg-[#102F38] text-[#F5F1EA] border-[#F5F1EA] shadow-sm'
                          : 'bg-[#102F38]/40 text-[#B8C4C2] border-[rgba(243,235,221,0.15)] hover:border-[#F5F1EA]/50'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleExploreGifts}
                  className="bg-[#000000] hover:bg-[#151515] text-[#F5F1EA] border border-[rgba(243,235,221,0.25)] px-6 py-3 rounded-lg font-bold text-xs sm:text-sm uppercase tracking-[0.16em] inline-flex items-center gap-2 transition-all duration-200 shadow-md hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                  id="explore-gifts-btn"
                >
                  <span>EXPLORE GIFTS</span>
                  <ArrowRight className="w-4 h-4 text-[#F5F1EA]" />
                </button>
              </div>

            </div>

            {/* Right Column: Lifestyle Gifting Image */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-[rgba(243,235,221,0.2)] shadow-lg bg-[#102F38] group">
                <img
                  src="/images/gifting-lifestyle.jpg"
                  alt="ÉLAVA luxury fragrance gift box"
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    // Fallback to product image if gifting image doesn't exist
                    e.currentTarget.src = "/images/products/noir.jpg";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#102F38] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="font-sans text-xs font-bold uppercase tracking-widest text-[#F5F1EA]">
                    SIGNATURE GIFT BOXING
                  </div>
                  <div className="font-sans text-[11px] text-[#B8C4C2] mt-0.5">
                    Optional gift box & handwritten card message available
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}

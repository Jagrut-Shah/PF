import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <section className="py-10 sm:py-14 bg-[#EEE8DD] text-[#201C19] border-t border-b border-[#D9D1C6]">
      <MainContainer>
        <div className="bg-[#F6F2EA] border border-[#D9D1C6] rounded-2xl p-6 sm:p-8 lg:p-10 shadow-xs relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content (Text & Controls) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEE8DD] border border-[#D9D1C6] text-[#0000FF] text-[12px] font-manrope font-semibold uppercase tracking-[0.09em]">
                <Gift className="w-3.5 h-3.5 text-[#0000FF]" />
                <span>CURATED GIFTING</span>
              </div>

              {/* Title & Subtitle */}
              <div>
                <h2 className="font-bodoni text-[26px] sm:text-[32px] lg:text-[38px] font-medium text-[#201C19] leading-[1.05] tracking-[-0.015em]">
                  Find The Perfect Gift
                </h2>
                <p className="font-manrope text-[15px] sm:text-[17px] text-[#625C55] mt-2 font-medium">
                  Give them a scent they'll remember.
                </p>
              </div>

              {/* Discovery Group 1: WHO ARE YOU GIFTING? */}
              <div className="space-y-2">
                <div className="font-manrope text-[12px] font-semibold uppercase tracking-[0.09em] text-[#625C55] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0000FF]" />
                  <span>WHO ARE YOU GIFTING?</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {recipients.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSelectedRecipient(item.label)}
                      className={`px-4 py-2 rounded-xl text-[14px] font-manrope font-semibold transition-all cursor-pointer ${
                        selectedRecipient === item.label
                          ? 'bg-[#0000FF] text-[#F6F2EA] border border-[#0000FF] shadow-xs'
                          : 'bg-[#EEE8DD] text-[#201C19] border border-[#D9D1C6] hover:border-[#0000FF]/40'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Discovery Group 2: WHAT'S THE OCCASION? */}
              <div className="space-y-2">
                <div className="font-manrope text-[12px] font-semibold uppercase tracking-[0.09em] text-[#625C55] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0000FF]" />
                  <span>WHAT'S THE OCCASION?</span>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {occasions.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setSelectedOccasion(item.label)}
                      className={`px-4 py-2 rounded-xl text-[14px] font-manrope font-semibold transition-all cursor-pointer ${
                        selectedOccasion === item.label
                          ? 'bg-[#0000FF] text-[#F6F2EA] border border-[#0000FF] shadow-xs'
                          : 'bg-[#EEE8DD] text-[#201C19] border border-[#D9D1C6] hover:border-[#0000FF]/40'
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
                  className="bg-[#0000FF] hover:bg-[#0000CD] text-[#F6F2EA] border border-[#0000FF] px-7 py-3.5 rounded-xl font-manrope font-semibold text-[14px] sm:text-[15px] inline-flex items-center gap-2 transition-all duration-200 shadow-sm active:scale-[0.99] cursor-pointer"
                  id="explore-gifts-btn"
                >
                  <span>Explore Gifts</span>
                  <ArrowRight className="w-4 h-4 text-[#F6F2EA]" />
                </button>
              </div>

            </div>

            {/* Right Column: Lifestyle Gifting Image */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-sm rounded-xl overflow-hidden border border-[#D9D1C6] shadow-xs bg-[#EEE8DD] group">
                <img
                  src="/images/gifting-lifestyle.jpg"
                  alt="ÉLAVA luxury fragrance gift box"
                  className="w-full h-64 sm:h-72 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = "/images/products/row-1-column-1.png";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#201C19]/80 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <div className="font-manrope text-[12px] font-semibold uppercase tracking-[0.09em] text-[#F6F2EA]">
                    SIGNATURE GIFT BOXING
                  </div>
                  <div className="font-manrope text-[13px] text-[#E5DCCF] mt-0.5 font-normal">
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

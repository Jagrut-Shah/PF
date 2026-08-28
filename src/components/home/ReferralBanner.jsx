import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, Share2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ReferralBanner Component — Light Luxury Brand Loyalty Experience:
 * Warm Champagne #E5DCCF section environment, Cream #EEE8DD inner container,
 * Deep Espresso #201C19 typography, and restrained Deep Burgundy #721C24 accents.
 */
export default function ReferralBanner() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [ref, isVisible] = useScrollReveal();

  const handleStartEarning = () => {
    if (user) {
      navigate('/account/refer-and-earn');
    } else {
      navigate('/login?redirect=/account/refer-and-earn');
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-[#E5DCCF] text-[#201C19] border-t border-b border-[#D9D1C6] relative overflow-hidden">
      {/* Subtle Champagne Ambient Light Zone */}
      <div className="absolute inset-0 bg-ambient-referral pointer-events-none" />

      <MainContainer className="relative z-10">
        <div
          ref={ref}
          className={`bg-[#EEE8DD] border border-[#D9D1C6] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-[0_12px_36px_rgba(60,45,30,0.06)] relative z-10 overflow-hidden reveal-init ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F6F2EA] border border-[#D9D1C6] text-[#721C24] text-[12px] font-manrope font-semibold uppercase tracking-[0.09em] shadow-xs">
                <Gift className="w-3.5 h-3.5 text-[#721C24]" />
                <span>ÉLAVA Patron Rewards</span>
              </div>

              {/* Major Statement */}
              <div className="space-y-3">
                <h2 className="font-bodoni text-[32px] sm:text-[44px] lg:text-[52px] font-medium text-[#201C19] leading-[1.02] tracking-[-0.02em]">
                  Share Élava.<br />
                  <span className="text-[#201C19] font-medium">
                    Earn ₹100 Cash.
                  </span>
                </h2>
                <p className="font-manrope text-[15px] sm:text-[17px] text-[#625C55] max-w-xl leading-[1.6] font-normal">
                  Your friends get <strong className="text-[#201C19] font-semibold">₹200 OFF</strong>. You get <strong className="text-[#201C19] font-semibold">₹100 CASH</strong> when their qualifying order is completed.
                </p>
              </div>

              {/* 3 Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Step 01 */}
                <div
                  className={`bg-[#F6F2EA] border border-[#D9D1C6] rounded-2xl p-4 space-y-1 shadow-xs transition-transform duration-200 hover:-translate-y-0.5 reveal-init ${
                    isVisible ? 'reveal-visible stagger-1' : ''
                  }`}
                >
                  <span className="text-[12px] font-bodoni font-medium text-[#721C24] block">
                    01
                  </span>
                  <div className="font-manrope text-[15px] font-semibold text-[#201C19]">
                    Share Your Link
                  </div>
                  <p className="text-[14px] font-manrope text-[#625C55] font-normal">Send code to your friends</p>
                </div>

                {/* Step 02 */}
                <div
                  className={`bg-[#F6F2EA] border border-[#D9D1C6] rounded-2xl p-4 space-y-1 shadow-xs transition-transform duration-200 hover:-translate-y-0.5 reveal-init ${
                    isVisible ? 'reveal-visible stagger-2' : ''
                  }`}
                >
                  <span className="text-[12px] font-bodoni font-medium text-[#721C24] block">
                    02
                  </span>
                  <div className="font-manrope text-[15px] font-semibold text-[#201C19]">
                    Friend Gets ₹200 Off
                  </div>
                  <p className="text-[14px] font-manrope text-[#625C55] font-normal">Applied on first purchase</p>
                </div>

                {/* Step 03 */}
                <div
                  className={`bg-[#F6F2EA] border border-[#721C24]/30 rounded-2xl p-4 space-y-1 shadow-xs transition-transform duration-200 hover:-translate-y-0.5 relative overflow-hidden reveal-init ${
                    isVisible ? 'reveal-visible stagger-3' : ''
                  }`}
                >
                  <span className="text-[12px] font-bodoni font-medium text-[#721C24] block">
                    03 · HERO EARNING
                  </span>
                  <div className="font-manrope text-[16px] font-semibold text-[#201C19]">
                    You Earn ₹100 Cash
                  </div>
                  <p className="text-[14px] font-manrope text-[#625C55] font-normal">Withdrawable to UPI/Bank</p>
                </div>

              </div>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#721C24] hover:bg-[#5A161C] active:scale-[0.98] text-[#F6F2EA] px-8 py-4 rounded-xl font-manrope font-semibold text-[15px] sm:text-[16px] tracking-[0.01em] inline-flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer btn-interactive"
                  id="start-earning-homepage-btn"
                >
                  <span>Start Earning →</span>
                </button>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm bg-[#F6F2EA] border border-[#D9D1C6] rounded-2xl p-6 shadow-[0_8px_24px_rgba(60,45,30,0.06)] space-y-4 text-center relative overflow-hidden text-[#201C19] transition-transform duration-300 hover:scale-[1.015]">
                <div className="w-16 h-16 rounded-full bg-[#E5DCCF] border border-[#D9D1C6] flex items-center justify-center mx-auto text-[#721C24] shadow-xs">
                  <Share2 className="w-7 h-7 text-[#721C24]" />
                </div>
                <div className="space-y-1">
                  <div className="text-[12px] font-manrope font-semibold uppercase tracking-[0.09em] text-[#625C55]">
                    Your Cash Reward
                  </div>
                  <h3 className="font-bodoni text-[36px] font-medium text-[#201C19]">
                    ₹100 Cash
                  </h3>
                  <p className="text-[14px] font-manrope text-[#625C55] leading-[1.5] px-2 font-normal">
                    Direct payout to your UPI ID or Bank account upon qualifying friend purchase.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#D9D1C6] flex items-center justify-between text-[14px] font-manrope font-semibold text-[#625C55]">
                  <span>Friend: ₹200 OFF</span>
                  <span className="text-[#721C24]">You: ₹100 CASH</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}

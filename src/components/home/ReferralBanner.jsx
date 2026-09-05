import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, Share2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ReferralBanner — DEEP BLUE brand moment.
 * #1D4ED8 section bg. Rich Warm Sand Cream #DAC29F typography & buttons.
 * Feels like luxury membership — NOT a discount banner.
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
    <section
      className="py-10 sm:py-14 text-[#DAC29F] border-t border-b border-[#0000CD] relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #0000CD 0%, #0000B8 50%, #0000CD 100%)' }}
    >
      <div className="absolute inset-0 bg-ambient-referral pointer-events-none opacity-30" />

      <MainContainer className="relative z-10">
        <div
          ref={ref}
          className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DAC29F]/15 border border-[#DAC29F]/25">
                <Gift className="w-3 h-3 text-[#DAC29F]/80" />
                <span className="font-manrope text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.09em] text-[#DAC29F]/90">
                  ÉLAVA Patron Rewards
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h2 className="font-bodoni text-[28px] sm:text-[38px] lg:text-[44px] font-medium text-[#DAC29F] leading-[1.02] tracking-[-0.02em]">
                  Share Élava.<br />
                  <span className="text-[#DAC29F]/85 font-medium">Earn ₹100 Cash.</span>
                </h2>
                <p className="font-manrope text-[13px] sm:text-[15px] text-[#DAC29F]/75 max-w-xl leading-[1.6] font-normal">
                  Your friends get <strong className="text-[#DAC29F] font-semibold">₹200 OFF</strong>. You get <strong className="text-[#DAC29F] font-semibold">₹100 CASH</strong> when their qualifying order completes.
                </p>
              </div>

              {/* Steps — Rich Warm Sand Cream cards on Deep Cherry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                <div className={`bg-[#DAC29F]/15 border border-[#DAC29F]/25 rounded-xl p-4 space-y-1 hover:-translate-y-0.5 transition-transform duration-200 reveal-init ${isVisible ? 'reveal-visible stagger-1' : ''}`}>
                  <span className="text-[11px] font-manrope font-bold text-[#C6A15B] block tracking-wider uppercase">01</span>
                  <div className="font-manrope text-[14px] font-semibold text-[#DAC29F]">Share Your Link</div>
                  <p className="text-[12px] font-manrope text-[#DAC29F]/70 font-normal">Send code to your friends</p>
                </div>

                <div className={`bg-[#DAC29F]/15 border border-[#DAC29F]/25 rounded-xl p-4 space-y-1 hover:-translate-y-0.5 transition-transform duration-200 reveal-init ${isVisible ? 'reveal-visible stagger-2' : ''}`}>
                  <span className="text-[11px] font-manrope font-bold text-[#C6A15B] block tracking-wider uppercase">02</span>
                  <div className="font-manrope text-[14px] font-semibold text-[#DAC29F]">Friend Gets ₹200 Off</div>
                  <p className="text-[12px] font-manrope text-[#DAC29F]/70 font-normal">Applied on first purchase</p>
                </div>

                <div className={`bg-[#DAC29F]/20 border border-[#DAC29F]/35 rounded-xl p-4 space-y-1 hover:-translate-y-0.5 transition-transform duration-200 relative overflow-hidden reveal-init ${isVisible ? 'reveal-visible stagger-3' : ''}`}>
                  <span className="text-[11px] font-manrope font-bold text-[#C6A15B] block tracking-wider uppercase">03 · YOU EARN</span>
                  <div className="font-manrope text-[14px] font-semibold text-[#DAC29F]">₹100 Cash</div>
                  <p className="text-[12px] font-manrope text-[#DAC29F]/70 font-normal">Withdrawable to UPI/Bank</p>
                </div>

              </div>

              {/* CTA — Rich Warm Sand Cream button #DAC29F */}
              <div>
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#DAC29F] hover:bg-[#E5D7C3] active:scale-[0.98] text-[#0000FF] px-7 py-3 rounded-lg font-manrope font-bold text-[13px] sm:text-[14px] tracking-[0.01em] inline-flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer btn-interactive"
                  id="start-earning-homepage-btn"
                >
                  <span>Start Earning →</span>
                </button>
              </div>

            </div>

            {/* Right — Summary card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs bg-[#DAC29F]/12 border border-[#DAC29F]/25 rounded-2xl p-5 space-y-3 text-center relative overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-[#DAC29F]/15 border border-[#DAC29F]/25 flex items-center justify-center mx-auto">
                  <Share2 className="w-5 h-5 text-[#DAC29F]/90" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-manrope font-semibold uppercase tracking-[0.09em] text-[#DAC29F]/70">
                    Your Cash Reward
                  </div>
                  <h3 className="font-bodoni text-[30px] font-medium text-[#DAC29F]">₹100 Cash</h3>
                  <p className="text-[12px] font-manrope text-[#DAC29F]/70 leading-[1.5] px-2 font-normal">
                    Direct payout to your UPI ID or Bank account upon qualifying friend purchase.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#DAC29F]/20 flex items-center justify-between text-[12px] font-manrope font-semibold text-[#DAC29F]/80">
                  <span>Friend: ₹200 OFF</span>
                  <span className="text-[#DAC29F]">You: ₹100 CASH</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </MainContainer>
    </section>
  );
}

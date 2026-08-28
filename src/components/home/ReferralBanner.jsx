import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, Share2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ReferralBanner — DEEP CHERRY brand moment.
 * #4A1019 section bg. Cream/Warm White typography. Cream step cards.
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
      className="py-10 sm:py-14 text-[#FAF6EF] border-t border-b border-[#4A1019] relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #4A1019 0%, #7F1D2D 50%, #4A1019 100%)' }}
    >
      {/* Subtle tonal depth — not a gradient, just depth */}
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F3E8D8]/15 border border-[#F3E8D8]/25">
                <Gift className="w-3 h-3 text-[#F3E8D8]/80" />
                <span className="font-manrope text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.09em] text-[#F3E8D8]/90">
                  ÉLAVA Patron Rewards
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-2">
                <h2 className="font-bodoni text-[28px] sm:text-[38px] lg:text-[44px] font-medium text-[#FAF6EF] leading-[1.02] tracking-[-0.02em]">
                  Share Élava.<br />
                  <span className="text-[#F3E8D8]/85 font-medium">Earn ₹100 Cash.</span>
                </h2>
                <p className="font-manrope text-[13px] sm:text-[15px] text-[#F3E8D8]/65 max-w-xl leading-[1.6] font-normal">
                  Your friends get <strong className="text-[#FAF6EF] font-semibold">₹200 OFF</strong>. You get <strong className="text-[#FAF6EF] font-semibold">₹100 CASH</strong> when their qualifying order completes.
                </p>
              </div>

              {/* Steps — Cream cards on Deep Cherry */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

                <div className={`bg-[#F3E8D8]/12 border border-[#F3E8D8]/20 rounded-xl p-4 space-y-1 hover:-translate-y-0.5 transition-transform duration-200 reveal-init ${isVisible ? 'reveal-visible stagger-1' : ''}`}>
                  <span className="text-[11px] font-manrope font-bold text-[#E8C9C5] block tracking-wider uppercase">01</span>
                  <div className="font-manrope text-[14px] font-semibold text-[#FAF6EF]">Share Your Link</div>
                  <p className="text-[12px] font-manrope text-[#F3E8D8]/60 font-normal">Send code to your friends</p>
                </div>

                <div className={`bg-[#F3E8D8]/12 border border-[#F3E8D8]/20 rounded-xl p-4 space-y-1 hover:-translate-y-0.5 transition-transform duration-200 reveal-init ${isVisible ? 'reveal-visible stagger-2' : ''}`}>
                  <span className="text-[11px] font-manrope font-bold text-[#E8C9C5] block tracking-wider uppercase">02</span>
                  <div className="font-manrope text-[14px] font-semibold text-[#FAF6EF]">Friend Gets ₹200 Off</div>
                  <p className="text-[12px] font-manrope text-[#F3E8D8]/60 font-normal">Applied on first purchase</p>
                </div>

                <div className={`bg-[#FAF6EF]/15 border border-[#FAF6EF]/30 rounded-xl p-4 space-y-1 hover:-translate-y-0.5 transition-transform duration-200 relative overflow-hidden reveal-init ${isVisible ? 'reveal-visible stagger-3' : ''}`}>
                  <span className="text-[11px] font-manrope font-bold text-[#F3E8D8] block tracking-wider uppercase">03 · YOU EARN</span>
                  <div className="font-manrope text-[14px] font-semibold text-[#FAF6EF]">₹100 Cash</div>
                  <p className="text-[12px] font-manrope text-[#F3E8D8]/60 font-normal">Withdrawable to UPI/Bank</p>
                </div>

              </div>

              {/* CTA — Cream button on Deep Cherry section */}
              <div>
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#F3E8D8] hover:bg-[#FAF6EF] active:scale-[0.98] text-[#4A1019] px-7 py-3 rounded-lg font-manrope font-bold text-[13px] sm:text-[14px] tracking-[0.01em] inline-flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer btn-interactive"
                  id="start-earning-homepage-btn"
                >
                  <span>Start Earning →</span>
                </button>
              </div>

            </div>

            {/* Right — Summary card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-xs bg-[#F3E8D8]/10 border border-[#F3E8D8]/20 rounded-2xl p-5 space-y-3 text-center relative overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                <div className="w-12 h-12 rounded-full bg-[#F3E8D8]/15 border border-[#F3E8D8]/25 flex items-center justify-center mx-auto">
                  <Share2 className="w-5 h-5 text-[#F3E8D8]/80" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-manrope font-semibold uppercase tracking-[0.09em] text-[#F3E8D8]/55">
                    Your Cash Reward
                  </div>
                  <h3 className="font-bodoni text-[30px] font-medium text-[#FAF6EF]">₹100 Cash</h3>
                  <p className="text-[12px] font-manrope text-[#F3E8D8]/55 leading-[1.5] px-2 font-normal">
                    Direct payout to your UPI ID or Bank account upon qualifying friend purchase.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#FAF6EF]/15 flex items-center justify-between text-[12px] font-manrope font-semibold text-[#F3E8D8]/65">
                  <span>Friend: ₹200 OFF</span>
                  <span className="text-[#FAF6EF]">You: ₹100 CASH</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </MainContainer>
    </section>
  );
}

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, Share2 } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

/**
 * ReferralBanner Component — Layered Black & Red Atmosphere & Motion V2:
 * Section environment #1C1515 / #161313 with noticeable Deep Red studio ambient lighting (.bg-ambient-referral) and sequential scroll reveal.
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
    <section className="py-12 sm:py-16 bg-[#161313] text-[#F5F2EE] border-t border-b border-white/10 relative overflow-hidden">
      {/* Noticeable Level 3 Diffuse Red Ambient Light Zone */}
      <div className="absolute inset-0 bg-ambient-referral pointer-events-none" />

      <MainContainer className="relative z-10">
        <div
          ref={ref}
          className={`bg-[#8F1018] border border-white/20 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative z-10 overflow-hidden reveal-init bg-lacquer-highlight ${
            isVisible ? 'reveal-visible' : ''
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080808] border border-white/15 text-[#F5F2EE] text-[11px] font-sans font-semibold uppercase tracking-[0.18em]">
                <Gift className="w-3.5 h-3.5 text-[#F5F2EE]" />
                <span>ÉLAVA Rewards</span>
              </div>

              {/* Major Statement */}
              <div className="space-y-3">
                <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[54px] font-normal text-[#F5F2EE] leading-[1.02] tracking-tight">
                  Share Élava.<br />
                  <span className="text-[#F5F2EE] font-normal opacity-95">
                    Earn ₹100 Cash.
                  </span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#F5F2EE]/90 max-w-xl leading-relaxed font-normal">
                  Your friends get <strong className="text-[#F5F2EE] font-bold">₹200 OFF</strong>. You get <strong className="text-[#F5F2EE] font-bold">₹100 CASH</strong> when their qualifying order is completed.
                </p>
              </div>

              {/* 3 Steps: Near Black #0B0B0B Cards with Staggered Reveal */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Step 01 */}
                <div
                  className={`bg-[#0B0B0B] border border-white/15 rounded-2xl p-4 space-y-1 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 reveal-init bg-lacquer-highlight ${
                    isVisible ? 'reveal-visible stagger-1' : ''
                  }`}
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B4171E] block">
                    01
                  </span>
                  <div className="font-sans text-sm font-bold text-[#F5F2EE]">
                    Share Your Link
                  </div>
                  <p className="text-xs font-sans text-[#B8B3AF] font-normal">Send code to your friends</p>
                </div>

                {/* Step 02 */}
                <div
                  className={`bg-[#0B0B0B] border border-white/15 rounded-2xl p-4 space-y-1 shadow-sm transition-transform duration-200 hover:-translate-y-0.5 reveal-init bg-lacquer-highlight ${
                    isVisible ? 'reveal-visible stagger-2' : ''
                  }`}
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B4171E] block">
                    02
                  </span>
                  <div className="font-sans text-sm font-bold text-[#F5F2EE]">
                    Friend Gets ₹200 Off
                  </div>
                  <p className="text-xs font-sans text-[#B8B3AF] font-normal">Applied on first purchase</p>
                </div>

                {/* Step 03 */}
                <div
                  className={`bg-[#0B0B0B] border border-[#B4171E]/60 rounded-2xl p-4 space-y-1 shadow-md transition-transform duration-200 hover:-translate-y-0.5 relative overflow-hidden reveal-init bg-lacquer-highlight ${
                    isVisible ? 'reveal-visible stagger-3' : ''
                  }`}
                >
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#B4171E] block">
                    03 · HERO EARNING
                  </span>
                  <div className="font-sans text-base font-bold text-[#F5F2EE]">
                    You Earn ₹100 Cash
                  </div>
                  <p className="text-xs font-sans text-[#B8B3AF] font-normal">Withdrawable to UPI/Bank</p>
                </div>

              </div>

              {/* CTA Button: Near Black #080808 */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#080808] hover:bg-[#121212] active:scale-[0.98] text-[#F5F2EE] hover:text-[#B4171E] border border-white/20 px-8 py-4 rounded-xl font-sans font-semibold text-xs sm:text-sm tracking-wider inline-flex items-center justify-center transition-all duration-200 shadow-2xl cursor-pointer btn-interactive"
                  id="start-earning-homepage-btn"
                >
                  <span>Start Earning →</span>
                </button>
              </div>

            </div>

            {/* Right Column: Near Black #080808 Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm bg-[#080808] border border-white/20 rounded-2xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden text-[#F5F2EE] transition-transform duration-300 hover:scale-[1.015] bg-lacquer-highlight">
                <div className="w-16 h-16 rounded-full bg-[#8F1018] border border-white/20 flex items-center justify-center mx-auto text-[#F5F2EE] shadow-inner">
                  <Share2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#B8B3AF]">
                    Your Cash Reward
                  </div>
                  <h3 className="font-serif text-4xl font-medium text-[#F5F2EE]">
                    ₹100 Cash
                  </h3>
                  <p className="text-xs font-sans text-[#B8B3AF] leading-relaxed px-2 font-normal">
                    Direct payout to your UPI ID or Bank account upon qualifying friend purchase.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-sans font-semibold text-[#B8B3AF]">
                  <span>Friend: ₹200 OFF</span>
                  <span className="text-[#F5F2EE]">You: ₹100 CASH</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}

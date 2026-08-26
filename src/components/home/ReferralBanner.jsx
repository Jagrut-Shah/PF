import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, ArrowRight, Share2, Sparkles } from 'lucide-react';

/**
 * ReferralBanner Component
 * Repositioned homepage section prioritizing customer's cash earning opportunity.
 * Aesthetic: Deep plum, rich burgundy, dark cherry, and soft rose highlights.
 */
export default function ReferralBanner() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStartEarning = () => {
    if (user) {
      navigate('/account/refer-and-earn');
    } else {
      navigate('/login?redirect=/account/refer-and-earn');
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-[#163E49] via-[#2B1B28] to-[#163E49] text-[#F5F1EA] border-t border-b border-[rgba(243,235,221,0.12)] relative overflow-hidden">
      {/* Deep atmospheric glow backgrounds */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-[#5C1D2E]/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -right-20 top-0 w-72 h-72 bg-[#4A1E2C]/30 rounded-full blur-3xl pointer-events-none" />

      <MainContainer>
        <div className="bg-[#3B1824]/85 backdrop-blur-md border border-[rgba(230,178,198,0.22)] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative z-10 overflow-hidden">
          
          {/* Top subtle ambient glow line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#E6B2C6]/60 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Category Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2B1B28] border border-[rgba(230,178,198,0.25)] text-[#E6B2C6] text-[11px] font-extrabold uppercase tracking-[0.18em]">
                <Gift className="w-3.5 h-3.5 text-[#E6B2C6]" />
                <span>PATRON REWARDS PROGRAM</span>
              </div>

              {/* Dominant Headline (Primary Hierarchy #1) */}
              <div className="space-y-2.5">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#F5F1EA] leading-[1.1]">
                  SHARE ÉLAVA. <br className="block sm:hidden" />
                  <span className="text-[#E6B2C6] text-gradient bg-gradient-to-r from-[#E6B2C6] via-[#F3D3DF] to-[#E6B2C6] bg-clip-text text-transparent">
                    EARN ₹100.
                  </span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#F5F1EA]/85 max-w-xl leading-relaxed">
                  Give your friends <strong className="text-white font-bold">₹200 OFF</strong> — and get <strong className="text-[#E6B2C6] font-bold">₹100 CASH</strong> when they complete their purchase.
                </p>
              </div>

              {/* 2-Second Visual Hierarchy Steps (Hierarchy #2 & #3) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Step 1 */}
                <div className="bg-[#2B1B28]/90 border border-[rgba(230,178,198,0.15)] rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E6B2C6]/70 block">
                    STEP 1
                  </span>
                  <div className="font-serif text-base sm:text-lg font-bold text-[#F5F1EA]">
                    Share Referral
                  </div>
                  <p className="text-[11px] text-[#F5F1EA]/70">Send link to friends</p>
                </div>

                {/* Step 2 (Hierarchy #3: Friend Discount) */}
                <div className="bg-[#2B1B28]/90 border border-[rgba(230,178,198,0.15)] rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E6B2C6]/70 block">
                    STEP 2
                  </span>
                  <div className="font-serif text-base sm:text-lg font-bold text-[#F5F1EA]">
                    Friend Gets ₹200 OFF
                  </div>
                  <p className="text-[11px] text-[#F5F1EA]/70">Applied on first order</p>
                </div>

                {/* Step 3 (Hierarchy #2: Hero Cash Earning) */}
                <div className="bg-[#5C1D2E]/95 border border-[rgba(230,178,198,0.4)] rounded-2xl p-4 space-y-1 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#E6B2C6]/15 rounded-full blur-xl pointer-events-none" />
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E6B2C6] block">
                    STEP 3 · YOUR HERO BENEFIT
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-extrabold text-[#E6B2C6]">
                    ₹100 CASH
                  </div>
                  <p className="text-[11px] text-[#F5F1EA]/90 font-medium">Added to your wallet</p>
                </div>

              </div>

              {/* Action Button (Hierarchy #4: CTA) */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#E6B2C6] hover:bg-[#F3D3DF] text-[#2B1B28] px-8 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-[0.16em] inline-flex items-center justify-center gap-3 transition-all duration-200 shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  id="start-earning-homepage-btn"
                >
                  <span>START EARNING →</span>
                  <ArrowRight className="w-4 h-4 text-[#2B1B28]" />
                </button>
              </div>

            </div>

            {/* Right Column: Visual Accent Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm bg-[#2B1B28]/95 border border-[rgba(230,178,198,0.25)] rounded-2xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-[#5C1D2E] border border-[rgba(230,178,198,0.3)] flex items-center justify-center mx-auto text-[#E6B2C6] shadow-inner">
                  <Share2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#E6B2C6]">
                    REAL CASH REWARDS
                  </div>
                  <h3 className="font-serif text-3xl font-extrabold text-[#F5F1EA]">
                    ₹100 CASH
                  </h3>
                  <p className="text-xs text-[#F5F1EA]/80 leading-relaxed px-2">
                    Withdraw directly to your UPI ID or Bank account upon qualifying order completion.
                  </p>
                </div>
                <div className="pt-3 border-t border-[rgba(230,178,198,0.15)] flex items-center justify-between text-[11px] font-bold text-[#E6B2C6]">
                  <span>FRIEND: ₹200 OFF</span>
                  <span>YOU: ₹100 CASH</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}

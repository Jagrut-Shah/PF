import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, Wallet } from 'lucide-react';

/**
 * ReferralBanner Component — Cobalt / Deep Blue with Restrained Coral Accent
 * Master Reference: 
 * Main message: SHARE ÉLAVA. EARN ₹100 CASH. (₹100 CASH visually dominant)
 * Secondary: Your friend gets ₹200 OFF.
 * 3 steps (01 / 02 / 03), CTA: START EARNING → (Single arrow).
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
    <section className="py-12 sm:py-16 md:py-20 bg-[#102A4C] text-[#F7F3EC] border-b border-white/10 relative overflow-hidden">
      {/* Cobalt atmospheric depth */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#285BE6]/20 rounded-full blur-3xl pointer-events-none" />

      <MainContainer>
        <div className="bg-[#08111F] border border-white/15 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative z-10 overflow-hidden">
          
          {/* Subtle Coral accent top border line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#285BE6] via-[#FF6B61] to-[#285BE6]" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Pill Badge with Coral Accent */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#285BE6]/20 border border-[#5F8CFF]/30 text-[#F7F3EC] text-[11px] font-extrabold uppercase tracking-[0.2em]">
                <Gift className="w-3.5 h-3.5 text-[#FF6B61]" />
                <span>ÉLAVA EXCLUSIVE REWARDS</span>
              </div>

              {/* Dominant Headline — SHARE ÉLAVA. EARN ₹100 CASH. */}
              <div className="space-y-3">
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-light uppercase tracking-tight text-[#F7F3EC] leading-[1.1]">
                  SHARE ÉLAVA.<br />
                  <span className="font-bold text-[#FF6B61] text-3xl sm:text-4xl lg:text-5xl">
                    EARN ₹100 CASH.
                  </span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#F7F3EC]/80 max-w-xl leading-relaxed">
                  Your friend gets <strong className="text-white font-bold">₹200 OFF</strong>. You earn <strong className="text-[#FF6B61] font-bold">₹100 CASH</strong> reward in your wallet for every qualifying purchase.
                </p>
              </div>

              {/* 3 Simple Steps (01 / 02 / 03) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Step 01 */}
                <div className="bg-[#102A4C]/80 border border-white/10 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#5F8CFF] block">
                    01
                  </span>
                  <div className="font-serif text-base font-bold text-[#F7F3EC] uppercase">
                    SHARE YOUR LINK
                  </div>
                  <p className="text-[11px] text-[#F7F3EC]/70">Send code to your friends</p>
                </div>

                {/* Step 02 */}
                <div className="bg-[#102A4C]/80 border border-white/10 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#5F8CFF] block">
                    02
                  </span>
                  <div className="font-serif text-base font-bold text-[#F7F3EC] uppercase">
                    YOUR FRIEND GETS ₹200 OFF
                  </div>
                  <p className="text-[11px] text-[#F7F3EC]/70">Applied on first order</p>
                </div>

                {/* Step 03 - Hero Earning with Coral Accent */}
                <div className="bg-[#285BE6]/90 border border-[#FF6B61]/40 rounded-2xl p-4 space-y-1 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF6B61]/20 rounded-full blur-xl pointer-events-none" />
                  <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FFD1C8] block">
                    03 · HERO EARNING
                  </span>
                  <div className="font-serif text-xl sm:text-2xl font-extrabold text-[#F7F3EC]">
                    YOU EARN ₹100 CASH
                  </div>
                  <p className="text-[11px] text-[#F7F3EC]/90 font-medium">Withdrawable to UPI/Bank</p>
                </div>

              </div>

              {/* Action Button: Single Arrow */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#285BE6] hover:bg-[#1E48B8] text-white px-8 py-4 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-[0.16em] inline-flex items-center justify-center transition-all duration-200 shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  id="start-earning-homepage-btn"
                >
                  START EARNING →
                </button>
              </div>

            </div>

            {/* Right Column: Visual Cash Highlight */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm bg-[#102A4C]/90 border border-[#FF6B61]/30 rounded-2xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-[#285BE6]/30 border border-[#FF6B61]/40 flex items-center justify-center mx-auto text-[#FF6B61] shadow-inner">
                  <Wallet className="w-7 h-7 text-[#FF6B61]" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-[#FFD1C8]">
                    YOUR CASH REWARD
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#FF6B61]">
                    ₹100 CASH
                  </h3>
                  <p className="text-xs text-[#F7F3EC]/80 leading-relaxed px-2">
                    Direct payout to your UPI ID or Bank account upon qualifying friend purchase.
                  </p>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-[#F7F3EC]">
                  <span>FRIEND: ₹200 OFF</span>
                  <span className="text-[#FF6B61]">YOU: ₹100 CASH</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}

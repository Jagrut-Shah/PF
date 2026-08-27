import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, Share2 } from 'lucide-react';

/**
 * ReferralBanner Component — Variant C: Dark Coffee #33211E frame + Warm Cream #F1E4D2 step cards + Near Black #0D0A0C reward panel
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
    <section className="py-12 sm:py-16 bg-[#241817] text-[#F1E4D2] border-t border-b border-[#CDBBAA]/15 relative overflow-hidden">
      <MainContainer>
        <div className="bg-[#33211E] border border-[#CDBBAA]/25 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative z-10 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0D0A0C] border border-[#CDBBAA]/25 text-[#D9B8B7] text-[11px] font-sans font-semibold uppercase tracking-[0.18em]">
                <Gift className="w-3.5 h-3.5 text-[#D9B8B7]" />
                <span>ÉLAVA Rewards</span>
              </div>

              {/* Major Statement: Bodoni Moda 400 */}
              <div className="space-y-3">
                <h2 className="font-serif text-[32px] sm:text-[44px] lg:text-[54px] font-normal text-[#F1E4D2] leading-[1.02] tracking-tight">
                  Share Élava.<br />
                  <span className="text-[#C94B5B] font-normal">
                    Earn ₹100 Cash.
                  </span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#CDBBAA] max-w-xl leading-relaxed font-normal">
                  Your friends get <strong className="text-white font-semibold">₹200 OFF</strong>. You get <strong className="text-[#F1E4D2] font-semibold">₹100 CASH</strong> when their qualifying order is completed.
                </p>
              </div>

              {/* 3 Steps: Warm Cream #F1E4D2 Cards with Near Black #0D0A0C Typography */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Step 01 */}
                <div className="bg-[#F1E4D2] border border-[#33211E]/20 rounded-2xl p-4 space-y-1 shadow-sm">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#33211E] block">
                    01
                  </span>
                  <div className="font-sans text-sm font-bold text-[#0D0A0C]">
                    Share Your Link
                  </div>
                  <p className="text-xs font-sans text-[#241817]/90 font-normal">Send code to your friends</p>
                </div>

                {/* Step 02 */}
                <div className="bg-[#F1E4D2] border border-[#33211E]/20 rounded-2xl p-4 space-y-1 shadow-sm">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#33211E] block">
                    02
                  </span>
                  <div className="font-sans text-sm font-bold text-[#0D0A0C]">
                    Friend Gets ₹200 Off
                  </div>
                  <p className="text-xs font-sans text-[#241817]/90 font-normal">Applied on first purchase</p>
                </div>

                {/* Step 03 */}
                <div className="bg-[#F1E4D2] border border-[#C94B5B]/60 rounded-2xl p-4 space-y-1 shadow-md relative overflow-hidden">
                  <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#C94B5B] block">
                    03 · HERO EARNING
                  </span>
                  <div className="font-sans text-base font-bold text-[#0D0A0C]">
                    You Earn ₹100 Cash
                  </div>
                  <p className="text-xs font-sans text-[#241817]/90 font-normal">Withdrawable to UPI/Bank</p>
                </div>

              </div>

              {/* CTA Button: Manrope 600 */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#2A0D14] hover:bg-[#3D141E] active:scale-[0.98] text-[#F1E4D2] border border-[#D9B8B7]/30 px-8 py-4 rounded-xl font-sans font-semibold text-xs sm:text-sm tracking-wider inline-flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
                  id="start-earning-homepage-btn"
                >
                  <span>Start Earning →</span>
                </button>
              </div>

            </div>

            {/* Right Column: Near Black #0D0A0C Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm bg-[#0D0A0C] border border-[#CDBBAA]/25 rounded-2xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden text-[#F1E4D2]">
                <div className="w-16 h-16 rounded-full bg-[#33211E] border border-[#CDBBAA]/30 flex items-center justify-center mx-auto text-[#D9B8B7] shadow-inner">
                  <Share2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#D9B8B7]">
                    Your Cash Reward
                  </div>
                  <h3 className="font-serif text-4xl font-medium text-[#F1E4D2]">
                    ₹100 Cash
                  </h3>
                  <p className="text-xs font-sans text-[#CDBBAA] leading-relaxed px-2 font-normal">
                    Direct payout to your UPI ID or Bank account upon qualifying friend purchase.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#CDBBAA]/15 flex items-center justify-between text-xs font-sans font-semibold text-[#D9B8B7]">
                  <span>Friend: ₹200 OFF</span>
                  <span>You: ₹100 CASH</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </MainContainer>
    </section>
  );
}

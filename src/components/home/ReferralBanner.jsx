import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import MainContainer from '../ui/MainContainer';
import { Gift, Share2 } from 'lucide-react';

/**
 * ReferralBanner Component — Cormorant Garamond for main statement, Manrope for steps & CTA.
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
    <section className="py-12 sm:py-16 bg-[#2A0D14] text-[#F6EFE7] border-t border-b border-[#E7C4C5]/15 relative overflow-hidden">
      <MainContainer>
        <div className="bg-[#641D2D] border border-[#E7C4C5]/25 rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative z-10 overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#2A0D14] border border-[#E7C4C5]/25 text-[#E7C4C5] text-[11px] font-sans font-semibold uppercase tracking-[0.18em]">
                <Gift className="w-3.5 h-3.5 text-[#E7C4C5]" />
                <span>ÉLAVA Rewards</span>
              </div>

              {/* Major Statement: Cormorant Garamond Serif */}
              <div className="space-y-3">
                <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-[#F6EFE7] leading-[1.05] tracking-tight">
                  Share Élava.<br />
                  <span className="text-[#C94B5B] font-normal">
                    Earn ₹100 Cash.
                  </span>
                </h2>
                <p className="font-sans text-sm sm:text-base text-[#F6EFE7]/90 max-w-xl leading-relaxed font-normal">
                  Your friends get <strong className="text-white font-semibold">₹200 OFF</strong>. You get <strong className="text-[#E7C4C5] font-semibold">₹100 CASH</strong> when their qualifying order is completed.
                </p>
              </div>

              {/* 3 Steps: Manrope */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                
                {/* Step 01 */}
                <div className="bg-[#2A0D14] border border-[#E7C4C5]/15 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#E7C4C5]/70 block">
                    01
                  </span>
                  <div className="font-sans text-sm font-semibold text-[#F6EFE7]">
                    Share Your Link
                  </div>
                  <p className="text-xs font-sans text-[#E7C4C5]/75 font-normal">Send code to your friends</p>
                </div>

                {/* Step 02 */}
                <div className="bg-[#2A0D14] border border-[#E7C4C5]/15 rounded-2xl p-4 space-y-1">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#E7C4C5]/70 block">
                    02
                  </span>
                  <div className="font-sans text-sm font-semibold text-[#F6EFE7]">
                    Friend Gets ₹200 Off
                  </div>
                  <p className="text-xs font-sans text-[#E7C4C5]/75 font-normal">Applied on first purchase</p>
                </div>

                {/* Step 03 */}
                <div className="bg-[#2A0D14] border border-[#C94B5B]/50 rounded-2xl p-4 space-y-1 shadow-lg relative overflow-hidden">
                  <span className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#C94B5B] block">
                    03 · HERO EARNING
                  </span>
                  <div className="font-sans text-base font-semibold text-[#F6EFE7]">
                    You Earn ₹100 Cash
                  </div>
                  <p className="text-xs font-sans text-[#E7C4C5]/90 font-normal">Withdrawable to UPI/Bank</p>
                </div>

              </div>

              {/* CTA Button: Manrope 600 */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleStartEarning}
                  className="w-full sm:w-auto bg-[#C94B5B] hover:bg-[#B03D4C] text-[#F6EFE7] px-8 py-4 rounded-xl font-sans font-semibold text-xs sm:text-sm tracking-wider inline-flex items-center justify-center transition-all duration-200 shadow-xl cursor-pointer"
                  id="start-earning-homepage-btn"
                >
                  <span>Start Earning →</span>
                </button>
              </div>

            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="w-full max-w-sm bg-[#2A0D14] border border-[#E7C4C5]/25 rounded-2xl p-6 shadow-2xl space-y-4 text-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-[#641D2D] border border-[#E7C4C5]/30 flex items-center justify-center mx-auto text-[#E7C4C5] shadow-inner">
                  <Share2 className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] font-sans font-semibold uppercase tracking-widest text-[#E7C4C5]">
                    Your Cash Reward
                  </div>
                  <h3 className="font-serif text-4xl font-normal text-[#F6EFE7]">
                    ₹100 Cash
                  </h3>
                  <p className="text-xs font-sans text-[#E7C4C5]/85 leading-relaxed px-2 font-normal">
                    Direct payout to your UPI ID or Bank account upon qualifying friend purchase.
                  </p>
                </div>
                <div className="pt-3 border-t border-[#E7C4C5]/15 flex items-center justify-between text-xs font-sans font-semibold text-[#E7C4C5]">
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

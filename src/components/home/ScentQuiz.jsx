import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import SectionHeading from '../ui/SectionHeading';
import { products } from '../../data/products';
import { Sparkles, RotateCcw, Check, ArrowRight } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const QUIZ_QUESTIONS = [
  {
    id: 'who',
    title: 'Who is this fragrance for?',
    options: [
      { label: 'Men', value: 'men' },
      { label: 'Women', value: 'women' },
      { label: 'Unisex', value: 'unisex' },
    ],
  },
  {
    id: 'occasion',
    title: 'Primary occasion you are shopping for?',
    options: [
      { label: 'Everyday / Casual', value: 'everyday' },
      { label: 'Office / Work', value: 'office' },
      { label: 'Date Night / Romantic', value: 'date-night' },
      { label: 'Evening / Party', value: 'party' },
    ],
  },
  {
    id: 'vibe',
    title: 'What scent profile appeals most to you?',
    options: [
      { label: 'Fresh Citrus & Green Tea', value: 'fresh' },
      { label: 'Warm Wood, Oud & Leather', value: 'woody' },
      { label: 'Soft Florals & Vanilla', value: 'floral' },
      { label: 'Spiced Amber & Musk', value: 'amber' },
    ],
  },
];

/**
 * ScentQuiz Component — Light Luxury Scent Finder:
 * Warm Ivory #F6F2EA section, Cream #EEE8DD card surface, Deep Burgundy #721C24 selected controls,
 * and Soft Stone / Cream unselected controls for tactile editorial feel.
 */
export default function ScentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [ref, isVisible] = useScrollReveal();

  const handleSelectOption = (questionId, value) => {
    const nextAnswers = { ...answers, [questionId]: value };
    setAnswers(nextAnswers);

    if (currentStep < QUIZ_QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const getRecommendations = () => {
    const { who, occasion, vibe } = answers;
    return products.filter((p) => {
      let score = 0;
      if (who && (p.gender === who || p.gender === 'unisex')) score += 3;
      if (occasion && p.occasion === occasion) score += 4;
      if (vibe) {
        if (vibe === 'fresh' && p.scentIdentity.toLowerCase().includes('clean')) score += 2;
        if (vibe === 'woody' && (p.scentIdentity.toLowerCase().includes('smoky') || p.scentIdentity.toLowerCase().includes('earthy'))) score += 2;
        if (vibe === 'floral' && p.scentIdentity.toLowerCase().includes('floral')) score += 2;
        if (vibe === 'amber' && p.scentIdentity.toLowerCase().includes('amber')) score += 2;
      }
      return score >= 3;
    }).slice(0, 3);
  };

  const recommendedProducts = getRecommendations();
  const displayProducts = recommendedProducts.length > 0 ? recommendedProducts : products.slice(0, 3);

  return (
    <section id="scent-finder" className="py-12 sm:py-16 bg-[#F6F2EA] text-[#201C19] border-t border-b border-[#D9D1C6] relative overflow-hidden">
      {/* Subtle Champagne Ambient Light */}
      <div className="absolute inset-0 bg-ambient-quiz pointer-events-none" />

      <MainContainer className="relative z-10">
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <SectionHeading
            title="Find Your Signature Scent"
            subtitle="Answer 3 quick questions to discover your ideal ÉLAVA fragrance signature."
            align="center"
          />

          <div className="max-w-2xl mx-auto mt-8 bg-[#EEE8DD] border border-[#D9D1C6] rounded-2xl p-6 sm:p-8 shadow-[0_10px_32px_rgba(60,45,30,0.06)] relative overflow-hidden transition-all duration-300">
            
            {!isCompleted ? (
              <div className="transition-opacity duration-300">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between text-xs font-sans text-[#625C55] mb-4">
                  <span className="font-semibold uppercase tracking-wider">
                    Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {QUIZ_QUESTIONS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentStep
                            ? 'w-6 bg-[#721C24]'
                            : idx < currentStep
                            ? 'w-3 bg-[#625C55]'
                            : 'w-3 bg-[#D9D1C6]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Title — Bodoni Moda 500-600 */}
                <h3 className="font-bodoni text-[22px] sm:text-[26px] md:text-[28px] font-medium text-[#201C19] mb-6 leading-tight tracking-[-0.015em]">
                  {QUIZ_QUESTIONS[currentStep].title}
                </h3>

                {/* Options Grid — Deep Burgundy selected, Warm Ivory unselected */}
                <div className="grid grid-cols-1 gap-3">
                  {QUIZ_QUESTIONS[currentStep].options.map((option) => {
                    const isSelected = answers[QUIZ_QUESTIONS[currentStep].id] === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, option.value)}
                        className={`w-full text-left p-4 rounded-xl font-manrope text-[15px] ${
                          isSelected
                            ? 'font-semibold bg-[#721C24] border-[#721C24] text-[#F6F2EA] shadow-xs'
                            : 'font-medium bg-[#F6F2EA] border-[#D9D1C6] text-[#201C19] hover:border-[#721C24]/40 hover:bg-[#E5DCCF]/60'
                        } tracking-wide transition-all duration-200 flex items-center justify-between border active:scale-[0.98] cursor-pointer btn-interactive`}
                      >
                        <span>{option.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#F6F2EA]" />}
                      </button>
                    );
                  })}
                </div>

                {currentStep > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#D9D1C6] flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="text-xs font-manrope font-medium text-[#625C55] hover:text-[#201C19] transition-colors btn-interactive"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-manrope text-[#625C55]/80 hover:text-[#201C19] transition-colors flex items-center gap-1 btn-interactive"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Results View with Smooth Entrance */
              <div className="space-y-6 animate-fadeIn transition-opacity duration-300">
                <div className="flex items-center justify-between border-b border-[#D9D1C6] pb-4">
                  <div>
                    <span className="text-[12px] font-manrope font-semibold tracking-[0.09em] text-[#625C55] uppercase block">
                      MATCH RESULT
                    </span>
                    <h3 className="font-bodoni text-[22px] sm:text-[26px] font-medium text-[#201C19]">
                      Recommended Signatures
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-manrope font-semibold text-[#625C55] hover:text-[#201C19] flex items-center gap-1 border border-[#D9D1C6] px-3 py-1.5 rounded-lg bg-[#F6F2EA] btn-interactive"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retake</span>
                  </button>
                </div>

                {/* Primary Match */}
                {displayProducts[0] && (
                  <div className="bg-[#F6F2EA] border border-[#D9D1C6] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-xs transition-transform duration-200 hover:scale-[1.01]">
                    <img
                      src={displayProducts[0].image}
                      alt={displayProducts[0].name}
                      className="w-24 h-24 object-contain rounded-lg bg-[#EEE8DD] shrink-0 p-1"
                    />
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#E5DCCF] text-[#721C24] border border-[#D9D1C6] text-[11px] font-manrope font-semibold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3 text-[#721C24]" />
                        TOP MATCH · ÉLAVA SIGNATURE
                      </span>
                      <h4 className="font-manrope text-[18px] sm:text-[20px] font-semibold text-[#201C19]">
                        {displayProducts[0].name}
                      </h4>
                      <p className="font-manrope text-[14px] text-[#625C55] mt-0.5 font-normal">
                        {displayProducts[0].scentIdentity}
                      </p>
                      <span className="font-manrope text-[16px] font-semibold text-[#201C19] mt-1 block">
                        ₹{displayProducts[0].price?.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      to={`/product/${displayProducts[0].slug}`}
                      className="w-full sm:w-auto bg-[#721C24] hover:bg-[#5A161C] active:scale-[0.98] text-[#F6F2EA] py-3 px-6 rounded-xl font-manrope text-[14px] font-semibold tracking-wider inline-flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs btn-interactive"
                    >
                      <span>View Your Match →</span>
                    </Link>
                  </div>
                )}

                {/* Other Matches */}
                {displayProducts.length > 1 && (
                  <div className="pt-2">
                    <div className="text-[12px] font-manrope font-semibold uppercase tracking-[0.09em] text-[#625C55] mb-2.5">
                      Other Good Matches
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {displayProducts.slice(1, 3).map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          className="group bg-[#F6F2EA] border border-[#D9D1C6] rounded-lg p-3 flex items-center justify-between hover:border-[#721C24]/40 active:scale-[0.98] transition-all btn-interactive"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 object-contain rounded bg-[#EEE8DD] shrink-0 p-1"
                            />
                            <div className="min-w-0">
                              <h5 className="font-manrope text-[16px] font-semibold text-[#201C19] truncate">
                                {p.name}
                              </h5>
                              <p className="font-manrope text-[13px] text-[#625C55] truncate font-normal">{p.scentIdentity}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#625C55] shrink-0 transform group-hover:translate-x-1 group-hover:text-[#721C24] transition-transform" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </MainContainer>
    </section>
  );
}

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainContainer from '../ui/MainContainer';
import SectionHeading from '../ui/SectionHeading';
import { products } from '../../data/products';
import { Sparkles, RotateCcw, Check, ArrowRight } from 'lucide-react';

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
 * ScentQuiz Component — Final Color Direction C: Dark Espresso #241918 + Secondary Coffee #352522 + Warm Cream #F0E2D0
 */
export default function ScentQuiz() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

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
    <section id="scent-finder" className="py-12 sm:py-16 bg-[#241918] text-[#F0E2D0] border-t border-b border-[#CDBBAA]/15">
      <MainContainer>
        <SectionHeading
          title="Find Your Signature Scent"
          subtitle="Answer 3 quick questions to discover your ideal ÉLAVA fragrance signature."
          centered
        />

        <div className="max-w-2xl mx-auto mt-8 bg-[#352522] border border-[#CDBBAA]/20 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {!isCompleted ? (
            <div>
              {/* Progress Indicator */}
              <div className="flex items-center justify-between text-xs font-sans text-[#CDBBAA] mb-4">
                <span className="font-semibold uppercase tracking-wider">
                  Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <div className="flex items-center gap-1.5">
                  {QUIZ_QUESTIONS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentStep
                          ? 'w-6 bg-[#46332D]'
                          : idx < currentStep
                          ? 'w-3 bg-[#CDBBAA]'
                          : 'w-3 bg-[#241918]'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Question Title */}
              <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F0E2D0] mb-6">
                {QUIZ_QUESTIONS[currentStep].title}
              </h3>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-3">
                {QUIZ_QUESTIONS[currentStep].options.map((option) => {
                  const isSelected = answers[QUIZ_QUESTIONS[currentStep].id] === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleSelectOption(QUIZ_QUESTIONS[currentStep].id, option.value)}
                      className={`w-full text-left p-4 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-between border active:scale-[0.98] cursor-pointer ${
                        isSelected
                          ? 'bg-[#46332D] border-[#CDBBAA]/50 text-[#F0E2D0] shadow-sm'
                          : 'bg-[#241918] border-[#CDBBAA]/20 text-[#F0E2D0] hover:border-[#CDBBAA]/40 hover:bg-[#241918]/80'
                      }`}
                    >
                      <span>{option.label}</span>
                      {isSelected && <Check className="w-4 h-4 text-[#F0E2D0]" />}
                    </button>
                  );
                })}
              </div>

              {currentStep > 0 && (
                <div className="mt-6 pt-4 border-t border-[#CDBBAA]/15 flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    className="text-xs font-sans font-medium text-[#CDBBAA] hover:text-[#F0E2D0] transition-colors"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-sans text-[#CDBBAA]/60 hover:text-[#CDBBAA] transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results View */
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[#CDBBAA]/15 pb-4">
                <div>
                  <span className="text-[10px] font-sans font-semibold tracking-widest text-[#CDBBAA] uppercase block">
                    MATCH RESULT
                  </span>
                  <h3 className="font-serif text-2xl font-normal text-[#F0E2D0]">
                    Recommended Signatures
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs font-sans text-[#CDBBAA] hover:text-[#F0E2D0] flex items-center gap-1 border border-[#CDBBAA]/20 px-3 py-1.5 rounded-lg bg-[#241918]"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retake</span>
                </button>
              </div>

              {/* Primary Match */}
              {displayProducts[0] && (
                <div className="bg-[#241918] border border-[#CDBBAA]/25 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
                  <img
                    src={displayProducts[0].image}
                    alt={displayProducts[0].name}
                    className="w-24 h-24 object-contain rounded-lg bg-[#100D0C] shrink-0"
                  />
                  <div className="flex-1 text-center sm:text-left min-w-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#46332D] text-[#CDBBAA] text-[10px] font-sans font-semibold uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3" />
                      TOP MATCH · ÉLAVA SIGNATURE
                    </span>
                    <h4 className="font-serif text-2xl font-normal text-[#F0E2D0]">
                      {displayProducts[0].name}
                    </h4>
                    <p className="font-sans text-xs text-[#CDBBAA] mt-0.5 font-normal">
                      {displayProducts[0].scentIdentity}
                    </p>
                    <span className="font-sans text-sm font-semibold text-[#F0E2D0] mt-1 block">
                      ₹{displayProducts[0].price?.toLocaleString()}
                    </span>
                  </div>

                  <Link
                    to={`/product/${displayProducts[0].slug}`}
                    className="w-full sm:w-auto bg-[#46332D] hover:bg-[#352522] active:scale-[0.98] text-[#F0E2D0] border border-[#CDBBAA]/30 py-3 px-6 rounded-xl font-sans text-xs font-semibold tracking-wider inline-flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs"
                  >
                    <span>View Your Match →</span>
                  </Link>
                </div>
              )}

              {/* Other Matches */}
              {displayProducts.length > 1 && (
                <div className="pt-2">
                  <div className="text-[10.5px] font-sans font-semibold uppercase tracking-wider text-[#CDBBAA] mb-2.5">
                    Other Good Matches
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {displayProducts.slice(1, 3).map((p) => (
                      <Link
                        key={p.id}
                        to={`/product/${p.slug}`}
                        className="group bg-[#241918]/70 border border-[#CDBBAA]/15 rounded-lg p-3 flex items-center justify-between hover:border-[#F0E2D0]/40 active:scale-[0.98] transition-all"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-10 h-10 object-contain rounded bg-[#100D0C] shrink-0"
                          />
                          <div className="min-w-0">
                            <h5 className="font-serif text-base font-normal text-[#F0E2D0] truncate">
                              {p.name}
                            </h5>
                            <p className="font-sans text-[11px] text-[#CDBBAA] truncate font-normal">{p.scentIdentity}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#CDBBAA] shrink-0 transform group-hover:translate-x-1 transition-transform" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </MainContainer>
    </section>
  );
}

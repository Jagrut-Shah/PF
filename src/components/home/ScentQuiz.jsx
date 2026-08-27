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
 * ScentQuiz Component — Layered Black & Red Luxury Aesthetic & Motion:
 * Soft Black #111111 section environment + Level 1 diffuse red ambient wash + Scroll reveal & smooth match result transitions.
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
    <section id="scent-finder" className="py-12 sm:py-16 bg-[#111111] text-[#F5F2EE] border-t border-b border-white/10 relative overflow-hidden">
      {/* Level 1 Diffuse Red Ambient Light */}
      <div className="absolute inset-0 bg-ambient-red pointer-events-none" />

      <MainContainer className="relative z-10">
        <div ref={ref} className={`reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <SectionHeading
            title="Find Your Signature Scent"
            subtitle="Answer 3 quick questions to discover your ideal ÉLAVA fragrance signature."
            centered
          />

          <div className="max-w-2xl mx-auto mt-8 bg-[#171515] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
            
            {!isCompleted ? (
              <div className="transition-opacity duration-300">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between text-xs font-sans text-[#B8B3AF] mb-4">
                  <span className="font-semibold uppercase tracking-wider">
                    Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {QUIZ_QUESTIONS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentStep
                            ? 'w-6 bg-[#B4171E]'
                            : idx < currentStep
                            ? 'w-3 bg-[#B8B3AF]'
                            : 'w-3 bg-[#111111]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Title */}
                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#F5F2EE] mb-6">
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
                        className={`w-full text-left p-4 rounded-xl font-sans text-sm font-semibold tracking-wide transition-all duration-200 flex items-center justify-between border active:scale-[0.98] cursor-pointer btn-interactive ${
                          isSelected
                            ? 'bg-[#B4171E] border-[#B4171E] text-[#F5F2EE] shadow-sm'
                            : 'bg-[#111111] border-white/10 text-[#F5F2EE] hover:border-[#B4171E]/40 hover:bg-[#111111]/80'
                        }`}
                      >
                        <span>{option.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#F5F2EE]" />}
                      </button>
                    );
                  })}
                </div>

                {currentStep > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="text-xs font-sans font-medium text-[#B8B3AF] hover:text-[#F5F2EE] transition-colors btn-interactive"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-sans text-[#B8B3AF]/60 hover:text-[#B8B3AF] transition-colors flex items-center gap-1 btn-interactive"
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
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[10px] font-sans font-semibold tracking-widest text-[#B8B3AF] uppercase block">
                      MATCH RESULT
                    </span>
                    <h3 className="font-serif text-2xl font-normal text-[#F5F2EE]">
                      Recommended Signatures
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-sans text-[#B8B3AF] hover:text-[#F5F2EE] flex items-center gap-1 border border-white/10 px-3 py-1.5 rounded-lg bg-[#080808] btn-interactive"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retake</span>
                  </button>
                </div>

                {/* Primary Match */}
                {displayProducts[0] && (
                  <div className="bg-[#080808] border border-white/15 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-md transition-transform duration-200 hover:scale-[1.01]">
                    <img
                      src={displayProducts[0].image}
                      alt={displayProducts[0].name}
                      className="w-24 h-24 object-contain rounded-lg bg-[#111111] shrink-0"
                    />
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#8F1018]/60 text-[#F5F2EE] border border-[#B4171E]/40 text-[10px] font-sans font-semibold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3 text-[#F5F2EE]" />
                        TOP MATCH · ÉLAVA SIGNATURE
                      </span>
                      <h4 className="font-serif text-2xl font-normal text-[#F5F2EE]">
                        {displayProducts[0].name}
                      </h4>
                      <p className="font-sans text-xs text-[#B8B3AF] mt-0.5 font-normal">
                        {displayProducts[0].scentIdentity}
                      </p>
                      <span className="font-sans text-sm font-semibold text-[#F5F2EE] mt-1 block">
                        ₹{displayProducts[0].price?.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      to={`/product/${displayProducts[0].slug}`}
                      className="w-full sm:w-auto bg-[#B4171E] hover:bg-[#C72A35] active:scale-[0.98] text-[#F5F2EE] border border-white/10 py-3 px-6 rounded-xl font-sans text-xs font-semibold tracking-wider inline-flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs btn-interactive"
                    >
                      <span>View Your Match →</span>
                    </Link>
                  </div>
                )}

                {/* Other Matches */}
                {displayProducts.length > 1 && (
                  <div className="pt-2">
                    <div className="text-[10.5px] font-sans font-semibold uppercase tracking-wider text-[#B8B3AF] mb-2.5">
                      Other Good Matches
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {displayProducts.slice(1, 3).map((p) => (
                        <Link
                          key={p.id}
                          to={`/product/${p.slug}`}
                          className="group bg-[#080808]/70 border border-white/10 rounded-lg p-3 flex items-center justify-between hover:border-[#B4171E]/40 active:scale-[0.98] transition-all btn-interactive"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 object-contain rounded bg-[#111111] shrink-0"
                            />
                            <div className="min-w-0">
                              <h5 className="font-serif text-base font-normal text-[#F5F2EE] truncate">
                                {p.name}
                              </h5>
                              <p className="font-sans text-[11px] text-[#B8B3AF] truncate font-normal">{p.scentIdentity}</p>
                            </div>
                          </div>
                          <ArrowRight className="w-4 h-4 text-[#B8B3AF] shrink-0 transform group-hover:translate-x-1 group-hover:text-[#B4171E] transition-transform" />
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

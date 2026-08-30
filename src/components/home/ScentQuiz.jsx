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
 * ScentQuiz Component — CHERRY DOMINANT BACKGROUND #8B1E2D
 * Deep Cherry #64141F container, Cream #F4EBDD option controls (NO white background).
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
  const currentQuestion = QUIZ_QUESTIONS[currentStep];

  return (
    <section id="scent-finder" className="py-10 sm:py-14 bg-[#8B1E2D] text-[#F4EBDD] border-b border-[#64141F]" aria-labelledby="scent-finder-heading">
      <MainContainer>
        <div ref={ref} className={`max-w-3xl mx-auto reveal-init ${isVisible ? 'reveal-visible' : ''}`}>
          <SectionHeading
            id="scent-finder-heading"
            title="Interactive Scent Finder"
            subtitle="Answer 3 simple questions to discover your ideal fragrance signature."
            align="center"
            eyebrow="Personalized Guidance"
            isDark={true}
          />

          <div className="bg-[#64141F] border border-[#F4EBDD]/25 rounded-2xl p-5 sm:p-8 shadow-md relative overflow-hidden transition-all duration-300">

            {!isCompleted ? (
              <div className="transition-opacity duration-300">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between text-xs font-sans text-[#F4EBDD]/80 mb-4">
                  <span className="font-semibold uppercase tracking-wider">
                    Step {currentStep + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {QUIZ_QUESTIONS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          idx === currentStep
                            ? 'w-6 bg-[#F4EBDD]'
                            : idx < currentStep
                            ? 'w-3 bg-[#F4EBDD]/70'
                            : 'w-3 bg-[#8B1E2D]'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Title */}
                <h3 className="font-bodoni text-[22px] sm:text-[26px] md:text-[28px] font-medium text-[#F4EBDD] mb-6 leading-tight tracking-[-0.015em]">
                  {currentQuestion.title}
                </h3>

                {/* Options Grid */}
                <div className="space-y-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                        className={`w-full text-left p-3.5 sm:p-4 rounded-xl border font-manrope text-[14px] font-semibold flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#8B1E2D] border-[#F4EBDD] text-[#F4EBDD] shadow-sm'
                            : 'bg-[#F4EBDD] border-[#E5DCCF] text-[#2A211F] hover:border-[#FFF] hover:bg-[#FFF]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-[#F4EBDD] shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {currentStep > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#F4EBDD]/20 flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep((prev) => prev - 1)}
                      className="text-xs font-manrope font-medium text-[#F4EBDD]/80 hover:text-[#F4EBDD] transition-colors btn-interactive"
                    >
                      ← Back
                    </button>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="text-xs font-manrope text-[#F4EBDD]/60 hover:text-[#F4EBDD] transition-colors flex items-center gap-1 btn-interactive"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Results View */
              <div className="space-y-6 animate-fadeIn transition-opacity duration-300">
                <div className="flex items-center justify-between border-b border-[#F4EBDD]/20 pb-4">
                  <div>
                    <span className="text-[12px] font-manrope font-semibold tracking-[0.09em] text-[#F4EBDD]/70 uppercase block">
                      MATCH RESULT
                    </span>
                    <h3 className="font-bodoni text-[22px] sm:text-[26px] font-medium text-[#F4EBDD]">
                      Recommended Signatures
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-manrope font-semibold text-[#F4EBDD] hover:text-[#FFF] flex items-center gap-1 border border-[#F4EBDD]/30 px-3 py-1.5 rounded-lg bg-[#8B1E2D] btn-interactive"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Retake</span>
                  </button>
                </div>

                {/* Primary Match */}
                {displayProducts[0] && (
                  <div className="bg-[#F4EBDD] border border-[#E5DCCF] rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-sm text-[#2A211F]">
                    <img
                      src={displayProducts[0].image}
                      alt={displayProducts[0].name}
                      className="w-24 h-24 object-contain rounded-lg bg-[#E5DCCF] shrink-0 p-1"
                    />
                    <div className="flex-1 text-center sm:text-left min-w-0">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#8B1E2D] text-[#F4EBDD] border border-[#64141F] text-[11px] font-manrope font-semibold uppercase tracking-wider mb-1">
                        <Sparkles className="w-3 h-3 text-[#F4EBDD]" />
                        TOP MATCH · ÉLAVA SIGNATURE
                      </span>
                      <h4 className="font-manrope text-[18px] sm:text-[20px] font-semibold text-[#2A211F]">
                        {displayProducts[0].name}
                      </h4>
                      <p className="font-manrope text-[14px] text-[#625C55] mt-0.5 font-normal">
                        {displayProducts[0].scentIdentity}
                      </p>
                      <span className="font-manrope text-[16px] font-semibold text-[#2A211F] mt-1 block">
                        ₹{displayProducts[0].price?.toLocaleString()}
                      </span>
                    </div>

                    <Link
                      to={`/product/${displayProducts[0].slug}`}
                      className="w-full sm:w-auto bg-[#8B1E2D] hover:bg-[#64141F] active:scale-[0.98] text-[#F4EBDD] py-3 px-6 rounded-xl font-manrope text-[14px] font-semibold tracking-wider inline-flex items-center justify-center gap-2 transition-colors shrink-0 shadow-xs btn-interactive"
                    >
                      <span>View Your Match →</span>
                    </Link>
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

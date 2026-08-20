import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import MainContainer from '../components/ui/MainContainer';
import SEO from '../components/common/SEO';
import ContactHelpBlock from '../components/common/ContactHelpBlock';

const FAQ_DATA = [
  {
    category: 'ORDERS',
    questions: [
      {
        q: 'How do I place an order?',
        a: "Select the fragrance you'd like to purchase and choose ORDER ON WHATSAPP. WhatsApp will open with the product details, and our team will help confirm your order and delivery information."
      },
      {
        q: 'How does ordering through WhatsApp work?',
        a: "Once you message us, we'll confirm the fragrance, quantity, delivery address and other order details with you before confirming the order."
      },
      {
        q: 'Can I order more than one fragrance?',
        a: "Yes. Tell us which fragrances and quantities you'd like, and we'll confirm availability and the total order details with you."
      },
      {
        q: 'Can I cancel my order?',
        a: "Please contact us on WhatsApp as soon as possible. Cancellation availability depends on whether the order has already been processed or dispatched."
      }
    ]
  },
  {
    category: 'PRODUCTS',
    questions: [
      {
        q: 'What size are ÉLAVA perfumes?',
        a: 'Our current ÉLAVA collection is offered in a 60 ML Eau de Parfum format.'
      },
      {
        q: 'What type of fragrance does ÉLAVA sell?',
        a: 'ÉLAVA currently offers Eau de Parfum fragrances across men\'s, women\'s and unisex collections.'
      },
      {
        q: 'How should I store my perfume?',
        a: 'Keep your fragrance in a cool, dry place away from direct sunlight, excessive heat and sudden temperature changes.'
      }
    ]
  },
  {
    category: 'DELIVERY',
    questions: [
      {
        q: 'Where does ÉLAVA deliver?',
        a: 'For the initial launch, ÉLAVA plans to serve customers across India. Please confirm delivery availability and charges with our team when placing your order.'
      },
      {
        q: 'How long does delivery take?',
        a: 'Delivery timelines will depend on your location and the final shipping arrangement. Our team will confirm the estimated delivery timeline when your order is placed.'
      },
      {
        q: 'How much does shipping cost?',
        a: 'Shipping charges may vary based on the delivery location and order. Our team will confirm the applicable shipping charge before the order is finalized.'
      }
    ]
  },
  {
    category: 'RETURNS',
    questions: [
      {
        q: 'Can I return a perfume after opening it?',
        a: 'Because fragrances are personal-use products, returns of opened or used perfumes may not be accepted. Please review our Returns & Refunds policy or contact us before placing your order if you have any questions.'
      },
      {
        q: 'What if my order arrives damaged?',
        a: 'Please contact us as soon as possible with your order details and clear photos of the package and product. We\'ll review the issue and guide you through the next steps.'
      }
    ]
  },
  {
    category: 'WHATSAPP',
    questions: [
      {
        q: 'What information will I need to provide?',
        a: 'We may ask for your name, phone number, delivery address and order details so we can process and deliver your order.'
      }
    ]
  }
];

function FaqItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#E6E2DA] last:border-b-0">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between py-4 text-left font-sans text-sm font-semibold text-[#171717] hover:text-[#CFA838] transition-colors gap-4"
      >
        <span>{question}</span>
        {isOpen ? (
          <Minus className="w-4 h-4 text-[#77736B] shrink-0" aria-hidden="true" />
        ) : (
          <Plus className="w-4 h-4 text-[#77736B] shrink-0" aria-hidden="true" />
        )}
      </button>
      {isOpen && (
        <div className="pb-4 font-sans text-xs sm:text-sm text-[#555] leading-relaxed pr-6">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="w-full bg-[#F3EDE3] min-h-screen">
      <SEO
        title="FAQ | ÉLAVA Perfumes"
        description="Everything you need to know about ÉLAVA fragrances, ordering through WhatsApp, shipping and delivery."
        canonicalPath="/faq"
      />

      <MainContainer className="py-8 sm:py-10 md:py-14">
        {/* HERO */}
        <section className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-[42px] font-normal uppercase tracking-[0.06em] text-[#171717] leading-tight mb-2">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="font-sans text-xs sm:text-sm text-[#77736B] tracking-wide font-normal">
            "Everything you need to know about ÉLAVA fragrances, ordering and delivery."
          </p>
        </section>

        {/* ACCORDIONS CONTAINER */}
        <div className="max-w-3xl mx-auto space-y-8">
          {FAQ_DATA.map((sec) => (
            <div key={sec.category} className="bg-[#FAF7F2] border border-[#ECE7DE] rounded-xl p-5 sm:p-6">
              <h2 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-[#171717] pb-3 border-b border-[#E6E2DA]">
                {sec.category}
              </h2>
              <div className="mt-1">
                {sec.questions.map((item) => (
                  <FaqItem key={item.q} question={item.q} answer={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* NEED HELP? */}
        <ContactHelpBlock />
      </MainContainer>
    </div>
  );
}

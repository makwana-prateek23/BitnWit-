'use client';

import { useState } from 'react';
import { LuChevronDown } from 'react-icons/lu';

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    id: 'faq-timeline',
    question: 'How quickly can we kick off and what is the typical sprint timeline?',
    answer:
      'We can kick off a new sprint within 5 to 7 business days of agreement. A focused MVP or marketing platform typically takes 3 to 6 weeks, while more complex web, app, or AI workflow systems run across 6 to 10 weeks delivered in bi-weekly deployable milestones.'
  },
  {
    id: 'faq-ownership',
    question: 'Who owns the code, intellectual property, and design files?',
    answer:
      'You retain 100% full ownership of all code, Figma design files, database schemas, and documentation from day one. Upon completion of each sprint, all assets are pushed directly to your organization’s private GitHub repository and cloud accounts.'
  },
  {
    id: 'faq-models',
    question: 'What engagement and pricing models do you offer?',
    answer:
      'We work primarily on milestone-based fixed sprint pricing (so you have guaranteed budget clarity without runaway hourly billing) and ongoing monthly engineering & growth retainers for teams who need dedicated engineering velocity post-launch.'
  },
  {
    id: 'faq-remote',
    question: 'How do you collaborate with remote teams across India and worldwide?',
    answer:
      'We are remote-first by design. We maintain documented async updates, private preview environments, and scheduled weekly milestone reviews. We plan overlapping working hours across Indian Standard Time (IST), GMT, and US time zones to keep collaboration seamless.'
  },
  {
    id: 'faq-takeover',
    question: 'Can you audit or modernize our existing codebase and design system?',
    answer:
      'Yes. Many clients come to us with an existing Next.js, React, Flutter, or legacy application that needs better performance, UI overhaul, or AI integration. We start with a comprehensive code and UX audit, identify technical debt, and plan an incremental refactoring roadmap.'
  }
];

export default function ServicesFaqAccordion() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggleFaq = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  return (
    <div className="mx-auto w-full max-w-4xl space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
              isOpen
                ? 'border-[#4A101A]/30 bg-white shadow-md shadow-[#4A101A]/5'
                : 'border-[#E8E2D8] bg-[#FAF8F5] hover:border-slate-300 hover:bg-white'
            }`}
          >
            <button
              type="button"
              id={`faq-btn-${faq.id}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
              onClick={() => toggleFaq(faq.id)}
              className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4A101A] focus-visible:ring-inset"
            >
              <span className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-slate-400">
                  0{index + 1}
                </span>
                <span className="text-base sm:text-lg font-bold text-ink">
                  {faq.question}
                </span>
              </span>

              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${
                  isOpen
                    ? 'rotate-180 border-[#4A101A] bg-[#4A101A] text-white'
                    : 'border-[#E8E2D8] bg-white text-slate-500'
                }`}
              >
                <LuChevronDown size={16} />
              </span>
            </button>

            <div
              id={`faq-panel-${faq.id}`}
              role="region"
              aria-labelledby={`faq-btn-${faq.id}`}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="overflow-hidden">
                <div className="border-t border-[#E8E2D8] px-5 sm:px-6 pb-6 pt-4">
                  <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

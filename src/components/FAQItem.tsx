import { useState } from 'react';

export default function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-semibold text-gray-900">{question}</span>
        <span className="ml-4 flex-shrink-0 text-brand-green text-xl leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="px-6 py-5 bg-white text-gray-600 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

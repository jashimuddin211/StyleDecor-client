import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    question: "Can I customize a pre-designed decoration package?",
    answer: "Absolutely! Our pre-designed packages act as a base. Once you assign or choose a decorator, you can chat with them directly to specify color themes, add customized floral setups, or modify specific item layouts."
  },
  {
    question: "How do I choose or assign a decorator?",
    answer: "You can visit the 'Meet Decorators' page to view all our expert decorator profiles, their specialty categories, project ratings, and availability status. If you make a booking, it will be assigned to a highly qualified decorator matching your event requirements."
  },
  {
    question: "Is the payment system secure? Can I pay in installments?",
    answer: "Yes, all payments are securely processed through Stripe card gateways. We currently support full booking deposit payments to confirm the decorator's calendar slot, which is held securely until the completion of the project."
  },
  {
    question: "What is your cancellation and reschedule policy?",
    answer: "You can reschedule your event date up to 7 days before the event starts by coordinating directly with your assigned decorator. For cancellations, refunds are subject to decorator approval based on materials already procured."
  }
];

function AccordionItem({ faq, isOpen, onClick }) {
  return (
    <div className="border border-base-300 rounded-2xl overflow-hidden bg-base-100 shadow-sm transition-all duration-200">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left font-semibold text-base-content hover:bg-base-200/50 transition-colors cursor-pointer"
      >
        <span className="text-sm md:text-base pr-4">{faq.question}</span>
        <span className="text-xl shrink-0 select-none text-primary">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <div className="p-5 pt-0 text-xs md:text-sm text-base-content/70 border-t border-base-200 leading-relaxed bg-base-100">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="py-20 bg-base-200 border-t border-b border-base-300 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Got Questions?
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-base-content/60 max-w-xl mx-auto">
            Everything you need to know about bookings, decorators, and customizing styles
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <AccordionItem
              key={index}
              faq={faq}
              isOpen={activeIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

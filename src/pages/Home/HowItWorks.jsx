import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Choose Decorator",
    description: "Browse top-rated event decorators, filter by ratings, and view their project portfolios.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    )
  },
  {
    number: "02",
    title: "Select Service",
    description: "Pick from pre-designed decoration packages or submit custom space specifications.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
        <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
        <polyline points="2 17 12 22 22 17"></polyline>
        <polyline points="2 12 12 17 22 12"></polyline>
      </svg>
    )
  },
  {
    number: "03",
    title: "Book & Pay Securely",
    description: "Confirm dates, request specific details, and make a secure card payment via Stripe.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
        <rect x="2" y="4" width="20" height="16" rx="2" ry="2"></rect>
        <line x1="2" y1="10" x2="22" y2="10"></line>
      </svg>
    )
  },
  {
    number: "04",
    title: "Real-time Tracking",
    description: "Watch your decorator update status steps from 'Assigned' to 'Ready' directly on your dashboard.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
        <polyline points="16 7 22 7 22 13"></polyline>
      </svg>
    )
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-base-100 border-t border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-secondary">
            Process Flow
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
            How It Works
          </h2>
          <p className="text-sm md:text-base text-base-content/60 max-w-xl mx-auto">
            Book highly qualified planners and decorators in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="flex flex-col items-center text-center p-6 bg-base-200 rounded-2xl relative border border-base-300 group hover:border-primary/45 transition-colors"
            >
              {/* Step indicator */}
              <span className="absolute top-4 right-4 text-3xl font-black text-base-content/10 group-hover:text-primary/10 select-none transition-colors">
                {step.number}
              </span>

              {/* Icon container */}
              <div className="w-16 h-16 rounded-2xl bg-base-100 flex items-center justify-center shadow-md mb-6 border border-base-300 group-hover:scale-110 transition-transform duration-200">
                {step.icon}
              </div>

              <h3 className="text-lg font-bold text-base-content mb-3 group-hover:text-primary transition-colors">
                {step.title}
              </h3>
              <p className="text-xs md:text-sm text-base-content/70 leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

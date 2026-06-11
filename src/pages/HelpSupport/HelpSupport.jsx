import { HelpCircle, Mail, Phone, MessageSquare, ArrowRight, ShieldQuestion } from "lucide-react";
import { Link } from "react-router-dom";

const HelpSupport = () => {
  const faqs = [
    {
      q: "How can I book a decorative service?",
      a: "Browse our services page, select a decoration package, click 'View Details', and fill out the booking form. Once submitted, proceed to payment in your dashboard to secure your decorator."
    },
    {
      q: "Can I choose my specific decorator agent?",
      a: "Our administrative team reviews all paid bookings and assigns the most suitable certified decorator based on experience and specialty. However, you can write preferences in the booking details."
    },
    {
      q: "How secure are Stripe credit card payments?",
      a: "Extremely secure. All credit card processing is done securely off-site directly through Stripe checkout. We never store credit card numbers or raw billing tokens on our servers."
    },
    {
      q: "What is your package refund/cancellation policy?",
      a: "You can cancel any booking before payment. For paid bookings, cancellations can be requested up to 72 hours before the scheduled date by contacting support."
    }
  ];

  const categories = [
    {
      title: "Booking & Orders",
      desc: "Guides on selecting, customising packages and tracking decorator status.",
      icon: <HelpCircle className="text-blue-600" size={24} />
    },
    {
      title: "Payments & Stripe",
      desc: "Information about transaction safety, invoices, and Stripe checkout sessions.",
      icon: <ShieldQuestion className="text-purple-600" size={24} />
    },
    {
      title: "Decorator Accounts",
      desc: "Guides for decorators regarding status updates and payment clearances.",
      icon: <MessageSquare className="text-pink-600" size={24} />
    }
  ];

  return (
    <div className="space-y-16 py-12 px-4 max-w-6xl mx-auto animate-fadeIn">
      {/* HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100">
          Support Hub
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mt-2">
          How Can We Help You Today?
        </h1>
        <p className="text-gray-500 text-sm md:text-base">
          Find answers, browse help articles, or reach out to our creative decorators and support consultants.
        </p>
      </div>

      {/* STATS/HELP CATEGORIES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white border border-gray-150 rounded-3xl p-6 shadow-sm hover:shadow-md transition duration-200 group">
            <div className="p-3 bg-gray-50 rounded-2xl w-fit mb-4 group-hover:bg-blue-50 transition">
              {cat.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900">{cat.title}</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{cat.desc}</p>
            <div className="mt-4 flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer">
              Read Guides <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>

      {/* FAQ ACCORDION */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-6 text-center">Frequently Answered FAQs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="p-5 bg-gray-50 border border-gray-100 rounded-2xl space-y-2">
              <h3 className="font-extrabold text-sm text-gray-900">Q: {faq.q}</h3>
              <p className="text-xs text-gray-600 leading-relaxed pl-3 border-l-2 border-blue-500">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CONTACT SECTION CARD */}
      <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight">Still Need Assistance?</h2>
          <p className="text-white/80 text-sm">
            Can't find what you're looking for? Message our help center team directly or call our hotline.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            to="/contact"
            className="px-6 py-3 bg-white text-blue-600 font-bold rounded-2xl shadow-md hover:bg-gray-50 transition text-sm flex items-center gap-1.5"
          >
            <Mail size={16} /> Contact Form
          </Link>
          <a
            href="tel:+8801712345678"
            className="px-6 py-3 bg-blue-700 border border-blue-500/30 text-white font-bold rounded-2xl shadow-md hover:bg-blue-800 transition text-sm flex items-center gap-1.5"
          >
            <Phone size={16} /> Call Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpSupport;

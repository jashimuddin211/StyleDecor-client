import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission delay
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      // Reset success state after a delay
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1200);
  };

  const contactInfo = [
    { label: "Our Headquarters", value: "Level 4, Navana Tower, Gulshan-1, Dhaka 1212", icon: <MapPin size={20} className="text-blue-600" /> },
    { label: "Direct Phone Numbers", value: "+880 1712 345678 / +880 2 9876543", icon: <Phone size={20} className="text-purple-600" /> },
    { label: "Email Queries", value: "info@styledecor.com / support@styledecor.com", icon: <Mail size={20} className="text-pink-600" /> },
    { label: "Office Business Hours", value: "Saturday - Thursday: 9:00 AM - 7:00 PM (GMT+6)", icon: <Clock size={20} className="text-emerald-600" /> }
  ];

  const faqs = [
    { q: "How far in advance should I book my event?", a: "We recommend booking at least 3 to 4 weeks in advance, especially for large weddings or large-scale interior decors, to secure your preferred approved decorator." },
    { q: "Can I customize the decorator packages?", a: "Absolutely! Our services are fully customisable. During booking or directly with your assigned decorator, you can alter specific color schemes, floral types, and design features." },
    { q: "How does the Stripe payment system work?", a: "All transactions are secured by Stripe. You pay a 100% secure deposit or payment directly through the client Payment History view, and the funds are held securely until booking confirmation." }
  ];

  return (
    <div className="space-y-20 py-10 px-4 max-w-7xl mx-auto animate-fadeIn">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full border border-blue-100">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-gray-950 tracking-tight mt-2">
          We Would Love to Hear From You
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-xl mx-auto mt-2">
          Have an upcoming gala, wedding, or interior makeover project? Message our creative consultants today.
        </p>
      </div>

      {/* DUAL WORKSPACE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Details & Map Card (Left) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-gray-950 tracking-tight pb-3 border-b border-gray-50">
              Corporate Office
            </h2>
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-3 bg-gray-50 rounded-2xl border border-gray-50 shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{info.label}</h4>
                    <p className="text-sm font-semibold text-gray-800 mt-1 leading-relaxed">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Map Mock Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm overflow-hidden h-64 relative flex items-center justify-center bg-blue-50/20 border-dashed border-2 border-blue-200">
            <div className="text-center space-y-2 p-6 z-10 relative">
              <MapPin size={32} className="text-blue-600 mx-auto animate-bounce" />
              <h3 className="font-extrabold text-gray-900 text-sm">Gulshan Circle 1, Dhaka</h3>
              <p className="text-xs text-gray-400 max-w-[220px] mx-auto leading-relaxed">
                Visit our experience center to view luxury material catalogs.
              </p>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15"></div>
          </div>
        </div>

        {/* Messaging Form (Right) */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-gray-950 tracking-tight pb-3 border-b border-gray-50">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Adnan Rahman"
                  className="w-full border border-gray-250 bg-white rounded-2xl p-3 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. adnan@gmail.com"
                  className="w-full border border-gray-250 bg-white rounded-2xl p-3 focus:outline-none focus:border-blue-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={e => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Wedding Decor Consultation"
                className="w-full border border-gray-250 bg-white rounded-2xl p-3 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Message / Details</label>
              <textarea
                rows="4"
                required
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your design package requirements, budget, venue, or questions..."
                className="w-full border border-gray-250 bg-white rounded-2xl p-3 focus:outline-none focus:border-blue-500 text-sm"
              />
            </div>

            {formSubmitted && (
              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-xs text-emerald-700 font-bold flex items-center gap-2">
                <Check size={16} /> Message sent successfully! Our events coordinator will contact you shortly.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white font-semibold rounded-2xl shadow-lg shadow-blue-100 transition duration-150 flex items-center justify-center gap-2 border-0"
            >
              {submitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Transmitting...
                </>
              ) : (
                <>
                  <Send size={15} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="space-y-10 pb-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-gray-950 tracking-tight">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-sm">Quick answers to common questions about our decoration workflows.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm space-y-2">
              <h3 className="font-extrabold text-base text-gray-950">Q: {faq.q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed pl-5 border-l-2 border-blue-500">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

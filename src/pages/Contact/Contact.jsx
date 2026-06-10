import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, Check } from "lucide-react";
import { useToast } from "../../provider/ToastProvider";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://style-decor-server-sepia.vercel.app";

const Contact = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.subject.trim() || formData.subject.trim().length < 4) {
      newErrors.subject = "Subject must be at least 4 characters.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the validation errors.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim()
        })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to send message.");
      }
      toast.success("Message sent successfully!");
      setFormSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "An error occurred while sending your message.");
    } finally {
      setSubmitting(false);
    }
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
        <span className="px-3.5 py-1.5 bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest rounded-full border border-primary/20">
          Get In Touch
        </span>
        <h1 className="text-4xl md:text-5xl font-black text-base-content tracking-tight mt-2">
          We Would Love to Hear From You
        </h1>
        <p className="text-base-content/60 text-sm md:text-base max-w-xl mx-auto mt-2">
          Have an upcoming gala, wedding, or interior makeover project? Message our creative consultants today.
        </p>
      </div>

      {/* DUAL WORKSPACE PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

        {/* Contact Details & Map Card (Left) */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-base-200 border border-base-300 rounded-3xl p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-base-content tracking-tight pb-3 border-b border-base-300">
              Corporate Office
            </h2>
            <div className="space-y-6">
              {contactInfo.map((info, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="p-3 bg-base-300 rounded-2xl shrink-0">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-base-content/50 uppercase tracking-wider">{info.label}</h4>
                    <p className="text-sm font-semibold text-base-content mt-1 leading-relaxed">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Mock Card */}
          <div className="bg-base-200 border-2 border-dashed border-primary/30 rounded-3xl p-6 shadow-sm overflow-hidden h-64 relative flex items-center justify-center">
            <div className="text-center space-y-2 p-6 z-10 relative">
              <MapPin size={32} className="text-blue-600 mx-auto animate-bounce" />
              <h3 className="font-extrabold text-base-content text-sm">Gulshan Circle 1, Dhaka</h3>
              <p className="text-xs text-base-content/50 max-w-[220px] mx-auto leading-relaxed">
                Visit our experience center to view luxury material catalogs.
              </p>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
          </div>
        </div>

        {/* Messaging Form (Right) */}
        <div className="lg:col-span-7 bg-base-200 border border-base-300 rounded-3xl p-8 shadow-sm space-y-6">
          <h2 className="text-2xl font-bold text-base-content tracking-tight pb-3 border-b border-base-300">
            Send Us a Message
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-bold uppercase text-base-content/50 mb-1.5">Your Name</label>
                <input
                  type="text"
                  name="name"
                  id="contact-name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Adnan Rahman"
                  className={`w-full bg-base-100 border text-base-content placeholder:text-base-content/30 rounded-2xl p-3 focus:outline-none focus:border-primary text-sm ${errors.name ? 'border-red-500 focus:border-red-500' : 'border-base-300'}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold uppercase text-base-content/50 mb-1.5">Email Address</label>
                <input
                  type="email"
                  name="email"
                  id="contact-email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. adnan@gmail.com"
                  className={`w-full bg-base-100 border text-base-content placeholder:text-base-content/30 rounded-2xl p-3 focus:outline-none focus:border-primary text-sm ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-base-300'}`}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="block text-xs font-bold uppercase text-base-content/50 mb-1.5">Subject</label>
              <input
                type="text"
                name="subject"
                id="contact-subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="e.g. Wedding Decor Consultation"
                className={`w-full bg-base-100 border text-base-content placeholder:text-base-content/30 rounded-2xl p-3 focus:outline-none focus:border-primary text-sm ${errors.subject ? 'border-red-500 focus:border-red-500' : 'border-base-300'}`}
              />
              {errors.subject && (
                <p className="text-red-500 text-xs mt-1" role="alert">{errors.subject}</p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-xs font-bold uppercase text-base-content/50 mb-1.5">Message / Details</label>
              <textarea
                name="message"
                id="contact-message"
                rows="4"
                required
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your design package requirements, budget, venue, or questions..."
                className={`w-full bg-base-100 border text-base-content placeholder:text-base-content/30 rounded-2xl p-3 focus:outline-none focus:border-primary text-sm ${errors.message ? 'border-red-500 focus:border-red-500' : 'border-base-300'}`}
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1" role="alert">{errors.message}</p>
              )}
            </div>

            {formSubmitted && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-2xl text-xs text-success font-bold flex items-center gap-2">
                <Check size={16} /> Message sent successfully! Our events coordinator will contact you shortly.
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full sm:w-auto px-6 py-3.5 bg-primary hover:bg-primary/90 disabled:bg-base-300 disabled:text-base-content/30 text-primary-content font-semibold rounded-2xl shadow-lg transition duration-150 flex items-center justify-center gap-2 border-0"
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
          <h2 className="text-3xl font-extrabold text-base-content tracking-tight">Frequently Asked Questions</h2>
          <p className="text-base-content/50 text-sm">Quick answers to common questions about our decoration workflows.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-sm space-y-2">
              <h3 className="font-extrabold text-base text-base-content">Q: {faq.q}</h3>
              <p className="text-sm text-base-content/60 leading-relaxed pl-5 border-l-2 border-primary">
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
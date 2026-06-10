import { useState } from "react";
import { motion } from "framer-motion";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }
    
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 1200);
  };

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-primary to-secondary text-primary-content rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8"
      >
        {/* Floating background decorative shapes */}
        <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none" />
        <div className="absolute w-64 h-64 bg-white/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none" />

        <div className="flex-1 space-y-3 z-10">
          <span className="inline-block text-xs font-bold px-3 py-1 bg-white/20 backdrop-blur-md rounded-full uppercase tracking-wider border border-white/10">
            Stay Updated
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Subscribe for Style Tips & Offers
          </h2>
          <p className="text-sm md:text-base text-primary-content/80 max-w-md leading-relaxed">
            Get decoration trends, professional design inspiration, and special package discounts sent right to your inbox.
          </p>
        </div>

        <div className="w-full md:w-auto max-w-md z-10">
          {status === "success" ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white/25 backdrop-blur-md border border-white/20 p-6 rounded-2xl text-center md:text-left shadow-lg"
            >
              <h3 className="text-xl font-bold">🎉 Welcome to the Club!</h3>
              <p className="text-sm text-primary-content/95 mt-1.5 leading-relaxed">
                Thank you for subscribing. We've sent a 10% discount code to your email. Check it out!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter your email address"
                  className="input input-bordered w-full sm:w-80 bg-white text-gray-800 placeholder-gray-400 focus:outline-none border-0 rounded-xl"
                  disabled={status === "loading"}
                />
                <button
                  type="submit"
                  className={`btn rounded-xl font-bold px-6 border-0 ${
                    status === "loading"
                      ? "btn-disabled bg-white/50 text-white"
                      : "bg-base-100 hover:bg-base-200 text-primary cursor-pointer shadow-md hover:scale-[1.02] transition-all"
                  }`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-red-200 font-semibold pl-1"
                >
                  ⚠️ Please enter a valid email address.
                </motion.p>
              )}
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
}

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80",
    title: "Elegant Weddings",
    description: "Creating magical, dreamlike settings for your special day.",
    badge: "💍 Wedding Experts"
  },
  {
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=800&q=80",
    title: "Corporate Galas",
    description: "Sophisticated styling that speaks volumes of your company.",
    badge: "💼 Corporate Events"
  },
  {
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
    title: "Vibrant Parties",
    description: "Colorful, lively decors tailored for birthdays and anniversaries.",
    badge: "🎉 Celebration Styling"
  },
  {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    title: "Cozy Home Decor",
    description: "Warm, aesthetic adjustments to make your space feel premium.",
    badge: "🏡 Interior Decor"
  }
];

export default function Hero() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  return (
    <div className="relative h-[60vh] md:h-[65vh] lg:h-[70vh] min-h-[500px] max-h-[680px] flex items-center bg-base-200 overflow-hidden px-6 lg:px-20 border-b border-base-300">

      {/* 🌈 Floating Background Blob */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          rotate: [0, 180, 360],
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[450px] h-[450px] bg-primary/15 blur-3xl top-[-100px] left-[-100px] pointer-events-none"
      />

      {/* LEFT CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex-1 pr-0 lg:pr-10"
      >
        <motion.div variants={item} className="badge badge-primary gap-1 mb-3 font-semibold px-3 py-2 border-0">
          StyleDecor System
        </motion.div>

        <motion.h1
          variants={item}
          className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-base-content"
        >
          Design <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Unforgettable</span> Events ✨
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-4 text-base-content/70 max-w-lg text-sm md:text-base leading-relaxed"
        >
          Smart booking system for weddings, home decoration, and ceremonies.
          Choose decorators, schedule events, and track everything in real-time.
        </motion.p>

        <motion.div variants={item} className="mt-6 flex gap-3 flex-wrap">
          <button
            onClick={() => navigate("/services")}
            className="btn btn-primary px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-all duration-200 border-0 bg-gradient-to-r from-primary to-secondary text-primary-content font-bold cursor-pointer"
          >
            Book Now
          </button>

          <button
            onClick={() => navigate("/decorators")}
            className="btn btn-outline btn-primary px-6 hover:scale-105 transition-all duration-200 font-semibold cursor-pointer"
          >
            Meet Decorators
          </button>
        </motion.div>
      </motion.div>

      {/* RIGHT INTERACTIVE IMAGE CAROUSEL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 hidden lg:flex justify-center items-center relative z-10"
      >
        <div className="relative w-[480px] h-[340px] rounded-2xl shadow-2xl overflow-hidden border border-base-300 group">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={HERO_SLIDES[currentSlide].image}
                alt={HERO_SLIDES[currentSlide].title}
                className="w-full h-full object-cover select-none"
              />
              
              {/* Dark vignette overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* Text caption inside slide */}
              <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                <span className="inline-block text-xs font-semibold px-2 py-1 bg-white/20 backdrop-blur-md rounded-md mb-1.5 border border-white/10">
                  {HERO_SLIDES[currentSlide].badge}
                </span>
                <h3 className="text-xl font-bold tracking-tight">{HERO_SLIDES[currentSlide].title}</h3>
                <p className="text-xs text-white/80 mt-1">{HERO_SLIDES[currentSlide].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20 cursor-pointer"
            aria-label="Next slide"
          >
            ❯
          </button>

          {/* Indicators Dots */}
          <div className="absolute bottom-3 right-5 flex gap-1.5 z-20">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentSlide(i);
                }}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  currentSlide === i
                    ? "bg-primary w-4"
                    : "bg-white/50 hover:bg-white"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

    </div>
  );
}
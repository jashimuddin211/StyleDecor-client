import { motion } from "framer-motion";

const REVIEWS = [
  {
    name: "Nabil Ahmed",
    role: "Groom",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    decoratorName: "Anisur Rahman",
    comment: "The wedding stage decoration was absolutely magical! Anisur translated our vision into reality perfectly. Highly recommend his services.",
    date: "May 2026"
  },
  {
    name: "Sabrina Jahan",
    role: "Homeowner",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    decoratorName: "Farhana Yasmin",
    comment: "Loved the home decoration package! Farhana made our cozy birthday ceremony feel extremely premium. The lighting setup was a huge hit.",
    date: "April 2026"
  },
  {
    name: "Rahat Kabir",
    role: "Event Manager",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4,
    decoratorName: "Zahid Hasan",
    comment: "Excellent execution on our corporate gala. Zahid's team was professional, prompt, and paid close attention to our brand colors and setup details.",
    date: "June 2026"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Customer Stories
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
          What Our Clients Say
        </h2>
        <p className="text-sm md:text-base text-base-content/60 max-w-xl mx-auto">
          Hear from brides, grooms, and organizers who transformed their spaces with StyleDecor
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={review.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow"
          >
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 text-warning mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span key={i} className="text-lg">★</span>
                ))}
                {Array.from({ length: 5 - review.rating }).map((_, i) => (
                  <span key={i} className="text-lg text-base-300">★</span>
                ))}
              </div>

              {/* Review Text */}
              <p className="text-sm md:text-base text-base-content/80 italic leading-relaxed mb-6">
                "{review.comment}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-3 border-t border-base-200 pt-4 mt-auto">
              <img
                src={review.avatar}
                alt={review.name}
                className="w-10 h-10 rounded-full object-cover border border-base-300"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-bold text-base-content truncate">{review.name}</h4>
                <p className="text-xs text-base-content/50 truncate">
                  {review.role} • {review.date}
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="inline-block text-[10px] font-bold px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                  Booked: {review.decoratorName.split(" ")[0]}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

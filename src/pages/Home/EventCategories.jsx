import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    id: "wedding",
    name: "Weddings & Reception",
    description: "Enchanting decorations, floral arrangements, and stage setups for your big day.",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80",
    badge: "Most Popular",
    color: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: "home",
    name: "Home & Ceremony",
    description: "Elegant and cozy indoor setups for birthdays, anniversaries, and family get-togethers.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
    badge: "Trending",
    color: "from-amber-500/20 to-orange-500/20"
  },
  {
    id: "office",
    name: "Corporate & Office",
    description: "Professional decoration styling for corporate conferences, banquets, and grand openings.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80",
    badge: "Sleek",
    color: "from-blue-500/20 to-indigo-500/20"
  }
];

export default function EventCategories() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-12 space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">
          Explore Themes
        </p>
        <h2 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
          Browse by Category
        </h2>
        <p className="text-sm md:text-base text-base-content/60 max-w-xl mx-auto">
          Tailored decorations and custom design themes crafted for every occasion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CATEGORIES.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -6 }}
            className="card bg-base-100 shadow-xl border border-base-300 overflow-hidden relative flex flex-col h-full group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <span className="absolute top-3 right-3 badge badge-primary font-bold text-xs py-1 border-0">
                {cat.badge}
              </span>
            </div>

            <div className={`p-6 flex-1 flex flex-col bg-gradient-to-br ${cat.color}`}>
              <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                {cat.name}
              </h3>
              <p className="text-sm text-base-content/70 mt-2 flex-1 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-5">
                <Link
                  to={`/services?category=${cat.id}`}
                  className="btn btn-primary btn-sm rounded-lg w-full font-semibold border-0 text-white cursor-pointer"
                >
                  Explore Packages →
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

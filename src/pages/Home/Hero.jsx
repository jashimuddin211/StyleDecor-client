import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center bg-base-200 overflow-hidden px-6 lg:px-20">

      {/* 🌈 Floating Background Blob */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute w-[500px] h-[500px] bg-primary/20 blur-3xl top-[-100px] left-[-100px]"
      />

      {/* LEFT CONTENT */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex-1"
      >

        <motion.div variants={item} className="badge badge-primary mb-4">
          StyleDecor System
        </motion.div>

        <motion.h1
          variants={item}
          className="text-4xl md:text-5xl lg:text-6xl font-bold"
        >
          Design <span className="text-primary">Unforgettable</span> Events ✨
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 text-gray-500 max-w-xl text-lg"
        >
          Smart booking system for weddings, home decoration, and ceremonies.
          Choose decorators, schedule events, and track everything in real-time.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex gap-4 flex-wrap">

          <button
            onClick={() => navigate("/services")}
            className="btn btn-primary"
          >
            Book Now
          </button>

          <button
            onClick={() => navigate("/decorators")}
            className="btn btn-outline btn-primary"
          >
            Meet Decorators
          </button>

        </motion.div>

      </motion.div>

      {/* RIGHT IMAGE WITH HOVER FLOAT */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="flex-1 hidden lg:flex justify-center relative z-10"
      >

        <motion.img
          src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
          className="w-[480px] rounded-2xl shadow-2xl"
          animate={{ y: [0, -15, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating mini badge */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-10 right-10 bg-white shadow-lg p-3 rounded-xl"
        >
          💍 Wedding Experts
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="absolute bottom-10 left-10 bg-white shadow-lg p-3 rounded-xl"
        >
          🎉 Event Planning
        </motion.div>

      </motion.div>

    </div>
  );
}
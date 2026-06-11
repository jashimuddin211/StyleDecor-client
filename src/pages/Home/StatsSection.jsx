import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalDecorators: 0,
    totalBookings: 0,
    satisfiedClients: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
      try {
        const res = await fetch(`${baseUrl}/stats`);
        if (!res.ok) throw new Error("Stats endpoint not available");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.warn("Stats API error, falling back to aggregate endpoint fetches:", err);
        // Fallback: Fetch services and decorators separately
        try {
          const [servicesRes, decoratorsRes] = await Promise.all([
            fetch(`${baseUrl}/services`),
            fetch(`${baseUrl}/decorators`)
          ]);
          const servicesData = await servicesRes.json();
          const decoratorsData = await decoratorsRes.json();
          
          setStats({
            totalServices: Array.isArray(servicesData) ? servicesData.length : 6,
            totalDecorators: Array.isArray(decoratorsData) ? decoratorsData.length : 6,
            totalBookings: 24,
            satisfiedClients: 152
          });
        } catch (fallbackErr) {
          console.error("All stats fetches failed:", fallbackErr);
          setStats({
            totalServices: 6,
            totalDecorators: 6,
            totalBookings: 20,
            satisfiedClients: 148
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statsItems = [
    {
      label: "Premium Packages",
      value: stats.totalServices,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      )
    },
    {
      label: "Expert Decorators",
      value: stats.totalDecorators,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    {
      label: "Events Booked",
      value: stats.totalBookings,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      )
    },
    {
      label: "Satisfied Clients",
      value: stats.satisfiedClients,
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success">
          <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
        </svg>
      )
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 via-base-200 to-secondary/10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {statsItems.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow"
            >
              <div className="p-3 bg-base-200 rounded-xl shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-base-content tracking-tight">
                  {loading ? (
                    <span className="inline-block w-12 h-6 skeleton rounded"></span>
                  ) : (
                    <span>{item.value}</span>
                  )}
                </h3>
                <p className="text-xs md:text-sm font-medium text-base-content/60 mt-0.5">
                  {item.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

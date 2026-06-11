import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SkeletonCard = () => (
  <div className="card bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-md h-full flex flex-col p-4 gap-3 animate-pulse">
    <div className="bg-base-300 h-48 w-full rounded-xl" />
    <div className="bg-base-300 h-6 w-2/3 rounded" />
    <div className="bg-base-300 h-4 w-1/3 rounded" />
    <div className="bg-base-300 h-10 w-full rounded" />
    <div className="bg-base-300 h-10 w-full rounded-xl mt-auto" />
  </div>
);

const HomeServices = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
        fetch(`${baseUrl}/services`)
            .then(res => res.json())
            .then(data => {
                const servicesList = Array.isArray(data) ? data : (data.services || []);
                setServices(servicesList.slice(0, 4));
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <section className="w-11/12 mx-auto py-16">
            <div className="text-center mb-12 space-y-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary">
                  Our Packages
                </p>
                <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
                    Featured Decoration Packages
                </h1>
                <p className="text-sm md:text-base text-base-content/60 max-w-xl mx-auto">
                    Explore our top-rated, fully custom styling options for weddings, home decor, and ceremonies.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
                ) : (
                    services.map(service => (
                        <div
                            key={service._id}
                            className="card bg-base-100 border border-base-300 rounded-2xl shadow-md hover:shadow-lg hover:border-base-content/20 transition-all duration-200 flex flex-col h-full overflow-hidden"
                        >
                            <figure className="relative h-48 overflow-hidden shrink-0">
                                <img
                                    src={service.image}
                                    alt={service.service_name}
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                                />
                                <span className="absolute top-3 left-3 badge badge-primary font-bold text-xs uppercase border-0">
                                    {service.service_category}
                                </span>
                            </figure>

                            <div className="p-5 flex-1 flex flex-col">
                                <h2 className="text-lg font-bold text-base-content leading-tight mb-1.5 truncate">
                                    {service.service_name}
                                </h2>
                                
                                <p className="text-xs text-base-content/60 line-clamp-2 mb-4 leading-relaxed flex-1">
                                    {service.description}
                                </p>

                                {/* Meta Information */}
                                <div className="border-t border-base-200 pt-3 mt-auto space-y-2 text-xs text-base-content/70">
                                    <div className="flex justify-between items-center">
                                        <span className="flex items-center gap-1">
                                            📍 {service.location || "Bangladesh"}
                                        </span>
                                        <span className="flex items-center gap-0.5 text-warning font-semibold">
                                            ★ {service.rating || "4.8"}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-base-200 pb-3">
                                        <span className="font-semibold text-base-content">Unit: {service.unit || "event"}</span>
                                        <span className="text-sm font-black text-primary">৳ {service.cost}</span>
                                    </div>
                                </div>

                                <Link
                                    to={`/services/${service._id}`}
                                    className="w-full mt-3 block"
                                >
                                    <button className="btn btn-primary btn-sm rounded-xl w-full border-0 font-bold text-white cursor-pointer hover:scale-[1.02] transition-transform">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className="text-center mt-10">
                <Link to="/services">
                    <button className="btn btn-outline px-8 rounded-xl font-semibold cursor-pointer">
                        Show All Services →
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default HomeServices;
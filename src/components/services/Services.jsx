import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const SkeletonCard = () => (
  <div className="card bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-md h-full flex flex-col p-4 gap-3 animate-pulse">
    <div className="bg-base-300 h-48 w-full rounded-xl" />
    <div className="bg-base-300 h-6 w-2/3 rounded" />
    <div className="bg-base-300 h-4 w-1/3 rounded" />
    <div className="bg-base-300 h-10 w-full rounded" />
    <div className="bg-base-300 h-10 w-full rounded-xl mt-auto" />
  </div>
);

const Services = () => {
    const [searchParams] = useSearchParams();
    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    
    const limit = 8; // 8 items per page = 2 rows of 4 cards on desktop

    useEffect(() => {
        setLoading(true);
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
        fetch(
            `${baseUrl}/services?search=${search}&category=${category}&min=${min}&max=${max}&sort=${sort}&page=${page}&limit=${limit}`
        )
            .then(res => res.json())
            .then(data => {
                if (data && data.services) {
                    setServices(data.services);
                    setTotalPages(data.totalPages || 1);
                } else {
                    setServices(Array.isArray(data) ? data : []);
                    setTotalPages(1);
                }
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [search, category, min, max, sort, page]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setPage(1);
    };

    const handleMinChange = (e) => {
        setMin(e.target.value);
        setPage(1);
    };

    const handleMaxChange = (e) => {
        setMax(e.target.value);
        setPage(1);
    };

    const handleSortChange = (e) => {
        setSort(e.target.value);
        setPage(1);
    };

    return (
        <div className="w-11/12 mx-auto py-10">
            <div className="text-center mb-10 space-y-2">
                <h1 className="text-4xl font-extrabold text-base-content tracking-tight">
                    Explore Decoration Services
                </h1>
                <p className="text-sm text-base-content/60 max-w-xl mx-auto">
                    Browse and filter through our full catalog of wedding receptions, corporate styling, and cozy home setups.
                </p>
            </div>

            {/* Control Panel: Filters & Sorting */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-10 bg-base-200 p-5 rounded-2xl border border-base-300 shadow-sm">
                <div>
                    <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Search</label>
                    <input
                        type="text"
                        placeholder="Search packages..."
                        className="input input-bordered w-full text-sm rounded-xl"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </div>

                <div>
                    <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Category</label>
                    <select
                        className="select select-bordered w-full text-sm rounded-xl"
                        value={category}
                        onChange={handleCategoryChange}
                    >
                        <option value="">All Categories</option>
                        <option value="wedding">Wedding</option>
                        <option value="home">Home</option>
                        <option value="office">Office</option>
                    </select>
                </div>

                <div>
                    <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Sort Price</label>
                    <select
                        className="select select-bordered w-full text-sm rounded-xl"
                        value={sort}
                        onChange={handleSortChange}
                    >
                        <option value="">Default Order</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>

                <div>
                    <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Min Budget</label>
                    <input
                        type="number"
                        placeholder="Min (৳)"
                        className="input input-bordered w-full text-sm rounded-xl"
                        value={min}
                        onChange={handleMinChange}
                    />
                </div>

                <div>
                    <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Max Budget</label>
                    <input
                        type="number"
                        placeholder="Max (৳)"
                        className="input input-bordered w-full text-sm rounded-xl"
                        value={max}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    Array.from({ length: 8 }).map((_, idx) => <SkeletonCard key={idx} />)
                ) : services.length === 0 ? (
                    <div className="text-center py-20 col-span-full space-y-2 bg-base-100 border border-base-300 rounded-2xl">
                        <span className="text-4xl block">🔍</span>
                        <h2 className="text-lg font-bold text-base-content">No services found</h2>
                        <p className="text-xs text-base-content/50">Try adjusting your filters or search terms.</p>
                    </div>
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

                                {/* Meta Info */}
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

                                <Link to={`/services/${service._id}`} className="w-full mt-3 block">
                                    <button className="btn btn-primary btn-sm rounded-xl w-full border-0 font-bold text-white cursor-pointer hover:scale-[1.02] transition-transform">
                                        View Details
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="btn btn-outline btn-sm rounded-xl cursor-pointer"
                    >
                        ❮ Prev
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`btn btn-sm rounded-xl cursor-pointer ${
                                page === i + 1 ? "btn-primary text-white border-0" : "btn-outline"
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="btn btn-outline btn-sm rounded-xl cursor-pointer"
                    >
                        Next ❯
                    </button>
                </div>
            )}
        </div>
    );
};

export default Services;
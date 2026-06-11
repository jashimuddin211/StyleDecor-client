import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthContext";

const ServiceDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [service, setService] = useState(null);
    const [relatedServices, setRelatedServices] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activeImage, setActiveImage] = useState("");
    const [activeTab, setActiveTab] = useState("specs"); // specs or reviews

    useEffect(() => {
        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
        
        // Fetch current service details
        axios
            .get(`${baseUrl}/services/${id}`)
            .then(res => {
                setService(res.data);
                setActiveImage(res.data?.image || "");
                
                // Fetch all services to filter related services in same category
                axios.get(`${baseUrl}/services`)
                    .then(allRes => {
                        const allData = Array.isArray(allRes.data) ? allRes.data : (allRes.data.services || []);
                        const filtered = allData.filter(
                            item => item.service_category === res.data.service_category && item._id !== id
                        );
                        setRelatedServices(filtered.slice(0, 3));
                    })
                    .catch(err => console.error("Error fetching related items:", err));
            })
            .catch(err => console.error("Error fetching service:", err));
    }, [id]);

    if (!service) {
        return (
            <div className="flex justify-center items-center py-20">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    // Dynamic gallery images based on category
    const extraImages = service.service_category === "wedding"
      ? ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80"]
      : service.service_category === "office"
      ? ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=600&q=80"]
      : ["https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80", "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80"];
    
    const gallery = [service.image, ...extraImages];

    const specs = [
      { name: "Service Type", value: "Custom Event Decoration" },
      { name: "Setup Lead Time", value: "3 - 5 business days notice required" },
      { name: "On-site Installation", value: "6 - 10 Hours setup window" },
      { name: "Materials Provided", value: "Metal backdrops, LED ambient lights, artificial floral strings, drapes, and stands" },
      { name: "Customization options", value: "Color theme modifications, add-on ceiling details, table setting alignment" }
    ];

    const reviews = [
      { id: 1, author: "Ayesha Khan", rating: 5, date: "May 24, 2026", text: "The floral stage arrangements were absolutely breathtaking! Highly recommend this service package." },
      { id: 2, author: "Imran Chowdhury", rating: 5, date: "April 15, 2026", text: "Extremely professional decorators. Handled the entire corporate hall setup within 6 hours. Excellent lights." }
    ];

    const handleBooking = (e) => {
        e.preventDefault();

        if (!user) {
            alert("Please login first to book a service");
            return;
        }

        const form = e.target;
        const booking = {
            serviceId: service._id,
            serviceName: service.service_name,
            price: service.cost,
            userEmail: user.email,
            userName: user.displayName,
            date: form.date.value,
            location: form.location.value,
            status: "Assigned",
            createdAt: new Date()
        };

        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

        fetch(`${baseUrl}/bookings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setShowModal(false);
                    alert("Booking Successful!");
                } else {
                    alert(`Booking Failed: ${data.message || "Unauthorized or missing credentials"}`);
                }
            })
            .catch(err => {
                console.error("Booking error:", err);
                alert("An error occurred while placing the booking.");
            });
    };

    return (
        <div className="w-11/12 mx-auto py-10">
            {/* SERVICE DETAILS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Media Section: Interactive Image Gallery */}
                <div className="space-y-4">
                    <div className="w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-base-300 relative bg-base-200">
                        <img
                            src={activeImage}
                            className="w-full h-full object-cover transition-all duration-300"
                            alt={service.service_name}
                        />
                    </div>
                    {/* Thumbnail List */}
                    <div className="flex gap-3 overflow-x-auto pb-1 select-none">
                        {gallery.map((imgUrl, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(imgUrl)}
                                className={`w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                                    activeImage === imgUrl ? "border-primary scale-95" : "border-base-300 opacity-70 hover:opacity-100"
                                }`}
                            >
                                <img src={imgUrl} className="w-full h-full object-cover" alt="thumbnail" />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Panel */}
                <div className="flex flex-col justify-between">
                    <div className="space-y-4">
                        <span className="badge badge-primary font-bold text-xs uppercase border-0 px-3 py-2">
                            {service.service_category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-base-content tracking-tight">
                            {service.service_name}
                        </h1>

                        <div className="flex items-center gap-4 text-sm text-base-content/60">
                            <span className="flex items-center gap-0.5 text-warning font-bold">
                                ★ 4.9 (2 customer reviews)
                            </span>
                            <span>•</span>
                            <span>📍 Dhaka & Nearby Districts</span>
                        </div>

                        <p className="text-base-content/75 text-sm md:text-base leading-relaxed">
                            {service.description}
                        </p>

                        <div className="bg-base-200 p-4 rounded-xl border border-base-300 inline-block">
                            <p className="text-xs text-base-content/50 font-bold uppercase tracking-wider">Package Cost</p>
                            <p className="text-2xl md:text-3xl font-black text-primary mt-1">
                                ৳ {service.cost} <span className="text-xs text-base-content/60 font-medium">/ {service.unit || "event"}</span>
                            </p>
                        </div>
                    </div>

                    {user && (user.role === "admin" || user.role === "decorator") ? (
                        <div className="mt-6 flex flex-col items-start gap-1">
                            <button
                                disabled
                                className="btn btn-disabled bg-base-300 text-base-content/40 rounded-xl px-10 border-0 font-bold cursor-not-allowed shadow-none"
                            >
                                Booking Restricted
                            </button>
                            <p className="text-xs text-error font-medium">
                                Only customers can book this services.
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowModal(true)}
                            className="btn btn-primary rounded-xl px-10 mt-6 shadow-lg shadow-primary/20 hover:scale-105 transition-transform duration-200 border-0 bg-gradient-to-r from-primary to-secondary text-white font-bold cursor-pointer"
                        >
                            Book This Package Now
                        </button>
                    )}
                </div>
            </div>

            {/* TAB CONTENT: SPECS & REVIEWS */}
            <div className="mt-16 bg-base-100 border border-base-300 rounded-2xl p-6 md:p-8">
                <div className="flex border-b border-base-200 gap-4 mb-6">
                    <button
                        onClick={() => setActiveTab("specs")}
                        className={`pb-3 text-sm md:text-base font-bold transition-all border-b-2 cursor-pointer ${
                            activeTab === "specs"
                                ? "border-primary text-primary"
                                : "border-transparent text-base-content/60 hover:text-base-content"
                        }`}
                    >
                        Key Specifications
                    </button>
                    <button
                        onClick={() => setActiveTab("reviews")}
                        className={`pb-3 text-sm md:text-base font-bold transition-all border-b-2 cursor-pointer ${
                            activeTab === "reviews"
                                ? "border-primary text-primary"
                                : "border-transparent text-base-content/60 hover:text-base-content"
                        }`}
                    >
                        Reviews ({reviews.length})
                    </button>
                </div>

                {activeTab === "specs" ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <tbody>
                                {specs.map((spec, idx) => (
                                    <tr key={idx} className="border-b border-base-200/50">
                                        <td className="font-bold text-base-content/80 text-xs md:text-sm py-4 w-1/3 md:w-1/4">
                                            {spec.name}
                                        </td>
                                        <td className="text-base-content/70 text-xs md:text-sm py-4">
                                            {spec.value}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {reviews.map(rev => (
                            <div key={rev.id} className="border-b border-base-200/50 pb-5 last:border-b-0">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="font-bold text-sm md:text-base">{rev.author}</h4>
                                    <span className="text-xs text-base-content/40">{rev.date}</span>
                                </div>
                                <div className="flex text-warning text-sm mb-2">
                                    {Array.from({ length: rev.rating }).map((_, i) => (
                                        <span key={i}>★</span>
                                    ))}
                                </div>
                                <p className="text-xs md:text-sm text-base-content/70 italic">
                                    "{rev.text}"
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* RELATED ITEMS SECTION */}
            {relatedServices.length > 0 && (
                <div className="mt-16 border-t border-base-300 pt-10">
                    <h3 className="text-2xl font-extrabold text-base-content mb-6">
                        Related Packages You May Like
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {relatedServices.map(item => (
                            <div
                                key={item._id}
                                className="card bg-base-100 border border-base-300 rounded-2xl shadow-md hover:shadow-lg hover:border-base-content/20 transition-all duration-200 flex flex-col h-full overflow-hidden"
                            >
                                <figure className="relative h-44 overflow-hidden shrink-0">
                                    <img src={item.image} className="w-full h-full object-cover" alt={item.service_name} />
                                    <span className="absolute top-3 left-3 badge badge-primary font-bold text-xs uppercase border-0">
                                        {item.service_category}
                                    </span>
                                </figure>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h4 className="font-bold text-base-content truncate mb-1 leading-tight">
                                        {item.service_name}
                                    </h4>
                                    <p className="text-xs text-base-content/60 line-clamp-2 mb-3 leading-relaxed flex-1">
                                        {item.description}
                                    </p>
                                    <div className="border-t border-base-200 pt-2 mt-auto flex justify-between items-center text-xs text-base-content/75 mb-3">
                                        <span>📍 Bangladesh</span>
                                        <span className="font-bold text-primary">৳ {item.cost}</span>
                                    </div>
                                    <Link to={`/services/${item._id}`} className="w-full">
                                        <button className="btn btn-primary btn-sm rounded-xl w-full border-0 font-bold text-white cursor-pointer hover:scale-[1.02] transition-transform">
                                            View Details
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* BOOKING MODAL */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4 z-50">
                    <div className="bg-base-100 p-6 rounded-2xl w-full max-w-md border border-base-300 shadow-2xl relative">
                        <h2 className="text-2xl font-extrabold text-base-content mb-4 tracking-tight">
                            Book Service Package
                        </h2>

                        <form onSubmit={handleBooking} className="space-y-4">
                            <div>
                                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Full Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || "Guest Customer"}
                                    disabled
                                    className="input input-bordered w-full text-sm rounded-xl bg-base-200"
                                />
                            </div>

                            <div>
                                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Email Address</label>
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="input input-bordered w-full text-sm rounded-xl bg-base-200"
                                />
                            </div>

                            <div>
                                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Event Date</label>
                                <input
                                    name="date"
                                    type="date"
                                    className="input input-bordered w-full text-sm rounded-xl"
                                    required
                                />
                            </div>

                            <div>
                                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/60 p-1">Event Location</label>
                                <input
                                    name="location"
                                    type="text"
                                    placeholder="Enter full address of venue"
                                    className="input input-bordered w-full text-sm rounded-xl"
                                    required
                                />
                            </div>

                            <div className="flex gap-3 pt-3">
                                <button
                                    type="submit"
                                    className="btn btn-primary flex-1 rounded-xl border-0 font-bold text-white cursor-pointer"
                                >
                                    Confirm Booking
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="btn btn-outline flex-1 rounded-xl font-semibold cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceDetails;
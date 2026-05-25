import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../provider/AuthContext";

const ServiceDetails = () => {

    const { id } = useParams();
    const { user } = useContext(AuthContext);

    const [service, setService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios
            .get(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/services/${id}`)
            .then(res => setService(res.data));
    }, [id]);

    if (!service) {
        return (
            <p className="text-center mt-10">
                Loading...
            </p>
        );
    }

    // BOOKING SUBMIT
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

        fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("access-token")}`
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
            <div className="grid md:grid-cols-2 gap-10">

                <img
                    src={service.image}
                    className="rounded-xl w-full h-[400px] object-cover"
                    alt="service"
                />

                <div>

                    <h1 className="text-4xl font-bold">
                        {service.service_name}
                    </h1>

                    <p className="mt-3 text-gray-500">
                        {service.description}
                    </p>

                    <p className="mt-4 text-xl font-bold">
                        Category: {service.service_category}
                    </p>

                    <p className="mt-2 text-2xl font-bold text-primary">
                        ৳ {service.cost}
                    </p>

                    <button
                        onClick={() => setShowModal(true)}
                        className="btn btn-primary mt-6"
                    >
                        Book Now
                    </button>

                </div>
            </div>

            {/* MODAL */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center px-4">

                        <div className="bg-white p-6 rounded-xl w-full max-w-md">

                            <h2 className="text-2xl font-bold mb-4">
                                Book Service
                            </h2>

                            <form onSubmit={handleBooking} className="space-y-3">

                                {/* USER NAME */}
                                <input
                                    type="text"
                                    value={user?.displayName || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />

                                {/* USER EMAIL */}
                                <input
                                    type="email"
                                    value={user?.email || ""}
                                    disabled
                                    className="input input-bordered w-full"
                                />

                                {/* DATE */}
                                <input
                                    name="date"
                                    type="date"
                                    className="input input-bordered w-full"
                                    required
                                />

                                {/* LOCATION */}
                                <input
                                    name="location"
                                    type="text"
                                    placeholder="Event Location"
                                    className="input input-bordered w-full"
                                    required
                                />

                                {/* BUTTONS (FIXED INSIDE CARD) */}
                                <div className="flex gap-3 pt-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-1"
                                    >
                                        Confirm
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="btn btn-outline flex-1"
                                    >
                                        Cancel
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>
                )
            }

        </div>
    );
};

export default ServiceDetails;
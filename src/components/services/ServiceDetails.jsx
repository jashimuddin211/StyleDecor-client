import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ServiceDetails = () => {

    const { id } = useParams();
    const [service, setService] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // fake user (replace with auth later)
    const user = {
        email: "user@gmail.com",
        displayName: "Test User"
    };

    useEffect(() => {
        axios
            .get(`http://localhost:4000/services/${id}`)
            .then(res => setService(res.data));
    }, [id]);

    if (!service) {
        return <p className="text-center mt-10">Loading...</p>;
    }

    // submit booking
    const handleBooking = (e) => {
        e.preventDefault();

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

        fetch("http://localhost:4000/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setShowModal(false);
                alert("Booking Successful!");
            });
    };

    return (
        <div className="w-11/12 mx-auto py-10">

            {/* Service Info */}
            <div className="grid md:grid-cols-2 gap-10">

                <img
                    src={service.image}
                    className="rounded-xl w-full h-[400px] object-cover"
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

            {/* BOOKING MODAL */}
            {
                showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">

                        <div className="bg-white p-6 rounded-xl w-[400px]">

                            <h2 className="text-2xl font-bold mb-4">
                                Book Service
                            </h2>

                            <form onSubmit={handleBooking} className="space-y-3">

                                {/* auto filled */}
                                <input
                                    type="text"
                                    value={user.displayName}
                                    disabled
                                    className="input input-bordered w-full"
                                />

                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="input input-bordered w-full"
                                />

                                {/* user input */}
                                <input
                                    name="date"
                                    type="date"
                                    className="input input-bordered w-full"
                                    required
                                />

                                <input
                                    name="location"
                                    type="text"
                                    placeholder="Event Location"
                                    className="input input-bordered w-full"
                                    required
                                />

                                <div className="flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-full"
                                    >
                                        Confirm Booking
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                        className="btn w-full"
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
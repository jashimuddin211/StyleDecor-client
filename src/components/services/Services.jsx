import { useEffect, useState } from "react";
import { Link } from "react-router";

const Services = () => {

    const [services, setServices] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [min, setMin] = useState("");
    const [max, setMax] = useState("");

    useEffect(() => {

        fetch(
            `http://localhost:4000/services?search=${search}&category=${category}&min=${min}&max=${max}`
        )
            .then(res => res.json())
            .then(data => setServices(data))

    }, [search, category, min, max]);


    return (

        <div className="w-11/12 mx-auto py-10">

            <h1 className="text-4xl font-bold text-center mb-10">
                Our Services
            </h1>


            {/* Filters */}

            <div className="grid md:grid-cols-4 gap-4 mb-10">

                <input
                    type="text"
                    placeholder="Search service..."
                    className="input input-bordered w-full"
                    onChange={(e) =>
                        setSearch(e.target.value)
                    }
                />


                <select
                    className="select select-bordered w-full"
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                >

                    <option value="">
                        All Categories
                    </option>

                    <option value="wedding">
                        Wedding
                    </option>

                    <option value="home">
                        Home
                    </option>

                    <option value="office">
                        Office
                    </option>

                </select>



                <input
                    type="number"
                    placeholder="Min Budget"
                    className="input input-bordered w-full"
                    onChange={(e) =>
                        setMin(e.target.value)
                    }
                />


                <input
                    type="number"
                    placeholder="Max Budget"
                    className="input input-bordered w-full"
                    onChange={(e) =>
                        setMax(e.target.value)
                    }
                />

            </div>



            {/* Cards */}

            <div className="grid md:grid-cols-3 gap-8">

                {

                    services.map(service => (

                        <div
                            key={service._id}

                            className="
                            card
                            bg-base-100
                            shadow-xl
                            border
                            flex
                            flex-col
                            h-full"
                        >

                            <figure>

                                <img
                                    src={service.image}
                                    alt=""
                                    className="
                                    h-60
                                    w-full
                                    object-cover"
                                />

                            </figure>



                            <div
                                className="
                                card-body
                                flex
                                flex-col
                                .flex-grow"
                            >

                                <h2
                                    className="
                                    card-title
                                    text-2xl"
                                >

                                    {service.service_name}

                                </h2>



                                <p className="text-gray-500">

                                    Category :
                                    {service.service_category}

                                </p>



                                <p
                                    className="
                                    .flex-grow
                                    line-clamp-3"
                                >

                                    {service.description}

                                </p>



                                <h3
                                    className="
                                    text-xl
                                    font-bold"
                                >

                                    ৳ {service.cost}

                                </h3>



                                <Link to={`/services/${service._id}`}>
    <button className="btn btn-primary mt-4">
        View Details
    </button>
</Link>

                            </div>

                        </div>

                    ))

                }

            </div>



            {

                services.length === 0 &&

                <h2
                    className="
                    text-center
                    mt-10
                    text-xl"
                >

                    No services found

                </h2>

            }


        </div>

    );

};

export default Services;
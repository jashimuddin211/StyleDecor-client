import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HomeServices = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {

        fetch("https://style-decor-server-sepia.vercel.app/services")
            .then(res => res.json())
            .then(data => {

                // show only first 6 services
                setServices(data.slice(0,6));

            });

    }, []);


    return (

        <section className="w-11/12 mx-auto py-20">

            <h1 className="
            text-4xl
            font-bold
            text-center">

                Decoration Packages

            </h1>


            <p className="
            text-center
            text-gray-500
            mt-4
            mb-10">

                Explore our decoration services
                for wedding, home, office and
                special events.

            </p>



            <div className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-8">

                {

                    services.map(service => (

                        <div
                        key={service._id}

                        className="
                        card
                        bg-base-100
                        shadow-xl">

                            <figure>

                                <img
                                src={service.image}
                                alt={service.service_name}

                                className="
                                h-56
                                w-full
                                object-cover"
                                />

                            </figure>


                            <div className="card-body">

                                <h2
                                className="card-title">

                                    {
                                        service.service_name
                                    }

                                </h2>


                                <p className="text-gray-500">

                                    {
                                        service.service_category
                                    }

                                </p>


                                <h3
                                className="
                                text-xl
                                font-bold">

                                    ৳ {service.cost}

                                </h3>


                                <Link
                                to={`/services/${service._id}`}>

                                    <button
                                    className="
                                    btn
                                    btn-primary
                                    w-full">

                                        View Details

                                    </button>

                                </Link>

                            </div>

                        </div>

                    ))

                }

            </div>



            <div className="text-center mt-10">

                <Link to="/services">

                    <button
                    className="
                    btn
                    btn-outline">

                        Show All Services

                    </button>

                </Link>

            </div>

        </section>

    );

};

export default HomeServices;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import {
  Calendar,
  MapPin,
  CreditCard,
  ClipboardCheck
} from "lucide-react";

const MyBookings = () => {

  const { user } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    if (user?.email) {

      fetch(
        `http://localhost:4000/bookings?email=${user.email}`
      )
        .then(res => res.json())
        .then(data => {

          setBookings(data);
          setLoading(false);

        });

    }

  }, [user]);


  // DELETE BOOKING
  const handleCancelBooking = (id) => {

    const confirmDelete =
      window.confirm(
        "Are you sure you want to cancel this booking?"
      );

    if (!confirmDelete) return;


    fetch(`http://localhost:4000/bookings/${id}`, {

      method: "DELETE"

    })
      .then(res => res.json())
      .then(data => {

        if (data.deletedCount > 0) {

          // remove deleted booking from UI
          const remaining =
            bookings.filter(
              booking => booking._id !== id
            );

          setBookings(remaining);

          alert("Booking cancelled");

        }

      });

  };



  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }



  return (

    <div className="space-y-8">

      <div>

        <h1 className="text-4xl font-bold">
          My Bookings
        </h1>

        <p className="text-gray-500">
          Manage booked services
        </p>

      </div>



      {
        bookings.length === 0 && (

          <div className="text-center p-10">

            <h2 className="text-2xl">

              No bookings found 😔

            </h2>

          </div>

        )
      }



      <div className="grid lg:grid-cols-2 gap-6">

        {

          bookings.map(booking => (

            <div
              key={booking._id}
              className="bg-base-100 shadow-xl rounded-3xl p-6"
            >

              <div className="flex justify-between">

                <h2 className="text-2xl font-bold">

                  {booking.serviceName}

                </h2>

                <div className="badge badge-info">

                  {booking.status}

                </div>

              </div>



              <div className="space-y-3 mt-5">

                <div className="flex gap-3">
                  <Calendar size={18}/>
                  <p>{booking.date}</p>
                </div>

                <div className="flex gap-3">
                  <MapPin size={18}/>
                  <p>{booking.location}</p>
                </div>

                <div className="flex gap-3">
                  <CreditCard size={18}/>
                  <p>৳ {booking.price}</p>
                </div>

                <div className="flex gap-3">
                  <ClipboardCheck size={18}/>
                  <p>{booking.userName}</p>
                </div>

              </div>



              <div className="mt-6 flex gap-3">

                <button className="btn btn-outline flex-1">

                  View Details

                </button>


                <button
                  onClick={() =>
                    handleCancelBooking(
                      booking._id
                    )
                  }
                  className="btn btn-error flex-1"
                >

                  Cancel Booking

                </button>

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );
};

export default MyBookings;
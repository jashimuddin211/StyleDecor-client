import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import {
  CreditCard,
  Calendar,
  BadgeCheck
} from "lucide-react";

const PaymentHistory = () => {

  const { user } = useContext(AuthContext);

  const [bookings, setBookings] =
    useState([]);

  const [loading, setLoading] =
    useState(true);



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



  // PAYMENT
  const handlePay = (id) => {

    fetch(
      `http://localhost:4000/bookings/pay/${id}`,
      {

        method: "PATCH"

      }
    )

      .then(res => res.json())

      .then(data => {

        if (data.success) {

          alert(
            "Payment Successful ✅"
          );


          const updated =
            bookings.map(item => {

              if (item._id === id) {

                return {

                  ...item,

                  paymentStatus:
                    "Paid"

                };

              }

              return item;

            });

          setBookings(updated);

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

      {/* Heading */}
      <div>

        <h1 className="text-4xl font-bold">

          Payment History

        </h1>

        <p className="text-gray-500 mt-2">

          Pay for booked services and track payment status

        </p>

      </div>



      <div className="overflow-x-auto bg-base-100 shadow-xl rounded-3xl">

        <table className="table">

          <thead>

            <tr>

              <th>Service</th>

              <th>Amount</th>

              <th>Date</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>



          <tbody>

            {

              bookings.map(item => (

                <tr key={item._id}>


                  <td className="font-semibold">

                    {item.serviceName}

                  </td>



                  <td>

                    ৳ {item.price}

                  </td>



                  <td>

                    <div className="flex gap-2 items-center">

                      <Calendar size={16} />

                      {item.date}

                    </div>

                  </td>



                  <td>

                    <span

                      className={

                        item.paymentStatus === "Paid"

                          ?

                          "badge badge-success"

                          :

                          "badge badge-warning"

                      }

                    >

                      {

                        item.paymentStatus
                        || "Unpaid"

                      }

                    </span>

                  </td>



                  <td>

                    {

                      item.paymentStatus ===
                        "Paid"

                        ?

                        <button
                          disabled
                          className="btn btn-success btn-sm"
                        >

                          <BadgeCheck size={16}/>

                          Paid

                        </button>

                        :

                        <button

                          onClick={() =>
                            handlePay(
                              item._id
                            )
                          }

                          className="btn btn-primary btn-sm"

                        >

                          <CreditCard size={16}/>

                          Pay Now

                        </button>

                    }

                  </td>


                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

    </div>

  );

};

export default PaymentHistory;
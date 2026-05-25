import { useContext } from "react";
import { AuthContext } from "../../provider/AuthContext";
import DecoratorHome from "./DecoratorDashboard/DecoratorHome";
import {
  Calendar,
  CreditCard,
  Clock,
  CheckCircle,
  
} from "lucide-react";

const DashBoardHome = () => {
  const { user } = useContext(AuthContext);

  if (user?.role === "decorator") {
    return <DecoratorHome />;
  }

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-3xl p-8 shadow-lg">

        <h1 className="text-4xl font-bold mb-2">
          Welcome Back 👋
        </h1>

        <p className="opacity-90">
          Manage bookings, payments and decoration services easily.
        </p>

      </div>


      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-base-100 shadow-xl rounded-2xl p-5">
          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Total Bookings
              </p>

              <h2 className="text-3xl font-bold mt-2">
                12
              </h2>
            </div>

            <Calendar className="text-primary" />
          </div>
        </div>


        <div className="bg-base-100 shadow-xl rounded-2xl p-5">

          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Pending
              </p>

              <h2 className="text-3xl font-bold text-yellow-500 mt-2">
                4
              </h2>
            </div>

            <Clock className="text-yellow-500" />
          </div>

        </div>


        <div className="bg-base-100 shadow-xl rounded-2xl p-5">

          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Completed
              </p>

              <h2 className="text-3xl font-bold text-green-500 mt-2">
                8
              </h2>
            </div>

            <CheckCircle className="text-green-500" />
          </div>

        </div>


        <div className="bg-base-100 shadow-xl rounded-2xl p-5">

          <div className="flex justify-between">

            <div>
              <p className="text-gray-500">
                Payments
              </p>

              <h2 className="text-3xl font-bold mt-2">
                ৳25K
              </h2>
            </div>

            <CreditCard className="text-secondary" />

          </div>

        </div>

      </div>



      {/* Middle Section */}
      <div className="grid lg:grid-cols-2 gap-6">


        {/* Recent Activity */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-6">

          <h2 className="text-xl font-bold mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="flex justify-between border-b pb-3">

              <div>
                <p className="font-semibold">
                  Wedding Decoration Booked
                </p>

                <small className="text-gray-500">
                  2 days ago
                </small>
              </div>

              <span className="badge badge-success">
                Confirmed
              </span>

            </div>


            <div className="flex justify-between border-b pb-3">

              <div>
                <p className="font-semibold">
                  Payment Completed
                </p>

                <small className="text-gray-500">
                  4 days ago
                </small>
              </div>

              <span className="badge badge-info">
                Paid
              </span>

            </div>

          </div>

        </div>



        

      </div>

    </div>
  );
};

export default DashBoardHome;
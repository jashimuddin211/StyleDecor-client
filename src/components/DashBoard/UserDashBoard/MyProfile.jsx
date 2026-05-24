import { useContext } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import {
  Mail,
  User,
  Shield,
  Calendar
} from "lucide-react";

const MyProfile = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="space-y-8">

      {/* Banner */}
      <div className="h-44 rounded-3xl bg-gradient-to-r from-primary to-secondary relative shadow-xl">

        <div className="absolute -bottom-14 left-8">

          <img
            src={
              user?.photoURL ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt=""
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
          />

        </div>

      </div>



      {/* Profile Info */}
      <div className="bg-base-100 shadow-xl rounded-3xl p-8 pt-16">

        <div className="flex flex-col md:flex-row md:justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              {user?.displayName || "User"}
            </h1>

            <p className="text-gray-500">
              {user?.email}
            </p>

          </div>


          <div className="badge badge-success badge-lg mt-4 md:mt-0">

            Active Account

          </div>

        </div>



        {/* Details */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">


          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <User className="text-primary" />

              <div>
                <p className="text-gray-500">
                  Full Name
                </p>

                <h2 className="font-semibold">
                  {user?.displayName || "Not Added"}
                </h2>
              </div>

            </div>

          </div>



          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <Mail className="text-primary" />

              <div>

                <p className="text-gray-500">
                  Email
                </p>

                <h2 className="font-semibold">
                  {user?.email}
                </h2>

              </div>

            </div>

          </div>



          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <Shield className="text-primary" />

              <div>

                <p className="text-gray-500">
                  Account Type
                </p>

                <h2 className="font-semibold">
                  User
                </h2>

              </div>

            </div>

          </div>



          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <Calendar className="text-primary" />

              <div>

                <p className="text-gray-500">
                  Joined
                </p>

                <h2 className="font-semibold">
                  May 2026
                </h2>

              </div>

            </div>

          </div>

        </div>


        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-base-200 p-4 rounded-xl text-center">

            <h2 className="text-2xl font-bold">
              12
            </h2>

            <p className="text-gray-500">
              Bookings
            </p>

          </div>


          <div className="bg-base-200 p-4 rounded-xl text-center">

            <h2 className="text-2xl font-bold">
              8
            </h2>

            <p className="text-gray-500">
              Completed
            </p>

          </div>


          <div className="bg-base-200 p-4 rounded-xl text-center">

            <h2 className="text-2xl font-bold">
              ৳25K
            </h2>

            <p className="text-gray-500">
              Payments
            </p>

          </div>

        </div>


        {/* Button */}
        <div className="mt-8">

          <button className="btn btn-primary">
            Edit Profile
          </button>

        </div>

      </div>

    </div>
  );
};

export default MyProfile;
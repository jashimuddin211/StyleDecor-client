import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { LayoutDashboard, Calendar, CreditCard, User } from "lucide-react";

const DashboardLayout = () => {
  const {user} = useContext(AuthContext);

  return (
    <div className="flex min-h-screen bg-base-100">

      {/* SIDEBAR */}
      <div className="w-64 bg-base-200 p-5 space-y-3 border-r">

        <h2 className="text-xl font-bold mb-5 flex items-center gap-2">
          <LayoutDashboard size={20} />
          Dashboard
        </h2>

        <Link className="block p-2 hover:bg-base-300 rounded" to="/dashboard/my-profile">
          <User size={16} className="inline mr-2" />
          My Profile
        </Link>

        <Link className="block p-2 hover:bg-base-300 rounded" to="/dashboard/my-bookings">
          <Calendar size={16} className="inline mr-2" />
          My Bookings
        </Link>

       

        <Link className="block p-2 hover:bg-base-300 rounded" to="/dashboard/payment-history">
          <CreditCard size={16} className="inline mr-2" />
          Payment History
        </Link>

      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6 bg-base-100">
        <Outlet />
      </div>

      

    </div>
  );
};

export default DashboardLayout;
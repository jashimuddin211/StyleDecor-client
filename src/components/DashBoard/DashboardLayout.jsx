import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { LayoutDashboard, Calendar, CreditCard, User, Briefcase, Home, Sparkles } from "lucide-react";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  
  const isDecorator = user?.role === "decorator";

  // Check active path for premium indicator styling
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
    isActive(path)
      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
  }`;

  return (
    <div className="flex min-h-screen bg-gray-50/50">

      {/* SIDEBAR */}
      <div className="w-64 bg-white p-6 space-y-6 border-r border-gray-100 flex flex-col justify-between shrink-0 shadow-sm">
        <div className="space-y-6">
          {/* Logo / Header */}
          <div className="flex items-center gap-2.5 pb-2 border-b border-gray-50">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-100">
              <LayoutDashboard size={18} />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-gray-900 tracking-tight leading-tight">
                StyleDecor
              </h2>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mt-0.5">
                {user?.role || "User"} Space
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {isDecorator ? (
              <>
                {/* DECORATOR LINKS */}
                <Link className={linkClass("/dashboard")} to="/dashboard">
                  <Home size={18} />
                  Decorator Home
                </Link>

                <Link className={linkClass("/dashboard/my-profile")} to="/dashboard/my-profile">
                  <User size={18} />
                  My Profile
                </Link>

                <Link className={linkClass("/dashboard/assigned-projects")} to="/dashboard/assigned-projects">
                  <Briefcase size={18} />
                  Assigned Projects
                </Link>

                <Link className={linkClass("/dashboard/earnings-payments")} to="/dashboard/earnings-payments">
                  <CreditCard size={18} />
                  Payment History
                </Link>
              </>
            ) : (
              <>
                {/* CUSTOMER LINKS */}
                <Link className={linkClass("/dashboard")} to="/dashboard">
                  <Home size={18} />
                  Customer Home
                </Link>

                <Link className={linkClass("/dashboard/my-profile")} to="/dashboard/my-profile">
                  <User size={18} />
                  My Profile
                </Link>

                <Link className={linkClass("/dashboard/my-bookings")} to="/dashboard/my-bookings">
                  <Calendar size={18} />
                  My Bookings
                </Link>

                <Link className={linkClass("/dashboard/payment-history")} to="/dashboard/payment-history">
                  <CreditCard size={18} />
                  Payment History
                </Link>
              </>
            )}
          </nav>
        </div>

        {/* User Card in Sidebar footer */}
        <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              src={user?.photoURL || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"}
              alt={user?.displayName}
              className="w-9 h-9 rounded-full object-cover border border-white shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white"></span>
          </div>
          <div className="truncate text-xs">
            <div className="font-extrabold text-gray-900 truncate leading-tight">
              {user?.displayName || "Designer"}
            </div>
            <div className="text-gray-400 truncate text-[10px] mt-0.5">
              {user?.email}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;
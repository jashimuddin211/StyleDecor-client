import { Link, Outlet, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { LayoutDashboard, Calendar, CreditCard, User, Briefcase, Home, Sparkles, Menu, X } from "lucide-react";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const isDecorator = user?.role === "decorator";

  // Check active path for premium indicator styling
  const isActive = (path) => location.pathname === path;

  const linkClass = (path) => `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
    isActive(path)
      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
  }`;

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50/50">

      {/* MOBILE TOP BAR (lg:hidden) */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-100 p-4 sticky top-0 z-30 shadow-sm w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition duration-150 cursor-pointer"
          >
            <Menu size={22} />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-100">
              <LayoutDashboard size={16} />
            </div>
            <h2 className="text-sm font-extrabold text-gray-900 tracking-tight leading-tight">
              StyleDecor
            </h2>
          </div>
        </div>
        
        {/* Dynamic Badge & User Avatar */}
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-bold text-blue-600 bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
            {user?.role || "User"}
          </span>
          <img
            src={user?.photoURL || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"}
            alt="user"
            className="w-8 h-8 rounded-full object-cover border border-white shadow-sm"
          />
        </div>
      </div>

      {/* MOBILE BACKDROP OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* SIDEBAR (Responsive Desktop Sidebar & Mobile Drawer) */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 border-r border-gray-100 flex flex-col justify-between shrink-0 shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-sm
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="space-y-6">
          {/* Logo / Header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-50">
            <div className="flex items-center gap-2.5">
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

            {/* Mobile Close Button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
            >
              <X size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {isDecorator ? (
              <>
                {/* DECORATOR LINKS */}
                <Link className={linkClass("/dashboard")} to="/dashboard" onClick={() => setSidebarOpen(false)}>
                  <Home size={18} />
                  Decorator Home
                </Link>

                <Link className={linkClass("/dashboard/my-profile")} to="/dashboard/my-profile" onClick={() => setSidebarOpen(false)}>
                  <User size={18} />
                  My Profile
                </Link>

                <Link className={linkClass("/dashboard/assigned-projects")} to="/dashboard/assigned-projects" onClick={() => setSidebarOpen(false)}>
                  <Briefcase size={18} />
                  Assigned Projects
                </Link>

                <Link className={linkClass("/dashboard/earnings-payments")} to="/dashboard/earnings-payments" onClick={() => setSidebarOpen(false)}>
                  <CreditCard size={18} />
                  Payment History
                </Link>
              </>
            ) : (
              <>
                {/* CUSTOMER LINKS */}
                <Link className={linkClass("/dashboard")} to="/dashboard" onClick={() => setSidebarOpen(false)}>
                  <Home size={18} />
                  Customer Home
                </Link>

                <Link className={linkClass("/dashboard/my-profile")} to="/dashboard/my-profile" onClick={() => setSidebarOpen(false)}>
                  <User size={18} />
                  My Profile
                </Link>

                <Link className={linkClass("/dashboard/my-bookings")} to="/dashboard/my-bookings" onClick={() => setSidebarOpen(false)}>
                  <Calendar size={18} />
                  My Bookings
                </Link>

                <Link className={linkClass("/dashboard/payment-history")} to="/dashboard/payment-history" onClick={() => setSidebarOpen(false)}>
                  <CreditCard size={18} />
                  Payment History
                </Link>
              </>
            )}

            <div className="h-px bg-gray-100 my-4"></div>

            <Link 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 text-blue-600 hover:bg-blue-50 border border-dashed border-blue-200/60 shadow-sm shadow-blue-50/20" 
              to="/"
              onClick={() => setSidebarOpen(false)}
            >
              <Sparkles size={18} />
              Website Home
            </Link>
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
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
        <Outlet />
      </div>

    </div>
  );
};

export default DashboardLayout;
import { Link, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
  LogIn,
  UserPlus,
} from "lucide-react";
import { useState, useContext } from "react";
import { AuthContext } from "../../provider/AuthContext";
import { UseDarkMode } from "../../hooks/DarkMode/UseDarkMode";

const Navbar = () => {
  const [isDark, setIsDark] = UseDarkMode();
  const [open, setOpen] = useState(false);
  const { user, logoutUser, loading } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logoutUser().catch(console.log);
  };

  const links = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  const navLinks = links.map(({ to, label }) => (
    <li key={to}>
      <NavLink className="text-sm font-medium" to={to}>
        {label}
      </NavLink>
    </li>
  ));

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-8">

        {/* LEFT SIDE */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost btn-square"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>

            {open && (
              <ul className="menu menu-sm dropdown-content mt-2 p-2 shadow bg-base-100 rounded-2xl w-56 z-50">
                {navLinks}

                <li className="mt-2 pt-2 border-t border-base-300">
                  {user ? (
                    <>
                      <Link
                        to={isAdmin ? "/admindashboard" : "/dashboard"}
                        className="flex items-center gap-2 text-sm font-medium py-2"
                      >
                        <LayoutDashboard size={16} />
                        {isAdmin ? "Admin Panel" : "Dashboard"}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-sm font-medium text-error py-2 w-full text-left"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-2 text-sm font-medium py-2"
                      >
                        <LogIn size={16} />
                        Login
                      </Link>
                      <Link
                        to="/register"
                        className="flex items-center gap-2 text-sm font-medium py-2"
                      >
                        <UserPlus size={16} />
                        Register
                      </Link>
                    </>
                  )}
                </li>

                {/* DARK MODE — always in mobile menu */}
                <li className="mt-2 pt-2 border-t border-base-300">
                  <button
                    onClick={() => setIsDark(!isDark)}
                    className="flex items-center gap-2 text-sm font-medium py-2 w-full text-left"
                  >
                    {isDark ? "☀️" : "🌙"}
                    {isDark ? "Light Mode" : "Dark Mode"}
                  </button>
                </li>
              </ul>
            )}
          </div>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="logo.png" className="w-10 h-10" alt="logo" />
            <span className="text-lg font-bold text-base-content">StyleDecor</span>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end gap-3">

          {/* DARK MODE — desktop only */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="hidden md:flex btn btn-ghost btn-sm gap-2"
          >
            {isDark ? "☀️" : "🌙"}
            <span className="text-sm font-medium">
              {isDark ? "Light" : "Dark"}
            </span>
          </button>

          {/* LOADING */}
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <div className="flex items-center gap-3">

              {/* DASHBOARD BUTTON */}
              <Link
                to={isAdmin ? "/admindashboard" : "/dashboard"}
                className="btn btn-primary btn-sm px-4 hidden md:flex gap-2"
              >
                <LayoutDashboard size={16} />
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>

              {/* AVATAR DROPDOWN */}
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary ring-offset-2">
                    <img
                      src={user.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="user"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-2 p-2 shadow bg-base-100 rounded-2xl w-48 z-50"
                >
                  <li className="px-3 py-2 font-bold text-sm text-base-content border-b border-base-300 mb-1">
                    {user.displayName || "User"}
                  </li>
                  <li>
                    <Link
                      to="/dashboard/my-profile"
                      className="text-sm font-medium py-2"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-error py-2 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>

          ) : (
            /* AUTH BUTTONS — desktop only */
            <div className="hidden md:flex gap-2">
              <Link className="btn btn-primary btn-sm px-4" to="/login">
                Login
              </Link>
              <Link className="btn btn-outline btn-primary btn-sm px-4" to="/register">
                Register
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
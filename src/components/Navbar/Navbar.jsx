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

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logoutUser, loading } = useContext(AuthContext);

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    logoutUser().catch(console.log);
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/services">Services</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT SIDE */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost"
            >
              {open ? <X /> : <Menu />}
            </button>

            {open && (
              <ul className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-60">
                {navLinks}

                {user ? (
                  <>
                    <li>
                      <Link to={isAdmin ? "/admindashboard" : "/dashboard"}>
                        <LayoutDashboard size={18} />
                        {isAdmin ? "Admin Panel" : "Dashboard"}
                      </Link>
                    </li>

                    <li>
                      <button onClick={handleLogout} className="text-red-500">
                        <LogOut size={18} />
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link to="/login">
                        <LogIn size={18} />
                        Login
                      </Link>
                    </li>

                    <li>
                      <Link to="/register">
                        <UserPlus size={18} />
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            )}
          </div>

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <img src="logo.png" className="w-14 h-14" alt="logo" />
            <h1 className="text-xl font-bold">StyleDecor</h1>
          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end gap-3">

          {/* LOADING */}
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : user ? (
            <>
              {/* DASHBOARD BUTTON */}
              <Link
                to={isAdmin ? "/admindashboard" : "/dashboard"}
                className="btn btn-primary hidden md:flex"
              >
                {isAdmin ? "Admin Panel" : "Dashboard"}
              </Link>

              {/* PROFILE DROPDOWN (FIXED) */}
              <div className="dropdown dropdown-end">

                {/* TRIGGER (IMPORTANT FIX: tabIndex) */}
                <div tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-2">
                    <img
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="user"
                    />
                  </div>
                </div>

                {/* DROPDOWN MENU */}
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52 z-[50]"
                >
                  <li className="font-bold text-center">
                    {user.displayName || "User"}
                  </li>

                  <li>
                    <Link to="/dashboard/my-profile">
                      Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-red-500"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <div className="flex gap-2">
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>

              <Link className="btn btn-outline btn-primary" to="/register">
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
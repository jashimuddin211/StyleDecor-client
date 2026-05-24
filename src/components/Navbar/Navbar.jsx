import { Link, NavLink } from 'react-router-dom';
import { Menu, X, LayoutDashboard, LogOut, LogIn, UserPlus } from 'lucide-react';
import { useState, useContext } from 'react';
import { AuthContext } from '../../provider/AuthContext';

const Navbar = () => {

  const [open, setOpen] = useState(false);

  // 🔐 REAL AUTH
  const { user, logoutUser, loading } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser()
      .then(() => {
        console.log("Logged out successfully");
      })
      .catch(err => console.log(err));
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'hover:text-primary'
        }>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/services" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'hover:text-primary'
        }>
          Services
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'hover:text-primary'
        }>
          About
        </NavLink>
      </li>

      <li>
        <NavLink to="/contact" className={({ isActive }) =>
          isActive ? 'text-primary font-semibold' : 'hover:text-primary'
        }>
          Contact
        </NavLink>
      </li>
    </>
  );

  // ⏳ Loading state
  if (loading) {
    return (
      <div className="p-4 text-center">
        <span className="loading loading-spinner text-primary"></span>
      </div>
    );
  }

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md shadow-sm">

      <div className="navbar max-w-7xl mx-auto px-4">

        {/* LEFT SIDE */}
        <div className="navbar-start">

          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">

            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost"
            >
              {open ? <X /> : <Menu />}
            </button>

            {open && (
              <ul className="menu menu-sm dropdown-content mt-3 p-4 shadow bg-base-100 rounded-box w-60 space-y-2">

                {navLinks}

                {user ? (
                  <>
                    <li>
                      <Link to="/dashboard/my-profile">
                        <LayoutDashboard size={18} />
                        Dashboard
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

            <img
              src="logo.png"
              className="w-14 h-14 object-contain"
              alt="logo"
            />

            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold">
                <span className="text-primary">Style</span>
                <span className="text-secondary">Decor</span>
              </h1>
              <p className="text-xs text-gray-500">
                Home & Ceremony Decoration
              </p>
            </div>

          </Link>

        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-4 text-base">
            {navLinks}
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end gap-3">

          {user ? (
            <>
              {/* DASHBOARD BUTTON */}
              <Link
                to="/dashboard/my-profile"
                className="btn btn-primary hidden md:flex"
              >
                Dashboard
              </Link>

              {/* PROFILE DROPDOWN */}
              <div className="dropdown dropdown-end">

                <div tabIndex={0} className="avatar cursor-pointer">
                  <div className="w-11 rounded-full ring ring-primary ring-offset-2">
                    <img
                      src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
                      alt="user"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
                >

                  <li className="font-semibold text-center mb-2">
                    {user?.displayName || "User"}
                  </li>

                  <li>
                    <Link to="/dashboard/my-profile">
                      My Profile
                    </Link>
                  </li>

                  <li>
                    <Link to="/dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button onClick={handleLogout} className="text-red-500">
                      Logout
                    </button>
                  </li>

                </ul>

              </div>
            </>
          ) : (
            <div className="flex gap-2">

              <Link to="/login" className="btn btn-primary">
                Login
              </Link>

              <Link to="/register" className="btn btn-outline btn-primary">
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
import { Link, NavLink } from 'react-router-dom';

import {
  Menu,
  X,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';

import { useState } from 'react';

const Navbar = () => {

  const [open, setOpen] = useState(false);

  // fake user
  const user = true;

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold'
              : 'hover:text-primary duration-300'
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold'
              : 'hover:text-primary duration-300'
          }
        >
          Services
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold'
              : 'hover:text-primary duration-300'
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? 'text-primary font-semibold'
              : 'hover:text-primary duration-300'
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-md shadow-sm">

      <div className="navbar max-w-7xl mx-auto px-4">

        {/* Left */}
        <div className="navbar-start">

          {/* Mobile Menu */}
          <div className="dropdown lg:hidden">

            <button
              onClick={() => setOpen(!open)}
              className="btn btn-ghost"
            >
              {
                open
                  ? <X size={24} />
                  : <Menu size={24} />
              }
            </button>

            {
              open && (
                <ul className="menu menu-sm dropdown-content mt-3 z-100 p-4 shadow bg-base-100 rounded-box w-60 space-y-2">

                  {navLinks}

                  {
                    user && (
                      <>
                        <li>
                          <NavLink to="/dashboard/my-profile">
                            <LayoutDashboard size={18} />
                            Dashboard
                          </NavLink>
                        </li>

                        <li>
                          <button>
                            <LogOut size={18} />
                            Logout
                          </button>
                        </li>
                      </>
                    )
                  }

                </ul>
              )
            }

          </div>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center "
          >

            <img
              src="logo.png"
              alt="StyleDecor Logo"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div className="hidden sm:block">

              <h1 className="text-2xl font-bold leading-none">

                <span className="text-primary">
                  Style
                </span>

                <span className="text-secondary">
                  Decor
                </span>

              </h1>

              <p className="text-xs text-gray-500">
                Home & Ceremony Decoration
              </p>

            </div>

          </Link>

        </div>

        {/* Center */}
        <div className="navbar-center hidden lg:flex">

          <ul className="menu menu-horizontal px-1 gap-3 text-base font-medium">
            {navLinks}
          </ul>

        </div>

        {/* Right */}
        <div className="navbar-end gap-3">

          {/* Dashboard Button */}
          {
            user && (
              <Link
                to="/dashboard/my-profile"
                className="btn btn-primary hidden md:flex"
              >
                Dashboard
              </Link>
            )
          }

          {/* User Dropdown */}
          {
            user
              ? (
                <div className="dropdown dropdown-end">

                  <div
                    tabIndex={0}
                    role="button"
                    className="avatar cursor-pointer"
                  >

                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

                      <img
                        src="https://i.ibb.co/4pDNDk1/avatar.png"
                        alt="User"
                      />

                    </div>

                  </div>

                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-100 p-3 shadow bg-base-100 rounded-box w-52"
                  >

                    <li className="font-semibold text-center mb-2">
                      Muhammad Jashim
                    </li>

                    <li>
                      <Link to="/dashboard/my-profile">
                        Dashboard
                      </Link>
                    </li>

                    <li>
                      <button>
                        Logout
                      </button>
                    </li>

                  </ul>

                </div>
              )
              : (
                <Link
                  to="/login"
                  className="btn btn-primary"
                >
                  Login
                </Link>
              )
          }

        </div>

      </div>

    </div>
  );
};

export default Navbar;
import { useState } from "react";

import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  FaGoogle,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

const Login = () => {

  const {
    loginUser,
    googleLogin,
  } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [error, setError] = useState("");

  const from = location?.state || "/";

  // Email Password Login
  const handleLogin = e => {

    e.preventDefault();

    setError("");

    const form = e.target;

    const email = form.email.value;

    const password = form.password.value;

    loginUser(email, password)

      .then(result => {

        console.log(result.user);

        navigate(from);

      })

      .catch(error => {

        console.log(error.message);

        setError("Invalid email or password");

      });

  };

  // Google Login
  const handleGoogleLogin = () => {

    googleLogin()

      .then(result => {

        console.log(result.user);

        navigate(from);

      })

      .catch(error => {

        console.log(error.message);

      });

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">

        {/* Title */}
        <div className="text-center mb-8">

          <img
            src="/logo.png"
            alt="StyleDecor"
            className="w-20 mx-auto mb-3"
          />

          <h2 className="text-3xl font-bold">

            Welcome Back

          </h2>

          <p className="text-gray-500 mt-2">

            Login to your StyleDecor account

          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          {/* Email */}
          <div>

            <label className="label">

              <span className="label-text">
                Email
              </span>

            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full"
              required
            />

          </div>

          {/* Password */}
          <div>

            <label className="label">

              <span className="label-text">
                Password
              </span>

            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full"
              required
            />

          </div>

          {/* Error */}
          {
            error && (

              <p className="text-red-500 text-sm">
                {error}
              </p>

            )
          }

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Login
          </button>

        </form>

        {/* Divider */}
        <div className="divider my-6">
          OR
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full"
        >

          <FaGoogle />

          Continue With Google

        </button>

        {/* Register Link */}
        <p className="text-center mt-6 text-sm">

          Don't have an account?

          <Link
            to="/register"
            className="text-primary font-semibold ml-1"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Login;
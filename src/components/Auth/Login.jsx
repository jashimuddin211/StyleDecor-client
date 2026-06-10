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
import { useToast } from "../../provider/ToastProvider";

const Login = () => {

  const {
    loginUser,
    googleLogin,
  } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const from = location?.state || "/";

  // Email Password Login
  const handleLogin = e => {

    e.preventDefault();

    setError("");
    setErrors({});

    const form = e.target;

    const email = form.email.value.trim();

    const password = form.password.value;

    // Client-side validation
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please enter a valid email and password.");
      return;
    }

    setSubmitting(true);
    loginUser(email, password)

      .then(result => {

        console.log(result.user);
        toast.success("Welcome back! Login successful.");
        navigate(from);

      })

      .catch(error => {

        console.log(error.message);

        setError("Invalid email or password");
        toast.error("Invalid email or password. Please try again.");

      })
      .finally(() => {
        setSubmitting(false);
      });

  };

  // Google Login
  const handleGoogleLogin = () => {

    googleLogin()

      .then(result => {

        console.log(result.user);
        toast.success("Google login successful!");
        navigate(from);

      })

      .catch(error => {

        console.log(error.message);
        toast.error("Google login failed.");

      });

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">

        
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
          noValidate
        >

          {/* Email */}
          <div>

            <label className="label" htmlFor="login-email">

              <span className="label-text">
                Email
              </span>

            </label>

            <input
              type="email"
              name="email"
              id="login-email"
              placeholder="Enter your email"
              className={`input input-bordered w-full ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.email}
              </p>
            )}

          </div>

          {/* Password */}
          <div>

            <label className="label" htmlFor="login-password">

              <span className="label-text">
                Password
              </span>

            </label>

            <input
              type="password"
              name="password"
              id="login-password"
              placeholder="Enter your password"
              className={`input input-bordered w-full ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.password}
              </p>
            )}

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
            disabled={submitting}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Logging in...
              </>
            ) : "Login"}
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
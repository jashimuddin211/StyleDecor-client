import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaGoogle,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";
import { useToast } from "../../provider/ToastProvider";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const Register = () => {

  const {
    createUser,
    googleLogin,
    updateUser,
  } = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  // ImageBB API Key
  const imageHostingKey =
    import.meta.env.VITE_IMAGE_HOSTING_KEY;

  // Register User
  const handleRegister = async e => {

    e.preventDefault();

    setError("");
    setErrors({});

    const form = e.target;

    const name = form.name.value.trim();

    const email = form.email.value.trim();

    const password = form.password.value;

    const photo = form.photo.files[0];

    // Client-side Validation
    const newErrors = {};
    if (!name || name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(password)) {
      newErrors.password = "Password must contain both letters and numbers";
    }
    if (!photo) {
      newErrors.photo = "Profile image is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors in the registration form.");
      return;
    }

    setSubmitting(true);

    try {
      let photoURL = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

      if (imageHostingKey && photo) {
        try {
          const formData = new FormData();
          formData.append("image", photo);

          const imageUploadUrl =
            `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

          const response = await fetch(imageUploadUrl, {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
          if (data.success && data.data && data.data.url) {
            photoURL = data.data.url;
          }
        } catch (uploadErr) {
          console.error("Image upload failed, using default avatar:", uploadErr);
        }
      }

      // Create User via our unified Auth API
      await createUser(
        email,
        password,
        name,
        photoURL
      );

      toast.success("Account created successfully!");
      navigate("/");

    }

    catch (error) {

      console.log(error);

      setError(error.message);
      toast.error(error.message || "Registration failed. Please try again.");

    } finally {
      setSubmitting(false);
    }

  };

  // Google Login
  const handleGoogleLogin = () => {

    googleLogin()

      .then(result => {

        console.log(result.user);
        toast.success("Login with Google successful!");
        navigate("/");

      })

      .catch(error => {

        console.log(error);
        toast.error("Google login failed.");

      });

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">

      <div className="w-full max-w-md bg-base-100 shadow-2xl rounded-2xl p-8">

        {/* Logo */}
        <div className="text-center mb-8">

          <img
            src="/logo.png"
            alt="StyleDecor"
            className="w-20 mx-auto mb-3"
          />

          <h2 className="text-3xl font-bold">
            Create Account
          </h2>

          <p className="text-gray-500 mt-2">
            Join StyleDecor today
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleRegister}
          className="space-y-5"
          noValidate
        >

          {/* Name */}
          <div>

            <label className="label" htmlFor="reg-name">

              <span className="label-text">
                Full Name
              </span>

            </label>

            <input
              type="text"
              name="name"
              id="reg-name"
              placeholder="Enter your name"
              className={`input input-bordered w-full ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.name}
              </p>
            )}

          </div>

          {/* Photo */}
          <div>

            <label className="label" htmlFor="reg-photo">

              <span className="label-text">
                Profile Image
              </span>

            </label>

            <input
              type="file"
              name="photo"
              id="reg-photo"
              className={`file-input file-input-bordered w-full ${errors.photo ? 'border-red-500 focus:border-red-500' : ''}`}
              required
            />
            {errors.photo && (
              <p className="text-red-500 text-xs mt-1" role="alert">
                {errors.photo}
              </p>
            )}

          </div>

          {/* Email */}
          <div>

            <label className="label" htmlFor="reg-email">

              <span className="label-text">
                Email
              </span>

            </label>

            <input
              type="email"
              name="email"
              id="reg-email"
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

            <label className="label" htmlFor="reg-password">

              <span className="label-text">
                Password
              </span>

            </label>

            <input
              type="password"
              name="password"
              id="reg-password"
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

          {/* Register Button */}
          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Registering...
              </>
            ) : "Register"}
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

        {/* Login Link */}
        <p className="text-center mt-6 text-sm">

          Already have an account?

          <Link
            to="/login"
            className="text-primary font-semibold ml-1"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;
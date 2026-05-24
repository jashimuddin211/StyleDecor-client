import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaGoogle,
} from "react-icons/fa";

import useAuth from "../../hooks/useAuth";

const Register = () => {

  const {
    createUser,
    googleLogin,
    updateUser,
  } = useAuth();

  const navigate = useNavigate();

  const [error, setError] = useState("");

  // ImageBB API Key
  const imageHostingKey =
    import.meta.env.VITE_IMAGE_HOSTING_KEY;

  // Register User
  const handleRegister = async e => {

    e.preventDefault();

    setError("");

    const form = e.target;

    const name = form.name.value;

    const email = form.email.value;

    const password = form.password.value;

    const photo = form.photo.files[0];

    // Password Validation
    if (password.length < 6) {

      return setError(
        "Password must be at least 6 characters"
      );
    }

    try {
      let photoURL = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

      // Upload image to ImageBB (only if key and photo are available)
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

      // Create User
      const result = await createUser(
        email,
        password
      );

      console.log(result.user);

      // Update User Profile
      await updateUser(name, photoURL);

      // User Data for Database
      const userInfo = {

        name,
        email,
        photoURL,

        // default role
        role: "user",

        createdAt: new Date(),

      };

      // Save User To Database
      await fetch(
        "http://localhost:4000/users",
        {
          method: "POST",

          headers: {
            "content-type": "application/json",
          },

          body: JSON.stringify(userInfo),
        }
      );

      navigate("/");

    }

    catch (error) {

      console.log(error);

      setError(error.message);

    }

  };

  // Google Login
  const handleGoogleLogin = () => {

    googleLogin()

      .then(result => {

        console.log(result.user);

        navigate("/");

      })

      .catch(error => {

        console.log(error);

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
        >

          {/* Name */}
          <div>

            <label className="label">

              <span className="label-text">
                Full Name
              </span>

            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="input input-bordered w-full"
              required
            />

          </div>

          {/* Photo */}
          <div>

            <label className="label">

              <span className="label-text">
                Profile Image
              </span>

            </label>

            <input
              type="file"
              name="photo"
              className="file-input file-input-bordered w-full"
              required
            />

          </div>

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

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-full"
          >
            Register
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
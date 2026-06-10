import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import { useToast } from "../../../provider/ToastProvider";
import {
  Mail,
  User,
  Shield,
  Calendar,
  Phone,
  X
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://style-decor-server-sepia.vercel.app";

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", photoURL: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const toast = useToast();

  const fetchDbUser = useCallback(() => {
    if (user?.email) {
      fetch(`${API_BASE_URL}/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          setDbUser(data);
          setFormData({
            name: data?.name || user?.displayName || "",
            photoURL: data?.photoURL || user?.photoURL || "",
            phone: data?.phone || ""
          });
        })
        .catch(err => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    fetchDbUser();
  }, [fetchDbUser]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }
    if (!formData.photoURL.trim() || !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.photoURL.trim())) {
      newErrors.photoURL = "Please enter a valid photo URL.";
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 5) {
      newErrors.phone = "Please enter a valid phone number.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the validation errors.");
      return;
    }

    setSubmitting(true);
    try {
      // 1. Update Firebase profile
      await updateUser(formData.name.trim(), formData.photoURL.trim());

      // 2. Update Database profile
      const res = await fetch(`${API_BASE_URL}/users/profile/${user.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          photoURL: formData.photoURL.trim(),
          phone: formData.phone.trim()
        })
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to update profile in database.");
      }

      toast.success("Profile updated successfully!");
      setEditMode(false);
      fetchDbUser();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">

      {/* Banner */}
      <div className="h-44 rounded-3xl bg-gradient-to-r from-primary to-secondary relative shadow-xl">

        <div className="absolute -bottom-14 left-8">

          <img
            src={
              dbUser?.photoURL ||
              user?.photoURL ||
              "https://i.ibb.co/4pDNDk1/avatar.png"
            }
            alt="Profile Avatar"
            className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />

        </div>

      </div>

      {/* Edit Profile Toggle Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={() => setEditMode(true)}
          className="btn btn-primary btn-outline rounded-2xl font-bold px-6 py-2 border border-primary transition"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Info */}
      <div className="bg-base-100 shadow-xl rounded-3xl p-8 pt-8">

        <div className="flex flex-col md:flex-row md:justify-between">

          <div>

            <h1 className="text-3xl font-bold text-base-content">
              {dbUser?.name || user?.displayName || "User"}
            </h1>

            <p className="text-base-content/60 mt-1">
              {user?.email}
            </p>

          </div>

          <div className="badge badge-success badge-lg mt-4 md:mt-0 font-semibold text-white">
            Active Account
          </div>

        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">

          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <User className="text-primary" />

              <div>
                <p className="text-xs text-base-content/50 uppercase tracking-wider font-bold">
                  Full Name
                </p>

                <h2 className="font-semibold text-base-content mt-0.5">
                  {dbUser?.name || user?.displayName || "Not Added"}
                </h2>
              </div>

            </div>

          </div>

          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <Mail className="text-primary" />

              <div>

                <p className="text-xs text-base-content/50 uppercase tracking-wider font-bold">
                  Email
                </p>

                <h2 className="font-semibold text-base-content mt-0.5">
                  {user?.email}
                </h2>

              </div>

            </div>

          </div>

          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <Shield className="text-primary" />

              <div>

                <p className="text-xs text-base-content/50 uppercase tracking-wider font-bold">
                  Account Type
                </p>

                <h2 className="font-semibold text-base-content mt-0.5 capitalize">
                  {dbUser?.role || user?.role || "User"}
                </h2>

              </div>

            </div>

          </div>

          <div className="bg-base-200 p-5 rounded-2xl">

            <div className="flex gap-3 items-center">

              <Phone className="text-primary" />

              <div>

                <p className="text-xs text-base-content/50 uppercase tracking-wider font-bold">
                  Phone Number
                </p>

                <h2 className="font-semibold text-base-content mt-0.5">
                  {dbUser?.phone || "Not Added"}
                </h2>

              </div>

            </div>

          </div>

          <div className="bg-base-200 p-5 rounded-2xl md:col-span-2">

            <div className="flex gap-3 items-center">

              <Calendar className="text-primary" />

              <div>

                <p className="text-xs text-base-content/50 uppercase tracking-wider font-bold">
                  Joined
                </p>

                <h2 className="font-semibold text-base-content mt-0.5">
                  May 2026
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-3 gap-4 mt-8">

          <div className="bg-base-200 p-4 rounded-xl text-center">

            <h2 className="text-2xl font-bold text-base-content">
              12
            </h2>

            <p className="text-xs text-base-content/50 mt-1 uppercase tracking-wider font-semibold">
              Bookings
            </p>

          </div>

          <div className="bg-base-200 p-4 rounded-xl text-center">

            <h2 className="text-2xl font-bold text-base-content">
              8
            </h2>

            <p className="text-xs text-base-content/50 mt-1 uppercase tracking-wider font-semibold">
              Completed
            </p>

          </div>

          <div className="bg-base-200 p-4 rounded-xl text-center">

            <h2 className="text-2xl font-bold text-base-content">
              ৳25K
            </h2>

            <p className="text-xs text-base-content/50 mt-1 uppercase tracking-wider font-semibold">
              Payments
            </p>

          </div>

        </div>

      </div>

      {/* EDIT PROFILE MODAL */}
      {editMode && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-gray-100 flex flex-col gap-6 text-gray-800">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Update Profile Details</h3>
              <button onClick={() => setEditMode(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="profile-name" className="block text-xs font-bold uppercase text-gray-400 mb-1">Full Name</label>
                <input
                  type="text"
                  id="profile-name"
                  value={formData.name}
                  onChange={e => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors(prev => ({ ...prev, name: "" }));
                  }}
                  className={`w-full border rounded-2xl p-3 focus:outline-none focus:border-blue-500 bg-white ${errors.name ? 'border-red-500' : 'border-gray-200'}`}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="profile-photo" className="block text-xs font-bold uppercase text-gray-400 mb-1">Profile Photo URL</label>
                <input
                  type="text"
                  id="profile-photo"
                  value={formData.photoURL}
                  onChange={e => {
                    setFormData({ ...formData, photoURL: e.target.value });
                    if (errors.photoURL) setErrors(prev => ({ ...prev, photoURL: "" }));
                  }}
                  className={`w-full border rounded-2xl p-3 focus:outline-none focus:border-blue-500 bg-white ${errors.photoURL ? 'border-red-500' : 'border-gray-200'}`}
                  required
                />
                {errors.photoURL && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.photoURL}</p>
                )}
              </div>

              <div>
                <label htmlFor="profile-phone" className="block text-xs font-bold uppercase text-gray-400 mb-1">Phone Number</label>
                <input
                  type="text"
                  id="profile-phone"
                  value={formData.phone}
                  onChange={e => {
                    setFormData({ ...formData, phone: e.target.value });
                    if (errors.phone) setErrors(prev => ({ ...prev, phone: "" }));
                  }}
                  placeholder="e.g. +8801712345678"
                  className={`w-full border rounded-2xl p-3 focus:outline-none focus:border-blue-500 bg-white ${errors.phone ? 'border-red-500' : 'border-gray-200'}`}
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>
                )}
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  disabled={submitting}
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold p-3.5 rounded-2xl transition duration-150 bg-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3.5 rounded-2xl transition duration-150 flex items-center justify-center gap-2 border-0"
                >
                  {submitting ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default MyProfile;
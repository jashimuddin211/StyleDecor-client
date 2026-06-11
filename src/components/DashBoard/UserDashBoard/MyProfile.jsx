import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import { useToast } from "../../../provider/ToastProvider";
import {
  Mail,
  User,
  Shield,
  Calendar,
  Phone,
  X,
  Lock
} from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const MyProfile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", photoURL: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [passwordSubmitting, setPasswordSubmitting] = useState(false);
  const toast = useToast();

  const fetchDbUser = useCallback(() => {
    if (user?.email) {
      fetch(`${API_BASE_URL}/users/${user.email}`)
        .then(res => res.json())
        .then(data => {
          if (data && !data.error) {
            setDbUser(data);
            setFormData({
              name: data?.name || user?.displayName || "",
              photoURL: data?.photoURL || user?.photoURL || "",
              phone: data?.phone || ""
            });
          }
        })
        .catch(err => console.log("Profile fetch error:", err));
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
    if (formData.photoURL.trim() && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(formData.photoURL.trim())) {
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
      let finalPhotoURL = formData.photoURL.trim();
      const fileInput = document.getElementById("profile-upload-file");
      const photoFile = fileInput?.files?.[0];

      // If a file was selected, upload it to ImgBB
      if (photoFile) {
        const imageHostingKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;
        if (imageHostingKey) {
          toast.success("Uploading profile image...");
          const imgFormData = new FormData();
          imgFormData.append("image", photoFile);
          const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;
          const uploadRes = await fetch(imageUploadUrl, {
            method: "POST",
            body: imgFormData
          });
          const uploadData = await uploadRes.json();
          if (uploadData.success && uploadData.data && uploadData.data.url) {
            finalPhotoURL = uploadData.data.url;
          } else {
            throw new Error("ImgBB upload failed.");
          }
        } else {
          toast.error("VITE_IMAGE_HOSTING_KEY missing, using previous avatar.");
        }
      }

      // 1. Update Provider profile
      await updateUser(formData.name.trim(), finalPhotoURL);

      // 2. Update Database profile
      const res = await fetch(`${API_BASE_URL}/users/profile/${user.email}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          photoURL: finalPhotoURL,
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

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const form = e.target;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    
    if (!oldPassword || !newPassword || !confirmPassword) {
      toast.error("All password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (!/(?=.*[A-Za-z])(?=.*\d)/.test(newPassword)) {
      toast.error("Password must contain both letters and numbers.");
      return;
    }
    
    setPasswordSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/change-password`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
        body: JSON.stringify({
          email: user.email,
          oldPassword,
          newPassword
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to change password.");
      }
      toast.success("Password updated successfully!");
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update password.");
    } finally {
      setPasswordSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">

      {/* Banner */}
      <div className="h-44 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 relative shadow-xl">
        <div className="absolute -bottom-14 left-8">
          <img
            src={
              dbUser?.photoURL ||
              user?.photoURL ||
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
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
          className="btn btn-primary btn-outline rounded-2xl font-bold px-6 py-2 transition cursor-pointer"
        >
          Edit Profile
        </button>
      </div>

      {/* Profile Info */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8 pt-8">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              {dbUser?.name || user?.displayName || "Designer User"}
            </h1>
            <p className="text-gray-500 mt-1">
              {user?.email}
            </p>
          </div>
          <div className="badge badge-success badge-lg mt-4 md:mt-0 font-bold text-white px-4 py-3 rounded-full">
            Active Account
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-2 gap-5 mt-8">
          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <div className="flex gap-3 items-center">
              <User className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Full Name
                </p>
                <h2 className="font-semibold text-gray-800 mt-0.5">
                  {dbUser?.name || user?.displayName || "Not Added"}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <div className="flex gap-3 items-center">
              <Mail className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Email
                </p>
                <h2 className="font-semibold text-gray-800 mt-0.5">
                  {user?.email}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <div className="flex gap-3 items-center">
              <Shield className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Account Type
                </p>
                <h2 className="font-semibold text-gray-800 mt-0.5 capitalize">
                  {dbUser?.role || user?.role || "User"}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl">
            <div className="flex gap-3 items-center">
              <Phone className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Phone Number
                </p>
                <h2 className="font-semibold text-gray-800 mt-0.5">
                  {dbUser?.phone || "Not Added"}
                </h2>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-100 p-5 rounded-2xl md:col-span-2">
            <div className="flex gap-3 items-center">
              <Calendar className="text-blue-600" />
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">
                  Profile Details Loaded
                </p>
                <h2 className="font-semibold text-gray-800 mt-0.5">
                  Verified JWT Profile Session
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHANGE PASSWORD CARD */}
      <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-8">
        <div className="flex items-center gap-2.5 mb-5 pb-3 border-b border-gray-100">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
            <Lock size={20} />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 tracking-tight">Change Password</h2>
        </div>
        
        <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md" noValidate>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5" htmlFor="old-password">Old Password</label>
            <input
              type="password"
              id="old-password"
              name="oldPassword"
              placeholder="••••••••"
              required
              className="w-full bg-white border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500 text-sm text-gray-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5" htmlFor="new-password">New Password</label>
            <input
              type="password"
              id="new-password"
              name="newPassword"
              placeholder="•••••••• (Min 6 chars, both letters & numbers)"
              required
              className="w-full bg-white border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500 text-sm text-gray-800"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5" htmlFor="confirm-password">Confirm New Password</label>
            <input
              type="password"
              id="confirm-password"
              name="confirmPassword"
              placeholder="••••••••"
              required
              className="w-full bg-white border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500 text-sm text-gray-800"
            />
          </div>
          <button 
            type="submit" 
            disabled={passwordSubmitting} 
            className="btn btn-primary rounded-2xl font-bold px-6 py-2.5 cursor-pointer"
          >
            {passwordSubmitting ? (
              <>
                <span className="loading loading-spinner loading-xs"></span>
                Updating...
              </>
            ) : "Update Password"}
          </button>
        </form>
      </div>

      {/* EDIT PROFILE MODAL */}
      {editMode && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-gray-100 flex flex-col gap-6 text-gray-800">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Update Profile Details</h3>
              <button onClick={() => setEditMode(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition cursor-pointer">
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
                <label htmlFor="profile-photo-url" className="block text-xs font-bold uppercase text-gray-400 mb-1">Profile Photo URL (Optional)</label>
                <input
                  type="text"
                  id="profile-photo-url"
                  value={formData.photoURL}
                  onChange={e => {
                    setFormData({ ...formData, photoURL: e.target.value });
                    if (errors.photoURL) setErrors(prev => ({ ...prev, photoURL: "" }));
                  }}
                  className={`w-full border rounded-2xl p-3 focus:outline-none focus:border-blue-500 bg-white ${errors.photoURL ? 'border-red-500' : 'border-gray-200'}`}
                />
                {errors.photoURL && (
                  <p className="text-red-500 text-xs mt-1" role="alert">{errors.photoURL}</p>
                )}
              </div>

              <div>
                <label htmlFor="profile-upload-file" className="block text-xs font-bold uppercase text-gray-400 mb-1">Upload Profile Image (Direct Image Upload)</label>
                <input
                  type="file"
                  id="profile-upload-file"
                  accept="image/*"
                  className="file-input file-input-bordered w-full bg-white text-gray-800"
                />
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
                  className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold p-3.5 rounded-2xl transition duration-150 bg-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3.5 rounded-2xl transition duration-150 flex items-center justify-center gap-2 border-0 cursor-pointer"
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
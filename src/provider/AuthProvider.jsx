import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import app from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Login
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Logout
  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Update Profile
  const updateUser = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (!currentUser) {
          setUser(null);
          localStorage.removeItem("access-token");
          return;
        }

        let role = "user";

        if (currentUser.email) {
          // 1. Fetch user role
          try {
            const res = await fetch(
              `https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/users/${currentUser.email}`
            );

            if (res.ok) {
              const dbUser = await res.json();
              role = dbUser?.role || "user";
            }
          } catch (err) {
            console.log("Role fetch error:", err);
          }

          // 2. Fetch JWT access token
          try {
            const tokenRes = await fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/jwt", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: currentUser.email })
            });

            if (tokenRes.ok) {
              const tokenData = await tokenRes.json();
              if (tokenData.token) {
                localStorage.setItem("access-token", tokenData.token);
              }
            }
          } catch (err) {
            console.log("JWT fetch error:", err);
          }
        }

        setUser({
          ...currentUser,
          role,
        });
      } catch (err) {
        console.log(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleLogin,
    logoutUser,
    updateUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
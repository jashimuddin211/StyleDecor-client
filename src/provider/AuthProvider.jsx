import { useEffect, useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import app from "../firebase/firebase.config";
import { AuthContext } from "./AuthContext";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// Pure JS JWT parser to check token expiration
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
  } catch (e) {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register User via custom JWT backend
  const createUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, photoURL })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }
      if (data.token) {
        localStorage.setItem("access-token", data.token);
      }
      const loggedUser = {
        displayName: data.user.name,
        email: data.user.email,
        photoURL: data.user.photoURL,
        role: data.user.role || "user"
      };
      setUser(loggedUser);
      return { user: loggedUser };
    } finally {
      setLoading(false);
    }
  };

  // Login User via custom JWT backend
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }
      if (data.token) {
        localStorage.setItem("access-token", data.token);
      }
      const loggedUser = {
        displayName: data.user.name,
        email: data.user.email,
        photoURL: data.user.photoURL,
        role: data.user.role || "user"
      };
      setUser(loggedUser);
      return { user: loggedUser };
    } finally {
      setLoading(false);
    }
  };

  // Google Login via Firebase popup + custom JWT backend
  const googleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;
      
      const res = await fetch(`${API_BASE_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Google authentication backend integration failed");
      }
      if (data.token) {
        localStorage.setItem("access-token", data.token);
      }
      const loggedUser = {
        displayName: data.user.name,
        email: data.user.email,
        photoURL: data.user.photoURL,
        role: data.user.role || "user"
      };
      setUser(loggedUser);
      return { user: loggedUser };
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logoutUser = async () => {
    setLoading(true);
    localStorage.removeItem("access-token");
    setUser(null);
    setLoading(false);
    return signOut(auth);
  };

  // Update Profile wrapper for compatibility
  const updateUser = async (name, photo) => {
    setUser((prev) => (prev ? { ...prev, displayName: name, photoURL: photo } : null));
    return Promise.resolve();
  };

  // Initialize auth state from JWT in localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("access-token");
      if (token) {
        const decoded = parseJwt(token);
        if (decoded && decoded.exp * 1000 > Date.now()) {
          try {
            const res = await fetch(`${API_BASE_URL}/users/${decoded.email}`);
            if (res.ok) {
              const dbUser = await res.json();
              if (dbUser) {
                setUser({
                  displayName: dbUser.name,
                  email: dbUser.email,
                  photoURL: dbUser.photoURL,
                  role: dbUser.role || "user"
                });
              } else {
                localStorage.removeItem("access-token");
                setUser(null);
              }
            } else {
              localStorage.removeItem("access-token");
              setUser(null);
            }
          } catch (err) {
            console.log("Failed to fetch user on load:", err);
            setUser({
              displayName: decoded.name || "User",
              email: decoded.email,
              role: decoded.role || "user"
            });
          }
        } else {
          localStorage.removeItem("access-token");
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    initializeAuth();
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
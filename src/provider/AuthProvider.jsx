import {
  useEffect,
  useState,
} from "react";

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

    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Login
  const loginUser = (email, password) => {

    setLoading(true);

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Google Login
  const googleLogin = () => {

    setLoading(true);

    return signInWithPopup(
      auth,
      googleProvider
    );
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

  // Observer
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      currentUser => {

        setUser(currentUser);

        setLoading(false);

      }
    );

    return () => {
      unsubscribe();
    };

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
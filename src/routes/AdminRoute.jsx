import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // while checking auth state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  // not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // check admin role (important)
  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // allow admin access
  return children;
};

export default AdminRoute;
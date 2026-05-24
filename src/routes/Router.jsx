import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../components/DashBoard/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Services from "../components/services/Services";
import ServiceDetails from "../components/services/ServiceDetails";

// Dashboard (User)
import DashBoardHome from "../components/DashBoard/DashboardHome";
import MyProfile from "../components/DashBoard/UserDashBoard/MyProfile";
import MyBooking from "../components/DashBoard/UserDashBoard/MyBooking";
import PaymentHistory from "../components/DashBoard/UserDashBoard/PaymentHistory";

// Dashboard (Decorator)
import AssignedProjects from "../components/DashBoard/DecoratorDashboard/AssignedProjects";
import DecoratorPaymentHistory from "../components/DashBoard/DecoratorDashboard/DecoratorPaymentHistory";

// Admin
import AdminDashboard from "../components/DashBoard/AdminDashboard/AdminLayout";

// Routes Protection
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const router = createBrowserRouter([
  /* ================= MAIN SITE ================= */
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/services/:id",
        element: <ServiceDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  /* ================= USER DASHBOARD ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashBoardHome />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "my-bookings",
        element: <MyBooking />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "assigned-projects",
        element: <AssignedProjects />,
      },
      {
        path: "earnings-payments",
        element: <DecoratorPaymentHistory />,
      },
    ],
  },

  /* ================= ADMIN DASHBOARD ================= */
  {
    path: "/admindashboard/*",
    element: (
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    ),
  },
]);

export default router;
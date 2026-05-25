import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../components/DashBoard/DashboardLayout";

// Pages
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import AllDecorators from "../pages/decorators/AllDecorators";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Services from "../components/services/Services";
import ServiceDetails from "../components/services/ServiceDetails";

// Dashboard (User)
import DashBoardHome from "../components/DashBoard/DashboardHome";
import MyProfile from "../components/DashBoard/UserDashBoard/MyProfile";
import MyBooking from "../components/DashBoard/UserDashBoard/MyBooking";
import PaymentHistory from "../components/DashBoard/UserDashBoard/PaymentHistory";
import PaymentSuccess from "../components/DashBoard/UserDashBoard/PaymentSuccess";

// Dashboard (Decorator)
import AssignedProjects from "../components/DashBoard/DecoratorDashboard/AssignedProjects";
import DecoratorPaymentHistory from "../components/DashBoard/DecoratorDashboard/DecoratorPaymentHistory";

// 404 Page Fallback
import NotFound from "../components/Common/NotFound";

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
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/decorators",
        element: <AllDecorators />,
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
        path: "payment-success",
        element: <PaymentSuccess />,
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

  /* ================= 404 PAGE FALLBACK ================= */
  {
    path: "*",
    element: <NotFound />,
  }
]);

export default router;
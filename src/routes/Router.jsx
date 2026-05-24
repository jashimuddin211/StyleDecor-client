import { createBrowserRouter } from "react-router-dom";

// Layouts
import MainLayout from "../layouts/MainLayout";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Services from "../components/services/Services";
import Home from "../pages/Home/Home";
import ServiceDetails from "../components/services/ServiceDetails";
// import DashboardLayout from "../layouts/DashboardLayout";

// // Pages
// import Home from "../pages/Home/Home";
// import Services from "../pages/Services/Services";
// import ServiceDetails from "../pages/Services/ServiceDetails";
// import About from "../pages/About/About";
// import Contact from "../pages/Contact/Contact";
// import CoverageMap from "../pages/CoverageMap/CoverageMap";

// import Login from "../pages/Auth/Login";
// import Register from "../pages/Auth/Register";

// import ErrorPage from "../pages/Error/ErrorPage";

// // User Dashboard
// import MyProfile from "../pages/Dashboard/UserDashboard/MyProfile";
// import MyBookings from "../pages/Dashboard/UserDashboard/MyBookings";
// import PaymentHistory from "../pages/Dashboard/UserDashboard/PaymentHistory";

// // Admin Dashboard
// import ManageServices from "../pages/Dashboard/AdminDashboard/ManageServices";
// import AddService from "../pages/Dashboard/AdminDashboard/AddService";
// import UpdateService from "../pages/Dashboard/AdminDashboard/UpdateService";
// import ManageBookings from "../pages/Dashboard/AdminDashboard/ManageBookings";
// import ManageDecorators from "../pages/Dashboard/AdminDashboard/ManageDecorators";

// // Decorator Dashboard
// import AssignedProjects from "../pages/Dashboard/DecoratorDashboard/AssignedProjects";
// import TodaySchedule from "../pages/Dashboard/DecoratorDashboard/TodaySchedule";
// import UpdateStatus from "../pages/Dashboard/DecoratorDashboard/UpdateStatus";
// import Earnings from "../pages/Dashboard/DecoratorDashboard/Earnings";

// // Private Routes
// import PrivateRoute from "./PrivateRoute";
// import AdminRoute from "./AdminRoute";
// import DecoratorRoute from "./DecoratorRoute";

const router = createBrowserRouter([
  // Main Website Routes
  {
    path: "/",
    element: <MainLayout />,
    // errorElement: <ErrorPage />,
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

    //   {
    //     path: "/about",
    //     element: <About />,
    //   },

    //   {
    //     path: "/contact",
    //     element: <Contact />,
    //   },

    //   {
    //     path: "/coverage-map",
    //     element: <CoverageMap />,
    //   },

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

  // Dashboard Routes
//   {
//     path: "/dashboard",
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),

//     children: [
//       // User Dashboard
//       {
//         path: "my-profile",
//         element: <MyProfile />,
//       },

//       {
//         path: "my-bookings",
//         element: <MyBookings />,
//       },

//       {
//         path: "payment-history",
//         element: <PaymentHistory />,
//       },

//       // Admin Dashboard
//       {
//         path: "manage-services",
//         element: (
//           <AdminRoute>
//             <ManageServices />
//           </AdminRoute>
//         ),
//       },

//       {
//         path: "add-service",
//         element: (
//           <AdminRoute>
//             <AddService />
//           </AdminRoute>
//         ),
//       },

//       {
//         path: "update-service/:id",
//         element: (
//           <AdminRoute>
//             <UpdateService />
//           </AdminRoute>
//         ),
//       },

//       {
//         path: "manage-bookings",
//         element: (
//           <AdminRoute>
//             <ManageBookings />
//           </AdminRoute>
//         ),
//       },

//       {
//         path: "manage-decorators",
//         element: (
//           <AdminRoute>
//             <ManageDecorators />
//           </AdminRoute>
//         ),
//       },

//       // Decorator Dashboard
//       {
//         path: "assigned-projects",
//         element: (
//           <DecoratorRoute>
//             <AssignedProjects />
//           </DecoratorRoute>
//         ),
//       },

//       {
//         path: "today-schedule",
//         element: (
//           <DecoratorRoute>
//             <TodaySchedule />
//           </DecoratorRoute>
//         ),
//       },

//       {
//         path: "update-status/:id",
//         element: (
//           <DecoratorRoute>
//             <UpdateStatus />
//           </DecoratorRoute>
//         ),
//       },

//       {
//         path: "earnings",
//         element: (
//           <DecoratorRoute>
//             <Earnings />
//           </DecoratorRoute>
//         ),
//       },
//     ],
//   },
]);

export default router;

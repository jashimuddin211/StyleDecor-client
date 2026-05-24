import { NavLink, Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

/* ===================== LAYOUT ===================== */

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

/* ===================== SIDEBAR ===================== */

const Sidebar = () => {
  const link =
    "block px-4 py-2 rounded hover:bg-blue-500 hover:text-white";

  return (
    <div className="w-64 bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <NavLink to="/admindashboard" end className={link}>
        Dashboard
      </NavLink>
      <NavLink to="/admindashboard/decorators" className={link}>
        Decorators
      </NavLink>
      <NavLink to="/admindashboard/services" className={link}>
        Services
      </NavLink>
      <NavLink to="/admindashboard/bookings" className={link}>
        Bookings
      </NavLink>
      <NavLink to="/admindashboard/assign" className={link}>
        Assign Decorator
      </NavLink>
      <NavLink to="/admindashboard/analytics" className={link}>
        Analytics
      </NavLink>
    </div>
  );
};

/* ===================== NAVBAR ===================== */

const Navbar = () => {
  return (
    <div className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="font-semibold">Admin Dashboard</h1>
      <div>Admin</div>
    </div>
  );
};

/* ===================== PAGES ===================== */

const DashboardHome = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="Users" value="120" />
      <Card title="Bookings" value="45" />
      <Card title="Revenue" value="$1200" />
      <Card title="Decorators" value="18" />
    </div>
  );
};

const ManageDecorators = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/decorators")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Manage Decorators</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="border-b">
            <th className="p-2">Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((d) => (
            <tr key={d._id} className="border-b">
              <td className="p-2">{d.name}</td>
              <td>{d.email}</td>
              <td>{d.status}</td>
              <td>
                <button className="text-blue-500 mr-2">Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ManageServices = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">Services</h2>

      <button className="bg-blue-500 text-white px-4 py-2 mt-4 rounded">
        + Add Service
      </button>
    </div>
  );
};

const ManageBookings = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Bookings</h2>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th>User</th>
            <th>Service</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>John</td>
            <td>Wedding Decor</td>
            <td className="text-green-600">Paid</td>
            <td>Pending</td>
            <td>
              <button className="text-blue-500">Assign</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const AssignDecorator = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Assign Decorator</h2>

      <div className="bg-white p-4 rounded shadow">
        <select className="border p-2 w-full">
          <option>Select Booking</option>
        </select>

        <select className="border p-2 w-full mt-3">
          <option>Select Decorator</option>
        </select>

        <button className="bg-green-500 text-white px-4 py-2 mt-4 rounded">
          Assign
        </button>
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white p-4 shadow rounded">
        Service Demand Chart
      </div>
      <div className="bg-white p-4 shadow rounded">
        Booking Histogram
      </div>
    </div>
  );
};

/* ===================== CARD ===================== */

const Card = ({ title, value }) => (
  <div className="bg-white p-4 shadow rounded">
    <h3 className="text-gray-500">{title}</h3>
    <p className="text-xl font-bold">{value}</p>
  </div>
);

/* ===================== ROUTES ===================== */

export default function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="decorators" element={<ManageDecorators />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="assign" element={<AssignDecorator />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}
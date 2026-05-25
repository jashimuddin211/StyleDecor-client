import { NavLink, Routes, Route, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Users, 
  Layers, 
  Calendar, 
  UserCheck, 
  BarChart2, 
  Plus, 
  Edit2, 
  Trash2, 
  Check, 
  X, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Briefcase,
  MapPin,
  ShieldCheck,
  User,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Sparkles,
  
  Menu
} from "lucide-react";



const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 font-sans overflow-hidden">
      
      {/* MOBILE BACKDROP OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden w-full">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto bg-gray-50 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};



const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const linkBase = "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium my-1";
  const activeLink = `${linkBase} bg-blue-600 text-white shadow-md shadow-blue-200`;
  const normalLink = `${linkBase} text-gray-600 hover:bg-gray-100 hover:text-gray-900`;

  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-gray-100 p-6 flex flex-col justify-between shadow-xl transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:shadow-none lg:z-0
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    `}>
      <div>
        <div className="flex items-center justify-between mb-8 px-2">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-md shadow-blue-200">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold tracking-tight text-gray-900">StyleDecor</h2>
              <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1">
          <NavLink to="/admindashboard" end className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setSidebarOpen(false)}>
            <LayoutDashboard size={20} />
            Dashboard
          </NavLink>
          <NavLink to="/admindashboard/users" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setSidebarOpen(false)}>
            <User size={20} />
            Users List
          </NavLink>
          <NavLink to="/admindashboard/decorators" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setSidebarOpen(false)}>
            <Users size={20} />
            Decorators
          </NavLink>
          <NavLink to="/admindashboard/services" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setSidebarOpen(false)}>
            <Layers size={20} />
            Services
          </NavLink>
          <NavLink to="/admindashboard/bookings" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setSidebarOpen(false)}>
            <Calendar size={20} />
            Bookings
          </NavLink>
          <NavLink to="/admindashboard/assign" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setSidebarOpen(false)}>
            <UserCheck size={20} />
            Assign Decorator
          </NavLink>
          <NavLink to="/admindashboard/analytics" className={({ isActive }) => isActive ? activeLink : normalLink} onClick={() => setSidebarOpen(false)}>
            <BarChart2 size={20} />
            Analytics
          </NavLink>

          <div className="h-px bg-gray-100 my-4"></div>

          <NavLink 
            to="/" 
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200 text-blue-600 hover:bg-blue-50 border border-dashed border-blue-200/60 shadow-sm shadow-blue-50/20"
            onClick={() => setSidebarOpen(false)}
          >
            <Sparkles size={18} />
            Website Home
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto border-t border-gray-100 pt-4 px-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
            AD
          </div>
          <div>
            <p className="font-semibold text-sm text-gray-900">System Admin</p>
            <p className="text-xs text-gray-500">admin@styledecor.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};



const Navbar = ({ setSidebarOpen }) => {
  return (
    <div className="bg-white border-b border-gray-100 px-4 sm:px-8 py-4 sm:py-5 flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-xl transition duration-150 cursor-pointer"
        >
          <Menu size={22} />
        </button>
        <h1 className="text-base sm:text-2xl font-bold text-gray-900 tracking-tight">StyleDecor Admin</h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <span className="flex h-2 w-2 sm:h-2.5 sm:w-2.5 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-green-500"></span>
        </span>
        <span className="text-[10px] sm:text-sm font-semibold text-gray-600 bg-gray-100 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap">
          Connected
        </span>
      </div>
    </div>
  );
};



const DashboardHome = () => {
  const [stats, setStats] = useState({
    users: 0,
    bookings: 0,
    revenue: 0,
    decorators: 0
  });

  useEffect(() => {
    Promise.all([
      fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/users").then(res => res.json()),
      fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        }
      }).then(res => res.json()),
      fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators").then(res => res.json())
    ]).then(([users, bookings, decorators]) => {
      const paidBookings = bookings.filter(b => b.paymentStatus === "Paid");
      const totalRevenue = paidBookings.reduce((sum, b) => sum + (b.price || 0), 0);
      setStats({
        users: users.length,
        bookings: bookings.length,
        revenue: totalRevenue,
        decorators: decorators.length
      });
    }).catch(err => console.log("Stats fetch error:", err));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-950">Welcome Back, Admin!</h2>
        <p className="text-gray-500 mt-1">Here is a quick snapshot of the system statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Total Customers" value={stats.users} icon={<Users size={22} />} gradient="from-blue-500 to-indigo-600 shadow-blue-200" />
        <Card title="Bookings Placed" value={stats.bookings} icon={<Calendar size={22} />} gradient="from-purple-500 to-pink-600 shadow-purple-200" />
        <Card title="Total Revenue" value={`৳${stats.revenue.toLocaleString()}`} icon={<DollarSign size={22} />} gradient="from-emerald-500 to-teal-600 shadow-emerald-200" />
        <Card title="Active Decorators" value={stats.decorators} icon={<Briefcase size={22} />} gradient="from-amber-500 to-orange-600 shadow-amber-200" />
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Setup Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-2xl">
            <span className="p-2 bg-blue-100 text-blue-700 font-bold rounded-xl text-center min-w-10">1</span>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Services Management</h4>
              <p className="text-xs text-gray-500 mt-1">Create and configure event packages and rates for customers to select.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-2xl">
            <span className="p-2 bg-purple-100 text-purple-700 font-bold rounded-xl text-center min-w-10">2</span>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Decorator Validation</h4>
              <p className="text-xs text-gray-500 mt-1">Approve accounts or update statuses for decorator agents.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start p-4 bg-gray-50 rounded-2xl">
            <span className="p-2 bg-emerald-100 text-emerald-700 font-bold rounded-xl text-center min-w-10">3</span>
            <div>
              <h4 className="font-semibold text-gray-900 text-sm">Decorator Assignment</h4>
              <p className="text-xs text-gray-500 mt-1">Review bookings that have paid and assign them decorator agents.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [promotingEmail, setPromotingEmail] = useState(null);

  const fetchUsers = () => {
    setLoading(true);
    fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching users:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeDecorator = (email, name) => {
    if (!window.confirm(`Are you sure you want to promote ${name} to a Decorator?`)) return;

    setPromotingEmail(email);

    fetch(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/users/decorator/${email}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(`${name} is now a Specialist Decorator!`);
          fetchUsers();
        } else {
          alert(data.message || "Failed to promote user");
        }
        setPromotingEmail(null);
      })
      .catch((err) => {
        console.error("Promotion error:", err);
        setPromotingEmail(null);
      });
  };

  const filteredUsers = users.filter(u => 
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-950">User Directory</h2>
          <p className="text-gray-500 mt-1">Manage user profiles, view registered accounts, and promote users to decorators.</p>
        </div>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-6 space-y-6">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-sm"
          />
        </div>

        {loading && users.length === 0 ? (
          <div className="flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-blue-600"></span>
          </div>
        ) : filteredUsers.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">No users found</p>
        ) : (
          <div className="overflow-x-auto border border-gray-50 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">User Details</th>
                  <th className="px-6 py-4">Current Role</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm shadow-sm">
                        {u.name?.charAt(0).toUpperCase() || <User size={16} />}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{u.name || "Unnamed User"}</div>
                        <div className="text-xs text-gray-400">{u.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${
                        u.role === "admin"
                          ? "bg-red-50 text-red-700 border border-red-100"
                          : u.role === "decorator"
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "bg-gray-100 text-gray-700"
                      }`}>
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {u.role === "admin" ? (
                        <span className="text-xs text-gray-400 font-semibold italic">Admin Account</span>
                      ) : u.role === "decorator" ? (
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-600 font-semibold">
                          <Check size={14} /> Active Decorator
                        </span>
                      ) : (
                        <button
                          onClick={() => handleMakeDecorator(u.email, u.name || "this user")}
                          disabled={promotingEmail === u.email}
                          className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition duration-150 flex items-center gap-1.5 ml-auto"
                        >
                          {promotingEmail === u.email ? (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              Promoting...
                            </>
                          ) : (
                            <>
                              <UserCheck size={14} />
                              Make Decorator
                            </>
                          )}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};



const ManageDecorators = () => {
  const [decorators, setDecorators] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentDecorator, setCurrentDecorator] = useState(null);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", specialty: "", experienceYears: "", image: "", isApproved: true
  });

  // Search and Pagination States
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchDecorators = () => {
    fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators")
      .then((res) => res.json())
      .then((data) => {
        setDecorators(data);
        setCurrentPage(1);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchDecorators();
  }, []);

  const openAddModal = () => {
    setCurrentDecorator(null);
    setFormData({
      name: "", email: "", phone: "", specialty: "", experienceYears: "1", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80", isApproved: true
    });
    setModalOpen(true);
  };

  const openEditModal = (dec) => {
    setCurrentDecorator(dec);
    setFormData({
      name: dec.name,
      email: dec.email,
      phone: dec.phone || "",
      specialty: dec.specialty || "",
      experienceYears: dec.experienceYears || "1",
      image: dec.image || "",
      isApproved: dec.isApproved !== false
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = currentDecorator 
      ? `https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators/${currentDecorator._id}`
      : "https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators";
    const method = currentDecorator ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        experienceYears: parseInt(formData.experienceYears) || 0,
        rating: currentDecorator ? currentDecorator.rating : 5,
        available: currentDecorator ? currentDecorator.available : true
      })
    })
      .then(res => res.json())
      .then(() => {
        setModalOpen(false);
        fetchDecorators();
        alert(currentDecorator ? "Decorator updated successfully" : "Decorator added successfully");
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this decorator?")) return;
    fetch(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        fetchDecorators();
        alert("Decorator deleted successfully");
      })
      .catch(err => console.error(err));
  };

  const handleToggleApproval = (dec) => {
    const nextStatus = dec.isApproved !== false ? false : true;
    fetch(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators/${dec._id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isApproved: nextStatus })
    })
      .then(res => res.json())
      .then(() => fetchDecorators())
      .catch(err => console.error(err));
  };

  // Search Logic
  const filteredDecorators = decorators.filter(d => 
    d.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.specialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination Calculations
  const totalItems = filteredDecorators.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredDecorators.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-950">Manage Decorators</h2>
          <p className="text-gray-500 mt-1">Approve, disable, and manage specialist profiles.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-blue-200 transition duration-200">
          <Plus size={20} />
          Add Decorator
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-6 space-y-6">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search decorators by name, specialty, or email..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-sm"
          />
        </div>

        {filteredDecorators.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">No decorators found</p>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-gray-50 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Decorator Info</th>
                    <th className="px-6 py-4">Specialty</th>
                    <th className="px-6 py-4">Experience</th>
                    <th className="px-6 py-4">Approval Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {currentItems.map((d) => (
                    <tr key={d._id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <img src={d.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e"} alt={d.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 shadow-sm" />
                        <div>
                          <div className="font-semibold text-gray-900">{d.name}</div>
                          <div className="text-xs text-gray-400">{d.email}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{d.specialty}</td>
                      <td className="px-6 py-4 text-gray-600 font-medium">{d.experienceYears} Years</td>
                      <td className="px-6 py-4">
                        <button onClick={() => handleToggleApproval(d)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition ${d.isApproved !== false ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-red-50 text-red-700 border border-red-100"}`}>
                          {d.isApproved !== false ? <Check size={14} /> : <X size={14} />}
                          {d.isApproved !== false ? "Approved" : "Disabled"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => openEditModal(d)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition duration-150">
                          <Edit2 size={16} />
                        </button>
                        <button onClick={() => handleDelete(d._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition duration-150">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 hover:bg-white text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent rounded-xl transition duration-150"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 font-bold text-xs rounded-xl transition duration-150 ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white shadow-md shadow-blue-150"
                          : "border border-gray-200 hover:bg-white text-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 hover:bg-white text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent rounded-xl transition duration-150"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-gray-100 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{currentDecorator ? "Edit Decorator Profile" : "Add Decorator"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Phone</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Specialty</label>
                  <input type="text" value={formData.specialty} onChange={e => setFormData({ ...formData, specialty: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Experience (Years)</label>
                  <input type="number" value={formData.experienceYears} onChange={e => setFormData({ ...formData, experienceYears: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Image URL</label>
                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex items-center gap-2.5 pt-2">
                <input type="checkbox" checked={formData.isApproved} id="isApproved" onChange={e => setFormData({ ...formData, isApproved: e.target.checked })} className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <label htmlFor="isApproved" className="text-sm font-semibold text-gray-700">Approve Account Instantly</label>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold p-3.5 rounded-2xl transition duration-150">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3.5 rounded-2xl transition duration-150">
                  {currentDecorator ? "Save Changes" : "Create Decorator"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};



const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [formData, setFormData] = useState({
    service_name: "", cost: "", unit: "per event", service_category: "wedding", description: "", image: "", createdByEmail: "admin@styledecor.com"
  });

  const [searchTerm, setSearchTerm] = useState("");

  const fetchServices = () => {
    fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const openAddModal = () => {
    setCurrentService(null);
    setFormData({
      service_name: "", cost: "", unit: "per event", service_category: "wedding", description: "", image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=60", createdByEmail: "admin@styledecor.com"
    });
    setModalOpen(true);
  };

  const openEditModal = (service) => {
    setCurrentService(service);
    setFormData({
      service_name: service.service_name,
      cost: service.cost || "",
      unit: service.unit || "per event",
      service_category: service.service_category || "wedding",
      description: service.description || "",
      image: service.image || "",
      createdByEmail: service.createdByEmail || "admin@styledecor.com"
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = currentService
      ? `https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/services/${currentService._id}`
      : "https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/services";
    const method = currentService ? "PATCH" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...formData,
        cost: parseInt(formData.cost) || 0
      })
    })
      .then(res => res.json())
      .then(() => {
        setModalOpen(false);
        fetchServices();
        alert(currentService ? "Service updated successfully" : "Service created successfully");
      })
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    fetch(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/services/${id}`, { method: "DELETE" })
      .then(res => res.json())
      .then(() => {
        fetchServices();
        alert("Service deleted successfully");
      })
      .catch(err => console.error(err));
  };

  // Search Logic
  const filteredServices = services.filter(s =>
    s.service_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.service_category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-950">Services & Packages</h2>
          <p className="text-gray-500 mt-1">Manage decor catalogues, categories, pricing, and details.</p>
        </div>
        <button onClick={openAddModal} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-2xl shadow-lg shadow-blue-200 transition duration-200">
          <Plus size={20} />
          Add Service
        </button>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm">
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search services by name or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-sm"
          />
        </div>
      </div>

      {filteredServices.length === 0 ? (
        <p className="text-sm text-gray-400 py-10 text-center bg-white border border-gray-100 rounded-3xl">No services found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((s) => (
            <div key={s._id} className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img src={s.image || "https://images.unsplash.com/photo-1606800052052-a08af7148866"} alt={s.service_name} className="w-full h-full object-cover" />
                <span className="absolute top-4 right-4 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 border border-gray-100 capitalize">
                  {s.service_category}
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col gap-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-950 leading-snug line-clamp-1">{s.service_name}</h3>
                  <p className="text-xs text-gray-400 font-medium">Created: {s.createdByEmail}</p>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{s.description}</p>
                <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                  <div>
                    <span className="text-xl font-extrabold text-gray-900">৳{s.cost?.toLocaleString()}</span>
                    <span className="text-xs text-gray-400 font-semibold ml-1">/{s.unit}</span>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => openEditModal(s)} className="p-2.5 text-blue-600 hover:bg-blue-50 rounded-xl transition duration-150" title="Edit Service">
                      <Edit2 size={16} />
                    </button>
                    <button onClick={() => handleDelete(s._id)} className="p-2.5 text-red-600 hover:bg-red-50 rounded-xl transition duration-150" title="Delete Service">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-gray-100 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{currentService ? "Edit Service" : "Add Service"}</h3>
              <button onClick={() => setModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Service Name</label>
                <input type="text" value={formData.service_name} onChange={e => setFormData({ ...formData, service_name: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Cost (৳)</label>
                  <input type="number" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Unit</label>
                  <input type="text" value={formData.unit} onChange={e => setFormData({ ...formData, unit: e.target.value })} placeholder="e.g. per event" className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Category</label>
                  <select value={formData.service_category} onChange={e => setFormData({ ...formData, service_category: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500 bg-white">
                    <option value="wedding">Wedding</option>
                    <option value="home">Home Interior</option>
                    <option value="corporate">Corporate</option>
                    <option value="birthday">Birthday/Social</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Admin Creator Email</label>
                  <input type="email" value={formData.createdByEmail} onChange={e => setFormData({ ...formData, createdByEmail: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Image URL</label>
                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Description</label>
                <textarea rows="3" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="w-full border border-gray-200 rounded-2xl p-3 focus:outline-none focus:border-blue-500" required />
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold p-3.5 rounded-2xl transition duration-150">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3.5 rounded-2xl transition duration-150">
                  {currentService ? "Save Changes" : "Create Service"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};



const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [assignModalBooking, setAssignModalBooking] = useState(null);
  const [selectedDecoratorId, setSelectedDecoratorId] = useState("");


  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("date-desc"); 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadData = () => {
    Promise.all([
      fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        }
      }).then(res => res.json()),
      fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators").then(res => res.json())
    ]).then(([bookingsData, decoratorsData]) => {
      setBookings(bookingsData);
      setDecorators(decoratorsData.filter(d => d.isApproved !== false));
      setCurrentPage(1); // Reset page on reload
    }).catch(err => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openAssignModal = (booking) => {
    setAssignModalBooking(booking);
    setSelectedDecoratorId(booking.decoratorId || "");
  };

  const handleAssignSubmit = (e) => {
    e.preventDefault();
    if (!selectedDecoratorId) {
      alert("Please select a decorator");
      return;
    }
    const decorator = decorators.find(d => d._id === selectedDecoratorId);
    if (!decorator) return;

    fetch(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings/assign/${assignModalBooking._id}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`
      },
      body: JSON.stringify({
        decoratorId: decorator._id,
        decoratorName: decorator.name,
        decoratorEmail: decorator.email
      })
    })
      .then(res => res.json())
      .then(() => {
        setAssignModalBooking(null);
        loadData();
        alert(`Assigned ${decorator.name} successfully`);
      })
      .catch(err => console.error(err));
  };

  const handleDeleteBooking = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    fetch(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings/${id}`, { 
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`
      }
    })
      .then(res => res.json())
      .then(() => {
        loadData();
        alert("Booking cancelled");
      })
      .catch(err => console.error(err));
  };

  // Search Logic
  const filteredBookings = bookings.filter(b => 
    b.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.serviceName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sorting Logic
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (sortField === "date-desc") {
      return new Date(b.date) - new Date(a.date);
    }
    if (sortField === "date-asc") {
      return new Date(a.date) - new Date(b.date);
    }
    if (sortField === "status-asc") {
      return (a.paymentStatus || "Unpaid").localeCompare(b.paymentStatus || "Unpaid");
    }
    if (sortField === "status-desc") {
      return (b.paymentStatus || "Unpaid").localeCompare(a.paymentStatus || "Unpaid");
    }
    return 0;
  });

  // Pagination Calculations
  const totalItems = sortedBookings.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-950">Manage Bookings</h2>
        <p className="text-gray-500 mt-1">Review orders, verify payments, and assign on-site decorators.</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="w-full max-w-md">
            <input
              type="text"
              placeholder="Search bookings by customer name, email, or service..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-sm"
            />
          </div>

          <div className="flex items-center gap-2.5 shrink-0 bg-gray-50 border border-gray-200 px-4 py-2.5 rounded-2xl shadow-sm">
            <ArrowUpDown size={15} className="text-gray-400" />
            <select
              value={sortField}
              onChange={(e) => {
                setSortField(e.target.value);
                setCurrentPage(1);
              }}
              className="text-xs font-bold text-gray-600 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer"
            >
              <option value="date-desc">Date: Latest</option>
              <option value="date-asc">Date: Oldest</option>
              <option value="status-asc">Status: Unpaid ➔ Paid</option>
              <option value="status-desc">Status: Paid ➔ Unpaid</option>
            </select>
          </div>
        </div>

        {sortedBookings.length === 0 ? (
          <p className="text-sm text-gray-400 py-10 text-center">No bookings found</p>
        ) : (
          <div className="space-y-4">
            <div className="overflow-x-auto border border-gray-50 rounded-2xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <th className="px-6 py-4">Customer Info</th>
                    <th className="px-6 py-4">Service Required</th>
                    <th className="px-6 py-4">Pricing & Date</th>
                    <th className="px-6 py-4">Payment</th>
                    <th className="px-6 py-4">Assigned Agent</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {currentItems.map((b) => (
                    <tr key={b._id} className="hover:bg-gray-50/50 transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{b.userName}</div>
                        <div className="text-xs text-gray-400">{b.userEmail}</div>
                        <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-1">
                          <MapPin size={10} /> {b.location}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900">{b.serviceName}</div>
                        <div className="text-xs text-gray-500">Status: {b.status}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-bold text-gray-900">৳{b.price?.toLocaleString()}</div>
                        <div className="text-xs text-gray-400">{b.date}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold ${b.paymentStatus === "Paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" : "bg-orange-50 text-orange-700 border border-orange-100"}`}>
                          {b.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {b.decoratorName ? (
                          <div>
                            <div className="font-semibold text-gray-900">{b.decoratorName}</div>
                            <div className="text-xs text-gray-400">{b.decoratorEmail}</div>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium">None Assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        {b.paymentStatus === "Paid" ? (
                          <button onClick={() => openAssignModal(b)} className="px-3.5 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition duration-150">
                            {b.decoratorName ? "Re-assign" : "Assign"}
                          </button>
                        ) : (
                          <button className="px-3.5 py-1.5 bg-gray-50 text-gray-400 cursor-not-allowed rounded-xl text-xs font-bold border border-gray-100" disabled title="Assigning requires paid booking">
                            Awaiting Pay
                          </button>
                        )}
                        <button onClick={() => handleDeleteBooking(b._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition duration-150" title="Cancel Booking">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination controls */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
                </div>
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="p-2 border border-gray-200 hover:bg-white text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent rounded-xl transition duration-150"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-9 h-9 font-bold text-xs rounded-xl transition duration-150 ${
                        currentPage === i + 1
                          ? "bg-blue-600 text-white shadow-md shadow-blue-150"
                          : "border border-gray-200 hover:bg-white text-gray-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="p-2 border border-gray-200 hover:bg-white text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent rounded-xl transition duration-150"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ASSIGN MODAL */}
      {assignModalBooking && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 border border-gray-100 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Assign On-Site Decorator</h3>
                <p className="text-xs text-gray-500 mt-1">{assignModalBooking.serviceName} ({assignModalBooking.userName})</p>
              </div>
              <button onClick={() => setAssignModalBooking(null)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1.5">Select Approved Decorator</label>
                <select value={selectedDecoratorId} onChange={e => setSelectedDecoratorId(e.target.value)} className="w-full border border-gray-200 rounded-2xl p-3.5 focus:outline-none focus:border-blue-500 bg-white" required>
                  <option value="">-- Choose Decorator --</option>
                  {decorators.map(d => (
                    <option key={d._id} value={d._id}>
                      {d.name} ({d.specialty}) - {d.experienceYears} Years Exp
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button type="button" onClick={() => setAssignModalBooking(null)} className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold p-3.5 rounded-2xl transition duration-150">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3.5 rounded-2xl transition duration-150">
                  Assign Agent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};



const AssignDecorator = () => {
  const [unassignedBookings, setUnassignedBookings] = useState([]);
  const [decorators, setDecorators] = useState([]);
  const [selectedDecoratorIds, setSelectedDecoratorIds] = useState({});

  const loadData = () => {
    Promise.all([
      fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        }
      }).then(res => res.json()),
      fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/decorators").then(res => res.json())
    ]).then(([bookings, decoratorsData]) => {
      // Filter: Paid but unassigned bookings
      const unassigned = bookings.filter(b => b.paymentStatus === "Paid" && !b.decoratorName);
      setUnassignedBookings(unassigned);
      setDecorators(decoratorsData.filter(d => d.isApproved !== false));
    }).catch(err => console.error(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleQuickAssign = (bookingId) => {
    const decoratorId = selectedDecoratorIds[bookingId];
    if (!decoratorId) {
      alert("Please select a decorator first");
      return;
    }
    const decorator = decorators.find(d => d._id === decoratorId);
    if (!decorator) return;

    fetch(`https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings/assign/${bookingId}`, {
      method: "PATCH",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`
      },
      body: JSON.stringify({
        decoratorId: decorator._id,
        decoratorName: decorator.name,
        decoratorEmail: decorator.email
      })
    })
      .then(res => res.json())
      .then(() => {
        loadData();
        alert(`Assigned ${decorator.name} successfully!`);
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-950">On-Site Decorator Queue</h2>
        <p className="text-gray-500 mt-1">Quick-assign decorators to bookings with cleared payments.</p>
      </div>

      {unassignedBookings.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-12 text-center shadow-sm">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-100">
            <Check size={28} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">All Caught Up!</h3>
          <p className="text-gray-500 mt-1">There are no pending, paid bookings that require decorator assignments.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {unassignedBookings.map((b) => (
            <div key={b._id} className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100">Paid</span>
                  <h3 className="font-bold text-lg text-gray-950 mt-2">{b.serviceName}</h3>
                  <p className="text-xs text-gray-400 mt-0.5">Booking ID: {b._id}</p>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-gray-900">৳{b.price?.toLocaleString()}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{b.date}</div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-2xl text-xs space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-400">Customer:</span>
                  <span className="font-semibold text-gray-900">{b.userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-400">Email:</span>
                  <span className="font-semibold text-gray-900">{b.userEmail}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-400">Location:</span>
                  <span className="font-semibold text-gray-900">{b.location}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-2">
                <select value={selectedDecoratorIds[b._id] || ""} onChange={e => setSelectedDecoratorIds({ ...selectedDecoratorIds, [b._id]: e.target.value })} className="flex-1 border border-gray-200 rounded-2xl px-4 py-3 focus:outline-none focus:border-blue-500 bg-white text-sm">
                  <option value="">-- Select Decorator --</option>
                  {decorators.map(d => (
                    <option key={d._id} value={d._id}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
                <button onClick={() => handleQuickAssign(b._id)} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-2xl text-sm transition">
                  Assign
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};



const Analytics = () => {
  const [bookings, setBookings] = useState([]);
  const [metrics, setMetrics] = useState({
    earned: 0,
    pending: 0,
    average: 0
  });

  useEffect(() => {
    fetch("https://style-decor-server-l3yaoxh30-jashimuddin211s-projects.vercel.app/bookings", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        const earned = data.filter(b => b.paymentStatus === "Paid").reduce((sum, b) => sum + (b.price || 0), 0);
        const pending = data.filter(b => b.paymentStatus !== "Paid").reduce((sum, b) => sum + (b.price || 0), 0);
        const average = data.length > 0 ? (earned + pending) / data.length : 0;
        setMetrics({ earned, pending, average });
      })
      .catch(err => console.error(err));
  }, []);

  
  const categoryCounts = bookings.reduce((acc, b) => {
    const name = b.serviceName || "Other";
    acc[name] = (acc[name] || 0) + 1;
    return acc;
  }, {});

  const totalBookingsCount = bookings.length;
  const demandData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
    percentage: totalBookingsCount > 0 ? (count / totalBookingsCount) * 100 : 0
  })).sort((a, b) => b.count - a.count);

  // Compute Location Histogram data (bookings by location)
  const locationCounts = bookings.reduce((acc, b) => {
    const loc = b.location ? b.location.charAt(0).toUpperCase() + b.location.slice(1) : "Other";
    acc[loc] = (acc[loc] || 0) + 1;
    return acc;
  }, {});

  const locationData = Object.entries(locationCounts).map(([name, count]) => ({ name, count }));
  const maxLocationCount = locationData.length > 0 ? Math.max(...locationData.map(d => d.count)) : 1;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-950">Analytics & Reports</h2>
        <p className="text-gray-500 mt-1">Real-time revenue monitoring and interactive service demand analytics.</p>
      </div>

      {/* REVENUE METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Earned Revenue</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">৳{metrics.earned.toLocaleString()}</h3>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-0.5">
              <TrendingUp size={12} /> Clear funds in DB
            </p>
          </div>
          <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending Revenue</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">৳{metrics.pending.toLocaleString()}</h3>
            <p className="text-[11px] text-orange-600 font-semibold mt-1 flex items-center gap-0.5">
              <Clock size={12} /> Awaiting payments
            </p>
          </div>
          <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl border border-orange-100">
            <Clock size={24} />
          </div>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg. Booking Value</p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">৳{Math.round(metrics.average).toLocaleString()}</h3>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">Across all {totalBookingsCount} bookings</p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100">
            <LayoutDashboard size={24} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* SERVICE DEMAND CHART */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-950 mb-6">Service Demand Share</h3>

          {demandData.length === 0 ? (
            <p className="text-sm text-gray-400 py-10 text-center">No service booking data available</p>
          ) : (
            <div className="flex-1 flex flex-col justify-center gap-5">
              {demandData.slice(0, 5).map((item, idx) => (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold text-gray-700">
                    <span className="truncate max-w-[70%]">{item.name}</span>
                    <span>{item.count} Bookings ({Math.round(item.percentage)}%)</span>
                  </div>
                  {/* SVG Bar Chart representing item */}
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                        idx === 0 ? "from-blue-500 to-indigo-600" :
                        idx === 1 ? "from-purple-500 to-pink-500" :
                        idx === 2 ? "from-emerald-500 to-teal-500" :
                        "from-amber-500 to-orange-500"
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BOOKING HISTOGRAM (BY LOCATION) */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-950 mb-6">Bookings by Location</h3>

          {locationData.length === 0 ? (
            <p className="text-sm text-gray-400 py-10 text-center">No location booking data available</p>
          ) : (
            <div className="flex-1 h-64 flex items-end gap-6 pt-4 px-2 border-b border-gray-100">
              {locationData.map((item) => {
                const barHeight = (item.count / maxLocationCount) * 100;
                return (
                  <div key={item.name} className="flex-1 flex flex-col items-center gap-3 h-full justify-end group">
                    <div className="text-xs font-bold text-gray-900 opacity-0 group-hover:opacity-100 transition duration-150">
                      {item.count}
                    </div>
                    {/* SVG/CSS Column representing vertical bar */}
                    <div 
                      className="w-8 rounded-t-lg bg-gradient-to-t from-blue-600 to-indigo-400 group-hover:from-blue-700 group-hover:to-indigo-500 shadow-md shadow-blue-50 transition-all duration-300"
                      style={{ height: `${barHeight * 0.7}%`, minHeight: "10%" }}
                    />
                    <div className="text-[11px] font-bold text-gray-400 truncate max-w-full pb-1">
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



const Card = ({ title, value, icon, gradient }) => (
  <div className={`p-6 rounded-3xl text-white shadow-xl bg-gradient-to-br ${gradient} flex items-center justify-between`}>
    <div className="space-y-1">
      <p className="text-xs font-bold text-white/70 uppercase tracking-wider">{title}</p>
      <p className="text-3xl font-extrabold tracking-tight">{value}</p>
    </div>
    <div className="p-3 bg-white/10 rounded-2xl border border-white/10">
      {icon}
    </div>
  </div>
);



export default function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<DashboardHome />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="decorators" element={<ManageDecorators />} />
        <Route path="services" element={<ManageServices />} />
        <Route path="bookings" element={<ManageBookings />} />
        <Route path="assign" element={<AssignDecorator />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
    </Routes>
  );
}
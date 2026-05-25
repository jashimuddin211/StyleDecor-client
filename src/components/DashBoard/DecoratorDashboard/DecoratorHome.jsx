import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import {
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  TrendingUp,
  MapPin,
  Phone,
  User,
  Sparkles,
  Award,
  ChevronRight,
  Briefcase,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";

const DecoratorHome = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:4000/bookings?decoratorEmail=${user.email}`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        }
      })
        .then((res) => res.json())
        .then((data) => {
          setBookings(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching decorator bookings:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // Compute Today's Date in YYYY-MM-DD format (local timezone)
  const getTodayString = () => {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayStr = getTodayString();

  // Metrics computation
  const totalProjects = bookings.length;
  const activeProjects = bookings.filter(b => b.status !== "Completed").length;
  const completedProjects = bookings.filter(b => b.status === "Completed").length;

  // Earnings: completed and paid
  const totalEarnings = bookings
    .filter(b => b.status === "Completed" && b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + (b.price || 0), 0);

  // Pending Earnings: in-progress or unpaid
  const pendingEarnings = bookings
    .filter(b => b.status !== "Completed" || b.paymentStatus !== "Paid")
    .reduce((sum, b) => sum + (b.price || 0), 0);

  // Filter Today's Schedule
  const todaysSchedule = bookings.filter(b => b.date === todayStr);

  // Group by Category for SVG breakdown chart
  // Since bookings have service category from the service collection, and booking holds serviceName,
  // we can map the serviceName or just build standard mock segments for visual brilliance,
  // or count categories if available, else use custom logic.
  const categoryCounts = bookings.reduce((acc, b) => {
    const cat = b.serviceName?.toLowerCase().includes("wedding") ? "Wedding" 
              : b.serviceName?.toLowerCase().includes("interior") || b.serviceName?.toLowerCase().includes("home") ? "Interior" 
              : b.serviceName?.toLowerCase().includes("corporate") ? "Corporate" 
              : "Social/Socials";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const categoryColors = {
    Wedding: "#EC4899", // Pink
    Interior: "#3B82F6", // Blue
    Corporate: "#10B981", // Emerald
    "Social/Socials": "#F59E0B" // Amber
  };

  const totalCountForCategories = Object.values(categoryCounts).reduce((sum, v) => sum + v, 0) || 1;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-100"></div>
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-600 animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Premium Dynamic Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-8 shadow-xl border border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-indigo-500/30">
              <Sparkles size={12} />
              Decorator Workspace
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-indigo-200">
              Welcome Back, {user?.displayName || "Designer"}! 🎨
            </h1>
            <p className="text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
              Create breathtaking spaces today. You have <span className="text-indigo-400 font-bold">{activeProjects} active projects</span> in your pipeline.
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="assigned-projects" className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 px-6 rounded-2xl shadow-lg shadow-blue-900/30 font-semibold transition-all duration-200">
              Manage Projects
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Metric: Total Earnings */}
        <div className="relative overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Earnings</p>
              <h3 className="text-3xl font-black text-gray-900">৳{totalEarnings.toLocaleString()}</h3>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-2">
                <TrendingUp size={12} /> Clear funds from completed jobs
              </p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm">
              <DollarSign size={22} />
            </div>
          </div>
        </div>

        {/* Metric: Active Projects */}
        <div className="relative overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Active Pipeline</p>
              <h3 className="text-3xl font-black text-blue-600">{activeProjects}</h3>
              <p className="text-[11px] text-gray-400 font-medium flex items-center gap-0.5 mt-2">
                <Clock size={12} /> Currently in development
              </p>
            </div>
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 shadow-sm">
              <Briefcase size={22} />
            </div>
          </div>
        </div>

        {/* Metric: Completed Projects */}
        <div className="relative overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Completed Jobs</p>
              <h3 className="text-3xl font-black text-gray-900">{completedProjects}</h3>
              <p className="text-[11px] text-gray-400 font-medium flex items-center gap-0.5 mt-2">
                <CheckCircle size={12} /> Breathtaking setups delivered
              </p>
            </div>
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm">
              <Award size={22} />
            </div>
          </div>
        </div>

        {/* Metric: Pending Earnings */}
        <div className="relative overflow-hidden bg-white border border-gray-100 shadow-sm rounded-3xl p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Pending/Est. Earnings</p>
              <h3 className="text-3xl font-black text-amber-600">৳{pendingEarnings.toLocaleString()}</h3>
              <p className="text-[11px] text-amber-500 font-semibold flex items-center gap-0.5 mt-2">
                <Clock size={12} /> Awaiting final pay/completion
              </p>
            </div>
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 shadow-sm">
              <TrendingUp size={22} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Today's Schedule timeline */}
        <div className="lg:col-span-2 bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Today's Schedule</h2>
              <p className="text-xs text-gray-400 mt-1">Decoration sites you need to supervise or setup today ({todayStr})</p>
            </div>
            <span className="px-3 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 font-bold rounded-2xl text-xs flex items-center gap-1.5">
              <Calendar size={14} />
              {todaysSchedule.length} Events
            </span>
          </div>

          {todaysSchedule.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-10 px-4 text-center border-2 border-dashed border-gray-100 rounded-2xl">
              <div className="w-16 h-16 bg-blue-50 text-blue-500 border border-blue-100 rounded-2xl flex items-center justify-center mb-4">
                <Sparkles size={28} className="animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">No events scheduled today</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm">
                Take a breather or spend time planning your designs and sourcing materials for upcoming events!
              </p>
            </div>
          ) : (
            <div className="flex-1 space-y-6">
              {todaysSchedule.map((job, idx) => (
                <div key={job._id} className="relative flex gap-4 group">
                  {/* Timeline bar line */}
                  {idx !== todaysSchedule.length - 1 && (
                    <span className="absolute left-6 top-12 bottom-[-24px] w-0.5 bg-gray-100 group-hover:bg-blue-100 transition duration-300"></span>
                  )}

                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 font-bold text-sm shadow-sm group-hover:scale-105 transition-all duration-300">
                    {idx + 1}
                  </div>

                  <div className="flex-1 bg-gray-50/50 border border-gray-100 rounded-2xl p-5 hover:bg-white hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col md:flex-row justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          job.status === "Completed" ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
                          job.status === "Setup in Progress" ? "bg-blue-50 text-blue-700 border border-blue-100" :
                          "bg-yellow-50 text-yellow-700 border border-yellow-100"
                        }`}>
                          {job.status}
                        </span>
                        <span className="text-[11px] text-gray-400">৳ {job.price?.toLocaleString()}</span>
                      </div>
                      <h4 className="font-extrabold text-gray-900 text-base leading-snug">{job.serviceName}</h4>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-500 pt-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-gray-400" />
                          <span className="truncate max-w-[200px]">{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <User size={12} className="text-gray-400" />
                          <span>{job.userName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col justify-between md:justify-end items-end gap-2 border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                      <a href={`tel:${job.userPhone || "01700000000"}`} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition duration-150 flex items-center gap-1 text-xs font-semibold">
                        <Phone size={14} />
                        Call Client
                      </a>
                      <Link to="assigned-projects" className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition shadow-sm">
                        Update Status
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Analytics Breakdown Card */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Portfolio Breakdown</h2>
            <p className="text-xs text-gray-400 mt-1">Visual distribution of your projects by category</p>
          </div>

          <div className="my-6 flex justify-center items-center">
            {totalProjects === 0 ? (
              <div className="text-center text-gray-400 py-10">
                <AlertCircle size={28} className="mx-auto mb-2 opacity-50" />
                <p className="text-xs">No analytics data available</p>
              </div>
            ) : (
              <div className="relative w-44 h-44 flex items-center justify-center">
                {/* Visual SVG Ring Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F1F5F9" strokeWidth="8" />
                  
                  {/* Draw overlapping segments */}
                  {Object.entries(categoryCounts).map(([cat, count], idx, arr) => {
                    const percentage = (count / totalCountForCategories) * 100;
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;
                    
                    // Calculate offset
                    let prevPercentageSum = 0;
                    for (let i = 0; i < idx; i++) {
                      const prevCount = arr[i][1];
                      prevPercentageSum += (prevCount / totalCountForCategories) * 100;
                    }
                    const strokeDashoffset = -((prevPercentageSum / 100) * circumference);

                    return (
                      <circle
                        key={cat}
                        cx="50"
                        cy="50"
                        r={radius}
                        fill="transparent"
                        stroke={categoryColors[cat] || "#6366F1"}
                        strokeWidth="8"
                        strokeDasharray={strokeDasharray}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        className="transition-all duration-500 hover:stroke-[10px]"
                      />
                    );
                  })}
                </svg>

                <div className="absolute text-center bg-white rounded-full w-32 h-32 flex flex-col justify-center items-center shadow-sm">
                  <span className="text-3xl font-black text-gray-900">{totalProjects}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Total Jobs</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2.5">
            {Object.entries(categoryColors).map(([cat, color]) => {
              const count = categoryCounts[cat] || 0;
              const pct = totalProjects > 0 ? Math.round((count / totalProjects) * 100) : 0;

              return (
                <div key={cat} className="flex justify-between items-center text-xs border-b border-gray-50 pb-2 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                    <span className="font-bold text-gray-700">{cat}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-black text-gray-900">{count}</span>
                    <span className="text-[10px] text-gray-400 font-semibold">({pct}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecoratorHome;

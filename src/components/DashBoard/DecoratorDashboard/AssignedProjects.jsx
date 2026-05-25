import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import { useToast } from "../../../provider/ToastProvider";
import {
  Calendar,
  MapPin,
  User,
  
  Phone,
  Mail,
  CheckCircle,
  Clock,
  Layers,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Inbox
} from "lucide-react";

// Project decoration steps
const STAGES = [
  "Assigned",
  "Planning & Design",
  "Material Sourcing",
  "Setup in Progress",
  "Finishing Touches",
  "Completed"
];

const AssignedProjects = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("active"); // "all" | "active" | "completed"
  const [updatingId, setUpdatingId] = useState(null);

  const fetchBookings = () => {
    if (user?.email) {
      setLoading(true);
      fetch(`https://style-decor-server-sepia.vercel.app/bookings?decoratorEmail=${user.email}`, {
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
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  // Update Status in backend
  const handleUpdateStatus = (id, currentStatus) => {
    const currentIndex = STAGES.indexOf(currentStatus);
    if (currentIndex === -1 || currentIndex === STAGES.length - 1) return;

    const nextStatus = STAGES[currentIndex + 1];
    
    setUpdatingId(id);

    fetch(`https://style-decor-server-sepia.vercel.app/bookings/status/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`
      },
      body: JSON.stringify({ status: nextStatus })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // Update state locally
          setBookings(prev => prev.map(b => b._id === id ? { ...b, status: nextStatus } : b));
          toast.success(`Successfully advanced status to "${nextStatus}"!`);
        } else {
          toast.error("Failed to update status");
        }
        setUpdatingId(null);
      })
      .catch((err) => {
        console.error("Status update error:", err);
        toast.error("Network error while updating status.");
        setUpdatingId(null);
      });
  };

  // Filter logic
  const filteredBookings = bookings.filter((b) => {
    if (filter === "completed") {
      return b.status === "Completed";
    }
    if (filter === "active") {
      return b.status !== "Completed";
    }
    return true; // "all"
  });

  if (loading && bookings.length === 0) {
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
      {/* Title Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight">
          My Assigned Projects
        </h1>
        <p className="text-gray-500 mt-1">
          Monitor your active project timeline and advance delivery stages step-by-step.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1">
          <button
            onClick={() => setFilter("active")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
              filter === "active"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-950"
            }`}
          >
            Active Pipeline ({bookings.filter(b => b.status !== "Completed").length})
          </button>
          <button
            onClick={() => setFilter("completed")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
              filter === "completed"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-950"
            }`}
          >
            Completed Projects ({bookings.filter(b => b.status === "Completed").length})
          </button>
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
              filter === "all"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-500 hover:text-gray-950"
            }`}
          >
            All Bookings ({bookings.length})
          </button>
        </div>
      </div>

      {/* Bookings Queue */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-16 text-center shadow-sm max-w-xl mx-auto">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 border border-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Inbox size={26} />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No projects found</h3>
          <p className="text-sm text-gray-400 mt-1">
            There are currently no assigned projects matching the selected tab.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredBookings.map((b) => {
            const currentStageIndex = STAGES.indexOf(b.status !== undefined && STAGES.includes(b.status) ? b.status : "Assigned");
            const isCompleted = b.status === "Completed";

            return (
              <div
                key={b._id}
                className="bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition duration-300 p-6 flex flex-col gap-6"
              >
                {/* Upper Info Row */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 pb-4 border-b border-gray-50">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                        isCompleted
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-blue-50 text-blue-700 border-blue-100"
                      }`}>
                        {b.status}
                      </span>
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                        b.paymentStatus === "Paid"
                          ? "bg-indigo-50 text-indigo-700 border-indigo-100"
                          : "bg-orange-50 text-orange-700 border-orange-100"
                      }`}>
                        {b.paymentStatus === "Paid" ? "Paid" : "Awaiting Payment"}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-gray-950 leading-tight">
                      {b.serviceName}
                    </h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Booking ID: {b._id}
                    </p>
                  </div>

                  <div className="text-left lg:text-right shrink-0">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Estimated Value</span>
                    <h4 className="text-2xl font-black text-gray-950">৳ {b.price?.toLocaleString()}</h4>
                  </div>
                </div>

                {/* Grid Split: Client Profile vs Site & Date Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                  {/* Customer details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User size={12} /> Client Details
                    </h4>
                    <div className="space-y-1.5 text-sm">
                      <div className="font-bold text-gray-900">{b.userName}</div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Mail size={13} className="text-gray-400" />
                        <span>{b.userEmail}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-500 text-xs">
                        <Phone size={13} className="text-gray-400" />
                        <a href={`tel:${b.userPhone || "01700000000"}`} className="hover:text-blue-600 transition">
                          {b.userPhone || "+880 1700-000000"}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Site details */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Layers size={12} /> Event Schedule & Site
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 font-bold text-gray-900">
                        <Calendar size={14} className="text-blue-600" />
                        <span>{b.date}</span>
                      </div>
                      <div className="flex items-start gap-2 text-gray-600 text-xs leading-relaxed">
                        <MapPin size={14} className="text-red-500 mt-0.5 shrink-0" />
                        <span>{b.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Stepper Tracker Section */}
                <div className="space-y-4 pt-2">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp size={12} /> Project Progression Workflow
                  </h4>

                  {/* Desktop Stepper */}
                  <div className="hidden lg:flex justify-between items-center w-full relative px-2">
                    {/* Background Connecting Bar */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-100 -translate-y-1/2 z-0 rounded-full"></div>
                    <div
                      className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
                      style={{
                        width: `${(currentStageIndex / (STAGES.length - 1)) * 100}%`
                      }}
                    ></div>

                    {STAGES.map((stage, idx) => {
                      const isActive = idx <= currentStageIndex;
                      const isCurrent = idx === currentStageIndex;

                      return (
                        <div key={stage} className="relative z-10 flex flex-col items-center gap-2">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-xs shadow-sm transition-all duration-300 ${
                              isCompleted
                                ? "bg-emerald-500 border-emerald-500 text-white"
                                : isCurrent
                                ? "bg-blue-600 border-blue-600 text-white ring-4 ring-blue-100"
                                : isActive
                                ? "bg-blue-600 border-blue-600 text-white"
                                : "bg-white border-gray-200 text-gray-400"
                            }`}
                          >
                            {isActive ? <CheckCircle size={14} /> : idx + 1}
                          </div>
                          <span
                            className={`text-[10px] font-bold tracking-wide text-center max-w-[80px] leading-tight transition-colors duration-200 ${
                              isCurrent
                                ? "text-blue-600 font-extrabold"
                                : isActive
                                ? "text-gray-900"
                                : "text-gray-400"
                            }`}
                          >
                            {stage}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Mobile Stepper / Accordion status helper */}
                  <div className="lg:hidden p-4 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-blue-600" />
                      <div className="text-xs">
                        <p className="font-bold text-gray-500">Current Stage</p>
                        <p className="text-sm font-extrabold text-gray-900">{STAGES[currentStageIndex]}</p>
                      </div>
                    </div>
                    {!isCompleted && (
                      <div className="text-right text-xs">
                        <p className="font-bold text-gray-400">Next Up</p>
                        <p className="text-blue-600 font-extrabold">{STAGES[currentStageIndex + 1]}</p>
                      </div>
                    )}
                  </div>

                  {/* Actions Area */}
                  {!isCompleted && (
                    <div className="flex justify-end pt-4 border-t border-gray-50">
                      <button
                        onClick={() => handleUpdateStatus(b._id, b.status)}
                        disabled={updatingId === b._id}
                        className="btn bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 disabled:text-gray-400 text-white border-0 px-6 py-3 rounded-2xl font-bold text-xs shadow-md shadow-blue-100 transition duration-150 flex items-center gap-2"
                      >
                        {updatingId === b._id ? (
                          <>
                            <span className="loading loading-spinner loading-xs"></span>
                            Updating...
                          </>
                        ) : (
                          <>
                            <Sparkles size={14} />
                            Advance Stage to "{STAGES[currentStageIndex + 1]}"
                            <ArrowRight size={14} />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AssignedProjects;

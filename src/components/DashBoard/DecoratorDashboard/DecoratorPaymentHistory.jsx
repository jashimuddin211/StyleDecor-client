import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import {
  DollarSign,
  Clock,
  Search,
  Filter,
  CreditCard,
  Calendar,
  Hash,
  User,
  CheckCircle,
  AlertCircle
} from "lucide-react";

const DecoratorPaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // "all" | "Paid" | "Unpaid"

  useEffect(() => {
    if (user?.email) {
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
          console.error("Error fetching decorator payment bookings:", err);
          setLoading(false);
        });
    }
  }, [user]);

  // Metrics
  const totalEarned = bookings
    .filter((b) => b.status === "Completed" && b.paymentStatus === "Paid")
    .reduce((sum, b) => sum + (b.price || 0), 0);

  const pendingEarned = bookings
    .filter((b) => b.status !== "Completed" || b.paymentStatus !== "Paid")
    .reduce((sum, b) => sum + (b.price || 0), 0);

  const totalAssignedValue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

  // Filter and search bookings
  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.transactionId?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || b.paymentStatus === statusFilter;

    return matchesSearch && matchesStatus;
  });

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
      {/* Title Header */}
      <div>
        <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight">
          Earnings & Payment History
        </h1>
        <p className="text-gray-500 mt-1">
          Review clear funds, pending payments, and transaction history for your assigned services.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Cleared Earnings */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex justify-between items-center transition hover:shadow-md">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Cleared Earnings</span>
            <h3 className="text-3xl font-black text-gray-900">৳ {totalEarned.toLocaleString()}</h3>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 pt-1">
              <CheckCircle size={12} /> Paid and Completed
            </span>
          </div>
          <div className="p-3.5 bg-emerald-50 text-emerald-600 rounded-2xl border border-emerald-100 shadow-sm">
            <DollarSign size={24} />
          </div>
        </div>

        {/* Pending/Est Earnings */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex justify-between items-center transition hover:shadow-md">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Pipeline/Awaiting Pay</span>
            <h3 className="text-3xl font-black text-amber-600">৳ {pendingEarned.toLocaleString()}</h3>
            <span className="text-[11px] text-amber-500 font-semibold flex items-center gap-0.5 pt-1">
              <Clock size={12} /> Unpaid or In-Progress
            </span>
          </div>
          <div className="p-3.5 bg-amber-50 text-amber-600 rounded-2xl border border-amber-100 shadow-sm">
            <Clock size={24} />
          </div>
        </div>

        {/* Total Contracted Value */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl p-6 flex justify-between items-center transition hover:shadow-md">
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Total Allocated Contracts</span>
            <h3 className="text-3xl font-black text-gray-900">৳ {totalAssignedValue.toLocaleString()}</h3>
            <span className="text-[11px] text-indigo-600 font-semibold flex items-center gap-0.5 pt-1">
              <CreditCard size={12} /> Combined book value
            </span>
          </div>
          <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 shadow-sm">
            <CreditCard size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Table Container */}
      <div className="bg-white border border-gray-100 rounded-3xl shadow-sm overflow-hidden p-6 space-y-6">
        {/* Search/Filters row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search by service, customer name, transaction ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0 justify-end">
            <Filter size={15} className="text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 bg-white text-sm font-semibold text-gray-700"
            >
              <option value="all">All Payments</option>
              <option value="Paid">Paid</option>
              <option value="Unpaid">Unpaid</option>
            </select>
          </div>
        </div>

        {/* Payments Table */}
        {filteredBookings.length === 0 ? (
          <div className="text-center py-12 border-t border-gray-50">
            <AlertCircle size={28} className="mx-auto text-gray-400 mb-2 opacity-65" />
            <h4 className="font-bold text-gray-900">No transactions found</h4>
            <p className="text-xs text-gray-400 mt-0.5">Adjust search criteria or filter options</p>
          </div>
        ) : (
          <div className="overflow-x-auto border border-gray-50 rounded-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Customer Details</th>
                  <th className="px-6 py-4">Service Details</th>
                  <th className="px-6 py-4">Contract Price</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4">Payment Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 text-sm">
                {filteredBookings.map((b) => (
                  <tr key={b._id} className="hover:bg-gray-50/50 transition">
                    {/* Customer */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                          {b.userName?.charAt(0) || <User size={12} />}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{b.userName}</div>
                          <div className="text-[11px] text-gray-400">{b.userEmail}</div>
                        </div>
                      </div>
                    </td>

                    {/* Service */}
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{b.serviceName}</div>
                      <div className="text-[11px] text-gray-500 flex items-center gap-1">
                        <Calendar size={11} className="text-gray-400" />
                        <span>Event Date: {b.date}</span>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="px-6 py-4 font-extrabold text-gray-950">
                      ৳ {b.price?.toLocaleString()}
                    </td>

                    {/* Badge */}
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${
                        b.paymentStatus === "Paid"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                          : "bg-orange-50 text-orange-700 border-orange-100"
                      }`}>
                        {b.paymentStatus === "Paid" ? "Paid" : "Unpaid"}
                      </span>
                    </td>

                    {/* Transaction ID */}
                    <td className="px-6 py-4 font-mono text-xs text-gray-500">
                      {b.transactionId ? (
                        <span className="flex items-center gap-1">
                          <Hash size={11} className="text-gray-400" />
                          {b.transactionId}
                        </span>
                      ) : (
                        <span className="text-gray-400 italic">None</span>
                      )}
                    </td>

                    {/* Payment Date */}
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {b.paidAt ? (
                        new Date(b.paidAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })
                      ) : (
                        <span className="text-gray-400 italic">Pending Completion/Payment</span>
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

export default DecoratorPaymentHistory;

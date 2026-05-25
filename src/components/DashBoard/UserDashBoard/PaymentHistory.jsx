import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthContext";
import { useToast } from "../../../provider/ToastProvider";
import {
  CreditCard,
  Calendar,
  BadgeCheck,
  Printer,
  X,
  ShieldCheck,
  Award,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [payingId, setPayingId] = useState(null);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  // Sorting and Pagination states
  const [sortField, setSortField] = useState("date-desc"); // "date-desc" | "date-asc" | "status-asc" | "status-desc"
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    let active = true;

    const fetchBookings = async (retries = 5) => {
      if (!user?.email) return;

      const token = localStorage.getItem("access-token");
      if (!token && retries > 0) {
        // Wait and retry if token is not available yet due to race condition
        setTimeout(() => {
          if (active) fetchBookings(retries - 1);
        }, 200);
        return;
      }

      try {
        const res = await fetch(`http://localhost:4000/bookings?email=${user.email}`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await res.json();

        if (active) {
          if (Array.isArray(data)) {
            setBookings(data);
          } else {
            console.error("Expected array but got:", data);
            setBookings([]);
          }
          setLoading(false);
        }
      } catch (err) {
        console.error("Error loading payment bookings:", err);
        if (active) {
          setBookings([]);
          setLoading(false);
        }
      }
    };

    fetchBookings();

    return () => {
      active = false;
    };
  }, [user]);

  // Redirection to Stripe Checkout
  const handlePay = (item) => {
    setPayingId(item._id);
    fetch("http://localhost:4000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`
      },
      body: JSON.stringify({
        bookingId: item._id,
        serviceName: item.serviceName,
        price: item.price,
        userEmail: user.email
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.url) {
          window.location.href = data.url; // Redirect to secure Stripe portal
        } else {
          toast.error(data.error || "Failed to initiate Stripe Checkout.");
          setPayingId(null);
        }
      })
      .catch((err) => {
        console.error("Payment error:", err);
        toast.error("An unexpected error occurred. Please try again.");
        setPayingId(null);
      });
  };

  const handlePrint = () => {
    window.print();
  };

  // Sorting Logic
  const sortedBookings = [...bookings].sort((a, b) => {
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

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Heading */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-950 tracking-tight">
            Payment Workspace
          </h1>
          <p className="text-gray-500 mt-2">
            Securely pay for booked decoration packages using Stripe and view/print transactions receipts.
          </p>
        </div>

        {/* Sort and Actions */}
        <div className="flex items-center gap-2.5 shrink-0 bg-white border border-gray-100 px-4 py-2.5 rounded-2xl shadow-sm">
          <ArrowUpDown size={15} className="text-gray-400" />
          <select
            value={sortField}
            onChange={(e) => {
              setSortField(e.target.value);
              setCurrentPage(1); // Reset page on sort
            }}
            className="text-xs font-bold text-gray-600 bg-transparent border-0 focus:outline-none focus:ring-0 cursor-pointer"
          >
            <option value="date-desc">Sort by Date: Latest</option>
            <option value="date-asc">Sort by Date: Oldest</option>
            <option value="status-asc">Sort by Status: Unpaid ➔ Paid</option>
            <option value="status-desc">Sort by Status: Paid ➔ Unpaid</option>
          </select>
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center p-12 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <h2 className="text-2xl font-bold text-gray-800">No bookings placed yet 😔</h2>
          <p className="text-gray-400 mt-1">Book a service from our catalog to get started!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-x-auto bg-white border border-gray-100 shadow-sm rounded-3xl p-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Decoration Service</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Scheduled Date</th>
                  <th className="px-6 py-4">Payment Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {currentItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 font-bold text-gray-950">
                      {item.serviceName}
                    </td>
                    <td className="px-6 py-4 font-extrabold text-gray-900">
                      ৳ {item.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">
                      <div className="flex gap-2 items-center">
                        <Calendar size={14} className="text-gray-400" />
                        {item.date}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-bold border ${
                          item.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-orange-50 text-orange-700 border-orange-100"
                        }`}
                      >
                        {item.paymentStatus || "Unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {item.paymentStatus === "Paid" ? (
                        <button
                          onClick={() => setSelectedReceipt(item)}
                          className="px-4 py-2 bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white rounded-xl text-xs font-bold transition duration-150 flex items-center gap-1.5 ml-auto"
                        >
                          <BadgeCheck size={14} />
                          View Receipt
                        </button>
                      ) : (
                        <button
                          onClick={() => handlePay(item)}
                          disabled={payingId === item._id}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition duration-150 flex items-center gap-1.5 ml-auto shadow-md shadow-blue-100 border-0 disabled:bg-gray-100 disabled:text-gray-400 disabled:shadow-none"
                        >
                          {payingId === item._id ? (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              Redirection...
                            </>
                          ) : (
                            <>
                              <CreditCard size={14} />
                              Pay Now
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

          {/* Premium Pagination controls toolbar */}
          {totalPages > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white border border-gray-100 p-5 rounded-3xl shadow-sm">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Showing {totalItems > 0 ? indexOfFirstItem + 1 : 0} to {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
              </div>
              <div className="flex gap-1.5">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-gray-100 hover:bg-gray-50 text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent rounded-xl transition duration-150"
                  title="Previous Page"
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
                        : "border border-gray-100 hover:bg-gray-50 text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-gray-100 hover:bg-gray-50 text-gray-500 disabled:text-gray-300 disabled:hover:bg-transparent rounded-xl transition duration-150"
                  title="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* GORGEOUS INVOICE/RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn print:bg-white print:p-0 print:static print:h-auto print:w-auto">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-8 border border-gray-100 flex flex-col gap-6 relative print:border-0 print:shadow-none print:p-0 print:rounded-none">
            {/* Close Button (Hidden on print) */}
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition print:hidden"
            >
              <X size={20} />
            </button>

            {/* Receipt Header */}
            <div className="flex justify-between items-start pb-5 border-b border-gray-100">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">
                    S
                  </div>
                  <h3 className="text-xl font-black text-gray-900">StyleDecor</h3>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1.5">Official Secure Receipt</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-gray-400 uppercase block">Transaction ID</span>
                <span className="font-mono text-xs font-bold text-gray-900 mt-1 block">
                  {selectedReceipt.transactionId || "N/A"}
                </span>
              </div>
            </div>

            {/* Invoice Details */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-400 font-semibold block">Client Name</span>
                  <span className="font-extrabold text-gray-900 block mt-0.5">{selectedReceipt.userName || user?.displayName}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Client Email</span>
                  <span className="font-extrabold text-gray-900 block mt-0.5">{selectedReceipt.userEmail || user?.email}</span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Payment Method</span>
                  <span className="font-extrabold text-gray-900 block mt-0.5 flex items-center gap-1">
                    <CreditCard size={12} className="text-blue-600" /> Stripe Credit Card
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 font-semibold block">Date Paid</span>
                  <span className="font-extrabold text-gray-900 block mt-0.5">
                    {selectedReceipt.paidAt ? (
                      new Date(selectedReceipt.paidAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric"
                      })
                    ) : (
                      "N/A"
                    )}
                  </span>
                </div>
              </div>

              {/* Event Location Block */}
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Event Venue:</span>
                  <span className="font-bold text-gray-900 text-right max-w-[250px] truncate">{selectedReceipt.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400 font-semibold">Scheduled Date:</span>
                  <span className="font-bold text-gray-900">{selectedReceipt.date}</span>
                </div>
              </div>

              {/* Itemized charges table */}
              <div className="border-t border-b border-gray-100 py-4 space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <div>
                    <span className="font-extrabold text-gray-900">{selectedReceipt.serviceName}</span>
                    <span className="text-[10px] text-gray-400 font-bold block mt-0.5">All-inclusive full service decor package</span>
                  </div>
                  <span className="font-black text-gray-900">৳ {selectedReceipt.price?.toLocaleString()}</span>
                </div>
              </div>

              {/* Total Paid Block */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-bold">
                  <ShieldCheck size={14} />
                  <span>Stripe Payment Confirmed</span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-gray-400 mr-2">Total Amount Paid</span>
                  <span className="text-2xl font-black text-gray-950">৳ {selectedReceipt.price?.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Receipt Modal Footer Buttons (Hidden on print) */}
            <div className="flex gap-4 pt-4 border-t border-gray-100 print:hidden">
              <button
                onClick={handlePrint}
                className="flex-1 btn btn-outline border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold flex items-center justify-center gap-2"
              >
                <Printer size={16} />
                Print Receipt
              </button>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white border-0 font-bold rounded-2xl transition p-3.5"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
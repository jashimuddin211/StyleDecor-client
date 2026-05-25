import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  CheckCircle,
  AlertTriangle,
  Loader2,
  CreditCard,
  Printer,
  ChevronRight,
  ShieldCheck,
  
} from "lucide-react";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const sessionId = searchParams.get("session_id");
  const bookingId = searchParams.get("bookingId");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    if (bookingId && sessionId) {
      // Hit the server's payment confirmation endpoint
      fetch("https://style-decor-server-sepia.vercel.app/bookings/confirm-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`
        },
        body: JSON.stringify({ bookingId, sessionId })
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to confirm payment with the server.");
          }
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            setTransaction(data.transactionInfo);
          } else {
            setError(data.error || "Could not verify transaction.");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Payment confirmation failed:", err);
          setError(err.message || "An unexpected error occurred during confirmation.");
          setLoading(false);
        });
    } else {
      setError("Invalid checkout session details provided.");
      setLoading(false);
    }
  }, [bookingId, sessionId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <h3 className="text-xl font-bold text-gray-900">Verifying secure Stripe transaction...</h3>
        <p className="text-sm text-gray-400">Please do not refresh or close this page.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto bg-white border border-red-100 rounded-3xl p-8 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 text-red-500 border border-red-100 rounded-2xl flex items-center justify-center mx-auto">
          <AlertTriangle size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-gray-950">Payment Verification Failed</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            {error}
          </p>
        </div>
        <button onClick={() => navigate("/dashboard/payment-history")} className="btn bg-red-600 hover:bg-red-700 text-white border-0 w-full rounded-2xl font-bold">
          Go back to Payment History
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fadeIn py-4">
      {/* Visual Header Success Card */}
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm text-center space-y-6 relative overflow-hidden print:border-0 print:shadow-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
        
        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-2xl flex items-center justify-center mx-auto shadow-sm animate-bounce">
            <CheckCircle size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-950">Payment Successful!</h2>
            <p className="text-sm text-emerald-600 font-bold mt-1">Receipt reference: {transaction?.transactionId}</p>
            <p className="text-xs text-gray-400 mt-2">Thank you! Your decoration booking is now fully confirmed.</p>
          </div>
        </div>

        {/* Printable Receipt area */}
        <div className="border border-gray-100 rounded-2xl p-6 bg-gray-50/50 text-left text-sm space-y-5 print:bg-white print:border-gray-200">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <div>
              <h4 className="font-extrabold text-gray-900 text-lg leading-tight">StyleDecor Receipt</h4>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mt-0.5">Secure Transaction Invoice</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-gray-500">Method</span>
              <span className="text-xs font-bold text-gray-900 block flex items-center gap-1 justify-end mt-0.5">
                <CreditCard size={12} className="text-blue-600" /> Stripe Card
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-gray-400 font-semibold block">Client Account</span>
              <span className="font-bold text-gray-900 block mt-0.5">{transaction?.userEmail}</span>
            </div>
            <div>
              <span className="text-gray-400 font-semibold block">Receipt Date</span>
              <span className="font-bold text-gray-900 block mt-0.5">
                {new Date(transaction?.paidAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit"
                })}
              </span>
            </div>
          </div>

          <div className="border-t border-b border-gray-100 py-4 space-y-2">
            <div className="flex justify-between">
              <span className="font-bold text-gray-800">{transaction?.serviceName}</span>
              <span className="font-black text-gray-900">৳ {transaction?.amount?.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xs text-gray-400 pt-1">
              <span>Qty: 1 event package</span>
              <span>Subtotal: ৳ {transaction?.amount?.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <div className="flex items-center gap-1 text-[11px] text-gray-400">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Verified Secure by Stripe Payments</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 mr-2">Total Paid</span>
              <span className="text-xl font-black text-gray-950">৳ {transaction?.amount?.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Buttons (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row gap-3 relative z-10 print:hidden pt-2">
          <button onClick={handlePrint} className="flex-1 btn btn-outline border-gray-200 hover:bg-gray-50 text-gray-700 rounded-2xl font-bold flex items-center gap-2">
            <Printer size={16} />
            Print Receipt
          </button>
          <button onClick={() => navigate("/dashboard/payment-history")} className="flex-1 btn bg-blue-600 hover:bg-blue-700 text-white border-0 rounded-2xl font-bold flex items-center gap-2">
            Go to Payments
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

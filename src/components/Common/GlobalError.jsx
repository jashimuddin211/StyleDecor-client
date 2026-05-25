import { AlertCircle, RefreshCw, Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GlobalError = ({ message, onRetry }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-xl p-8 text-center space-y-6">
        
        <div className="w-16 h-16 bg-rose-50 border border-rose-100 text-rose-500 rounded-2xl flex items-center justify-center mx-auto shadow-sm animate-pulse">
          <AlertCircle size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-gray-950 tracking-tight">Something Went Wrong</h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            {message || "We encountered an unexpected error while rendering this page or communicating with the servers."}
          </p>
        </div>

        <div className="flex flex-col gap-2.5 pt-2">
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn bg-blue-600 hover:bg-blue-700 text-white border-0 w-full rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          )}

          <button
            onClick={() => navigate("/")}
            className="btn btn-outline border-gray-200 hover:bg-gray-50 text-gray-700 w-full rounded-2xl font-bold flex items-center justify-center gap-2"
          >
            <Home size={16} />
            Back to Home
          </button>

          <button
            onClick={() => navigate(-1)}
            className="btn btn-link text-xs text-gray-400 hover:text-gray-600"
          >
            <ArrowLeft size={12} className="inline mr-1" />
            Go back to previous page
          </button>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;

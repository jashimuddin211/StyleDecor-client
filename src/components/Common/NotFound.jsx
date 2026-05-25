import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 text-center max-w-md w-full space-y-8 animate-fadeIn">
        
        <div className="space-y-2">
          <h1 className="text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-tr from-blue-500 via-indigo-400 to-pink-500 select-none filter drop-shadow-sm">
            404
          </h1>
          <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto"></div>
        </div>

        
        <div className="space-y-3">
          <h3 className="text-2xl font-extrabold text-white tracking-tight">
            Lost in Space? 🌌
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            Oops! The page you are looking for does not exist or has been moved to another location. Let's get you back on track!
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto btn bg-blue-600 hover:bg-blue-700 text-white border-0 px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition duration-200"
          >
            <Home size={16} />
            Back to Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto btn btn-outline border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white px-8 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition duration-200"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

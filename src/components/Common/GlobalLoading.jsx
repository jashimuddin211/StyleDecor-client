import { Loader2, Sparkles } from "lucide-react";

const GlobalLoading = () => {
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center z-[9999] overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center space-y-6 animate-pulse">
        
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl shadow-xl shadow-blue-500/20">
          <Sparkles className="w-12 h-12 text-white animate-spin-slow" />
          
          <div className="absolute inset-0 rounded-3xl border-4 border-white/20 border-t-white animate-spin"></div>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black tracking-tight text-white">
            StyleDecor
          </h2>
          <p className="text-xs font-bold tracking-widest text-indigo-400 uppercase">
            Designing your spaces...
          </p>
        </div>

       
        <div className="flex justify-center pt-2">
          <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;

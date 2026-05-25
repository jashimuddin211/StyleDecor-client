import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const success = useCallback((msg) => showToast(msg, "success"), [showToast]);
  const error = useCallback((msg) => showToast(msg, "error"), [showToast]);
  const info = useCallback((msg) => showToast(msg, "info"), [showToast]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}

      {/* Floating Toasts Portal Container */}
      <div className="fixed bottom-6 right-6 z-[99999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl bg-white/95 backdrop-blur-md border shadow-lg transition-all duration-300 transform translate-y-0 opacity-100 animate-slideIn ${
              t.type === "success"
                ? "border-emerald-500/20 text-emerald-800 shadow-emerald-100/50"
                : t.type === "error"
                ? "border-rose-500/20 text-rose-800 shadow-rose-100/50"
                : "border-blue-500/20 text-blue-800 shadow-blue-100/50"
            }`}
          >
            {/* Type Indicator Icon */}
            <div className="shrink-0 mt-0.5">
              {t.type === "success" && <CheckCircle className="w-5 h-5 text-emerald-500" />}
              {t.type === "error" && <AlertCircle className="w-5 h-5 text-rose-500" />}
              {t.type === "info" && <Info className="w-5 h-5 text-blue-500" />}
            </div>

            {/* Content text */}
            <div className="flex-1 text-xs font-bold leading-normal">
              {t.message}
            </div>

            {/* Dismiss Button */}
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

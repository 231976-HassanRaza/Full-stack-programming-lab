import { createContext, useContext, useState, useCallback } from "react";
import { COLORS } from "../styles/theme";

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((msg, type = "success") => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3200);
  }, []);

  const TOAST_COLORS = {
    success: COLORS.success,
    danger:  COLORS.danger,
    info:    COLORS.secondary,
    warning: "#ffc107",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* Toast Container */}
      <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 10 }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: TOAST_COLORS[t.type] || COLORS.success,
            color: "#fff", padding: "14px 22px", borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.22)", fontSize: "0.92rem",
            fontWeight: 600, maxWidth: 300, animation: "toastIn 0.3s ease",
          }}>{t.msg}</div>
        ))}
      </div>
      <style>{`@keyframes toastIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }`}</style>
    </ToastContext.Provider>
  );
}

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};

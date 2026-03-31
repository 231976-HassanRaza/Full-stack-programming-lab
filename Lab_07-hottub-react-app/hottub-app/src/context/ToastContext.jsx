import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = "success") => {
        setToast({ message, type });
        // Auto-hide after 3 seconds
        setTimeout(() => setToast(null), 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            
            {/* The actual Toast UI that pops up */}
            {toast && (
                <div style={{
                    position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)",
                    background: toast.type === "danger" ? "#dc3545" : "#28a745",
                    color: "#fff", padding: "12px 24px", borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)", zIndex: 9999,
                    fontWeight: 600, fontSize: "0.95rem"
                }}>
                    {toast.message}
                </div>
            )}
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
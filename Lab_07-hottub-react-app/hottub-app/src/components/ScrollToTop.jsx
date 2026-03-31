
import { useState, useEffect } from "react";
import { COLORS } from "../styles/theme";

export default function ScrollToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handler = () => setVisible(window.scrollY > 300);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    if (!visible) return null;

    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            title="Back to top"
            style={{
                position: "fixed", bottom: 80, right: 24,
                width: 44, height: 44, background: COLORS.primary,
                color: "#fff", border: "none", borderRadius: "50%",
                cursor: "pointer", fontSize: "1.2rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)", zIndex: 999,
            }}
        >↑</button>
    );
}

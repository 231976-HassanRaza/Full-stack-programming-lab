import { useState } from "react";
import { useToast } from "../context/ToastContext";
import { isValidEmail } from "../utils/validators";
import { COLORS } from "../styles/theme";

const FOOTER_COLS = [
  { title: "Quick Links", links: [["Home","home"],["Shop","category"],["About Us","about"],["Contact","contact"]] },
  { title: "Account",     links: [["Login","login"],["Register","register"],["My Account","account"],["Cart","cart"]] },
  { title: "Support",     links: [["Terms & Conditions","terms"],["Contact","contact"],["Shipping Policy","contact"],["Returns","contact"]] },
];

export default function Footer({ navigate }) {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (isValidEmail(email)) { showToast("Subscribed successfully! 🎉"); setEmail(""); }
    else showToast("Please enter a valid email.", "danger");
  };

  return (
    <footer style={{ background: COLORS.dark, color: "rgba(255,255,255,0.8)", padding: "60px 0 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>

          {/* Brand + newsletter */}
          <div>
            <h4 style={{ color: "#fff", fontSize: "1.4rem", fontFamily: "Georgia, serif", marginBottom: 12 }}>
              Aqua<span style={{ color: COLORS.accent }}>Lux</span>
            </h4>
            <p style={{ fontSize: "0.88rem", lineHeight: 1.7, opacity: 0.7 }}>
              Premium hot tubs and swim spas for discerning homeowners. Quality, luxury, and relaxation since 2005.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: "flex", marginTop: 14 }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Your email..."
                style={{ flex: 1, padding: "11px 14px", border: "none", borderRadius: "6px 0 0 6px", fontSize: "0.88rem", outline: "none" }}
              />
              <button type="submit" style={{
                padding: "11px 18px", background: COLORS.accent, border: "none",
                borderRadius: "0 6px 6px 0", cursor: "pointer", color: "#fff", fontWeight: 600,
              }}>Subscribe</button>
            </form>
          </div>

          {/* Link columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 style={{ color: "#fff", marginBottom: 18 }}>{col.title}</h4>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {col.links.map(([label, pg]) => (
                  <li key={label} style={{ marginBottom: 10 }}>
                    <button onClick={() => navigate(pg)} style={{
                      background: "none", border: "none", cursor: "pointer",
                      color: "rgba(255,255,255,0.65)", fontSize: "0.88rem", fontFamily: "inherit",
                    }}
                      onMouseOver={e => e.target.style.color = COLORS.accent}
                      onMouseOut={e => e.target.style.color = "rgba(255,255,255,0.65)"}
                    >{label}</button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", padding: "20px 0", display: "flex", justifyContent: "space-between", fontSize: "0.85rem", opacity: 0.6 }}>
          <span>© 2025 AquaLux. All rights reserved.</span>
          <span>Designed with ❤️ — FullStackProgramming Assignment 01</span>
        </div>
      </div>
    </footer>
  );
}
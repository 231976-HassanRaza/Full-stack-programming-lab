import { useState } from "react";
import { useCart } from "../context/CartContext";
import { COLORS } from "../styles/theme";

const NAV_LINKS = [
  { label: "Home",    page: "home" },
  { label: "Shop",    page: "category" },
  { label: "Hot Tubs",page: "product" },
  { label: "About",   page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Navbar({ page, navigate }) {
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      background: COLORS.primary, padding: "12px 0",
      position: "sticky", top: 0, zIndex: 1000,
      boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Brand */}
        <button onClick={() => navigate("home")} style={{
          background: "none", border: "none", cursor: "pointer",
          color: "#fff", fontSize: "1.6rem", fontWeight: 700,
          letterSpacing: 1, fontFamily: "Georgia, serif",
        }}>
          Aqua<span style={{ color: COLORS.accent }}>Lux</span>
        </button>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: 24, listStyle: "none", margin: 0, padding: 0, alignItems: "center" }}>
          {NAV_LINKS.map(l => (
            <li key={l.page}>
              <button onClick={() => navigate(l.page)} style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "inherit", fontSize: "0.95rem",
                color: page === l.page ? COLORS.accent : "rgba(255,255,255,0.85)",
                fontWeight: page === l.page ? 700 : 400,
                borderBottom: `2px solid ${page === l.page ? COLORS.accent : "transparent"}`,
                paddingBottom: 2, transition: "color 0.2s",
              }}>{l.label}</button>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <button onClick={() => navigate("account")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "1.2rem" }} title="My Account">👤</button>
          <button onClick={() => navigate("cart")} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", fontSize: "1.2rem", position: "relative" }} title="Cart">
            🛍
            {cartCount > 0 && (
              <span style={{
                background: COLORS.accent, color: "#fff", fontSize: "0.65rem",
                borderRadius: "50%", width: 18, height: 18,
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "absolute", top: -8, right: -8,
              }}>{cartCount}</span>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}
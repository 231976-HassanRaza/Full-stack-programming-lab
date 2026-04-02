import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { PRODUCTS } from "../../data/products";
import { Stars } from "../../components/UI";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const THUMB_IMGS = [
  "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=200&h=160&fit=crop",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200&h=160&fit=crop",
  "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=160&fit=crop",
  "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=200&h=160&fit=crop",
];

const SPECS = [
  ["Dimensions",    "92\" × 92\" × 38\""],
  ["Weight (dry)",  "850 lbs"],
  ["Water Capacity","400 gallons"],
  ["Jets",          "42 hydrotherapy jets"],
  ["Heating",       "3kW titanium heater"],
  ["Voltage",       "240V / 50–60Hz"],
  ["Warranty",      "5 years full coverage"],
];

const REVIEWS = [
  { name: "Michael R.", rating: 5, text: "Absolutely love this hot tub! Installation was smooth and the jets are powerful." },
  { name: "Jennifer L.", rating: 5, text: "Best purchase we've made. The whole family uses it every weekend." },
  { name: "David K.",   rating: 4, text: "Great quality, very well insulated. Heats up fast even in winter." },
];

export default function ProductPage({ product, navigate }) {
  const p = product || PRODUCTS[0];
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const [mainImg,    setMainImg]    = useState(p.img);
  const [qty,        setQty]        = useState(1);
  const [activeTab,  setActiveTab]  = useState("description");
  const [color,      setColor]      = useState("Midnight Blue");
  const [size,       setSize]       = useState("6 Person");

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(p);
    showToast(`${p.name} added to cart! 🛒`);
  };

  const thumbs = [p.img, ...THUMB_IMGS.slice(1)];

  return (
    <div>
      {/* Breadcrumb */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "20px 20px 0", fontSize: "0.88rem", color: COLORS.gray }}>
        <button onClick={() => navigate("home")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.secondary, fontFamily: "inherit" }}>Home</button>
        {" / "}
        <button onClick={() => navigate("category")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.secondary, fontFamily: "inherit" }}>Shop</button>
        {" / "}{p.name}
      </div>

      <section style={{ padding: "20px 0 60px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "5fr 7fr", gap: 40 }}>

          {/* ── Gallery ── */}
          <div>
            <div style={{ borderRadius: 12, overflow: "hidden", height: 420, border: `2px solid ${COLORS.border}` }}>
              <img src={mainImg} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: 12 }}>
              {thumbs.map((t, i) => (
                <div key={i} onClick={() => setMainImg(t)} style={{
                  borderRadius: 8, overflow: "hidden", height: 80, cursor: "pointer",
                  border: `2px solid ${mainImg === t ? COLORS.secondary : COLORS.border}`, transition: "border-color 0.2s",
                }}>
                  <img src={t} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div>
            <h1 style={{ fontSize: "1.8rem", color: COLORS.dark, marginBottom: 12, fontFamily: "Georgia, serif" }}>{p.name}</h1>
            <div style={{ display: "flex", gap: 20, marginBottom: 18, fontSize: "0.9rem", color: COLORS.gray, flexWrap: "wrap" }}>
              <span><Stars n={p.rating} /> ({p.reviews} reviews)</span>
              <span style={{ color: COLORS.success }}>✔ In Stock</span>
              <span>SKU: AQL-{String(p.id).padStart(4, "0")}</span>
            </div>

            <div style={{ fontSize: "2rem", fontWeight: 700, color: COLORS.secondary }}>
              ${p.price.toLocaleString()}
              {p.oldPrice && <span style={{ fontSize: "1rem", color: COLORS.gray, textDecoration: "line-through", marginLeft: 12 }}>${p.oldPrice.toLocaleString()}</span>}
            </div>

            <p style={{ color: COLORS.gray, margin: "16px 0", lineHeight: 1.7, fontSize: "0.95rem" }}>
              Experience the ultimate in hydrotherapy relaxation. Features advanced jet systems, energy-efficient insulation, and intuitive controls for a spa experience like no other.
            </p>

            {/* Color selector */}
            <div style={{ margin: "16px 0" }}>
              <p style={{ fontWeight: 600, marginBottom: 8, fontSize: "0.9rem" }}>Color:</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["Midnight Blue", "Pearl White", "Graphite"].map(c => (
                  <button key={c} onClick={() => setColor(c)} style={{
                    padding: "8px 18px", fontFamily: "inherit",
                    border: `2px solid ${color === c ? COLORS.secondary : COLORS.border}`,
                    borderRadius: 6, cursor: "pointer", fontSize: "0.88rem",
                    background: color === c ? "rgba(46,134,171,0.08)" : "#fff",
                    color: color === c ? COLORS.secondary : COLORS.dark,
                  }}>{c}</button>
                ))}
              </div>
            </div>

            {/* Size selector */}
            <div style={{ margin: "16px 0" }}>
              <p style={{ fontWeight: 600, marginBottom: 8, fontSize: "0.9rem" }}>Size:</p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {["4 Person", "6 Person", "8 Person"].map(s => (
                  <button key={s} onClick={() => setSize(s)} style={{
                    padding: "8px 18px", fontFamily: "inherit",
                    border: `2px solid ${size === s ? COLORS.secondary : COLORS.border}`,
                    borderRadius: 6, cursor: "pointer", fontSize: "0.88rem",
                    background: size === s ? "rgba(46,134,171,0.08)" : "#fff",
                    color: size === s ? COLORS.secondary : COLORS.dark,
                  }}>{s}</button>
                ))}
              </div>
            </div>

            {/* Qty + Cart */}
            <div style={{ display: "flex", gap: 14, marginTop: 24, alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", border: `2px solid ${COLORS.border}`, borderRadius: 6, overflow: "hidden" }}>
                <button onClick={() => setQty(q => Math.max(1, q - 1))} style={{ width: 36, height: 40, background: COLORS.lightBg, border: "none", cursor: "pointer", fontSize: "1.2rem" }}>-</button>
                <input
                  type="number" value={qty} onChange={e => setQty(Math.max(1, +e.target.value))}
                  style={{ width: 50, height: 40, textAlign: "center", border: "none", borderLeft: `1px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}`, fontSize: "0.95rem", outline: "none" }}
                />
                <button onClick={() => setQty(q => q + 1)} style={{ width: 36, height: 40, background: COLORS.lightBg, border: "none", cursor: "pointer", fontSize: "1.2rem" }}>+</button>
              </div>
              <button onClick={handleAddToCart} style={{
                flex: 1, padding: "12px 24px", background: COLORS.accent, color: "#fff",
                border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
              }}>🛒 Add to Cart</button>
              <button style={{
                padding: "12px 18px", background: "#fff", color: COLORS.danger,
                border: `2px solid ${COLORS.danger}`, borderRadius: 8, cursor: "pointer", fontSize: "1.2rem",
              }}>♡</button>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ maxWidth: 1200, margin: "40px auto 0", padding: "0 20px" }}>
          <div style={{ display: "flex", borderBottom: `2px solid ${COLORS.border}` }}>
            {[["description","Description"],["specs","Specifications"],["reviews","Reviews"]].map(([key, label]) => (
              <button key={key} onClick={() => setActiveTab(key)} style={{
                padding: "12px 24px", background: "none", border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: "0.95rem", fontFamily: "inherit",
                color: activeTab === key ? COLORS.secondary : COLORS.gray,
                borderBottom: `3px solid ${activeTab === key ? COLORS.secondary : "transparent"}`,
                marginBottom: -2,
              }}>{label}</button>
            ))}
          </div>

          <div style={{ padding: "24px 0" }}>
            {activeTab === "description" && (
              <p style={{ color: COLORS.gray, lineHeight: 1.8, maxWidth: 700 }}>
                The {p.name} combines cutting-edge hydrotherapy technology with elegant design. Featuring precision-engineered jets, LED mood lighting, Bluetooth audio integration, and an energy-efficient insulation system, this hot tub transforms your backyard into a private wellness retreat.
              </p>
            )}
            {activeTab === "specs" && (
              <table style={{ borderCollapse: "collapse", width: "100%", maxWidth: 600 }}>
                <tbody>
                  {SPECS.map(([k, v]) => (
                    <tr key={k} style={{ borderBottom: `1px solid ${COLORS.lightGray}` }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: COLORS.gray, width: "40%" }}>{k}</td>
                      <td style={{ padding: "12px 16px", color: COLORS.dark }}>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {activeTab === "reviews" && (
              <div>
                {REVIEWS.map((r, i) => (
                  <div key={i} style={{ borderBottom: `1px solid ${COLORS.lightGray}`, padding: "16px 0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <strong>{r.name}</strong><Stars n={r.rating} />
                    </div>
                    <p style={{ color: COLORS.gray, margin: 0, lineHeight: 1.6 }}>{r.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import { COLORS } from "../../styles/theme";
import { PRODUCTS, CATEGORIES } from "../../data/products";
import { SectionTitle, ProductCard } from "../../components/UI";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const FEATURES = [
  { icon: "🚚", title: "Free Delivery",   sub: "On orders over $1,000" },
  { icon: "🛡",  title: "5-Year Warranty", sub: "Full coverage guarantee" },
  { icon: "🎧", title: "24/7 Support",    sub: "Always here to help" },
  { icon: "↩",  title: "30-Day Returns",  sub: "Hassle-free returns" },
];

export default function HomePage({ navigate }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (product) => {
    addToCart(product);
    showToast(`${product.name} added to cart! 🛒`);
  };

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.secondary} 100%)`,
        color: "#fff", padding: "90px 0",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ maxWidth: 600 }}>
            <h1 style={{ fontSize: "3rem", fontWeight: 800, lineHeight: 1.2, marginBottom: 20, fontFamily: "Georgia, serif" }}>
              Your Perfect <span style={{ color: COLORS.accent }}>Backyard Escape</span> Awaits
            </h1>
            <p style={{ fontSize: "1.15rem", opacity: 0.9, marginBottom: 30, lineHeight: 1.7 }}>
              Discover premium hot tubs, swim spas, and accessories. Elevate your relaxation experience with AquaLux — where luxury meets serenity.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button onClick={() => navigate("category")} style={{
                padding: "14px 32px", background: COLORS.accent, color: "#fff", border: "none",
                borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
              }}>🛍 Shop Now</button>
              <button onClick={() => navigate("about")} style={{
                padding: "14px 32px", background: "transparent", color: "#fff",
                border: "2px solid #fff", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
              }}>▶ Learn More</button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features Strip ── */}
      <div style={{ background: COLORS.lightBg, padding: "40px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{
                  width: 52, height: 52, background: COLORS.primary, color: "#fff",
                  borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.4rem", flexShrink: 0,
                }}>{f.icon}</div>
                <div>
                  <h5 style={{ margin: 0, fontWeight: 600 }}>{f.title}</h5>
                  <p style={{ margin: 0, fontSize: "0.82rem", color: COLORS.gray }}>{f.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories ── */}
      <section style={{ padding: "70px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <SectionTitle title="Shop By Category" sub="Explore our range of premium spa products" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {CATEGORIES.map(c => (
              <button key={c.name} onClick={() => navigate("category")} style={{
                position: "relative", height: 200, borderRadius: 12,
                overflow: "hidden", cursor: "pointer", border: "none", padding: 0,
              }}>
                <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{
                  position: "absolute", inset: 0,
                  background: "linear-gradient(to top, rgba(26,58,92,0.85) 0%, transparent 60%)",
                  display: "flex", alignItems: "flex-end", padding: 16,
                }}>
                  <h4 style={{ color: "#fff", margin: 0, fontWeight: 600 }}>{c.name}</h4>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section style={{ padding: "70px 0", background: COLORS.lightBg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <SectionTitle title="Featured Products" sub="Best-selling hot tubs and spa essentials" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 28 }}>
            {PRODUCTS.slice(0, 4).map(p => (
              <ProductCard key={p.id} product={p} navigate={navigate} onAddToCart={handleAddToCart} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 32 }}>
            <button onClick={() => navigate("category")} style={{
              padding: "14px 36px", background: COLORS.accent, color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
            }}>View All Products →</button>
          </div>
        </div>
      </section>

      {/* ── Promo Banner ── */}
      <section style={{ background: COLORS.primary, color: "#fff", padding: "50px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ fontSize: "2.2rem", marginBottom: 12, fontFamily: "Georgia, serif" }}>
            Summer Sale — Up to <span style={{ color: COLORS.accent }}>30% Off</span>
          </h2>
          <p style={{ opacity: 0.85, marginBottom: 28, fontSize: "1.05rem" }}>
            Limited time offers on select hot tubs and swim spas. Don't miss out!
          </p>
          <button onClick={() => navigate("category")} style={{
            padding: "14px 36px", background: COLORS.accent, color: "#fff",
            border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
          }}>⚡ Shop the Sale</button>
        </div>
      </section>
    </div>
  );
}

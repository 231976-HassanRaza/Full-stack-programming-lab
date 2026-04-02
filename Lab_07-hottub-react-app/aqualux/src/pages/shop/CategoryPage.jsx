import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { PRODUCTS } from "../../data/products";
import { PageHeader, ProductCard } from "../../components/UI";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";

const ALL_CATS = ["All", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

export default function CategoryPage({ navigate }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [search,    setSearch]    = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [maxPrice,  setMaxPrice]  = useState(20000);

  const filtered = PRODUCTS.filter(p =>
    (catFilter === "All" || p.category === catFilter) &&
    p.price <= maxPrice &&
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (product) => { addToCart(product); showToast(`${product.name} added to cart! 🛒`); };

  return (
    <div>
      <PageHeader title="Shop All Products" breadcrumb={["Home", "Shop"]} />

      <section style={{ padding: "50px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "280px 1fr", gap: 32 }}>

          {/* ── Sidebar ── */}
          <aside>
            {/* Search */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: 20 }}>
              <h4 style={{ color: COLORS.primary, marginBottom: 14 }}>🔍 Search</h4>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search products..."
                style={{ width: "100%", padding: "10px 14px", border: `2px solid ${COLORS.border}`, borderRadius: 8, fontSize: "0.9rem", outline: "none", boxSizing: "border-box" }}
              />
            </div>

            {/* Categories */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", marginBottom: 20 }}>
              <h4 style={{ color: COLORS.primary, marginBottom: 14 }}>🏷 Categories</h4>
              {ALL_CATS.map(c => (
                <button key={c} onClick={() => setCatFilter(c)} style={{
                  display: "block", width: "100%", textAlign: "left",
                  padding: "9px 12px", background: catFilter === c ? "rgba(46,134,171,0.12)" : "none",
                  border: "none", borderRadius: 6, cursor: "pointer", marginBottom: 4,
                  color: catFilter === c ? COLORS.secondary : COLORS.dark,
                  fontWeight: catFilter === c ? 600 : 400, fontSize: "0.9rem", fontFamily: "inherit",
                }}>{c}</button>
              ))}
            </div>

            {/* Price range */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <h4 style={{ color: COLORS.primary, marginBottom: 14 }}>💰 Max Price: ${maxPrice.toLocaleString()}</h4>
              <input
                type="range" min="50" max="20000" step="100" value={maxPrice}
                onChange={e => setMaxPrice(+e.target.value)}
                style={{ width: "100%", accentColor: COLORS.secondary }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: COLORS.gray, marginTop: 6 }}>
                <span>$50</span><span>$20,000</span>
              </div>
            </div>
          </aside>

          {/* ── Grid ── */}
          <div>
            <p style={{ color: COLORS.gray, marginBottom: 24 }}>{filtered.length} products found</p>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 0", color: COLORS.gray }}>
                <div style={{ fontSize: "4rem" }}>🔍</div>
                <p style={{ marginTop: 12 }}>No products match your filters.</p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
                {filtered.map(p => (
                  <ProductCard key={p.id} product={p} navigate={navigate} onAddToCart={handleAdd} />
                ))}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}

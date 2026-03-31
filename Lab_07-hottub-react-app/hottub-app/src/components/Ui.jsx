// ============================================
//  Shared UI Components
//  Import whichever you need in your pages
// ============================================

import { COLORS, SHADOWS, RADIUS } from "../styles/theme";

/* ── Star Rating ── */
export function Stars({ n = 5 }) {
    return (
        <span style={{ color: "#ffc107", fontSize: "0.88rem" }}>
            {"★".repeat(n)}{"☆".repeat(5 - n)}
        </span>
    );
}

/* ── Product Badge (New / Sale) ── */
export function Badge({ label }) {
    if (!label) return null;
    return (
        <span style={{
            position: "absolute", top: 12, left: 12,
            padding: "4px 12px", borderRadius: 20,
            fontSize: "0.75rem", fontWeight: 700,
            background: label === "Sale" ? COLORS.danger : COLORS.accent,
            color: "#fff",
        }}>{label}</span>
    );
}

/* ── Section Title ── */
export function SectionTitle({ title, sub }) {
    return (
        <div style={{ textAlign: "center", marginBottom: 50 }}>
            <h2 style={{ fontSize: "2.2rem", color: COLORS.primary, marginBottom: 12, fontFamily: "Georgia, serif" }}>{title}</h2>
            {sub && <p style={{ color: COLORS.gray, fontSize: "1.05rem", maxWidth: 600, margin: "0 auto" }}>{sub}</p>}
            <div style={{ width: 60, height: 4, background: COLORS.accent, margin: "12px auto 0", borderRadius: 2 }} />
        </div>
    );
}

/* ── Primary / Secondary Buttons ── */
export function Btn({ children, onClick, variant = "primary", size = "md", block = false, style: extraStyle = {} }) {
    const base = {
        display: block ? "flex" : "inline-flex", alignItems: "center", justifyContent: "center",
        gap: 8, border: "2px solid transparent", borderRadius: RADIUS.md,
        fontWeight: 700, cursor: "pointer", fontFamily: "inherit", transition: "all 0.25s",
        width: block ? "100%" : undefined,
        padding: size === "sm" ? "8px 18px" : "12px 30px",
        fontSize: size === "sm" ? "0.85rem" : "0.95rem",
        ...extraStyle,
    };
    const variants = {
        primary: { background: COLORS.accent, color: "#fff", borderColor: COLORS.accent },
        secondary: { background: COLORS.secondary, color: "#fff", borderColor: COLORS.secondary },
        outline: { background: "transparent", color: COLORS.primary, borderColor: COLORS.border },
        danger: { background: COLORS.danger, color: "#fff", borderColor: COLORS.danger },
        ghost: { background: "#fff", color: COLORS.primary, borderColor: COLORS.border },
    };
    return <button style={{ ...base, ...variants[variant] }} onClick={onClick}>{children}</button>;
}

/* ── Form Input ── */
export function FormInput({ label, type = "text", value, onChange, error, placeholder, rows }) {
    const inputStyle = {
        width: "100%", padding: "12px 16px", fontFamily: "inherit",
        border: `2px solid ${error ? COLORS.danger : COLORS.border}`,
        borderRadius: RADIUS.md, fontSize: "0.95rem", outline: "none",
        boxSizing: "border-box", transition: "border-color 0.2s",
    };
    return (
        <div style={{ marginBottom: 20 }}>
            {label && <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: 7, color: "#333" }}>{label}</label>}
            {rows
                ? <textarea value={value} onChange={onChange} placeholder={placeholder} rows={rows} style={{ ...inputStyle, resize: "vertical" }} />
                : <input type={type} value={value} onChange={onChange} placeholder={placeholder} style={inputStyle} />
            }
            {error && <span style={{ color: COLORS.danger, fontSize: "0.8rem", marginTop: 4, display: "block" }}>{error}</span>}
        </div>
    );
}

/* ── Page Header Banner ── */
export function PageHeader({ title, breadcrumb = [] }) {
    return (
        <div style={{ background: COLORS.primary, color: "#fff", padding: "30px 0" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
                <h1 style={{ fontSize: "2rem", fontFamily: "Georgia, serif", margin: 0 }}>{title}</h1>
                {breadcrumb.length > 0 && (
                    <div style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.7)", marginTop: 6 }}>
                        {breadcrumb.join(" / ")}
                    </div>
                )}
            </div>
        </div>
    );
}

/* ── Alert Box ── */
export function Alert({ type = "info", children }) {
    const styles = {
        success: { bg: "#d4edda", border: COLORS.success, color: "#155724" },
        danger: { bg: "#f8d7da", border: COLORS.danger, color: "#721c24" },
        info: { bg: "#d1ecf1", border: COLORS.secondary, color: "#0c5460" },
    };
    const s = styles[type] || styles.info;
    return (
        <div style={{ padding: "14px 18px", borderRadius: RADIUS.md, marginBottom: 16, fontSize: "0.9rem", background: s.bg, borderLeft: `4px solid ${s.border}`, color: s.color }}>
            {children}
        </div>
    );
}

/* ── Product Card ── */
export function ProductCard({ product, navigate, onAddToCart }) {
    return (
        <div
            style={{ borderRadius: RADIUS.lg, overflow: "hidden", boxShadow: SHADOWS.card, background: "#fff", transition: "all 0.3s" }}
            onMouseOver={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = SHADOWS.hover; }}
            onMouseOut={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = SHADOWS.card; }}
        >
            <div style={{ position: "relative", height: 220, overflow: "hidden", background: COLORS.lightBg }}>
                <img src={product.img} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <Badge label={product.badge} />
            </div>
            <div style={{ padding: 18 }}>
                <h4 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 8, color: COLORS.dark }}>{product.name}</h4>
                <div style={{ marginBottom: 4 }}>
                    <Stars n={product.rating} />
                    <small style={{ color: COLORS.gray }}> ({product.reviews})</small>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, margin: "10px 0" }}>
                    <span style={{ fontSize: "1.25rem", fontWeight: 700, color: COLORS.secondary }}>${product.price.toLocaleString()}</span>
                    {product.oldPrice && <span style={{ fontSize: "0.9rem", color: COLORS.gray, textDecoration: "line-through" }}>${product.oldPrice.toLocaleString()}</span>}
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <button
                        onClick={() => navigate("product", product)}
                        style={{ flex: 1, padding: "8px 0", background: COLORS.secondary, color: "#fff", border: "none", borderRadius: RADIUS.md, cursor: "pointer", fontWeight: 600, fontSize: "0.85rem" }}
                    >View Details</button>
                    <button
                        onClick={() => onAddToCart(product)}
                        style={{ padding: "8px 14px", background: COLORS.accent, color: "#fff", border: "none", borderRadius: RADIUS.md, cursor: "pointer", fontWeight: 700, fontSize: "1.1rem" }}
                    >+</button>
                </div>
            </div>
        </div>
    );
}

/* ── Checkout Step Indicator ── */
export function CheckoutSteps({ active }) {
    const steps = ["Cart", "Checkout", "Payment", "Confirmation"];
    return (
        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 40 }}>
            {steps.map((label, i) => {
                const state = i + 1 < active ? "done" : i + 1 === active ? "active" : "idle";
                return (
                    <div key={label} style={{ display: "flex", alignItems: "center" }}>
                        {i > 0 && <div style={{ width: 60, height: 2, background: COLORS.border, margin: "0 4px" }} />}
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{
                                width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                fontWeight: 700, fontSize: "0.9rem",
                                background: state === "done" ? COLORS.success : state === "active" ? COLORS.secondary : "transparent",
                                border: `2px solid ${state === "done" ? COLORS.success : state === "active" ? COLORS.secondary : COLORS.border}`,
                                color: state !== "idle" ? "#fff" : COLORS.gray,
                            }}>{state === "done" ? "✓" : i + 1}</div>
                            <span style={{ fontWeight: 600, fontSize: "0.85rem", color: state === "active" ? COLORS.secondary : COLORS.gray }}>{label}</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
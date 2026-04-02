import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { PageHeader, CheckoutSteps } from "../../components/UI";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { COUPON_CODES } from "../../data/products";

export default function CartPage({ navigate }) {
  const { cart, updateQty, removeFromCart, cartTotal } = useCart();
  const { showToast } = useToast();
  const [couponInput, setCouponInput]   = useState("");
  const [discount,    setDiscount]      = useState(0);

  const shipping = cartTotal > 500 ? 0 : 49;
  const tax      = cartTotal * 0.08;
  const total    = cartTotal + shipping + tax - (cartTotal * discount / 100);

  const applyCoupon = () => {
    const pct = COUPON_CODES[couponInput.trim().toUpperCase()];
    if (pct) { setDiscount(pct); showToast(`Coupon applied! ${pct}% off 🎉`); }
    else      showToast("Invalid coupon code.", "danger");
  };

  return (
    <div>
      <PageHeader title="Shopping Cart" breadcrumb={["Home", "Cart"]} />

      <section style={{ padding: "50px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <CheckoutSteps active={1} />

          {cart.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "5rem" }}>🛒</div>
              <h3 style={{ marginTop: 16, color: COLORS.gray }}>Your cart is empty</h3>
              <button onClick={() => navigate("category")} style={{
                marginTop: 20, padding: "14px 32px", background: COLORS.accent,
                color: "#fff", border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
              }}>Continue Shopping</button>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 32 }}>

              {/* ── Cart Table ── */}
              <div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      {["Product", "Price", "Qty", "Total", ""].map(h => (
                        <th key={h} style={{ background: COLORS.primary, color: "#fff", padding: "14px 16px", textAlign: "left", fontWeight: 600 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item => (
                      <tr key={item.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <img src={item.img} alt={item.name} style={{ width: 65, height: 65, objectFit: "cover", borderRadius: 8, border: `1px solid ${COLORS.border}` }} />
                            <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{item.name}</span>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px" }}>${item.price.toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <div style={{ display: "flex", border: `2px solid ${COLORS.border}`, borderRadius: 6, overflow: "hidden", width: "fit-content" }}>
                            <button onClick={() => updateQty(item.id, item.qty - 1)} style={{ width: 34, height: 34, background: COLORS.lightBg, border: "none", cursor: "pointer" }}>-</button>
                            <input
                              type="number" value={item.qty}
                              onChange={e => updateQty(item.id, +e.target.value)}
                              style={{ width: 44, height: 34, textAlign: "center", border: "none", borderLeft: `1px solid ${COLORS.border}`, borderRight: `1px solid ${COLORS.border}`, outline: "none" }}
                            />
                            <button onClick={() => updateQty(item.id, item.qty + 1)} style={{ width: 34, height: 34, background: COLORS.lightBg, border: "none", cursor: "pointer" }}>+</button>
                          </div>
                        </td>
                        <td style={{ padding: "14px 16px", fontWeight: 600 }}>${(item.price * item.qty).toLocaleString()}</td>
                        <td style={{ padding: "14px 16px" }}>
                          <button onClick={() => { removeFromCart(item.id); showToast("Item removed.", "info"); }} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.danger, fontSize: "1.2rem" }}>🗑</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button onClick={() => navigate("category")} style={{
                  marginTop: 20, padding: "10px 24px", background: "#fff", color: COLORS.primary,
                  border: `2px solid ${COLORS.border}`, borderRadius: 8, cursor: "pointer", fontWeight: 600,
                }}>← Continue Shopping</button>
              </div>

              {/* ── Order Summary ── */}
              <div>
                <div style={{ background: COLORS.lightBg, borderRadius: 12, padding: 28 }}>
                  <h3 style={{ color: COLORS.primary, marginBottom: 20 }}>Order Summary</h3>

                  {[
                    ["Subtotal",  `$${cartTotal.toFixed(2)}`],
                    ["Shipping",  shipping === 0 ? "FREE" : `$${shipping}`],
                    ["Tax (8%)",  `$${tax.toFixed(2)}`],
                  ].map(([label, val]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: "0.95rem" }}>
                      <span>{label}</span><span>{val}</span>
                    </div>
                  ))}

                  {discount > 0 && (
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: "0.95rem", color: COLORS.success }}>
                      <span>Discount ({discount}%)</span>
                      <span>-${(cartTotal * discount / 100).toFixed(2)}</span>
                    </div>
                  )}

                  <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontSize: "1.1rem", fontWeight: 700, color: COLORS.primary }}>
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>

                  {/* Coupon */}
                  <div style={{ display: "flex", gap: 10, marginTop: 18 }}>
                    <input
                      value={couponInput} onChange={e => setCouponInput(e.target.value)}
                      placeholder="Coupon code"
                      style={{ flex: 1, padding: "10px 14px", border: `2px solid ${COLORS.border}`, borderRadius: 8, outline: "none", fontFamily: "inherit" }}
                    />
                    <button onClick={applyCoupon} style={{ padding: "10px 16px", background: COLORS.secondary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Apply</button>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: COLORS.gray, marginTop: 6 }}>Try: SAVE10, SUMMER20, AQUA15</p>

                  <button onClick={() => navigate("checkout")} style={{
                    width: "100%", padding: "14px", background: COLORS.accent, color: "#fff",
                    border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem", marginTop: 20,
                  }}>Proceed to Checkout →</button>
                </div>
              </div>

            </div>
          )}
        </div>
      </section>
    </div>
  );
}

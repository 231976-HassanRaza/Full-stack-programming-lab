import { COLORS } from "../../styles/theme";
import { CheckoutSteps } from "../../components/UI";

// Generate a random order number once per render
const ORDER_NUMBER = `AQL-${Math.floor(10000 + Math.random() * 90000)}`;

export default function OrderSummaryPage({ navigate }) {
  return (
    <section style={{ background: COLORS.lightBg, minHeight: "80vh", padding: "50px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <CheckoutSteps active={4} />

        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 48, boxShadow: "0 8px 40px rgba(0,0,0,0.1)" }}>
            <div style={{ fontSize: "5rem", marginBottom: 16 }}>🎉</div>

            <div style={{
              width: 70, height: 70, background: COLORS.success, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 24px", fontSize: "2rem", color: "#fff",
            }}>✓</div>

            <h2 style={{ color: COLORS.primary, fontFamily: "Georgia, serif", marginBottom: 12 }}>Order Confirmed!</h2>
            <p style={{ color: COLORS.gray, marginBottom: 8, lineHeight: 1.6 }}>
              Thank you for your purchase. Your order has been received and is being processed.
            </p>
            <p style={{ fontWeight: 700, color: COLORS.secondary, fontSize: "1.1rem", marginBottom: 28 }}>
              Order {ORDER_NUMBER}
            </p>

            {/* Summary rows */}
            <div style={{ textAlign: "left", background: COLORS.lightBg, borderRadius: 10, padding: 20, marginBottom: 28 }}>
              {[
                ["📦 Estimated Delivery", "5–7 business days"],
                ["📧 Confirmation Email",  "Sent to your inbox"],
                ["🔧 Installation",        "Our team will contact you"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: "0.9rem" }}>
                  <span style={{ fontWeight: 600 }}>{label}</span>
                  <span style={{ color: COLORS.gray }}>{val}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
              <button onClick={() => navigate("account")} style={{
                padding: "12px 28px", background: COLORS.secondary, color: "#fff",
                border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer",
              }}>View My Orders</button>
              <button onClick={() => navigate("home")} style={{
                padding: "12px 28px", background: COLORS.accent, color: "#fff",
                border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer",
              }}>Continue Shopping</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

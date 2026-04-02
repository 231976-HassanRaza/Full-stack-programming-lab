import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { FormInput, CheckoutSteps } from "../../components/UI";
import { useCart } from "../../context/CartContext";
import { useToast } from "../../context/ToastContext";
import { isValidEmail, isValidPhone, isMinLength, isRequired } from "../../utils/validators";

const PAYMENT_OPTIONS = [
  { value: "credit",  label: "💳 Credit Card" },
  { value: "paypal",  label: "🅿 PayPal" },
  { value: "bank",    label: "🏦 Bank Transfer" },
];

export default function CheckoutPage({ navigate }) {
  const { clearCart } = useCart();
  const { showToast } = useToast();

  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", zip: "", country: "United States",
    payment: "credit",
    cardNumber: "", cardExpiry: "", cardCvv: "",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!isMinLength(form.firstName, 2)) e.firstName = "At least 2 characters.";
    if (!isMinLength(form.lastName,  2)) e.lastName  = "At least 2 characters.";
    if (!isValidEmail(form.email))       e.email     = "Enter a valid email.";
    if (!isValidPhone(form.phone))       e.phone     = "Enter a valid phone number.";
    if (!isRequired(form.address))       e.address   = "Required.";
    if (!isRequired(form.city))          e.city      = "Required.";
    if (!isRequired(form.zip))           e.zip       = "Required.";
    if (form.payment === "credit") {
      if (!isRequired(form.cardNumber)) e.cardNumber = "Required.";
      if (!isRequired(form.cardExpiry)) e.cardExpiry = "Required.";
      if (!isRequired(form.cardCvv))    e.cardCvv    = "Required.";
    }
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    clearCart();
    showToast("Order placed successfully! 🎉");
    navigate("order-summary");
  };

  return (
    <section style={{ background: COLORS.lightBg, minHeight: "80vh", padding: "50px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
        <CheckoutSteps active={3} />

        <div style={{ display: "grid", gridTemplateColumns: "7fr 5fr", gap: 32 }}>

          {/* ── Left: Forms ── */}
          <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>

            <h3 style={{ color: COLORS.primary, marginBottom: 24, fontFamily: "Georgia, serif" }}>Shipping Information</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FormInput label="First Name" value={form.firstName} onChange={e => set("firstName", e.target.value)} error={errors.firstName} placeholder="John" />
              <FormInput label="Last Name"  value={form.lastName}  onChange={e => set("lastName",  e.target.value)} error={errors.lastName}  placeholder="Doe" />
            </div>
            <FormInput label="Email Address" type="email" value={form.email} onChange={e => set("email", e.target.value)} error={errors.email} placeholder="you@example.com" />
            <FormInput label="Phone Number"              value={form.phone} onChange={e => set("phone", e.target.value)} error={errors.phone} placeholder="+1 (555) 000-0000" />
            <FormInput label="Street Address"            value={form.address} onChange={e => set("address", e.target.value)} error={errors.address} placeholder="123 Main Street" />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <FormInput label="City"     value={form.city} onChange={e => set("city", e.target.value)} error={errors.city} placeholder="New York" />
              <FormInput label="ZIP Code" value={form.zip}  onChange={e => set("zip",  e.target.value)} error={errors.zip}  placeholder="10001" />
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontWeight: 600, fontSize: "0.9rem", marginBottom: 7 }}>Country</label>
                <select value={form.country} onChange={e => set("country", e.target.value)} style={{
                  width: "100%", padding: "12px 16px", border: `2px solid ${COLORS.border}`,
                  borderRadius: 8, fontFamily: "inherit", background: "#fff", fontSize: "0.95rem",
                }}>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>United Kingdom</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>

            {/* Payment */}
            <h3 style={{ color: COLORS.primary, margin: "28px 0 20px", fontFamily: "Georgia, serif" }}>Payment Method</h3>

            {PAYMENT_OPTIONS.map(opt => (
              <div key={opt.value} onClick={() => set("payment", opt.value)} style={{
                border: `2px solid ${form.payment === opt.value ? COLORS.secondary : COLORS.border}`,
                borderRadius: 10, padding: 16, cursor: "pointer", marginBottom: 12,
                background: form.payment === opt.value ? "rgba(46,134,171,0.05)" : "#fff",
              }}>
                <label style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 12, fontWeight: 600 }}>
                  <input type="radio" name="payment" checked={form.payment === opt.value} onChange={() => set("payment", opt.value)} style={{ accentColor: COLORS.secondary }} />
                  {opt.label}
                </label>

                {/* Credit card fields */}
                {form.payment === "credit" && opt.value === "credit" && (
                  <div style={{ marginTop: 16 }}>
                    <FormInput label="Card Number" value={form.cardNumber} onChange={e => set("cardNumber", e.target.value)} error={errors.cardNumber} placeholder="1234 5678 9012 3456" />
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <FormInput label="Expiry Date" value={form.cardExpiry} onChange={e => set("cardExpiry", e.target.value)} error={errors.cardExpiry} placeholder="MM / YY" />
                      <FormInput label="CVV"         value={form.cardCvv}   onChange={e => set("cardCvv",   e.target.value)} error={errors.cardCvv}    placeholder="123" />
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button onClick={handleSubmit} style={{
              width: "100%", padding: "16px", background: COLORS.accent, color: "#fff",
              border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "1.05rem", marginTop: 8,
            }}>Place Order →</button>
          </div>

          {/* ── Right: Summary ── */}
          <div>
            <div style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", position: "sticky", top: 100 }}>
              <h3 style={{ color: COLORS.primary, marginBottom: 20 }}>Order Summary</h3>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}><span>Subtotal</span><span>See Cart</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}` }}><span>Shipping</span><span>Calculated</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 0 0", fontWeight: 700, color: COLORS.primary, fontSize: "1.1rem" }}><span>Total</span><span>See Cart</span></div>
              <div style={{ marginTop: 20, padding: 14, background: COLORS.lightBg, borderRadius: 8, fontSize: "0.85rem", color: COLORS.gray }}>
                🔒 Your payment info is secured with 256-bit SSL encryption.
              </div>
              <button onClick={() => navigate("cart")} style={{
                width: "100%", marginTop: 14, padding: "10px", background: "#fff", color: COLORS.primary,
                border: `2px solid ${COLORS.border}`, borderRadius: 8, cursor: "pointer", fontWeight: 600,
              }}>← Back to Cart</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { PageHeader, FormInput } from "../../components/UI";
import { useToast } from "../../context/ToastContext";
import { isValidEmail, isRequired } from "../../utils/validators";

const CONTACT_INFO = [
  { icon: "📍", label: "Address", value: "123 Spa Boulevard, New York, NY 10001, USA" },
  { icon: "📞", label: "Phone",   value: "+1 (800) 275-2843" },
  { icon: "📧", label: "Email",   value: "hello@aqualux.com" },
  { icon: "🕐", label: "Hours",   value: "Mon–Fri: 9am–6pm ET" },
];

export default function ContactPage() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!isRequired(form.name))    e.name    = "Required.";
    if (!isValidEmail(form.email)) e.email   = "Enter a valid email.";
    if (!isRequired(form.subject)) e.subject = "Required.";
    if (!isRequired(form.message)) e.message = "Required.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    showToast("Message sent! We'll get back to you soon. 💬");
    setForm({ name: "", email: "", subject: "", message: "" });
    setErrors({});
  };

  return (
    <div>
      <PageHeader title="Contact Us" breadcrumb={["Home", "Contact"]} />

      <section style={{ padding: "60px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "4fr 8fr", gap: 32 }}>

          {/* ── Contact Info Card ── */}
          <div style={{ background: COLORS.primary, color: "#fff", borderRadius: 12, padding: 32 }}>
            <h3 style={{ fontSize: "1.4rem", marginBottom: 24, fontFamily: "Georgia, serif" }}>Get In Touch</h3>

            {CONTACT_INFO.map(item => (
              <div key={item.label} style={{ display: "flex", gap: 14, marginBottom: 22 }}>
                <span style={{ fontSize: "1.3rem", color: COLORS.accent, flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h5 style={{ margin: "0 0 4px", opacity: 0.7, fontSize: "0.9rem" }}>{item.label}</h5>
                  <p style={{ margin: 0, fontSize: "0.95rem" }}>{item.value}</p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div style={{
              background: "rgba(255,255,255,0.1)", borderRadius: 8, height: 160,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginTop: 20, border: "2px dashed rgba(255,255,255,0.3)", color: "rgba(255,255,255,0.6)",
              fontSize: "0.9rem",
            }}>
              📍 Map coming soon
            </div>

            {/* Social icons */}
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              {["𝕏", "f", "in", "📷"].map((s, i) => (
                <div key={i} style={{
                  width: 40, height: 40, background: "rgba(255,255,255,0.15)", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", transition: "background 0.2s", fontSize: "0.9rem",
                }}
                  onMouseOver={e => e.currentTarget.style.background = COLORS.accent}
                  onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                >{s}</div>
              ))}
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div style={{ background: "#fff", borderRadius: 12, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <h3 style={{ color: COLORS.primary, marginBottom: 24, fontFamily: "Georgia, serif" }}>Send a Message</h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FormInput label="Your Name"     value={form.name}    onChange={e => set("name",    e.target.value)} error={errors.name}    placeholder="John Doe" />
              <FormInput label="Email Address" type="email" value={form.email}   onChange={e => set("email",   e.target.value)} error={errors.email}   placeholder="you@example.com" />
            </div>
            <FormInput label="Subject" value={form.subject} onChange={e => set("subject", e.target.value)} error={errors.subject} placeholder="How can we help?" />
            <FormInput label="Message" value={form.message} onChange={e => set("message", e.target.value)} error={errors.message} placeholder="Tell us more..." rows={5} />

            <button onClick={handleSubmit} style={{
              padding: "14px 36px", background: COLORS.accent, color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
            }}>Send Message 📤</button>
          </div>

        </div>
      </section>

      {/* ── FAQ strip ── */}
      <section style={{ padding: "50px 0", background: COLORS.lightBg }}>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 20px" }}>
          <h2 style={{ color: COLORS.primary, textAlign: "center", marginBottom: 32, fontFamily: "Georgia, serif" }}>Frequently Asked Questions</h2>
          {[
            ["How long does delivery take?",      "Standard delivery takes 5–7 business days. For large items like hot tubs, our installation team will contact you to schedule a suitable time."],
            ["Do you offer financing?",            "Yes! We partner with several lenders to offer 0% financing for qualified customers. Ask our sales team for details."],
            ["What's included in the warranty?",  "All AquaLux products include a 5-year full coverage warranty. This covers parts, labour, and all manufacturing defects."],
            ["Can I return a hot tub?",            "We offer a 30-day satisfaction guarantee. If you're not happy, we'll arrange a full refund — no questions asked."],
          ].map(([q, a]) => (
            <div key={q} style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", marginBottom: 14, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
              <h4 style={{ color: COLORS.primary, marginBottom: 8 }}>{q}</h4>
              <p style={{ color: COLORS.gray, margin: 0, lineHeight: 1.7, fontSize: "0.92rem" }}>{a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

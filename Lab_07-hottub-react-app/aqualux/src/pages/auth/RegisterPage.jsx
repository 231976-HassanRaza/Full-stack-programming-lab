import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { FormInput } from "../../components/UI";
import { useToast } from "../../context/ToastContext";
import { isValidEmail, isValidPhone, isStrongPass, isMinLength } from "../../utils/validators";

export default function RegisterPage({ navigate }) {
  const { showToast } = useToast();
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "",
    phone: "", password: "", confirmPassword: "", terms: false,
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!isMinLength(form.firstName, 2))          e.firstName       = "At least 2 characters.";
    if (!isMinLength(form.lastName, 2))           e.lastName        = "At least 2 characters.";
    if (!isValidEmail(form.email))                e.email           = "Enter a valid email.";
    if (!isValidPhone(form.phone))                e.phone           = "Enter a valid phone number.";
    if (!isStrongPass(form.password))             e.password        = "Min 8 chars, 1 uppercase, 1 number.";
    if (form.confirmPassword !== form.password)   e.confirmPassword = "Passwords do not match.";
    if (!form.terms)                              e.terms           = "You must agree to the terms.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    showToast("Account created! Welcome to AquaLux! 🎉");
    setTimeout(() => navigate("login"), 1500);
  };

  return (
    <div style={{ background: COLORS.lightBg, padding: "40px 0" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ background: COLORS.primary, padding: 30, textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>✨</div>
            <h2 style={{ fontSize: "1.7rem", margin: "0 0 6px", fontFamily: "Georgia, serif" }}>Create Account</h2>
            <p style={{ opacity: 0.8, fontSize: "0.92rem", margin: 0 }}>Join the AquaLux family today</p>
          </div>

          {/* Body */}
          <div style={{ padding: 32 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <FormInput label="First Name" value={form.firstName} onChange={e => set("firstName", e.target.value)} error={errors.firstName} placeholder="John" />
              <FormInput label="Last Name"  value={form.lastName}  onChange={e => set("lastName", e.target.value)}  error={errors.lastName}  placeholder="Doe" />
            </div>
            <FormInput label="Email Address" type="email"    value={form.email}           onChange={e => set("email", e.target.value)}           error={errors.email}           placeholder="you@example.com" />
            <FormInput label="Phone Number"                  value={form.phone}           onChange={e => set("phone", e.target.value)}           error={errors.phone}           placeholder="+1 (555) 000-0000" />
            <FormInput label="Password"      type="password" value={form.password}        onChange={e => set("password", e.target.value)}        error={errors.password}        placeholder="Min 8 chars, 1 uppercase, 1 number" />
            <FormInput label="Confirm Password" type="password" value={form.confirmPassword} onChange={e => set("confirmPassword", e.target.value)} error={errors.confirmPassword} placeholder="Repeat password" />

            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8, cursor: "pointer", fontSize: "0.9rem" }}>
              <input type="checkbox" checked={form.terms} onChange={e => set("terms", e.target.checked)} style={{ marginTop: 2 }} />
              <span>
                I agree to the{" "}
                <button onClick={() => navigate("terms")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.secondary, fontWeight: 600, fontFamily: "inherit", fontSize: "0.9rem" }}>
                  Terms & Conditions
                </button>
              </span>
            </label>
            {errors.terms && <span style={{ color: COLORS.danger, fontSize: "0.8rem", display: "block", marginBottom: 12 }}>{errors.terms}</span>}

            <button onClick={handleSubmit} style={{
              width: "100%", padding: "14px", background: COLORS.accent, color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem", marginTop: 8,
            }}>Create Account ✨</button>

            <div style={{ textAlign: "center", marginTop: 20, fontSize: "0.9rem", color: COLORS.gray }}>
              Already have an account?{" "}
              <button onClick={() => navigate("login")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.secondary, fontWeight: 600, fontFamily: "inherit" }}>Sign in</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

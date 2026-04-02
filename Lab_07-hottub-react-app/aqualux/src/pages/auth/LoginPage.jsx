import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { FormInput, Btn } from "../../components/UI";
import { useToast } from "../../context/ToastContext";
import { isValidEmail } from "../../utils/validators";

export default function LoginPage({ navigate }) {
  const { showToast } = useToast();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [errors,   setErrors]   = useState({});
  const [loading,  setLoading]  = useState(false);

  const validate = () => {
    const e = {};
    if (!isValidEmail(email))     e.email    = "Please enter a valid email address.";
    if (password.length < 6)      e.password = "Password must be at least 6 characters.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Login successful! Redirecting...");
      setTimeout(() => navigate("account"), 1000);
    }, 1200);
  };

  return (
    <div style={{ background: COLORS.lightBg, minHeight: "100vh", display: "flex", alignItems: "center", padding: "40px 0" }}>
      <div style={{ maxWidth: 480, width: "100%", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>

          {/* Header */}
          <div style={{ background: COLORS.primary, padding: 30, textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>👤</div>
            <h2 style={{ fontSize: "1.7rem", margin: "0 0 6px", fontFamily: "Georgia, serif" }}>Welcome Back</h2>
            <p style={{ opacity: 0.8, fontSize: "0.92rem", margin: 0 }}>Sign in to your AquaLux account</p>
          </div>

          {/* Body */}
          <div style={{ padding: 32 }}>
            <FormInput
              label="📧 Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={errors.email}
              placeholder="you@example.com"
            />
            <FormInput
              label="🔒 Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              error={errors.password}
              placeholder="Enter your password"
            />

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, fontSize: "0.88rem" }}>
              <label style={{ display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>
                <input type="checkbox" /> Remember me
              </label>
              <button onClick={() => navigate("forgot-password")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.secondary, fontWeight: 600, fontFamily: "inherit", fontSize: "0.88rem" }}>
                Forgot password?
              </button>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", padding: "14px", background: loading ? COLORS.gray : COLORS.accent,
                color: "#fff", border: "none", borderRadius: 8, fontWeight: 700,
                cursor: loading ? "not-allowed" : "pointer", fontSize: "1rem",
              }}
            >{loading ? "Signing in..." : "Sign In →"}</button>

            <div style={{ textAlign: "center", marginTop: 20, fontSize: "0.9rem", color: COLORS.gray }}>
              Don't have an account?{" "}
              <button onClick={() => navigate("register")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.secondary, fontWeight: 600, fontFamily: "inherit" }}>
                Create one
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { FormInput } from "../../components/UI";
import { useToast } from "../../context/ToastContext";
import { isValidEmail } from "../../utils/validators";

export default function ForgotPasswordPage({ navigate }) {
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!isValidEmail(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    showToast("Reset link sent! Check your inbox. 📧");
    setEmail("");
  };

  return (
    <div style={{ background: COLORS.lightBg, minHeight: "100vh", display: "flex", alignItems: "center", padding: "40px 0" }}>
      <div style={{ maxWidth: 480, width: "100%", margin: "0 auto", padding: "0 20px" }}>
        <div style={{ background: "#fff", borderRadius: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.1)", overflow: "hidden" }}>

          <div style={{ background: COLORS.primary, padding: 30, textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>🔑</div>
            <h2 style={{ fontSize: "1.7rem", margin: "0 0 6px", fontFamily: "Georgia, serif" }}>Reset Password</h2>
            <p style={{ opacity: 0.8, fontSize: "0.92rem", margin: 0 }}>Enter your email to receive a reset link</p>
          </div>

          <div style={{ padding: 32 }}>
            <FormInput
              label="Email Address"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={error}
              placeholder="you@example.com"
            />
            <button onClick={handleSubmit} style={{
              width: "100%", padding: "14px", background: COLORS.accent, color: "#fff",
              border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "1rem",
            }}>Send Reset Link</button>

            <div style={{ textAlign: "center", marginTop: 20 }}>
              <button onClick={() => navigate("login")} style={{ background: "none", border: "none", cursor: "pointer", color: COLORS.secondary, fontWeight: 600, fontFamily: "inherit", fontSize: "0.9rem" }}>
                ← Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

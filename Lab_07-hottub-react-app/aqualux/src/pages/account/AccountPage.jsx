import { useState } from "react";
import { COLORS } from "../../styles/theme";
import { PageHeader, FormInput } from "../../components/UI";
import { useToast } from "../../context/ToastContext";

const SIDEBAR_NAV = [
  { key: "overview",   icon: "📊", label: "Dashboard" },
  { key: "orders",     icon: "📦", label: "My Orders" },
  { key: "addresses",  icon: "📍", label: "Addresses" },
  { key: "settings",   icon: "⚙",  label: "Account Settings" },
];

const ORDERS = [
  { id: "AQL-10201", date: "Mar 15, 2025", status: "Delivered",  total: "$4,648.00", items: 2 },
  { id: "AQL-10156", date: "Feb 28, 2025", status: "Processing", total: "$349.00",   items: 1 },
  { id: "AQL-10089", date: "Jan 12, 2025", status: "Delivered",  total: "$178.00",   items: 3 },
];

export default function AccountPage({ navigate }) {
  const { showToast } = useToast();
  const [section, setSection] = useState("overview");

  return (
    <div>
      <PageHeader title="My Account" breadcrumb={["Home", "My Account"]} />

      <section style={{ padding: "50px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "3fr 9fr", gap: 32 }}>

          {/* ── Sidebar ── */}
          <div style={{ background: COLORS.primary, borderRadius: 12, padding: 24, color: "#fff", alignSelf: "start" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: COLORS.secondary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem", margin: "0 auto 14px", border: `3px solid ${COLORS.accent}` }}>👤</div>
            <h3 style={{ textAlign: "center", margin: "0 0 4px" }}>John Doe</h3>
            <p style={{ textAlign: "center", opacity: 0.75, fontSize: "0.85rem", marginBottom: 22 }}>john.doe@example.com</p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {SIDEBAR_NAV.map(item => (
                <li key={item.key}>
                  <button onClick={() => setSection(item.key)} style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                    borderRadius: 8, width: "100%", textAlign: "left", border: "none",
                    cursor: "pointer", fontFamily: "inherit", fontSize: "0.92rem",
                    background: section === item.key ? "rgba(255,255,255,0.15)" : "none",
                    color: section === item.key ? "#fff" : "rgba(255,255,255,0.85)",
                  }}>{item.icon} {item.label}</button>
                </li>
              ))}
              <li>
                <button onClick={() => navigate("login")} style={{
                  display: "flex", alignItems: "center", gap: 12, padding: "11px 14px",
                  borderRadius: 8, width: "100%", textAlign: "left", border: "none",
                  cursor: "pointer", fontFamily: "inherit", fontSize: "0.92rem",
                  background: "none", color: "rgba(255,255,255,0.85)", marginTop: 8,
                }}>🚪 Logout</button>
              </li>
            </ul>
          </div>

          {/* ── Content ── */}
          <div>
            {section === "overview" && <OverviewSection />}
            {section === "orders"   && <OrdersSection />}
            {section === "addresses"&& <AddressesSection />}
            {section === "settings" && <SettingsSection showToast={showToast} />}
          </div>

        </div>
      </section>
    </div>
  );
}

/* ── Sub-sections ── */

function OverviewSection() {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 32 }}>
        {[["📦","Total Orders","12"],["💰","Total Spent","$18,430"],["❤️","Wishlist Items","5"]].map(([icon, label, val]) => (
          <div key={label} style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", textAlign: "center" }}>
            <div style={{ fontSize: "2rem" }}>{icon}</div>
            <h3 style={{ fontSize: "1.8rem", color: COLORS.secondary, margin: "8px 0 4px", fontWeight: 800 }}>{val}</h3>
            <p style={{ color: COLORS.gray, fontSize: "0.88rem", margin: 0 }}>{label}</p>
          </div>
        ))}
      </div>
      <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
        <h3 style={{ color: COLORS.primary, marginBottom: 18 }}>Account Information</h3>
        {[["Full Name","John Doe"],["Email","john.doe@example.com"],["Phone","+1 (555) 123-4567"],["Member Since","January 2023"]].map(([k, v]) => (
          <div key={k} style={{ display: "grid", gridTemplateColumns: "160px 1fr", padding: "10px 0", borderBottom: `1px solid ${COLORS.lightBg}`, fontSize: "0.92rem" }}>
            <span style={{ fontWeight: 600, color: COLORS.gray }}>{k}</span>
            <span>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersSection() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h3 style={{ color: COLORS.primary, marginBottom: 18 }}>Order History</h3>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>{["Order ID","Date","Items","Status","Total"].map(h => (
            <th key={h} style={{ background: COLORS.primary, color: "#fff", padding: "12px 16px", textAlign: "left" }}>{h}</th>
          ))}</tr>
        </thead>
        <tbody>
          {ORDERS.map(o => (
            <tr key={o.id} style={{ borderBottom: `1px solid ${COLORS.border}` }}>
              <td style={{ padding: "12px 16px", color: COLORS.secondary, fontWeight: 600 }}>{o.id}</td>
              <td style={{ padding: "12px 16px", color: COLORS.gray }}>{o.date}</td>
              <td style={{ padding: "12px 16px" }}>{o.items}</td>
              <td style={{ padding: "12px 16px" }}>
                <span style={{
                  padding: "4px 12px", borderRadius: 20, fontSize: "0.82rem", fontWeight: 700,
                  background: o.status === "Delivered" ? "#d4edda" : "#fff3cd",
                  color: o.status === "Delivered" ? COLORS.success : "#856404",
                }}>{o.status}</span>
              </td>
              <td style={{ padding: "12px 16px", fontWeight: 700 }}>{o.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AddressesSection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {["Billing Address", "Shipping Address"].map(type => (
        <div key={type} style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <h3 style={{ color: COLORS.primary, marginBottom: 14 }}>{type}</h3>
          <p style={{ color: COLORS.gray, lineHeight: 1.8, fontSize: "0.92rem" }}>
            John Doe<br />123 Main Street<br />New York, NY 10001<br />United States
          </p>
          <button style={{ marginTop: 14, padding: "8px 18px", background: COLORS.secondary, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Edit</button>
        </div>
      ))}
    </div>
  );
}

function SettingsSection({ showToast }) {
  const [form, setForm] = useState({ firstName: "John", lastName: "Doe", email: "john.doe@example.com", phone: "+1 (555) 123-4567" });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
      <h3 style={{ color: COLORS.primary, marginBottom: 24 }}>Account Settings</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <FormInput label="First Name" value={form.firstName} onChange={e => set("firstName", e.target.value)} />
        <FormInput label="Last Name"  value={form.lastName}  onChange={e => set("lastName",  e.target.value)} />
      </div>
      <FormInput label="Email"   type="email" value={form.email} onChange={e => set("email", e.target.value)} />
      <FormInput label="Phone"               value={form.phone} onChange={e => set("phone", e.target.value)} />
      <hr style={{ border: "none", borderTop: `2px solid ${COLORS.lightBg}`, margin: "24px 0" }} />
      <h4 style={{ color: COLORS.primary, marginBottom: 16 }}>Change Password</h4>
      <FormInput label="Current Password" type="password" value="" onChange={() => {}} placeholder="••••••••" />
      <FormInput label="New Password"     type="password" value="" onChange={() => {}} placeholder="Min 8 chars" />
      <FormInput label="Confirm Password" type="password" value="" onChange={() => {}} placeholder="Repeat new password" />
      <button onClick={() => showToast("Account updated successfully! ✅")} style={{
        padding: "12px 28px", background: COLORS.accent, color: "#fff",
        border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer",
      }}>Save Changes</button>
    </div>
  );
}

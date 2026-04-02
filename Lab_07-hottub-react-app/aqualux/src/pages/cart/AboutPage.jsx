import { COLORS } from "../../styles/theme";
import { SectionTitle } from "../../components/UI";
import { TEAM } from "../../data/products";

const STATS = [
  ["20+",    "Years in Business"],
  ["15,000+","Happy Customers"],
  ["50+",    "Products"],
  ["99%",    "Satisfaction Rate"],
];

export default function AboutPage({ navigate }) {
  return (
    <div>
      {/* ── About Hero ── */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
        color: "#fff", padding: "80px 0", textAlign: "center",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <h1 style={{ fontSize: "3rem", fontFamily: "Georgia, serif", marginBottom: 16 }}>About AquaLux</h1>
          <p style={{ opacity: 0.85, fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
            Premium hot tubs since 2005 — where quality meets serenity.
          </p>
        </div>
      </div>

      {/* ── Our Story ── */}
      <section style={{ padding: "70px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 50, alignItems: "center" }}>
          <div>
            <h2 style={{ color: COLORS.primary, marginBottom: 16, fontSize: "2rem", fontFamily: "Georgia, serif" }}>Our Story</h2>
            <p style={{ color: COLORS.gray, lineHeight: 1.8, marginBottom: 16 }}>
              Founded in 2005 by James Harlow, AquaLux began with a simple vision: to bring the luxury of a day spa into every home. Over two decades, we've grown from a small workshop in New York to a nationally recognised brand trusted by thousands of homeowners across the country.
            </p>
            <p style={{ color: COLORS.gray, lineHeight: 1.8, marginBottom: 28 }}>
              Every hot tub we craft embodies our commitment to quality craftsmanship, energy efficiency, and therapeutic design. We partner with leading hydrotherapy researchers to ensure our products deliver real health and wellness benefits.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={() => navigate("category")} style={{
                padding: "12px 28px", background: COLORS.accent, color: "#fff",
                border: "none", borderRadius: 8, fontWeight: 700, cursor: "pointer",
              }}>Shop Now</button>
              <button onClick={() => navigate("contact")} style={{
                padding: "12px 28px", background: "#fff", color: COLORS.secondary,
                border: `2px solid ${COLORS.secondary}`, borderRadius: 8, fontWeight: 700, cursor: "pointer",
              }}>Contact Us</button>
            </div>
          </div>
          <div style={{ borderRadius: 16, overflow: "hidden", height: 380 }}>
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=700&h=500&fit=crop"
              alt="AquaLux showroom"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section style={{ padding: "60px 0", background: COLORS.lightBg }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <SectionTitle title="Our Numbers" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
            {STATS.map(([num, label]) => (
              <div key={label} style={{ background: "#fff", borderRadius: 12, padding: 28, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                <h3 style={{ fontSize: "2.5rem", color: COLORS.secondary, fontWeight: 800, margin: 0 }}>{num}</h3>
                <p style={{ color: COLORS.gray, fontSize: "0.9rem", marginTop: 6 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ padding: "70px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <SectionTitle title="Meet the Team" sub="The people behind AquaLux" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24 }}>
            {TEAM.map(member => (
              <div key={member.name}
                style={{ textAlign: "center", background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.08)", transition: "transform 0.3s" }}
                onMouseOver={e => e.currentTarget.style.transform = "translateY(-5px)"}
                onMouseOut={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <div style={{ width: 90, height: 90, borderRadius: "50%", overflow: "hidden", margin: "0 auto 14px", border: `3px solid ${COLORS.secondary}` }}>
                  <img src={member.img} alt={member.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h4 style={{ margin: "0 0 4px", color: COLORS.dark }}>{member.name}</h4>
                <p style={{ color: COLORS.gray, fontSize: "0.88rem", margin: 0 }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values Strip ── */}
      <section style={{ padding: "60px 0", background: COLORS.primary, color: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32, textAlign: "center" }}>
            {[
              ["🌿","Sustainability","We build products designed to last, using energy-efficient technology that lowers your carbon footprint."],
              ["🏆","Excellence","Every tub undergoes 200+ quality checks before it leaves our facility."],
              ["❤️","Community","We give back — 1% of every sale supports local wellness programs."],
            ].map(([icon, title, text]) => (
              <div key={title}>
                <div style={{ fontSize: "2.5rem", marginBottom: 14 }}>{icon}</div>
                <h4 style={{ color: COLORS.accent, marginBottom: 10, fontSize: "1.1rem" }}>{title}</h4>
                <p style={{ opacity: 0.8, lineHeight: 1.7, fontSize: "0.9rem" }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ============================================
//  WhyChooseUs Component
//  Highlights key reasons to buy from AquaLux
// ============================================

import { COLORS, RADIUS, SHADOWS } from "../styles/theme";

const REASONS = [
    {
        icon: "🏆",
        title: "Award-Winning Quality",
        desc: "AquaLux has won the Best Luxury Spa Brand award 3 years running. Every tub is built to last decades with premium materials.",
    },
    {
        icon: "🔧",
        title: "Professional Installation",
        desc: "Our certified technicians handle complete setup, including plumbing, electrical connections, and initial water treatment.",
    },
    {
        icon: "🛡️",
        title: "5-Year Full Warranty",
        desc: "Every purchase is backed by our industry-leading 5-year warranty covering parts, labour, and shell structure.",
    },
    {
        icon: "📞",
        title: "24/7 Customer Support",
        desc: "Questions at midnight? We're here. Our expert team is available around the clock via phone, chat, and email.",
    },
    {
        icon: "🌿",
        title: "Eco-Friendly Technology",
        desc: "Our energy-efficient heating systems use up to 40% less electricity compared to conventional hot tubs.",
    },
    {
        icon: "💳",
        title: "Flexible Financing",
        desc: "Spread your payments with 0% finance options available over 12, 24, or 36 months — making luxury affordable.",
    },
];

const STATS = [
    { value: "18+", label: "Years in Business" },
    { value: "12,000+", label: "Happy Customers" },
    { value: "50+", label: "Models Available" },
    { value: "4.9★", label: "Average Rating" },
];

export default function WhyChooseUs() {
    return (
        <section style={{ padding: "80px 0", background: COLORS.lightBg }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: 56 }}>
                    <h2 style={{
                        fontSize: "2.2rem", color: COLORS.primary,
                        marginBottom: 12, fontFamily: "Georgia, serif"
                    }}>
                        Why Choose AquaLux?
                    </h2>
                    <p style={{ color: COLORS.gray, fontSize: "1.05rem", maxWidth: 560, margin: "0 auto" }}>
                        We don't just sell hot tubs — we deliver a complete luxury lifestyle experience
                    </p>
                    <div style={{ width: 60, height: 4, background: COLORS.accent, margin: "12px auto 0", borderRadius: 2 }} />
                </div>

                {/* Stats Row */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: 20,
                    marginBottom: 64,
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                    borderRadius: RADIUS.lg,
                    padding: "36px 20px",
                    boxShadow: SHADOWS.hover,
                }}>
                    {STATS.map((s) => (
                        <div key={s.label} style={{ textAlign: "center", color: "#fff" }}>
                            <div style={{
                                fontSize: "2.4rem", fontWeight: 800,
                                color: COLORS.accent, fontFamily: "Georgia, serif",
                            }}>
                                {s.value}
                            </div>
                            <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", marginTop: 4 }}>
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Reasons Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 28,
                }}>
                    {REASONS.map((r) => (
                        <div key={r.title} style={{
                            background: "#fff",
                            borderRadius: RADIUS.lg,
                            padding: "30px 26px",
                            boxShadow: SHADOWS.card,
                            display: "flex",
                            gap: 18,
                            alignItems: "flex-start",
                            transition: "all 0.3s",
                            borderLeft: `4px solid ${COLORS.accent}`,
                        }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = "translateY(-4px)";
                                e.currentTarget.style.boxShadow = SHADOWS.hover;
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = SHADOWS.card;
                            }}
                        >
                            <div style={{
                                fontSize: "1.8rem",
                                width: 52, height: 52,
                                background: COLORS.primary + "12",
                                borderRadius: "50%",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                flexShrink: 0,
                            }}>
                                {r.icon}
                            </div>
                            <div>
                                <h4 style={{
                                    margin: "0 0 8px",
                                    color: COLORS.primary,
                                    fontWeight: 700,
                                    fontSize: "1rem",
                                }}>
                                    {r.title}
                                </h4>
                                <p style={{
                                    margin: 0,
                                    color: COLORS.gray,
                                    fontSize: "0.88rem",
                                    lineHeight: 1.65,
                                }}>
                                    {r.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

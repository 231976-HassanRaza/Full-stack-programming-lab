// ============================================
//  TestimonialsSection Component
//  Shows customer reviews / testimonials
// ============================================

import { COLORS, RADIUS, SHADOWS } from "../styles/theme";
import { Stars } from "./Ui";

const TESTIMONIALS = [
    {
        id: 1,
        name: "Sarah Mitchell",
        location: "Texas, USA",
        rating: 5,
        text: "Our AquaLux hot tub has completely transformed our backyard. The quality is outstanding and the delivery team was incredibly professional. Best purchase we've made!",
        avatar: "SM",
        product: "Serenity 6-Person Hot Tub",
    },
    {
        id: 2,
        name: "James O'Brien",
        location: "California, USA",
        rating: 5,
        text: "I've had my swim spa for 8 months now and use it every single day. The build quality is exceptional and the customer support has been fantastic throughout.",
        avatar: "JO",
        product: "AquaFit Swim Spa 14ft",
    },
    {
        id: 3,
        name: "Linda Hernandez",
        location: "Florida, USA",
        rating: 4,
        text: "Absolutely love it! The jets are powerful and the heating system is very efficient. Delivery was on time and setup was done perfectly by the AquaLux team.",
        avatar: "LH",
        product: "Luxury 4-Person Spa",
    },
];

export default function TestimonialsSection() {
    return (
        <section style={{ padding: "70px 0", background: "#fff" }}>
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

                {/* Section Header */}
                <div style={{ textAlign: "center", marginBottom: 50 }}>
                    <h2 style={{
                        fontSize: "2.2rem", color: COLORS.primary,
                        marginBottom: 12, fontFamily: "Georgia, serif"
                    }}>
                        What Our Customers Say
                    </h2>
                    <p style={{ color: COLORS.gray, fontSize: "1.05rem" }}>
                        Real stories from real AquaLux owners
                    </p>
                    <div style={{
                        width: 60, height: 4, background: COLORS.accent,
                        margin: "12px auto 0", borderRadius: 2
                    }} />
                </div>

                {/* Testimonial Cards */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 28,
                }}>
                    {TESTIMONIALS.map((t) => (
                        <div key={t.id} style={{
                            background: COLORS.lightBg,
                            borderRadius: RADIUS.lg,
                            padding: "30px 28px",
                            boxShadow: SHADOWS.card,
                            borderTop: `4px solid ${COLORS.accent}`,
                            transition: "all 0.3s",
                            position: "relative",
                        }}
                            onMouseOver={e => {
                                e.currentTarget.style.transform = "translateY(-5px)";
                                e.currentTarget.style.boxShadow = SHADOWS.hover;
                            }}
                            onMouseOut={e => {
                                e.currentTarget.style.transform = "translateY(0)";
                                e.currentTarget.style.boxShadow = SHADOWS.card;
                            }}
                        >
                            {/* Quote Icon */}
                            <div style={{
                                fontSize: "3rem", color: COLORS.accent,
                                lineHeight: 1, marginBottom: 12, opacity: 0.5,
                                fontFamily: "Georgia, serif"
                            }}>"</div>

                            {/* Stars */}
                            <div style={{ marginBottom: 12 }}>
                                <Stars n={t.rating} />
                            </div>

                            {/* Review text */}
                            <p style={{
                                color: "#444", fontSize: "0.95rem",
                                lineHeight: 1.7, marginBottom: 20, fontStyle: "italic"
                            }}>
                                {t.text}
                            </p>

                            {/* Product tag */}
                            <div style={{
                                display: "inline-block",
                                background: COLORS.primary + "15",
                                color: COLORS.primary,
                                padding: "4px 10px",
                                borderRadius: 20,
                                fontSize: "0.78rem",
                                fontWeight: 600,
                                marginBottom: 20,
                            }}>
                                🛁 {t.product}
                            </div>

                            {/* Reviewer info */}
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{
                                    width: 46, height: 46,
                                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`,
                                    color: "#fff", borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontWeight: 700, fontSize: "0.9rem", flexShrink: 0,
                                }}>
                                    {t.avatar}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 700, color: COLORS.dark, fontSize: "0.95rem" }}>
                                        {t.name}
                                    </div>
                                    <div style={{ color: COLORS.gray, fontSize: "0.82rem" }}>
                                        📍 {t.location}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

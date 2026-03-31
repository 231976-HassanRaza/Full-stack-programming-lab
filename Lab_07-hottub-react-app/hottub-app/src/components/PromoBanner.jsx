// ============================================
//  PromoBanner Component
//  Full-width promotional / sale banner
//  with a live countdown timer
// ============================================

import { useState, useEffect } from "react";
import { COLORS } from "../styles/theme";

function useCountdown() {
    // Target: 3 days from now
    const [target] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 3);
        d.setHours(0, 0, 0, 0);
        return d.getTime();
    });

    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

    useEffect(() => {
        const tick = () => {
            const diff = target - Date.now();
            if (diff <= 0) {
                setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
                return;
            }
            setTimeLeft({
                days: Math.floor(diff / 86400000),
                hours: Math.floor((diff % 86400000) / 3600000),
                mins: Math.floor((diff % 3600000) / 60000),
                secs: Math.floor((diff % 60000) / 1000),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [target]);

    return timeLeft;
}

function TimeBox({ value, label }) {
    return (
        <div style={{ textAlign: "center", minWidth: 64 }}>
            <div style={{
                background: "rgba(255,255,255,0.15)",
                border: "2px solid rgba(255,255,255,0.3)",
                borderRadius: 10,
                padding: "12px 16px",
                fontSize: "2rem",
                fontWeight: 800,
                lineHeight: 1,
                color: "#fff",
                marginBottom: 6,
                letterSpacing: "0.02em",
            }}>
                {String(value).padStart(2, "0")}
            </div>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.75)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                {label}
            </div>
        </div>
    );
}

export default function PromoBanner({ navigate }) {
    const { days, hours, mins, secs } = useCountdown();

    return (
        <section style={{
            background: `linear-gradient(135deg, #8B0000 0%, ${COLORS.primary} 60%, #1a3a5c 100%)`,
            padding: "60px 20px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Decorative circles */}
            <div style={{
                position: "absolute", top: -60, right: -60,
                width: 220, height: 220, borderRadius: "50%",
                background: "rgba(255,255,255,0.04)", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: -80, left: -40,
                width: 280, height: 280, borderRadius: "50%",
                background: "rgba(255,255,255,0.04)", pointerEvents: "none",
            }} />

            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
                {/* Tag */}
                <div style={{
                    display: "inline-block",
                    background: COLORS.accent,
                    color: "#fff",
                    padding: "5px 18px",
                    borderRadius: 20,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                }}>
                    ⚡ Limited Time Offer
                </div>

                <h2 style={{
                    fontSize: "2.5rem",
                    fontWeight: 800,
                    color: "#fff",
                    fontFamily: "Georgia, serif",
                    marginBottom: 12,
                    lineHeight: 1.2,
                }}>
                    Summer Sale — Up to{" "}
                    <span style={{ color: COLORS.accent }}>30% Off</span>
                </h2>

                <p style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "1.05rem",
                    marginBottom: 36,
                }}>
                    On select hot tubs, swim spas and accessories. Offer ends soon!
                </p>

                {/* Countdown */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 16,
                    marginBottom: 36,
                    flexWrap: "wrap",
                }}>
                    <TimeBox value={days} label="Days" />
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "2rem", fontWeight: 800, alignSelf: "flex-start", paddingTop: 12 }}>:</div>
                    <TimeBox value={hours} label="Hours" />
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "2rem", fontWeight: 800, alignSelf: "flex-start", paddingTop: 12 }}>:</div>
                    <TimeBox value={mins} label="Mins" />
                    <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "2rem", fontWeight: 800, alignSelf: "flex-start", paddingTop: 12 }}>:</div>
                    <TimeBox value={secs} label="Secs" />
                </div>

                {/* CTA */}
                {navigate && (
                    <button
                        onClick={() => navigate("category")}
                        style={{
                            padding: "15px 44px",
                            background: "#fff",
                            color: COLORS.primary,
                            border: "none",
                            borderRadius: 8,
                            fontWeight: 800,
                            fontSize: "1.05rem",
                            cursor: "pointer",
                            letterSpacing: "0.02em",
                            transition: "all 0.2s",
                        }}
                        onMouseOver={e => e.currentTarget.style.background = COLORS.accent}
                        onMouseOut={e => e.currentTarget.style.background = "#fff"}
                    >
                        🛍 Shop the Sale Now
                    </button>
                )}
            </div>
        </section>
    );
}

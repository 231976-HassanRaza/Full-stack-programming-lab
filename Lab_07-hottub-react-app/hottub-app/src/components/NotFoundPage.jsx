// ============================================
//  NotFoundPage (404) Component
//  Required by Lab 7 task instructions
// ============================================

import { COLORS, RADIUS } from "../styles/theme";

export default function NotFoundPage({ navigate }) {
    return (
        <div style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: COLORS.lightBg,
            padding: "40px 20px",
            textAlign: "center",
        }}>
            <div style={{ maxWidth: 560 }}>

                {/* Big 404 */}
                <div style={{
                    fontSize: "8rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    fontFamily: "Georgia, serif",
                    background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.accent})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginBottom: 8,
                }}>
                    404
                </div>

                {/* Icon */}
                <div style={{ fontSize: "3.5rem", marginBottom: 20 }}>🛁</div>

                <h2 style={{
                    fontSize: "1.8rem",
                    color: COLORS.primary,
                    fontFamily: "Georgia, serif",
                    marginBottom: 14,
                }}>
                    Oops! Page Not Found
                </h2>

                <p style={{
                    color: COLORS.gray,
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    marginBottom: 36,
                }}>
                    The page you're looking for seems to have taken a dip and isn't coming back.
                    Let's get you back to the good stuff.
                </p>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                    {navigate && (
                        <>
                            <button
                                onClick={() => navigate("home")}
                                style={{
                                    padding: "13px 30px",
                                    background: COLORS.primary,
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: RADIUS.md,
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                onMouseOver={e => e.currentTarget.style.background = COLORS.secondary}
                                onMouseOut={e => e.currentTarget.style.background = COLORS.primary}
                            >
                                🏠 Go Home
                            </button>
                            <button
                                onClick={() => navigate("category")}
                                style={{
                                    padding: "13px 30px",
                                    background: COLORS.accent,
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: RADIUS.md,
                                    fontWeight: 700,
                                    fontSize: "0.95rem",
                                    cursor: "pointer",
                                    transition: "all 0.2s",
                                }}
                                onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
                                onMouseOut={e => e.currentTarget.style.opacity = "1"}
                            >
                                🛍 Browse Products
                            </button>
                        </>
                    )}
                </div>

                {/* Helpful links */}
                <div style={{ marginTop: 40, paddingTop: 28, borderTop: "1px solid #ddd" }}>
                    <p style={{ color: COLORS.gray, fontSize: "0.88rem", marginBottom: 14 }}>
                        Or visit one of these popular pages:
                    </p>
                    <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                        {[
                            { label: "Shop", page: "category" },
                            { label: "Hot Tubs", page: "hot-tubs" },
                            { label: "About", page: "about" },
                            { label: "Contact", page: "contact" },
                        ].map(link => (
                            <button
                                key={link.label}
                                onClick={() => navigate && navigate(link.page)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: COLORS.secondary,
                                    fontWeight: 600,
                                    fontSize: "0.9rem",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    padding: 0,
                                }}
                            >
                                {link.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

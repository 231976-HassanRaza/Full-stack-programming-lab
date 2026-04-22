import { COLORS, RADIUS } from "../styles/theme";

export default function NotFoundPage({ navigate }) {
    return (
        <div style={{
            minHeight: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: COLORS.lightBg,
            padding: "60px 20px",
            textAlign: "center",
        }}>
            <div style={{ maxWidth: 560 }}>

                {/* Big faded 404 */}
                <div style={{
                    fontSize: "7rem",
                    fontWeight: 900,
                    lineHeight: 1,
                    fontFamily: "Georgia, serif",
                    color: COLORS.primary,
                    opacity: 0.15,
                    marginBottom: -20,
                    userSelect: "none",
                }}>
                    404
                </div>

                {/* Icon */}
                <div style={{ fontSize: "4rem", marginBottom: 16 }}>🛁</div>

                <h1 style={{
                    fontSize: "2rem",
                    color: COLORS.primary,
                    fontFamily: "Georgia, serif",
                    margin: "0 0 14px",
                }}>
                    Page Not Found
                </h1>

                <p style={{
                    color: COLORS.gray,
                    fontSize: "1rem",
                    lineHeight: 1.7,
                    marginBottom: 36,
                }}>
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back to relaxation.
                </p>

                {/* Main CTA */}
                <button
                    onClick={() => navigate("home")}
                    style={{
                        padding: "13px 36px",
                        background: COLORS.primary,
                        color: "#fff",
                        border: "none",
                        borderRadius: RADIUS.md,
                        fontWeight: 700,
                        fontSize: "1rem",
                        cursor: "pointer",
                        marginBottom: 32,
                        transition: "background 0.2s",
                    }}
                    onMouseOver={e => e.currentTarget.style.background = COLORS.secondary}
                    onMouseOut={e => e.currentTarget.style.background = COLORS.primary}
                >
                    🏠 Go Back Home
                </button>

                {/* Quick nav links */}
                <div style={{
                    borderTop: `1px solid ${COLORS.border}`,
                    paddingTop: 24,
                }}>
                    <p style={{ color: COLORS.gray, fontSize: "0.88rem", marginBottom: 14 }}>
                        Or visit one of these pages:
                    </p>
                    <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
                        {[
                            { label: "Shop", page: "category" },
                            { label: "About", page: "about" },
                            { label: "Contact", page: "contact" },
                            { label: "Login", page: "login" },
                        ].map(link => (
                            <button
                                key={link.label}
                                onClick={() => navigate(link.page)}
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
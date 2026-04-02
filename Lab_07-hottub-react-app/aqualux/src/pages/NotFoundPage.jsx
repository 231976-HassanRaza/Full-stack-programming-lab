export default function NotFoundPage({ navigate }) {
    return (
        <div style={{ textAlign: "center", padding: "100px 20px" }}>
            <h1 style={{ fontSize: "4rem", marginBottom: "10px" }}>404</h1>
            <h2>Page Not Found</h2>
            <p style={{ marginBottom: "20px" }}>The page you are looking for doesn't exist or has been moved.</p>
            <button
                onClick={() => navigate("home")}
                style={{
                    padding: "10px 20px",
                    backgroundColor: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Go Back Home
            </button>
        </div>
    );
}
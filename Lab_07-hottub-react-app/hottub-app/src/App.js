import { useState } from "react";

// ── Global Layout Components ──────────────────────────────
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";

// ── Shared UI elements ────────────────────────────────────
import { PageHeader, SectionTitle } from "./components/Ui";

// ── NEW Components (Lab 7 additions) ─────────────────────
import TestimonialsSection from "./components/TestimonialsSection";
import PromoBanner from "./components/PromoBanner";
import WhyChooseUs from "./components/WhyChooseUs";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {

      case "home":
        return (
          <>
            <PageHeader title="Welcome to AquaLux" breadcrumb={["Home"]} />
            <div style={{ marginTop: 50 }}>
              <SectionTitle title="Featured Products" sub="Explore our top-tier selection." />
            </div>
            {/* ★ NEW: Why Choose Us */}
            <WhyChooseUs />
            {/* ★ NEW: Promo Banner with countdown */}
            <PromoBanner navigate={handleNavigate} />
            {/* ★ NEW: Testimonials */}
            <TestimonialsSection />
          </>
        );

      case "about":
        return (
          <>
            <PageHeader title="About AquaLux" breadcrumb={["Home", "About"]} />
            <div style={{ maxWidth: 900, margin: "50px auto", padding: "0 20px", lineHeight: 1.8, color: "#333" }}>
              <h2 style={{ fontSize: "1.8rem", marginBottom: 16 }}>Premium Hot Tubs Since 2005</h2>
              <p>
                AquaLux was founded with a simple mission: bring world-class relaxation to every backyard.
                With over 18 years of experience, we have delivered more than 12,000 hot tubs and swim spas
                across North America.
              </p>
            </div>
            <WhyChooseUs />
          </>
        );

      case "contact":
        return (
          <>
            <PageHeader title="Contact Us" breadcrumb={["Home", "Contact"]} />
            <div style={{ maxWidth: 700, margin: "50px auto", padding: "0 20px" }}>
              <h3 style={{ marginBottom: 20 }}>Get in Touch</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Your Name", "Email Address", "Phone Number"].map(ph => (
                  <input key={ph} placeholder={ph} style={{
                    padding: "12px 16px", borderRadius: 8,
                    border: "2px solid #dee2e6", fontSize: "0.95rem", outline: "none",
                  }} />
                ))}
                <textarea rows={5} placeholder="Your message..." style={{
                  padding: "12px 16px", borderRadius: 8,
                  border: "2px solid #dee2e6", fontSize: "0.95rem",
                  outline: "none", resize: "vertical", fontFamily: "inherit",
                }} />
                <button style={{
                  padding: "13px 0", background: "#0B2545", color: "#fff",
                  border: "none", borderRadius: 8, fontWeight: 700,
                  fontSize: "1rem", cursor: "pointer",
                }}>Send Message ✉️</button>
              </div>
            </div>
          </>
        );

      // ★ NEW: 404 Not Found page
      default:
        return <NotFoundPage navigate={handleNavigate} />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <Navbar page={currentPage} navigate={handleNavigate} />
      <main style={{ flex: 1, paddingBottom: "40px" }}>
        {renderPage()}
      </main>
      <Footer navigate={handleNavigate} />
    </div>
  );
}

export default App;
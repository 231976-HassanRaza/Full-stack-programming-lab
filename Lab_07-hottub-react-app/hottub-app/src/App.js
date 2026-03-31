import { useState } from "react";

// Import your components
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ScrollToTop from "./components/ScrollToTop";

// You can import shared UI elements as needed for your pages
import { PageHeader, SectionTitle } from "./components/Ui";

function App() {
  // State to track which page the user is currently on
  const [currentPage, setCurrentPage] = useState("home");

  // The navigation function expected by your Navbar and Footer
  const handleNavigate = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* 1. Global Components */}
      <ScrollToTop />
      
      {/* 2. Top Navigation */}
      <Navbar page={currentPage} navigate={handleNavigate} />

      {/* 3. Main Page Content */}
      <main style={{ flex: 1, paddingBottom: "40px" }}>
        
        {/* Example of using your UI components based on the current page */}
        {currentPage === "home" && (
          <>
            <PageHeader title="Welcome to AquaLux" breadcrumb={["Home"]} />
            <div style={{ marginTop: "40px" }}>
              <SectionTitle title="Featured Products" sub="Explore our top-tier selection." />
            </div>
            {/* Add more content for your home page here */}
          </>
        )}

        {currentPage !== "home" && (
          <PageHeader title={currentPage.toUpperCase()} breadcrumb={["Home", currentPage]} />
        )}
        
      </main>

      {/* 4. Bottom Footer */}
      <Footer navigate={handleNavigate} />
    </div>
  );
}

export default App;
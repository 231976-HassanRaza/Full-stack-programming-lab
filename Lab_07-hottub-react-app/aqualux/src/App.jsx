import { useState, useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Tayyab Pages
import HomePage from "./pages/shop/HomePage";
import CategoryPage from "./pages/shop/CategoryPage";
import ProductPage from "./pages/shop/ProductPage";

// ── Hassan Pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import AccountPage from "./pages/account/AccountPage";
import TermsPage from "./pages/account/TermsPage";

// Musab Pages
import CartPage from "./pages/cart/CartPage";
import CheckoutPage from "./pages/cart/CheckoutPage";
import OrderSummaryPage from "./pages/cart/OrderSummaryPage";
import AboutPage from "./pages/cart/AboutPage";
import ContactPage from "./pages/cart/ContactPage";

import NotFoundPage from "./pages/NotFoundPage";

const NO_FOOTER_PAGES = ["login", "register", "forgot-password", "not-found"];

export default function App() {
  const [page, setPage] = useState("home");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Scroll to top on every page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const navigate = (p, data = null) => {
    if (p === "product" && data) setSelectedProduct(data);
    setPage(p);
  };

  const renderPage = () => {
    switch (page) {
      case "home": return <HomePage navigate={navigate} />;
      case "category": return <CategoryPage navigate={navigate} />;
      case "product": return <ProductPage product={selectedProduct} navigate={navigate} />;
      case "cart": return <CartPage navigate={navigate} />;
      case "checkout": return <CheckoutPage navigate={navigate} />;
      case "order-summary": return <OrderSummaryPage navigate={navigate} />;
      case "login": return <LoginPage navigate={navigate} />;
      case "register": return <RegisterPage navigate={navigate} />;
      case "forgot-password": return <ForgotPasswordPage navigate={navigate} />;
      case "account": return <AccountPage navigate={navigate} />;
      case "terms": return <TermsPage navigate={navigate} />;
      case "about": return <AboutPage navigate={navigate} />;
      case "contact": return <ContactPage navigate={navigate} />;

      default:

        if (page !== "not-found") setPage("not-found");
        return <NotFoundPage navigate={navigate} />;
    }
  };

  return (
    <ToastProvider>
      <CartProvider>
        <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh" }}>
          <Navbar page={page} navigate={navigate} />
          <main>{renderPage()}</main>
          {!NO_FOOTER_PAGES.includes(page) && <Footer navigate={navigate} />}
          <ScrollToTop />
        </div>
      </CartProvider>
    </ToastProvider>
  );
}
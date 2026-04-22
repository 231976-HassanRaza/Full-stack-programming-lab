import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-orange-50 py-16 px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
          Welcome to <span className="text-orange-500">NextShop</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-xl mx-auto mb-8">
          A modern multi-page Next.js application built as part of Lab 08 — Full Stack Programming.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/products"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full transition-colors shadow"
          >
            Browse Products
          </Link>
          <Link
            href="/about"
            className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold px-6 py-3 rounded-full transition-colors"
          >
            About Us
          </Link>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-y border-orange-100 py-8 px-6">
        <div className="container mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          {[
            { icon: "🏪", label: "Products", value: "5+" },
            { icon: "⚡", label: "Fast Delivery", value: "24h" },
            { icon: "🌟", label: "Rating", value: "4.9★" },
            { icon: "🛡️", label: "Secure", value: "100%" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-3xl">{stat.icon}</span>
              <span className="text-2xl font-bold text-blue-700 mt-1">{stat.value}</span>
              <span className="text-gray-500 text-sm">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <div className="container mx-auto px-6 py-4">
        <ProductList />
      </div>

      <Footer />
    </div>
  );
}

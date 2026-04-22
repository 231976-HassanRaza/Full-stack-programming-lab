import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductList from "@/components/ProductList";

export default function ProductsPage() {
  return (
    <div>
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-blue-700 mb-3">Our Products</h1>
          <p className="text-gray-500 text-lg max-w-md mx-auto">
            Browse our curated collection of top-quality tech products.
          </p>
        </div>

        {/* Filter Tags (UI only) */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {["All", "Electronics", "Wearables", "Accessories"].map((cat) => (
            <span
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                cat === "All"
                  ? "bg-blue-600 text-white"
                  : "bg-orange-100 text-orange-600 hover:bg-orange-200"
              }`}
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Product Grid via Component */}
        <ProductList />
      </main>

      <Footer />
    </div>
  );
}

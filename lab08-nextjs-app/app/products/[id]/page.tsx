import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { products } from "@/components/ProductList";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export default async function ProductDetail({ params }: Props) {
  const { id } = await params;
  const product = products.find((p) => p.id === Number(id));

  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div>
      <Header />

      <main className="container mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-400 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-blue-700 font-medium">{product.title}</span>
        </nav>

        {/* Product Detail Card */}
        <div className="bg-white border border-orange-100 rounded-2xl shadow-sm p-8 mb-10 max-w-2xl mx-auto">
          {/* Icon */}
          <div className="text-7xl text-center mb-6">{product.image}</div>

          {/* Badge */}
          <div className="text-center mb-4">
            <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* Title & Description */}
          <h1 className="text-3xl font-extrabold text-blue-800 text-center mb-3">
            {product.title}
          </h1>
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            {product.description}
          </p>

          {/* Price */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50 rounded-xl p-4">
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="text-3xl font-bold text-blue-600">
                Rs. {product.price.toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-full transition-colors shadow">
                🛒 Add to Cart
              </button>
              <button className="border-2 border-orange-400 text-orange-500 hover:bg-orange-50 font-semibold px-5 py-2 rounded-full transition-colors">
                ♡ Wishlist
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6">
            <h2 className="text-lg font-bold text-blue-700 mb-3">✨ Features</h2>
            <ul className="space-y-2">
              {["Premium quality build", "1-year manufacturer warranty", "Free shipping on orders over Rs. 2000", "Easy 30-day returns"].map((f) => (
                <li key={f} className="flex items-center gap-2 text-gray-600 text-sm">
                  <span className="text-green-500">✓</span> {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-xl font-bold text-blue-700 mb-4">🔗 Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="bg-white border border-orange-100 rounded-xl p-4 hover:shadow-md transition-shadow flex items-center gap-3"
              >
                <span className="text-3xl">{p.image}</span>
                <div>
                  <p className="font-semibold text-blue-800 text-sm">{p.title}</p>
                  <p className="text-orange-500 text-sm font-bold">Rs. {p.price.toLocaleString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 font-medium underline"
          >
            ← Back to All Products
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

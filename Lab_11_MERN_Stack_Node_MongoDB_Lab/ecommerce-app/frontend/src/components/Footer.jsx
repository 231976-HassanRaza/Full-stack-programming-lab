export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white font-bold text-lg mb-3">🛒 ShopKaro</h3>
          <p className="text-sm text-gray-400">
            Your one-stop online store for electronics, clothing, books, and more.
            Built with Next.js + Node.js + MongoDB.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
            <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
            <li><a href="/cart" className="hover:text-white transition-colors">Cart</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-3">Tech Stack</h3>
          <ul className="space-y-1 text-sm text-gray-400">
            <li>⚡ Next.js 15 (Frontend)</li>
            <li>🎨 Tailwind CSS</li>
            <li>🟢 Node.js + Express.js</li>
            <li>🍃 MongoDB + Mongoose</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} ShopKaro — Lab 11 MERN Stack Project
      </div>
    </footer>
  );
}

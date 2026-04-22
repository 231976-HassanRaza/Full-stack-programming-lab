import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-blue-700 text-white mt-auto">
      <div className="container mx-auto px-6 py-6">
        {/* Top section */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-orange-300">🚀 NextShop</h2>
            <p className="text-blue-200 text-sm mt-1">Your one-stop Next.js showcase</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <Link href="/" className="hover:text-orange-300 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-orange-300 transition-colors">About</Link>
            <Link href="/contact" className="hover:text-orange-300 transition-colors">Contact</Link>
            <Link href="/products" className="hover:text-orange-300 transition-colors">Products</Link>
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-blue-500 pt-4 text-center">
          <p className="text-blue-200 text-sm">© 2026 My Next.js App</p>
          <p className="text-blue-300 text-xs mt-1">All rights reserved — Built with Next.js & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

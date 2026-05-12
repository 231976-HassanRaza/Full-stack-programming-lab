import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark text-white pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand + Newsletter */}
          <div>
            <h4 className="text-xl font-bold mb-1">Aqua<span className="text-accent">Lux</span></h4>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Premium hot tubs and swim spas for discerning homeowners. Quality, luxury, and relaxation since 2005.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email..."
                className="flex-1 px-3 py-2 text-sm rounded-l-lg text-dark bg-white focus:outline-none"
              />
              <button className="bg-accent px-4 py-2 text-sm font-semibold rounded-r-lg hover:bg-orange-400 transition">
                Subscribe
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="/" className="hover:text-accent transition">Home</Link></li>
              <li><Link href="/shop" className="hover:text-accent transition">Shop</Link></li>
              <li><Link href="/about" className="hover:text-accent transition">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Account</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="/login" className="hover:text-accent transition">Login</Link></li>
              <li><Link href="/register" className="hover:text-accent transition">Register</Link></li>
              <li><Link href="/account" className="hover:text-accent transition">My Account</Link></li>
              <li><Link href="/cart" className="hover:text-accent transition">Cart</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-lg">Support</h4>
            <ul className="space-y-2 text-white/60 text-sm">
              <li><Link href="/terms" className="hover:text-accent transition">Terms &amp; Conditions</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition">Help Center</Link></li>
              <li><Link href="#" className="hover:text-accent transition">Shipping Policy</Link></li>
              <li><Link href="#" className="hover:text-accent transition">Returns</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-white/40 text-sm gap-2">
          <span>© 2025 AquaLux. All rights reserved.</span>
          <span>Designed with ❤️ — FullStackProgramming Assignment 02</span>
        </div>
      </div>
    </footer>
  );
}

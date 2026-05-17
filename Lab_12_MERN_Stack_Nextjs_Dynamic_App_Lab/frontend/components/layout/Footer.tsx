import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Share2, Link2, MessageSquareShare } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="text-2xl font-bold text-white">Rustik</span>
            <span className="text-orange-500 text-sm font-medium tracking-[0.3em] ml-1 uppercase">Plank</span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            Handcrafted reclaimed wood furniture made with love and sustainability in mind. Each piece tells a unique story.
          </p>
          <div className="flex gap-3">
            {[Globe, Share2, Link2, MessageSquareShare].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-gray-700 hover:bg-orange-500 rounded flex items-center justify-center transition">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* My Account */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 border-b border-gray-700 pb-2">My Account</h3>
          <ul className="space-y-2 text-sm">
            {["My Account", "Orders History", "Addresses", "Wishlist", "Newsletter"].map((item) => (
              <li key={item}><Link href="/auth/login" className="hover:text-orange-400 transition">{item}</Link></li>
            ))}
          </ul>
        </div>

        {/* Information */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 border-b border-gray-700 pb-2">Information</h3>
          <ul className="space-y-2 text-sm">
            {[
              { label: "About Us", href: "/about" },
              { label: "Contact Us", href: "/contact" },
              { label: "Blog", href: "/blog" },
              { label: "Return Policy", href: "/about" },
              { label: "Delivery", href: "/about" },
            ].map((item) => (
              <li key={item.label}><Link href={item.href} className="hover:text-orange-400 transition">{item.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-sm uppercase tracking-wide mb-4 border-b border-gray-700 pb-2">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2"><MapPin size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />123 Wood Street, Islamabad, Pakistan</li>
            <li className="flex items-center gap-2"><Phone size={14} className="text-orange-500" />+92-300-1234567</li>
            <li className="flex items-center gap-2"><Mail size={14} className="text-orange-500" />info@rustikplank.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2024 Rustik Plank Furniture. All Rights Reserved.</span>
          <div className="flex gap-4">
            <Link href="/about" className="hover:text-orange-400">Privacy Policy</Link>
            <Link href="/about" className="hover:text-orange-400">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

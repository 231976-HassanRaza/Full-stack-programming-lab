"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/products", label: "Products" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Logo / Brand */}
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-orange-300 transition-colors">
          🚀 NextShop
        </Link>

        {/* Navigation Links */}
        <nav className="flex gap-2 flex-wrap justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                pathname === link.href
                  ? "bg-orange-400 text-white shadow"
                  : "hover:bg-blue-500 hover:text-orange-200"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

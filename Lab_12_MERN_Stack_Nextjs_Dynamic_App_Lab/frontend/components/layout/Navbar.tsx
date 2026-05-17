"use client";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, User, Search, Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const categories = ["Chairs", "Beds", "Bookcases", "Cabinets", "Tables", "Boxes"];

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-gray-800 text-gray-300 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone size={11} /> +92-300-1234567</span>
            <span className="flex items-center gap-1"><Mail size={11} /> info@rustikplank.com</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Link href="/orders" className="hover:text-orange-400">My Orders</Link>
                {user.role === "admin" && <Link href="/admin" className="hover:text-orange-400">Admin</Link>}
                <button onClick={logout} className="hover:text-orange-400">Logout</button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="hover:text-orange-400">Login</Link>
                <Link href="/auth/register" className="hover:text-orange-400">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="flex flex-col leading-tight">
              <span className="text-2xl font-bold text-gray-900 tracking-wide">Rustik</span>
              <span className="text-sm text-orange-500 font-medium tracking-[0.3em] uppercase">Plank</span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-xl hidden md:flex">
            <div className="relative w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full border border-gray-300 rounded-l px-4 py-2 text-sm focus:outline-none focus:border-orange-400"
              />
              <Link href={`/products?search=${search}`}>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-r text-sm transition">
                  <Search size={16} />
                </button>
              </Link>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {user && (
              <Link href="/profile" className="hidden md:flex items-center gap-1 text-gray-600 hover:text-orange-500 text-sm">
                <User size={20} />
                <span className="hidden lg:block">{user.name.split(" ")[0]}</span>
              </Link>
            )}
            <Link href="/cart" className="relative text-gray-600 hover:text-orange-500">
              <ShoppingCart size={24} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </Link>
            <button className="md:hidden text-gray-600" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav */}
      <nav className="bg-gray-900 text-white hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-0">
          <div className="group relative">
            <button className="flex items-center gap-1 px-5 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition">
              <Menu size={16} /> All Categories <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 bg-white shadow-xl z-50 w-48 hidden group-hover:block border border-gray-100">
              {categories.map((cat) => (
                <Link key={cat} href={`/products?category=${cat.toLowerCase()}`}
                  className="block px-4 py-2.5 text-gray-700 hover:bg-orange-50 hover:text-orange-600 text-sm border-b border-gray-50">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/" className="px-5 py-3 text-sm hover:text-orange-400 transition">Home</Link>
          <Link href="/products" className="px-5 py-3 text-sm hover:text-orange-400 transition">Shop</Link>
          <Link href="/blog" className="px-5 py-3 text-sm hover:text-orange-400 transition">Blog</Link>
          <Link href="/about" className="px-5 py-3 text-sm hover:text-orange-400 transition">About Us</Link>
          <Link href="/contact" className="px-5 py-3 text-sm hover:text-orange-400 transition">Contact</Link>
          <div className="ml-auto">
            <Link href="/products?isNew=true" className="px-5 py-3 text-sm text-orange-400 hover:text-orange-300 transition">New Products</Link>
            <Link href="/products?isSpecial=true" className="px-5 py-3 text-sm hover:text-orange-400 transition">Specials</Link>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="px-4 py-3 border-b">
            <div className="flex">
              <input type="text" placeholder="Search..." className="flex-1 border px-3 py-2 text-sm rounded-l focus:outline-none" />
              <button className="bg-orange-500 text-white px-3 py-2 rounded-r"><Search size={16} /></button>
            </div>
          </div>
          <div className="divide-y">
            {["Home", "Shop", "Blog", "About Us", "Contact"].map((item) => (
              <Link key={item} href={item === "Shop" ? "/products" : item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                className="block px-4 py-3 text-gray-700 hover:text-orange-500 text-sm"
                onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            ))}
            <div className="px-4 py-3 text-xs text-gray-500 font-semibold uppercase tracking-wide">Categories</div>
            {categories.map((cat) => (
              <Link key={cat} href={`/products?category=${cat.toLowerCase()}`}
                className="block px-4 py-2.5 text-gray-600 hover:text-orange-500 text-sm pl-6"
                onClick={() => setMenuOpen(false)}>
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

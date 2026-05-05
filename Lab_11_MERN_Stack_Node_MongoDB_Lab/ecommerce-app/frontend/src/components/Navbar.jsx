'use client';

import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-indigo-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold tracking-tight hover:text-indigo-200 transition-colors">
            🛒 ShopKaro
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="hover:text-indigo-200 font-medium transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-indigo-200 font-medium transition-colors">
              Products
            </Link>
            <Link href="/cart" className="relative hover:text-indigo-200 font-medium transition-colors flex items-center gap-1">
              <span>🛍️</span>
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Nav */}
        {menuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            <Link href="/" onClick={() => setMenuOpen(false)} className="hover:text-indigo-200 font-medium">Home</Link>
            <Link href="/products" onClick={() => setMenuOpen(false)} className="hover:text-indigo-200 font-medium">Products</Link>
            <Link href="/cart" onClick={() => setMenuOpen(false)} className="hover:text-indigo-200 font-medium">
              Cart {totalItems > 0 && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2">{totalItems}</span>}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

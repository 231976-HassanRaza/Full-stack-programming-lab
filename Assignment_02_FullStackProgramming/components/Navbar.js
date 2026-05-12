'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Shop' },
  { href: '/product', label: 'Hot Tubs' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-primary text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="text-2xl font-bold tracking-wide">
          Aqua<span className="text-accent">Lux</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-6 list-none">
          {navLinks.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`text-sm transition-colors hover:text-accent ${
                  pathname === l.href ? 'text-accent font-semibold' : 'text-white/85'
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div className="hidden md:flex gap-5 items-center text-xl">
          <Link href="/account" className="hover:text-accent transition"><i className="bi bi-person" /></Link>
          <Link href="/cart" className="relative hover:text-accent transition">
            <i className="bi bi-bag" />
            <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">3</span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 bg-white transition-all" />
          <span className="block w-6 h-0.5 bg-white transition-all" />
          <span className="block w-6 h-0.5 bg-white transition-all" />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-primary border-t border-white/10 px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-white/85 hover:text-accent"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <div className="flex gap-4 mt-3 text-xl">
            <Link href="/account" className="hover:text-accent"><i className="bi bi-person" /></Link>
            <Link href="/cart" className="relative hover:text-accent">
              <i className="bi bi-bag" />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">3</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

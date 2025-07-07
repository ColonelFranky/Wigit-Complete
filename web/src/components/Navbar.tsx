"use client";
import { useState, useEffect } from "react";
import { Search, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";
import { useCartSidebarStore } from "../lib/cart-sidebar-store";
import { useCartStore } from "../lib/cart-store";

const dancingScript = Dancing_Script({
  weight: "700",
  subsets: ["latin"],
});

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const cartCount = useCartStore((state) => state.getTotalItems());
  const { open } = useCartSidebarStore();

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-16 justify-between">
        {/* Logo - far left */}
        <div className="flex items-center flex-shrink-0">
          <Link href="/" className={`text-green-700 text-2xl font-bold ${dancingScript.className}`}>WigitsCo</Link>
        </div>
        {/* Centered nav links */}
        <div className="hidden md:flex gap-8 items-center">
          <Link href="/shop" className="text-gray-700 hover:text-green-700 font-medium transition">Shop</Link>
          <Link href="/builder" className="text-gray-700 hover:text-green-700 font-medium transition">Custom Builder</Link>
          <Link href="/about" className="text-gray-700 hover:text-green-700 font-medium transition">About</Link>
          <Link href="/faq" className="text-gray-700 hover:text-green-700 font-medium transition">FAQ</Link>
          <Link href="/contact" className="text-gray-700 hover:text-green-700 font-medium transition">Contact</Link>
        </div>
        {/* Right Icons */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <button className="text-gray-700 hover:text-green-700 p-2"><Search size={22} /></button>
          <Link href="/account" className="text-gray-700 hover:text-green-700 p-2" aria-label="Account">
            <User size={22} />
          </Link>
          <button onClick={open} className="relative text-gray-700 hover:text-green-700 p-2">
            <ShoppingCart size={22} />
            {isHydrated && cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 border border-white">{cartCount}</span>
            )}
          </button>
          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
              aria-label="Open main menu"
              onClick={() => setMenuOpen((open) => !open)}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 bg-white border-t border-gray-200">
          <Link href="/shop" className="block py-2 text-gray-700 hover:text-green-700 font-medium transition">Shop</Link>
          <Link href="/builder" className="block py-2 text-gray-700 hover:text-green-700 font-medium transition">Custom Builder</Link>
          <Link href="/about" className="block py-2 text-gray-700 hover:text-green-700 font-medium transition">About</Link>
          <Link href="/faq" className="block py-2 text-gray-700 hover:text-green-700 font-medium transition">FAQ</Link>
          <Link href="/contact" className="block py-2 text-gray-700 hover:text-green-700 font-medium transition">Contact</Link>
        </div>
      )}
    </nav>
  );
} 
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-gray-900 text-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo and Address */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <a href="/" className="flex items-center gap-2 font-bold text-xl text-blue-400">
            <svg width="32" height="32" fill="none" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#6366F1"/><text x="16" y="22" textAnchor="middle" fontSize="16" fill="white" fontFamily="sans-serif">W</text></svg>
            Wigit Store
          </a>
          <address className="not-italic text-sm text-gray-400 mt-2">
            123 Wigit Lane, Widgetown, Country<br />
            support@wigitstore.com
          </address>
        </div>
        {/* Quick Nav */}
        <div className="flex flex-col items-center">
          <nav className="flex flex-col md:flex-row gap-4 md:gap-8 items-center">
            <a href="/shop" className="hover:text-blue-400 transition">Shop</a>
            <a href="/builder" className="hover:text-blue-400 transition">Custom Builder</a>
            <a href="/about" className="hover:text-blue-400 transition">About Us</a>
            <a href="/contact" className="hover:text-blue-400 transition">Contact Us</a>
            <a href="/faq" className="hover:text-blue-400 transition">FAQs</a>
          </nav>
          <div className="flex flex-col sm:flex-row gap-4 mt-4 items-center text-xs">
            <a href="/terms" className="hover:text-blue-300 transition">Terms & Conditions</a>
            <a href="/refund" className="hover:text-blue-300 transition">Refund Policy</a>
            <a href="/privacy" className="hover:text-blue-300 transition">Privacy Policy</a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">&copy; {new Date().getFullYear()} Wigit Store. All rights reserved.</div>
    </footer>
  );
} 
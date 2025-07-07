"use client";
import Link from "next/link";

export default function BuilderLandingPage() {
  return (
    <main className="min-h-[80vh] flex flex-col md:flex-row items-center justify-center gap-12 bg-cream py-16 px-4">
      {/* Wigit Section */}
      <section className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full animate-slide-in-left">
        <img
          src="https://placehold.co/350x200?text=Wigit"
          alt="Wigit Preview"
          className="mb-6 rounded-lg shadow-lg border border-gray-200 bg-white"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-2 tracking-tight">Build Your Wigit</h2>
        <p className="text-gray-700 mb-6 text-center">Design a unique decorative Wigit for your space. Choose colors, shapes, and add your own flair!</p>
        <Link
          href="/builder/wigit"
          className="px-8 py-3 bg-primary text-white rounded font-bold text-lg shadow hover:bg-green-800 transition"
        >
          Build Your Wigit
        </Link>
      </section>
      {/* T-Shirt Section */}
      <section className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full animate-slide-in-right">
        <img
          src="https://placehold.co/350x200?text=T-Shirt"
          alt="T-Shirt Preview"
          className="mb-6 rounded-lg shadow-lg border border-gray-200 bg-white"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold text-dark mb-2 tracking-tight">Build Your T-Shirt</h2>
        <p className="text-gray-700 mb-6 text-center">Create a custom T-shirt with your favorite colors, text, and images. Express yourself in style!</p>
        <Link
          href="/builder/tshirt"
          className="px-8 py-3 bg-primary text-white rounded font-bold text-lg shadow hover:bg-green-800 transition"
        >
          Build Your T-Shirt
        </Link>
      </section>
      <style jsx global>{`
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(60px); }
          to { opacity: 1; transform: translateX(0); }
        }
        .animate-slide-in-left { animation: slide-in-left 0.8s cubic-bezier(.4,0,.2,1) both; }
        .animate-slide-in-right { animation: slide-in-right 0.8s cubic-bezier(.4,0,.2,1) both; }
      `}</style>
    </main>
  );
} 
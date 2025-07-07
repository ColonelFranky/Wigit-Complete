"use client";
import Image from "next/image";
import { useCartStore } from "../lib/cart-store";
import { PrismaClient } from '../../generated/prisma';

export default function Home() {
  const { addItem } = useCartStore();
  return (
    <div className="flex flex-col min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative w-full bg-cream py-16 px-4 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-0">
        {/* Left: Text Content */}
        <div className="max-w-xl w-full md:pl-12 flex flex-col items-start justify-center">
          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 text-dark leading-tight">
            Handcrafted <span className="text-primary">Wigits</span> for Every Space
          </h1>
          <div className="bg-white text-dark rounded px-3 py-3 mb-8 text-base sm:text-lg font-medium shadow-sm">
            Discover unique decorative pieces or create your own custom Wigit. Each piece is lovingly handmade with premium materials and artisan craftsmanship.
          </div>
          <div className="flex gap-4 mb-8">
            <a href="/shop" className="px-6 py-3 rounded bg-primary text-white font-semibold shadow hover:bg-green-800 transition text-base">Shop Collection</a>
            <a href="/builder" className="px-6 py-3 rounded border-2 border-primary text-primary font-semibold bg-white hover:bg-green-50 transition text-base">Build Custom Wigit</a>
          </div>
        </div>
        {/* Right: Image + Floating Card */}
        <div className="relative flex-1 flex items-center justify-center w-full max-w-xl min-h-[380px]">
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xl bg-white">
            <Image
              src="/hero-room.jpg"
              alt="Modern room with yellow chair"
              fill
              className="object-cover w-full h-full"
              priority
            />
          </div>
          {/* Floating Card */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 bg-white rounded-xl shadow-lg px-6 py-4 flex items-center gap-3 border border-gray-100 min-w-[270px]">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/30 text-yellow-600 text-2xl">
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M12 21C12 21 4 13.5 4 8.5C4 5.46243 6.46243 3 9.5 3C11.1566 3 12.7357 3.87972 13.5 5.15385C14.2643 3.87972 15.8434 3 17.5 3C20.5376 3 23 5.46243 23 8.5C23 13.5 15 21 15 21H12Z" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </span>
            <div>
              <div className="font-bold text-dark text-base">500+ Happy Customers</div>
              <div className="text-gray-500 text-sm">Handcrafted with love</div>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Wigits */}
      <section className="max-w-6xl mx-auto py-16 px-4" id="featured">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-dark text-center">Featured Wigits</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-dark">Premade Wigit #{i}</h3>
              <p className="text-gray-500 mb-4">A beautiful premade Wigit for your home or office.</p>
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-green-800 transition"
                onClick={() => addItem({
                  id: i,
                  name: `Premade Wigit #${i}`,
                  price: 29.99 + i,
                  type: "wigit",
                  image: "https://placehold.co/200x200?text=Wigit+" + i
                })}
              >Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
      {/* Featured T-Shirts */}
      <section className="max-w-6xl mx-auto py-16 px-4" id="featured-tshirts">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-dark text-center">Featured T-Shirts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[1,2,3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-300 rounded mb-4" />
              <h3 className="font-semibold text-lg mb-2 text-dark">T-Shirt Design #{i}</h3>
              <p className="text-gray-500 mb-4">A stylish T-Shirt, perfect for any occasion.</p>
              <button
                className="bg-primary text-white px-4 py-2 rounded hover:bg-green-800 transition"
                onClick={() => addItem({
                  id: 100 + i,
                  name: `T-Shirt Design #${i}`,
                  price: 19.99 + i,
                  type: "tshirt",
                  image: "https://placehold.co/200x200?text=TShirt+" + i
                })}
              >Add to Cart</button>
            </div>
          ))}
        </div>
      </section>
      {/* Custom Builder CTA */}
      <section className="bg-white py-12 px-4 text-center scroll-mt-32" id="builder">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dark">Create Your Own Wigit or T-Shirt</h2>
        <p className="mb-6 text-gray-600">Unleash your creativity with our interactive custom builder for both Wigits and T-Shirts.</p>
        <a href="#" className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-green-800 transition">Start Building</a>
      </section>
      {/* Testimonials */}
      <section className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-dark">What Our Customers Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-700 italic mb-2">“Absolutely love my custom Wigit! The process was fun and easy.”</p>
            <span className="font-semibold text-dark">– Alex P.</span>
          </div>
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-gray-700 italic mb-2">“The premade Wigits make perfect gifts. Highly recommend!”</p>
            <span className="font-semibold text-dark">– Jamie L.</span>
          </div>
        </div>
      </section>
      {/* About Wigits */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-12 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-dark">About Wigits</h2>
        <p className="max-w-2xl mx-auto text-gray-700">Wigits are unique, customizable creations designed to bring joy and creativity to any space. Whether you choose a premade design or build your own, each Wigit is crafted with care and imagination.</p>
      </section>
      {/* Social Media Feed Placeholder */}
      <section className="max-w-6xl mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-dark">Follow Us on Social Media</h2>
        <div className="flex justify-center gap-6">
          <a href="#" className="text-primary hover:underline">Instagram</a>
          <a href="#" className="text-primary hover:underline">Twitter</a>
          <a href="#" className="text-primary hover:underline">Facebook</a>
        </div>
        <div className="mt-8 bg-gray-200 rounded-lg h-40 flex items-center justify-center text-gray-500">[Social Media Feed Coming Soon]</div>
      </section>
    </div>
  );
}

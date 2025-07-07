"use client";

import { useCartStore } from "../../lib/cart-store";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [shipping, setShipping] = useState(10); // Placeholder shipping in USD
  const [address, setAddress] = useState("123 Main St, Springfield, USA"); // Placeholder address
  const total = getTotalPrice() + shipping;

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-dark">Your Cart</h1>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h1 className="text-3xl font-bold mb-4 text-dark">Your Cart</h1>
            <p className="text-gray-600 mb-8">Your cart is empty.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/shop" className="bg-primary text-white px-6 py-3 rounded font-semibold hover:bg-green-800 transition">
                Continue Shopping
              </Link>
              <Link href="/builder" className="bg-accent text-dark px-6 py-3 rounded font-semibold hover:bg-yellow-400 transition">
                Custom Builder
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row gap-8">
        {/* Left: Product Table */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-6 text-dark">Cart</h1>
          <div className="bg-white rounded-lg shadow p-4 overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left text-dark font-semibold">Product</th>
                  <th className="py-3 text-center text-dark font-semibold">Price</th>
                  <th className="py-3 text-center text-dark font-semibold">Quantity</th>
                  <th className="py-3 text-center text-dark font-semibold">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-b last:border-0">
                    <td className="py-4 flex items-center gap-4 min-w-[250px]">
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 mr-2"><Trash2 size={18} /></button>
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border bg-gray-100" />
                      <span className="font-medium text-dark">{item.name}</span>
                    </td>
                    <td className="py-4 text-center text-dark font-semibold">{item.price.toLocaleString("en-US", {style: "currency", currency: "USD"})}</td>
                    <td className="py-4 text-center">
                      <div className="inline-flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-1 text-lg text-dark hover:bg-gray-100"
                        >-</button>
                        <span className="px-4 text-dark font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-lg text-dark hover:bg-gray-100"
                        >+</button>
                      </div>
                    </td>
                    <td className="py-4 text-center text-dark font-semibold">{(item.price * item.quantity).toLocaleString("en-US", {style: "currency", currency: "USD"})}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Coupon and Update Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-between">
              <div className="flex gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Coupon code"
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                  className="border rounded px-4 py-2 w-48 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-green-800 transition">APPLY COUPON</button>
              </div>
              <button className="bg-primary/80 text-white px-6 py-2 rounded font-semibold hover:bg-primary transition">UPDATE CART</button>
            </div>
          </div>
        </div>
        {/* Right: Cart Totals */}
        <div className="w-full lg:w-[340px] flex-shrink-0">
          <div className="bg-white rounded-lg shadow p-6 sticky top-8">
            <h2 className="text-xl font-bold text-dark mb-4">Cart Totals</h2>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-700">Subtotal</span>
              <span className="font-semibold">{getTotalPrice().toLocaleString("en-US", {style: "currency", currency: "USD"})}</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-700">Shipping</span>
              <span className="font-semibold">Standard Shipping: <span className="text-primary">{shipping.toLocaleString("en-US", {style: "currency", currency: "USD"})}</span></span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="text-gray-700">Shipping to <span className="font-semibold">{address}</span></span>
              <button className="text-primary underline text-sm">Change address</button>
            </div>
            <div className="flex justify-between py-4 border-b-0">
              <span className="text-lg font-bold text-dark">Total</span>
              <span className="text-lg font-bold text-primary">{total.toLocaleString("en-US", {style: "currency", currency: "USD"})}</span>
            </div>
            <button className="w-full mt-6 bg-primary text-white py-3 rounded font-semibold text-lg hover:bg-green-800 transition">PROCEED TO CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
} 
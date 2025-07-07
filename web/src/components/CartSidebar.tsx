"use client";
import { useCartStore } from "../lib/cart-store";
import Link from "next/link";
import { X } from "lucide-react";
import { useCartSidebarStore } from "../lib/cart-sidebar-store";

export default function CartSidebar() {
  const { isOpen, close } = useCartSidebarStore();
  const { items, updateQuantity, removeItem, getTotalPrice } = useCartStore();
  const total = getTotalPrice();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-200 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={close}
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-full w-[350px] max-w-full bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Cart Sidebar"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
          <button onClick={close} className="text-gray-500 hover:text-gray-900"><X size={24} /></button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="text-gray-500 text-center mt-16">Your cart is empty.</div>
          ) : (
            <div className="space-y-6">
              {items.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  {item.image && item.image.trim() !== '' ? (
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded border bg-gray-100" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 flex items-center justify-center text-gray-500 rounded border">No Image</div>
                  )}
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900 text-sm">{item.name}</div>
                    <div className="text-gray-500 text-xs capitalize mb-1">{item.type}</div>
                    <div className="text-gray-700 font-bold text-sm">${item.price.toFixed(2)}</div>
                    <div className="flex items-center gap-1 mt-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-xs">-</button>
                      <span className="px-2 text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-0.5 bg-gray-200 rounded hover:bg-gray-300 text-xs">+</button>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:underline text-xs ml-2">Remove</button>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* Subtotal and Go to Cart */}
        <div className="border-t px-6 py-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-700 font-semibold">Subtotal</span>
            <span className="text-lg font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
          <Link href="/cart" onClick={close} className="block w-full text-center px-6 py-3 bg-green-700 text-white rounded font-semibold hover:bg-green-800 transition mb-2">Go to Cart</Link>
          <Link href="/checkout" onClick={close} className="block w-full text-center px-6 py-3 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition">Checkout</Link>
        </div>
      </aside>
    </>
  );
} 
"use client";
import { useCartStore } from "../../../lib/cart-store";

export default function TshirtBuilderPage() {
  const { addItem } = useCartStore();
  return (
    <main className="max-w-5xl mx-auto py-16 px-4 min-h-[80vh] flex flex-col md:flex-row gap-12 items-start bg-cream">
      {/* Preview Area */}
      <section className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl shadow-xl p-8 min-h-[350px]">
        <h2 className="text-2xl font-bold mb-4 text-dark">Live T-Shirt Preview</h2>
        <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xl">
          [T-Shirt Preview Here]
        </div>
      </section>
      {/* Customization Controls */}
      <aside className="w-full md:w-80 bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">
        <h3 className="text-xl font-bold text-dark mb-2">Customize Your T-Shirt</h3>
        {/* Placeholder controls */}
        <div className="flex flex-col gap-4">
          <label className="font-medium text-dark">Color</label>
          <input type="color" className="w-12 h-12 p-0 border-none rounded" />
          <label className="font-medium text-dark">Add Text</label>
          <input type="text" placeholder="Your text here" className="border rounded px-3 py-2" />
        </div>
        <button
          className="mt-8 px-6 py-3 bg-primary text-white rounded font-bold hover:bg-green-800 transition"
          onClick={() => addItem({
            id: 999,
            name: "Custom T-Shirt",
            price: 24.99,
            type: "tshirt",
            image: "https://placehold.co/200x200?text=Custom+TShirt"
          })}
        >Add to Cart</button>
      </aside>
    </main>
  );
} 
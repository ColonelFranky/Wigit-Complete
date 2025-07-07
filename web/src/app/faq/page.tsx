"use client";

export default function FAQPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 min-h-[60vh] bg-cream">
      <h1 className="text-3xl font-bold mb-8 text-dark text-center">Frequently Asked Questions</h1>
      <div className="bg-white rounded-lg shadow p-8 text-gray-700">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-dark">What is a Wigit?</h2>
            <p className="text-gray-600">A Wigit is a customizable decorative piece designed to bring creativity to your space.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark">How do I create a custom Wigit?</h2>
            <p className="text-gray-600">Use our Custom Builder to design your own Wigit step by step, then add it to your cart and checkout.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-dark">What payment methods do you accept?</h2>
            <p className="text-gray-600">We accept major credit cards, PayPal, and more.</p>
          </div>
        </div>
        <div className="mt-12 border-t pt-8">
          <h2 className="text-xl font-semibold text-dark mb-4 text-center">More Information</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/terms" className="text-primary hover:underline">Terms & Conditions</a>
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
            <a href="/refund" className="text-primary hover:underline">Refund Policy</a>
          </div>
        </div>
      </div>
    </main>
  );
} 
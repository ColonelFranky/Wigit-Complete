"use client";

export default function TermsPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 min-h-[60vh] bg-cream">
      <h1 className="text-3xl font-bold mb-8 text-dark text-center">Terms & Conditions</h1>
      <div className="bg-white rounded-lg shadow p-8 text-gray-700">
        <p className="mb-4">Please read our terms and conditions carefully before using our website or making a purchase. By accessing or using our services, you agree to be bound by these terms.</p>
        <p>If you have any questions, feel free to contact us at <a href="mailto:support@wigitsco.com" className="text-primary underline">support@wigitsco.com</a>.</p>
      </div>
    </main>
  );
} 
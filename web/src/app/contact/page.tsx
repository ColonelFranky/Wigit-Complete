"use client";

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto py-16 px-4 min-h-[60vh] bg-cream">
      <h1 className="text-3xl font-bold mb-8 text-dark text-center">Contact Us</h1>
      <div className="bg-white rounded-lg shadow p-8 text-gray-700">
        <p className="mb-4">Have a question, suggestion, or need support? We're here to help! Fill out the form below or email us at <a href="mailto:support@wigitsco.com" className="text-primary underline">support@wigitsco.com</a>.</p>
        <form className="flex flex-col gap-4 mt-6">
          <input type="text" placeholder="Your Name" className="border rounded px-4 py-2" />
          <input type="email" placeholder="Your Email" className="border rounded px-4 py-2" />
          <textarea placeholder="Your Message" className="border rounded px-4 py-2 min-h-[100px]" />
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded font-semibold hover:bg-green-800 transition">Send Message</button>
        </form>
      </div>
    </main>
  );
} 
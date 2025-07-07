"use client";
import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { User, LogOut, MapPin, ListChecks } from "lucide-react";

const SECTIONS = [
  { key: "dashboard", label: "Dashboard" },
  { key: "orders", label: "Orders" },
  { key: "addresses", label: "Addresses" },
  { key: "account", label: "Account Details" },
  { key: "logout", label: "Logout" },
];

const ICONS: Record<string, ReactNode> = {
  orders: <ListChecks size={40} className="mx-auto mb-2 text-gray-400" />,
  addresses: <MapPin size={40} className="mx-auto mb-2 text-gray-400" />,
  account: <User size={40} className="mx-auto mb-2 text-gray-400" />,
  logout: <LogOut size={40} className="mx-auto mb-2 text-gray-400" />,
};

const sectionContent: Record<string, ReactNode> = {
  dashboard: (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-dark">Dashboard</h2>
      <p className="text-gray-700">Welcome to your account dashboard. Use the cards below to view your orders, manage addresses, or update your account details.</p>
    </div>
  ),
  orders: (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-dark">Your Orders</h2>
      <p className="text-gray-700">View your past orders here. (Coming soon!)</p>
    </div>
  ),
  addresses: (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-dark">Your Addresses</h2>
      <p className="text-gray-700">Manage your shipping and billing addresses. (Coming soon!)</p>
    </div>
  ),
  account: (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-dark">Account Details</h2>
      <p className="text-gray-700">Update your account information and password. (Coming soon!)</p>
    </div>
  ),
  logout: (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-dark">Logout</h2>
      <p className="text-gray-700">You have been logged out. (Placeholder)</p>
    </div>
  ),
};

export default function AccountPage() {
  const [active, setActive] = useState("dashboard");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const username = "ColonelFranky"; // Placeholder
  const router = useRouter();

  useEffect(() => {
    const loggedIn = typeof window !== "undefined" && localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      router.replace("/account/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdmin");
    router.replace("/account/login");
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 px-4">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white rounded-lg shadow p-0 flex flex-col mb-4 md:mb-0 border border-gray-100">
          <div className="px-6 pt-6 pb-2 border-b border-gray-100">
            <h2 className="text-lg font-bold text-dark tracking-wide mb-2">MY ACCOUNT</h2>
          </div>
          <nav className="flex-1 flex flex-col divide-y divide-gray-100">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                onClick={() => {
                  if (section.key === "logout") handleLogout();
                  else setActive(section.key);
                }}
                className={`w-full text-left px-6 py-3 font-medium transition
                  ${active === section.key ? "bg-gray-100 text-dark rounded-none" : "text-gray-700 hover:bg-cream"}`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 bg-white rounded-lg shadow p-8 min-h-[300px]">
          {/* Greeting and dashboard intro */}
          {active === "dashboard" && (
            <>
              <div className="mb-6">
                <p className="mb-2 text-gray-700">
                  Hello <span className="font-bold text-dark">{username}</span> (not {username}? <button className="text-primary underline font-medium">Log out</button>)
                </p>
                <p className="text-gray-700">
                  From your account dashboard you can view your <span className="text-dark font-medium">recent orders</span>, manage your <span className="text-dark font-medium">shipping and billing addresses</span>, and edit your password and account details.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                <button onClick={() => setActive("orders")}
                  className="bg-cream border border-gray-100 rounded-lg p-6 flex flex-col items-center hover:shadow transition">
                  {ICONS.orders}
                  <span className="font-medium text-dark">Orders</span>
                </button>
                <button onClick={() => setActive("addresses")}
                  className="bg-cream border border-gray-100 rounded-lg p-6 flex flex-col items-center hover:shadow transition">
                  {ICONS.addresses}
                  <span className="font-medium text-dark">Addresses</span>
                </button>
                <button onClick={() => setActive("account")}
                  className="bg-cream border border-gray-100 rounded-lg p-6 flex flex-col items-center hover:shadow transition">
                  {ICONS.account}
                  <span className="font-medium text-dark">Account details</span>
                </button>
                <button onClick={handleLogout}
                  className="bg-cream border border-gray-100 rounded-lg p-6 flex flex-col items-center hover:shadow transition">
                  {ICONS.logout}
                  <span className="font-medium text-dark">Logout</span>
                </button>
              </div>
            </>
          )}
          {active !== "dashboard" && sectionContent[active]}
        </main>
      </div>
    </div>
  );
} 
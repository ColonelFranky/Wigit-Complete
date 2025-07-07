"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountLoginPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "login") {
      // Admin login
      if (email === "admin@example.com" && password === "admin123") {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdmin", "true");
        router.replace("/account");
        return;
      }
      setError("Invalid email or password.");
    } else {
      // Register (for demo, just accept any email/password)
      if (!email || !password || password !== confirm) {
        setError("Please fill all fields and make sure passwords match.");
        return;
      }
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", "false");
      router.replace("/account");
    }
  }

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-dark mb-6 text-center">
          {mode === "login" ? "Sign In to Your Account" : "Create an Account"}
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
          {mode === "register" && (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          )}
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-primary text-white py-2 rounded font-semibold hover:bg-green-800 transition mt-2"
          >
            {mode === "login" ? "Sign In" : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-700">
          {mode === "login" ? (
            <>
              Don't have an account?{' '}
              <button className="text-primary underline font-medium" onClick={() => setMode("register")}>Register</button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="text-primary underline font-medium" onClick={() => setMode("login")}>Sign In</button>
            </>
          )}
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          <div>Test admin login: <b>admin@example.com</b> / <b>admin123</b></div>
        </div>
      </div>
    </div>
  );
} 
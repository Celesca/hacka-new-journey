"use client";
import React, { useState } from "react";
import Link from "next/link";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    console.log("Logging in with:", { email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-lg space-y-6"
    >
      {error && (
        <div className="text-red-500 text-center font-medium">{error}</div>
      )}
      <div className="flex flex-col space-y-1">
        <label htmlFor="email" className="text-sm font-medium text-gray-700">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col space-y-1">
        <label
          htmlFor="password"
          className="text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-300 focus:border-transparent transition"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
      >
        Sign In
      </button>

      <div className="text-center text-sm text-gray-600">
        Don’t have an account?{" "}
        <Link href="/register" className="text-orange-500 hover:underline">
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
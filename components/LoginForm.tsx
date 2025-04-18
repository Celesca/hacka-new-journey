"use client";
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Add your login logic here
    console.log('Logging in with:', { email, password });
  };

  return (
    <div className="bg-yellow-50 p-8 rounded-xl shadow-lg max-w-md w-full animate-fadeIn">
      <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">
        Welcome Back
      </h2>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full p-3 border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300"
          required
        />
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-3 rounded-lg hover:opacity-90 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
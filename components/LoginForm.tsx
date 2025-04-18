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
    <div className="bg-yellow-200 p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center text-orange-600">Login</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
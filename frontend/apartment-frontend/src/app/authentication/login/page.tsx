'use client'; 
// Marks this file as a Client Component in Next.js — needed for React hooks

import { useState } from 'react';                  // React hook for state management
import axios from 'axios';                         // HTTP client for API calls
import { useRouter } from 'next/navigation';      // Next.js hook for navigation
import Link from 'next/link';                      // Next.js Link for SPA navigation

/**
 * LoginPage Component
 * 
 * Renders a login form where users can enter their username and password to authenticate.
 * On successful login, it stores the JWT token and redirects to the apartments listing page.
 * Displays error messages on login failure.
 */
export default function LoginPage() {
  // -------------------------------
  // State Management
  // -------------------------------
  const [username, setUsername] = useState('');   // Stores entered username
  const [password, setPassword] = useState('');   // Stores entered password
  const [error, setError] = useState('');         // Stores error messages

  const router = useRouter();                      // Router object to redirect programmatically

  // -------------------------------
  // API Base URL from environment
  // -------------------------------
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

  /**
   * Handle form submission for login
   * 
   * @param e - Form submission event
   */
 const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');

  try {
    const res = await axios.post(`${API_URL}/auth/login`, { username, password });
    const token = res.data.token;

    localStorage.setItem('token', token);

    router.push('/apartments');
  } catch (err) {
  if (axios.isAxiosError(err) && err.response?.data?.error) {
    setError(err.response.data.error);
  } else if (err instanceof Error) {
    setError(err.message);
  } else {
    setError('Login failed');
  }
}
};

  // -------------------------------
  // JSX Rendering
  // -------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 px-4">
      {/* Login Card Container */}
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 py-2 px-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg hover:scale-[1.02] transition-transform duration-200"
          >
            Log In
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <Link href="/authentication/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Fade-in Animation CSS */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
}

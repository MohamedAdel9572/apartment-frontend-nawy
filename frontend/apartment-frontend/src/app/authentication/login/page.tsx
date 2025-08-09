'use client'; 
// Marks this file as a Client Component in Next.js — required for using React hooks like useState

import { useState } from 'react';              // React hook for managing state (form inputs, error)
import axios from 'axios';                     // For sending HTTP requests to backend
import { useRouter } from 'next/navigation';   // Next.js hook for programmatic navigation

export default function LoginPage() {
  // -------------------------------
  // State Management
  // -------------------------------
  const [username, setUsername] = useState(''); // Stores entered username
  const [password, setPassword] = useState(''); // Stores entered password
  const [error, setError] = useState('');       // Stores error message for failed login attempts

  const router = useRouter(); // Navigation object for redirecting users after login

  // -------------------------------
  // Handle Login Submission
  // -------------------------------
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setError('');       // Clear any previous error message

    try {
      // Send POST request to backend login API with username & password
      const res = await axios.post('http://192.168.8.165:5000/auth/login', {
        username,
        password,
      });

      // OPTIONAL: Store token for authentication (if backend returns it)
      // localStorage.setItem('token', res.data.token);

      // Redirect to apartments list page on successful login
      router.push('/apartments');
    } catch (err: unknown) {
      // Display generic error message if login fails
      setError('Login failed');
    }
  };

  // -------------------------------
  // JSX (UI Rendering)
  // -------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 px-4">
      {/* Login Card */}
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back
        </h2>

        {/* Error Message (if exists) */}
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 py-2 px-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Field */}
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Field */}
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

        {/* Sign Up Redirect */}
        <p className="text-center text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="/authentication/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </a>
        </p>
      </div>

      {/* Animation Styles */}
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

'use client';
// This file is a Client Component in Next.js, enabling the use of React hooks

import { useState } from 'react';              // React hook for managing local state (form inputs, error message)
import axios from 'axios';                     // Library for making HTTP requests
import { useRouter } from 'next/navigation';   // Next.js hook for programmatic navigation

export default function SignupPage() {
  // -------------------------------
  // State Management
  // -------------------------------
  const [username, setUsername] = useState(''); // Stores the entered username
  const [password, setPassword] = useState(''); // Stores the entered password
  const [error, setError] = useState('');       // Stores an error message for failed signup attempts

  const router = useRouter(); // Router object for navigation after successful signup

  // -------------------------------
  // Handle Signup Submission
  // -------------------------------
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page reload on form submit
    setError('');       // Clears any previous error message

    try {
      // Send POST request to backend signup endpoint
      await axios.post('http://192.168.8.165:5000/auth/signup', {
        username,
        password,
        role: 'user', // Assigns a default "user" role
      });

      // On success, redirect to the apartments list page
      router.push('/apartments');
    } catch (err: unknown) {
      // Show a generic error if signup fails
      setError('Signup failed');
    }
  };

  // -------------------------------
  // JSX (UI Rendering)
  // -------------------------------
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 px-4">
      {/* Signup Card */}
      <div className="bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl p-8 w-full max-w-md animate-fadeIn">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>

        {/* Error Message (if exists) */}
        {error && (
          <p className="text-red-500 text-center mb-4 bg-red-50 py-2 px-3 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-5">
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
            Sign Up
          </button>
        </form>

        {/* Link to Login Page */}
        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <a href="/authentication/login" className="text-blue-600 font-semibold hover:underline">
            Log In
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

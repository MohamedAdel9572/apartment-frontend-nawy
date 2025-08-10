'use client'; // Marks this as a client component for Next.js

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

import axios from 'axios';

// Type definition for decoded JWT payload
type JwtPayload = {
  username: string;
  exp?: number; // optional expiration timestamp (seconds since epoch)
};

export default function CreateApartmentPage() {
  const router = useRouter();

  // -------------------------------
  // Form State
  // -------------------------------
  const [form, setForm] = useState({
    unitName: '',     // Apartment's display name
    unitNumber: '',   // Apartment's unique number
    project: '',      // Associated project name
    description: '',  // Optional description
  });

  // Error message state
  const [error, setError] = useState('');

  const [username, setUsername] = useState<string | null>(null); // Username from JWT

  // -------------------------------
  // Verify JWT Token
  // -------------------------------
  useEffect(() => {
    const token = localStorage.getItem('token');

    // Basic check: token must be in JWT format (three parts separated by '.')
    if (!token || token.split('.').length !== 3) {
      router.push('/authentication/login'); // Redirect if no token or invalid format
      return;
    }

    try {
      // Decode token payload using jwt-decode library
      const decoded = jwtDecode<JwtPayload>(token);

      // Check token expiration if 'exp' claim exists
      if (decoded.exp && Date.now() >= decoded.exp * 1000) {
        // Token expired, clear token and redirect to login
        localStorage.removeItem('token');
        router.push('/authentication/login');
        return;
      }

      // Token valid, set username from payload
      setUsername(decoded.username);
    } catch (error) {
      console.error('JWT decode failed:', error);
      localStorage.removeItem('token');
      router.push('/authentication/login'); // Fixed spelling
    }
  }, [router]);  

  // -------------------------------
  // Handle Input Changes
  // -------------------------------
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value, // Update the field by its name
    });
  };

  // -------------------------------
  // Handle Form Submit
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload
    setError('');       // Clear any previous errors

    try {
      // Send POST request to backend API
      await axios.post('http://192.168.8.165:5000/apartments', form);

      // Redirect to the apartments list page on success
      router.push('/apartments');
    } catch (err: unknown) {
      // Show generic error message if creation fails
      setError('Failed to create apartment');
    }
  };

  // -------------------------------
  // JSX (Form UI)
  // -------------------------------
  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Apartment
      </h2>

      {/* Apartment Creation Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Unit Name */}
        <input
          type="text"
          name="unitName"
          placeholder="Unit Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={form.unitName}
          onChange={handleChange}
          required
        />

        {/* Unit Number */}
        <input
          type="text"
          name="unitNumber"
          placeholder="Unit Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={form.unitNumber}
          onChange={handleChange}
          required
        />

        {/* Project Name */}
        <input
          type="text"
          name="project"
          placeholder="Project Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={form.project}
          onChange={handleChange}
          required
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
          rows={4}
          value={form.description}
          onChange={handleChange}
        />

        {/* Back to List Button */}
        <button
          type="button"
          onClick={() => router.push('/apartments')}
          className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition font-medium shadow-sm"
        >
          ← Back to List
        </button>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition font-medium shadow-md"
        >
          Create Apartment
        </button>

        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

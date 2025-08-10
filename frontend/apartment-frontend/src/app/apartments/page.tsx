'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

// Type definitions for apartment data
type Apartment = {
  id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
};

// Type definition for decoded JWT payload
type JwtPayload = {
  username: string;
  exp?: number; // optional expiration timestamp (seconds since epoch)
};

export default function ApartmentsPage() {
  // State for apartments list
  const [apartments, setApartments] = useState<Apartment[]>([]);
  // Loading state to display spinner/message while fetching data
  const [loading, setLoading] = useState(true);
  // State to hold the current search term for filtering apartments
  const [searchTerm, setSearchTerm] = useState('');
  // State for sorting apartments by field and order (asc/desc)
  const [sortOption, setSortOption] = useState('unitName-asc');
  // Store username extracted from JWT token (null if no user)
  const [username, setUsername] = useState<string | null>(null);

  // Next.js router for programmatic navigation (redirects)
  const router = useRouter();

  /**
   * Effect to verify JWT token on component mount
   * - Retrieves token from localStorage
   * - Checks if token exists and is valid JWT format (3 parts)
   * - Decodes token payload to get username and expiry
   * - If token missing, invalid, or expired => redirect to /login
   * - Otherwise sets username to display welcome message
   */
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
        router.push('/');
        return;
      }

      // Token valid, set username from payload for welcome message
      setUsername(decoded.username);
    } catch (error) {
      // Decoding failed - probably invalid token
      console.error('JWT decode failed:', error);
      localStorage.removeItem('token'); // Clear invalid token
      router.push('/authentication/login');             // Redirect to login page
    }
  }, [router]);

  /**
   * Effect to fetch apartments data from backend API on component mount
   * - Sends GET request with Authorization header containing Bearer token
   * - On success, updates apartments state with received data
   * - On error, logs the error to console
   * - Always sets loading to false once request finishes
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return; // If no token, skip fetching

    axios
      .get('http://192.168.8.165:5000/apartments', {
        headers: { Authorization: `Bearer ${token}` }, // Send JWT token in header
      })
      .then((res) => setApartments(res.data))
      .catch((err) => console.error('Failed to load apartments:', err))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Handles user sign out by:
   * - Removing token from localStorage
   * - Redirecting user to login page
   */
  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  // Display loading message while fetching apartments data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading apartments...
      </div>
    );
  }

  // Filter apartments by search term in unitName, unitNumber, or project fields (case-insensitive)
  const filteredApartments = apartments.filter(
    (apt) =>
      apt.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort filtered apartments based on selected field and order
  filteredApartments.sort((a, b) => {
    const [field, order] = sortOption.split('-');
    const valA = a[field as keyof Apartment]?.toString().toLowerCase();
    const valB = b[field as keyof Apartment]?.toString().toLowerCase();
    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // Main render output
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with page title and welcome username */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          🏢 Apartments
          {username && (
            <span className="text-sm font-normal opacity-80">| Welcome, {username}</span>
          )}
        </h1>

        {/* Buttons for adding apartment and signing out */}
        <div className="flex flex-wrap gap-2">
          <Link
            href="/apartments/create"
            className="bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 focus:ring-2 focus:ring-blue-400 transition text-white font-medium"
          >
            + Add
          </Link>
          <button
            onClick={handleSignOut}
            className="bg-gray-700 px-4 py-2 rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 transition text-white font-medium"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* Filters: Search and Sort */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-4 mx-4 mt-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
        <input
          type="text"
          placeholder="Search apartments..."
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="unitName-asc">Name (A → Z)</option>
          <option value="unitName-desc">Name (Z → A)</option>
          <option value="unitNumber-asc">Unit Number (Asc)</option>
          <option value="unitNumber-desc">Unit Number (Desc)</option>
          <option value="project-asc">Project (A → Z)</option>
          <option value="project-desc">Project (Z → A)</option>
        </select>
      </div>

      {/* Apartments grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apt) => (
            <Link
              href={`/apartments/${apt.id}`}
              key={apt.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col gap-2 hover:-translate-y-1 border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-blue-600 hover:underline">{apt.unitName}</h2>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Unit Number:</span> {apt.unitNumber}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Project:</span> {apt.project}
              </p>
              <p className="text-xs text-gray-500 line-clamp-2">{apt.description}</p>
            </Link>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-10">
            No apartments match your search.
          </div>
        )}
      </div>
    </div>
  );
}

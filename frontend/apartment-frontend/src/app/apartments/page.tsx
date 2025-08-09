'use client'; // Ensures this is a client-side component in Next.js

import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// -------------------------------
// Type Definitions
// -------------------------------
// Describes the shape of an Apartment object coming from the backend
type Apartment = {
  id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
};

export default function ApartmentsPage() {
  // -------------------------------
  // State Variables
  // -------------------------------
  const [apartments, setApartments] = useState<Apartment[]>([]); // Stores fetched apartments
  const [loading, setLoading] = useState(true); // Controls "loading..." display
  const [searchTerm, setSearchTerm] = useState(''); // User search input
  const [sortOption, setSortOption] = useState('unitName-asc'); // Sorting dropdown value

  const router = useRouter();

  // -------------------------------
  // Event Handlers
  // -------------------------------
  const handleSignOut = () => {
    // Redirects user to homepage
    router.push('/');
  };

  // -------------------------------
  // Fetch Apartments Data
  // -------------------------------
  useEffect(() => {
    axios
      .get('http://192.168.8.165:5000/apartments') // API endpoint for apartments
      .then((res) => setApartments(res.data)) // Save data to state
      .catch((err) => console.error('Failed to load:', err)) // Log error if fetch fails
      .finally(() => setLoading(false)); // Remove loading state
  }, []);

  // -------------------------------
  // Loading Screen
  // -------------------------------
  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        Loading apartments...
      </div>
    );

  // -------------------------------
  // Search Filter
  // -------------------------------
  const filteredApartments = apartments.filter((apt) =>
    apt.unitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // -------------------------------
  // Sorting Logic
  // -------------------------------
  filteredApartments.sort((a, b) => {
    const [field, order] = sortOption.split('-');
    const valA = a[field as keyof Apartment]?.toString().toLowerCase();
    const valB = b[field as keyof Apartment]?.toString().toLowerCase();
    if (valA < valB) return order === 'asc' ? -1 : 1;
    if (valA > valB) return order === 'asc' ? 1 : -1;
    return 0;
  });

  // -------------------------------
  // JSX (UI Rendering)
  // -------------------------------
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md px-6 py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight">🏢 Apartments</h1>

        {/* Action Buttons */}
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

      {/* Filters Section */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-4 mx-4 mt-6 flex flex-col sm:flex-row gap-3 justify-between items-center">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search apartments..."
          className="border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Sorting Dropdown */}
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

      {/* Apartments Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
        {filteredApartments.length > 0 ? (
          filteredApartments.map((apt) => (
            <Link
              href={`/apartments/${apt.id}`} // Link to apartment detail page
              key={apt.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-5 flex flex-col gap-2 hover:-translate-y-1 border border-gray-100"
            >
              <h2 className="text-lg font-semibold text-blue-600 hover:underline">
                {apt.unitName}
              </h2>
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
          // Empty State
          <div className="col-span-full text-center text-gray-500 py-10">
            No apartments match your search.
          </div>
        )}
      </div>
    </div>
  );
}

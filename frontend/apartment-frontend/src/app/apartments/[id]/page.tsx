'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';

type Apartment = {
  id: string;
  unitName: string;
  unitNumber: string;
  project: string;
  description: string;
};

export default function ApartmentDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://192.168.8.165:5000/apartments/${id}`)
      .then((res) => setApartment(res.data))
      .catch(() => console.error('Failed to load apartment'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this apartment?')) return;

    try {
      await axios.delete(`http://192.168.8.165:5000/apartments/${id}`);
      alert('Apartment deleted successfully!');
      router.push('/apartments');
    } catch (err) {
      console.error('Failed to delete:', err);
      alert('Error deleting apartment');
    }
  };

  if (loading) return <p className="p-6 text-gray-500 text-center">Loading apartment details...</p>;
  if (!apartment) return <p className="p-6 text-red-500 text-center">Apartment not found.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-6 border-b pb-4">
          {apartment.unitName}
        </h1>

        <div className="space-y-4 text-gray-700 text-lg">
          <p>
            <span className="font-semibold text-gray-900">🏠 Unit Number:</span>{' '}
            {apartment.unitNumber}
          </p>
          <p>
            <span className="font-semibold text-gray-900">📍 Project:</span>{' '}
            {apartment.project}
          </p>
          <p>
            <span className="font-semibold text-gray-900">📝 Description:</span>{' '}
            {apartment.description || 'No description provided.'}
          </p>
        </div>

        <div className="mt-8 flex justify-between">
          <button
            onClick={() => router.push('/apartments')}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-5 py-2.5 rounded-lg shadow-sm transition-all duration-200"
          >
            ← Back to List
          </button>

          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-lg shadow-md transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            🗑 Delete Apartment
          </button>
        </div>
      </div>
    </div>
  );
}

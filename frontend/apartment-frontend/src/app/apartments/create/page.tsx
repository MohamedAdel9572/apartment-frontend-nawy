'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function CreateApartmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    unitName: '',
    unitNumber: '',
    project: '',
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://192.168.8.165:5000/apartments', form);
      router.push('/apartments');
    } catch (err: unknown) {
    setError('Failed to create apartment');
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Apartment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="unitName"
          placeholder="Unit Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={form.unitName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="unitNumber"
          placeholder="Unit Number"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={form.unitNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="project"
          placeholder="Project Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          value={form.project}
          onChange={handleChange}
          required
        />
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

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
}

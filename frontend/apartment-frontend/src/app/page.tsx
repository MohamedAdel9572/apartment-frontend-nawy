'use client';

import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-10 text-center max-w-xl w-full animate-fadeIn">
        
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/nawyestate_cover.png"
            alt="Nawy Estate Logo"
            width={286}
            height={340}
            className="w-32 h-32 object-contain rounded-full border-4 border-white shadow-lg hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
          Find Your Perfect Place
        </h1>

        {/* Slogan */}
        <p className="text-xl text-blue-600 font-semibold italic mb-4">
          “Because every address tells a story.”
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-8">
          Explore handpicked apartments in prime locations.  
          From modern city flats to peaceful retreats,  
          your next chapter starts here.
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <a
            href="/authentication/signup"
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg shadow-lg hover:scale-105 transition-all duration-300"
          >
            Start Your Search
          </a>
          <a
            href="/authentication/login"
            className="px-6 py-3 border-2 border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 hover:scale-105 transition-all duration-300"
          >
            Member Login
          </a>
        </div>
      </div>

      {/* Animations */}
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

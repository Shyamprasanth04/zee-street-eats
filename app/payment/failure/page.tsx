'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error') || 'Payment failed';

  return (
    <div className="min-h-screen flex items-center justify-center bg-zee-dark">
      <div className="max-w-md w-full mx-auto p-8 bg-zee-dark/50 backdrop-blur-lg rounded-2xl border border-white/10">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-500 mb-4">
            Payment Failed
          </h1>
          <p className="text-gray-300 mb-6">
            {errorMessage}
          </p>
          <div className="space-y-4">
            <Link
              href="/pre-order"
              className="block w-full py-3 px-6 bg-zee-yellow text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors duration-300"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="block w-full py-3 px-6 border border-zee-yellow text-zee-yellow font-semibold rounded-lg hover:bg-zee-yellow/10 transition-colors duration-300"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
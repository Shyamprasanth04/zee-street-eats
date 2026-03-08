'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const orderId = searchParams.get('orderId');
    if (orderId) {
      // Here you would typically fetch the order details from your backend
      // For now, we'll just show a success message
      setOrderDetails({
        orderId,
        status: 'success',
        amount: '0.00', // This would come from your backend
      });
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-zee-yellow"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zee-dark">
      <div className="max-w-md w-full mx-auto p-8 bg-zee-dark/50 backdrop-blur-lg rounded-2xl border border-white/10">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-zee-yellow mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-300 mb-6">
            Thank you for your order. Your payment has been processed successfully.
          </p>
          {orderDetails && (
            <div className="bg-white/5 rounded-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-zee-yellow mb-4">
                Order Details
              </h2>
              <div className="space-y-2 text-gray-300">
                <p>Order ID: {orderDetails.orderId}</p>
                <p>Amount: £{orderDetails.amount}</p>
                <p>Status: {orderDetails.status}</p>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <Link
              href="/"
              className="block w-full py-3 px-6 bg-zee-yellow text-black font-semibold rounded-lg hover:bg-amber-500 transition-colors duration-300"
            >
              Return to Home
            </Link>
            <Link
              href="/menu"
              className="block w-full py-3 px-6 border border-zee-yellow text-zee-yellow font-semibold rounded-lg hover:bg-zee-yellow/10 transition-colors duration-300"
            >
              Browse Menu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 
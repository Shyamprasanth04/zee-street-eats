'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/signin');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-zee-dark to-black">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-zee-yellow mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Add your dashboard content here */}
          <div className="bg-zinc-900/50 backdrop-blur-lg p-6 rounded-2xl border border-zinc-800/50">
            <h2 className="text-xl font-semibold text-white mb-4">Welcome to your Dashboard</h2>
            <p className="text-gray-400">This is your personal dashboard where you can manage your account and orders.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 
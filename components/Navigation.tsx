'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          credentials: 'include',
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
      
      if (response.ok) {
        setIsAuthenticated(false);
        router.push('/');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-zee-dark/80 backdrop-blur-sm border-b border-gray-800">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-zee-yellow">
            Zee's Street Eats
          </Link>

          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className={`text-gray-300 hover:text-zee-yellow transition-colors ${
                isActive('/') ? 'text-zee-yellow' : ''
              }`}
            >
              Home
            </Link>
            <Link
              href="/events"
              className={`text-gray-300 hover:text-zee-yellow transition-colors ${
                isActive('/events') ? 'text-zee-yellow' : ''
              }`}
            >
              Events
            </Link>
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/pre-order"
                      className="btn-primary"
                    >
                      Pre-Order
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-zee-yellow transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/signin"
                    className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-800 rounded-md hover:bg-gray-700 hover:text-zee-yellow transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 
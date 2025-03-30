import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';
import { authService, User } from '../lib/auth';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      router.push('/auth/signin');
    } else {
      setUser(currentUser);
      setLoading(false);
    }
  }, [router]);

  const handleSignOut = () => {
    authService.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <h2 className="text-lg font-semibold text-blue-800 mb-2">Welcome, {user?.name || user?.email}!</h2>
            <p className="text-blue-600">
              You are now signed in to your M.A.D.H.A.V.A. account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* API Key Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Your API Key</h3>
              <div className="bg-gray-100 p-3 rounded flex items-center justify-between">
                <code className="text-sm text-gray-800 overflow-x-auto">
                  {/* Display masked API key */}
                  ••••••••••••••••••••••
                </code>
                <button className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                  Show
                </button>
              </div>
              <div className="mt-4 flex space-x-2">
                <button className="text-sm text-blue-500 hover:text-blue-700">
                  Copy
                </button>
                <button className="text-sm text-blue-500 hover:text-blue-700">
                  Regenerate
                </button>
              </div>
            </div>

            {/* Usage Stats Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">API Usage</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Requests this month:</span>
                  <span className="font-medium">0 / 1,000</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="mt-4">
                <a href="/pricing" className="text-sm text-blue-500 hover:text-blue-700">
                  Upgrade Plan →
                </a>
              </div>
            </div>

            {/* Documentation Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/api-reference" className="text-blue-500 hover:text-blue-700">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="/documentation" className="text-blue-500 hover:text-blue-700">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="/tutorials" className="text-blue-500 hover:text-blue-700">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="/support" className="text-blue-500 hover:text-blue-700">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
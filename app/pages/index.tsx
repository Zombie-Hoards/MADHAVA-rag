import React from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Multi-domain Analytical Data Harvesting & Automated Verification Assistant
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Powerful AI-driven data analysis and verification across multiple domains. Get started with M.A.D.H.A.V.A. today.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  href="/documentation" 
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 text-center"
                >
                  Learn More
                </Link>
                <Link 
                  href="/api-reference" 
                  className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition duration-300 text-center"
                >
                  API Reference
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-5 bg-blue-600">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6 bg-gray-800 text-white font-mono text-sm">
                  <p className="text-green-400">$ madhava init</p>
                  <p className="text-gray-400 mt-2">Initializing M.A.D.H.A.V.A. environment...</p>
                  <p className="text-gray-400 mt-1">Connecting to data sources...</p>
                  <p className="text-gray-400 mt-1">Setting up verification protocols...</p>
                  <p className="text-white mt-2">✓ M.A.D.H.A.V.A. is ready!</p>
                  <p className="text-blue-400 mt-4">$ madhava analyze --domain finance</p>
                  <p className="text-gray-400 mt-1">Analyzing financial data...</p>
                  <p className="text-white mt-2">✓ Analysis complete. Results available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-domain Analysis</h3>
              <p className="text-gray-600">
                Analyze data across multiple domains including finance, healthcare, science, and more with domain-specific intelligence.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Automated Verification</h3>
              <p className="text-gray-600">
                Verify data accuracy and authenticity automatically with advanced AI algorithms and cross-referencing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">API Integration</h3>
              <p className="text-gray-600">
                Seamlessly integrate with your existing systems through our robust API with comprehensive documentation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 
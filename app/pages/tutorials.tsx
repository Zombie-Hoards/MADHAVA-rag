import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Tutorials() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Tutorials</h1>
            <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">Learn how to use M.A.D.H.A.V.A. with our comprehensive tutorials</p>
          </div>

          {/* Featured Tutorial */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl overflow-hidden shadow-lg mb-12">
            <div className="md:flex">
              <div className="md:w-2/5 bg-blue-600 flex items-center justify-center p-8">
                <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                </svg>
              </div>
              <div className="p-8 md:w-3/5">
                <div className="uppercase tracking-wide text-sm text-blue-600 font-semibold">Featured Tutorial</div>
                <h2 className="mt-2 text-2xl font-bold text-gray-800">Getting Started with M.A.D.H.A.V.A.</h2>
                <p className="mt-3 text-gray-600">Learn the basics of M.A.D.H.A.V.A. and how to set up your first project. This comprehensive guide will walk you through the initial setup process.</p>
                <div className="mt-4">
                  <Link href="/tutorials/getting-started" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Start Learning
                    <svg className="ml-2 -mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Tutorial Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Tutorial Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">API Integration</h3>
                <p className="text-gray-600 mb-4">Learn how to integrate M.A.D.H.A.V.A. API into your applications.</p>
                <Link href="/tutorials/api-integration" className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
                  View Tutorials
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Security</h3>
                <p className="text-gray-600 mb-4">Best practices for securing your data when using M.A.D.H.A.V.A.</p>
                <Link href="/tutorials/data-security" className="text-green-600 hover:text-green-800 font-medium inline-flex items-center">
                  View Tutorials
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Advanced Features</h3>
                <p className="text-gray-600 mb-4">Explore advanced features and capabilities of M.A.D.H.A.V.A.</p>
                <Link href="/tutorials/advanced-features" className="text-purple-600 hover:text-purple-800 font-medium inline-flex items-center">
                  View Tutorials
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Latest Tutorials */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Latest Tutorials</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/4 bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-2xl font-bold">01</span>
                      <span className="text-blue-100">JUN 2023</span>
                    </div>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Multi-domain Data Analysis with M.A.D.H.A.V.A.</h3>
                    <p className="text-gray-600 mb-4">Learn how to analyze data across multiple domains using our advanced tools and techniques.</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>15 min read</span>
                      <span className="mx-2">•</span>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">Intermediate</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/4 bg-gradient-to-br from-green-500 to-green-600 text-white p-6 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-2xl font-bold">15</span>
                      <span className="text-green-100">MAY 2023</span>
                    </div>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Automated Verification Workflows</h3>
                    <p className="text-gray-600 mb-4">Set up automated verification workflows to ensure data accuracy and reliability.</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>20 min read</span>
                      <span className="mx-2">•</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">Advanced</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="md:flex">
                  <div className="md:w-1/4 bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 flex items-center justify-center">
                    <div className="text-center">
                      <span className="block text-2xl font-bold">28</span>
                      <span className="text-purple-100">APR 2023</span>
                    </div>
                  </div>
                  <div className="p-6 md:w-3/4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Building Your First M.A.D.H.A.V.A. Integration</h3>
                    <p className="text-gray-600 mb-4">A step-by-step guide to integrating M.A.D.H.A.V.A. into your existing applications.</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>10 min read</span>
                      <span className="mx-2">•</span>
                      <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">Beginner</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Tutorials */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Video Tutorials</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative pb-[56.25%] bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 bg-opacity-90 flex items-center justify-center cursor-pointer">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Introduction to M.A.D.H.A.V.A. API</h3>
                  <p className="text-gray-600 text-sm">Learn the basics of our API and how to make your first API call.</p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>8:24</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300">
                <div className="relative pb-[56.25%] bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-blue-600 bg-opacity-90 flex items-center justify-center cursor-pointer">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Data Visualization Techniques</h3>
                  <p className="text-gray-600 text-sm">Explore different ways to visualize data using M.A.D.H.A.V.A.</p>
                  <div className="mt-3 flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <span>12:45</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Frequently Asked Questions</h2>
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 divide-y divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">How do I get an API key?</h3>
                <p className="text-gray-600">You can obtain an API key by signing up for an account and navigating to the API section in your dashboard. Follow our <Link href="/documentation/api-keys" className="text-blue-600 hover:text-blue-800">API key guide</Link> for detailed instructions.</p>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">What programming languages are supported?</h3>
                <p className="text-gray-600">M.A.D.H.A.V.A. provides client libraries for Python, JavaScript, Java, Ruby, and Go. You can also use any language that can make HTTP requests to our REST API.</p>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-2">Are there usage limits on the API?</h3>
                <p className="text-gray-600">Yes, API usage limits depend on your subscription plan. Free accounts have a limited number of requests per month, while paid plans offer higher limits. Check our <Link href="/pricing" className="text-blue-600 hover:text-blue-800">pricing page</Link> for details.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl overflow-hidden shadow-lg">
            <div className="px-6 py-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to start learning?</h2>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">Join our community and get access to all tutorials, sample code, and expert support.</p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link href="/auth/signup" className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 shadow-sm">
                  Create Free Account
                </Link>
                <Link href="/documentation" className="inline-flex items-center justify-center px-5 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-blue-700">
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
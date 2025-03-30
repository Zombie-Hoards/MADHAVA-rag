import React from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function CookiePolicy() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Cookie Policy</h1>
            <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>
            <p className="text-gray-600 text-lg">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-blue-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
              <p className="text-gray-700">
                This Cookie Policy explains how M.A.D.H.A.V.A. ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website and use our services. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
            </div>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p className="mb-4">
                Cookies set by the website owner (in this case, M.A.D.H.A.V.A.) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Do We Use Cookies?</h2>
              <p className="mb-4">We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our website. Third parties serve cookies through our website for advertising, analytics, and other purposes.</p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800">Essential Cookies</h3>
                  </div>
                  <p className="text-gray-600">These cookies are strictly necessary to provide you with services available through our website and to use some of its features, such as access to secure areas.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800">Analytics Cookies</h3>
                  </div>
                  <p className="text-gray-600">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800">Functionality Cookies</h3>
                  </div>
                  <p className="text-gray-600">These cookies enable the website to provide enhanced functionality and personalization, such as remembering your preferences.</p>
                </div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center mb-3">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-800">Targeting Cookies</h3>
                  </div>
                  <p className="text-gray-600">These cookies are used to make advertising messages more relevant to you and your interests.</p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cookies We Use</h2>
              <p className="mb-6">The specific types of first and third-party cookies served through our website and the purposes they perform are described below:</p>
              
              <div className="overflow-hidden bg-white shadow sm:rounded-md mb-6">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Essential Cookies</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-md font-medium text-gray-900">Session Cookie</h4>
                          <p className="mt-1 text-sm text-gray-600">Used to maintain your session state and authenticate you on our platform.</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: Session
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-md font-medium text-gray-900">CSRF Token</h4>
                          <p className="mt-1 text-sm text-gray-600">Helps prevent Cross-Site Request Forgery attacks.</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: Session
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="overflow-hidden bg-white shadow sm:rounded-md mb-6">
                <div className="px-4 py-5 sm:px-6 bg-gray-50">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Analytics Cookies</h3>
                </div>
                <ul className="divide-y divide-gray-200">
                  <li>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-md font-medium text-gray-900">Google Analytics</h4>
                          <p className="mt-1 text-sm text-gray-600">Used to distinguish users and analyze website traffic.</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: 2 years
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="px-4 py-5 sm:px-6">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="text-md font-medium text-gray-900">Hotjar</h4>
                          <p className="mt-1 text-sm text-gray-600">Used to analyze user behavior and improve user experience.</p>
                        </div>
                        <div className="text-sm text-gray-500">
                          Duration: 1 year
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">How Can You Control Cookies?</h2>
              <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by clicking on the appropriate opt-out links provided in the cookie table above.
              </p>
              <p className="mb-4">
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser-to-browser, you should visit your browser's help menu for more information.
              </p>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Browser Settings</h3>
                <p className="text-gray-600 mb-4">Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set, visit <a href="https://www.aboutcookies.org" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">www.aboutcookies.org</a> or <a href="https://www.allaboutcookies.org" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">www.allaboutcookies.org</a>.</p>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">https://support.google.com/chrome/answer/95647</a></p>
                  <p className="text-gray-600"><strong>Firefox:</strong> <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop</a></p>
                  <p className="text-gray-600"><strong>Safari:</strong> <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac</a></p>
                  <p className="text-gray-600"><strong>Edge:</strong> <a href="https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/en-us/help/4468242/microsoft-edge-browsing-data-and-privacy</a></p>
                </div>
              </div>
            </section>

            <section className="mb-10">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Do Not Track</h2>
              <p className="mb-4">
                Some browsers have a "Do Not Track" feature that lets you tell websites that you do not want to have your online activities tracked. At this time, we do not respond to browser "Do Not Track" signals.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Us</h2>
              <p className="mb-6">If you have any questions about our use of cookies or other technologies, please contact us:</p>
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Email</dt>
                      <dd className="mt-1 text-sm text-gray-900">privacy@madhava.ai</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">+1 234-567-8900</dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Address</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        M.A.D.H.A.V.A. Headquarters<br />
                        123 AI Boulevard<br />
                        San Francisco, CA 94105<br />
                        United States
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
} 
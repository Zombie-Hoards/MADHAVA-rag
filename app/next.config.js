/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Ensure pages are properly served
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // Ensure the app directory is properly recognized
  distDir: '.next',
  // Add any other configuration options as needed
};

module.exports = nextConfig; 
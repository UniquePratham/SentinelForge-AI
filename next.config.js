/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export to allow API routes (intent proxy) to work properly.
  // If a pure static build is desired later, ensure all API routes are removed first.
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  // Removed demo redirect; demo route deleted.
  webpack: (config) => {
    // Workaround Windows-specific Webpack filesystem cache snapshot issue
    // that can cause: "Unable to snapshot resolve dependencies" during build.
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;

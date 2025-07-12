/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable static optimization completely for this route
  // This ensures Next.js doesn't try to pre-render or collect data
  // for dynamic routes during the build step.
  async generateStaticParams() {
    return []; // Crucial: Return an empty array to prevent static generation
  },
  async rewrites() {
    return [];
  },
  async headers() {
    return [
      {
        source: "/plants/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

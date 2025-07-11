/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wlgtgrawwh.ufs.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig; 
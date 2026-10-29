import type { NextConfig } from 'next';

// Configure when the Next.js application is initialized.
const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/products/oversized-architectural-heavyweight-french-terry-drop-shoulder-zip-hoodie',
        destination: '/products/architectural-zip-hoodie',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    domains: ['firebasestorage.googleapis.com'],
  },

  // Tüm rewrite kuralları
  async rewrites() {
    return [
      // Admin route'ları için
      {
        source: '/admin',
        destination: '/admin',
      },
      {
        source: '/admin/:path*',
        destination: '/admin/:path*',
      },
      // TinyMCE için
      {
        source: '/tinymce/:path*',
        destination: '/tinymce/:path*',
      }
    ]
  },

  // TinyMCE için webpack yapılandırması
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'tinymce': 'tinymce/tinymce.min.js',
      };
    }
    return config;
  }
};

module.exports = withNextIntl(nextConfig); 
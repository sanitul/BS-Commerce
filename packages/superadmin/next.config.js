const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ];
  },
  images: {
    domains: ['admin-demo.nopcommerce.com', 'cdn.shopify.com'],
  },
};

const withTM = require('next-transpile-modules')(['marketplace']);
module.exports = withTM(nextConfig);

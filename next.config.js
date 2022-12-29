const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  reactStrictMode: false,
  disable: process.env.NEXT_PUBLIC_APP_ENV === 'local',
});

module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
});

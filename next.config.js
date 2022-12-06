const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NEXT_PUBLIC_APP_ENV === 'local',
});

module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
});

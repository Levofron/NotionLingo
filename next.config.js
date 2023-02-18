const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: ['local', 'test'].includes(process.env.NEXT_PUBLIC_APP_ENV),
});

module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: false,
  images: {
    domains: [
      'images.pexels.com',
      'source.unsplash.com',
      'www.buymeacoffee.com',
      'www.paypalobjects.com',
      'lh3.googleusercontent.com',
    ],
  },
  modularizeImports: {
    '@ui/atoms': {
      preventFullImport: true,
      transform: '@ui/atoms/{{kebabCase member}}/{{kebabCase member}}.component',
    },
  },
});

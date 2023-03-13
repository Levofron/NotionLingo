const nextPwa = require('next-pwa');
const { withAxiom } = require('next-axiom');

const withPwa = nextPwa({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: ['local', 'test'].includes(process.env.NEXT_PUBLIC_APP_ENV),
});

module.exports = withPwa(
  withAxiom({
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
  }),
);

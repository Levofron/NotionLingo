import { globby } from 'globby';
import fs from 'node:fs';
import path from 'node:path';

const getPath = (destination) => {
  const currentDirectory = process.cwd();

  return path.join(currentDirectory, destination);
};

async function generateSitemap() {
  const pages = await globby([
    'pages/**/*.tsx', // All routes inside /pages
    '!pages/**/[*.tsx', // Ignore my dynamic route index
    '!pages/_*.tsx', // Ignore next.js files
    '!pages/404.tsx', // Ignore 404 page
    '!pages/api', // Ignore API routes
  ]);

  const publicDirectoryPath = getPath('public');

  const urlSet = pages
    .map((page) => {
      const currentPath = page.replace('pages', '').replace(/(.tsx)/, '');
      const route = currentPath === '/index' ? '' : currentPath;
      const priority = ['/index', '/terms', '/privacy-policy'].includes(currentPath)
        ? '1.0'
        : '0.5';

      return `<url><loc>https://www.notionlingo.com${route}</loc><priority>${priority}</priority><changefreq>daily</changefreq></url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;

  fs.writeFileSync(`${publicDirectoryPath}/sitemap.xml`, sitemap);
}

generateSitemap();

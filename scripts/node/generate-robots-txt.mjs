import fs from 'node:fs';
import path from 'node:path';

const getPath = (destination) => {
  const currentDirectory = process.cwd();

  return path.join(currentDirectory, destination);
};

// eslint-disable-next-line operator-linebreak
const crawlableRobotsTxt =
  'User-agent: *\nAllow: /\n\nSitemap: https://www.notionlingo.com/sitemap.xml';

const uncrawlableRobotsTxt = 'User-agent: *\nDisallow: /';

function generateRobotsTxt() {
  // eslint-disable-next-line operator-linebreak
  const robotsTxt =
    process.env.VERCEL_ENV === 'production' ? crawlableRobotsTxt : uncrawlableRobotsTxt;

  const publicDirectoryPath = getPath('public');

  fs.writeFileSync(`${publicDirectoryPath}/robots.txt`, robotsTxt);
}

generateRobotsTxt();

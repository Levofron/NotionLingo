import { NextSeo } from 'next-seo';
import { FC, memo } from 'react';

import { APP_NAME, DEFAULT_DESCRIPTION, SEO_KEYWORDS, WEBSITE_URL } from './seo.defaults';
import { ISEOProps } from './seo.types';

const getTitle = (title?: string) => {
  if (!title) {
    return APP_NAME;
  }

  return `${APP_NAME} | ${title}`;
};

const getFullUrl = (url?: string) => {
  if (!url) {
    return WEBSITE_URL;
  }

  return `${WEBSITE_URL}${url}`;
};

const SEOComponent: FC<ISEOProps> = ({
  description = DEFAULT_DESCRIPTION,
  noFollow,
  noIndex,
  title,
  url,
}): JSX.Element => {
  const fullUrl = getFullUrl(url);
  const fullTitle = getTitle(title);
  const seoImage = `${WEBSITE_URL}/seo-image.png`;

  return (
    <NextSeo
      additionalLinkTags={[
        {
          rel: 'manifest',
          href: '/manifest.json',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          href: '/favicon.ico',
        },
        {
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          sizes: '16x16',
          type: 'image/png',
          href: '/favicon-16x16.png',
        },
        {
          rel: 'apple-touch-startup-image',
          href: '/apple-touch-icon.png',
          sizes: '180x180',
        },
        {
          rel: 'mask-icon',
          href: '/safari-pinned-tab.svg',
          color: '#000000',
        },
      ]}
      additionalMetaTags={[
        {
          name: 'theme-color',
          content: '#F5F5F5',
        },
        {
          name: 'description',
          content: description,
        },
        {
          name: 'og:title',
          content: fullTitle,
        },
        {
          name: 'og:description',
          content: description,
        },
        {
          name: 'og:type',
          content: 'website',
        },
        {
          content: 'en',
          name: 'og:locale',
        },
        {
          name: 'og:site_name',
          content: fullTitle,
        },
        {
          name: 'twitter:image',
          content: seoImage,
        },
        {
          name: 'twitter:url',
          content: fullUrl,
        },
        {
          content: APP_NAME,
          name: 'application-name',
        },
        {
          content: 'yes',
          name: 'apple-mobile-web-app-capable',
        },
        {
          content: 'default',
          name: 'apple-mobile-web-app-status-bar-style',
        },
        {
          content: 'telephone=no',
          name: 'format-detection',
        },
        {
          name: 'author',
          content: 'Paweł Wojtasiński',
        },
        {
          name: 'keywords',
          content: SEO_KEYWORDS.sort().join(', '),
        },
        {
          name: 'msapplication-TileColor',
          content: '#f7f7f7',
        },
        {
          name: 'theme-color',
          content: '#f7f7f7',
        },
      ]}
      canonical={url}
      description={description}
      languageAlternates={[
        {
          hrefLang: 'en',
          href: fullUrl,
        },
      ]}
      nofollow={noFollow}
      noindex={noIndex}
      openGraph={{
        url,
        title: fullTitle,
        description,
        images: [
          {
            width: 800,
            height: 600,
            alt: fullTitle,
            url: seoImage,
          },
        ],
      }}
      title={fullTitle}
      twitter={{
        site: fullTitle,
        handle: '@WojtasinskiPawe',
        cardType: 'summary_large_image',
      }}
    />
  );
};

export const SEO = memo(SEOComponent);

export default SEO;

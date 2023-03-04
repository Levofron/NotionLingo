import { FAQPageJsonLd, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import { SEO } from '@ui/atoms';
import { QUESTIONS_AND_ANSWERS } from '@ui/molecules/faq/faq.defaults';
import { SidebarWithHeader } from '@ui/organisms';
import { HomeTemplate } from '@ui/templates';

import {
  BUY_ME_A_COFFEE_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  PAYPAL_LINK,
  TWITTER_LINK,
} from '@constants';

// TODO - generate some logo for SEO
export const HomePage = (): JSX.Element => (
  <>
    <SEO title="Improve vocabulary with your Notion database" />
    <LogoJsonLd logo="https://notionlingo.com/images/logo.jpg" url="https://notionlingo.com" />
    <SocialProfileJsonLd
      name="Paweł Wojtasiński"
      sameAs={[LINKEDIN_LINK, GITHUB_LINK, TWITTER_LINK, BUY_ME_A_COFFEE_LINK, PAYPAL_LINK]}
      type="Person"
      url={LINKEDIN_LINK}
    />
    <FAQPageJsonLd
      mainEntity={QUESTIONS_AND_ANSWERS.map((_quectionAndAnswer) => ({
        questionName: _quectionAndAnswer.question,
        acceptedAnswerText: _quectionAndAnswer.answer,
      }))}
    />
    <SidebarWithHeader />
    <HomeTemplate />
  </>
);

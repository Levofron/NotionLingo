import { FAQPageJsonLd, LogoJsonLd, SocialProfileJsonLd } from 'next-seo';

import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { HomeTemplate } from '@ui/templates';

import {
  BUY_ME_A_COFFEE_LINK,
  GITHUB_LINK,
  LINKEDIN_LINK,
  PAYPAL_LINK,
  QUESTIONS_AND_ANSWERS,
  TWITTER_LINK,
} from '@config/constants';

export const HomePage = (): JSX.Element => (
  <>
    <SEO title="Improve vocabulary with your Notion database" />
    <LogoJsonLd logo="https://notionlingo.com/apple-touch-icon.png" url="https://notionlingo.com" />
    <SocialProfileJsonLd
      name="Paweł Wojtasiński"
      sameAs={[LINKEDIN_LINK, GITHUB_LINK, TWITTER_LINK, BUY_ME_A_COFFEE_LINK, PAYPAL_LINK]}
      type="Person"
      url={LINKEDIN_LINK}
    />
    <FAQPageJsonLd
      mainEntity={QUESTIONS_AND_ANSWERS.map((_questionAndAnswer) => ({
        questionName: _questionAndAnswer.question,
        acceptedAnswerText: _questionAndAnswer.answer,
      }))}
    />
    <SidebarWithHeader />
    <HomeTemplate />
  </>
);

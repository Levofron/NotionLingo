import { SEO } from '@presentation/atoms';
import { Onboarding as OnboardingPage } from '@presentation/pages';

const Onboarding = () => (
  <>
    <SEO noFollow noIndex title="Onboarding" />
    <OnboardingPage />
  </>
);

export default Onboarding;

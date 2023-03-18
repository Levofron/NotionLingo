import { SEO } from '@ui/atoms';
import { SidebarWithHeader } from '@ui/organisms';
import { LoginTemplate } from '@ui/templates';

export const LoginPage = (): JSX.Element => (
  <>
    <SEO noFollow noIndex title="Login" />
    <SidebarWithHeader />
    <LoginTemplate />
  </>
);

import { SEO } from '@ui/atoms';
import { Login as LoginPage } from '@ui/pages';

const Login = () => (
  <>
    <SEO noFollow noIndex title="Login" />
    <LoginPage />
  </>
);

export default Login;

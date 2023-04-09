import { SEO } from '@presentation/atoms';
import { Login as LoginPage } from '@presentation/pages';

const Login = () => (
  <>
    <SEO noFollow noIndex title="Login" />
    <LoginPage />
  </>
);

export default Login;

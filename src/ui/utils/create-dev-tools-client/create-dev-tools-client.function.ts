import { authorizationModule } from '@adapter/modules/authorization.module';

export const createDevToolsClient = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'local') {
    return;
  }

  // @ts-expect-error
  window.authorization = authorizationModule;

  console.log('Welcome to Levofron devtools!');
  console.log('window.authorization.logout() - to logout');
  console.log('window.authorization.loginViaGoogle() - to login via google');
};

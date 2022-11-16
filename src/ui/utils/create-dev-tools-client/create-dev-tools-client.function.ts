import { authorizationModule } from '@adapter/modules/authorization.module';

export const createDevToolsClient = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'local') {
    return;
  }

  // @ts-ignore
  window.Authorization = authorizationModule;

  console.log('Welcome to Levofron devtools!');
  console.log('window.Authorization.logout() - to logout');
  console.log('window.Authorization.loginViaGoogle() - to login via google');
};

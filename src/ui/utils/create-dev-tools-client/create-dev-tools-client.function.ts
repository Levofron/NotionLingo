import { restModule } from '@adapter/modules/rest.module';
import { authorizationModule } from '@adapter/modules/authorization.module';

export const createDevToolsClient = () => {
  if (process.env.NEXT_PUBLIC_APP_ENV !== 'local') {
    return;
  }

  // @ts-expect-error
  window.authorization = authorizationModule;

  // @ts-expect-error
  window.rest = restModule;

  console.log('Welcome to Levofron devtools!');

  // authorization
  console.log('-----------------------------');
  console.log('window.authorization.logout() - to logout');
  console.log('window.authorization.loginViaGoogle() - to login via google');

  // rest
  console.log('-----------------------------');
  console.log('window.rest.healthCheck() - to verify if API works correctly');
};

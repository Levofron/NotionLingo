import { localStorageModule, restModule, speechSynthesisModule, supabaseModule } from '@adapter';

import { APPLICATION_ENVIRONMENT } from '@constants';

export const createDevToolsClient = () => {
  if (!['test', 'local'].includes(APPLICATION_ENVIRONMENT)) {
    return;
  }

  // @ts-expect-error
  window.rest = restModule;

  // @ts-expect-error
  window.supabase = supabaseModule;

  // @ts-expect-error
  window.memory = localStorageModule;

  // @ts-expect-error
  window.synthesis = speechSynthesisModule;

  console.log('Welcome to Levofron devtools!');
};

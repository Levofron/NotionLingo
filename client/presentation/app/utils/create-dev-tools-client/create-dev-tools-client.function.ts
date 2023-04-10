import { localStorageModule } from '@adapter/local-storage/local-storage.module';
import { restModule } from '@adapter/rest/rest.module';
import { speechSynthesisModule } from '@adapter/speech-synthesis/speech-synthesis.module';
import { supabaseModule } from '@adapter/supabase/supabase.module';

import { APPLICATION_ENVIRONMENT } from '@config/constants';

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
};

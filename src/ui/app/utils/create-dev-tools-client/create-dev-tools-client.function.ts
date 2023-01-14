import { restModule, speechSynthesisModule, supabaseModule } from '@adapter';

import { APPLICATION_ENVIRONMENT } from '@constants';

export const createDevToolsClient = () => {
  if (!['test', 'local'].includes(APPLICATION_ENVIRONMENT)) {
    return;
  }

  // @ts-expect-error
  window.supabase = supabaseModule;

  // @ts-expect-error
  window.rest = restModule;

  // @ts-expect-error
  window.synthesis = speechSynthesisModule;

  console.log('Welcome to Levofron devtools!');

  // supabase
  console.log('-----------------------------');
  console.log('window.supabase.logout() - to logout');
  console.log('window.supabase.getUser() - to get user');
  console.log('window.supabase.getSession() - to get session');
  console.log('window.supabase.loginViaGoogle() - to login via google');
  console.log('window.supabase.onAuthStateChange(callback) - to subscribe to auth state changes');

  // rest
  console.log('-----------------------------');
  console.log('window.rest.setSupabaseCookie() - to set supabase cookie');
  console.log('window.rest.healthCheck() - to verify if API works correctly');
  console.log('window.rest.setNotionApiToken(token) - to set a new notion token');
  console.log('window.rest.sendContactFormData(data) - to send contact form data');
  console.log('window.rest.getLoggedUser() - to get all details about logged user');
  console.log('window.rest.getAvailableNotionPages() - to get all available notion pages');
  console.log('window.rest.setNotionPageId(pageId) - to set a selected page id to logged user');
  console.log('window.rest.getRandomNotionWords() - to get 5 random words from notion database');

  // speech synthesis
  console.log('-----------------------------');
  console.log('window.speechSynthesis.cancel() - to cancel speaking');
  console.log('window.speechSynthesis.getVoices() - to get all available voices');
  console.log('window.speechSynthesis.isSupported() - to check if speech synthesis is supported');
  console.log('window.speechSynthesis.speak({ pitch, rate, text, voice, volume }) - to speak text');
};

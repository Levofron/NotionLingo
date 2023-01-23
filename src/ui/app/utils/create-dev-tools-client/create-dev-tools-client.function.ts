import { localStorageModule, restModule, speechSynthesisModule, supabaseModule } from '@adapter';

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

  // @ts-expect-error
  window.memory = localStorageModule;

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
  console.log('window.rest.increaseDailyStreak() - to increase daily streak');
  console.log('window.rest.setNotionApiToken(token) - to set a new notion token');
  console.log('window.rest.sendContactFormData(data) - to send contact form data');
  console.log('window.rest.getLoggedUser() - to get all details about logged user');
  console.log('window.rest.getAvailableNotionPages() - to get all available notion pages');
  console.log('window.rest.setNotionPageId(pageId) - to set a selected page id to logged user');
  console.log('window.rest.getRandomNotionWords() - to get 5 random words from notion database');

  // synthesis
  console.log('-----------------------------');
  console.log('window.synthesis.getRate() - to get rate');
  console.log('window.synthesis.getPitch() - to get pitch');
  console.log('window.synthesis.getVoice() - to get voice');
  console.log('window.synthesis.getVolume() - to get volume');
  console.log('window.synthesis.setRate(rate) - to set rate');
  console.log('window.synthesis.cancel() - to cancel speaking');
  console.log('window.synthesis.setPitch(pitch) - to set pitch');
  console.log('window.synthesis.setVoice(voice) - to set voice');
  console.log('window.synthesis.setVolume(volume) - to set volume');
  console.log('window.synthesis.getVoices() - to get all available voices');
  console.log('window.synthesis.isSupported() - to check if speech synthesis is supported');
  console.log('window.synthesis.speak({ pitch, rate, text, voice, volume }) - to speak text');

  // memory
  console.log('-----------------------------');
  console.log('window.memory.getItem(key) - to get item from local storage');
  console.log('window.memory.setItem(key, value) - to set item to local storage');
  console.log('window.memory.removeItem(key) - to remove item from local storage');
  console.log('window.memory.isSupported() - to check if local storage is supported');
};

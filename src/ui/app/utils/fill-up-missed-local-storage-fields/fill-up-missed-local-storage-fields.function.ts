import { localStorageModule, speechSynthesisModule } from '@adapter';

import { hasOwnProperty, tryParseJson } from '@infrastructure/utils';

import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
} from '@constants';

const checkNumberFieldAndFillIfEmpty = (key: string, value: string) => {
  const valueFromLocalStorage = localStorageModule.getItem(key);

  if (Number.isNaN(Number(valueFromLocalStorage))) {
    localStorageModule.setItem({ key, value });
  }
};

export const fillUpMissedLocalStorageFields = () => {
  checkNumberFieldAndFillIfEmpty(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
    DEFAULT_SPEECH_SYNTHESIS_RATE,
  );
  checkNumberFieldAndFillIfEmpty(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
    DEFAULT_SPEECH_SYNTHESIS_PITCH,
  );
  checkNumberFieldAndFillIfEmpty(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
    DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  );

  const voiceFromLocalStorage = localStorageModule.getItem(
    LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
  );
  const parsedVoiceFromLocalStorage = tryParseJson(voiceFromLocalStorage);

  if (!parsedVoiceFromLocalStorage || !hasOwnProperty(parsedVoiceFromLocalStorage, 'name')) {
    window.speechSynthesis.onvoiceschanged = () => {
      setTimeout(() => {
        const allVoices = speechSynthesisModule.getVoices();

        const firstVoice = allVoices[0];
        const reassignedVoice = {
          name: firstVoice.name,
          lang: firstVoice.lang,
          default: firstVoice.default,
          voiceURI: firstVoice.voiceURI,
          localService: firstVoice.localService,
        };

        localStorageModule.setItem({
          key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
          value: JSON.stringify(reassignedVoice),
        });
      }, 0);
    };
  }
};

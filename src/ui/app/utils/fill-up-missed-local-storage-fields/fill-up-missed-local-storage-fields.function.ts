import { localStorageModule, speechSynthesisModule } from '@adapter';

import { isString } from '@infrastructure/utils';

import { LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE } from '@constants';

export const fillUpMissedLocalStorageFields = () => {
  speechSynthesisModule.getRate();
  speechSynthesisModule.getPitch();
  speechSynthesisModule.getVolume();

  const voiceFromLocalStorage = speechSynthesisModule.getVoice();

  if (!isString(voiceFromLocalStorage)) {
    speechSynthesisModule.onVoicesChanged(() => {
      const allVoices = speechSynthesisModule.getVoices();

      const firstVoice = allVoices[0];

      localStorageModule.setItem({
        key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
        value: firstVoice.name,
      });
    });
  }
};

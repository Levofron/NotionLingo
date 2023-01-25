import { localStorageModule, speechSynthesisModule } from '@adapter';

import { LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE } from '@constants';

export const fillUpMissedLocalStorageFields = () => {
  if (!localStorageModule.isSupported() || !speechSynthesisModule.isSupported()) {
    return;
  }

  speechSynthesisModule.getRate();
  speechSynthesisModule.getPitch();
  speechSynthesisModule.getVolume();

  speechSynthesisModule.onVoicesChanged(() => {
    const voiceFromLocalStorage = localStorageModule.getItem(
      LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
    );

    if (!voiceFromLocalStorage) {
      const selectedVoice = speechSynthesisModule.getVoice();

      if (!selectedVoice) {
        return;
      }

      localStorageModule.setItem({
        key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
        value: selectedVoice?.name,
      });
    }
  });
};

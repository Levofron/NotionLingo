import { localStorageModule } from '@adapter/local-storage/local-storage.module';
import { speechSynthesisModule } from '@adapter/speech-synthesis/speech-synthesis.module';

import { LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE } from '@config/constants';

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

    const selectedVoice = speechSynthesisModule.getVoice();

    if (selectedVoice && voiceFromLocalStorage !== selectedVoice.name) {
      localStorageModule.setItem({
        key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
        value: selectedVoice?.name,
      });
    }
  });
};

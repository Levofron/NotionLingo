import { localStorageModule, speechSynthesisModule } from '@adapter';

import { hasOwnProperty, tryParseJson } from '@infrastructure/utils';

const SPEECH_SYNTHESIS_RATE = 'speechSynthesisRate';
const SPEECH_SYNTHESIS_VOICE = 'speechSynthesisVoice';
const SPEECH_SYNTHESIS_PITCH = 'speechSynthesisPitch';
const SPEECH_SYNTHESIS_VOLUME = 'speechSynthesisVolume';

const checkNumberFieldAndFillIfEmpty = (key: string, value: string) => {
  const valueFromLocalStorage = localStorageModule.getItem(key);

  if (Number.isNaN(Number(valueFromLocalStorage))) {
    localStorageModule.setItem({ key, value });
  }
};

export const fillUpMissedLocalStorageFields = () => {
  checkNumberFieldAndFillIfEmpty(SPEECH_SYNTHESIS_RATE, '0.8');
  checkNumberFieldAndFillIfEmpty(SPEECH_SYNTHESIS_PITCH, '1.0');
  checkNumberFieldAndFillIfEmpty(SPEECH_SYNTHESIS_VOLUME, '1.0');

  const voiceFromLocalStorage = localStorageModule.getItem(SPEECH_SYNTHESIS_VOICE);
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
          key: SPEECH_SYNTHESIS_VOICE,
          value: JSON.stringify(reassignedVoice),
        });
      }, 0);
    };
  }
};

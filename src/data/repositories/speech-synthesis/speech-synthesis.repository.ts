import { ISpeechSynthesisRepository } from '@domain/speech-synthesis/speech-synthesis.repository';

import { ILocalStorageSource } from '@data/sources/local-storage/local-storage.types';
import { getSpeechSynthesisValueFromLocalStorage } from '@data/transformators/speech-synthesis';

import { isSafari } from '@infrastructure/utils';

import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
} from '@constants';

import { ISpeechSynthesisSource } from '../../sources/speech-synthesis/speech-synthesis.types';

export const getSpeechSynthesisRepository = (
  speechSynthesisSource: ISpeechSynthesisSource,
  localStorageSource: ILocalStorageSource,
): ISpeechSynthesisRepository => ({
  isSupported: () => speechSynthesisSource.isSupported(),
  speak: (options) => {
    if (!speechSynthesisSource.isSupported()) {
      return;
    }

    speechSynthesisSource.cancel();

    const allVoices = speechSynthesisSource.getVoices() || [];

    if (isSafari()) {
      const americanVoice = allVoices.find((_voice) => _voice.lang.includes('en-US'));

      return speechSynthesisSource.speak({
        ...options,
        voice: options.voice || americanVoice || allVoices[0],
      });
    }

    const britishVoice = allVoices.find((_voice) => _voice.lang.includes('en-GB'));
    const voice = options.voice || britishVoice || allVoices[0];

    return speechSynthesisSource.speak({ ...options, voice });
  },
  cancel: () => {
    if (!speechSynthesisSource.isSupported()) {
      return;
    }

    return speechSynthesisSource.cancel();
  },
  getVoices: () => {
    if (!speechSynthesisSource.isSupported()) {
      return [];
    }

    return speechSynthesisSource.getVoices();
  },
  getPitch: () =>
    getSpeechSynthesisValueFromLocalStorage({
      min: 0,
      max: 2,
      localStorageSource,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_PITCH,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
    }),
  getRate: () =>
    getSpeechSynthesisValueFromLocalStorage({
      min: 0.1,
      max: 10,
      localStorageSource,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_RATE,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
    }),
  getVolume: () =>
    getSpeechSynthesisValueFromLocalStorage({
      min: 0,
      max: 1,
      localStorageSource,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_VOLUME,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
    }),
});

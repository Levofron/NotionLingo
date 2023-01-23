import { ISpeechSynthesisRepository } from '@domain/speech-synthesis/speech-synthesis.repository';

import { ILocalStorageSource } from '@data/sources/local-storage/local-storage.types';
import {
  getSpeechSynthesisValueFromLocalStorage,
  setSpeechSynthesisValueToLocalStorage,
} from '@data/transformators/speech-synthesis';

import { isSafari } from '@infrastructure/utils';

import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
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
  setPitch: (pitch: number) =>
    setSpeechSynthesisValueToLocalStorage({
      min: 0,
      max: 2,
      newValue: pitch,
      localStorageSource,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_PITCH,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
    }),
  setRate: (rate: number) =>
    setSpeechSynthesisValueToLocalStorage({
      min: 0.1,
      max: 10,
      newValue: rate,
      localStorageSource,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_RATE,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
    }),
  setVolume: (volume: number) =>
    setSpeechSynthesisValueToLocalStorage({
      min: 0,
      max: 1,
      newValue: volume,
      localStorageSource,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_VOLUME,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
    }),
  setVoice: (newVoiceName: string) => {
    if (!speechSynthesisSource.isSupported()) {
      return;
    }

    const allVoices = speechSynthesisSource.getVoices() || [];

    const newVoice = allVoices.find((_voice) => _voice.name === newVoiceName);

    if (!newVoice && allVoices.length === 0) {
      return localStorageSource.removeItem(LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE);
    }

    if (!newVoice) {
      return localStorageSource.setItem(
        LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
        allVoices[0].name,
      );
    }

    localStorageSource.setItem(LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE, newVoiceName);
  },
  getVoice: () => {
    if (!speechSynthesisSource.isSupported()) {
      return undefined;
    }

    const allVoices = speechSynthesisSource.getVoices() || [];

    if (allVoices.length === 0) {
      return undefined;
    }

    const storedVoiceName = localStorageSource.getItem(LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE);

    if (!storedVoiceName) {
      return allVoices[0];
    }

    const storedVoice = allVoices.find((_voice) => _voice.name === storedVoiceName);

    if (!storedVoice) {
      return allVoices[0];
    }

    return storedVoice;
  },
});

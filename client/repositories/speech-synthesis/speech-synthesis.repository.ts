import { ILocalStorageApi } from '@api/local-storage/local-storage.types';
import { ISpeechSynthesisApi } from '@api/speech-synthesis/speech-synthesis.types';

import { ISpeechSynthesisRepository } from '@domain/repositories/speech-synthesis.repository';

import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE,
  LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
} from '@config/constants';

import {
  getSpeechSynthesisValueFromLocalStorage,
  setSpeechSynthesisValueToLocalStorage,
} from './utils';

export function getSpeechSynthesisRepository(
  speechSynthesisApi: ISpeechSynthesisApi,
  localStorageApi: ILocalStorageApi,
): ISpeechSynthesisRepository {
  const getPitch = () =>
    getSpeechSynthesisValueFromLocalStorage({
      min: 0,
      max: 2,
      localStorageApi,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_PITCH,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
    });

  const getRate = () =>
    getSpeechSynthesisValueFromLocalStorage({
      min: 0.1,
      max: 2,
      localStorageApi,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_RATE,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
    });

  const getVolume = () =>
    getSpeechSynthesisValueFromLocalStorage({
      min: 0,
      max: 1,
      localStorageApi,
      defaultValue: DEFAULT_SPEECH_SYNTHESIS_VOLUME,
      key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
    });

  const getVoice = () => {
    const allVoices = speechSynthesisApi.getVoices();

    if (allVoices.length === 0) {
      return undefined;
    }

    const storedVoiceName = localStorageApi.getItem(LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE);

    if (!storedVoiceName) {
      return allVoices[0];
    }

    const storedVoice = allVoices.find((_voice) => _voice.name === storedVoiceName);

    if (!storedVoice) {
      return allVoices[0];
    }

    return storedVoice;
  };

  return {
    getRate,
    getPitch,
    getVoice,
    getVolume,
    isSupported: () => speechSynthesisApi.isSupported() && localStorageApi.isSupported(),
    speak: (text) => {
      speechSynthesisApi.cancel();

      setTimeout(
        () =>
          speechSynthesisApi.speak({
            text,
            rate: getRate(),
            voice: getVoice(),
            pitch: getPitch(),
            volume: getVolume(),
          }),
        0,
      );
    },
    getVoices: () => speechSynthesisApi.getVoices(),
    setPitch: (pitch: number) =>
      setSpeechSynthesisValueToLocalStorage({
        min: 0,
        max: 2,
        newValue: pitch,
        localStorageApi,
        defaultValue: DEFAULT_SPEECH_SYNTHESIS_PITCH,
        key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_PITCH,
      }),
    setRate: (rate: number) =>
      setSpeechSynthesisValueToLocalStorage({
        min: 0.1,
        max: 2,
        newValue: rate,
        localStorageApi,
        defaultValue: DEFAULT_SPEECH_SYNTHESIS_RATE,
        key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_RATE,
      }),
    setVolume: (volume: number) =>
      setSpeechSynthesisValueToLocalStorage({
        min: 0,
        max: 1,
        newValue: volume,
        localStorageApi,
        defaultValue: DEFAULT_SPEECH_SYNTHESIS_VOLUME,
        key: LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOLUME,
      }),
    setVoice: (newVoiceName: string) => {
      const allVoices = speechSynthesisApi.getVoices();

      const newVoice = allVoices.find((_voice) => _voice.name === newVoiceName);

      if (!newVoice && allVoices.length === 0) {
        return localStorageApi.removeItem(LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE);
      }

      if (!newVoice) {
        return localStorageApi.setItem(LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE, allVoices[0].name);
      }

      localStorageApi.setItem(LOCAL_STORAGE_KEY_SPEECH_SYNTHESIS_VOICE, newVoiceName);
    },
    onVoicesChanged: (callback) => {
      speechSynthesisApi.onVoicesChanged(callback);
    },
    cancel: speechSynthesisApi.cancel,
  };
}

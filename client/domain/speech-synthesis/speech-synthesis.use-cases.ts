import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
} from '@config/constants';

import { IUseCaseWithSingleParam, IUseCaseWithoutParams } from '../use-cases.types';
import { ISpeechSynthesisRepository } from './speech-synthesis.repository';

// isSupportedUseCase
export type TIsSupportedUseCase = IUseCaseWithoutParams<boolean>;

export const isSupportedUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TIsSupportedUseCase => ({
  execute: () => speechSynthesisRepository.isSupported(),
});

// speakUseCase
export type TSpeakUseCase = IUseCaseWithSingleParam<string, void>;

export const speakUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSpeakUseCase => ({
  execute: (text) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.speak(text);
  },
});

// cancelUseCase
export type TCancelUseCase = IUseCaseWithoutParams<void>;

export const cancelUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TCancelUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.cancel();
  },
});

// getVoicesUseCase
export type TGetVoicesUseCase = IUseCaseWithoutParams<SpeechSynthesisVoice[]>;

export const getVoicesUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetVoicesUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return [];
    }

    return speechSynthesisRepository.getVoices();
  },
});

// getPitchUseCase
export type TGetPitchUseCase = IUseCaseWithoutParams<number>;

export const getPitchUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetPitchUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_PITCH;
    }

    return speechSynthesisRepository.getPitch();
  },
});

// getRateUseCase
export type TGetRateUseCase = IUseCaseWithoutParams<number>;

export const getRateUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetRateUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_RATE;
    }

    return speechSynthesisRepository.getRate();
  },
});

// getVolumeUseCase
export type TGetVolumeUseCase = IUseCaseWithoutParams<number>;

export const getVolumeUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetVolumeUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_VOLUME;
    }

    return speechSynthesisRepository.getVolume();
  },
});

// getVoiceUseCase
export type TGetVoiceUseCase = IUseCaseWithoutParams<SpeechSynthesisVoice | undefined>;

export const getVoiceUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetVoiceUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return undefined;
    }

    speechSynthesisRepository.getVoice();
  },
});

// setPitchUseCase
export type TSetPitchUseCase = IUseCaseWithSingleParam<number, void>;

export const setPitchUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetPitchUseCase => ({
  execute: (pitch) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setPitch(pitch);
  },
});

// setRateUseCase
export type TSetRateUseCase = IUseCaseWithSingleParam<number, void>;

export const setRateUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetRateUseCase => ({
  execute: (rate) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setRate(rate);
  },
});

// setVolumeUseCase
export type TSetVolumeUseCase = IUseCaseWithSingleParam<number, void>;

export const setVolumeUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetVolumeUseCase => ({
  execute: (volume) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setVolume(volume);
  },
});

// setVoiceUseCase
export type TSetVoiceUseCase = IUseCaseWithSingleParam<string, void>;

export const setVoiceUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetVoiceUseCase => ({
  execute: (voice) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setVoice(voice);
  },
});

// onVoicesChangedUseCase
export type TOnVoicesChangedUseCase = IUseCaseWithSingleParam<() => void, void>;

export const onVoicesChangedUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TOnVoicesChangedUseCase => ({
  execute: (callback) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.onVoicesChanged(callback);
  },
});

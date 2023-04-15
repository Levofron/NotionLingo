import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
} from '@config/constants';

import { IUseCaseWithSingleParam, IUseCaseWithoutParams } from '../use-cases.types';
import { ISpeechSynthesisRepository } from './speech-synthesis.repository';

// isSupportedUseCase
export type IsSupportedUseCase = IUseCaseWithoutParams<boolean>;

export const isSupportedUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): IsSupportedUseCase => ({
  execute: () => speechSynthesisRepository.isSupported(),
});

// speakUseCase
export type SpeakUseCase = IUseCaseWithSingleParam<string, void>;

export const speakUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): SpeakUseCase => ({
  execute: (text) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.speak(text);
  },
});

// cancelUseCase
export type CancelUseCase = IUseCaseWithoutParams<void>;

export const cancelUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): CancelUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.cancel();
  },
});

// getVoicesUseCase
export type GetVoicesUseCase = IUseCaseWithoutParams<SpeechSynthesisVoice[]>;

export const getVoicesUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): GetVoicesUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return [];
    }

    return speechSynthesisRepository.getVoices();
  },
});

// getPitchUseCase
export type GetPitchUseCase = IUseCaseWithoutParams<number>;

export const getPitchUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): GetPitchUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_PITCH;
    }

    return speechSynthesisRepository.getPitch();
  },
});

// getRateUseCase
export type GetRateUseCase = IUseCaseWithoutParams<number>;

export const getRateUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): GetRateUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_RATE;
    }

    return speechSynthesisRepository.getRate();
  },
});

// getVolumeUseCase
export type GetVolumeUseCase = IUseCaseWithoutParams<number>;

export const getVolumeUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): GetVolumeUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_VOLUME;
    }

    return speechSynthesisRepository.getVolume();
  },
});

// getVoiceUseCase
export type GetVoiceUseCase = IUseCaseWithoutParams<SpeechSynthesisVoice | undefined>;

export const getVoiceUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): GetVoiceUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return undefined;
    }

    speechSynthesisRepository.getVoice();
  },
});

// setPitchUseCase
export type SetPitchUseCase = IUseCaseWithSingleParam<number, void>;

export const setPitchUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): SetPitchUseCase => ({
  execute: (pitch) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setPitch(pitch);
  },
});

// setRateUseCase
export type SetRateUseCase = IUseCaseWithSingleParam<number, void>;

export const setRateUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): SetRateUseCase => ({
  execute: (rate) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setRate(rate);
  },
});

// setVolumeUseCase
export type SetVolumeUseCase = IUseCaseWithSingleParam<number, void>;

export const setVolumeUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): SetVolumeUseCase => ({
  execute: (volume) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setVolume(volume);
  },
});

// setVoiceUseCase
export type SetVoiceUseCase = IUseCaseWithSingleParam<string, void>;

export const setVoiceUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): SetVoiceUseCase => ({
  execute: (voice) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setVoice(voice);
  },
});

// onVoicesChangedUseCase
export type OnVoicesChangedUseCase = IUseCaseWithSingleParam<() => void, void>;

export const onVoicesChangedUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): OnVoicesChangedUseCase => ({
  execute: (callback) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.onVoicesChanged(callback);
  },
});

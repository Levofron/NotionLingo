import {
  DEFAULT_SPEECH_SYNTHESIS_PITCH,
  DEFAULT_SPEECH_SYNTHESIS_RATE,
  DEFAULT_SPEECH_SYNTHESIS_VOLUME,
} from '@config/constants';

import { UseCaseWithSingleParam, UseCaseWithoutParams } from '../use-cases.types';
import { SpeechSynthesisRepository } from './speech-synthesis.repository';

// isSupportedUseCase
export type IsSupportedUseCase = UseCaseWithoutParams<boolean>;

export const isSupportedUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): IsSupportedUseCase => ({
  execute: () => speechSynthesisRepository.isSupported(),
});

// speakUseCase
export type SpeakUseCase = UseCaseWithSingleParam<string, void>;

export const speakUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): SpeakUseCase => ({
  execute: (text) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.speak(text);
  },
});

// cancelUseCase
export type CancelUseCase = UseCaseWithoutParams<void>;

export const cancelUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): CancelUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.cancel();
  },
});

// getVoicesUseCase
export type GetVoicesUseCase = UseCaseWithoutParams<SpeechSynthesisVoice[]>;

export const getVoicesUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): GetVoicesUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return [];
    }

    return speechSynthesisRepository.getVoices();
  },
});

// getPitchUseCase
export type GetPitchUseCase = UseCaseWithoutParams<number>;

export const getPitchUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): GetPitchUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_PITCH;
    }

    return speechSynthesisRepository.getPitch();
  },
});

// getRateUseCase
export type GetRateUseCase = UseCaseWithoutParams<number>;

export const getRateUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): GetRateUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_RATE;
    }

    return speechSynthesisRepository.getRate();
  },
});

// getVolumeUseCase
export type GetVolumeUseCase = UseCaseWithoutParams<number>;

export const getVolumeUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): GetVolumeUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return DEFAULT_SPEECH_SYNTHESIS_VOLUME;
    }

    return speechSynthesisRepository.getVolume();
  },
});

// getVoiceUseCase
export type GetVoiceUseCase = UseCaseWithoutParams<SpeechSynthesisVoice | undefined>;

export const getVoiceUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): GetVoiceUseCase => ({
  execute: () => {
    if (!speechSynthesisRepository.isSupported()) {
      return undefined;
    }

    speechSynthesisRepository.getVoice();
  },
});

// setPitchUseCase
export type SetPitchUseCase = UseCaseWithSingleParam<number, void>;

export const setPitchUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): SetPitchUseCase => ({
  execute: (pitch) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setPitch(pitch);
  },
});

// setRateUseCase
export type SetRateUseCase = UseCaseWithSingleParam<number, void>;

export const setRateUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): SetRateUseCase => ({
  execute: (rate) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setRate(rate);
  },
});

// setVolumeUseCase
export type SetVolumeUseCase = UseCaseWithSingleParam<number, void>;

export const setVolumeUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): SetVolumeUseCase => ({
  execute: (volume) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setVolume(volume);
  },
});

// setVoiceUseCase
export type SetVoiceUseCase = UseCaseWithSingleParam<string, void>;

export const setVoiceUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): SetVoiceUseCase => ({
  execute: (voice) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.setVoice(voice);
  },
});

// onVoicesChangedUseCase
export type OnVoicesChangedUseCase = UseCaseWithSingleParam<() => void, void>;

export const onVoicesChangedUseCase = (
  speechSynthesisRepository: SpeechSynthesisRepository,
): OnVoicesChangedUseCase => ({
  execute: (callback) => {
    if (!speechSynthesisRepository.isSupported()) {
      return;
    }

    speechSynthesisRepository.onVoicesChanged(callback);
  },
});

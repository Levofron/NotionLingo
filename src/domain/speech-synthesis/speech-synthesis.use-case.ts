import { IUseCaseWithSingleParam, IUseCaseWithoutParams } from '../common.types';
import { ISpeechSynthesisRepository } from './speech-synthesis.repository';
import { ISpeakOptions } from './speech-synthesis.types';

// isSupportedUseCase
export type TIsSupportedUseCase = IUseCaseWithoutParams<boolean>;

export const isSupportedUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TIsSupportedUseCase => ({
  execute: () => speechSynthesisRepository.isSupported(),
});

// speakUseCase
export type TSpeakUseCase = IUseCaseWithSingleParam<ISpeakOptions, void>;

export const speakUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSpeakUseCase => ({
  execute: (options) => speechSynthesisRepository.speak(options),
});

// cancelUseCase
export type TCancelUseCase = IUseCaseWithoutParams<void>;

export const cancelUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TCancelUseCase => ({
  execute: () => speechSynthesisRepository.cancel(),
});

// getVoicesUseCase
export type TGetVoicesUseCase = IUseCaseWithoutParams<SpeechSynthesisVoice[]>;

export const getVoicesUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetVoicesUseCase => ({
  execute: () => speechSynthesisRepository.getVoices(),
});

// getPitchUseCase
export type TGetPitchUseCase = IUseCaseWithoutParams<number>;

export const getPitchUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetPitchUseCase => ({
  execute: () => speechSynthesisRepository.getPitch(),
});

// getRateUseCase
export type TGetRateUseCase = IUseCaseWithoutParams<number>;

export const getRateUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetRateUseCase => ({
  execute: () => speechSynthesisRepository.getRate(),
});

// getVolumeUseCase
export type TGetVolumeUseCase = IUseCaseWithoutParams<number>;

export const getVolumeUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetVolumeUseCase => ({
  execute: () => speechSynthesisRepository.getVolume(),
});

// getVoiceUseCase
export type TGetVoiceUseCase = IUseCaseWithoutParams<SpeechSynthesisVoice | undefined>;

export const getVoiceUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TGetVoiceUseCase => ({
  execute: () => speechSynthesisRepository.getVoice(),
});

// setPitchUseCase
export type TSetPitchUseCase = IUseCaseWithSingleParam<number, void>;

export const setPitchUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetPitchUseCase => ({
  execute: (pitch) => speechSynthesisRepository.setPitch(pitch),
});

// setRateUseCase
export type TSetRateUseCase = IUseCaseWithSingleParam<number, void>;

export const setRateUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetRateUseCase => ({
  execute: (rate) => speechSynthesisRepository.setRate(rate),
});

// setVolumeUseCase
export type TSetVolumeUseCase = IUseCaseWithSingleParam<number, void>;

export const setVolumeUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetVolumeUseCase => ({
  execute: (volume) => speechSynthesisRepository.setVolume(volume),
});

// setVoiceUseCase
export type TSetVoiceUseCase = IUseCaseWithSingleParam<string, void>;

export const setVoiceUseCase = (
  speechSynthesisRepository: ISpeechSynthesisRepository,
): TSetVoiceUseCase => ({
  execute: (voice) => speechSynthesisRepository.setVoice(voice),
});

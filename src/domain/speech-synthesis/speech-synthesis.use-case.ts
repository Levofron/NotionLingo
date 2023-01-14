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

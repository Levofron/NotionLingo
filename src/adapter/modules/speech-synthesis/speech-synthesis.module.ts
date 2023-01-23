import {
  cancelUseCase,
  getPitchUseCase,
  getRateUseCase,
  getVoiceUseCase,
  getVoicesUseCase,
  getVolumeUseCase,
  isSupportedUseCase,
  onVoicesChangedUseCase,
  setPitchUseCase,
  setRateUseCase,
  setVoiceUseCase,
  setVolumeUseCase,
  speakUseCase,
} from '@domain/speech-synthesis/speech-synthesis.use-case';

import { getSpeechSynthesisRepository } from '@data/repositories/speech-synthesis/speech-synthesis.repository';
import { getLocalStorageSource } from '@data/sources/local-storage/local-storage.source';
import { getSpeechSynthesisSource } from '@data/sources/speech-synthesis/speech-synthesis.source';

// sources
const localStorageSource = getLocalStorageSource();
const speechSynthesisSource = getSpeechSynthesisSource();

// repositories
const speechSynthesisRepository = getSpeechSynthesisRepository(
  speechSynthesisSource,
  localStorageSource,
);

export const speechSynthesisModule = {
  speak: speakUseCase(speechSynthesisRepository).execute,
  cancel: cancelUseCase(speechSynthesisRepository).execute,
  setRate: setRateUseCase(speechSynthesisRepository).execute,
  getRate: getRateUseCase(speechSynthesisRepository).execute,
  getPitch: getPitchUseCase(speechSynthesisRepository).execute,
  getVoice: getVoiceUseCase(speechSynthesisRepository).execute,
  setPitch: setPitchUseCase(speechSynthesisRepository).execute,
  setVoice: setVoiceUseCase(speechSynthesisRepository).execute,
  getVoices: getVoicesUseCase(speechSynthesisRepository).execute,
  getVolume: getVolumeUseCase(speechSynthesisRepository).execute,
  setVolume: setVolumeUseCase(speechSynthesisRepository).execute,
  isSupported: isSupportedUseCase(speechSynthesisRepository).execute,
  onVoicesChanged: onVoicesChangedUseCase(speechSynthesisRepository).execute,
};

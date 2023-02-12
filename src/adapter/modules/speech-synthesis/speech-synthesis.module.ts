import { getLocalStorageApi } from '@api/local-storage/local-storage.api';
import { getSpeechSynthesisApi } from '@api/speech-synthesis/speech-synthesis.api';
import { getSpeechSynthesisRepository } from '@repositories/speech-synthesis/speech-synthesis.repository';

import {
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
} from '@domain/use-cases/speech-synthesis.use-cases';

// apis
const localStorageApi = getLocalStorageApi();
const speechSynthesisApi = getSpeechSynthesisApi();

// repositories
const speechSynthesisRepository = getSpeechSynthesisRepository(speechSynthesisApi, localStorageApi);

export const speechSynthesisModule = {
  speak: speakUseCase(speechSynthesisRepository).execute,
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

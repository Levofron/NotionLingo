import {
  cancelUseCase,
  getVoicesUseCase,
  isSupportedUseCase,
  speakUseCase,
} from '@domain/speech-synthesis/speech-synthesis.use-case';

import { getSpeechSynthesisRepository } from '@data/repositories/speech-synthesis/speech-synthesis.repository';
import { getSpeechSynthesisSource } from '@data/sources/speech-synthesis/speech-synthesis.source';

// sources
const speechSynthesisSource = getSpeechSynthesisSource();

// repositories
const speechSynthesisRepository = getSpeechSynthesisRepository(speechSynthesisSource);

export const speechSynthesisModule = {
  speak: speakUseCase(speechSynthesisRepository).execute,
  cancel: cancelUseCase(speechSynthesisRepository).execute,
  getVoices: getVoicesUseCase(speechSynthesisRepository).execute,
  isSupported: isSupportedUseCase(speechSynthesisRepository).execute,
};

import { ISpeechSynthesisRepository } from '@domain/speech-synthesis/speech-synthesis.repository';

import { ISpeechSynthesisSource } from '../../sources/speech-synthesis/speech-synthesis.types';

export const getSpeechSynthesisRepository = (
  speechSynthesisSource: ISpeechSynthesisSource,
): ISpeechSynthesisRepository => ({
  isSupported: () => speechSynthesisSource.isSupported(),
  speak: (options) => {
    if (!speechSynthesisSource.isSupported()) {
      return;
    }

    return speechSynthesisSource.speak(options);
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
});
